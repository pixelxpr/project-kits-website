// blog.ts — blog post data, including full body content rendered as markdown
// on /blog/[slug]. Add a new post by adding an object here with a unique
// slug; the homepage preview, /blog index, and /blog/[slug] page all read
// from this file automatically.

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle?: string; // shorter title for <title> tag when the full title exceeds ~60 chars
  excerpt: string;
  category: string;
  readTime: string;
  date: string; // ISO format
  body: string; // markdown
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-rag-works",
    title: "How RAG (Retrieval-Augmented Generation) actually works",
    excerpt:
      "A plain-English breakdown of chunking, embeddings, and vector search — and exactly why it stops generative AI from making things up in your project.",
    category: "Architecture",
    readTime: "7 min read",
    date: "2026-01-15",
    body: `Ask a general-purpose AI model a question about your company's internal handbook, a lecture you recorded, or a spreadsheet you built last week, and it has a problem: it's never seen that content. It was trained on a huge slice of the public internet up to some cutoff date, and nothing you're asking about was in there. 

So it does one of two things — it says it doesn't know, or worse, it guesses confidently and gets it wrong. That second failure mode has a name: **hallucination**. Hallucinations are the single biggest barrier to deploying generative AI in enterprise settings. If a model hallucinates a creative story, it's funny. If it hallucinates a financial figure in a quarterly report, it's a disaster.

Retrieval-Augmented Generation, or **RAG**, is the standard fix. The idea is simple to state and a little more involved to build correctly: instead of asking the model to answer from memory, you find the specific passages that are actually relevant to the question, hand those to the model as context, and ask it to answer using *only* that material. The model isn't guessing anymore — it's summarizing and reasoning over text you gave it a few hundred milliseconds ago.

![RAG Architecture Diagram](/blog/rag-architecture.png)

This architectural pattern effectively decouples *knowledge* (which you store in a database) from *reasoning* (which the LLM provides). In this deep dive, we'll break down exactly how this works under the hood, why it's the standard for enterprise AI, and the technical gotchas you'll hit when building it.

## The Architecture: Four Technical Steps

To understand RAG, you have to understand the pipeline. Data doesn't just magically flow into an LLM. It has to be prepared, indexed, retrieved, and finally generated. 

### 1. Chunking (Data Preparation)

You can't hand an entire PDF or a two-hour video transcript to a model in one go. Even with modern models supporting 128k+ token context windows, stuffing in everything makes it harder for the model to find the relevant needle in the haystack (a phenomenon known as the "Lost in the Middle" problem). Furthermore, passing 100,000 tokens on every single query is prohibitively expensive and slow.

So the source content gets split into smaller pieces first:
- A PDF gets split by page or logical section (using a library like \`PyPDFLoader\` or \`Unstructured\`).
- A video transcript gets split by time window, with each chunk tagged with the timestamp it came from.
- A codebase gets split by function or class.

The **chunk size** matters more than people expect — too big, and retrieval gets fuzzy; too small, and you lose context that spans a chunk boundary. A common starting point is chunking by 500-1000 tokens with a 100-token overlap to ensure sentences aren't cut in half.

### 2. Embedding (Vectorization)

Once you have your chunks, how do you search them? Keyword search (like Ctrl+F) fails if the user asks about "revenue growth" but the document says "sales increased." We need semantic search.

Each chunk gets converted into a **vector** — a list of numbers, typically 384, 768, or 1536 dimensions — using an embedding model (like OpenAI's \`text-embedding-3-small\` or an open-source model like \`all-MiniLM-L6-v2\`). 

These embedding models are trained specifically so that chunks with *similar meaning* end up with *similar vectors*, regardless of the exact words used. 

\`\`\`python
from sentence_transformers import SentenceTransformer

# Load a lightweight, open-source embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Convert our text chunk into a 384-dimensional vector
vector = model.encode("In Q3, sales increased by 15% due to new product lines.")
\`\`\`

### 3. Retrieval (Vector Search)

All these vectors are stored in a Vector Database (like Pinecone, Weaviate, or a local FAISS index). 

When a user asks a question, the system:
1. Takes the user's question.
2. Runs it through the *exact same* embedding model to get a question vector.
3. Searches the Vector Database for the stored chunks whose vectors are mathematically closest to the question's vector (usually using Cosine Similarity).

This is a nearest-neighbor search. The top handful of matches (the "k" nearest neighbors) get pulled out as context.

### 4. Generation (The LLM)

Now we have the user's original question, and we have the top 3-5 most relevant text chunks we just retrieved. 

We assemble these into a prompt and send it to the language model, with explicit instructions:

\`\`\`text
You are a helpful assistant. Use the following context to answer the user's question. 
If the answer is not in the context, say "I don't have enough information to answer that." 
Do not guess.

Context:
[Insert Retrieved Chunk 1]
[Insert Retrieved Chunk 2]
[Insert Retrieved Chunk 3]

Question: [Insert User Question]
\`\`\`

The model's job has shifted from "recall a fact from your training data" to "read this provided text and summarize it" — a much easier, much more reliable task.

## Where it gets harder than the textbook version

The textbook pipeline above (Chunk $\\rightarrow$ Embed $\\rightarrow$ Search $\\rightarrow$ Generate) works wonderfully for simple demos. But the moment you put it in front of real users, it breaks down. Here are the two biggest challenges you'll face in a final year project or enterprise application, and how to fix them.

### Challenge 1: The Vector Blind Spot (Solved by Hybrid Search)

Pure vector search is incredible at understanding *meaning*, but it is terrible at understanding *exact details*. 

Imagine a user asks: "What were the Q3 2023 earnings for Project Apollo?" 
If your database has chunks about "Project Apollo's Q2 2023 earnings" and "Project Artemis's Q3 2023 earnings", a pure vector search will often retrieve the wrong chunks. To an embedding model, the phrases are semantically almost identical — the vectors are very close together in space, even though the factual meaning is entirely different.

**The Fix: Hybrid Search.**
Instead of relying purely on vector embeddings, you run a traditional, exact-match keyword search (like BM25) *alongside* the vector search. 

1. **Vector Search** finds chunks that match the *intent* of the query.
2. **Keyword Search** finds chunks that contain the exact IDs, names, or years mentioned.
3. **Reciprocal Rank Fusion (RRF)** merges the two lists together, prioritizing chunks that scored highly on both.

It sounds like a small detail, but it's the difference between a demo that works on easy questions and a system that holds up under real, messy user queries.

### Challenge 2: Context Dilution (Solved by Re-ranking)

If one relevant chunk is good, then retrieving 10 relevant chunks must be better, right? **Wrong.**

LLMs suffer from "context dilution." If you feed an LLM 10 chunks of text, and only 2 of them contain the actual answer, the LLM will often get distracted by the irrelevant chunks and produce a worse answer than if you had only given it the 2 good chunks. 

**The Fix: Cross-Encoder Re-ranking.**
Instead of trusting the initial vector search to find the perfect top 3 chunks, you retrieve a wide net of 20 chunks. Then, you pass those 20 chunks through a specialized AI model called a **Cross-Encoder Re-ranker** (like \`Cohere Rerank\` or \`bge-reranker\`). 

A Cross-Encoder looks at the user's exact question and reads every single retrieved chunk, scoring how perfectly they match. It then re-orders them and only passes the top 3 highest-scoring chunks to the LLM. It adds about 50-100ms of latency, but massively increases accuracy.

## Why this matters if you're building one for a project

If you're building a RAG project for a college submission, this is exactly the kind of design decision an examiner will probe: not "does it work," but "why did you chunk it that way," "why FAISS and not something else," "what happens when the question is ambiguous." Understanding the four steps well enough to explain *why* each one exists — not just that it exists — is what separates a project you can defend from one you're hoping nobody asks too many questions about.

## See it in practice

If you want to build a RAG project for your final year submission, we have three complete kits that each implement a different flavour of the architecture described above:

- **[Chat with PDF](/projects/pdf-rag-chat)** — uploads a PDF, chunks it, runs hybrid retrieval, and cites the exact page number for every answer.
- **[Chat with YouTube](/projects/chat-with-youtube)** — same pipeline over a video transcript, with timestamp citations and a clickable player.
- **[Chat with Data](/projects/chat-with-data)** — a text-to-code variant that writes and runs real pandas code to answer analytical questions over your spreadsheet.

Each kit includes the full source code, an 8-chapter report explaining the architecture, a 14-slide deck, and a viva question bank.`,
  },
  {
    slug: "viva-questions-rag-projects",
    title: "20 viva questions every RAG project should be ready for",
    excerpt:
      "The top 20 questions examiners actually ask about retrieval-based AI projects during final year project vivas, and how to answer them with confidence.",
    category: "Viva Prep",
    readTime: "9 min read",
    date: "2026-01-22",
    body: `A viva panel doesn't need to be an expert in your specific project to ask a question that exposes whether you actually understand it. The questions below are the ones that come up again and again for RAG-based projects — chatbots, document Q&A tools, or anything that retrieves and then answers. 

Knowing the shape of these questions in advance is most of the battle. If you can answer these confidently, without looking at your report, you will pass your viva with flying colors. 

![Viva Prep Defense Architecture](/blog/viva-prep-diagram.png)

Here are the top 20 questions, broken down by category, along with exactly what the examiner is actually trying to find out when they ask it.

## Conceptual Foundation

**1. What is RAG, and why not just use ChatGPT directly?**
*What they're testing: Do you understand the fundamental problem your project solves?*
Because a general model like ChatGPT has never seen this specific, private content (like a company's internal PDFs or a specific video transcript). RAG retrieves the relevant passage from a private database first, then asks the model to answer from it — grounding the answer in truth instead of relying on the model's pre-trained memory.

**2. What exactly is a Vector Embedding?**
*What they're testing: Did you just copy-paste code, or do you know what the math is doing?*
An embedding is a numerical array (a vector) that represents the semantic meaning of text. It positions text so that phrases with similar meaning end up close together in mathematical space. This is what allows us to search by *meaning* rather than by *exact keyword matches*.

**3. What is hallucination, and how does your project specifically reduce it?**
*What they're testing: Do you know the limits of Generative AI?*
A hallucination is a confident but factually false answer, typically produced when a model is asked about something outside its training data. My project mitigates this by passing a strict system prompt: *"Answer ONLY using the provided context. If the answer is not in the context, say 'I don't know'."* This forces the LLM to act as a summarizer rather than a knowledge base.

**4. Why do you need chunking? Why not embed the whole document as one single vector?**
*What they're testing: Do you understand data pipeline tradeoffs?*
A single vector for an entire 100-page document averages out the meaning so much that you lose fine-grained detail — you couldn't tell *which part* of the document matched a query. Chunking preserves specific details and respects the LLM's context-window token limits at generation time.

## Architecture & Design Decisions

**5. Walk me through the data pipeline from upload to answer.**
*What they're testing: Can you explain your own architecture end-to-end?*
Have this memorized as a clean five-step story: 
1. Source document is parsed into raw text.
2. Text is split into chunks of ~500 tokens with 50-token overlap.
3. Chunks are converted to embeddings via an embedding model and stored in a Vector DB.
4. User asks a question; the question is embedded.
5. We run a Cosine Similarity search in the DB, retrieve the top 3 chunks, and pass them to the LLM to generate the final answer.

**6. Why did you choose your specific chunk size (e.g., 500 tokens)?**
*What they're testing: Did you tune your parameters or just leave the defaults?*
There's a real tradeoff here: too large, and retrieval gets imprecise because a chunk contains multiple topics; too small, and you lose surrounding context (like a pronoun referencing a name in the previous sentence). I chose 500 tokens with a 100-token overlap because it reliably captures full paragraphs of thought in my specific dataset.

**7. Why use FAISS (or Pinecone) instead of a standard SQL database?**
*What they're testing: Do you understand what a Vector Database actually does?*
Standard SQL databases (like MySQL) are built for exact-match or text-like queries using B-Tree indexes. They cannot efficiently calculate the distance between 768-dimensional arrays. FAISS uses Approximate Nearest Neighbor (ANN) algorithms to search through millions of vectors in milliseconds.

**8. What embedding model did you use, and why that one?**
*What they're testing: Are you aware of the alternatives?*
If you used a compact model like \`all-MiniLM-L6-v2\`: I chose it because it runs efficiently on a CPU without requiring a GPU, and its 384-dimensional size provides an excellent accuracy-to-speed tradeoff for a project at this scale, compared to a heavier model like OpenAI's \`text-embedding-3\` which requires API calls and costs money.

## Technical Deep-Dive

**9. What is Hybrid Retrieval, and why does it matter?**
*What they're testing: Have you read beyond the basic tutorials?*
Combining exact keyword matching (like BM25) with vector similarity search. It matters because pure embeddings struggle to distinguish similar-looking specifics — two different years (2022 vs 2023), two similar-sounding names, or an exact quoted phrase — that a literal text match catches immediately. 

**10. How do you decide how many chunks to retrieve per question (the "k" value)?**
*What they're testing: Do you understand context dilution?*
This is usually a fixed number (e.g., k=3 or k=5) chosen as a tradeoff: too few and you might miss the answer, too many and you dilute the context with irrelevant material, which can actually confuse the LLM and make the answer worse, not better.

**11. What happens if the retrieved chunks don't actually contain the answer?**
*What they're testing: Did you handle edge cases?*
The model is explicitly instructed in the system prompt to say *"I don't have enough information"* rather than guessing. *Pro-tip: This is a specific, testable behavior worth demonstrating live during your viva if asked.*

**12. How would you evaluate whether your retrieval is actually good?**
*What they're testing: Do you know how to measure AI performance objectively?*
I would use metrics like **Precision@k** and **Recall@k** against a labeled set of question-answer pairs with known correct sources. Even if you only did informal manual testing, mentioning these metrics shows you know what rigorous, enterprise-grade evaluation looks like (using frameworks like RAGAS or TruLens).

**13. What's the difference between your system and a simple keyword search?**
*What they're testing: Do you understand the value prop of Semantic Search?*
Keyword search only matches exact words (searching for "automobile" won't find a document that says "car"). Semantic search matches *meaning*, so a question phrased entirely differently from the source text can still retrieve the right passage.

## Testing & Validation

**14. How did you test this system?**
*What they're testing: Did you just ask it "Hello" and assume it works?*
I tested it across multiple categories: a narrow factual question, a broad summary question, a question with no answer in the source (to test hallucination prevention), and a complex question requiring information from two different chunks.

**15. What is a case where your system fails, and why?**
*What they're testing: Are you honest about limitations?*
Naming a real, honest limitation is a stronger answer than pretending there isn't one. A good answer: *"My system struggles with questions that require aggregating data across the entire document, like 'count how many times X happened', because RAG is designed to retrieve specific chunks, not analyze the whole dataset at once."*

**16. How do you know your answers are actually grounded, not hallucinated?**
*What they're testing: Can you prove your system's reliability?*
Citations. Because my system passes the retrieved chunk to the LLM, I can also pass the metadata of that chunk (like the PDF page number or the video timestamp) directly to the UI. If every answer is traceable to a specific source, that traceability is itself the evidence.

## Tricky & Comparative Questions

**17. Why not just use a model with a massive 1 Million token context window and skip retrieval entirely?**
*What they're testing: Do you understand scalability and cost?*
For short documents this works well! But it doesn't scale. Sending a million tokens to an API costs significantly more per query and is much slower (high latency). Retrieving only the 3 relevant paragraphs keeps the system incredibly fast and cheap, regardless of whether the database has 10 documents or 10,000.

**18. How would this scale to thousands of documents instead of a handful?**
*What they're testing: Do you understand production systems?*
An exact nearest-neighbor calculation (comparing the query vector against every single stored vector) becomes too slow at scale. At scale, we use Approximate Nearest Neighbor (ANN) indexes like HNSW (Hierarchical Navigable Small World) which trades a microscopic amount of accuracy for lightning-fast search speeds.

**19. What would you improve if you had another month to work on this?**
*What they're testing: Do you know what advanced RAG looks like?*
Have specific, technically grounded answers ready: 
1. Implementing a **Cross-Encoder Re-ranker** to score retrieved chunks before passing them to the LLM.
2. Adding **Query Expansion** (having an LLM rewrite the user's question into 3 different variations to improve retrieval odds).

**20. If I gave you a completely different kind of document right now, would your system work?**
*What they're testing: Do you understand the modularity of your own code?*
The embedding, retrieval, and generation logic are completely domain-agnostic. However, the *data ingestion* step would need to change. If you give me a CSV instead of a PDF, I would just need to swap out the PDF Loader for a CSV Loader; the rest of the pipeline remains identical.

## Working kits to practice with

The best way to prepare is to understand every decision in your own project well enough to explain it under pressure. Our RAG project kits are built exactly for this:

- **[Chat with PDF](/projects/pdf-rag-chat)** — full source code, 8-chapter report, and a viva Q&A bank targeted at the specific architecture choices in that project.
- **[Chat with YouTube](/projects/chat-with-youtube)** — covers the transcript extraction and timestamp-citation pipeline in detail.
- **[Resume / JD Matcher](/projects/resume-jd-matcher)** — for the extract-score-generate pattern, if your project is a comparison or scoring tool rather than a chatbot.`,
  },
  {
    slug: "choosing-a-final-year-project",
    title: "How to choose a final-year project you won't regret",
    excerpt:
      "Discover what separates a final year project that actually impresses a review panel from one that gets forgotten immediately after the final submission.",
    category: "Guides",
    readTime: "6 min read",
    date: "2026-02-03",
    body: `Most of the advice about picking a final-year project focuses on the wrong variable: **how impressive the topic sounds.** 

"Blockchain-based voting system." 
"AI-powered medical diagnosis." 
"Decentralized cloud storage."

The topic matters significantly less than people think. What actually determines whether a final year project goes well is much less exciting to talk about — but it's the absolute difference between a submission you are proud to present and one you're hoping nobody looks at too closely.

![Project Scope vs Timeline Balance](/blog/project-selection-diagram.png)

The secret is that examiners are not grading your ambition; they are grading your execution. An ambitious idea executed poorly is a failure. A grounded idea executed perfectly, tested thoroughly, and defended confidently is an A+. 

Here is the four-part framework for picking a project that will actually succeed.

## Rule 1: Pick something you can explain end-to-end, cold

This is the single biggest predictor of a good outcome. If you can't walk a stranger through your own architecture, in your own words, without looking at notes, that's a massive red flag. It doesn't mean you're bad at presenting; it means the project is more complex than you actually understand. 

This is a real problem the moment a viva panel asks one follow-up question you didn't anticipate. If you followed a 10-hour YouTube tutorial to build a "Microservices E-commerce App" but you don't actually know how the Docker networking ties the services together, the examiner will find that gap in exactly 30 seconds.

**The 5-Minute Test:** Could you explain your project to a classmate in five minutes, covering:
1. What exact problem it solves.
2. How the data flows from the frontend to the backend and back.
3. One specific, difficult technical decision you made and *why* you made it. 

If any part of that is fuzzy, that's the part to shore up before submission day, not after.

## Rule 2: Scope it to what you can actually finish, tested, with time to spare

The projects that go badly aren't usually the ones with boring topics — they're the ones that were too ambitious for the timeline. When a project is too big, testing and documentation get compressed into the last 48 hours before the deadline. 

A smaller project that is fully working, thoroughly tested, handles edge cases gracefully, and is well-documented will *consistently* outperform a massive, ambitious project that's held together with duct tape and hope. 

**The 1.5x Rule:** 
Software estimations are notoriously wrong, even for senior engineers. Whatever scope you think is right, plan for it to take 1.5x as long as your first estimate. 

You must build in real testing time. Not "I ran it once and the happy path didn't crash" testing, but actual QA: What happens if a user uploads a 50MB PDF? What happens if the database connection drops? What happens if the API rate limits you? Answering these questions in your code is what separates a student project from an engineering project.

## Rule 3: Consider what you'll actually be asked to defend

Every project eventually meets a panel. And panel examiners are remarkably predictable; they ask the exact same categories of questions for every project:

1. **Why this approach and not an alternative?** (e.g., "Why did you use React instead of Vanilla JS?", "Why FAISS instead of Pinecone?")
2. **How did you test it?**
3. **What are its limitations?**
4. **What would you do differently with another month of time?**

A project you built by closely following an impressive, 8-hour YouTube tutorial *without* understanding the underlying decisions is almost impossible to defend. The code might work, but when asked *why* you chose a specific database index, you won't know. 

A smaller project where every architectural choice was genuinely yours — even if it's less flashy on paper — is trivially easy to defend. You know *why* you picked SQLite over PostgreSQL, because you actively made that choice based on the project's scale.

**Documentation is your script:** 
This is why documentation quality matters far more than people expect going in. A final report that actually explains your architecture and design tradeoffs — not just *what* the code does, but *why* it does it that way — becomes your own reference material walking into the viva. Written well, it's not just a submission requirement; it's literally the script for the questions you'll face.

## Rule 4: Don't pick something you can't explain the failure modes of

Every real system has limitations. 
- A RAG chatbot will struggle if a video has no transcript.
- A financial analysis tool will fail if the CSV has malformed dates.
- A resume matcher will hallucinate if the LLM is prompted poorly.

A project where you can name your own limitations clearly is infinitely more credible than one where the limitations section reads like it was written by a PR team trying to hide flaws. Examiners can tell the difference. 

Being asked "what doesn't this handle well?" and having no good answer is a devastating moment in a viva. Naming those limitations yourself, *first*, shows engineering maturity. It shows you know the boundaries of what you built.

## The Shortlist Approach: How to actually pick

Rather than committing to the very first idea that sounds cool ("Let's build an AI that predicts stock prices!"), sketch two or three candidates against the four rules above:

1. **Can I explain this end-to-end?**
2. **Can I realistically finish and test it well in the time I have?**
3. **Can I defend the specific technical decisions I'd have to make?**
4. **Do I understand its limitations well enough to document them?**

The project that answers all four cleanly is almost never the flashiest-sounding one on the list — and that is completely fine. A project that's fully yours, fully working, and fully defensible beats an impressive-sounding AI/Blockchain nightmare that you're hoping nobody probes too hard.

## Start with architectures that pass the test

Every project kit on this site was engineered from the ground up to pass these exact four rules. They are scoped perfectly for a final year timeline, fully documented, and come with the exact viva questions examiners will ask.

If you're looking for somewhere to start:

- **[Chat with PDF](/projects/pdf-rag-chat)** — A standard RAG architecture you can explain end-to-end, scoped tightly enough to finish well.
- **[Chat with Data](/projects/chat-with-data)** — A text-to-code system with a clearly differentiated architecture from a standard chatbot, showing advanced data handling.
- **[Resume / JD Matcher](/projects/resume-jd-matcher)** — An extract-score-generate pipeline with explainable, auditable outputs that your examiner can directly interrogate.`,
  },
  {
    slug: "three-patterns-for-ai-projects",
    title: "Three AI project patterns: RAG, text-to-code, and extract-score-generate",
    seoTitle: "Three AI Architectures for Final Year Projects",
    excerpt:
      "Not every final year AI project should be a chatbot. A detailed look at three genuinely different architectures and exactly when each one actually fits.",
    category: "Architecture",
    readTime: "8 min read",
    date: "2026-02-18",
    body: `Say "AI project" to most students and the mental image is exactly the same: a chatbot. Ask it a question, get an answer. 

That is a perfectly fine pattern for some problems, but it is a genuinely *terrible* fit for others. Understanding why this is true — and knowing what the alternative architectures are — is worth vastly more than just being able to build one more RAG chatbot that looks identical to everyone else's.

When examiners review final year AI projects, the ones that stand out are the ones that actually matched the **architecture** to the **problem**. Here are three completely different AI architectures, each solving a different kind of problem, illustrated with real projects built around each one.

## Pattern 1: Retrieval-Augmented Generation (RAG)

**The problem it solves:** Answering questions grounded in a specific, private body of content — a PDF, a video transcript, a company knowledge base — where the answer *already exists* somewhere in the source, and the job is to simply find it and phrase it clearly.

**How it works:** 
1. Source content gets chunked and embedded into a vector index (like FAISS or Pinecone).
2. A user's question gets matched against that index to retrieve the most relevant passages.
3. Those passages are handed to an LLM to generate the final answer, heavily restricted by a system prompt to prevent hallucination.

**When it fits:** The answer is a fact or explanation that is written down in the source material. "What does section 3.2 say?" or "Summarize the risks in this document" are perfect RAG problems.

**When it fails completely:** Anything that requires *computing* something the source doesn't explicitly state. RAG can tell you what a financial document says about Q3 revenue; it *cannot* tell you the month-over-month growth rate unless that exact percentage happens to be written down in the text. 

## Pattern 2: Text-to-Code (The Analyst Pattern)

**The problem it solves:** Open-ended analytical questions over structured data (spreadsheets, SQL databases) where the answer has to be computed, not found. "What percentage of our users are female?" isn't sitting in any cell of a spreadsheet; it has to be calculated by counting rows.

**How it works:** 
Instead of retrieving text, the LLM writes code. 
1. The model is given a strict summary of the data's schema (column names, data types, a few sample rows).
2. The model writes an actual Python script (commonly using \`pandas\` and \`matplotlib\`) to answer the specific question.
3. That code runs in a secure, sandboxed environment.
4. The output of the script — a computed number or a generated chart — is returned to the user.

**When it fits:** Genuinely open-ended questions over tabular data where you can't possibly pre-build a dashboard for every query a user might have.

**The technical catch:** Because an AI is writing arbitrary code that you didn't write yourself, execution *must* be sandboxed. You cannot let it run on your main server with file system or network access. You also need a robust retry loop: if the generated code fails on the first attempt (often by hallucinating a column name), the system should automatically catch the error traceback and ask the LLM to fix its own code.

## Pattern 3: Extract, Score, Generate

**The problem it solves:** Comparing two complex things against each other and producing a highly explainable judgment. Not retrieving a fact, not computing a math equation, but scoring a match and explaining *exactly why*. A Resume Matcher comparing a CV against a Job Description is the canonical example.

**How it works:** 
This is a pipeline, not a single LLM call.
1. **Extract:** Unstructured text is passed to an LLM with strict JSON schema instructions to extract structured data (e.g., pulling a list of skills and years of experience out of a messy PDF resume).
2. **Score:** A hard-coded, deterministic mathematical formula (written by you, in Python/JS) compares the extracted fields and produces a score.
3. **Generate:** An LLM looks at the final score breakdown and generates a human-readable explanation of the gaps.

**When it fits:** Any decision-support tool where the *reason* behind a judgment matters just as much as the judgment itself. 

**Why not just ask the LLM for a score directly?** 
You could — it's much simpler to build. But it's functionally useless. A single "85%" output from a black-box LLM gives the user no way to know *which* requirement drove the score down or what to actually fix. Decomposing the score into named, weighted components (e.g., Skills Match: 9/10, Experience: 4/10) makes it auditable, defensible, and genuinely useful.

## Picking the right pattern for your own project

The fastest way to pick the wrong architecture is to start with the solution ("I want to build an AI chatbot") and work backward. 

Start from the actual problem instead: 
- Is the answer sitting somewhere in existing text? **RAG.**
- Does it need to be computed from a spreadsheet? **Text-to-Code.**
- Is it fundamentally a comparison that needs an auditable judgment? **Extract-Score-Generate.**

The architecture should follow naturally from that answer. Being able to explain exactly *why* you picked the pattern you did is what separates top-tier final year projects from the rest.

## Final year kits built on each pattern

We have complete project kits that implement exactly the three patterns above. If you want to see how they look in practice:

- **[Chat with PDF](/projects/pdf-rag-chat)** and **[Chat with YouTube](/projects/chat-with-youtube)** — Best-in-class RAG implementations, demonstrating chunking, embeddings, and citation mechanisms.
- **[Chat with Data](/projects/chat-with-data)** — The Text-to-Code pattern in action, securely running real pandas/Plotly code against a user-uploaded spreadsheet.
- **[Resume / JD Matcher](/projects/resume-jd-matcher)** — The Extract-Score-Generate pattern, producing a decomposed, highly auditable match score pipeline.`,
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

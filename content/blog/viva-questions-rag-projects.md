---
title: "20 viva questions every RAG project should be ready for"
excerpt: "The top 20 questions examiners actually ask about retrieval-based AI projects during final year project vivas, and how to answer them with confidence."
category: "Viva Prep"
readTime: "9 min read"
date: "2026-01-22"
---

Panels ask the same RAG questions every season — chatbots, document Q&A, anything retrieve-then-generate. Answer these without reading from your report and you are in strong shape. Read [How RAG works](/blog/how-rag-works) first for the architecture baseline.

![RAG viva preparation guide](/blog/viva-questions-rag-projects.png)

Twenty questions grouped by what examiners test.

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
Standard SQL databases (like MySQL) are built for exact-match or text-like queries using B-Tree indexes. They cannot efficiently calculate the distance between 768-dimensional arrays. FAISS uses Approximate Nearest Neighbor (ANN) algorithms to search through millions of vectors in milliseconds. See [FAISS vs Pinecone for student projects](/blog/faiss-vs-pinecone-student-projects).

**8. What embedding model did you use, and why that one?**
*What they're testing: Are you aware of the alternatives?*
If you used a compact model like `all-MiniLM-L6-v2`: I chose it because it runs efficiently on a CPU without requiring a GPU, and its 384-dimensional size provides an excellent accuracy-to-speed tradeoff for a project at this scale, compared to a heavier model like OpenAI's `text-embedding-3` which requires API calls and costs money.

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
Use **Precision@k** and **Recall@k** on labeled Q&A pairs, or informal manual testing across ten questions with expected source pages. Mentioning RAGAS or TruLens shows you know formal evaluation exists even if you did not run it.

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
Fine for one short doc; it does not scale. Million-token API calls cost more and run slower. Retrieving three relevant paragraphs stays fast whether you have ten docs or ten thousand.

**18. How would this scale to thousands of documents instead of a handful?**
*What they're testing: Do you understand production systems?*
Exact nearest-neighbor search slows at scale. Use ANN indexes like HNSW — tiny accuracy tradeoff for much faster search.

**19. What would you improve if you had another month to work on this?**
*What they're testing: Do you know what advanced RAG looks like?*
Name two concrete items: a **cross-encoder re-ranker** before generation, and **query expansion** so the LLM rewrites the question into multiple retrieval queries.

**20. If I gave you a completely different kind of document right now, would your system work?**
*What they're testing: Do you understand the modularity of your own code?*
The embedding, retrieval, and generation logic are completely domain-agnostic. However, the *data ingestion* step would need to change. If you give me a CSV instead of a PDF, I would just need to swap out the PDF Loader for a CSV Loader; the rest of the pipeline remains identical.

## Working kits to practice with

Understand every decision well enough to explain under pressure. Our RAG kits help with that:

- **[Chat with PDF](/projects/pdf-rag-chat)** — full source code, 8-chapter report, and a viva Q&A bank targeted at the specific architecture choices in that project.
- **[Chat with YouTube](/projects/chat-with-youtube)** — covers the transcript extraction and timestamp-citation pipeline in detail.
- **[Resume / JD Matcher](/projects/resume-jd-matcher)** — for the extract-score-generate pattern, if your project is a comparison or scoring tool rather than a chatbot.

// blog.ts — blog post data, including full body content rendered as markdown
// on /blog/[slug]. Add a new post by adding an object here with a unique
// slug; the homepage preview, /blog index, and /blog/[slug] page all read
// from this file automatically.

export type BlogPost = {
  slug: string;
  title: string;
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
    body: `Ask a general-purpose AI model a question about your company's internal handbook, a lecture you recorded, or a spreadsheet you built last week, and it has a problem: it's never seen that content. It was trained on a huge slice of the public internet up to some cutoff date, and nothing you're asking about was in there. So it does one of two things — it says it doesn't know, or worse, it guesses confidently and gets it wrong. That second failure mode has a name: hallucination.

Retrieval-Augmented Generation, or RAG, is the standard fix. The idea is simple to state and a little more involved to build correctly: instead of asking the model to answer from memory, you find the specific passages that are actually relevant to the question, hand those to the model as context, and ask it to answer using *only* that material. The model isn't guessing anymore — it's summarizing and reasoning over text you gave it a few hundred milliseconds ago.

## The four steps

**1. Chunking.** You can't hand an entire PDF or a two-hour video transcript to a model in one go — there's a limit to how much text fits in a single request, and even within that limit, stuffing in everything makes it harder for the model to find the relevant needle in the haystack. So the source content gets split into smaller pieces first. A PDF gets split by page or section; a video transcript gets split by time window, with each chunk tagged with the timestamp it came from. The chunk size matters more than people expect — too big, and retrieval gets fuzzy; too small, and you lose context that spans a chunk boundary.

**2. Embedding.** Each chunk gets converted into a vector — a list of numbers, typically a few hundred dimensions — using an embedding model trained specifically so that chunks with *similar meaning* end up with *similar vectors*, regardless of the exact words used. This is what makes semantic search possible: a chunk about "revenue growth" and a question about "did sales go up" can match even though they don't share a single word in common.

**3. Retrieval.** When a question comes in, it gets embedded the same way, and the system searches for the stored chunks whose vectors are closest to the question's vector — this is a nearest-neighbor search over a vector index, commonly done with a library like FAISS. The top handful of matches get pulled out as context.

**4. Generation.** The retrieved chunks, along with the original question, get assembled into a prompt and sent to a language model, with explicit instructions to answer only from the provided context and to say so if the answer isn't there. The model's job has shifted from "recall a fact" to "read this and summarize it" — a much easier, much more reliable task.

## Where it gets harder than the textbook version

Pure vector search has a specific, well-documented blind spot: it's good at meaning, bad at exact details. Ask "what happened in 2017" against a document that also mentions 2016 and 2019, and a pure embedding comparison can genuinely struggle to tell those years apart — to the model, "2017" and "2019" are nearly the same point in vector space, because the surrounding words are so similar. The fix is hybrid retrieval: run a literal, exact-match search for things like years, quoted phrases, or section numbers *alongside* the vector search, and merge the results. It sounds like a small detail, but it's the difference between a demo that works on easy questions and a system that holds up under real ones.

The other thing that trips people up is treating every question the same way. "Summarize this document" and "what does section 3.2 say" are fundamentally different asks — the first needs the whole document's context, the second needs one specific passage. A system that always retrieves the same number of chunks for every question will do a mediocre job at both. Detecting broad, whole-document questions and routing them differently — sending full text instead of a handful of retrieved chunks — closes that gap.

## Why this matters if you're building one for a project

If you're building a RAG project for a college submission, this is exactly the kind of design decision an examiner will probe: not "does it work," but "why did you chunk it that way," "why FAISS and not something else," "what happens when the question is ambiguous." Understanding the four steps well enough to explain *why* each one exists — not just that it exists — is what separates a project you can defend from one you're hoping nobody asks too many questions about.`,
  },
  {
    slug: "viva-questions-rag-projects",
    title: "20 viva questions every RAG project should be ready for",
    excerpt:
      "The top 20 questions examiners actually ask about retrieval-based AI projects during final year project vivas, and how to answer them with confidence.",
    category: "Viva Prep",
    readTime: "9 min read",
    date: "2026-01-22",
    body: `A viva panel doesn't need to be an expert in your specific project to ask a question that exposes whether you actually understand it. The questions below are the ones that come up again and again for RAG-based projects — chatbots, document Q&A tools, anything that retrieves and then answers. Knowing the shape of these questions in advance is most of the battle.

## Conceptual

**1. What is RAG, and why not just use ChatGPT directly?**
Because a general model has never seen your specific content. RAG retrieves the relevant passage first, then asks the model to answer from it — grounding the answer instead of relying on the model's memory.

**2. What is an embedding?**
A numerical vector representation of text, positioned so that text with similar meaning ends up close together in that vector space — which is what allows searching by meaning instead of exact keywords.

**3. What is hallucination, and how does your project reduce it?**
A confident but false answer, typically produced when a model is asked about something outside its training data. Explicitly instructing the model to answer only from retrieved context — and to say when the answer isn't present — is the direct mitigation.

**4. Why do you need chunking? Why not embed the whole document as one vector?**
A single vector for an entire document loses fine-grained detail — you couldn't tell *which part* matched a query. Chunking also respects the model's context-length limits at answer time.

## Architecture

**5. Walk me through what happens end to end, from upload to answer.**
Have this memorized as a clean five-step story: source content in, chunked, embedded, indexed; question in, embedded, matched against the index, top chunks retrieved, sent to the model with the question, answer generated.

**6. Why did you choose your specific chunk size?**
There's a real tradeoff here — too large and retrieval gets imprecise, too small and you lose surrounding context. Be ready to say what you tried and why you landed where you did, even if the honest answer is "empirically, by testing a few sizes."

**7. Why FAISS (or whichever vector library you used)?**
Fast, free, runs locally without a server, and sufficient at the scale of a single-user or small project. Contrast with a hosted vector database, which adds cost and operational complexity that isn't justified at this scale.

**8. What embedding model did you use, and why that one?**
If you used a compact model like all-MiniLM-L6-v2: it runs on CPU without a GPU, and its size-to-quality tradeoff is appropriate for a project at this scale, versus a larger model that would be more accurate but slower and often GPU-dependent.

## Technical deep-dive

**9. What is hybrid retrieval, and why does it matter?**
Combining exact keyword/identifier matching with vector similarity search. It matters because embeddings struggle to distinguish similar-looking specifics — two different years, two similar-sounding names, an exact quoted phrase — that a literal match catches immediately.

**10. How do you decide how many chunks to retrieve per question?**
This is usually a fixed number (a "k" value) chosen as a tradeoff: too few and you might miss the answer, too many and you dilute the context with irrelevant material, which can actually make the model's answer worse, not better.

**11. What happens if the retrieved chunks don't actually contain the answer?**
The model should be explicitly instructed to say it doesn't have enough information, rather than guessing — this is a specific, testable behavior worth demonstrating live if asked.

**12. How would you evaluate whether your retrieval is actually good?**
Precision@k and recall@k against a labeled set of question-answer pairs with known correct sources — worth mentioning even if you only did informal manual testing, since it shows you know what rigorous evaluation would look like.

**13. What's the difference between your system and a keyword search (like Ctrl+F)?**
Keyword search only matches exact words; semantic search matches meaning, so a question phrased differently from the source text can still retrieve the right passage.

## Testing

**14. How did you test this system?**
Have specific test cases ready: a narrow factual question, a broad summary question, a question with no answer in the source, an edge case specific to your domain (a video with no captions, a PDF with no text layer, etc.).

**15. What's a case where your system fails, and why?**
Naming a real, honest limitation is a stronger answer than pretending there isn't one — panels notice when a limitations section is suspiciously empty.

**16. How do you know your answers are actually grounded, not hallucinated?**
Citations — if every answer is traceable to a specific chunk, source, or timestamp, that traceability is itself the evidence.

## Tricky / comparative

**17. Why not just increase the context window and skip retrieval entirely?**
For short documents this can work, but it doesn't scale — longer sources exceed context limits, and even within limits, sending everything is slower and more expensive than retrieving only what's relevant.

**18. How would this scale to thousands of documents instead of a handful?**
An exact nearest-neighbor index becomes slow at scale; an approximate index (like FAISS's IVF or HNSW variants) trades a small amount of accuracy for much faster search.

**19. What would you improve if you had another month?**
Have two or three specific, technically grounded answers ready — re-ranking retrieved results with a cross-encoder, calibrating chunk size against a real benchmark, adding a broader evaluation suite — not just "make it faster" or "make it better."

**20. If I gave you a completely different kind of document right now, would your system work?**
Talk through what would and wouldn't transfer — the embedding and retrieval logic is generally domain-agnostic, but the source-to-text extraction step is often what needs to change.

Walking in with clear, specific answers to these — not memorized scripts, but a real understanding of *why* each design decision was made — is what actually reads as confidence to a panel.`,
  },
  {
    slug: "choosing-a-final-year-project",
    title: "How to choose a final-year project you won't regret",
    excerpt:
      "Discover what separates a final year project that actually impresses a review panel from one that gets forgotten immediately after the final submission.",
    category: "Guides",
    readTime: "6 min read",
    date: "2026-02-03",
    body: `Most of the advice about picking a final-year project focuses on the wrong variable: how impressive the topic sounds. "Blockchain-based voting system." "AI-powered everything." The topic matters less than people think. What actually determines whether a project goes well is much less exciting to talk about — but it's the difference between a submission you're proud of and one you're hoping nobody looks at too closely.

## Pick something you can explain end to end, cold

This is the single biggest predictor of a good outcome. If you can't walk a stranger through your own architecture, in your own words, without looking at notes, that's a signal — not that you're bad at presenting, but that the project might be more complex than you actually understand, which is a real problem the moment a viva panel asks one follow-up question you didn't anticipate.

A good test: could you explain your project to a classmate in five minutes, covering what problem it solves, how it works at a high level, and one specific technical decision you made and why? If any part of that is fuzzy, that's the part to shore up before submission day, not after.

## Scope it to what you can actually finish, tested, with time to spare

The projects that go badly aren't usually the ones with boring topics — they're the ones that were too ambitious for the timeline, so testing and documentation got compressed into the last 48 hours before the deadline. A smaller project that's fully working, thoroughly tested, and well-documented will consistently outperform a bigger, more ambitious one that's held together with duct tape and hope.

A useful rule of thumb: whatever scope you think is right, plan for it to take 1.5x as long as your first estimate, and build in real testing time — not "run it once and it didn't crash" testing, but testing that covers the edge cases someone will actually ask you about.

## Consider what you'll actually be asked to defend

Every project eventually meets a panel, and panels ask predictable categories of questions: why this approach and not an alternative, how you tested it, what its limitations are, what you'd do differently with more time. A project you built by closely following a tutorial without understanding the underlying decisions is much harder to defend than a smaller project where every choice was genuinely yours, even if the second one is less flashy on paper.

This is also why documentation quality matters more than people expect going in. A report that actually explains your architecture and design tradeoffs — not just what the code does, but why it does it that way — becomes your own reference material walking into the viva. Written well, it's not just a submission requirement; it's a script for the questions you'll actually face.

## Don't pick something you can't explain the failure modes of

Every real system has limitations — no captions on some videos, ambiguous questions the model handles poorly, an edge case in a specific file format. A project where you can name your own limitations clearly is more credible than one where the limitations section reads like it was written to avoid admitting anything, because panels can tell the difference, and being asked "what doesn't this handle well" with no good answer is a much worse moment than naming it yourself first.

## A shortlist beats a single guess

Rather than committing to the first idea that sounds good, sketch two or three candidates against the same four questions: can I explain this end to end, can I realistically finish and test it well, can I defend the decisions I'd make, and do I understand its limitations well enough to name them myself. The project that answers all four cleanly is usually not the flashiest-sounding one on the list — and that's fine. A project that's fully yours, fully working, and fully defensible beats an impressive-sounding one you're hoping nobody probes too hard.`,
  },
  {
    slug: "three-patterns-for-ai-projects",
    title: "RAG vs. text-to-code vs. extract-score-generate: three patterns for AI projects",
    excerpt:
      "Not every final year AI project should be a chatbot. A detailed look at three genuinely different architectures and exactly when each one actually fits.",
    category: "Architecture",
    readTime: "8 min read",
    date: "2026-02-18",
    body: `Say "AI project" to most students and the mental image is the same: a chatbot. Ask it a question, get an answer. That's a fine pattern for some problems and a genuinely bad fit for others — and understanding why is worth more than being able to build one more RAG chatbot that looks like everyone else's.

Here are three different architectures, each solving a different kind of problem, illustrated with real projects built around each one.

## Pattern 1: Retrieval-Augmented Generation (RAG)

**The problem it solves:** answering questions grounded in a specific body of content — a PDF, a video transcript, a knowledge base — where the answer already exists somewhere in the source, and the job is to find it and phrase it clearly.

**How it works:** source content gets chunked and embedded into a vector index; a question gets matched against that index to retrieve the relevant passages; those passages get handed to a language model to generate the final answer, cited back to the source.

**When it fits:** the answer is a fact or explanation that exists in the source material, more or less as written. "What does section 3.2 say," "what did the speaker say about X," "summarize this document" — all genuinely retrieval problems.

**When it doesn't fit:** anything that requires *computing* something the source doesn't state directly. RAG can tell you what a document says about revenue; it can't tell you the month-over-month growth rate unless that exact number happens to be written down somewhere.

## Pattern 2: Text-to-code

**The problem it solves:** open-ended analytical questions over structured data — spreadsheets, databases — where the answer has to be computed, not found. "What % of contribution is male vs. female this month" isn't sitting in any cell of a spreadsheet; it has to be calculated.

**How it works:** the model is given a summary of the data's schema — column names, types, a few sample rows — and writes actual code (commonly pandas and a charting library) to answer the specific question. That code runs in a restricted, sandboxed environment, and its output — a chart or a computed value — is the answer.

**When it fits:** genuinely open-ended questions over tabular data, where a fixed set of pre-built charts or queries can't anticipate every question a user might ask.

**The catch:** since a model is writing code you didn't write yourself, execution has to be sandboxed — no file access, no network access, only the approved libraries and the data in scope — and you need a retry path for when generated code fails on the first attempt, usually by referencing a column name slightly wrong.

## Pattern 3: Extract, score, generate

**The problem it solves:** comparing two things against each other and producing an explainable judgment — not retrieving a fact, not computing an open-ended answer, but scoring a match and explaining *why*. A resume against a job description is the clearest example: is this a good fit, and specifically why or why not.

**How it works:** structured data gets extracted from both inputs first — skills, requirements, qualifications — converting unstructured text into comparable fields. Then an explicit, documented formula compares those structured fields and produces a score broken into named components, rather than asking a model to output one opaque number directly.

**When it fits:** any comparison task where the *reason* behind a judgment matters as much as the judgment itself — which is most real decision-support tools. A single black-box score a user can't interrogate is far less useful than a broken-down one they can actually act on.

**Why not just ask a model for a score directly?** You could — it's simpler to build — but it's far less explainable. A single number gives no way to know which requirement drove the score down, or what to actually change. Decomposing the score into named, weighted components makes it auditable, and lets you point to specific gaps rather than a vague verdict.

## Picking the right pattern for your own project

The fastest way to pick wrong is to start from "I want to build an AI chatbot" and work backward. Start from the actual problem instead: is the answer sitting somewhere in existing content (RAG), does it need to be computed from structured data (text-to-code), or is it fundamentally a comparison that needs an explainable judgment (extract-score-generate)? The architecture should follow from that answer, not the other way around — and being able to explain *why* you picked the pattern you did is exactly the kind of question a viva panel is going to ask.`,
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

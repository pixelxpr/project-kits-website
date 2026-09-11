---
title: "How RAG (Retrieval-Augmented Generation) actually works"
excerpt: "A plain-English breakdown of chunking, embeddings, and vector search — and exactly why it stops generative AI from making things up in your project."
category: "Architecture"
readTime: "14 min read"
date: "2026-01-15"
author: "Rajan"
---

Ask a general-purpose AI model a question about your company's internal handbook, a lecture you recorded, or a spreadsheet you built last week, and it has a problem: it has never seen that content. It was trained on a huge slice of the public internet up to some cutoff date, and nothing you are asking about was in there.

So it does one of two things — it says it does not know, or worse, it guesses confidently and gets it wrong. That second failure mode has a name: **hallucination**. Hallucinations are the single biggest barrier to deploying generative AI in settings where answers must be correct. If a model invents a creative story, it is funny. If it invents a fee structure from a college circular, it is a disaster for your viva demo.

Retrieval-Augmented Generation, or **RAG**, is the standard fix. The idea is simple to state and a little more involved to build correctly: instead of asking the model to answer from memory, you find the specific passages that are actually relevant to the question, hand those to the model as context, and ask it to answer using *only* that material. The model is not guessing anymore — it is summarizing and reasoning over text you gave it a few hundred milliseconds ago.

![How RAG works diagram](/blog/how-rag-works.png)

This pattern decouples *knowledge* (which you store in an index) from *reasoning* (which the LLM provides). For Indian B.Tech, BCA, and MCA final-year projects, RAG is also the architecture examiners recognize: you can draw it, defend it, and demo citations. This guide walks through the pipeline, the design decisions panels probe, and the pitfalls that turn a working demo into an awkward silence.

## The architecture: four technical steps

Data does not magically flow into an LLM. It has to be prepared, indexed, retrieved, and finally generated. Memorize these four steps as a story you can tell without notes.

### 1. Chunking (data preparation)

You cannot hand an entire PDF or a two-hour video transcript to a model on every query and expect reliable answers. Large context windows help, but stuffing everything still makes it harder for the model to find the relevant needle (the "lost in the middle" problem). Passing huge prompts on every question is also slow and expensive.

So the source content gets split into smaller pieces first:

- A PDF gets split by page or logical section (using a loader such as `PyPDFLoader` or similar).
- A video transcript gets split by time window, with each chunk tagged with the timestamp it came from.
- A handbook or notes PDF often works better when split by heading rather than raw character count.

The **chunk size** matters more than people expect. Too big, and retrieval gets fuzzy because one chunk mixes topics. Too small, and you lose context that spans a boundary (a pronoun referring to a name two sentences earlier). A common student starting point is roughly 500–1000 tokens with a 50–100 token overlap so sentences are not cut in half.

**Viva angle:** If asked "why 500 tokens?", do not say "the tutorial used it." Say: "I tried larger chunks and retrieval returned mixed topics; smaller chunks broke sentences. Overlap kept paragraph continuity for my dataset."

**Pitfall:** Chunking by fixed characters without respecting PDF page breaks makes citations messy. Prefer page-aware or heading-aware splits when you need "page 12" style answers, as in [Chat with PDF](/projects/pdf-rag-chat).

### 2. Embedding (vectorization)

Once you have chunks, how do you search them? Keyword search (like Ctrl+F) fails if the user asks about "fee refund" but the document says "tuition reimbursement." You need semantic search.

Each chunk gets converted into a **vector** — a list of numbers, typically 384, 768, or 1536 dimensions — using an embedding model (OpenAI's `text-embedding-3-small`, or an open-source model like `all-MiniLM-L6-v2`).

These models are trained so that chunks with *similar meaning* end up with *similar vectors*, regardless of the exact words used.

```python
from sentence_transformers import SentenceTransformer

# Lightweight open-source model; runs on CPU for demos
model = SentenceTransformer("all-MiniLM-L6-v2")

vector = model.encode(
    "In Q3, sales increased by 15% due to new product lines."
)
# vector is a 384-dimensional array
```

**Practical tip for college labs:** Many labs have no GPU and unreliable internet on demo day. A local MiniLM-style model avoids API downtime during viva. Document that choice in Chapter 4 of your report.

**Pitfall:** Embedding the query with a *different* model than the chunks. Cosine similarity then compares apples to oranges. Always use the same embedding model for index-time and query-time.

### 3. Retrieval (vector search)

Vectors are stored in a vector index (Pinecone, Weaviate, or a local FAISS index — FAISS is common in student kits because it runs offline).

When a user asks a question, the system:

1. Takes the user's question.
2. Runs it through the *exact same* embedding model to get a question vector.
3. Searches the index for stored chunks whose vectors are closest to the question vector (often cosine similarity).

This is a nearest-neighbor search. The top handful of matches (the "k" nearest neighbors) become context.

**Viva angle:** "Why not MySQL full-text?" — SQL engines are built for exact and text-like queries, not fast distance search in hundreds of dimensions. FAISS (and similar ANN indexes) exist for that. See [FAISS vs Pinecone for student projects](/blog/faiss-vs-pinecone-student-projects) when you need a crisp comparison.

### 4. Generation (the LLM)

You now have the question and the top 3–5 chunks. Assemble a prompt with strict instructions:

```text
You are a helpful assistant. Use the following context to answer the user's question.
If the answer is not in the context, say "I don't have enough information to answer that."
Do not guess.

Context:
[Chunk 1]
[Chunk 2]
[Chunk 3]

Question: [User question]
```

The model's job shifts from "recall a fact from training data" to "read this text and answer from it" — easier and more reliable.

**Citation checklist:** Attach metadata with each chunk (page number, timestamp, section title). Show that metadata in the UI. Traceability is how you prove grounding during viva, not a vague claim that "RAG reduces hallucination."

## Where it gets harder than the textbook version

The textbook pipeline (Chunk → Embed → Search → Generate) works for easy demos. Real questions break it. Two challenges show up constantly in final-year submissions.

### Challenge 1: the vector blind spot (hybrid search)

Pure vector search understands *meaning* but struggles with *exact details*.

Imagine the user asks: "What were the Q3 2023 earnings for Project Apollo?" If your index has chunks about Apollo's Q2 earnings and Artemis's Q3 earnings, pure vector search often retrieves the wrong chunk. To an embedding model, the phrases are almost identical.

**The fix: hybrid search.** Run keyword search (BM25) alongside vector search, then merge rankings with Reciprocal Rank Fusion (RRF). Read the full breakdown in [hybrid search in RAG](/blog/hybrid-search-rag-explained).

1. **Vector search** finds chunks that match intent.
2. **Keyword search** finds exact IDs, names, years, section numbers.
3. **RRF** promotes chunks that scored well on both lists.

That detail separates a demo that works on paraphrases from a system that survives examiner questions with dates and codes.

### Challenge 2: context dilution (re-ranking)

Retrieving ten chunks is not automatically better than three. If only two contain the answer, the other eight distract the model. That is **context dilution**.

**The fix: cross-encoder re-ranking.** Retrieve a wider net (for example 20 candidates), score each pair (question, chunk) with a re-ranker, keep the top 3 for the LLM. It adds a little latency and usually improves answer quality.

For many final-year scopes, hybrid retrieval plus careful `k` is enough. Still name re-ranking as future work — it signals you know the next step beyond a tutorial.

## Worked example: college handbook Q&A

Suppose you index a 40-page academic regulations PDF.

**Good question:** "What is the attendance requirement for appearing in semester exams?"  
Retrieval should pull the attendance section; the LLM should paraphrase the rule and cite the page.

**Hard question:** "Does 74% attendance allow me to sit exams if I have medical leave?"  
May need two chunks (attendance rule + medical leave clause). If your `k` is 1, you miss the second piece. If `k` is 10 with no re-rank, you may drown the model in fee-payment paragraphs.

**Bad question for pure RAG:** "How many students failed attendance last year?"  
That number is not in the handbook; it needs a database or spreadsheet. Saying "not in context" is the correct behavior. For computed answers over tables, use the text-to-code pattern in [Chat with Data](/projects/chat-with-data), not vanilla RAG.

## Design decisions examiners will probe

Write these answers into Chapter 4 before viva week.

### Chunk size and overlap

State your numbers, your dataset, and one experiment: "I compared 300 vs 800 tokens on ten labeled questions; 500 with 100 overlap retrieved the expected page more often." Even informal experiments beat "default setting."

### Choice of embedding model

CPU lab: MiniLM / similar local models. Cloud allowed: OpenAI or equivalent with API key in `.env`, never hard-coded. Mention cost and offline demo risk for cloud embeddings.

### Choice of vector store

Local FAISS: free, offline, great for single-machine demos. Managed Pinecone: easier multi-device sync, needs network. Pick one and own the tradeoff.

### Value of `k`

Too low misses multi-chunk answers. Too high dilutes context. Common student default: retrieve 5, send 3 after simple filtering or re-ranking.

### System prompt discipline

"Answer only from context" is not optional decoration. Demo a question with no answer in the PDF and show the refusal. Panels love that test.

## Student checklist: from upload to answer

Use this as a personal QA list before internal review:

1. Upload / load source and extract text cleanly (check for empty pages, scanned PDFs without OCR).
2. Chunk with overlap; store page or timestamp metadata on every chunk.
3. Embed with one fixed model; persist vectors to disk so restart does not rebuild every time.
4. On query: embed question → retrieve top-k → (optional) hybrid merge / re-rank → build prompt → generate.
5. Return answer + citations in the UI.
6. Log retrieved chunks during testing so you can debug wrong answers.
7. Prepare three demo questions: factual, paraphrase, and "not in document."

Kits such as [Chat with YouTube](/projects/chat-with-youtube) follow the same pipeline with transcript timestamps instead of PDF pages — same architecture story, different ingestion.

## Common pitfalls in final-year RAG demos

**Scanned PDFs.** Image-only PDFs yield empty text. OCR or choose a text PDF for the demo. Mention OCR as future work if your college circulars are scans.

**Rebuilding the index every run.** Slow demos look broken. Cache the FAISS index and only rebuild on new uploads.

**Showing the chat UI but not the retrieval.** When asked "prove this came from the PDF," open the citation or print retrieved chunks in a debug panel once during practice.

**Treating RAG as ChatGPT with a PDF attached.** Long-context paste is not the same as retrieval at scale. Explain cost, latency, and multi-document search — covered in depth in [20 viva questions for RAG projects](/blog/viva-questions-rag-projects).

**Ignoring evaluation.** Even a spreadsheet of ten questions with expected pages is enough to discuss Precision@k honestly.

## Reporting RAG in your 8-chapter document

Map the pipeline to report chapters so viva answers point to page numbers:

- **Chapter 1:** problem — students/staff cannot search long PDFs quickly; scope — Q&A with citations, not general chat.
- **Chapter 3:** functional requirements (upload, ask, cite); non-functional (offline index, response within demo-friendly time).
- **Chapter 4:** architecture diagram for the four steps; justify FAISS, chunk size, hybrid search if used.
- **Chapter 5:** loaders, embedding call, retrieval function — short snippets, not entire files.
- **Chapter 6:** test cases for happy path, missing answer, and wrong-chunk risk.
- **Chapter 7:** sample Q&A with page citations; name limitations (aggregations, scanned PDFs, multilingual edge cases).

This alignment is what [the 8-chapter report structure](/blog/eight-chapter-report-structure) expects examiners to skim before you enter the room.

## How RAG differs from fine-tuning (say this clearly)

Students sometimes claim they "trained the model on the PDF." Usually they did not. Fine-tuning changes model weights using many examples; RAG leaves weights alone and supplies documents at query time.

For a single handbook or a few lecture PDFs, RAG is the right final-year choice: cheaper, faster to iterate, and citations are natural. Fine-tuning is for style/behavior at scale, not for stuffing one PDF into weights. Saying that distinction out loud marks you as someone who understands the field, not only the UI.

## Scaling story (keep it honest)

With a handful of PDFs, exact nearest-neighbor search is fine. With thousands of documents, Approximate Nearest Neighbor indexes (HNSW and similar) trade a tiny amount of recall for speed. You do not need to implement HNSW from scratch — name it as the production path. For viva: "Our FAISS flat index is exact and fine for project scale; at larger scale we would use an ANN index."

Also mention incremental updates: new PDF → chunk → embed → add to index, without reprocessing everything. That is a strong "future work" bullet.

## See it in practice

If you want a RAG project for final-year submission, these kits each implement a different flavour of the architecture above:

- **[Chat with PDF](/projects/pdf-rag-chat)** — uploads a PDF, chunks it, runs retrieval, and cites page numbers.
- **[Chat with YouTube](/projects/chat-with-youtube)** — same pipeline over a video transcript, with timestamp citations and a clickable player.
- **[Chat with Data](/projects/chat-with-data)** — text-to-code for analytical questions over spreadsheets when RAG is the wrong tool.

Each kit includes source code, an 8-chapter report explaining architecture, a 14-slide deck, and a viva question bank. Pair this article with [How to choose a final-year project](/blog/choosing-a-final-year-project) if you are still deciding between AI patterns.

**Takeaway:** RAG is chunk → embed → retrieve → generate, with citations and a refusal path when context is missing. Master hybrid search and `k` dilution, and you can defend the system under panel pressure — the same pattern shipped in FinalYearKit RAG projects such as Chat with PDF and Chat with YouTube.

---
title: "How RAG (Retrieval-Augmented Generation) actually works"
excerpt: "A plain-English breakdown of chunking, embeddings, and vector search — and exactly why it stops generative AI from making things up in your project."
category: "Architecture"
readTime: "7 min read"
date: "2026-01-15"
---

Ask a general-purpose AI model a question about your company's internal handbook, a lecture you recorded, or a spreadsheet you built last week, and it has a problem: it's never seen that content. It was trained on a huge slice of the public internet up to some cutoff date, and nothing you're asking about was in there. 

So it does one of two things — it says it doesn't know, or worse, it guesses confidently and gets it wrong. That second failure mode has a name: **hallucination**. Hallucinations are the single biggest barrier to deploying generative AI in enterprise settings. If a model hallucinates a creative story, it's funny. If it hallucinates a financial figure in a quarterly report, it's a disaster.

Retrieval-Augmented Generation, or **RAG**, is the standard fix. The idea is simple to state and a little more involved to build correctly: instead of asking the model to answer from memory, you find the specific passages that are actually relevant to the question, hand those to the model as context, and ask it to answer using *only* that material. The model isn't guessing anymore — it's summarizing and reasoning over text you gave it a few hundred milliseconds ago.

![How RAG works diagram](/blog/how-rag-works.png)

This architectural pattern effectively decouples *knowledge* (which you store in a database) from *reasoning* (which the LLM provides). In this deep dive, we'll break down exactly how this works under the hood, why it's the standard for enterprise AI, and the technical gotchas you'll hit when building it.

## The Architecture: Four Technical Steps

To understand RAG, you have to understand the pipeline. Data doesn't just magically flow into an LLM. It has to be prepared, indexed, retrieved, and finally generated. 

### 1. Chunking (Data Preparation)

You can't hand an entire PDF or a two-hour video transcript to a model in one go. Even with modern models supporting 128k+ token context windows, stuffing in everything makes it harder for the model to find the relevant needle in the haystack (a phenomenon known as the "Lost in the Middle" problem). Furthermore, passing 100,000 tokens on every single query is prohibitively expensive and slow.

So the source content gets split into smaller pieces first:
- A PDF gets split by page or logical section (using a library like `PyPDFLoader` or `Unstructured`).
- A video transcript gets split by time window, with each chunk tagged with the timestamp it came from.
- A codebase gets split by function or class.

The **chunk size** matters more than people expect — too big, and retrieval gets fuzzy; too small, and you lose context that spans a chunk boundary. A common starting point is chunking by 500-1000 tokens with a 100-token overlap to ensure sentences aren't cut in half.

### 2. Embedding (Vectorization)

Once you have your chunks, how do you search them? Keyword search (like Ctrl+F) fails if the user asks about "revenue growth" but the document says "sales increased." We need semantic search.

Each chunk gets converted into a **vector** — a list of numbers, typically 384, 768, or 1536 dimensions — using an embedding model (like OpenAI's `text-embedding-3-small` or an open-source model like `all-MiniLM-L6-v2`). 

These embedding models are trained specifically so that chunks with *similar meaning* end up with *similar vectors*, regardless of the exact words used. 

```python
from sentence_transformers import SentenceTransformer

# Load a lightweight, open-source embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Convert our text chunk into a 384-dimensional vector
vector = model.encode("In Q3, sales increased by 15% due to new product lines.")
```

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

```text
You are a helpful assistant. Use the following context to answer the user's question. 
If the answer is not in the context, say "I don't have enough information to answer that." 
Do not guess.

Context:
[Insert Retrieved Chunk 1]
[Insert Retrieved Chunk 2]
[Insert Retrieved Chunk 3]

Question: [Insert User Question]
```

The model's job has shifted from "recall a fact from your training data" to "read this provided text and summarize it" — a much easier, much more reliable task.

## Where it gets harder than the textbook version

The textbook pipeline above (Chunk $\rightarrow$ Embed $\rightarrow$ Search $\rightarrow$ Generate) works wonderfully for simple demos. But the moment you put it in front of real users, it breaks down. Here are the two biggest challenges you'll face in a final year project or enterprise application, and how to fix them.

### Challenge 1: The Vector Blind Spot (Solved by Hybrid Search)

Pure vector search is incredible at understanding *meaning*, but it is terrible at understanding *exact details*. 

Imagine a user asks: "What were the Q3 2023 earnings for Project Apollo?" 
If your database has chunks about "Project Apollo's Q2 2023 earnings" and "Project Artemis's Q3 2023 earnings", a pure vector search will often retrieve the wrong chunks. To an embedding model, the phrases are semantically almost identical — the vectors are very close together in space, even though the factual meaning is entirely different.

**The Fix: Hybrid Search.**
Instead of relying purely on vector embeddings, you run a traditional, exact-match keyword search (like BM25) *alongside* the vector search, then merge the results. Read our dedicated guide on [hybrid search in RAG](/blog/hybrid-search-rag-explained) for the full breakdown.

1. **Vector Search** finds chunks that match the *intent* of the query.
2. **Keyword Search** finds chunks that contain the exact IDs, names, or years mentioned.
3. **Reciprocal Rank Fusion (RRF)** merges the two lists together, prioritizing chunks that scored highly on both.

It sounds like a small detail, but it's the difference between a demo that works on easy questions and a system that holds up under real, messy user queries.

### Challenge 2: Context Dilution (Solved by Re-ranking)

If one relevant chunk is good, then retrieving 10 relevant chunks must be better, right? **Wrong.**

LLMs suffer from "context dilution." If you feed an LLM 10 chunks of text, and only 2 of them contain the actual answer, the LLM will often get distracted by the irrelevant chunks and produce a worse answer than if you had only given it the 2 good chunks. 

**The Fix: Cross-Encoder Re-ranking.**
Instead of trusting the initial vector search to find the perfect top 3 chunks, you retrieve a wide net of 20 chunks. Then, you pass those 20 chunks through a specialized AI model called a **Cross-Encoder Re-ranker** (like `Cohere Rerank` or `bge-reranker`). 

A Cross-Encoder looks at the user's exact question and reads every single retrieved chunk, scoring how perfectly they match. It then re-orders them and only passes the top 3 highest-scoring chunks to the LLM. It adds about 50-100ms of latency, but massively increases accuracy.

## Why this matters if you're building one for a project

If you're building a RAG project for a college submission, this is exactly the kind of design decision an examiner will probe: not "does it work," but "why did you chunk it that way," "why FAISS and not something else," "what happens when the question is ambiguous." Understanding the four steps well enough to explain *why* each one exists — not just that it exists — is what separates a project you can defend from one you're hoping nobody asks too many questions about. Study our [20 viva questions for RAG projects](/blog/viva-questions-rag-projects) before your panel.

## See it in practice

If you want to build a RAG project for your final year submission, we have three complete kits that each implement a different flavour of the architecture described above:

- **[Chat with PDF](/projects/pdf-rag-chat)** — uploads a PDF, chunks it, runs hybrid retrieval, and cites the exact page number for every answer.
- **[Chat with YouTube](/projects/chat-with-youtube)** — same pipeline over a video transcript, with timestamp citations and a clickable player.
- **[Chat with Data](/projects/chat-with-data)** — a text-to-code variant that writes and runs real pandas code to answer analytical questions over your spreadsheet.

Each kit includes the full source code, an 8-chapter report explaining the architecture, a 14-slide deck, and a viva question bank.

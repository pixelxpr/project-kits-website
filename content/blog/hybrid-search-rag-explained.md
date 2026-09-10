---
title: "Hybrid search in RAG: why keyword + vector beats either alone"
excerpt: "Pure vector search misses exact IDs and dates. Learn how BM25 plus embeddings and reciprocal rank fusion fix the blind spots in student RAG projects."
category: "Architecture"
readTime: "9 min read"
date: "2026-04-05"
---

Pure vector search is the default in RAG tutorials — and it is the reason many student demos fail on real questions. When a user asks for 'Section 4.2 on page 87' or 'Q3 2024 revenue for Project Apollo', embeddings treat similar phrases as interchangeable. Hybrid search runs keyword matching alongside semantic search, then merges rankings. That single design choice is often the difference between a viva pass and an awkward silence.

![Cover](/blog/hybrid-search-rag-explained.png)

## What pure vector search misses

Embeddings encode meaning, not spelling. Two chunks about different years or project codes can sit adjacent in vector space. Students discover this live when the examiner asks a precise factual question and the wrong chunk appears.

Keyword search (BM25) catches exact tokens: years, section numbers, SKUs, names. Vector search catches paraphrases: 'revenue growth' vs 'sales increased'. You need both.

## How hybrid retrieval works

Step 1: embed the query and retrieve top-N by cosine similarity. Step 2: tokenize the query and run BM25 over the same chunk index. Step 3: merge lists with Reciprocal Rank Fusion (RRF) — each chunk gets score 1/(k+rank) from each list, summed. Chunks that rank well on both lists rise to the top.

RRF avoids normalizing incompatible scores between BM25 and cosine distance. k is typically 60; you do not need to tune it heavily for a final year project.

## When to mention this in your viva

Say: 'We use hybrid retrieval because our users ask both conceptual and exact-match questions.' Demo: ask a question with a specific year in the source vs a paraphrased summary question. Both should retrieve correct chunks in a well-tuned system.

## Implementation notes for students

Libraries: rank_bm25 or Elasticsearch for keyword; FAISS for vectors. Index the same chunks in both systems with shared IDs. Log retrieved chunks during testing — you will see when hybrid saves you.

### Worked example: year confusion

Suppose chunk A says "Project Apollo revenue was 2.1M in Q2 2023" and chunk B says "Project Artemis revenue was 3.4M in Q3 2023." User asks: "What was Apollo Q3 2023 revenue?"

Pure vector search may return chunk B because "Q3 2023 revenue" embeddings align. BM25 penalizes missing token "Apollo" in chunk B and boosts chunk A for partial overlap. Hybrid merge surfaces the correct chunk or returns low confidence — either beats silent wrong answers.

### Tuning for student projects

You do not need grid search. Start with top-20 vector + top-20 BM25, merge to top-5 with RRF, pass top-3 to LLM. Log which chunks were retrieved for ten test questions. Adjust chunk size before tuning fusion weights.

### Libraries and code pointers

Python: `rank_bm25.BM25Okapi` on tokenized chunks, `faiss.IndexFlatIP` on normalized embeddings. Store identical chunk_id in both indexes. Merge in application code — no enterprise search engine required for final year scope.

### Reporting hybrid search in Chapter 4

Draw two parallel arrows from "User Query" to "Vector Index" and "BM25 Index," converging at "RRF Merge," then "Top-k Chunks → LLM." One diagram answers half the architecture viva.

### Limitations to state honestly

Hybrid search still fails on typos in rare names, OCR errors in scanned PDFs, and questions requiring math across many chunks. Pair hybrid retrieval with citation display so wrong retrievals are visible during demo, not hidden.


## BM25 in plain English

BM25 scores documents by term frequency with saturation — repeating a word matters less after a point — and length normalization so short chunks are not unfairly penalized. It excels when users paste exact phrases, SKUs, section numbers, or dates.

### Reciprocal Rank Fusion (RRF)

You run vector search and BM25 separately, each returning ranked lists. RRF merges them: chunks appearing high on both lists rise to the top. You do not need to normalize incompatible score scales manually — RRF handles rank positions.

Implementation sketch: retrieve top 20 from each method, fuse, take top 5 for LLM context. Log which method contributed each chunk for debugging during viva.

### When hybrid hurts

Tiny corpora under 20 chunks — keyword search adds little. Highly semantic queries with no exact tokens — vector alone may suffice. Explain when you would disable BM25 to save complexity.

### Tuning for your demo PDF

Build five questions that fail vector-only search: exact figure, section number, named entity with unusual spelling. Show hybrid fixes them in live demo. Document in Chapter 7 as qualitative evaluation.

### Libraries students use

LangChain `EnsembleRetriever`, LlamaIndex hybrid modes, or manual BM25 with `rank_bm25` plus FAISS. Name what your kit uses and one alternative you considered.

## Related reading

See also [How RAG works](/blog/how-rag-works) [FAISS vs Pinecone](/blog/faiss-vs-pinecone-student-projects).

## Project kits

- **[Chat with PDF](/projects/pdf-rag-chat)** — ships with hybrid retrieval enabled.
- **[Chat with YouTube](/projects/chat-with-youtube)** — uses hybrid search for timestamp-accurate answers.

**Takeaway:** Hybrid search fixes the exact-match blind spot in vector RAG — implement it and explain RRF in your report. Both RAG kits include hybrid retrieval out of the box.

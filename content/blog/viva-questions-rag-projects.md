---
title: "20 viva questions every RAG project should be ready for"
excerpt: "The top 20 questions examiners actually ask about retrieval-based AI projects during final year project vivas, and how to answer them with confidence."
category: "Viva Prep"
readTime: "15 min read"
date: "2026-01-22"
author: "Rajan"
---

Panels ask the same RAG questions every season — chatbots, document Q&A, anything retrieve-then-generate. If you can answer these without reading from your report, you are in strong shape. Read [How RAG works](/blog/how-rag-works) first for the architecture baseline, then treat this page as your drill sheet.

![RAG viva preparation guide](/blog/viva-questions-rag-projects.png)

Twenty questions grouped by what examiners test. For each, learn the *intent* behind the question — panels rephrase constantly, but they are fishing for the same concepts.

## How to use this list before your viva

Do not memorize word-for-word scripts. Memorize a two-sentence core answer, then one example from *your* project (your chunk size, your model name, your failure case). Practice out loud once with a classmate who is allowed to interrupt.

**Prep checklist:**

1. Draw the pipeline on paper from memory (upload → chunk → embed → retrieve → generate).
2. Name your embedding model and vector store without looking them up.
3. Prepare one live demo question that has an answer, and one that does not.
4. Open Chapter 4 and Chapter 6 of your report to the pages you will cite verbally.
5. Rehearse limitations without sounding apologetic — mature, specific, short.

## Conceptual foundation

**1. What is RAG, and why not just use ChatGPT directly?**  
*What they are testing: Do you understand the problem your project solves?*  
A general model has never seen this private content (your PDF, transcript, or internal notes). RAG retrieves the relevant passage from your index first, then asks the model to answer from that passage — grounding the answer in your documents instead of training memory.

**Follow-up trap:** "Then why use an LLM at all?" — Because retrieval returns raw text; the LLM synthesizes a readable answer, handles paraphrased questions, and can follow instructions like "summarize in three bullets."

**2. What exactly is a vector embedding?**  
*What they are testing: Copy-paste vs understanding.*  
An embedding is a numerical array that represents semantic meaning. Phrases with similar meaning sit close in that space, which enables search by meaning rather than exact keywords.

**Student-friendly analogy:** Think of each chunk as a point on a map of meaning. The question is another point; retrieval finds nearby points. Do not invent fake dimensions or magical accuracy claims — stick to "same model, cosine similarity, top-k."

**3. What is hallucination, and how does your project reduce it?**  
*What they are testing: Limits of generative AI.*  
A hallucination is a confident but false answer, often when the model is asked about content outside its training data or outside the provided context. Your project reduces it by (a) supplying retrieved context and (b) a strict system prompt: answer only from context, else say you do not know. Citations make verification possible in the UI.

**Demo tip:** Show the "I don't know" path live. It is more impressive than another correct answer.

**4. Why chunking? Why not one vector for the whole document?**  
*What they are testing: Pipeline tradeoffs.*  
One vector for a 100-page PDF averages meaning so finely that you cannot tell *which* part matched. Chunking preserves local detail and keeps generation prompts within practical context limits.

## Architecture and design decisions

**5. Walk me through the data pipeline from upload to answer.**  
*What they are testing: End-to-end ownership.*  
Tell a clean story:

1. Source is parsed into text.
2. Text is split into chunks (state your size and overlap).
3. Chunks are embedded and stored in the vector index with metadata (page / timestamp).
4. User question is embedded with the same model.
5. Top-k chunks are retrieved (mention hybrid search if you use it).
6. Prompt + chunks go to the LLM; answer and citations return to the UI.

Practice until this takes under 60 seconds.

**6. Why that chunk size?**  
*What they are testing: Tuned vs defaults.*  
State the tradeoff: large chunks mix topics; small chunks lose surrounding context. Tie the number to *your* documents (paragraph length in a handbook vs short subtitle lines in a transcript). Mention overlap so sentences are not split awkwardly.

**7. Why FAISS (or Pinecone) instead of a normal SQL database?**  
*What they are testing: What a vector store is for.*  
SQL databases excel at exact-match and relational queries with B-tree style indexes. They are not designed to efficiently find nearest neighbors among hundreds of dimensions. FAISS (and similar) use similarity search / ANN techniques for that. Compare options calmly using [FAISS vs Pinecone for student projects](/blog/faiss-vs-pinecone-student-projects).

**8. What embedding model did you use, and why?**  
*What they are testing: Awareness of alternatives.*  
Example for `all-MiniLM-L6-v2`: runs on CPU, no GPU required, small enough for college lab demos, acceptable quality for project-scale corpora. Contrast with API embeddings: often stronger quality, but need network, keys, and budget. Never hard-code keys in GitHub screenshots.

## Technical deep-dive

**9. What is hybrid retrieval, and why does it matter?**  
*What they are testing: Beyond basic tutorials.*  
Hybrid retrieval combines keyword matching (BM25) with vector similarity. Embeddings struggle with near-identical specifics — years, IDs, exact quotes — that literal matching catches. Merge rankings (often with Reciprocal Rank Fusion). Details: [hybrid search in RAG](/blog/hybrid-search-rag-explained).

**10. How do you choose k (chunks per question)?**  
*What they are testing: Context dilution.*  
k is a tradeoff: too small and you miss multi-span answers; too large and irrelevant text confuses the model. State your number and why. Optional: retrieve more candidates, then keep top 3 after re-ranking.

**11. What if retrieved chunks do not contain the answer?**  
*What they are testing: Edge cases.*  
The system prompt must force a refusal rather than a guess. This is a testable behavior — include it in Chapter 6 test cases.

**12. How would you evaluate retrieval quality?**  
*What they are testing: Measurement mindset.*  
Build a small labeled set: question → expected page or chunk IDs. Report informal Precision@k / Recall@k, or a manual score sheet across ten questions. Naming frameworks like RAGAS shows awareness even if you only ran lightweight manual evaluation.

**13. How is this different from keyword search alone?**  
*What they are testing: Value of semantic search.*  
Keyword search misses synonyms ("car" vs "automobile"). Semantic search matches meaning. Hybrid systems keep both strengths.

## Testing and validation

**14. How did you test the system?**  
*What they are testing: Beyond "hello" chats.*  
Describe categories: narrow factual, broad summary, no-answer, multi-chunk, and at least one adversarial or ambiguous question. Point to a test table in the report.

**15. Name a real failure mode.**  
*What they are testing: Honesty.*  
Strong example: "Questions that need counting across the whole document fail because we retrieve local chunks, not full-corpus aggregation." Another: scanned PDFs without OCR yield empty chunks. Pretending the system never fails loses marks.

**16. How do you know answers are grounded?**  
*What they are testing: Evidence.*  
Citations: pass chunk metadata (page, timestamp) to the UI. If every answer is traceable, that is your grounding evidence. For video projects, timestamp clicks are powerful — see [Chat with YouTube](/projects/chat-with-youtube).

## Tricky and comparative questions

**17. Why not dump the whole PDF into a huge context window and skip retrieval?**  
*What they are testing: Cost and scale.*  
Fine for one short file in a private experiment. It does not scale to many documents, costs more, and is slower. Retrieving a few paragraphs stays practical whether you have ten files or ten thousand.

**18. How would this scale to thousands of documents?**  
*What they are testing: Production thinking.*  
Exact search slows; ANN indexes (for example HNSW-style structures) trade a little accuracy for speed. Mention incremental indexing for new uploads. Keep claims modest — you do not need a fake "millions of QPS" story.

**19. What would you improve with one more month?**  
*What they are testing: Advanced RAG awareness.*  
Pick two concrete items: cross-encoder re-ranker; query rewriting / multi-query retrieval; OCR for scans; evaluation dashboard. Avoid vague "make it better with AI."

**20. If I give you a different document type, does it still work?**  
*What they are testing: Modularity.*  
Embedding, retrieval, and generation are domain-agnostic. Ingestion changes: PDF loader vs transcript extractor vs HTML cleaner. Swapping loaders keeps the rest of the pipeline.

## Extra questions panels sometimes add

These are not in the "top 20" title list, but prepare short answers:

**What is cosine similarity?**  
A measure of angle between vectors; higher similarity means closer meaning for normalized embeddings. You do not need to derive formulas on the whiteboard unless asked — explain intuitively.

**Temperature / decoding settings?**  
For factual RAG, low temperature reduces creative drift. Say what you used and why.

**Prompt injection?**  
User tries to override "ignore previous instructions." Mitigations: separate system vs user roles, refuse to leave context, never execute retrieved text as code unless that is a different architecture (text-to-code).

**Multilingual documents?**  
If your PDF is English-only, say so. Multilingual retrieval needs embedding models that support those languages — list as limitation or future work.

**Difference between RAG and fine-tuning?**  
Fine-tuning changes weights; RAG supplies documents at query time. Final-year document Q&A almost always wants RAG.

## Mapping questions to your report and slides

| Viva theme | Point to |
| --- | --- |
| Pipeline walkthrough | Report Ch. 4 diagram + Slide 6–7 |
| Chunk / model choices | Report Ch. 4 design decisions |
| Testing | Report Ch. 6 table |
| Limitations | Report Ch. 7 |
| Live proof | Demo: citation + no-answer case |

If your slide says "hybrid search" but Chapter 4 only shows pure vector search, fix the inconsistency before binding. Examiners notice mismatches.

## Pitfalls that sink otherwise good answers

**Reading the report aloud.** Panels allow glances, not recitation. Eye contact matters.

**Blaming the LLM for every mistake.** Own retrieval errors: wrong chunk → wrong answer even with a perfect model.

**Claiming 100% accuracy.** Prefer: "On our ten-question set, eight retrieved the expected page; two failed for reasons X and Y."

**Copying answers from a blog without tying them to your code.** Mentors can ask "show me where in the repo." Know the file names for embed, retrieve, and prompt construction.

**Confusing RAG with Chat with Data.** If your project generates pandas code, you are in a different pattern — see [three AI project patterns](/blog/three-patterns-for-ai-projects). Do not force RAG vocabulary onto text-to-code.

## Practice schedule (one week)

- **Day 1–2:** Architecture answers (Q1–Q8) while redrawing the diagram.
- **Day 3:** Hybrid, k, evaluation (Q9–Q13).
- **Day 4:** Testing and limitations (Q14–Q16) with your real failure story.
- **Day 5:** Comparative (Q17–Q20) plus one mock viva with a friend.
- **Day 6:** Full dry run: 5-minute project intro + 10 random questions from this list.
- **Day 7:** Rest the voice; only skim your one-page cheat sheet.

## Model answers vs your answers

Generic blog answers get you halfway. Examiners listen for project-specific anchors:

- Exact chunk size and overlap you shipped
- Exact embedding model string from requirements or code
- Exact vector store (FAISS index path, Pinecone index name — without leaking keys)
- Exact `k` and whether hybrid fusion is on
- Exact demo PDF title or YouTube URL you will use

Write a one-page cheat sheet with those anchors only. If your answer could apply to any RAG repo on GitHub, add one concrete detail from your tree.

### Sample strong vs weak answer (chunk size)

**Weak:** "We used 500 tokens because it is standard."  
**Strong:** "Our academic regulation PDF has long multi-clause paragraphs. At 300 tokens, pronouns lost their antecedents across chunk boundaries. At 800 tokens, retrieval mixed attendance rules with fee rules. We settled on 500 with 100 overlap after checking ten labeled questions against expected pages."

That second answer is hard to fake and easy to defend.

## Whiteboard / diagram moments

Some panels ask you to redraw the pipeline. Practice a four-box sketch:

1. Documents / transcript source  
2. Chunk store + vector index  
3. Retriever (and BM25 box if hybrid)  
4. LLM + citation UI  

Talk while drawing. Silence while scribbling feels like uncertainty even when you know the material. If you use Streamlit, say where the UI sits (usually calling a Python service that owns retrieval). Keep the diagram identical to Chapter 4 — panels compare.

## Team viva dynamics for RAG projects

If two or three of you built the system, assign deep ownership:

- Member A: ingestion, chunking, metadata  
- Member B: embeddings, index, hybrid merge  
- Member C: prompts, UI citations, evaluation sheet  

Everyone still rehearses the full pipeline story. Examiners often ask the person who spoke least. Do not answer "that was his module" and stop — give the high-level answer, then invite your teammate for detail.

## Connecting PDF vs YouTube variants

If your project is PDF-based, still understand the YouTube sibling: same retrieval, different ingestion (captions / transcript APIs, timestamp metadata). If your project is video-based, understand PDF page citations. Panels sometimes ask comparative questions when classmates submitted the other variant. Defending either variant is easier when you have read both kit narratives: [Chat with PDF](/projects/pdf-rag-chat) and [Chat with YouTube](/projects/chat-with-youtube).

## Day-of viva checklist

1. Index already built; do not re-embed during the first question.  
2. Demo questions typed in a notepad for fast paste.  
3. One "trap" question ready where the answer is absent.  
4. Report open to Chapter 4 and Chapter 6 bookmarks.  
5. Phone on silent; API billing alerts disabled on screen.  
6. Backup screenshots of citation UI if the model API flakes.

## Working kits to practice with

Understand every decision well enough to explain under pressure. These kits ship with architecture notes and viva banks aligned to the questions above:

- **[Chat with PDF](/projects/pdf-rag-chat)** — page citations, chunking choices, classic document RAG viva surface.
- **[Chat with YouTube](/projects/chat-with-youtube)** — transcript extraction and timestamp citations.
- **[Resume / JD Matcher](/projects/resume-jd-matcher)** — if your project is extract-score-generate rather than chatbot RAG; different questions, same need for crisp defense.

Also skim [common viva mistakes in CS projects](/blog/common-viva-mistakes-cs) so you avoid generic traps (blank staring at the screen, refusing to name limitations, demo without seeded data).

**Takeaway:** Panels reward clear pipeline stories, honest limitations, and a live no-answer demo — not buzzword density. Drill these twenty questions against your own chunk size, model, and citations, then use a FinalYearKit RAG project (Chat with PDF or Chat with YouTube) as a concrete system you can point to line by line.

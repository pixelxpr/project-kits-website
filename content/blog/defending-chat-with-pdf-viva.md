---
title: "Defending a Chat with PDF project in viva — questions and model answers"
excerpt: "Panel-ready answers for PDF parsing, chunking, hybrid retrieval, page citations, and hallucination control in document Q&A projects."
category: "Viva Prep"
readTime: "10 min read"
date: "2026-04-22"
---

Chat with PDF is the most common RAG final year project in 2026. Examiners have seen ten versions — they will not ask 'what is AI'. They will ask why your chunk size, why page citations, and what happens on scanned PDFs. Prepare these answers verbatim.

![Cover](/blog/defending-chat-with-pdf-viva.png)

## Opening pitch (30 seconds)

Our system lets users upload a text PDF, indexes it with hybrid retrieval, and answers questions with page-number citations. Hallucination is reduced by restricting answers to retrieved context only.

## PDF parsing questions

Q: Which library parses PDFs? A: pymupdf4llm / PyMuPDF — extracts text per page while preserving page boundaries for citations. Q: Scanned PDFs? A: Not supported without OCR; our scope is text-based PDFs — honest limitation.

## Retrieval questions

Q: Why hybrid search? A: Vector alone misses exact section numbers; BM25 catches them. Q: Chunk size? A: ~500 tokens with overlap — balances context and precision.

## Citation questions

Q: How do you know page 12? A: Chunk metadata stores source page from parser; UI displays it with every answer. Demo this live — strongest viva moment.

## Failure scenarios

Empty upload, corrupted PDF, question outside document — system should say 'not found', not invent.

### Extended Q&A bank

**Q: Token limit exceeded?** A: We retrieve only top-k chunks totaling under model context limit; full PDF never sent to LLM.

**Q: Duplicate content across pages?** A: Overlap in chunking preserves sentence context; retrieval deduplicates near-identical chunks optionally.

**Q: Evaluation metric?** A: Manual QA set of 10 questions with expected page numbers; report Precision@3.

**Q: Why Groq/OpenAI?** A: Fast inference for demo; swap model via config without pipeline change.

**Q: Security of uploaded PDFs?** A: Processed in memory/temp storage; deleted after session or on clear button.

### Live demo script

1) Upload 5-page sample PDF. 2) Ask narrow question with page number in answer. 3) Ask paraphrased summary question. 4) Ask question not in document — show "I don't know" response. Total time: 4 minutes.

### Whiteboard architecture

Draw: PDF → Parser → Chunks → Embed → FAISS + BM25 → Merge → Prompt → LLM → Answer + Page Citation. Practice drawing in 60 seconds.

### Connecting to report

Every viva answer should map to a report section: parsing in 5.2, chunking in 4.3, hybrid in 4.4, testing in 6. Carry report tabbed for reference if allowed.


## Comparison questions

**Q: Why not train a custom model on our PDFs?** A: Fine-tuning is expensive, needs large datasets, and updates require retraining. RAG updates by re-indexing new documents without retraining.

**Q: Difference from Ctrl+F?** A: Semantic paraphrase — user asks "what are the penalties?" and retrieval finds "consequences for violation" on page 8.

### Multi-PDF scope

If your kit supports one PDF at a time, say so clearly. Future work: collection-level index with document_id in metadata. Examiners respect scoped honesty.

### Prompt engineering details

Show your system prompt text in report appendix. Explain instructions: cite page numbers, refuse outside context, use bullet format for lists. Prompt changes are a legitimate customization story.

### Metrics without a lab

You may not have GPU for benchmarking. Manual Precision@3 on 10 questions is acceptable undergraduate evaluation. Describe one question where retrieval failed and how you would fix chunk boundaries.

### Security and privacy

Uploaded PDFs may contain personal data. State retention policy: temp files deleted on session end. No training on user uploads. GDPR-style language optional but impresses some panels.

### OCR future work path

Tesseract or cloud OCR for scanned PDFs — describe pipeline: OCR → text layer → same chunking pipeline. Shows you know current limitation is ingestion not RAG concept.

### LangChain vs custom pipeline

If asked: name abstractions used (document loader, text splitter, vector store) and one reason you did not call OpenAI Assistants API instead — cost, control, learning objectives.

## Additional panel questions

**Q: Password-protected PDF?** Out of scope or requires decryption step — state clearly.

**Q: Table extraction?** pymupdf4llm table handling limits — complex tables may lose structure; honest limit.

**Q: Multi-language PDF?** Embedding model multilingual support — name model tested.

**Q: Update document?** Clear index and re-embed — walk through clear button behavior in UI.

Rehearse with [20 RAG questions](/blog/viva-questions-rag-projects) list printed beside laptop.

### Index rebuild UX

Progress indicator during embed — panel waits patiently if they see progress bar. Silent 60-second freeze looks broken even when working.

Highlight one customization you made to default chunk size or hybrid weight — proves engagement beyond stock demo.

## Related reading

See also [20 RAG viva questions](/blog/viva-questions-rag-projects).

## Project kits

- **[Chat with PDF](/projects/pdf-rag-chat)** — full viva bank included.
- **[Chat with YouTube](/projects/chat-with-youtube)** — compare PDF vs video citation pipeline.

**Takeaway:** Know parsing, hybrid retrieval, citation metadata, and three failure cases cold. Chat with PDF kit includes cheat sheet and pitch script.

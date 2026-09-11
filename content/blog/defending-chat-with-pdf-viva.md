---
title: "Defending a Chat with PDF project in viva — questions and model answers"
seoTitle: "Chat with PDF Viva — Questions & Answers"
excerpt: "Panel-ready answers for PDF parsing, chunking, hybrid retrieval, page citations, hallucination control, and failure demos in document Q&A projects."
category: "Viva Prep"
readTime: "14 min read"
date: "2026-04-22"
author: "Rajan"
---

Chat with PDF is one of the most common RAG final year projects in Indian CS programs right now. Examiners have seen multiple versions in the same week. They will not ask “what is AI?” They will ask why your chunk size, how page citations are stored, what happens on scanned PDFs, and whether you can show a question the system should refuse. Prepare specific answers and a four-minute demo script — not a memorized definition of neural networks.

![Cover](/blog/defending-chat-with-pdf-viva.png)

This guide assumes a pipeline like [Chat with PDF](/projects/pdf-rag-chat): text PDF upload, chunking with page metadata, hybrid retrieval, LLM answer with citations. Compare citation style with video RAG in [Chat with YouTube](/projects/chat-with-youtube) if the panel asks how document vs transcript projects differ.

## Opening pitch (about 30 seconds)

“Our system lets users upload a text-based PDF, indexes it with hybrid retrieval, and answers questions with page-number citations. We reduce hallucination by restricting answers to retrieved context and by showing the passages we used. Scanned PDFs without a text layer are out of scope unless OCR is added later.”

Speak it until it sounds natural. Then stop talking and demo.

## PDF parsing questions

**Q: Which library parses PDFs?**  
**A:** PyMuPDF / pymupdf4llm-style extraction — text per page while preserving page boundaries so citations stay honest.

**Q: Why not only dump the entire PDF into the LLM?**  
**A:** Cost, latency, and lost-in-the-middle problems. Retrieval selects relevant chunks; we never need the full document in every prompt.

**Q: Scanned PDFs?**  
**A:** Not supported without OCR. Our scope is text-based PDFs. Future work: OCR then the same chunking pipeline.

**Q: Password-protected PDF?**  
**A:** Out of scope, or requires an explicit decryption step before ingestion — state what your build actually does.

**Q: Tables and multi-column layouts?**  
**A:** Extraction can lose structure; complex tables may flatten. Honest limitation. Show an example if you tested one.

## Retrieval questions

**Q: Why hybrid search?**  
**A:** Vector search catches paraphrases; BM25 catches exact section numbers, dates, and names. We merge ranks (for example with RRF) so both question types work better. See [hybrid search in RAG explained](/blog/hybrid-search-rag-explained).

**Q: Chunk size?**  
**A:** Around 500 tokens with overlap as a starting point — balances enough context against precise retrieval. We tuned by inspecting failures on our sample PDF, not by copying a random blog number blindly.

**Q: Why FAISS / local vectors?**  
**A:** Fits lab machines, no mandatory paid vector DB for undergraduate scope, easy to explain. Hosted options exist for production scale.

**Q: Token limit exceeded?**  
**A:** We retrieve only top-k chunks under the model context budget; the full PDF is not sent.

## Citation questions

**Q: How do you know it is page 12?**  
**A:** The parser tags each chunk with source page metadata. The UI displays that metadata with the answer. The model is instructed to cite; the system does not rely on the model inventing page numbers from memory.

**Demo this live.** Citation visibility is often the strongest moment in a Chat with PDF viva.

**Q: Difference from Ctrl+F?**  
**A:** Semantic paraphrase. User asks “what are the penalties?” and retrieval can find “consequences for violation” on page 8 even without the word “penalties.”

## Failure scenarios you must rehearse

Empty upload, wrong file type, corrupted PDF, question outside the document, missing API key, PDF with no extractable text. The system should say it cannot answer or show a clear error — not invent a confident paragraph.

### Live demo script (about four minutes)

1. Upload a short domain PDF you chose (not the same sample everyone uses).  
2. Ask a narrow question; open citation / retrieved chunk expander; point to the page.  
3. Ask a paraphrased summary question.  
4. Ask something absent from the document — show refusal.  
5. Optionally clear session and mention re-index behavior.

Narrate while spinners run so silence does not feel like a crash.

## Extended Q&A bank

**Q: Why not fine-tune a model on our PDFs?**  
**A:** Fine-tuning needs data, cost, and retraining on updates. RAG updates by re-indexing documents without training.

**Q: Duplicate content across pages?**  
**A:** Overlap preserves sentence context; near-duplicate chunks can be deduplicated as an enhancement. We document what we actually implemented.

**Q: Evaluation metric?**  
**A:** Manual set of about ten questions with expected page numbers; report qualitative results or Precision@k style hits. Undergraduate panels accept careful manual eval if honest.

**Q: Why Groq / OpenAI / other API?**  
**A:** Fast inference for demos; model is swappable via config. The architecture is retrieval-first, not vendor lock-in as the main idea.

**Q: Security of uploaded PDFs?**  
**A:** Processed in temp storage or memory for the session; cleared on reset. We do not train on user uploads. Sensitive docs need user caution — say that.

**Q: Multi-PDF collections?**  
**A:** If your build is one PDF at a time, say so. Future work: document_id in metadata and collection search.

**Q: Multi-language PDF?**  
**A:** Depends on embedding model and PDF text layer. State what you tested.

**Q: Update document after indexing?**  
**A:** Clear index and re-embed. Walk through the clear button in UI.

**Q: LangChain vs custom code?**  
**A:** Name abstractions you used (loader, splitter, store) and why Assistants-style black boxes were not your learning goal: control, cost visibility, and explainability.

## Whiteboard architecture (60 seconds)

Draw: PDF → Parser → Chunks (+ page metadata) → Embeddings → FAISS + BM25 → Merge → Prompt → LLM → Answer + Page citation. Practice until you can draw it without looking at Chapter 4.

### Connecting answers to the report

Parsing → implementation subsection. Chunking and hybrid → design chapter. Tests → Chapter 6 table. Limitations → conclusion / future work. If allowed, keep the report tabbed to the page you need.

## Prompt engineering details worth defending

Show your system prompt in an appendix. Explain instructions: cite page numbers, refuse when context is insufficient, prefer concise bullets for lists. Changing the prompt for your domain is a legitimate customization story — especially if classmates used the default wording.

## Metrics without a research lab

You may not have GPUs or a labeled industry dataset. A hand-built question set on your demo PDF is enough if you describe one failure and how you would fix chunk boundaries or hybrid weights. Do not invent precision numbers you never measured.

### OCR future work path

Tesseract or cloud OCR → text layer → same chunking and hybrid pipeline. This shows you understand the limitation is ingestion, not the idea of RAG.

## Comparison and “why this project” angles

Vs chatbot without retrieval: grounding and citations. Vs summarization-only tools: interactive Q&A on user documents. Vs training a classifier: flexible questions without labeling every intent.

If asked how this differs from a classmate’s PDF bot, answer with your domain PDF, your test matrix, and one customization — see [standing out with the same project topic](/blog/same-project-differentiate).

## Additional panel pressure questions

**Q: Can the model ignore your prompt and hallucinate anyway?**  
**A:** Yes, possible; mitigation is tight context, refusal instructions, and visible citations so users verify. We do not claim zero hallucination.

**Q: What if retrieved chunks contradict each other?**  
**A:** Ideal UI surfaces both passages; model may hedge. Future work: conflict detection. Honesty beats pretending it never happens.

**Q: Cost per query?**  
**A:** Explain qualitatively: embedding once per document, then cheap retrieval + LLM tokens proportional to chunk text. Avoid fake Rupee figures.

**Q: GDPR / privacy?**  
**A:** Academic scope; recommend not uploading confidential data on shared machines; delete temp files on session end.

## Index rebuild UX

Show a progress indicator during embedding. A silent sixty-second freeze looks broken. After index, display page count or chunk count so the panel sees success before the first question.

### Night-before checklist

- Demo PDF chosen and permission-safe.  
- Exact, paraphrase, and out-of-scope questions written on paper.  
- API key loaded; offline screenshots ready.  
- Clear button tested.  
- Architecture drawable from memory.  
- Three limitations memorized without sounding defeated.  
- One customization highlighted.  
- Broader RAG question list rehearsed: [20 RAG viva questions](/blog/viva-questions-rag-projects).

## Soft skills during PDF viva

If Wi-Fi dies, switch to screenshots and explain the pipeline. If the model answers poorly, open retrieved chunks and diagnose: bad retrieval vs bad generation. Panels reward debugging instincts. Do not blame “the AI” as if it were weather.

### Team viva tip

If two of you built it, both must answer parsing and citation questions. “I only did UI” is risky when UI is Streamlit and the pipeline is the project.

Chat with PDF projects are easy to start and easy to defend badly. The students who score well treat citations, hybrid retrieval, and refusal paths as first-class features — then prove them live. Use the kit as a scaffold; use this question bank as rehearsal material until answers are short, concrete, and tied to what your code actually does.

## Building your personal question cards

Write twenty cards: ten technical, five failure, five soft (“why this project,” “team contribution,” “future work”). On the back, write three bullet answers maximum. If your answer needs a paragraph, tighten it. Viva rewards crisp speech.

### Mapping cards to kit modules

Parsing card → parser file. Chunking card → splitter config. Hybrid card → retrieval module. Citation card → metadata + UI expander. Prompt card → prompts file. Testing card → your matrix. This map stops you from memorizing orphan facts.

## Sample model answers at speaking length

**Chunk overlap:** “Overlap keeps sentences that cross boundaries available in both neighboring chunks so retrieval does not lose the connecting phrase.”

**Top-k:** “We keep k small to reduce noise and stay within context limits; increasing k helped one multi-section question but hurt precision on short factoid questions in our tests.”

**Temperature:** “We use a low temperature for factual Q&A so answers stay conservative; creative writing is not the goal.”

Customize numbers to what you actually configured. Do not recite a blog’s defaults if your code differs.

## Examiner personas and how to respond

**Theory-heavy examiner:** offer definitions briefly, then point to your diagram.  
**Demo-heavy examiner:** move faster to upload and citations.  
**Skeptical examiner:** volunteer a limitation before they trap you.  
**Comparison examiner:** contrast RAG vs fine-tuning or PDF vs YouTube timestamps calmly.

You cannot control who walks in; you can control a flexible script order.

### If you go blank

Repeat the question in your own words, draw the next box on the architecture diagram, and answer from the diagram. Silence while staring at the floor is worse than a ten-second redraw.

## Customization stories that sound real

- Changed chunk size after a missed table caption.  
- Added expander for retrieved chunks after a practice viva.  
- Replaced sample PDF with department regulations.  
- Tightened prompt after a hallucinated date in rehearsal.  
- Wrote refusal tests after a friend asked an out-of-scope question.

Each story proves engagement. Inventing stories is worse than saying you followed kit defaults and then measured them — but measurement should still exist.

## Security and academic honesty cross-questions

Expect: “Did you train on our question papers?” No — RAG retrieves at query time; you did not fine-tune on secret papers. Expect: “Can students upload copyrighted books?” Discuss fair academic use caution and college policy; do not encourage piracy. Expect: “Is this a kit?” Disclose and pivot to customization — see integrity guidance linked earlier in related reading patterns.

### Data retention answer template

“Uploads are stored temporarily for indexing during the session. Clearing the session removes the index. We recommend not uploading confidential personal data on shared lab computers.”

## Timing plan for a 10–12 minute slot

Minutes 0–1: pitch.  
1–5: demo (exact, paraphrase, refuse).  
5–9: questions.  
9–10: limitations + future work.  

If questions start early, drop optional paraphrase demo, never drop refusal demo — refusal proves grounding.

### After marks: keep notes

Write down questions you were asked. They become gold for juniors and for your own interview stories. Do not share report text; share question themes.

## Full rehearsal day plan

Morning: cold install check. Noon: full demo twice. Afternoon: friend asks random cards. Evening: light review of limitations only — sleep matters more than a fourteenth reread of Chapter 2.

Chat with PDF vivas are won by visible grounding and calm debugging, not by buzzwords. Keep citations on screen, keep hybrid search explainable, and keep one honest failure path ready.

## Edge documents to test once before you call the project done

Try a one-page PDF, a twenty-page PDF, a file with only images and no text, and a file with heavy bullet formatting. You do not need all of them in the live viva, but your test matrix should show you touched them. When an examiner invents a nasty file type question, you can answer from experience instead of speculation.

### Citation UI wording

Prefer “Source: page 7” over “The model thinks it is page 7.” Metadata-backed wording teaches the panel your architecture in one glance. If the model output omits a page number but the expander shows chunk pages, narrate that the UI is the source of truth for citations.

## Related reading

See [20 RAG viva questions](/blog/viva-questions-rag-projects) and [hybrid search explained](/blog/hybrid-search-rag-explained) for deeper retrieval defense.

## Project kits mentioned

- **[Chat with PDF](/projects/pdf-rag-chat)** — document Q&A kit aligned with this viva bank, including citations and hybrid retrieval.
- **[Chat with YouTube](/projects/chat-with-youtube)** — useful contrast when examiners ask PDF page citations vs video timestamps.

**Takeaway:** Know parsing, hybrid retrieval, citation metadata, and three failure cases cold — then demo citations and a clean “I don’t know.” The Chat with PDF kit is built so you can rehearse those moments instead of inventing architecture answers the night before external viva.

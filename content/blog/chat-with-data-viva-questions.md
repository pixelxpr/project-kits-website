---
title: "Chat with Data viva prep — text-to-code, safety, and retry logic"
excerpt: "Expect questions on pandas code generation, sandboxing, multi-sheet Excel joins, and automatic retry when the LLM hallucinates column names."
category: "Viva Prep"
readTime: "9 min read"
date: "2026-05-10"
---

Chat with Data is not RAG — the LLM writes code, not retrieves paragraphs. Examiners who know the difference will respect you; those who do not need a clear 30-second distinction. Prepare for security, retry logic, and showing generated code in the UI.

![Cover](/blog/chat-with-data-viva-questions.png)

## Architecture distinction

RAG finds existing text; text-to-code computes new answers from structured data. Schema summary + sample rows go to LLM; pandas/Plotly code executes; chart or number returns.

## Safety questions

Q: Arbitrary code execution risk? A: Restricted environment — no network, limited imports, timeout. Q: Malicious upload? A: File size limits, parse-only with pandas, no shell commands.

## Retry loop

If code throws KeyError on column name, pass traceback back to LLM for fix — up to 2 retries. Demo a deliberate wrong column to show recovery.

## Multi-sheet Excel

Each sheet becomes DataFrame; LLM writes joins when question spans sheets. Strong viva demo: ask cross-sheet aggregation.

### Extended Q&A bank

**Q: Why show generated code?** A: Transparency — user verifies computation; examiner sees not black-box.

**Q: SQL injection equivalent?** A: We do not execute user strings as code; only LLM-generated pandas in sandbox.

**Q: Chart types?** A: Plotly chosen for interactivity in Streamlit; matplotlib acceptable alternative.

**Q: Large files?** A: Row limit or sampling for demo; document max upload size in report.

### Demo scenarios

Upload CSV with gender and contribution columns; ask percentage question — pie chart. Upload multi-sheet Excel; ask join question across sheets. Ask ambiguous question — show clarification or error retry.

### Contrast with RAG in one sentence

"RAG retrieves existing sentences; Chat with Data generates new computations from structured columns."

### Report chapter mapping

Chapter 4: schema injection prompt design. Chapter 5: sandbox and retry loop code. Chapter 6: test cases for KeyError recovery and empty file upload.



## Code execution safety

**Q: Why sandbox?** A: LLM-generated code could delete files or exfiltrate data. Sandbox restricts imports, disables network, limits execution time.

**Q: What if pandas code fails?** A: Capture stderr, feed error back to LLM for one retry with fix instruction. Cap retries at 2 to prevent loops.

### Schema exposure

Never send full CSV to LLM — send column names, dtypes, and 3 sample rows. Prevents token blow-up and reduces hallucinated column names.

### Visualization questions

**Q: How are charts generated?** A: Generated code uses matplotlib/plotly; image saved to buffer and displayed in Streamlit. Code inspectable in logs for grading.

### Analytical vs RAG boundary

**Q: Why not RAG on CSV?** A: Numeric aggregation needs computation, not text retrieval. "Average salary by department" requires groupby, not embedding search.

### Sample viva demo flow

Upload sales CSV. Ask total revenue. Ask bar chart by region. Ask question requiring filter — show generated code in expander if UI supports it.

### Libraries

pandas, possibly LangChain pandas agent or custom prompt template. Name versions pinned in requirements.txt for reproducibility.

### SQL variant

If kit supports CSV only, mention SQL connector as future work — same text-to-code pattern with schema introspection on PostgreSQL.

### Large file handling

Sample 100k rows — use head for schema, full file for execution with timeout. Explain memory limits honestly for laptop demo hardware.

## Extended model answers

**Q: Why pandas not SQL for demo?** CSV upload simplicity for viva; SQL same pattern with schema introspection.

**Q: Plot types?** Bar, line, histogram — LLM picks based on question; show one of each in demo prep.

**Q: Malicious code?** Sandbox blocks `os.system`, file writes outside tmp, network calls.

**Q: Empty CSV?** Validation error before LLM call — test case TC-01.

### Architecture diagram labels

Upload → pandas read → schema summary → LLM code gen → sandbox exec → stdout/chart → Streamlit display. Each box one sentence in viva.

### Contrast with RAG

RAG retrieves text; text-to-code computes. Question "sum of column B" requires execution — link [three AI patterns](/blog/three-patterns-for-ai-projects).

### Unit vs integration testing

Test sandbox blocks `open('/etc/passwd')` — one security test case in report impresses. Integration test: known CSV, known question, expected numeric answer within tolerance.

Log generated code to file for viva post-mortem if execution fails — debugging story shows engineering habit.

## Choosing demo CSV wisely

Sales data with clear column names demos well; wide messy spreadsheet with merged header rows fails first code generation — pick dataset intentionally. Include one calculated column question and one filter question and one chart question in rehearsed script — covers pandas operations examiners associate with data analytics projects without requiring machine learning buzzwords.

### Quick reference before viva

Re-read your abstract, test the demo path once on presentation hardware, and sleep. Prepared beats perfect.

## Related reading

See also [three AI patterns](/blog/three-patterns-for-ai-projects).

## Project kits

- **[Chat with Data](/projects/chat-with-data)** — text-to-code with retry.
- **[Chat with PDF](/projects/pdf-rag-chat)** — contrast with RAG architecture.

**Takeaway:** Position as text-to-code, explain sandbox + retry, demo cross-sheet Excel question. Chat with Data includes sample datasets for demo.

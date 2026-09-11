---
title: "Chat with Data viva prep — text-to-code, safety, and retry logic"
seoTitle: "Chat with Data Viva Questions & Prep"
excerpt: "Expect questions on pandas code generation, sandboxing, multi-sheet Excel joins, and automatic retry when the LLM hallucinates column names."
category: "Viva Prep"
readTime: "14 min read"
date: "2026-05-10"
author: "Rajan"
---

Chat with Data is not RAG. The LLM writes code; it does not retrieve paragraphs from a document. Examiners who know the difference will respect a crisp distinction; those who do not still need your 30-second explanation so they stop grading you against a PDF chatbot rubric. Prepare three pillars: architecture clarity, execution safety, and a visible retry when generated pandas code fails on a wrong column name.

![Cover](/blog/chat-with-data-viva-questions.png)

## Opening pitch (30–45 seconds)

Users upload CSV or Excel files. We summarize the schema — column names, dtypes, and a few sample rows — and ask the LLM to write pandas (and optionally Plotly) code that answers the question. The code runs in a restricted environment. If it throws, we send the traceback back for a limited retry. The UI shows the numeric or chart result and, importantly, the generated code so the computation is inspectable. This is text-to-code analytics, not document Q&A.

That last sentence is your firewall against “how is this different from ChatGPT upload?” answers that wander into marketing language.

## Architecture distinction — nail this first

RAG finds existing text spans and asks a model to phrase an answer grounded in those spans. Chat with Data computes new answers from structured tables: averages, filters, joins, group-bys, charts. “What does the policy say about leave?” belongs to RAG. “What is average salary by department?” belongs to text-to-code.

Pipeline boxes to draw: Upload → `pandas.read_csv` / `read_excel` → schema summary (+ sample rows) → LLM code generation → sandbox execute → stdout / dataframe / chart → Streamlit (or web) display. Optional loop: error → retry with traceback → execute again → fail soft after max attempts.

Contrast with [Chat with PDF](/projects/pdf-rag-chat) in one breath: same “LLM in the middle,” different job. For pattern taxonomy across FinalYearKit AI projects, read [three patterns for AI projects](/blog/three-patterns-for-ai-projects) so you use the same names the report uses.

## Schema exposure — never dump the whole file into the prompt

Sending a 50,000-row CSV to the model wastes tokens and still fails when column names are messy. Send: column names, dtypes, null counts if cheap, and 3–5 sample rows. The model invents fewer phantom columns when it sees real headers. Mention this in Chapter 4 as prompt design, not as an afterthought.

### Multi-sheet Excel

Each sheet becomes its own DataFrame (or a dict of frames). Schema summary should list sheet names and per-sheet columns. Cross-sheet questions (“join orders to customers on customer_id and sum revenue”) are your strongest viva demo because they prove the model must plan a merge, not parrot a cell value. Rehearse one join question on the kit’s sample workbook until the chart or table is reliable.

### Wide and messy spreadsheets

Merged header rows, unnamed columns, and dates stored as strings break first-generation code. Pick a clean demo dataset intentionally. Document “messy Excel” as a limitation or as a preprocessing step you added (skiprows, rename columns). Honesty about preprocessing beats a live failure on the HOD’s random download.

## Safety questions — treat them as scoring opportunities

**Arbitrary code execution?** LLM-generated Python could call `os.system`, open network sockets, or read arbitrary files. Your answer: restricted execution — allowlist imports (pandas, numpy, plotly/matplotlib as designed), disable network, timeout, and no shell. Name the mechanism your kit uses (subprocess with limits, restricted builtins, dedicated sandbox helper).

**Malicious upload?** File size cap, extension allowlist (`.csv`, `.xlsx`), parse only through pandas, reject binaries. Do not execute macros. Virus scanning is usually out of undergraduate scope; say so if asked.

**SQL injection equivalent?** You are not concatenating user text into a database engine as SQL. User questions become natural language input to an LLM; only model-generated pandas runs in the sandbox. Still validate uploads and timeouts.

**Why show generated code?** Transparency for the user and grading evidence for the examiner. A wrong chart with visible code is debuggable; a black-box number is not.

### Sandbox test case for the report

Chapter 6 should include at least one negative test: generated or injected code that tries `open('/etc/passwd')` or `import os; os.listdir('/')` is blocked or errors safely. Even a simple unit test around the sandbox wrapper impresses panels more than ten happy-path averages.

## Retry loop — demo the failure on purpose

LLMs hallucinate column names (`Sales` vs `sales` vs `Total Sales`). When execution raises `KeyError` or `NameError`, capture stderr/traceback, append it to a repair prompt, and regenerate — cap at 2 retries to avoid infinite loops and API spend. UI should show “Retry 1/2” or log lines so the panel sees recovery, not magic.

### Deliberate demo script for retry

If your UI always succeeds on the sample file, temporarily ask an ambiguous question or use a sheet with similarly named columns to force a repair — or walk through a logged traceback from rehearsal. Narrate: “First code used `Region`; actual column is `region`; retry fixed the name.” That story is memorable.

## Visualization and chart questions

Plotly is common in Streamlit demos because hover and legend behave well in a browser; matplotlib is acceptable if you render to an image buffer. Let the model choose bar, line, pie, or histogram from the question, but rehearse one of each before viva day. Ask aloud: “Show a bar chart of revenue by region” and expand the code panel so the examiner sees `px.bar` or equivalent.

### Analytical vs RAG boundary again

If someone insists “just embed the CSV,” answer: embeddings do not compute `groupby`. Numeric aggregation requires execution. Keyword search over cell text does not replace `sum` and `mean`. Keep this distinction sharp; it is the intellectual core of the project.

## Large files and laptop reality

State a max upload size (for example 5–10 MB) and/or a max row count for demo hardware. Strategy: use head/sample for schema summary; run code on the full allowed frame with a timeout. If memory blows on a 500k-row file, document sampling as a known limit. Do not invent throughput benchmarks you never measured.

### Libraries and versions

pandas, openpyxl or calamine for Excel, Plotly or matplotlib, Streamlit (or your stack), and whatever LLM client the kit uses. Pin versions in `requirements.txt`. If asked “LangChain agent or custom prompt?”, answer with what you actually shipped — custom schema-injection prompts are easier to explain than a deep agent graph you cannot draw.

### SQL variant as future work

If the kit is CSV/Excel only, say a SQL connector would reuse the same text-to-code pattern with `INFORMATION_SCHEMA`-style introspection. Do not claim live PostgreSQL unless connected and tested.

## Extended model answers

**Q: Why pandas not SQL for the demo?** A: Upload-and-ask fits viva logistics; no DBA setup. Same pattern extends to SQL later.

**Q: Empty CSV?** A: Validate before the LLM call; return a clear error (test case TC-01).

**Q: Non-numeric column in average?** A: Code should fail or coerce; retry or user-facing error — show which path you chose.

**Q: Multiple questions in one session?** A: Session keeps DataFrames in memory; each question generates new code against the same frames until clear/upload replace.

**Q: Determinism?** A: Same file + same question may still vary in code shape across LLM calls; results should match for well-posed aggregations. Mention temperature settings if relevant.

**Q: Privacy?** A: Uploaded HR or finance CSVs may be sensitive; process locally for demo, delete on clear, do not train on user data. Prefer synthetic kit datasets in the viva room.

## Choosing demo CSV wisely

Sales data with clear columns (`region`, `product`, `revenue`, `quantity`, `date`) demos well. Include: (1) a scalar aggregate, (2) a filter question, (3) a chart question, (4) a cross-sheet join if Excel. Avoid needing domain-expert interpretation mid-demo. Seed files in [Chat with Data](/projects/chat-with-data) exist so you are not hunting Kaggle on presentation morning.

## Report chapter mapping

Chapter 1: problem — natural language analytics on tabular files. Chapter 3: functional requirements — upload, schema summary, code gen, sandbox, charts, retries. Chapter 4: DFDs or sequence diagrams for the retry loop; threat model paragraph for arbitrary code. Chapter 5: key functions — schema builder, prompt template, sandbox runner. Chapter 6: cases — happy path, KeyError retry, empty file, oversized file, blocked import. Chapter 7: limits — messy headers, huge files, no write-back to source Excel.

## Live demo flow (four to five minutes)

1. Upload the sample sales CSV; show schema sidebar or expander.  
2. Ask total revenue; show number + code.  
3. Ask bar chart by region; show chart + code.  
4. Upload multi-sheet Excel; ask a join aggregate.  
5. Trigger or narrate a retry from a column mismatch.  
6. Attempt an out-of-scope request (“email this file to…”) and show refusal or sandbox block if applicable.

## Unit vs integration testing

Unit: sandbox rejects disallowed imports. Integration: fixed CSV + fixed question → expected value within tolerance (floats). Log generated code to a file during failed rehearsals — bringing one annotated failure to viva shows engineering habit.

### Prompt template talking points

Describe roles: system instructions (use provided frame names, prefer pandas, assign final result to a known variable, do not invent columns). User message: schema + question. Repair message: previous code + traceback + “fix and return full code.” Examiners who ask “where is the prompt?” should get a report appendix pointer, not a shrug.

## Prompt design that reduces KeyError rates

A good schema block looks like:

```
Sheet: orders
Columns: order_id (int), customer_id (int), amount (float), region (object)
Sample rows:
0 | 101 | 55 | 1200.0 | West
...
Available frames: orders, customers
```

Instructions to the model should say: use only listed column names; assign the final dataframe/scalar/figure to a required variable; do not read files from disk; do not call `input()`; prefer `plotly.express` if charts are enabled. Repair prompts should include the exact failing code and traceback, plus “return a full corrected script, not a diff.”

### Temperature and model choice

Lower temperature (for example 0–0.2) usually helps for code generation. Name your provider (Groq, OpenAI, etc.) and model id from `.env` or config. If the panel asks why not a local LLM, answer with laptop VRAM and demo latency constraints — cloud inference for viva is a valid engineering choice when documented.

## Error taxonomy students should name

- **Schema errors:** wrong column, wrong sheet name → retry loop.  
- **Type errors:** mean on strings → coerce or filter in repaired code.  
- **Empty filters:** query returns empty frame → show friendly message, not a crash.  
- **Plot errors:** wrong plot API → retry or fall back to table.  
- **Sandbox violations:** blocked import → do not retry endlessly; show security message.  
- **Model refusals / empty code:** validate that code string is non-empty before exec.

Mapping each category to a UI message in the report looks like product thinking, not only ML coursework.

## Marks, placement, and department datasets

If your HOD wants “relevant” data, synthesize: semester marks with `student_id`, `subject`, `marks`; placement drives with `company`, `package_lpa`, `branch`; library issue logs with dates. Never upload real student roll numbers and phone numbers to a public LLM. Say in viva: “Synthetic dataset modeled on institutional workflows; no personal data.” That sentence protects you ethically and legally in a college setting.

### Ambiguous questions and clarification

“Compare performance” without a metric should either ask a clarifying follow-up in the UI or default to a documented metric (mean marks, total revenue). Document the default. Examiners sometimes praise clarification UX more than a forced chart.

## Side-by-side with sibling AI kits

| Project | Core move | Typical citation |
| --- | --- | --- |
| Chat with PDF | Retrieve text | Page numbers |
| Chat with YouTube | Retrieve transcript | Timestamps |
| Chat with Data | Execute code | Generated pandas |
| Resume/JD Matcher | Extract then score | Weighted components |

Use this table if the panel has already seen another FinalYearKit AI project that day. It prevents grading you with the wrong rubric. Links: [Chat with YouTube](/projects/chat-with-youtube) for video RAG contrast; [Resume / JD Matcher](/projects/resume-jd-matcher) for extract-score-generate contrast.

## Whiteboard drill (60 seconds)

Draw six boxes only: Upload → Schema → LLM → Sandbox → Result → Retry arrow from Sandbox back to LLM with “traceback.” Say one sentence per box. Stop. Students who overdraw LangChain internals often lose the plot when interrupted.

## Common pitfalls

Calling the project RAG on the title slide. Hiding code so nobody can verify math. Unlimited retries that hang the demo. Letting the model `pip install` mid-run. Demo on a spreadsheet with unnamed `Unnamed: 0` columns. Claiming “production Databricks security” for a laptop Streamlit sandbox. Comparing unfairly to Resume/JD Matcher without naming the pattern difference. Reading full CSVs into the prompt “for accuracy.” Skipping file-size validation then crashing on a 200 MB download.

## Customization checklist for colleges

Replace sample CSVs with department-appropriate synthetic data (marks, library issues, placement stats) without real student PII. Add college logo. Translate UI chrome if required. Keep sandbox rules stricter, not looser, when customizing. Document any extra allowed library in the report. Add a one-page “How to ask good questions” tip sheet for internal demos so faculty do not type essay questions that blow token limits.

## Pre-viva checklist

- [ ] Sample CSV and Excel open on the presentation laptop  
- [ ] Aggregate, chart, and join questions rehearsed  
- [ ] Code expander visible in UI  
- [ ] Retry story ready with traceback language  
- [ ] Max file size and sandbox rules memorized  
- [ ] One-sentence RAG vs text-to-code distinction  
- [ ] `.env` for LLM key works offline from hotspot if Wi-Fi fails  
- [ ] Chapter 6 test IDs match what you might say aloud  

## Related reading

See also [three AI patterns](/blog/three-patterns-for-ai-projects) and [Streamlit tips for AI demos](/blog/streamlit-final-year-ai-demos).

## Project kits

- **[Chat with Data](/projects/chat-with-data)** — text-to-code pipeline, sample datasets, and retry-oriented implementation notes.  
- **[Chat with PDF](/projects/pdf-rag-chat)** — RAG contrast when the panel confuses analytics chat with document chat.

**Takeaway:** Position the project as text-to-code, defend sandbox plus capped retry, and demo a cross-sheet or chart question with code visible. The Chat with Data kit includes sample datasets so your viva path stays reproducible.

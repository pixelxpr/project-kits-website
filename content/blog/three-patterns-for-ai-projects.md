---
title: "Three AI project patterns: RAG, text-to-code, and extract-score-generate"
seoTitle: "Three AI Architectures for Final Year Projects"
excerpt: "Not every AI final-year project should be a chatbot. When to use RAG, text-to-code, or extract-score-generate — and how each defends in viva."
category: "Architecture"
readTime: "14 min read"
date: "2026-02-18"
author: "Rajan"
---

Say "AI project" to most students and the mental image is the same: a chatbot. Ask a question, get an answer.

That pattern fits some problems and is a poor fit for others. Knowing the alternatives is worth more than shipping one more RAG chatbot that looks identical to everyone else's synopsis.

When examiners review final-year AI projects in B.Tech, BCA, and MCA programs, the submissions that stand out match **architecture** to **problem**. Below are three different AI architectures, each solving a different kind of problem, with concrete student-project examples and viva angles.

![Three AI project patterns](/blog/three-patterns-for-ai-projects.png)

If you are still deciding whether to do AI at all, read [How to choose a final-year project](/blog/choosing-a-final-year-project) and [AI vs MERN for final year](/blog/ai-vs-mern-final-year-project) first.

## Pattern 1: Retrieval-Augmented Generation (RAG)

**The problem it solves:** Answering questions grounded in a specific private body of content — a PDF, a video transcript, a policy handbook — where the answer already exists in the source and the job is to find it and phrase it clearly.

**How it works:**

1. Source content is chunked and embedded into a vector index (FAISS, Pinecone, or similar).
2. A user question is matched against that index to retrieve relevant passages.
3. Those passages go to an LLM with a strict "answer only from context" prompt.
4. The UI shows the answer plus citations (page numbers or timestamps).

**When it fits:** Facts and explanations written in the source. "What does section 3.2 say?" or "Summarize the leave policy" are classic RAG problems.

**When it fails:** Anything that requires *computing* a value the source does not state. RAG can quote what a report says about Q3 revenue; it cannot invent month-over-month growth unless that figure is already written down. Aggregation questions ("how many times is X mentioned?") are also a weak spot for pure chunk retrieval.

### Viva angles for RAG

- Why chunking instead of one embedding for the whole file?
- Why FAISS vs a SQL database?
- What happens when retrieval returns irrelevant chunks?
- How do you prove the answer is grounded (citations)?

Drill the longer list in [20 viva questions for RAG projects](/blog/viva-questions-rag-projects) and the pipeline deep dive in [How RAG works](/blog/how-rag-works).

### Student pitfalls

- Demo PDF is a scan with no OCR → empty index.
- No refusal path → model invents fees and rules.
- Classmates all ship PDF chat → forget to differentiate (hybrid search, better evaluation, college-specific corpus).

**Reference kits:** [Chat with PDF](/projects/pdf-rag-chat), [Chat with YouTube](/projects/chat-with-youtube).

## Pattern 2: Text-to-code (the analyst pattern)

**The problem it solves:** Open-ended analytical questions over structured data (CSV/XLSX, sometimes SQL) where the answer must be computed. "What percentage of rows are from Mumbai?" is not sitting in a single cell; it must be calculated.

**How it works:**

1. The system builds a schema summary for the model (column names, dtypes, sample rows).
2. The LLM writes Python (typically pandas, sometimes plotting libraries).
3. Code runs in a restricted environment.
4. Numeric results or charts return to the user.
5. On failure, a retry loop feeds the traceback back to the model for a fix.

**When it fits:** Exploratory questions you cannot pre-build into a fixed dashboard. Business analysts, placement cell CSVs, IoT export tables — when the question space is wide.

**The technical catch:** You are executing model-written code. Sandbox it. No raw `os.system` on your laptop with network and filesystem wide open. Also expect wrong column names on attempt one — retries are part of the architecture, not a shameful patch.

### Viva angles for text-to-code

- How is this different from RAG?
- How do you stop the model from deleting files or calling the network?
- What do you do when generated code throws?
- How do you show the user the code for trust?

### Student pitfalls

- Calling it "RAG over Excel" in the report when you never retrieve chunks — examiners who know the difference will push.
- No sandbox story.
- Only testing happy-path questions with clean column names.

**Reference kit:** [Chat with Data](/projects/chat-with-data).

## Pattern 3: Extract, score, generate

**The problem it solves:** Comparing two complex artifacts and producing an explainable judgment. Not retrieving a fact, not computing a SQL-like aggregate, but scoring a match and explaining *why*. Resume vs job description is the canonical final-year example.

**How it works (pipeline, not one LLM call):**

1. **Extract:** Unstructured text goes to an LLM with a JSON schema — skills, years of experience, education, tools.
2. **Score:** Deterministic code you wrote compares extracted fields with weights and produces component scores.
3. **Generate:** An LLM turns the score breakdown into a readable gap analysis (missing skills, weaker experience, suggested improvements).

**When it fits:** Decision-support tools where the *reason* matters as much as the number — hiring assists, RFP matching, syllabus vs question-paper coverage (with care), vendor comparison.

**Why not one LLM call that returns "85%"?**  
Simpler to build, weak to defend. A black-box percentage gives no audit trail. Named components (Skills 9/10, Experience 4/10) are something an examiner can challenge and you can justify.

### Viva angles for extract-score-generate

- Which parts are probabilistic (LLM) vs deterministic (your formula)?
- How do you handle missing sections in a resume?
- Can a user see why the score dropped?
- What bias risks exist if the extractor misreads a non-standard CV format?

### Student pitfalls

- Hiding the formula and claiming "AI scoring" as magic.
- No sample JD/resume pairs prepared for demo.
- Overclaiming HR replacement — keep scope as assistive tooling.

**Reference kit:** [Resume / JD Matcher](/projects/resume-jd-matcher). See also [explainable scoring deep dive](/blog/resume-jd-matcher-explainable-scoring).

## Side-by-side comparison

| Question type | Prefer |
| --- | --- |
| "What does this PDF say about X?" | RAG |
| "Plot average marks by department" | Text-to-code |
| "How well does this CV fit this JD?" | Extract-score-generate |
| "Summarize this lecture video" | RAG on transcript |
| "Count late deliveries last quarter" | Text-to-code (or SQL), not RAG |

Keep this table in Chapter 1 or 3 when you justify approach.

## Picking the right pattern for your project

The fastest way to pick wrong is to start from the solution ("I want a chatbot") and force the problem to fit.

Start from the problem:

- Is the answer sitting in existing prose? **RAG.**
- Must it be computed from a table? **Text-to-code.**
- Is it a comparison that needs an auditable judgment? **Extract-score-generate.**

Being able to explain *why* you picked the pattern is itself a high-value viva answer.

### Hybrid products (be careful)

Some products combine patterns: retrieve policy text *and* compute from a spreadsheet. For final year, one primary pattern with a thin UI is safer than a vague "AI platform." If you combine, draw two clear pipelines in Chapter 4 and demo both deliberately — do not blur them in speech.

## Reporting and slides by pattern

**RAG:** Architecture slide must show chunk → embed → retrieve → generate. Demo must show citation. Test cases include no-answer.

**Text-to-code:** Architecture slide must show schema → codegen → sandbox → result. Demo must show a chart or aggregate. Test cases include bad column references and retry.

**Extract-score-generate:** Architecture slide must show extract → deterministic score → explanation. Demo must show component breakdown, not only a final percentage.

Your 14-slide deck timing still follows [the 14-slide presentation guide](/blog/final-year-presentation-14-slides); only the middle architecture slides change.

## Differentiation when the batch is full of chatbots

If half your class ships PDF RAG, you can still stand out without changing pattern: hybrid retrieval, stronger evaluation set, domain corpus (your college regulations), multilingual notes, or a polished refusal UX. Or switch pattern entirely to text-to-code or resume matching so the architecture story differs on slide 6.

## Checklist before you commit

1. Write the problem in one sentence without using the word "chatbot."
2. Circle which pattern fits; if none fit, reconsider AI vs MERN.
3. List three demo scenarios that only work if the architecture is correct.
4. List two limitations you will admit in Chapter 7.
5. Confirm lab constraints: CPU-only? API keys allowed? Internet on demo day?
6. Skim a kit README for that pattern so scope is realistic.

## Common misconception cleanup

**"We fine-tuned GPT on our PDF."** Usually false in student projects. You used RAG or prompting. Say so.

**"Embeddings are the LLM."** Embeddings map text to vectors; the generative model writes the answer. Different components.

**"Any AI project needs a neural net we trained."** APIs + classical scoring + retrieval are valid engineering. Training from scratch is rarely the right semester move.

**"Streamlit means it is not serious."** For AI demos, Streamlit is a common, defensible UI choice if the architecture underneath is solid. See [Streamlit for final-year AI demos](/blog/streamlit-final-year-ai-demos).

## Worked mini-scenarios (pick the pattern)

**Scenario A:** A training team has 200 pages of SOPs and wants employees to ask policy questions with proof.  
→ **RAG.** Citations matter more than clever chat tone.

**Scenario B:** A placement cell has a spreadsheet of student marks, attendance, and offers, and keeps asking new aggregate questions each week.  
→ **Text-to-code.** A fixed dashboard will lag behind the questions.

**Scenario C:** An incubator mentors startups and wants a first-pass screen of founder resumes against a role description, with reasons.  
→ **Extract-score-generate.** They will ask why someone scored low on experience.

**Scenario D:** "Build an AI that predicts stock prices and advises trades."  
→ Usually **none of the three** as a responsible final-year core. Data, evaluation, and ethics issues dominate. Prefer a clearer decision-support scope or a MERN operations system.

Walking an examiner through Scenario A–C in Chapter 1 is a strong way to justify your choice.

## Evaluation differs by pattern

Do not copy-paste "accuracy" language across patterns.

- **RAG:** Did we retrieve the right pages? Did the answer stay faithful to chunks? Manual page-match sheets beat vague "it feels good."
- **Text-to-code:** Did the code run? Did the number match a hand-computed baseline for three known questions? Did retries recover from a wrong column name?
- **Extract-score-generate:** Does the JSON extract look correct on messy resumes? Does changing one required skill move the component score the way your formula says?

Chapter 6 should reflect these measures. Panels notice when a RAG project only lists UI click tests.

## Data you are allowed to use

College projects get into trouble with scraped personal data and copyrighted books dumped into indexes.

Safer paths:

- Your own notes or college circulars you have permission to use for academic demo  
- Synthetic resumes and JDs you wrote  
- Public sample CSVs with clear licenses  
- Short demo PDFs included in a kit that you replace with your own corpus  

Document the data source in Chapter 3. If an examiner asks "where did this PDF come from?", you want a calm answer.

## Semester build order (shared across patterns)

1. **Spike the hard part first** (retrieval quality, sandbox execution, JSON extraction).  
2. **Freeze the pipeline diagram** before polishing CSS.  
3. **Write five golden test questions** before adding features.  
4. **Only then** invest in UI chrome and extra pages.  
5. **Last two weeks:** report coherence, slide timing, demo backups — not new architecture.

Students who invert this order (UI first, pipeline last) arrive at viva with a pretty shell and fragile answers.

## How guides often react to each pattern

Guides familiar with web stacks may need a clearer explanation of RAG versus "ChatGPT API wrapper." Bring the four-step diagram. Guides from an ML background may push you toward training; be ready to explain why RAG or deterministic scoring is the right scope for one semester. Neither conversation is confrontation — it is alignment. Bring [How RAG works](/blog/how-rag-works) concepts in your own words, not as a link dump in the meeting.

## Final-year kits built on each pattern

Complete kits that implement the three patterns:

- **[Chat with PDF](/projects/pdf-rag-chat)** and **[Chat with YouTube](/projects/chat-with-youtube)** — RAG with citations (pages or timestamps).
- **[Chat with Data](/projects/chat-with-data)** — text-to-code with sandbox/retry mindset over spreadsheets.
- **[Resume / JD Matcher](/projects/resume-jd-matcher)** — extract-score-generate with decomposable scores.

Each includes source, an 8-chapter report shaped for the pattern, a 14-slide deck, and viva prompts tied to the architecture you actually built.

## One-page decision script you can say in viva

Memorize a version of this and fill the brackets:

"Our problem is [user need]. The answer is not a general chat skill; it requires [retrieve prose / compute from tables / compare two documents]. That is why we used [RAG / text-to-code / extract-score-generate]. In the demo you will see [citation / executed code / score breakdown], which is the evidence that the architecture matches the problem. Limitations include [one honest limit], which we document in Chapter 7."

If you can say that calmly, you already sound more prepared than teams who only say "we used AI and React."

## Anti-patterns that waste a semester

- Starting UI themes before the pipeline returns a correct answer once  
- Adding five LLM calls where one deterministic function would do  
- Calling every project "Agentic Multi-Modal RAG OS" on the synopsis  
- Skipping evaluation because "LLMs are non-deterministic anyway"  
- Hiding the score formula so nobody can challenge it — including you  

Engineering judgment is choosing the smallest architecture that makes the demo’s claim true.

**Takeaway:** Match the pipeline to the question type — retrieve for prose, generate-and-run code for tables, extract-then-score for comparisons. That single decision makes your final-year AI project easier to build and far easier to defend, and it is the same decision baked into FinalYearKit’s Chat with PDF, Chat with Data, and Resume / JD Matcher kits.

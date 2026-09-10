---
title: "Three AI project patterns: RAG, text-to-code, and extract-score-generate"
seoTitle: "Three AI Architectures for Final Year Projects"
excerpt: "Not every final year AI project should be a chatbot. A detailed look at three genuinely different architectures and exactly when each one actually fits."
category: "Architecture"
readTime: "8 min read"
date: "2026-02-18"
---

Say "AI project" to most students and the mental image is exactly the same: a chatbot. Ask it a question, get an answer. 

That is a perfectly fine pattern for some problems, but it is a genuinely *terrible* fit for others. Understanding why this is true — and knowing what the alternative architectures are — is worth vastly more than just being able to build one more RAG chatbot that looks identical to everyone else's.

When examiners review final year AI projects, the ones that stand out are the ones that actually matched the **architecture** to the **problem**. Here are three completely different AI architectures, each solving a different kind of problem, illustrated with real projects built around each one.

![Three AI project patterns](/blog/three-patterns-for-ai-projects.png)

If you're still deciding, read [How to choose a final-year project](/blog/choosing-a-final-year-project) first.

## Pattern 1: Retrieval-Augmented Generation (RAG)

**The problem it solves:** Answering questions grounded in a specific, private body of content — a PDF, a video transcript, a company knowledge base — where the answer *already exists* somewhere in the source, and the job is to simply find it and phrase it clearly.

**How it works:** 
1. Source content gets chunked and embedded into a vector index (like FAISS or Pinecone).
2. A user's question gets matched against that index to retrieve the most relevant passages.
3. Those passages are handed to an LLM to generate the final answer, heavily restricted by a system prompt to prevent hallucination.

**When it fits:** The answer is a fact or explanation that is written down in the source material. "What does section 3.2 say?" or "Summarize the risks in this document" are perfect RAG problems.

**When it fails completely:** Anything that requires *computing* something the source doesn't explicitly state. RAG can tell you what a financial document says about Q3 revenue; it *cannot* tell you the month-over-month growth rate unless that exact percentage happens to be written down in the text. 

## Pattern 2: Text-to-Code (The Analyst Pattern)

**The problem it solves:** Open-ended analytical questions over structured data (spreadsheets, SQL databases) where the answer has to be computed, not found. "What percentage of our users are female?" isn't sitting in any cell of a spreadsheet; it has to be calculated by counting rows.

**How it works:** 
Instead of retrieving text, the LLM writes code. 
1. The model is given a strict summary of the data's schema (column names, data types, a few sample rows).
2. The model writes an actual Python script (commonly using `pandas` and `matplotlib`) to answer the specific question.
3. That code runs in a secure, sandboxed environment.
4. The output of the script — a computed number or a generated chart — is returned to the user.

**When it fits:** Genuinely open-ended questions over tabular data where you can't possibly pre-build a dashboard for every query a user might have.

**The technical catch:** Because an AI is writing arbitrary code that you didn't write yourself, execution *must* be sandboxed. You cannot let it run on your main server with file system or network access. You also need a robust retry loop: if the generated code fails on the first attempt (often by hallucinating a column name), the system should automatically catch the error traceback and ask the LLM to fix its own code.

## Pattern 3: Extract, Score, Generate

**The problem it solves:** Comparing two complex things against each other and producing a highly explainable judgment. Not retrieving a fact, not computing a math equation, but scoring a match and explaining *exactly why*. A Resume Matcher comparing a CV against a Job Description is the canonical example.

**How it works:** 
This is a pipeline, not a single LLM call.
1. **Extract:** Unstructured text is passed to an LLM with strict JSON schema instructions to extract structured data (e.g., pulling a list of skills and years of experience out of a messy PDF resume).
2. **Score:** A hard-coded, deterministic mathematical formula (written by you, in Python/JS) compares the extracted fields and produces a score.
3. **Generate:** An LLM looks at the final score breakdown and generates a human-readable explanation of the gaps.

**When it fits:** Any decision-support tool where the *reason* behind a judgment matters just as much as the judgment itself. 

**Why not just ask the LLM for a score directly?** 
You could — it's much simpler to build. But it's functionally useless. A single "85%" output from a black-box LLM gives the user no way to know *which* requirement drove the score down or what to actually fix. Decomposing the score into named, weighted components (e.g., Skills Match: 9/10, Experience: 4/10) makes it auditable, defensible, and genuinely useful.

## Picking the right pattern for your own project

The fastest way to pick the wrong architecture is to start with the solution ("I want to build an AI chatbot") and work backward. 

Start from the actual problem instead: 
- Is the answer sitting somewhere in existing text? **RAG.**
- Does it need to be computed from a spreadsheet? **Text-to-Code.**
- Is it fundamentally a comparison that needs an auditable judgment? **Extract-Score-Generate.**

The architecture should follow naturally from that answer. Being able to explain exactly *why* you picked the pattern you did is what separates top-tier final year projects from the rest.

## Final year kits built on each pattern

We have complete project kits that implement exactly the three patterns above. If you want to see how they look in practice:

- **[Chat with PDF](/projects/pdf-rag-chat)** and **[Chat with YouTube](/projects/chat-with-youtube)** — Best-in-class RAG implementations, demonstrating chunking, embeddings, and citation mechanisms.
- **[Chat with Data](/projects/chat-with-data)** — The Text-to-Code pattern in action, securely running real pandas/Plotly code against a user-uploaded spreadsheet.
- **[Resume / JD Matcher](/projects/resume-jd-matcher)** — The Extract-Score-Generate pattern, producing a decomposed, highly auditable match score pipeline.

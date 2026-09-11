---
title: "Your classmate picked the same project — how to still stand out"
seoTitle: "Same Project as Classmate — Stand Out"
excerpt: "When classmates pick the same library or RAG topic, stand out with deeper docs, tests, and viva answers — not a unique project title."
category: "Guides"
readTime: "13 min read"
date: "2026-03-12"
author: "Rajan"
---

Duplicate project topics are normal in Indian B.Tech, BCA, and MCA departments. Guides rarely ban two students from building a hotel booking system or a PDF chatbot. What they quietly punish is duplicate *effort* with duplicate *understanding*: identical abstracts, the same demo PDF, the same empty limitation section, and blank stares when asked why a design choice was made. Standing out is not about inventing a topic nobody has heard of. It is about showing decisions, tests, and limitations your classmates skipped.

![Same Project Differentiate](/blog/same-project-differentiate.png)

This guide is written for the common case: you and a classmate both used a similar architecture (or even the same starter kit). You still need a report, a demo, and a viva that feel like *your* work. The tactics below work for RAG demos such as [Chat with PDF](/projects/pdf-rag-chat) and for MERN apps such as [Hotel Booking System](/projects/hotel-booking-system).

## Differentiate through architecture explanation

Two students can run the same Streamlit RAG app. The one who explains why chunk size is around 500 tokens, why overlap exists, and why hybrid search beats pure vector search will score higher. Examiners have seen the topic before; they have not heard *your* justification.

Draw your own diagrams even if the code looks similar. Do not paste a generic internet architecture image into Chapter 4. Sketch Upload → Parse → Chunk → Embed → Retrieve → Generate on paper, then redraw it cleanly in draw.io or PowerPoint with your module names. Rename modules in code and report so terminology matches: if your report says `IngestionService`, the file should not still be called `temp2.py`.

Document one custom enhancement that is real and demoable: re-ranking of retrieved chunks, a small evaluation set with expected page numbers, query rewriting before retrieval, or a clearer citation UI. One enhancement you can explain beats five buzzwords you cannot.

### Architecture viva lines that sound owned

Practice answers like: “We store page metadata on each chunk so citations are not guessed by the LLM,” and “We keep top-k small so the model is not flooded with irrelevant context.” If you cannot say those without reading slides, the architecture is not yours yet — even if the code runs.

## Differentiate through testing

Build a test case matrix with at least 15 cases. Include happy paths *and* failure cases: empty PDF, wrong file type, question with no answer in the source, oversized upload, missing API key, and corrupted file. Show the panel a table in your report — most classmates will not have this.

For MERN projects, test role boundaries: librarian can issue books, student cannot access admin routes, booking clerk cannot delete hotel inventory without permission. Write expected status codes and expected UI messages. A screenshot of a 403 page with a short note in Chapter 6 is stronger than “testing was done manually.”

### How to write a usable test matrix

Columns that work well: ID, precondition, steps, expected result, actual result, pass/fail, notes. Keep it honest. If case T12 failed and you fixed chunk overlap, write that in notes. Examiners trust students who document failure more than students who claim 100% green with no evidence.

### Demo-day testing ritual

The night before viva, re-run five critical cases on the laptop you will actually use. College Wi-Fi, different Python version, and a missing `.env` file break more demos than bad algorithms. Differentiation includes operational readiness.

## Differentiate through domain choice

Same architecture, different dataset. Chat with PDF on medical leaflets vs legal contracts vs your college syllabus vs lab safety manuals. The pipeline is identical; the demo story is yours. When you upload a document you chose and explain why that domain matters, the panel hears ownership.

For MERN: customize seed data to a local hotel, restaurant, or fleet company name. Replace “Hotel ABC” with a plausible local brand, realistic room types, and Indian address formats. Examiners notice when demo data looks thoughtful rather than generic `user1` / `test123`.

### Domain storytelling without fluff

Spend two sentences in the problem statement on who suffers today: students hunting clauses in a long syllabus PDF, front-desk staff double-booking rooms, drivers without license expiry checks. Then map each pain to a module. Domain is not decoration; it is how you justify features.

## Differentiate through viva preparation

Read a question bank for your project type. Prepare honest limitation answers. Know one “future work” item you would implement next month with specific libraries — OCR for scanned PDFs, email OTP for admin login, or audit logging for inventory changes — not vague “add AI later.”

When asked how your project differs from others, answer with specifics: “I added hybrid search evaluation with ten labeled questions,” or “I implemented record-level driver checks in the fleet module.” Generic lines like “mine is better” or “I used latest technology” fail immediately.

For deeper viva patterns on RAG, pair this article with [common viva mistakes CS students make](/blog/common-viva-mistakes-cs) and rehearse out loud, not only in your head.

## What not to do

Do not claim your project is unique worldwide. Do not badmouth classmates. Do not add blockchain, NFTs, or “quantum” to a library system just for buzzwords. Do not rename variables five minutes before viva and pretend that is customization. Do not share identical report paragraphs with a friend who bought the same kit.

### Report differentiation beyond code

Rewrite the abstract and problem statement for your domain. If your classmate’s abstract mentions “general documents” and yours mentions “college laboratory safety manuals,” you already look like different projects to an external examiner skimming twenty submissions in one afternoon.

Add a short “Project Customization” subsection in the implementation chapter: list UI changes, seed data, extra test cases, and any feature you added. Two honest paragraphs here can shift perception from “template” to “engineered product.”

### Demo script differentiation

Do not demo with the default sample PDF everyone uses. Bring a domain-specific document: your department syllabus, a public annual report, or a textbook chapter you have permission to use. Narrate why that domain matters while the upload runs so dead air does not make the panel restless.

### Collaboration vs copying

Working with a kit is not the same as sharing submissions with a friend. Sharing report paragraphs, identical test case tables, or the same demo script crosses integrity lines even when code bases started identical. Differentiate early in the semester, not the week before viva. Discussing concepts is fine; pasting Chapter 3 is not. See also [using project kits with academic integrity](/blog/academic-integrity-project-kits).

## Customization ideas that examiners notice

For RAG projects: add a small evaluation notebook or Chapter 7 table with five to ten hand-labeled questions and whether retrieval found the right page. For MERN: implement email OTP, password reset flow polish, or an audit log for admin actions — features classmates skip. For ecommerce: show order status handling or inventory rollback thinking when payment fails.

Document every customization in Chapter 5 with before/after screenshots. In viva, lead with: “My contribution beyond the base architecture is X.” That sentence forces you to have an X.

### What not to claim

Do not rename the project topic and pretend the architecture is novel if it is standard RAG or standard RBAC. Examiners recognize patterns. Honesty about building on documented architecture plus your testing and domain data is stronger than false novelty claims.

### Panel psychology

External examiners see dozens of projects per season. They remember students who demo failures gracefully and who point to test case tables. They forget students who read slides verbatim. Differentiation is behavioral as much as technical: eye contact, paced demo, and “I don’t know yet — here is how I would find out” beats bluffing.

### Week-by-week differentiation plan

Week 1: pick a domain dataset unique to you and write three sentences of problem statement around it. Week 2: add at least five custom test cases peers will skip. Week 3: draw one architecture diagram yourself and align module names. Week 4: rehearse viva answers your classmates do not know, including limitations. Small deliberate steps beat last-minute rename hacks.

### Checklist before you call it “different enough”

- Abstract and problem statement name *your* domain, not “general users.”
- At least one diagram you drew, with your module names.
- Test matrix with failure cases, not only happy paths.
- Demo data or demo PDF nobody else in your batch is using.
- One customization you can demo in under two minutes.
- Three limitation answers that sound honest, not apologetic.
- Future work that names a concrete next step.
- Report text that does not match a classmate’s paragraphs.

### Concrete examples by project type

If you chose [Chat with PDF](/projects/pdf-rag-chat), differentiate with citation UX, hybrid retrieval explanation, and a labeled question set on *your* PDF. If you chose hotel booking, differentiate with realistic room inventory rules, cancellation policy logic, and role-separated dashboards. If two of you both build RAG, your datasets and evaluation tables should still diverge.

If classmates crowd the same MERN theme, pick a depth slice they ignore: reporting screens, audit trails, or edge-case validation. Breadth without depth looks like a clone; depth on one risky module looks like engineering.

### Handling the “same kit” accusation

If someone on the panel says “this looks like a common starter,” do not panic. Agree that the architecture pattern is common, then walk them to your customization section, your test matrix, and a live change: tweak a prompt line, change chunk size, or flip a role permission and show the effect. Proof of understanding beats denial.

### Soft skills that still count as differentiation

Arrive with a working backup plan: screenshots, a short recorded clip of the happy-path demo, and a printed architecture diagram. When Wi-Fi dies, the student who continues calmly looks prepared. That impression sticks even when the topic is shared across the batch.

## Examiners notice process, not just features

Differentiation is easier when you leave a paper trail. Keep a simple lab notebook (even a Markdown file) with dates: “changed chunk overlap from 50 to 100 after missed sentence,” “added cancellation fee field to booking schema,” “wrote T14 empty-file case.” In viva, that notebook becomes proof you iterated. Classmates who only renamed the title have nothing comparable to show.

### Screenshot discipline

Capture before/after for UI branding, a failing test that you later fixed, and the final happy-path answer with citations or role dashboards. Place screenshots in Chapter 5–6 with captions that name the customization. Vague galleries of random screens help less than three purposeful images.

### Oral differentiation under time pressure

External vivas are short. Lead with your differentiator in the first minute: domain, evaluation table, or the one feature you added. If you wait until the last slide, the panel may already mentally file you under “another library system.”

## Domain pack ideas you can actually prepare

**RAG / PDF:** department academic regulations, lab safety manual, club constitution, publicly available product manual you are allowed to use. Prepare ten questions with expected pages.

**Hotel / restaurant / fleet MERN:** local pricing rules, GST-style fields if relevant to your story, shift timings, vehicle insurance expiry, table turnaround assumptions. Seed data should survive a glance from someone who has stayed in a real hotel or eaten in a real restaurant.

**Library MERN:** Indian category schemes for your department’s books, fine rules your college actually uses (ask the librarian politely), and role demos that match how your library desk works.

### Do not fake domain expertise

If you claim medical RAG, do not invent clinical advice. Use public educational leaflets and state the project is for information retrieval practice, not diagnosis. Integrity and differentiation travel together.

## Report language that signals ownership

Weak: “The system is developed using advanced technologies for better efficiency.”  
Strong: “We index laboratory safety PDFs with hybrid retrieval so students can ask clause-level questions and see page citations.”

Weak: “Testing was performed successfully.”  
Strong: “Fifteen cases covering upload failures and out-of-document questions; three failed initially when overlap was too small; fixed and retested.”

Replace empty adjectives with objects, counts, and outcomes from your machine.

### Abstract rewrite exercise

Take any kit-like abstract and rewrite it in fifteen minutes using only your domain nouns. Read both aloud. If they sound interchangeable, rewrite again until a classmate could not paste yours into their report unnoticed.

## Handling shared labs and shared laptops

College labs often have one MongoDB install and broken pip mirrors. Differentiation includes documenting your setup steps in an appendix: Python version, Node version, how you created the venv, how you seeded data. When the panel asks “how did you run this here,” you answer from your appendix instead of shrugging. That operational clarity is rare and memorable.

### Backup differentiators if live demo fails

Printed architecture diagram, test matrix page, and three screenshots of citation or RBAC demos. Students who only prepared a live path look identical when Wi-Fi dies. Students with artifacts still look prepared.

## Mini case: two students, one RAG topic

Student R demos the default PDF, reads slides, and says limitations are “future enhancements.” Student S demos the department syllabus PDF, shows a table of ten questions with hit/miss pages, demos an out-of-scope question, and explains why hybrid search helped on a course-code query. Same topic title on the registration form. Different viva outcomes. Aim to be Student S.

### Mini case: two students, one hotel topic

Student R uses `admin` / `admin` and “Room 101.” Student S seeds a plausible property name, shows double-booking prevention, and explains which role can alter rates. Same MERN pattern. Different seriousness signal.

## What “depth” means in Chapter 7–8

Results should mention what you measured or observed on *your* runs. Limitations should mention what broke on *your* documents or roles. Future work should name a library or module, not “add AI” to a MERN app as decoration. Depth is specificity under your own name.

## Related reading

For kit ethics and disclosure language, see [using project kits with academic integrity](/blog/academic-integrity-project-kits). For branding and college-specific polish, see [customizing a kit with your college name](/blog/customize-kit-college-name).

## Project kits mentioned

- **[Chat with PDF](/projects/pdf-rag-chat)** — customize demo PDFs, citations, and evaluation examples for your domain.
- **[Hotel Booking System](/projects/hotel-booking-system)** — seed data, roles, and report sections you can personalize without changing the whole stack.

**Takeaway:** Same topic, different depth — testing tables, honest limitations, domain-specific demos, and confident viva answers beat a “unique” title every time. Kits are starting points; your report, test cases, and viva answers are the differentiator. FinalYearKit projects are built so you can customize dataset, UI, and evaluation without pretending you invented RAG or RBAC from scratch.

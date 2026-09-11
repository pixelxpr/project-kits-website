---
title: "How to build a 14-slide final year presentation that fits in 10 minutes"
seoTitle: "14-Slide Final Year Presentation Guide"
excerpt: "Slide-by-slide guidance for a 10-minute final-year project presentation — what to show, what to skip, and how to handle the demo slide without crashing."
category: "Guides"
readTime: "13 min read"
date: "2026-03-05"
author: "Rajan"
---

Ten minutes is shorter than you think. Many students prepare 25 slides and rush from slide 8 while the panel stops tracking. Fourteen slides is a practical sweet spot: enough depth to show understanding, short enough to leave room for a live demo and a few questions.

![Final Year Presentation 14 Slides](/blog/final-year-presentation-14-slides.png)

This guide is written for Indian B.Tech / BCA / MCA project presentations where a guide, internal panel, or external examiner watches a short talk plus demo. Keep your report aligned using [the 8-chapter report structure](/blog/eight-chapter-report-structure), and design the demo itself using [what examiners look for in a demo](/blog/what-examiners-look-for-demo).

## Slide 1: Title

Project title, your name(s), roll number(s), guide name, department, college. Clean layout. No animated fireworks. If your college requires a logo, place it once — do not wallpaper every slide with it.

**Speak (≈30 seconds):** Introduce the team and the project title only. Do not start the problem statement here.

## Slides 2–3: Problem and objectives

**Slide 2 — Problem:** three bullets max describing a real user pain. Example: students cannot search a 80-page regulation PDF quickly; staff repeat the same answers.

**Slide 3 — Objectives:** numbered objectives that map to features you will demo. If an objective cannot be shown, it does not belong on this slide.

**Pitfall:** Problem slide filled with global AI hype instead of your user.

## Slides 4–5: Literature and gap

**Slide 4:** one comparison table (3–5 rows). Tools/approaches vs limitation.

**Slide 5:** one-sentence gap + your approach name (RAG with citations, MERN RBAC booking, extract-score-generate, etc.).

Do not read the table row by row. Summarize: "Prior tools either lack citations or lack role checks; we focus on X."

## Slides 6–8: Architecture

**Slide 6:** high-level block diagram.

**Slide 7:** data flow for one user action (ask question, place order, issue book).

**Slide 8:** tech stack with one-line justification per major tool.

### AI vs MERN on these slides

- **AI / RAG:** say chunking, embeddings, retrieval, generation out loud. Show where citations come from. Kits like [Chat with PDF](/projects/pdf-rag-chat) and [Chat with YouTube](/projects/chat-with-youtube) are built so this story is visual.
- **Text-to-code:** schema → code → sandbox → chart ([Chat with Data](/projects/chat-with-data)).
- **MERN:** browser → API → MongoDB, plus auth middleware. Show admin vs user path if RBAC matters ([Library Management System](/projects/library-management-system), [MERN E-Commerce](/projects/mern-ecommerce)).

**Pitfall:** Only a chat screenshot labeled "architecture."

## Slides 9–10: Implementation highlights

One screenshot per slide. Call out one non-obvious design decision on each:

- Hybrid search or re-ranking
- Server-side price calculation
- HMAC / signature verification for payments
- Deterministic score breakdown for resume matching
- Timestamp citation click behavior

These slides prove you made engineering choices, not only UI.

## Slide 11: Testing

Small table — about five visible rows. In speech, say you documented more in Chapter 6 (give a number you can stand behind from your report). Include at least one negative or edge case in the visible rows.

**Pitfall:** All-green table with only happy paths.

## Slide 12: Live demo

Title the slide "Live Demo" and list three scenarios. Examples for RAG:

1. Factual question with citation
2. Paraphrased question
3. Question with no answer in the source (refusal)

Never demo without a rehearsed script. Use seeded data. Have backup screenshots if campus Wi-Fi fails.

**Timing:** protect about two minutes. This is the slide panels remember.

## Slides 13–14: Results and close

**Slide 13:** sample outputs / results screenshots.

**Slide 14:** short conclusion + one realistic future enhancement + Thank you. No wall of references. References belong in the report.

## Delivery tips

Speak to the panel, not the projector. Average about one minute per slide, longer for demo. If interrupted, answer briefly and continue — do not restart from slide 1.

Practice with a timer three times. Record yourself once to catch fillers ("basically", "like", "uh").

### Handling panel interruptions

If someone asks a deep question on slide 6, give a 20-second answer and offer to expand after the demo. Confidence under interruption matters as much as slide polish.

### Font and contrast rules

Minimum roughly 24pt body text. Dark text on light background for bright rooms. Avoid tiny code dumps. Avoid red/green-only legends that wash out on projectors.

### Demo backup plan

Keep a screenshot sequence: upload → question → answer with citation (or order → pay → success). If the live app freezes, narrate the screenshots. Panels prefer an honest backup to a three-minute spinner.

### Practice schedule

- **Day 1:** write speaker notes (not a full essay).
- **Day 2:** timed run.
- **Day 3:** record; watch for pacing.
- **Day 4:** present to one blunt friend.
- **Day 5:** final run on the same laptop and browser you will use.

## Slide-by-slide timing table

| Slide | Topic | Target time |
| --- | --- | --- |
| 1 | Title | 30 sec |
| 2 | Problem | 45 sec |
| 3 | Objectives | 45 sec |
| 4 | Literature | 60 sec |
| 5 | Gap / approach | 45–60 sec |
| 6–8 | Architecture | ~3 min total |
| 9–10 | Implementation | ~2 min |
| 11 | Testing | 45 sec |
| 12 | Live demo | ~2 min |
| 13–14 | Results + close | ~90 sec |

Stay near ten minutes with buffer for one short question mid-talk if your department allows it.

## What to cut when you are over time

Never cut the demo. Shorten literature. Merge implementation screenshots. Move extra slides to a hidden appendix only if your panel explicitly allows backup slides.

## Questions to expect after slide 14

- **What is your contribution?** Name one customization, test suite, or design decision you own.
- **What failed during development?** One honest story with a fix.
- **What would you deploy differently?** Env vars, HTTPS, rate limits, managed secrets — short and practical.
- **Why this stack?** One sentence per major choice, matching slide 8 and Chapter 4.

For RAG-heavy panels, also prep answers from [viva questions for RAG projects](/blog/viva-questions-rag-projects).

## Rehearsal checklist the night before

- Charge laptop; carry charger.
- Disable OS update popups and notification banners.
- Open the app and login before you enter the room.
- Load sample PDF / seed MongoDB / have test payment credentials ready.
- Browser zoom set so UI is readable on HDMI.
- PDF of report on phone or drive if glancing is allowed.
- Backup screenshots folder on the desktop.
- Know who speaks which demo step in a team.

## Team presentation etiquette

One primary narrator for architecture; a second person drives the demo mouse. Do not argue on stage. If a teammate blanks, step in with one sentence, then hand back. Examiners notice coordination.

## Common presentation anti-patterns

- Reading every bullet word-for-word.
- Apologizing constantly ("this is just a student project").
- Live coding or `npm install` during the slot.
- Showing `.env` secrets on screen share.
- Twenty fonts and animated transitions.

## Speaker notes that help (and notes that hurt)

Good notes: three bullets per slide with verbs ("show diagram", "mention FAISS offline", "transition to demo").  
Bad notes: full paragraphs you will read aloud. If you need that much text, the slide is overcrowded — move detail to speech or to the report.

Print a one-page timing sheet for your pocket: slide number, cue phrase, target seconds. Teams can assign who owns each cue.

## Room and hardware realities on Indian campuses

Expect at least one of: HDMI adapter missing, low projector brightness, blocked localhost ports, captive Wi-Fi login, or a machine that sleeps mid-demo. Mitigations:

- Arrive 20–30 minutes early when allowed.  
- Carry your own HDMI/USB-C dongle.  
- Run the app on `127.0.0.1` already logged in.  
- Lower animation and video autoplay.  
- Keep font sizes large enough for the back row.  
- If dual display mirrors poorly, present from the laptop screen while the projector shows a simpler slide PDF.

These logistics are part of engineering the demo, not optional polish.

## Scripting the three demo scenarios

Write the scenarios as a tiny playbook:

1. **Setup line:** "I will upload our academic regulations PDF."  
2. **Action:** paste question 1.  
3. **Point:** "Note the page citation here."  
4. **Action:** paraphrase question.  
5. **Action:** impossible question → refusal.  

For ecommerce: browse → add to cart → pay in test mode → show verification step. For library: student request → admin approve → unauthorized blocked. Keep the playbook on a second device, not on the projected slide.

## After "Thank you": the first 60 seconds of Q&A

Panels often open with something broad: "Explain your contribution" or "Walk through the architecture again." Have a 45-second encore version of slides 6–7 ready without restarting the full deck. Stand still, answer, then offer to reopen a specific slide if helpful. Fumbling to find slide 17 of 40 is why fourteen slides win.

## Nervous energy: channel it

Speak slightly slower than feels natural. Pause after diagrams. Do not fill silence with "basically." If you blank, glance at the slide title — it is your outline. Sip water between sections, not mid-sentence. Teams should agree on a subtle handoff signal before entering the room.

## Aligning slides with the report

| Slide theme | Report chapter |
| --- | --- |
| Problem / objectives | Ch. 1 |
| Literature / gap | Ch. 2 |
| Architecture / stack | Ch. 4 |
| Implementation highlights | Ch. 5 |
| Testing | Ch. 6 |
| Results / future | Ch. 7–8 |

If names disagree across artifacts, fix them before the print deadline.

## Content density rules (stop the wall of text)

Each slide should survive the "arm’s length" test: can someone in the second row read the bullets without squinting? If not, cut words. Prefer diagrams and short labels over paragraphs. Put definitions in speech: the slide says "Hybrid retrieval"; you say what BM25 adds in one sentence.

Never paste a full code file onto a slide. If you must show code, show 6–10 lines of the critical function and highlight the line that embodies the design decision (signature verify, cosine search, role middleware).

## Dry run scoring sheet (for your friend)

Ask your rehearsal partner to score 1–5 on:

1. Could they restate the problem after slide 3?  
2. Did architecture make sense without reading the report?  
3. Was the demo purpose obvious before it started?  
4. Did you finish near ten minutes?  
5. Did you answer one interruption without panicking?

Anything scoring 1–2 gets fixed the same day — usually by cutting slides 4–5 or rehearsing demo hands.

## Project kits mentioned

- **[Chat with YouTube](/projects/chat-with-youtube)** — 14-slide deck with timestamp demo energy.
- **[Chat with PDF](/projects/pdf-rag-chat)** — citation-friendly demo scenarios for slide 12.
- **[MERN E-Commerce](/projects/mern-ecommerce)** — payment flow diagram suitable for architecture + demo slides.

## Full example narrative (RAG, ~10 minutes)

Use this as a rehearsal script skeleton; replace bracketed bits:

1. **Title:** names and project.  
2. **Problem:** long PDFs, slow search, risk of wrong advice from generic chatbots.  
3. **Objectives:** upload, ask, cite pages, refuse when missing.  
4–5. **Gap:** prior tools lack student-controlled corpus + citations together.  
6–8. **Architecture:** chunk, embed, FAISS retrieve, generate; stack justifications.  
9–10. **Implementation:** hybrid search decision; citation UI screenshot.  
11. **Testing:** five rows including no-answer.  
12. **Demo:** three scenarios from the playbook.  
13–14. **Results + thank you:** one future item (OCR).

Time yourself. If architecture alone eats six minutes, cut literature — not the demo.

## Full example narrative (MERN ecommerce, ~10 minutes)

1. Title.  
2. Problem: campus store needs cart + online pay without sharing card data with your Node process carelessly.  
3. Objectives: catalog, cart, Razorpay test pay, order history, admin products.  
4–5. Gap vs plain CRUD shops without signature verification.  
6–8. React–Express–Mongo + payment verify sequence.  
9–10. Server-side amount checks; webhook/verify highlight.  
11. Tests: tampered amount rejected; unauthorized admin blocked.  
12. Demo: add to cart → pay test → order appears.  
13–14. Results + future (invoices / email).

Same timing discipline applies. Payment demos fail when keys are missing — check env before you enter.

## Accessibility and inclusivity basics

Not every panelist sees the projector equally well. Narrate what you click ("I am opening the admin issue queue"). Avoid relying only on color to mean pass/fail in test tables — include text labels. If a teammate has a quieter voice, give them the demo driving role with a headset mic if the room provides one. Clear communication is part of the grade culture even when not written as a rubric line.

## What "good enough" slides look like the morning of

You do not need cinematic motion graphics. You need:

- Readable type  
- One idea per slide  
- Diagrams that match the report  
- A demo that completes in two minutes  
- Backup screenshots  
- Calm pacing  

If those are true, fourteen slides are enough — which is the entire point of this structure.

**Takeaway:** Fourteen slides, three rehearsed demo scenarios, and one timed run beat a 30-slide encyclopedia nobody finishes. FinalYearKit projects include a 14-slide deck aligned to this structure so you can focus on delivery, backup plans, and crisp answers after the thank-you slide.

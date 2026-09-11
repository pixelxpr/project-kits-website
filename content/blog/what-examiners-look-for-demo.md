---
title: "What examiners actually look for in your project demo"
excerpt: "Not flashy UI — traceability, edge-case handling, and you explaining one design decision live while the app runs. Here is how panels read your demo."
category: "Viva Prep"
readTime: "14 min read"
date: "2026-08-05"
author: "Rajan"
---

The demo is not a product trailer. It is proof you built and understand the system. Examiners watch whether you navigate confidently, handle a wrong input, and explain one backend decision while the UI is live. Flashy gradients do not compensate for a login that fails on the college projector laptop. Calm narration plus a working path does.

![Cover](/blog/what-examiners-look-for-demo.png)

This guide breaks down what Indian B.Tech / BCA / MCA panels tend to reward and punish during demos, with concrete scripts for MERN and AI kits. Use it with [common viva mistakes](/blog/common-viva-mistakes-cs) and the [14-slide presentation guide](/blog/final-year-presentation-14-slides). Practice on projects such as [Chat with YouTube](/projects/chat-with-youtube) (timestamp traceability) and [vehicle fleet management](/projects/vehicle-fleet-management-system) (role switching).

## Mental model: what the demo is scoring

Departments publish different rubrics, but demos usually feed more than one bucket: working system, presentation skill, and viva Q&A. A broken main path hurts twice — once as “not working,” once as “student cannot show.” Treat the demo as evidence, not cinema.

### Internal vs external focus

**Internal guide** often cares about weekly progress, honesty about blockers, and whether the demo matches what they saw in reviews.  

**External examiner** often cold-reads your abstract minutes before you enter. If the abstract promises hybrid search, RBAC ownership, or Razorpay verification, the live demo must show that promise. Mismatch triggers skeptical questioning of everything else. Treat the abstract as binding.

## The three scenarios every demo needs

### 1. Happy path (under two minutes)

Core value only: issue a book, complete a paid order, ask a PDF a question with a citation, assign a fleet trip, book a room. Cut side quests. One perfect flow beats three rushed half-flows.

### 2. Edge case / graceful failure

Empty input, wrong password, out-of-scope question, overlapping booking, driver opening another driver’s trip. The UI should show a human message, not a stack trace. Mention that details go to logs/server console if asked.

### 3. Traceability

Something that proves the system is not a fake frontend:

- RAG: open retrieved chunks / citation / timestamp link ([Chat with YouTube](/projects/chat-with-youtube) timestamp click is ideal).  
- MERN: Network tab only if asked; otherwise show audit log, order status after server verify, or ownership 403.  
- Fleet: dispatcher vs driver view for the same trip ([fleet kit](/projects/vehicle-fleet-management-system)).  

Traceability is where examiners decide you understand the backend.

## First 60 seconds

Panels form a confidence read quickly. Pattern that works:

1. One-sentence problem (“Small fleet needs trip assignment and driver-only updates”).  
2. App already running — no `npm start` theatre unless asked.  
3. Login or upload without fumbling for files on the Desktop.

If you must start servers live, script the commands and have MongoDB already up.

## Narration: say it before you click

Silent clicking confuses non-specialist externals. Speak the story: “I am logging in as dispatcher to create a trip,” then click. “I am uploading the syllabus PDF,” then upload. The examiner follows a plot; you are not a magician.

### What impresses

- You type the scenario without reading a script off your phone.  
- You explain server-side validation during a MERN action (“price is recomputed on the server”).  
- You open a retrieval expander during a RAG demo without being forced.  
- You admit cleanly: “We have not implemented refunds; that is future work.”

### What fails

- Long loading with no feedback and no narration.  
- Apologizing for a “small bug” on the main feature.  
- Playing a recorded video while you stand silent (unless department mandates video and forbids live runs).  
- “It worked yesterday.”  
- Report numbers that disagree with the live screen (test counts, booking totals).

## Timing and formats

Ask your coordinator how long you get. Common patterns:

- 8 minutes slides + 2 minutes demo → one golden path only.  
- 10 minutes flexible → happy + one edge.  
- “Skip slides, demo only” → app open within 30 seconds; architecture spoken while clicking.

Leave a little time for examiner-driven clicks if the format allows. Students who fill every second with talking get interrupted mid-sentence and lose the traceability beat.

## Before you enter the room (environment checklist)

- [ ] App running; DB seeded  
- [ ] API keys / `.env` present on *this* machine  
- [ ] Laptop charged; charger in bag  
- [ ] HDMI/USB-C adapter  
- [ ] Browser zoom 100%; notifications off; dark theme readable on projector  
- [ ] Sample accounts on paper: roles labeled  
- [ ] Backup screenshots for TC happy/edge/trace  
- [ ] Demo branch = submitted tag  

Two minutes of setup beats five minutes of apology. This overlaps [common viva mistakes](/blog/common-viva-mistakes-cs) Mistake 8 for a reason — environment is part of the demo.

## During examiner interaction

If they ask to try the app, offer the keyboard politely. If they break a flow, stay calm: refresh, re-login, use backup screenshot, continue narration. Do not snatch the laptop rudely; do not joke that they “ruined it.”

If they open DevTools, know what calls fire on login. If you are unsure, say you will navigate to the auth middleware file and show the route — code ownership probe is common.

### Code ownership probes

Examples: “Change this button label,” “Where is auth middleware?”, “Show the HMAC verify function.” Practice `Ctrl+P` / quick open to the file. Thirty seconds of searching is fine; three minutes of Desktop browsing is not.

## MERN-specific examiner focus

- Server validates; client is UX.  
- Roles: show two logins.  
- Payments: verify path, test mode ([ecommerce](/projects/mern-ecommerce) if that is your project).  
- Prefer closed DevTools until asked — random console errors distract.  
- Know which API call creates vs lists resources.

### Fleet / hotel / library beats

Fleet: ownership 403. Hotel: date overlap rejection. Library: librarian vs member capabilities. Pick the beat that matches your abstract.

## AI / RAG-specific examiner focus

- Show retrieval unprompted.  
- Do not hide that an LLM API is involved.  
- Ask one question that must use *your* document, not general knowledge.  
- For YouTube: click a timestamp and show player seek if implemented.  
- Limitations: corpus size, language, hallucination still possible if retrieval misses.

Streamlit demos should avoid re-uploading huge files live — have a ready small PDF or cached index for the golden path.

## Group projects

Each member demos one module; everyone knows the others at summary level. Hand off explicitly: “I showed booking; Anita will show payments.” Do not contradict teammates’ limitation lists.

## Report consistency

Counts, screenshots, and test IDs in Chapter 6 should match what you show. If you reseeded with new data yesterday, update the report or use the same seed as the PDF screenshots.

## Soft skills (necessary but not sufficient)

Neat dress per department norms, arrive early, thank the panel, do not interrupt. Soft skills do not save a dead database; they tip borderline impressions when the system works.

### Scoring mental model (illustrative, not a claim about your university)

Many panels roughly weight working system, report, presentation, and viva. Demo feeds working + presentation. Plan accordingly: polish the path you will show, not every screen in the repo.

## Signals that impress vs worry

**Impress:** why-before-click; citation/log unprompted; clean scope admission; abstract fulfilled live.  

**Worry:** long silence on errors; cannot find middleware; abstract says “hybrid search” but demo is keyword-only; arguing about projector cables.

## After demo transition

Use a clean handoff: “That completes the demo; I can go deeper on architecture, testing, or limitations.” Then stop talking. Let them steer. Note questions you missed; if appropriate, briefly clarify with your guide afterward — rare, but professional.

## Script templates you can adapt

### RAG (PDF)

“Upload → question on section 2 → open sources → empty question shows validation → note limitation: English PDF focus.”

### YouTube

“Paste known URL / use seeded video → ask for a topic → click citation timestamp → show seek.”

### Fleet

“Dispatcher creates trip → driver login sees only own trip → other driver blocked → complete trip frees vehicle.”

### Ecommerce

“Add to cart → checkout test pay → history paid → mention server HMAC (draw if asked).”

Time each script with a phone stopwatch until it is boring. Boring rehearsal makes calm viva.

## When the panel says “just show something working”

Do not restart your slide philosophy. Open the app, run happy path, offer edge if time remains. Flexibility is itself a positive signal.

## Linking demo prep to the rest of your submission

Choose the project with [choosing a final year project](/blog/choosing-a-final-year-project) logic earlier in the year; finish with demo discipline. A well-chosen scope is easier to demo honestly. Avoid abstract promises you cannot click.

## Pitfalls unique to demo day

- Re-compiling Docker images in the room  
- Live fine-tuning jokes during RAG  
- Ten browser tabs of Stack Overflow visible on projector  
- Password managers prompting on the shared screen  
- Autoplay music / Discord overlay  

Close everything that is not the app and the report PDF.

## Pre-viva quick reference

Re-read abstract; run the three scenarios once on presentation hardware; sleep. Prepared beats perfect. For mistake-level detail, skim [common viva mistakes](/blog/common-viva-mistakes-cs) the morning of — especially overclaiming and arguing.

## Minute-by-minute demo plans

### Plan A — 5 minutes total

0:00–0:20 problem sentence + role.  
0:20–2:30 happy path.  
2:30–3:30 edge case.  
3:30–4:30 traceability (citation / 403 / verify / audit).  
4:30–5:00 stop and offer Q&A.  

### Plan B — 2 minutes (slides ate the slot)

0:00–0:15 “I’ll show the core path.”  
0:15–1:45 happy path only, narrated tightly.  
1:45–2:00 “Edge cases and citations are in Chapter 6 / I can show if you want.”  

### Plan C — examiner-driven

Keep hands off until asked. Know how to jump to any scenario. Have URLs/routes memorized (admin, driver, upload).

Practice all three plans. The students who only practiced Plan A panic when told to skip slides.

## Projector and laptop realities

Brightness: light themes often read better than dark on washed-out projectors — test. Font size: browser zoom 110% if the room is deep. Cursor: enlarge system pointer if you lose it on the wall. Hide bookmarks bar clutter. Close password manager popups before screen share or HDMI.

### Dual-machine strategy

If department allows, keep a hotspot backup and a phone hotspot note for API calls. Prefer local FAISS retrieval so only the LLM call needs net for AI demos. For MERN, local MongoDB means the app survives Wi-Fi death except payment gateways — have screenshots for Razorpay if the network dies mid-modal.

### Backup evidence pack (PDF or folder)

TC screenshots, architecture diagram, ER diagram, one sequence diagram. When live fails, you still teach. Say you will return to live if the process restarts — then actually try once, not five times.

## Narration phrases that reduce confusion

- “First I login as ___ because ___.”  
- “Watch the status badge change from ___ to ___.”  
- “This request is checked on the server in ___ middleware.”  
- “I’m deliberately entering invalid ___ to show validation.”  
- “This citation maps to chunk/page/timestamp ___.”  

Avoid: “basically,” “just a simple,” “random stuff,” “you know.”

### Showing code without drowning

Open one file, scroll to one function, read three lines, close or Alt-Tab back to UI. A five-minute IDE tour loses non-CSE externals. Offer deeper code only if asked.

## Aligning demo with Chapter 6

Pick three test case IDs that match your three scenarios. Say the IDs aloud once: “This is TC-02 happy issue; TC-09 invalid date; TC-11 unauthorized role.” Panels who grade reports appreciate the cross-reference. It also anchors you when nerves hit — you are executing a checklist, not improvising theatre.

### After a good demo

Do not over-explain. Silence is fine. Smile briefly. Wait for questions. Students who keep clicking “also this screen, also that screen” dilute the strong path they just proved.

### After a shaky demo

One recovery attempt, then evidence pack, then invite architecture questions where you are stronger. Endless restart loops train the panel to write you off.

## Role of the report during the live demo

Keep the PDF open on a second virtual desktop or a printed Chapter 6. When you cite TC-09, flash the page if asked. Do not read the report aloud as a substitute for clicking the app. The report is backup and cross-reference; the running system is the primary artifact. If your college requires a recorded demo video as submission, still rehearse live — externals often ask for one more click that the video does not contain.

### Accessibility and clarity on shared screens

Avoid red-on-green status text that vanishes on bad projectors. Prefer clear words: “Paid,” “Forbidden,” “No chunks retrieved.” Animations that hide buttons for two seconds waste demo time — disable nonessential motion for viva day.

## Related reading

- [Common viva mistakes](/blog/common-viva-mistakes-cs)  
- [14-slide presentation guide](/blog/final-year-presentation-14-slides)  
- [Choosing a final year project](/blog/choosing-a-final-year-project)  

## Project kits

- **[Chat with YouTube](/projects/chat-with-youtube)** — timestamp click demo for traceability.
- **[Vehicle Fleet Management](/projects/vehicle-fleet-management-system)** — dispatcher vs driver login demo for RBAC.
- **[Chat with PDF](/projects/pdf-rag-chat)** — citation/expander path for AI transparency.
- **[MERN E-Commerce](/projects/mern-ecommerce)** — test payment path when your abstract promises Razorpay.

**Takeaway:** Rehearse three scenarios — success, graceful failure, traceability — until they are boring. Kits include demo scripts for those scenarios; your job is to narrate them clearly, fulfill the abstract live, and keep the environment as reliable as your code.

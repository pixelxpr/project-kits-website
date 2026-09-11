---
title: "10 common viva mistakes CS students make (and how to avoid them)"
seoTitle: "10 Common CS Viva Mistakes to Avoid"
excerpt: "From reading slides verbatim to claiming perfect accuracy — common CS viva failure patterns, plus recovery lines that still salvage the room."
category: "Viva Prep"
readTime: "14 min read"
date: "2026-07-25"
author: "Rajan"
---

Most vivas are lost on presentation habits and honesty, not on whether your sort function is optimal. External examiners see the same failure patterns every season: slides read aloud, demos that only work on the happy path, buzzwords that do not match the repo, and blank stares when asked for limitations. Avoid the patterns below and you are already ahead of a large share of the batch — not because your code is magical, but because you communicate like someone who built and tested the system.

![Cover](/blog/common-viva-mistakes-cs.png)

This guide expands the classic “ten mistakes” list with recovery phrases, team pitfalls, and a one-page prep sheet aimed at Indian B.Tech / BCA / MCA final-year panels. Pair it with [what examiners look for in a demo](/blog/what-examiners-look-for-demo) and the [14-slide presentation structure](/blog/final-year-presentation-14-slides). For project-specific drills, use kit materials such as [Chat with PDF](/projects/pdf-rag-chat) viva notes or the [MERN ecommerce](/projects/mern-ecommerce) payment script.

## How panels actually fail students

Rubrics vary by university, but behavior clusters: (1) you cannot run what you claim, (2) you overclaim, (3) you contradict your own abstract, (4) you argue, (5) you disappear behind “my teammate did that” with zero summary. Code quality still matters, yet a working demo with clear limitations often outscores a clever algorithm explained in a panic.

### A note on “extra” mistakes

The numbered list below starts with ten core mistakes and then covers related patterns (jargon, eye contact, git mismatch). Treat them as one playbook, not a superstition that only ten things can go wrong.

## Mistake 1: Reading slides verbatim

When you read every bullet, the panel stops listening and starts hunting for a gotcha question. Slides are prompts. Architecture, data flow, and demo narration should come from memory in your own words.

**Fix:** Rehearse with slides on mute mentally — glance, speak, glance. If a slide is a paragraph, rewrite it into five words before viva week.

**Recovery:** If you catch yourself reading, pause, look at the panel, and summarize the slide in one spoken sentence.

## Mistake 2: No failure or edge-case demo

Only the green path suggests you never tested. Show one graceful failure: empty upload, invalid login, out-of-scope RAG question, double-booked slot, bad payment signature — whatever matches your domain.

**Fix:** Script a 20-second “bad input” after the happy path. See [demo expectations](/blog/what-examiners-look-for-demo) for the three-scenario pattern (success, edge, traceability).

**Recovery:** If you forgot, and they ask “what if input is empty?”, open the app and try it live instead of theorizing only.

## Mistake 3: Blaming the kit, the teammate, or the laptop

“The template did it,” “he handled backend,” “it worked yesterday” all transfer ownership away from you. Panels grade *your* understanding.

**Fix:** Use ownership language: “I implemented the RBAC middleware,” “I verified Razorpay HMAC on the server,” “I set chunk size to 500 after trying 1000.” For kits, be integrity-honest about the scaffold and precise about *your* changes.

**Recovery:** “I own the payment verify module; for cart UI I can summarize the flow even though Priya wrote the first Redux slice.”

## Mistake 4: Overclaiming AI “intelligence”

Saying “it learns from users” when the system is stateless RAG, or “100% accurate,” or “unhackable,” destroys credibility in one sentence.

**Fix:** Measured claims: “We reduce hallucination risk with citations,” “tested on N cases in Chapter 6,” “JWT auth with role checks — not a full security audit.”

**Recovery:** “To correct myself: the model does not fine-tune on user chats in our build; we retrieve chunks and generate with an API.”

## Mistake 5: Empty or fake limitation section

“No limitations” is instantly unbelievable. Every student project has scope limits: no mobile app, no live GPS, test-mode payments, FAISS single-node, no webhook, English-only UI.

**Fix:** Memorize three honest limitations and put two on a slide. Invite the question before they weaponize it.

**Recovery:** If you blanked earlier, volunteer limitations when they ask “future work?”

## Mistake 6: Wrong complexity vocabulary

Calling CRUD “machine learning,” calling FAISS a “blockchain,” or claiming “microservices” for one Express process gets caught quickly.

**Fix:** Match words to architecture diagrams in your report. If you use one Node server, say monolith modular — not Kubernetes.

**Recovery:** “Poor word choice — we have a modular monolith: React client, Express API, MongoDB.”

## Mistake 7: No answer for “what is your contribution?”

Group projects and kits make this question inevitable. Freezing looks like you only watched demos.

**Fix:** Three bullets on paper: (1) feature you built or extended, (2) tests you added, (3) a design decision you can justify (chunk size, RBAC rule, payment verify placement).

**Recovery:** Start with one concrete file or endpoint name even if incomplete: “Contribution is the driver ownership check in the trip update handler.”

## Mistake 8: Demo on an untested machine

College auditorium Wi-Fi, missing `.env`, Node version drift, MongoDB not running, wrong display resolution — environment failures look like project failures.

**Fix:** Rehearse on the presentation laptop, with charger, HDMI/USB-C adapter, notifications off, zoom 100%, seeded DB, sample logins on a sticky note. Arrive early to test projector.

**Recovery:** “While the environment reconnects, here is screenshot TC-08 from Chapter 6 showing the same flow” — then fix live if possible without arguing.

## Mistake 9: Arguing with the examiner

Winning a debate can lose marks. Clarify once; if they insist on a definition, acknowledge and move to what you implemented.

**Fix:** Phrases: “In our report we used X to mean …,” “You’re right that production would also need Y; we scoped Y as future work.”

**Recovery:** “I’ll adopt that terminology — in code the module is still the verify endpoint as shown.”

## Mistake 10: Ignoring the database question

Many panels ask one MongoDB/SQL question: count users, find overlapping bookings, trips in last 30 days, index rationale.

**Fix:** Prepare two queries from *your* schema and one index explanation. Run them once in Compass or shell before viva week.

**Recovery:** Speak the query in plain English first, then field names: “I’d match trips where startDate is after the cutoff, then project driver and vehicle.”

## Related patterns that still sink marks

### Hiding behind jargon

“Transformer attention” when you only call a hosted API is a trap. Say: “We call the chat API; retrieval is our contribution.”

### No eye contact

Look at the panel while explaining; the screen gets glances. Turning your back to read the projector is Mistake 1’s cousin.

### Skipping the limitations slide

A short limitations slide is proactive honesty. It also steers Q&A toward ground you prepared.

### Demo branch ≠ submitted zip

Uncommitted experiments on demo day are integrity and consistency risks. Tag a submission commit and demo that tag.

### Forgetting guide or team context

Know your guide’s name, review cadence, and (for teams) who owned which module at a high level.

### Body language

Phone in pocket, not on the table face-up. Open posture. Do not laugh off a serious architecture question.

### Technical absolute claims

Replace “first in the world” and “never fails” with test evidence. Indian panels have heard absolute claims all morning.

## Team project specifics

External examiners may isolate you with a question while a teammate presents. “My teammate handled that” with zero substance fails. Prepare a 30-second summary of *each* major module: purpose, main endpoint or page, one risk.

If conflict exists in the team, do not air it in external viva. Ownership of the product in the room matters more than fairness debates.

## Post-stumble composure

Panels remember overall composure more than a single blank — unless you argue or panic spiral. Answer the next question cleanly. Students who recover look senior; students who apologize for thirty seconds look unprepared.

### Useful recovery lines

- Demo fails: “I’ll show the Chapter 6 screenshot for TC-08 and explain the flow while we restart the API.”  
- Unknown API name: “I am not sure of the exact export name; the flow is token → middleware → controller.”  
- Out-of-scope ask: “We did not implement that; our design would put it behind [module] as future work.”  

## Preparation antidote (one weekend)

1. Three rehearsed demo scenarios (happy, edge, traceability).  
2. Report tabbed to Chapter 6 test cases.  
3. Friend or senior mock viva with strict faces.  
4. One-page cheat sheet (not to read aloud in the room): 30-second pitch, architecture one-liner, three limitations, five test IDs, one design decision, one failure recovery line.  
5. Sleep — rereading literature survey page 40 at 3 a.m. hurts more than it helps.

Read your abstract aloud the morning of viva. If the live app cannot fulfill a sentence in the abstract, fix the abstract or the app before you enter.

## Project-type quick hits

### RAG / AI ([Chat with PDF](/projects/pdf-rag-chat), YouTube, data chat)

Show citations or retrieved chunks without being asked. Never claim the model “knows your PDF” without retrieval. Review [defending Chat with PDF](/blog/defending-chat-with-pdf-viva) the night before.

### Ecommerce ([MERN ecommerce](/projects/mern-ecommerce))

Draw HMAC verify. Test mode only. Do not mark paid on the client.

### RBAC MERN (library, fleet, hotel)

Explain role vs record ownership if you have it. Demo two roles minimum.

## Building a personal viva prep sheet

One page only:

- Pitch (30 seconds)  
- Demo steps (3)  
- Limitations (3)  
- Technologies and why (3)  
- Failure recovery line (1)  
- Weak questions marked from kit viva banks  

Merge kit question lists with the mistakes above. Rehearse weak spots harder; do not re-read the entire report the night before.

## Confidence without arrogance

Partial credit answers beat silence. “I will check the report section 4.2 for the exact field name; conceptually the trip stores driverUserId for ownership checks” shows process. Inventing a field name is Mistake 4 in miniature.

## Logistics checklist (underrated marks)

- [ ] Binding / soft copy ready  
- [ ] Charger + display adapter  
- [ ] Arrive 15 minutes early  
- [ ] Sample logins work  
- [ ] Notifications disabled  
- [ ] Backup screenshots for critical TC  

Environment disasters are not “bad luck” if they were preventable.

## Mistake deep-dives with exam-room examples

### Reading slides — what panels hear

They hear a monotone PDF. They start skimming your report for contradictions. Your best architecture slide becomes wallpaper. Alternative: put a diagram on screen and talk through arrows with a pointer or trackpad highlight. If English fluency is a concern, short spoken sentences beat long memorized paragraphs you will forget mid-line.

### Happy-path-only — a concrete fix for each stack

RAG: ask something *not* in the PDF and show the refusal / insufficient-context behavior.  
Ecommerce: failed test card or verify with a tampered signature in a controlled Postman call (prepare beforehand).  
RBAC: second role cannot access admin route.  
Bookings: end date before start date validation.

### Overclaiming — rewrite your abstract tonight

Search your abstract for: “intelligent,” “fully secure,” “real-time GPS,” “blockchain,” “100%,” “automatically learns.” Delete or replace with what the code does. Abstracts written in week 2 often overpromise week 16 reality.

### Contribution blank — templates you can fill

“I designed and tested the ___ rule, documented in TC-__. I changed ___ configuration after evaluating ___. I wrote the demo script for ___ role switching.” Fill blanks with real artifacts. Empty adjectives (“I did everything”) are useless.

## Mock viva protocol (90 minutes)

Minute 0–10: You present only slides 1–5 + problem.  
Minute 10–20: Full demo three scenarios.  
Minute 20–50: Friend asks from kit viva bank + “what is your contribution?” + “limitations?” + one DB query.  
Minute 50–70: Replay only the questions you failed.  
Minute 70–90: Environment check on the real laptop.

Record audio on your phone once. Cringe is useful — you will hear “um” storms and reading tone.

### Day-before vs morning-of

Day before: full rehearsal, fix bugs, print sheets.  
Morning of: abstract aloud, cheat sheet once, demo once, stop. New features the morning of viva are how demos die.

### If the examiner is hostile or rushed

Stay polite, shorten answers to structure-first (“three parts: …”), and do not match aggression. Ask “Should I show the edge case or the architecture diagram?” when time is clearly collapsing — gives them control and shows maturity.

## Mapping mistakes to kit prep materials

Every FinalYearKit project ships viva-oriented notes. Use them as a question gym: answer aloud, mark weak ones, fix vocabulary. Do not memorize kit answers word-for-word; panels detect identical phrasing across students from the same campus WhatsApp group. Your examples should use *your* seed data and *your* enhancement. If you blank once, breathe, answer the next question cleanly, and do not narrate your panic — composure after a stumble is itself a viva skill examiners notice.

## Related reading

Study [what examiners look for in demos](/blog/what-examiners-look-for-demo) and [14-slide decks](/blog/final-year-presentation-14-slides) so mistake avoidance turns into a concrete run of show. For RAG-specific traps, keep [defending Chat with PDF](/blog/defending-chat-with-pdf-viva) in your shortlist.

## Project kits

- **[Chat with PDF](/projects/pdf-rag-chat)** — viva cheat sheet and citation demo path that prevents AI overclaim mistakes.
- **[MERN E-Commerce](/projects/mern-ecommerce)** — payment demo script that prevents “trust the client” failures.
- **[Vehicle Fleet Management](/projects/vehicle-fleet-management-system)** — dual-role demo that prevents shallow RBAC answers.

**Takeaway:** Rehearse the demo, name real limitations, and explain instead of reading — those three habits prevent most viva failures. Use FinalYearKit viva materials as drills, not as scripts to recite, and walk in with a one-page sheet and a working environment.

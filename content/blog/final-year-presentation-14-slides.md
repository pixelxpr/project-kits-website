---
title: "How to build a 14-slide final year presentation that fits in 10 minutes"
seoTitle: "14-Slide Final Year Presentation Guide"
excerpt: "Slide-by-slide guidance for a 10-minute project presentation — what to show, what to skip, and how to handle the demo slide without crashing."
category: "Guides"
readTime: "8 min read"
date: "2026-03-05"
---

Ten minutes is shorter than you think. Most students prepare 25 slides and rush through slide 8 while the panel stops paying attention. Fourteen slides is the sweet spot: enough depth to show you understand the project, short enough to leave time for a live demo and 2-3 questions.

![Final Year Presentation 14 Slides](/blog/final-year-presentation-14-slides.png)

## Slide 1: Title

Project title, your name, roll number, guide name, department. Keep it clean. No animation.

## Slides 2-3: Problem and Objectives

Slide 2: one real-world problem in 3 bullet points. Slide 3: numbered objectives mapped to features you will demo.

## Slides 4-5: Literature and Gap

One comparison table on slide 4. Slide 5: one sentence gap statement. Do not read the table row by row — summarize it.

## Slides 6-8: Architecture

Slide 6: high-level block diagram. Slide 7: data flow for one user action. Slide 8: tech stack with one-line justification per tool.

This is where AI projects should mention chunking, embeddings, and retrieval explicitly. MERN projects should show the three-tier flow and auth layer.

## Slides 9-10: Implementation Highlights

One screenshot per slide. Call out one non-obvious design decision on each. Example: hybrid search, server-side price calculation, HMAC payment verification.

## Slide 11: Testing

Small test case table — 5 rows visible, mention 15+ total in speech.

## Slide 12: Live Demo

This slide says 'Live Demo' and lists the 3 scenarios you will show. Never demo without a rehearsed script. Use seeded data. Have a backup screenshot if Wi-Fi fails.

## Slides 13-14: Results and Conclusion

Slide 13: sample output screenshots. Slide 14: conclusion + one future enhancement. End with 'Thank you' — not a wall of references.

## Delivery tips

Speak to the panel, not the screen. One minute per slide average, two minutes for demo. If asked a question mid-presentation, answer briefly and continue.

Practice with a timer three times. Record yourself once — you will catch verbal fillers and rushing.

### Handling panel interruptions

If an examiner asks a question on slide 6, answer in 20 seconds and offer to return after the demo. Do not restart the deck from slide 1. Confidence here matters as much as content.

### Font and contrast rules

Minimum 24pt body text on slides. Dark text on light background for projectors in bright rooms. Avoid red-green-only color coding — many projectors wash out red.

### Demo backup plan

Screenshot sequence on slide 12 backup: upload → question → answer with citation. If live demo fails, walk through screenshots while explaining what would happen live. Panels prefer honest backup over frozen spinner.

### Practice schedule

Day 1: write script. Day 2: time run. Day 3: record video, watch at 2x speed for filler words. Day 4: present to one honest friend. Day 5: final run with same laptop you will use on demo day.

### Questions to expect after slide 14

"What is your contribution?" — name one customization or test suite you added. "What failed during development?" — one honest story. "What would you deploy differently?" — mention environment variables, HTTPS, rate limiting briefly.


## Slide-by-slide timing table

| Slide | Topic | Target time |
| 1 | Title | 30 sec |
| 2 | Problem | 45 sec |
| 3 | Objectives | 45 sec |
| 4 | Literature gap | 60 sec |
| 5 | Methodology | 60 sec |
| 6–8 | Architecture | 3 min total |
| 9–10 | Implementation | 2 min |
| 11 | Testing | 45 sec |
| 12 | Live demo | 2 min |
| 13–14 | Results + close | 90 sec |

Total near 10 minutes with buffer for one question.

### What to cut when over time

Never cut the demo slide. Shorten literature survey on slide 4 — examiners care more about your design than how many papers you name. Move extra screenshots to appendix slides only if your panel allows backup slides.

### AI vs MERN presentation differences

AI decks must show the retrieval or code-generation pipeline on slide 7 — not just a chat screenshot. MERN decks must show role-based flows: admin creates resource, user consumes it, unauthorized user gets blocked. One role demo beats five CRUD screenshots.

### Rehearsal checklist night before

Charge laptop fully. Disable OS update prompts. Open project in browser tab before entering room. Load sample PDF or seed MongoDB data. Turn off notifications. Have PDF of report on phone as backup reference if allowed.

## Related reading

For more context, see [what examiners look for in a demo](/blog/what-examiners-look-for-demo).

## Project kits mentioned

- **[Chat with YouTube](/projects/chat-with-youtube)** — 14-slide deck included with demo script.
- **[MERN E-Commerce](/projects/mern-ecommerce)** — presentation covers Razorpay flow diagram.

**Takeaway:** Fourteen slides, three demo scenarios, one rehearsed timing run — that is a presentation panel members remember. All project kits include a 14-slide deck aligned to this structure.

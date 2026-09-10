---
title: "What examiners actually look for in your project demo"
excerpt: "Not flashy UI — traceability, edge case handling, and you explaining one design decision live while the app runs."
category: "Viva Prep"
readTime: "8 min read"
date: "2026-08-05"
---

The demo is not a trailer. It is proof you built and understand the system. Examiners watch whether you navigate confidently, handle a wrong input, and explain one backend decision.

![Cover](/blog/what-examiners-look-for-demo.png)

## Three demo scenarios

Happy path: core feature in under 2 minutes. Edge case: empty input or out-of-scope question — graceful message. Traceability: show citation, audit log entry, or generated code.

## What impresses

You typed the scenario without reading script. You explain server-side validation during MERN demo. You open retrieved chunks expander during RAG demo.

## What fails

Long loading with no feedback. Apologizing for 'small bug' on main feature. Student silent while video plays.

## Timing

Leave 3 minutes for examiner questions during demo slot if format allows.

### Before you enter the room

App running, MongoDB seeded, API keys in .env, laptop charged, charger in bag, browser zoom 100%, notifications disabled. Two minutes setup beats five minutes apology.

### During demo narration

Say what you click before you click. "I am logging in as librarian to issue a book" — examiner follows story. Silent clicking confuses non-expert externals.

### After demo questions

If examiner asks to try themselves, offer keyboard politely. If they break app, stay calm, refresh, use backup screenshots.

### MERN-specific examiner focus

Do they see network tab? Sometimes yes — have DevTools closed unless asked. Know which API calls fire on login.

### AI-specific examiner focus

Show retrieval expander without being asked — proactive transparency scores points. Hide nothing about LLM involvement.

### Time boxing

If slot is 10 minutes total and presentation is 8, demo is 2 — shrink demo to one golden path. Better one perfect flow than three rushed broken ones.



## First 60 seconds

Panel decides if you sound confident. Clear problem statement, working login or upload, no fumbling for files.

### Traceability

They click a citation or audit log entry and ask "show me source." Be ready.

### Edge case handling

Invalid input shows error message, not stack trace to user. Stack trace in logs only — mention logging.

### Code ownership probe

"Change button label live" or "where is auth middleware" — navigate IDE quickly.

### Report consistency

Numbers in demo match report screenshots. Booking counts, test pass rates — align.

### Group projects

Each member demos one module. Know teammates' modules at high level.

### Time management

Demo under 5 minutes unless asked to extend. Leave time for questions.

### Post-demo questions

Why this stack, what failed, what next — same as [choosing a project](/blog/choosing-a-final-year-project) framework.

### Professionalism

Dress neat, arrive early, thank panel at end. Soft skills do not replace broken code but tip borderline grades.

### Scoring mental model

Many panels use rubric: 30% code/working, 30% report, 20% presentation, 20% viva Q&A. Demo feeds code and presentation buckets — broken demo hurts twice.

### External vs internal examiner

External often probes architecture depth; internal may probe timeline and guide supervision. Prepare one sentence on how often guide reviewed progress.

## Demo environment checklist

Same browser as rehearsal. Zoom 100%. Notifications off. Sample accounts on sticky note: admin@test.com / password. Backup offline video of demo optional if department allows.

## Signals that impress

Student explains *why* before clicking. Student shows citation or log entry unprompted. Student admits "I have not implemented X" cleanly when asked.

## Signals that worry panel

Long silence during errors. "It worked yesterday." Cannot navigate to auth middleware file. Report numbers disagree with live screen.

## After demo transition

"That completes my demo; I am happy to dive into architecture or testing" — clean handoff to Q&A phase.

Link preparation to [common viva mistakes](/blog/common-viva-mistakes-cs) and your project's dedicated viva post.

### Timing under pressure

If panel says "skip slides, demo only," adapt immediately — open app within 30 seconds. Prepared students welcome this; unprepared panic.

Note questions you could not answer; email guide summary after viva if allowed — rare but memorable professionalism.

## Internal vs external examiner focus

Internal guide often asks about weekly progress and challenges overcome — relationship and honesty matter. External examiner often cold-reads report abstract five minutes before you enter — consistency between abstract claims and live demo is critical. If abstract promises "hybrid search," demo must show question where keyword mattered. Mismatch here triggers deep skeptical questioning on everything else. Treat abstract as legally binding marketing you must fulfill live.

### Quick reference before viva

Re-read your abstract, test the demo path once on presentation hardware, and sleep. Prepared beats perfect.

### Final checklist

Print report binding copy night before. Carry charger and HDMI adapter. Arrive fifteen minutes early to test projector resolution. Confirm sample login credentials work. These logistics seem minor until they fail publicly — students lose marks from environment issues unrelated to understanding.

## Related reading

See also [14-slide presentation guide](/blog/final-year-presentation-14-slides).

## Project kits

- **[Chat with YouTube](/projects/chat-with-youtube)** — timestamp click demo.
- **[Fleet Management](/projects/vehicle-fleet-management-system)** — driver vs dispatcher login demo.

**Takeaway:** Three scenarios: success, graceful failure, traceability — rehearsed until boring. Kits include demo scripts for each scenario.

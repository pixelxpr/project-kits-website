---
title: "Group project roles for final year — who owns what before viva"
seoTitle: "Final Year Group Project Roles Guide"
excerpt: "Split backend, frontend, report, and demo ownership so Indian B.Tech teams stop freezing when panels ask who built which module."
category: "Guides"
readTime: "14 min read"
date: "2026-09-19"
author: "Rajan"
---

Most final-year group disasters are coordination failures, not talent failures. Four B.Tech students agree to “do a MERN project,” divide nothing, build overlapping folders, paste one report voice, and arrive at external viva hoping the classmate who “knows everything” will speak. Then the panel asks the quiet teammate how JWT refresh works — silence. Roles exist to prevent that silence.

This guide gives practical ownership splits for typical FinalYearKit teams of three or four, whether you ship [Online Job Portal](/projects/job-portal), [Restaurant Management System](/projects/restaurant-management-system), or an AI kit like [Chat with PDF](/projects/pdf-rag-chat). Pair with [common viva mistakes](/blog/common-viva-mistakes-cs) and [14-slide presentation structure](/blog/final-year-presentation-14-slides). Kits help with code and documents; they do not assign speaking turns — you do.

## What “role” means here

A role is a primary ownership lane with a named backup, not a caste system that forbids learning. Everyone must be able to narrate the full demo path. Everyone must know the abstract, objectives, and limitations. Specialists go deeper on their modules when asked.

Write roles on a one-page team charter in week one: name, roll number, primary lane, backup lane, weekly deliverable. Share with your guide if they welcome process visibility.

## Recommended lanes for a 4-member MERN team

**Member A — Backend / API:** auth, models, controllers, validation, seed scripts, Postman collection. Speaks to middleware, status codes, and schema.

**Member B — Frontend / UX:** routes, role-based menus, forms, demo polish, empty states. Speaks to state flow and how UI calls APIs.

**Member C — Domain features:** the hard invariants (booking overlap, order totals, application state machine, Razorpay verify). Speaks to why generic CRUD was not enough.

**Member D — Docs / QA / Demo ops:** report chapters coordination, slide deck assembly, test table, seed reset checklist, backup video. Speaks to test cases and chapter map.

If you are three members, merge D into A/B and rotate weekly QA duty. If you are two, be ruthless about scope and accept that both must know backend and frontend.

### AI / ML team variant

**A — Data:** dataset prep, splits, augmentation docs.  
**B — Model:** training, metrics, weight export.  
**C — App:** Streamlit/UI, demo scripts, failure cases.  
**D — Report/slides/viva Q bank.**  

For [Plant Disease Classification](/projects/plant-disease-classification), never let only B touch the confusion matrix — A and C should interpret it too.

## Anti-patterns that panels punish

**“He did backend, I did frontend” with zero crossover.** Cross-questions will find you.

**One person writes the entire report** in a voice others cannot defend. Everyone should draft the sections for their modules; D edits for consistency.

**Git as optional.** If only one laptop has the project, you do not have a group project — you have a hostage situation.

**Last-week heroics.** The hero becomes the only viva survivor; others look like passengers.

**Identical abstracts across teammates’ individual submissions** where colleges require per-student reports — check your rules.

## RACI-style clarity without corporate theater

For each major feature, mark who is Responsible (does the work), Accountable (final yes), Consulted, Informed. Example for job portal resume upload: B builds UI, A builds Multer route, C verifies recruiter download authz, D adds Chapter 6 test row. Keep this in a shared Notion/Google Doc — not a 20-page PMP manual.

## Weekly rhythm that fits Indian college calendars

**Week pattern:** Mon sync 30 min (blockers only), Wed build, Fri merge + short demo recording. Before internals, full rehearsal. Before externals, full rehearsal with a faculty or senior playing hostile examiner.

During festival weeks and placement drives, shrink scope publicly in the team doc instead of silently dropping features. Guides prefer honest scope cuts to surprise missing modules on demo day.

## Mapping roles to report chapters

Chapter 1–2: shared drafting, D owns cohesion.  
Chapter 3 (requirements): everyone lists use cases for their features; D merges.  
Chapter 4 (design): A/C own ER and sequence; B owns UI wireflow screenshots.  
Chapter 5 (implementation): each pastes explained snippets from their commits — not unreadeable 400-line dumps.  
Chapter 6 (testing): D coordinates; each member contributes tests for owned modules.  
Chapter 7 (conclusion): shared; limitations must include unfinished lanes honestly.

See [eight-chapter report structure](/blog/eight-chapter-report-structure) for chapter intent.

## Mapping roles to the 14-slide deck

Architect/overview slides: A+C.  
Demo storyboard slides: B+D.  
Results/metrics: C or ML-B.  
Limitations and future work: whole team agrees wording — never let one member promise features others cannot defend.

Practice who advances slides vs who speaks. Two people talking over one slide looks chaotic on a projector.

## Viva speaking protocol

1. Team lead gives 45-second project pitch (rotate lead across internals/externals if your college allows).  
2. Demo operator (usually B) drives the laptop; narrator may be C.  
3. When a question targets a module, the owner answers first; backup adds one sentence if needed.  
4. If you do not know, say “I want to confirm from the code path” and navigate — better than inventing.  
5. Never throw a teammate under the bus. Prefer “we split X; I can summarize the flow; they can go deeper on Y.”

### The “my teammate did that” recovery

Allowed once as orientation, never as refusal. Immediately follow with a correct high-level explanation. Panels grade understanding, not git blame.

## Ownership examples by kit type

**Job portal:** A auth/RBAC, B seeker UI, C application state + resume authz, D seed jobs + test matrix. Architecture depth: [job portal architecture](/blog/job-portal-mern-architecture) once published in your reading list — and the kit page [Online Job Portal](/projects/job-portal).

**Restaurant:** C owns server-side totals and order state; A tables; B kitchen UI; D menu seed. Kit: [Restaurant Management System](/projects/restaurant-management-system).

**RAG PDF chat:** B owns retrieval parameters story; A chunking/index build; C UI citations; D evaluation questions set. Kit: [Chat with PDF](/projects/pdf-rag-chat).

## Tools that reduce drama

- Single GitHub/GitLab repo with branch protection if possible.  
- `SEED.md` or npm/python seed script everyone can run.  
- Shared credentials vault for demo accounts (not in public README).  
- Issue list with assignee and “demo-critical” tag.  
- Freeze date: no feature merges 48 hours before external viva — only bugfixes.

## Grading politics — be realistic

Some colleges give a group mark plus individual viva mark. Your personal score tracks how you answer, not how pretty the UI is. Quiet implementers must rehearse spoken answers aloud. Strong speakers must not bluff modules they never opened.

If one member ghosted, document attempts (messages, guide mails) early. Do not wait until viva week to discover you are a trio.

## Conflict scripts

**Duplicate work:** merge immediately; assign a single owner going forward.  
**Scope creep:** “Not in charter; park in future work.”  
**Report plagiarism panic:** rewrite owned sections; see integrity guidance in [academic integrity and kits](/blog/academic-integrity-project-kits).  
**Demo laptop failure:** D’s backup video + screenshots; A knows how to run on college lab PC.

## Individual contribution table (put in report appendix)

| Member | Modules | Key commits / PRs | Viva focus |
| --- | --- | --- | --- |
| A | Auth, User APIs | #12 #18 | JWT, middleware |
| B | Seeker UI | #15 #22 | Routes, forms |
| … | … | … | … |

Faculty who suspect unequal work look here first.

## Internals vs externals

Internals may be friendlier and guide-led — still rehearse. Externals often include a faculty member who has never seen your weekly struggle; they only see today’s clarity. Roles should be visible in how you answer, not announced as a corporate org chart unless asked.

## When using a project kit

Kits equalize starting points; customization and explanation differentiate teams. Assign who rewrites college name, who changes seed data to local context, who adds the one extra feature your guide requested. Disclose scaffold use honestly per [academic integrity](/blog/academic-integrity-project-kits). Do not role-play that four people invented JWT from scratch in a week.

## Checklist: role health at mid-semester

- [ ] Every member ran the app locally at least once this week  
- [ ] Every member answered three viva questions aloud  
- [ ] Chapter drafts exist for owned sections  
- [ ] Seed reset works on a clean DB  
- [ ] Backup demo video under three minutes exists  
- [ ] No single point of failure for passwords/API keys  
- [ ] Guide has seen a mid-sem demo  

## Soft skills that still count

Punctuality to syncs, written updates when someone misses college, and camera-on rehearsals for online vivas. These are not on the syllabus; they show up in marks indirectly when demos fail from preventable chaos.

## Pairing with placement season

If Member B has interviews all week, shift demo ops earlier, not later. Write a “coverage plan” in the team doc. Panels will not accept “placements” as a reason you cannot explain your own ER diagram.

## Micro-roles on demo day

**Laptop owner:** charged, resolution set, notifications off, personal chats closed.  
**Hotspot owner:** backup network.  
**Print owner:** report hard copy if required.  
**Timekeeper:** gentle tap at 4 minutes into demo.  

These micro-roles rotate; they are not status symbols.

## How guides evaluate group process

Many guides notice who shows up to reviews, who can run the project without waiting for a classmate’s WhatsApp, and whether the contribution table matches spoken answers. Treat mid-sem reviews as viva rehearsals. Bring the charter. Ask your guide explicitly if role imbalance worries them — early feedback beats a surprise internal mark.

## Onboarding a late fifth member

Some colleges allow late joins after backlog reshuffles. Give them a bounded lane: test cases, seed realism, slide polish, or a small feature with clear acceptance criteria. Do not hand them “Chapter 2 literature” as busywork only — they still need a demo-path explanation. Update the contribution table the same week they join.

## Remote teammates and lab constraints

If one member is on internship in another city, schedule two weekly video syncs and require loom-style recordings of their module. Code must land in the shared repo; “I’ll bring it on a pen drive later” is how externals go wrong. Agree on IST meeting times and a merge window before college wifi dies for the day.

## Sample three-minute pitch rotation

Week N: Member A pitches. Week N+1: Member B. By external viva, all four have pitched once in practice. The pitch includes problem, users, tech stack, and one limitation. This removes the “only the leader can introduce” bottleneck when the leader is sick on demo day.

## Decision log for disputed features

When the team argues about scope — chat module, payments, mobile app — write a three-line decision: date, choice, reason. Put it in the repo as `DECISIONS.md`. In viva, “we deferred chat on 12 Aug to protect RBAC quality” sounds like engineering judgment. Memory-only arguments resurface as contradictions on stage.

## Guide meeting roles

One member books the slot, one brings the running laptop, one takes notes on required changes, one updates the charter after. Guides notice chaos. A five-minute structured update (done / doing / blockers / ask) beats a twenty-minute scroll through unrelated files.

## Presentation night casting

Decide who stands where so you do not shoulder-block the projector. The demo driver sits; the narrator stands slightly aside. Others step forward only when their module is questioned. Passing the laptop among four people mid-demo wastes time and drops HDMI signal on flaky college cables.

## Academic load balancing with labs and placements

Publish a shared calendar of lab exams and interview days. Move demo-critical tasks off those dates. If Member A has GATE prep, shift deep backend questions practice earlier. Silence about overload creates last-week resentment; written plans reduce it.

## Integrity roles

Someone must own plagiarism rewriting before the checker deadline — usually D with help from each section author. Someone must own kit disclosure wording. Do not discover similarity scores twelve hours before binding. See [plagiarism check for project reports](/blog/plagiarism-check-project-report).

## After internals — re-role if needed

If internals exposed that only one person can run Mongo seed, reassign practice until two people can. Roles are allowed to change once with guide visibility; secret reassignments the night before externals recreate the original problem.

## What success looks like on viva day

Any roll number can give the pitch. The demo completes in under five minutes with one planned failure. Module questions get owned answers without finger-pointing. Limitations match Chapter 7. The team packs up without arguing in the corridor about who “forgot the PPT.” That outcome is designed in January, not improvised in May. Celebrate the boring rehearsal that made it possible — not only the mark sheet afterward.

## Related reading

[Common viva mistakes](/blog/common-viva-mistakes-cs), [what examiners look for in a demo](/blog/what-examiners-look-for-demo), [final-year presentation 14 slides](/blog/final-year-presentation-14-slides), [eight-chapter report structure](/blog/eight-chapter-report-structure).

## Project kits

- **[Online Job Portal](/projects/job-portal)** — natural multi-role ownership (auth, upload, recruiter inbox).  
- **[Restaurant Management System](/projects/restaurant-management-system)** — kitchen/order domain splits cleanly across teammates.  
- **[Chat with PDF](/projects/pdf-rag-chat)** — AI team lanes for data, retrieval, and UI citations.
## What to put on the contribution table

Examiners often ask for a contribution matrix even when the handbook does not. Keep a one-page table: member name, modules owned, commits or PR links, test cases written, report chapters drafted. Update it weekly so you are not inventing numbers the night before submission.

If someone left mid-semester, document the handoff date and which files changed ownership. Honesty beats a fake equal split. Pair this with [same-project differentiation](/blog/same-project-differentiate) if your group title matches another batch.

**Takeaway:** Assign modular ownership early, keep a living contribution table, and rehearse one joint demo with backup owners — that is how group kits survive viva without finger-pointing.

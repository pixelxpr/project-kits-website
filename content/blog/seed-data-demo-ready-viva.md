---
title: "Seed data that makes demos viva-ready — realistic fixtures without fakes"
seoTitle: "Viva-Ready Seed Data for Project Demos"
excerpt: "Build seed scripts Indian B.Tech panels trust: named demo accounts, non-empty dashboards, reset steps, and edge cases you can show on demand."
category: "Viva Prep"
readTime: "14 min read"
date: "2026-09-21"
author: "Rajan"
---

Empty databases fail vivas quietly. You log in, open “Dashboard,” and every chart is zero. You search jobs and get nothing. You click “My applications” and apologize. Examiners do not mark your Mongo schema in that moment — they mark the feeling that the project was never used. Seed data is how you prevent that feeling without lying about features you do not have.

This guide shows how to design fixtures for FinalYearKit-style demos: MERN portals such as [Online Job Portal](/projects/job-portal) and [Hotel Booking System](/projects/hotel-booking-system), and AI apps such as [Plant Disease Classification](/projects/plant-disease-classification) with gallery images. Pair with [what examiners look for in a demo](/blog/what-examiners-look-for-demo) and architecture posts like [hotel booking architecture](/blog/hotel-booking-system-architecture) when domain invariants need matching data.

## What “viva-ready seed” means

Viva-ready seed is a repeatable script (or documented button) that produces:

1. Known login accounts for every role.  
2. Enough primary entities to exercise search/filter.  
3. At least one happy-path workflow already mid-flight (e.g. an application `under_review`).  
4. At least one edge-case row (closed job, cancelled booking, rejected order).  
5. Charts/lists that are visibly non-empty.  
6. A reset story so the second rehearsal matches the first.

It is not a dump of 10,000 random Faker rows that make the UI slow on college Wi-Fi.

## Demo accounts — print a card

Create a one-page cheat sheet (not shown to the panel unless asked):

| Role | Email | Password | Purpose |
| --- | --- | --- | --- |
| Admin | admin@demo.local | … | Moderation / config |
| Recruiter A | recruiter.a@demo.local | … | Own jobs only |
| Recruiter B | recruiter.b@demo.local | … | Ownership negative test |
| Seeker | seeker@demo.local | … | Apply path |

Use passwords that satisfy your validators but are easy to type under stress. Never commit production secrets; demo-only credentials in `SEED.md` are fine if the README warns “local demo.”

### Why two recruiters (or two faculty, two doctors)

Ownership bugs appear only when a second principal exists. Seeding a single admin who does everything hides RBAC. The second account is for a 20-second negative demo: “Recruiter B cannot open Recruiter A’s applicants.”

## Quantity guidelines by domain

**Job portal:** 2–3 recruiters, 3 seekers, 10–15 jobs across cities/skills, 12+ applications mixed statuses, 2 resume files. Kit: [Online Job Portal](/projects/job-portal).

**Hotel:** 8–12 rooms across 3 types, rates in INR, bookings spanning past/present/future, one overlap-conflict pair prepared by IDs you memorize. Kit: [Hotel Booking System](/projects/hotel-booking-system).

**Restaurant:** menu with categories, 2 open tables, one in-kitchen order, one billed order. Kit: [Restaurant Management System](/projects/restaurant-management-system).

**Library:** members, books with copy counts, one overdue loan for fine talk. Kit: [Library Management System](/projects/library-management-system).

**Ecommerce:** products with stock, one cart-ready user, one paid order if Razorpay demo mode exists. Kit: [MERN ecommerce](/projects/mern-ecommerce).

**CNN/Streamlit:** 6–10 gallery images with known labels, plus 1 failure image. Weights present offline. Kit: [Plant Disease Classification](/projects/plant-disease-classification).

## Realism without fabricating company logos

Use plausible Indian context: city names (Pune, Indore, Kochi), INR salaries, college-flavored book titles, vegetarian menu items, leaf photos you have license to use. Avoid trademarked brand abuse in screenshots you publish publicly. Avoid real student phone numbers and Aadhaar-shaped fake IDs — use obviously fake patterns (`99999 00001`).

### Dates matter

Seed `createdAt` across the last 3–6 weeks so “per week” aggregations show bars. All-today timestamps make charts look like a single spike — better than empty, worse than a weeky story. For hotels, include a checkout tomorrow and a stay in progress.

## Wire seeds to the demo script

Write the demo script first (five steps), then seed so each step has data. Example job portal:

1. Seeker filters `React` in `Bengaluru` → ≥2 jobs.  
2. Apply to “Backend Intern — Pixel Labs.”  
3. Recruiter A shortlists.  
4. Seeker sees status change.  
5. Recruiter B denied on that application.

If step 1 requires jobs tagged React in Bengaluru, the seed must include them — not “Software Engineer” in Noida only.

See the three-scenario pattern in [what examiners look for in a demo](/blog/what-examiners-look-for-demo): success, edge, traceability.

## Reset strategies

**Script reset:** `npm run seed` drops demo collections and inserts fixtures. Best default.

**Button reset:** admin “Reset demo data” — great for repeated panel slots; protect with admin role.

**Manual:** document Mongo `deleteMany` + seed — fragile under stress.

After every practice that mutates state (booking a room, shortlisting), reset before the next run. The classic failure is a cancel demo that frees a room, then a teammate rebooks it “for fun,” then the viva overlap case vanishes.

### Idempotent seeds

Prefer upsert by known `_id` or email so running seed twice does not duplicate jobs. Unique indexes should match your production rules (e.g. one application per seeker per job).

## AI projects — seed is not only Mongo

For RAG: a small PDF/FAQ corpus already indexed; 5 prepared questions with known citations. For classification: images on disk under `samples/`. For attendance: 3–4 enrolled encodings you can show on webcam or group photo. Document model path and `pip/conda` versions so lab PCs do not surprise you.

Empty FAISS indexes and “please upload PDF first” are acceptable *features*, but viva openings should not start with a five-minute ingest unless you rehearsed that timing.

## Charts and dashboards

If your slide claims “analytics,” seed the aggregations. Zeroed Recharts panels are worse than omitting the slide. Minimum: 5–20 underlying rows so counts look intentional.

## Passwords, OTP, and email walls

Disable or stub OTP for demo accounts if SMS/email will fail offline. Nothing kills a viva like waiting on a Gmail OTP on college network. If OTP is a required feature, prepare a demo mode that shows the code in server logs or a fixed staging code documented for examiners.

## SEED.md template (keep it short)

```
## Demo reset
npm run seed

## Accounts
admin@demo.local / ****
...

## Script hooks
- Job IDs for apply: ...
- Overlap dates: check-in 2026-10-10, room 204
- Failure image: samples/fail_blur.jpg
```

Team member D (docs/QA) owns this file in the sense of [group roles](/blog/group-project-roles-final-year).

## Honesty boundary — do not fake inference

Seeding Mongo rows is expected. Hard-coding a Predict button to return “Early Blight” regardless of image is fraud. Similarly, pre-writing “AI answers” unrelated to retrieval is not acceptable for RAG demos. Seed *inputs and documents*; let the real code path run.

## Performance on projector laptops

Large product image fixtures and 4K PNGs slow Streamlit/React. Compress samples. Prefer twenty light records over thousands. Indexes on filter fields help even with small N when you explain scalability as future work.

## Common seed failures

- Only admin account exists.  
- All passwords forgotten the morning of viva.  
- Seed lives on one teammate’s Atlas cluster you cannot reach.  
- Local seed never tested after schema change — validation errors mid-demo.  
- Resume files missing on disk (DB points to deleted paths).  
- Gallery images referenced by wrong case-sensitive filenames on Linux vs Windows.  
- Timezone shifts moving “today’s bookings” offscreen.

## Pre-viva seed checklist

- [ ] Fresh reset on the demo machine yesterday and today  
- [ ] All roles login verified  
- [ ] Happy path IDs written on cheat sheet  
- [ ] Negative path account verified  
- [ ] Charts non-empty  
- [ ] Files on disk for uploads/samples  
- [ ] Offline/local DB plan if Atlas blocked  
- [ ] Backup screenshots of the seeded happy path  

## Connecting seed to report Chapter 6

List seed assumptions as preconditions for tests: “Given seeded job J-12 and seeker S-1 with no prior application…” Examiners who read test chapters notice professionalism.

## Minimal vs rich seeds

Minimal seed gets you through a rushed internal. Rich seed (multi-week dates, dual principals, edge statuses) survives hostile externals. Aim rich one week before externals; freeze content when the demo script freezes.

## Local-first, cloud-second

Prefer local Mongo/SQLite/files at the venue. Cloud demos are fine when rehearsed on the same network profile. Carry a Mongo dump or `docker compose` if that matches your stack. For Streamlit AI kits, carry weights on disk — do not download 200 MB mid-viva.

## Storytelling with names

Named entities help narration: “Guest Meera books Room 204,” “Recruiter Kabir at Pixel Labs,” “Book copy *Discrete Mathematics — Liu*.” Random `User42` strings force you to squint and break eye contact with the panel. Consistency between seed names and slide examples reduces cognitive load.

## When guides ask “is this live data?”

Be honest: “Demo fixtures via seed script; production would connect to real registrations.” That sentence builds trust. Claiming a campus-wide live deployment you do not have invites network questions you may not survive.

## Seed data for payments

If you integrate Razorpay test mode, seed products and a user ready to pay with test cards — and know which test card your slides mention. Do not seed “paid” orders without a verifiable payment record if you will claim payment success; either run a test payment live or mark orders as `cod`/`pay_at_desk` for academic scope. Cross-check with payment viva habits from ecommerce kits.

## Version the seed with the schema

Every time you add a required field, update the seed the same day. CI or a simple `npm run seed && npm test` catch breaks. Schema drift is a top reason “it seeded on my laptop” fails on the lab PC.

## Dual laptop strategy

Laptop A is demo primary; Laptop B has cloned repo, env file, and already-seeded DB or a one-command reset. If A’s charger fails, B continues the same script. USB SSD with the project beats relying on GitHub + slow college Wi-Fi for a fresh clone.

## Sample negative-path fixtures

Include one expired membership, one hidden job, one out-of-stock product, one closed exam window, or one low-confidence image — whatever matches your domain. Edge fixtures turn “what if” questions into clicks instead of speeches.

## Environment variables tied to seed

Document which `.env` the seed expects: `MONGODB_URI`, upload paths, feature flags for demo OTP bypass. A seed that writes to production Atlas because someone copied the wrong URI is a disaster story you do not want. Use a dedicated `DEMO` database name.

### Docker and compose notes

If your kit runs via Docker Compose, include a `seed` service or a documented `docker compose exec api npm run seed`. Rehearse on the same compose file you will use in the lab. Volume mounts that hide old uploads cause “resume 404” ghosts after reset — clear upload volumes in the reset instructions.

## Internationalization and currency

Seed INR for Indian panels unless your problem statement is USD. Mix of currencies without an FX story looks accidental. Date formats in UI should match how you speak (“10 Oct” vs US mm/dd) so you do not stumble narrating bookings.

## Accessibility of demo content

Color-only status chips fail on some projectors; seed rows should also have text statuses. Long lorem-ipsum job descriptions waste reading time — write two-sentence descriptions that sound domain-real.

## Examiner-driven data requests

Sometimes panels ask you to create a fresh record live. That is fine — seed still provides the surrounding world (other jobs, rooms, menu items) so the new record is not lonely. After creating live data, note that a reset will wipe it; do not promise persistence you will destroy next hour.

## Multi-team lab sessions

When three teams share one Mongo instance in a lab, namespace with prefixes or separate databases per team. Crossing seeds mid-viva is an avoidable comedy of errors. Coordinate with the lab assistant the day before and write your database name on the cheat sheet so nobody “helpfully” reseeds the shared default DB.

## Photographing seed evidence for the report

Chapter 5/6 screenshots should show the seeded demo path, not an empty local hack. Capture them after reset so they match what externals will see. Crop personal desktop clutter and WhatsApp popups — professionalism is part of the demo even in still images.

## Final 24-hour seed drill

1. Reset.  
2. Run full demo script once.  
3. Reset again.  
4. Run negative path.  
5. Reset.  
6. Sleep.  

If step 4 fails, fix fixtures — not your speech. Confidence on viva morning comes from boring repetition of seed + script, not from new features merged at midnight. Optionally email yourself the cheat-sheet accounts and job/room IDs so a dead sticky note cannot strand the team at the venue.

## Related reading

[What examiners look for in a demo](/blog/what-examiners-look-for-demo), [common viva mistakes](/blog/common-viva-mistakes-cs), [hotel booking architecture](/blog/hotel-booking-system-architecture), [job portal architecture](/blog/job-portal-mern-architecture).

## Project kits

- **[Online Job Portal](/projects/job-portal)** — includes seed script patterns for jobs and applications.  
- **[Hotel Booking System](/projects/hotel-booking-system)** — needs date-aware seeds for overlap demos.  
- **[Plant Disease Classification](/projects/plant-disease-classification)** — sample images and weights as the AI form of “seed.”
## One-command reset before the panel

Write a `npm run seed` or `python seed.py` that wipes demo collections and reloads known IDs. Practice the reset once on a clean laptop the morning of the exam. Print a cheat card: login emails, passwords, sample PDF name, expected chart title.

If Wi-Fi dies, your local seed still works. Combine with [what examiners look for in a demo](/blog/what-examiners-look-for-demo) so the script and the data tell the same story.

**Takeaway:** Deterministic seed data plus a reset script turns a nervous demo into a repeatable performance — the same discipline FinalYearKit kits use so you can show loans, bookings, or RAG answers without improvising fake records live.

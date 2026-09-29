---
title: "Job portal MERN architecture — seekers, recruiters, and application pipelines"
seoTitle: "Job Portal MERN Architecture for Final Year"
excerpt: "How a final-year job portal stays teachable: three roles, resume upload, search filters, and application status without pretending to be LinkedIn."
category: "Architecture"
readTime: "14 min read"
date: "2026-09-17"
author: "Rajan"
---

A job portal looks simple until you draw the trust boundaries. Job seekers must not edit someone else’s application. Recruiters must not see candidates for jobs they do not own. Admins moderate listings without becoming a second recruiter inbox. Resume files need safe upload and download paths. Search must filter by skills, location, and salary without turning into a full Elasticsearch thesis. That is the architecture story Indian B.Tech panels expect when you say “Online Job Portal” — not a clone of Naukri, but a clear multi-role MERN system with honest scope.

This guide maps the [Online Job Portal](/projects/job-portal) kit’s design decisions so you can defend them in Chapter 4, live demo, and viva. Compare verbally with sibling domains such as [Library Management System](/projects/library-management-system) (RBAC spine) and [MERN ecommerce](/projects/mern-ecommerce) (file/metadata patterns). For role-defence drills, keep [library RBAC viva](/blog/mern-library-rbac-viva) open while you practice.

## Opening pitch (45 seconds)

Our Job Portal lets seekers browse openings, upload resumes, and track applications while recruiters post jobs and move candidates through shortlist/reject statuses. Admins moderate listings that violate policy. Authentication uses JWT; authorization uses role middleware on every mutating route. Resume upload goes through Multer with stored metadata; recruiters download from their own application inbox. Search and filters run against indexed fields on the Job collection. We did not build messaging, ATS scoring, or company pages — those are documented limitations.

Memorize that paragraph. Panels interrupt; a tight pitch proves you own the system.

## Three roles — keep the matrix tight

**Job seeker:** register/login, search and filter jobs, view job detail, upload/replace resume, apply once per job, view own application statuses, withdraw if policy allows.

**Recruiter:** create and edit own job posts, close or reopen listings, view applications for own jobs, update status (under review / shortlisted / rejected / hired), download attached resumes.

**Admin:** moderate all listings (approve/hide/remove), manage abusive accounts if implemented, view platform-level counts, hard-delete where enabled.

UI menus hide forbidden actions; Express middleware enforces them. If your report says “employer” instead of “recruiter,” use one term everywhere — synonym drift mid-viva looks like two people wrote Chapter 3.

### Ownership rule that examiners love

`application.jobId` → `job.recruiterId` must equal `req.user.id` (or admin). Never authorize by “recruiter role alone.” A recruiter who can open any application ID is a security bug, not a feature. Demo this with two recruiter accounts if you have time.

## Why this is not generic CRUD

A schema form can create a Job document. It will not correctly: prevent duplicate applications, restrict resume download to the owning recruiter, filter salary ranges safely, or cascade status when a job is closed. Custom controllers encode invariants. Saying “we broke out of pure CRUD for applications and uploads on purpose” is a high-value architecture sentence — the same teaching move as custom booking logic in hotel kits.

### Entities worth drawing on the board

User (role), Job, Application, ResumeFile (or resume fields on User), optional Skill tag list. Relationships: Job belongs to Recruiter; Application references Job + Seeker + resume snapshot path; Admin acts on Job moderation flags.

Keep ER simple. Five boxes beat fifteen half-empty collections.

## Application pipeline as a state machine

Example statuses: `submitted` → `under_review` → `shortlisted` → `rejected` | `hired`, plus `withdrawn` by seeker.

Rules worth stating aloud:

- Seeker applies only to `open` / `approved` jobs.
- One active application per (seeker, job) pair — unique compound index.
- Recruiter may move statuses among their jobs only.
- Seeker withdraw allowed before `hired` (or before `shortlisted` — pick one policy and stick to it).
- Closed job rejects new applications with HTTP 400/409.

Invalid jumps return 400. Diagram this in Chapter 4. Invalid transitions are better viva answers than “admin can do anything.”

### Why status lives on Application, not Job

Job has lifecycle (`draft` / `open` / `closed` / `hidden`). Application has candidate lifecycle. Mixing them into one enum confuses reports and demos. Two state machines, clearly named, look intentional.

## Resume upload — Multer without drama

Client sends multipart form with PDF/DOCX. Server validates MIME/extension and size (for example 2 MB). Store file under `uploads/resumes/` with a generated name; store original name, mime, size, and path on User or Application. Prefer attaching a resume *snapshot* on Application so later profile resume changes do not rewrite history — mention this if you implemented it.

### Download authorization

`GET /applications/:id/resume` checks recruiter ownership or admin. Never expose static `/uploads` as world-readable without auth. If your demo uses a protected download route, say so explicitly — panels sometimes ask “can anyone guess the URL?”

### What not to claim

Do not claim virus scanning, OCR parsing, or AI resume scoring unless you built them. Multer + metadata is enough for a strong B.Tech portal. AI parsing is a different kit story (see resume/JD themes elsewhere on the site).

## Search and filters — honest Mongo queries

Typical filters: keyword on title/description, location, employment type, min/max salary, skills array contains, posted within N days. Implementation: build a query object from validated query params; escape regex if you use it; index `location`, `salaryMin`, `skills`, `status`, `createdAt`.

### Ranking humility

Default sort by `createdAt` descending is fine. “Relevance score” needs a real algorithm — TF-IDF, Atlas Search, or similar. If you sort by date and filter by skills, say that. Pretending Elasticsearch when you used `$regex` fails under follow-up.

### Pagination

`limit` + `skip` or cursor. Cap `limit` at 50. Empty result sets should return `[]`, not 404 — 404 is for missing job IDs.

## Admin moderation path

Unmoderated spam jobs ruin demos and realism. Flow options:

1. Recruiter posts → status `pending_approval` → admin approves → `open`.
2. Recruiter posts as `open` immediately; admin can `hide`.

Option 1 is cleaner for viva narratives about trust. Show one pending job and one approval click. That thirty seconds often satisfies “where is admin value?”

## Platform reuse — modular monolith

Shared across FinalYearKit MERN domains: auth, JWT, RBAC middleware, audit log hooks, admin shell, notification stubs. Different here: job search controllers, application state machine, Multer resume routes. This is how you explain architecture without five unrelated codebases. Contrast with [hotel booking](/projects/hotel-booking-system) date-overlap logic — same spine, different ligaments.

When asked “why MongoDB?”, answer for *this* domain: flexible job documents with skills arrays, rapid iteration, and academic familiarity — not “Mongo is always better than SQL.”

## Frontend composition that matches roles

Seeker: search bar, filter sidebar, job cards, apply modal with resume confirmation, “My applications” table.

Recruiter: “My jobs” CRUD, applicants table with status dropdown, resume download button.

Admin: moderation queue, user/role overview if in scope, simple counts (open jobs, applications this week).

Accessibility note for college projectors: high-contrast tables beat glassmorphism. Keyboard-usable filters matter more than animated cards.

## Security viva checklist (memorize)

- Passwords hashed (bcrypt); never log tokens.
- JWT in Authorization header; expiry set.
- Role middleware on POST/PATCH/DELETE.
- Ownership checks on applications and jobs.
- Client cannot set `status: hired` on create.
- File type/size validation; no path traversal in filenames.
- Rate-limit login if present; otherwise list as future work.

Cross-link mentally to ecommerce payment trust boundaries: server decides money; here server decides application status and file access.

## Testing scenarios for Chapter 6

- Seeker applies twice to same job → rejected.
- Recruiter B cannot list recruiter A’s applicants.
- Apply to closed job → error.
- Invalid salary range (min > max) → validation error.
- Oversized resume → rejected.
- Seeker cannot PATCH another seeker’s application.
- Admin hide removes job from public search.
- Withdraw transitions only from allowed states.

Write expected status codes. Panels who skim Chapter 6 look for this table.

## Live demo script (five minutes)

1. Admin or recruiter: show an open job with skills and salary.
2. Seeker: filter by skill → open job → apply with resume → status `submitted`.
3. Recruiter: open inbox → shortlist → show status change on seeker side.
4. Negative path: second apply or other recruiter’s job access → error.
5. Admin: hide a spam-like listing → confirm it disappears from seeker search.

Reset seed between practice runs so shortlist demos stay reproducible. Empty databases look unfinished even when code is correct.

## Report chapter mapping

Chapter 1: fragmented WhatsApp hiring, no tracking, resume chaos. Chapter 3: three actors, use cases, out-of-scope messaging. Chapter 4: ER, sequence (search → apply → review), state machines. Chapter 5: Multer, indexes, middleware snippets. Chapter 6: tests above. Chapter 7: no chat, no AI ranking, no mobile app, simplified moderation.

## Seed data that sells the domain

Include at least: 2 recruiters, 1 admin, 3 seekers, 8–12 jobs across cities and skills, 10+ applications in mixed statuses, 2–3 resume files. Salary figures in INR. Job titles that sound Indian-campus-plausible (Backend Intern, Campus Ambassador) help panels relate. See also the seed-focused guidance in related demo posts when you polish fixtures.

## Notifications — optional but explainable

In-app “application updated” is enough. Email is future work unless you integrated a provider. Do not show a bell icon that does nothing — remove or wire it.

## Aggregation for “analysis” slides

Recruiter dashboard: applications per job, status breakdown pie. Admin: jobs posted per week. One Mongo aggregation with `$group` is often enough for “analysis component” rubrics. Seed three weeks of `createdAt` so charts are non-empty.

## Extended Q&A

**Q: Why not LinkedIn?** A: Scope — we teach roles, upload, and pipelines; networking graph is out of scope.

**Q: How do you stop resume theft?** A: Authz on download; HTTPS in production; access audit if implemented.

**Q: Can seekers message recruiters?** A: Not in current scope; status updates are the feedback channel.

**Q: SQL injection?** A: Mongoose parameterized queries; still validate inputs.

**Q: Difference from library?** A: Jobs/applications vs books/loans — same RBAC idea, different ownership graph. Point to [Library Management System](/projects/library-management-system).

**Q: Where is AI?** A: This is a MERN systems project; optional future work is skill-match scoring — do not invent it live.

## Architecture decision records (short)

Write three ADRs in an appendix: (1) application state machine vs free-text status, (2) resume snapshot on application vs profile-only pointer, (3) admin pre-approval vs post-hoc hide. One paragraph each. External examiners who skim appendices often reward this.

## Frontend pitfalls checklist

- Disable Apply when already applied.
- Show file size limits before upload.
- Label salary as LPA or monthly consistently.
- Empty states with “no jobs match filters,” not a blank white page.
- Confirm destructive Close Job.

## Concurrency and double apply

Unique index on `(jobId, seekerId)` is your primary defence. Race of two parallel POSTs: one insert wins, one gets duplicate key → map to 409. Saying “unique index” is better than “we hope users click once.”

## Comparing sibling kits in one sentence

Library teaches copy-based inventory; hotel teaches date overlap; ecommerce teaches payments; job portal teaches file upload plus dual ownership (job owner vs applicant). Use that sentence if the panel says “everyone does MERN CRUD.”

## Common mistakes

Public `/uploads`. Letting seekers set application status. Demo with zero applications. Claiming Naukri-scale search. Forgetting admin moderation story. Using “employer/recruiter/company” interchangeably on slides. Showing a resume path in JSON to the wrong role. Seed jobs all in one city so filters look broken.

## Pre-viva checklist

- [ ] Three role logins verified on the demo laptop
- [ ] Seed jobs with distinct skills and locations
- [ ] At least one PDF resume downloadable by owning recruiter
- [ ] Duplicate apply returns a clear error
- [ ] State diagram matches live statuses
- [ ] Admin hide/approve path rehearsed
- [ ] Atlas/network or local Mongo plan for venue
- [ ] Backup screenshots of apply + shortlist

## Skills taxonomy — keep it boring and searchable

Store skills as a normalized string array (`["React", "Node.js", "MongoDB"]`) with a fixed casing convention in the seed script. Autocomplete on the frontend can read a small `skills.json` allow-list so seekers and recruiters do not invent twenty spellings of the same skill. For viva, explain `$all` / `$in` queries rather than inventing a graph database of skill ontologies. If you add “years of experience” later, put it on the Application or Profile — not as free text inside the job title.

### Location fields

Prefer a single `city` string plus optional `remote` boolean for student scope. Full geospatial indexes are impressive only if you implemented and tested them. Saying “we filter equality on city and a remote flag” is cleaner than waving at Mapbox tiles you never shipped.

## Audit log as recruiter accountability

When a recruiter moves an application to `rejected`, write `{ actorId, applicationId, from, to, at }`. Admin can answer “who rejected this candidate?” without reading server logs. This mirrors library kit accountability and gives you a Chapter 5 screenshot that is not just another CRUD form. If audit is shared middleware, say so — platform reuse is an architecture point, not a confession.

## Email templates vs in-app only

Status-change emails are future work unless you configured a provider. In-app banners or a simple notifications collection are enough. Do not leave an “Email candidate” button that opens a `mailto:` with no body and call it a notification system — either finish a minimal template or remove the control before externals.

## What “ATS” means if someone asks

Applicant Tracking System features in industry include parsing, scorecards, and interview loops. Your academic portal tracks applications and statuses. Call it a lightweight ATS-like workflow only if your guide likes that phrasing; otherwise “multi-role job application system” is accurate and safer.

## Week-before-viva architecture review

Sit with the ER diagram and circle every arrow you cannot explain. Open the recruiter download route and confirm the ownership `if` is still there after last-minute refactors. Run the seed on a clean database. Record a two-minute screencast of apply → shortlist as insurance. Architecture knowledge without a working demo still feels incomplete to most panels.

## Related reading

See also [library RBAC viva](/blog/mern-library-rbac-viva) for middleware phrasing and [what examiners look for in a demo](/blog/what-examiners-look-for-demo) for the success/edge/traceability pattern.

## Project kits

- **[Online Job Portal](/projects/job-portal)** — seekers, recruiters, admin moderation, resume upload, and application tracking in one MERN kit.
- **[Library Management System](/projects/library-management-system)** — parallel RBAC teaching kit when panels ask how roles generalize.
- **[MERN ecommerce](/projects/mern-ecommerce)** — sibling full-stack kit for trust-boundary comparisons (payments vs file authz).

**Takeaway:** Defend the job portal as three clear roles, an application state machine, authorized resume I/O, and honest search — not as a LinkedIn clone. If you can whiteboard ownership checks and show one shortlist path plus one forbidden access, you have the architecture viva covered.

# Project Kit Gap Audit
*Scanned: August 2026 — update this whenever a kit is completed.*

## Legend
| Symbol | Meaning |
|--------|---------|
| ✅ | Present |
| ❌ | Missing |
| ➖ | Not applicable for this project type |

---

## AI / ML Projects

All four AI/ML projects follow the `pdf-rag-chat` structure closely. These are in good shape.

| Check | pdf-rag-chat | chat-with-youtube | chat-with-data | resume-jd-matcher |
|---|:---:|:---:|:---:|:---:|
| Code runs clean | ✅ | ✅ | ✅ | ✅ |
| `student_config.json` | ✅ | ✅ | ✅ | ✅ |
| `report_template/` | ✅ | ✅ | ✅ | ✅ |
| `presentation/` | ✅ | ✅ | ✅ | ✅ |
| `viva_prep/` | ✅ | ✅ | ✅ | ✅ |
| Demo assets (`test_pdfs/` etc.) | ✅ | ✅ | ✅ | ✅ |
| `docs/` (architecture diagrams) | ✅ | ✅ | ✅ | ✅ |
| `scripts/` | ✅ | ✅ | ✅ | ✅ |
| `tracker/` | ✅ | ✅ | ✅ | ✅ |
| Website listing (`projects.ts`) | ✅ | ✅ | ✅ | ✅ |
| YouTube demo linked | ✅ | ✅ | ❌ | ❌ |

**Action items — AI/ML:**
- Add `demoYoutubeId` to `chat-with-data` and `resume-jd-matcher` in `projects.ts` once videos are recorded.

---

## MERN Stack Projects

These are missing almost all kit components — currently just code repos, not kits.

| Check | Library Mgmt | Hotel Booking | Restaurant Mgmt | Vehicle Fleet | MERN Ecommerce |
|---|:---:|:---:|:---:|:---:|:---:|
| Code runs clean | ✅ | ✅ | ✅ | ✅ | ❌ (new) |
| `student_config.json` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `report_template/` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `presentation/` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `viva_prep/` | ❌ | ❌ | ❌ | ❌ | ❌ |
| Seed script | ❌ | ❌ | ❌ | ❌ | ❌ |
| `docs/` (ER + architecture) | ✅ | ? | ? | ? | ❌ |
| Website listing (`projects.ts`) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Screenshots / YouTube | ❌ | ❌ | ❌ | ❌ | ❌ |

**Action items — MERN (priority order):**
1. Create `student_config.json` in each MERN project (template is identical to AI/ML version)
2. Create `viva_prep/viva_question_bank.md` — highest value, students ask for this most
3. Create `report_template/` with `generate_report.js` — can reuse the pdf-rag-chat generator pattern
4. Create `presentation/` with `generate_deck.js`
5. Add seed scripts (`server/seed.js`) for demo data
6. Add screenshots → set `hasScreenshots: true` in `projects.ts`

**Suggested order to complete kits:**
Pick one MERN project, fully complete it to DoD standard, then use it as the template for the rest.
Recommend starting with **Library Management** (simplest domain, easiest to write viva questions for).

---

## E-Commerce

| Check | mern-ecommerce |
|---|:---:|
| Code structure created | ✅ |
| `student_config.json` | ❌ |
| `report_template/` | ❌ |
| `presentation/` | ❌ |
| `viva_prep/` | ❌ |
| Seed script | ❌ |
| Website listing | ✅ |
| Screenshots / YouTube | ❌ |

Same gaps as MERN. Complete the MERN template first, then port to ecommerce.

---

## Summary

| Category | Kit-complete? |
|---|---|
| pdf-rag-chat | ✅ **Ready** |
| chat-with-youtube | ✅ **Ready** |
| chat-with-data | ✅ **Ready** (missing YouTube demo) |
| resume-jd-matcher | ✅ **Ready** (missing YouTube demo) |
| Smart Library Management | ❌ Code only |
| Hotel Booking | ❌ Code only |
| Restaurant Management | ❌ Code only |
| Vehicle Fleet | ❌ Code only |
| MERN E-Commerce | ❌ Code only |

*4 of 9 kits are fully ready. 5 kits are missing report, presentation, viva prep, and seed data.*

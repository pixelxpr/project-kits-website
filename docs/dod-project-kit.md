# Project Kit — Definition of Done (DoD)

> A project kit is **NOT ready to sell** until ALL applicable checks pass.
> Use `pdf-rag-chat` as the reference implementation — it is the current gold standard.

---

## 1. Working Code

- [ ] Application runs end-to-end without errors on a fresh machine
- [ ] Setup takes **under 15 minutes** following only the README instructions
- [ ] All environment variables documented in `.env.example` (no undocumented secrets)
- [ ] No hardcoded paths, API keys, or student-specific values in source code
- [ ] Dependencies pinned in `requirements.txt` / `package.json` — no floating `latest`
- [ ] Key happy-path flows manually tested before tagging

---

## 2. `student_config.json`

- [ ] File exists at the project root
- [ ] Contains all personalisation fields: `STUDENT_NAME`, `ROLL_NUMBER`, `COLLEGE_NAME`, `DEPARTMENT`, `UNIVERSITY_NAME`, `GUIDE_NAME`, `HOD_NAME`, `ACADEMIC_YEAR`, `SUBMISSION_MONTH_YEAR`
- [ ] All values are placeholder strings in `[Square Brackets]` — nothing hardcoded
- [ ] Report and presentation generators read from this file (values propagate automatically)

---

## 3. `report_template/`

- [ ] Folder exists
- [ ] `generate_report.js` (or equivalent) present and working
- [ ] Generated `.docx` report covers all 8 standard chapters:
  1. Introduction
  2. Literature Review / Related Work
  3. System Requirements
  4. System Design (architecture diagram, ER diagram where applicable)
  5. Implementation
  6. Testing
  7. Results & Discussion
  8. Conclusion & Future Work
- [ ] Student fields injected from `student_config.json` (title page, headers, footers)
- [ ] Report is **at minimum 60 pages** when generated
- [ ] References section has at least 10 cited sources
- [ ] Architecture diagram embedded in the report

---

## 4. `presentation/`

- [ ] Folder exists
- [ ] `generate_deck.js` (or equivalent) present and working
- [ ] Generated `.pptx` covers **14 slides minimum**:
  1. Title slide (student name, college, project title)
  2. Problem statement
  3. Objectives
  4. Tech stack
  5. System architecture
  6. Module / feature walkthrough (2–3 slides)
  7. Database design
  8. Implementation screenshots / demo
  9. Testing results
  10. Limitations
  11. Conclusion & future scope
  12. References
- [ ] Presentation reads from `student_config.json` for title slide personalisation
- [ ] No placeholder text visible in generated file

---

## 5. `viva_prep/`

- [ ] Folder exists
- [ ] `viva_question_bank.md` present with **at least 20 questions**
- [ ] Questions grouped by category (Conceptual, Architecture, Technical, Testing, Tricky)
- [ ] Each question has a clear, confident answer (not "it depends")
- [ ] Covers the obvious killer questions for this project specifically
- [ ] Includes a **2-minute pitch script** — how to introduce the project when asked "tell me about your project"

---

## 6. Demo / Test Assets

- [ ] Folder exists (`test_pdfs/`, `test_data/`, `seed.js`, etc. — appropriate to project type)
- [ ] At least **2 sample assets** ready for demo day (not the same trivial example)
- [ ] Assets are realistic — not "hello world" data
- [ ] A README inside the folder explains what each asset is for
- [ ] For MERN projects: seed script creates demo accounts + sample data in one command

---

## 7. `docs/`

- [ ] Architecture diagram present (`architecture_diagram.png` + `.svg`)
- [ ] Diagrams are clean, readable at A4 size, not AI-generated clip art
- [ ] For MERN projects: ER diagram present
- [ ] For AI/ML projects: data flow / query routing diagram present

---

## 8. `README.md`

- [ ] Project name and one-line description at the top
- [ ] Tech stack table
- [ ] Feature list
- [ ] Setup instructions (clone → install → configure `.env` → run)
- [ ] How to run the seed / test data script
- [ ] Viva questions to prepare (at least 5, with links to `viva_prep/`)
- [ ] No broken links

---

## 9. Website Listing (`projects.ts`)

- [ ] Entry exists in `lib/projects.ts`
- [ ] `slug` matches the GitHub repo name exactly
- [ ] `category` is correct (`ai-ml` / `mern` / `ecommerce`)
- [ ] `title` and `tagline` are distinct and non-generic
- [ ] `description` is 3–4 sentences, explains the *architecture*, not just the features
- [ ] `techStack` lists every major dependency (no vague "Python libraries")
- [ ] `features` — 4–5 bullets, each starting with a verb
- [ ] `whatIncluded` — accurately lists everything in the kit
- [ ] `demoExchange` — a realistic question + answer + citation that shows the system working
- [ ] `faq` — at least 2 honest FAQs (limitations are OK, hiding them is not)
- [ ] `hasScreenshots` set correctly — `false` if screenshots not yet added
- [ ] `demoYoutubeId` set if a demo video exists on YouTube

---

## 10. Website Metadata

- [ ] Dynamic cover generates correctly at `/api/covers/[slug]` — open in browser to verify
- [ ] Project detail page loads at `/projects/[slug]` without errors
- [ ] OG title, description, and image are correct (check with social preview tools)

---

## 11. WhatsApp CTA

- [ ] The per-kit WhatsApp message is tested — message a real device and confirm it reads naturally
- [ ] Pricing tier assigned correctly in `site.ts`

---

## Publishing Rule

Do not mark a kit as live on the website until:

| Check | Status |
|---|---|
| Code runs clean on a fresh machine | ✅ |
| Report generates (60+ pages) | ✅ |
| Presentation generates (14+ slides) | ✅ |
| Viva bank has 20+ Q&As | ✅ |
| Demo assets ready | ✅ |
| Website listing complete | ✅ |
| Dynamic cover working | ✅ |

---

*Reference project: `pdf-rag-chat` — check it when in doubt about folder structure or content depth.*
*Last updated: August 2026.*

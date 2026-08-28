# Blog Post — Definition of Done (DoD)

> A blog post is **NOT ready to publish** until ALL applicable checks pass.
> Our blog's job: attract a student who is *about to choose or defend a project*,
> and convert them into a WhatsApp inquiry.

---

## 1. Topic & Intent

- [ ] Post targets a **specific student query** — not a generic topic
  - ✅ Good: "20 viva questions every RAG project should be ready for"
  - ❌ Too broad: "What is machine learning?"
- [ ] Topic naturally connects to at least one project kit we sell
- [ ] Post is NOT something a student can fully satisfy with a 5-second Google search

---

## 2. Content Quality

- [ ] Post gives genuinely useful, specific answers — not padded theory
- [ ] A student could walk into a viva having only read this post and feel more confident
- [ ] No filler phrases or AI repetition ("In conclusion...", "It is important to note...")
- [ ] Reading time estimate is accurate (add to `blogPosts` entry in `lib/blog.ts`)
- [ ] Written in plain English — no unnecessarily complex language for a student audience

---

## 3. Structure

- [ ] Opening paragraph immediately delivers value — no preamble
- [ ] Clear `H2` section headings — reader can understand the post from headings alone
- [ ] Short paragraphs (3–4 lines max)
- [ ] At least one of: numbered list, bullet list, or bold Q&A format
- [ ] Conclusion or "key takeaway" at the end

---

## 4. Conversion

- [ ] WhatsApp CTA is present (handled automatically by `WhatsAppInlineCta` at the bottom)
- [ ] At least **1 natural mention** of a relevant project kit inline (not forced)
- [ ] Post links to at least **2 project detail pages** (`/projects/[slug]`)
- [ ] Post links to at least **1 other blog post** for internal linking

---

## 5. Metadata & Registration

- [ ] Post added to `blogPosts` array in `lib/blog.ts` with all fields:
  - `slug` — URL-friendly, matches the topic exactly
  - `title` — specific, not clickbait
  - `excerpt` — 1–2 sentences, honest summary
  - `category` — one of: `Architecture`, `Viva Prep`, `Guides`
  - `readTime` — honest estimate (`X min read`)
  - `date` — ISO format (`YYYY-MM-DD`)
- [ ] Meta title is specific and under 60 characters
- [ ] Meta description is honest and under 160 characters
- [ ] URL slug contains the primary keyword

---

## 6. Final Check

Ask yourself:

- [ ] Would a final-year student bookmark this before their viva?
- [ ] Does reading this make them think "these people actually know what they're talking about"?
- [ ] Is there a clear next step for the reader (view a kit, WhatsApp us)?

---

*Last updated: August 2026.*

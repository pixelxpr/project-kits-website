# Blog posts

One **Markdown** file per post (not MDX, not hand-written HTML). `lib/blog.ts` loads `*.md`; the blog page renders Markdown → HTML with `react-markdown`.

Target length: **~2,200–2,800 words** (~12–15 min read).

Related posts + suggested kits are curated in **`lib/blog-related.ts`**.
Project page guides ("Guides for this kit") are curated in **`lib/project-related.ts`**.

## Add a post

1. Create `content/blog/your-slug.md`
2. Fill frontmatter + body (see template below)
3. Optional: add `public/blog/your-slug.png` as the cover (shown once in the page header — do **not** embed it again in the Markdown body)
4. Add an entry in `lib/blog-related.ts` for `relatedPosts` + `suggestedProjects`
5. If the post should appear on a kit page, add its slug under that project in `lib/project-related.ts`
6. Restart / rebuild — every `*.md` loads automatically

## Template

```md
---
title: "Your specific title"
seoTitle: "Optional short title under 60 chars"
excerpt: "One or two honest sentences for cards and SEO."
category: "Guides"
readTime: "14 min read"
date: "2026-09-10"
author: "Rajan"
---

Opening paragraph with immediate value.

## Section

Body in Markdown. Link kits like [Chat with PDF](/projects/pdf-rag-chat)
and other posts like [How RAG works](/blog/how-rag-works).

**Takeaway:** …
```

- `author` defaults to `site.author.name` in `lib/site.ts` if omitted.
- Categories: `Architecture` | `Viva Prep` | `Guides`

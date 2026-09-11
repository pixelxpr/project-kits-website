# Blog posts

One **Markdown** file per post (not MDX, not hand-written HTML). `lib/blog.ts` loads `*.md`; the blog page renders Markdown → HTML with `react-markdown`.

Target length: **~2,200–2,800 words** (~12–15 min read).

## Add a post

1. Create `content/blog/your-slug.md`
2. Fill frontmatter + body (see template below)
3. Optional: add `public/blog/your-slug.png` as the cover
4. Restart / rebuild — every `*.md` loads automatically

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

![Cover](/blog/your-slug.png)

## Section

Body in Markdown. Link kits like [Chat with PDF](/projects/pdf-rag-chat)
and other posts like [How RAG works](/blog/how-rag-works).

**Takeaway:** …
```

- `author` defaults to `site.author.name` in `lib/site.ts` if omitted.
- Categories: `Architecture` | `Viva Prep` | `Guides`

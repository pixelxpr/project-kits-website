# Blog posts

One Markdown file per post in this folder.

## Add a post

1. Create `content/blog/your-slug.md`
2. Fill frontmatter + body (see template below)
3. Optional: add `public/blog/your-slug.png` as the cover
4. Restart / rebuild — `lib/blog.ts` loads every `*.md` automatically

## Template

```md
---
title: "Your specific title"
seoTitle: "Optional short title under 60 chars"
excerpt: "One or two honest sentences for cards and SEO."
category: "Guides"
readTime: "6 min read"
date: "2026-09-10"
---

Opening paragraph with immediate value.

![Cover](/blog/your-slug.png)

## Section

Body in Markdown. Link kits like [Chat with PDF](/projects/pdf-rag-chat)
and other posts like [How RAG works](/blog/how-rag-works).

**Takeaway:** …
```

Categories: `Architecture` | `Viva Prep` | `Guides`

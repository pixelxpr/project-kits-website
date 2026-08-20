# Project kits website

A Next.js site for browsing and inquiring about your AI project kits —
homepage catalog, a detail page per project, and an About/trust page. Built
to solve the two things the original feedback flagged: **"can't see the
product"** and **"no trust before paying"** — every project page shows a real
Q&A demo, screenshots, exactly what's included, and a way to ask before
buying.

## Before you deploy — 3 things to edit

**1. `lib/site.ts`** — your brand name, WhatsApp number, Instagram handle,
email, and pricing. Every `TODO` comment marks a placeholder that needs your
real details.

**2. `public/projects/<slug>/`** — replace the placeholder images (currently
dashed "Add screenshot" boxes) with your real screenshots. See
`public/projects/README.md` for exact filenames and sizes.

**3. `app/about/page.tsx`** — replace the placeholder bio paragraph (marked
with a `TODO` comment) with your real background/credentials.

Everything else — project descriptions, features, tech stack, FAQ — is
already filled in with real details pulled from your actual four products,
in `lib/projects.ts`. Edit that file to update copy or add a fifth project.

## Run it locally

```bash
npm install
npm run dev
```
Open http://localhost:3000. Changes to any file hot-reload automatically.

## Deploy it (no domain needed yet)

**Vercel (recommended, easiest):**
1. Push this repo to GitHub (see below)
2. Go to https://vercel.com, sign in with GitHub, click "Import Project"
3. Select this repo — Vercel auto-detects Next.js, no config needed
4. You get a free `yourproject.vercel.app` URL immediately; add a custom
   domain later from the same dashboard whenever you buy one

**Netlify** works the same way, via https://netlify.com's "Import from Git" flow.

## Adding a 5th project

1. Add a new object to the `projects` array in `lib/projects.ts` (copy an
   existing one as a template)
2. Create `public/projects/<new-slug>/` with `cover.jpg` and 3 screenshots
3. That's it — the homepage grid and a new `/projects/<new-slug>` detail page
   both appear automatically, no other file needs to change

## Structure

- `app/page.tsx` — homepage (hero, trust bar, project grid, how-it-works, pricing, FAQ)
- `app/projects/[slug]/page.tsx` — project detail page template (shared by all 4 projects)
- `app/about/page.tsx` — trust/credibility page
- `lib/site.ts` — site-wide config (brand, contact, pricing) — **edit this first**
- `lib/projects.ts` — project catalog data
- `components/` — Header, Footer, WhatsAppButton, ChatMockup, ProjectCard, StampBadge, PricingTiers, FaqAccordion
- `public/projects/<slug>/` — per-project images — **replace placeholders here**

## Design notes

Built around an "approved/tested" academic-submission motif (the stamp badge,
manila-paper background, monospace headers) rather than a generic SaaS
look — since the actual product is a graded academic submission, and the
core trust problem is "will this actually work," a visual language of
verification felt more honest than a typical startup landing page. Fonts:
IBM Plex Mono (display/headers) + Inter (body). No dark mode by design — the
paper aesthetic doesn't translate to it well, and a half-implemented dark
variant would dilute the look more than it'd help.

## A note on what I could and couldn't verify

I ran a full production build and lint pass successfully (9 static pages
generated, zero errors, zero warnings) — but I could not get a real visual
screenshot of the rendered site in the sandbox this was built in (no network
access to fetch either the Google Fonts or a headless browser binary for
screenshotting). Worth running `npm run dev` yourself and eyeballing it,
especially on mobile width, before you deploy or start sending people the link.

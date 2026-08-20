# Adding your real screenshots and videos

Every project folder here currently has **placeholder images** (the dashed
"Add screenshot" boxes you'll see on the live site). Replace them with your
real assets using these exact filenames — the site reads them automatically,
no code changes needed.

For each project folder (`pdf-rag-chat/`, `chat-with-youtube/`,
`chat-with-data/`, `resume-jd-matcher/`):

| File | Used where | Recommended size |
|---|---|---|
| `cover.jpg` | Homepage project card | ~1200\u00d7900 (4:3) |
| `screenshot-1.jpg` | Detail page gallery | ~1600\u00d7900 (16:9) |
| `screenshot-2.jpg` | Detail page gallery | ~1600\u00d7900 (16:9) |
| `screenshot-3.jpg` | Detail page gallery | ~1600\u00d7900 (16:9) |

Just drop a file in with the exact name to replace the placeholder — no
code changes needed, the pages already reference these paths.

## Demo videos

The detail pages don't currently embed video directly. Easiest option: upload
your demo videos to YouTube (unlisted is fine) and add a `demoYoutubeId` field
to that project's entry in `lib/projects.ts`, e.g.:

```ts
demoYoutubeId: "dQw4w9WgXcQ",
```

Then ask Claude (or see `lib/projects.ts`) to add a video embed block to the
detail page template — it's a small, contained change since the data field is
already defined in the type.

## Tips for good screenshots

- Crop out your browser chrome/tabs where possible, or at least crop tightly
  around the app itself
- Use a real, interesting question in your demo screenshots (not "test
  test") — this is doing real trust-building work, treat it like a resume
  screenshot, not a random work-in-progress capture
- Keep file sizes reasonable (under ~500KB each) so the site stays fast on
  mobile data

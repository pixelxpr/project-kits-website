# Project media assets

Drop files into `public/projects/<slug>/` using these names:

| File | Used where |
|---|---|
| `cover.jpg` | Homepage / catalog cards (optional; API cover used if missing) |
| `screenshot-1.jpg` … | Project page gallery |
| `report-preview-1.jpg` … | Word report sample pages |
| `slide-preview-1.jpg` … | PPT sample slides |

Then set flags on the project in `lib/projects.ts`:

- `hasScreenshots: true` (+ `screenshotCount` if not 3)
- `hasDocPreviews: true` (+ optional `reportPreviewCount` / `slidePreviewCount`)

Recommended size: screenshots ~1600×900, report pages ~1240×1750, slides ~1600×900. Keep JPEGs under ~500KB when possible.

#!/usr/bin/env node
/**
 * Build Instant download ZIPs: source (stripped) + report.docx + slides.pptx + README-DELIVERY.md
 *
 * Usage (from website repo root):
 *   node scripts/package-instant-zips.mjs
 *   node scripts/package-instant-zips.mjs pdf-rag-chat
 *
 * Output: dist/instant/{slug}.zip
 * Upload guide: docs/r2-instant-downloads.md
 */

import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEBSITE_ROOT = resolve(__dirname, "..");
const KITS_ROOT = resolve(WEBSITE_ROOT, "..");
const OUT_DIR = join(WEBSITE_ROOT, "dist", "instant");

/** slug → sibling folder name under collage projects/ */
const SOURCE_DIRS = {
  "pdf-rag-chat": "pdf-rag-chat",
  "chat-with-youtube": "chat-with-youtube",
  "chat-with-data": "chat-with-data",
  "resume-jd-matcher": "resume-jd-matcher",
  "library-management-system": "Smart-Library-Management-system",
  "hotel-booking-system": "hotel-booking-system",
  "restaurant-management-system": "restaurant-management-system",
  "vehicle-fleet-management-system": "vehicle-fleet-management-system",
  "mern-ecommerce": "mern-ecommerce",
  "face-recognition-attendance": "face-recognition-attendance",
};

const SKIP_DIR_NAMES = new Set([
  "node_modules",
  ".git",
  ".next",
  "venv",
  ".venv",
  "__pycache__",
  ".turbo",
  "dist",
  "build",
  "coverage",
  ".cache",
  "tracker",
  "deliverables",
]);

const SKIP_FILE_PREFIXES = [".env"];
const SKIP_FILE_NAMES = new Set([".DS_Store", "Thumbs.db"]);

function shouldSkipEntry(name) {
  if (SKIP_DIR_NAMES.has(name)) return true;
  if (SKIP_FILE_NAMES.has(name)) return true;
  if (SKIP_FILE_PREFIXES.some((p) => name === p || name.startsWith(`${p}.`))) return true;
  return false;
}

function copyTreeFiltered(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const name of readdirSync(src)) {
    if (shouldSkipEntry(name)) continue;
    const from = join(src, name);
    const to = join(dest, name);
    const st = statSync(from);
    if (st.isDirectory()) {
      copyTreeFiltered(from, to);
    } else if (st.isFile()) {
      cpSync(from, to);
    }
  }
}

function findFirst(dir, ext) {
  if (!existsSync(dir)) return null;
  const files = readdirSync(dir).filter((f) => f.toLowerCase().endsWith(ext));
  return files.length ? join(dir, files[0]) : null;
}

function resolveDocs(sourceRoot) {
  const report =
    findFirst(join(sourceRoot, "report_template"), ".docx") ||
    findFirst(join(sourceRoot, "deliverables", "Student_Name"), ".docx");
  const ppt =
    findFirst(join(sourceRoot, "presentation"), ".pptx") ||
    findFirst(join(sourceRoot, "deliverables", "Student_Name"), ".pptx");
  return { report, ppt };
}

function deliveryReadme(slug, titleHint) {
  return `# ${titleHint} — Instant package

Thank you for your purchase.

## What's included

- Project source code (this folder)
- \`docs/report.docx\` — 8-chapter academic report (placeholder student / college name)
- \`docs/slides.pptx\` — presentation deck (same placeholders)
- This README

## Placeholders

Report and slides use placeholder name and college. They are **not** blank templates — content is written for this project. To have your real name, college, and department filled in, purchase the **Customize name & college** add-on and message us on WhatsApp with your details.

## How to run

Follow the main \`README.md\` in this package (install dependencies, env vars if any, start commands).

## Support at base tier

The ₹999 Instant package does **not** include installation help, viva coaching, walkthroughs, or document customization. Those are optional paid add-ons on [finalyearkit.com](https://finalyearkit.com).

Questions about a corrupt ZIP or wrong project? WhatsApp us with your payment ID.

Slug: \`${slug}\`
`;
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function packageOne(slug) {
  const folder = SOURCE_DIRS[slug];
  if (!folder) throw new Error(`Unknown Instant slug: ${slug}`);

  const sourceRoot = join(KITS_ROOT, folder);
  if (!existsSync(sourceRoot)) {
    throw new Error(`Source missing: ${sourceRoot}`);
  }

  const { report, ppt } = resolveDocs(sourceRoot);
  if (!report) throw new Error(`${slug}: no .docx found under report_template`);
  if (!ppt) throw new Error(`${slug}: no .pptx found under presentation`);

  const staging = mkdtempSync(join(tmpdir(), `fykit-${slug}-`));
  const payload = join(staging, slug);

  try {
    copyTreeFiltered(sourceRoot, payload);

    const docsDir = join(payload, "docs");
    mkdirSync(docsDir, { recursive: true });
    cpSync(report, join(docsDir, "report.docx"));
    cpSync(ppt, join(docsDir, "slides.pptx"));

    writeFileSync(
      join(payload, "README-DELIVERY.md"),
      deliveryReadme(slug, titleFromSlug(slug)),
      "utf8",
    );

    mkdirSync(OUT_DIR, { recursive: true });
    const zipPath = join(OUT_DIR, `${slug}.zip`);
    if (existsSync(zipPath)) rmSync(zipPath);

    const zip = spawnSync(
      "zip",
      ["-r", "-q", zipPath, slug],
      { cwd: staging, encoding: "utf8" },
    );
    if (zip.status !== 0) {
      throw new Error(`zip failed for ${slug}: ${zip.stderr || zip.stdout}`);
    }

    const sizeMb = (statSync(zipPath).size / (1024 * 1024)).toFixed(2);
    console.log(`✓ ${slug}.zip (${sizeMb} MB) → ${zipPath}`);
    return zipPath;
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}

function main() {
  const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  const slugs = only.length ? only : Object.keys(SOURCE_DIRS);

  console.log(`Packaging ${slugs.length} Instant ZIP(s)…`);
  console.log(`Kits root: ${KITS_ROOT}`);
  console.log(`Output:    ${OUT_DIR}\n`);

  const failed = [];
  for (const slug of slugs) {
    try {
      packageOne(slug);
    } catch (e) {
      failed.push(slug);
      console.error(`✗ ${slug}: ${e instanceof Error ? e.message : e}`);
    }
  }

  console.log("");
  if (failed.length) {
    console.error(`Done with errors (${failed.length} failed).`);
    process.exit(1);
  }
  console.log("All Instant ZIPs ready. Upload with docs/r2-instant-downloads.md");
}

main();

// blog.ts — loads one Markdown file per post from content/blog/<slug>.md
//
// Add a post: create content/blog/my-slug.md with YAML frontmatter + markdown body.
// Required: title, excerpt, category, readTime, date (ISO)
// Optional: seoTitle, author (defaults to site.author.name)

import fs from "fs";
import path from "path";
import { site } from "@/lib/site";

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  body: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function unquote(value: string): string {
  const v = value.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    return v
      .slice(1, -1)
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, "\\");
  }
  return v;
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const trimmed = raw.replace(/^\uFEFF/, "");
  if (!trimmed.startsWith("---\n") && !trimmed.startsWith("---\r\n")) {
    return { data: {}, body: trimmed };
  }

  const end = trimmed.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: trimmed };

  const fmBlock = trimmed.slice(4, end).replace(/^\r/, "");
  let body = trimmed.slice(end + 4);
  if (body.startsWith("\r\n")) body = body.slice(2);
  else if (body.startsWith("\n")) body = body.slice(1);

  const data: Record<string, string> = {};
  for (const line of fmBlock.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = unquote(line.slice(colon + 1));
    data[key] = value;
  }

  return { data, body: body.trim() };
}

function loadAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .sort();

  const posts: BlogPost[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, body } = parseFrontmatter(raw);

    if (!data.title || !data.excerpt || !data.category || !data.date) {
      throw new Error(
        `Blog post ${file} is missing required frontmatter (title, excerpt, category, date)`
      );
    }

    posts.push({
      slug,
      title: data.title,
      seoTitle: data.seoTitle || undefined,
      excerpt: data.excerpt,
      category: data.category,
      readTime: data.readTime || "5 min read",
      date: data.date,
      author: data.author || site.author.name,
      body,
    });
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export const blogPosts: BlogPost[] = loadAllPosts();

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

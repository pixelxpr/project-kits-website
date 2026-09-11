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

/** Blog guides that naturally support a project kit (internal-link helpers). */
const PROJECT_BLOG_LINKS: Record<string, string[]> = {
  "pdf-rag-chat": ["defending-chat-with-pdf-viva", "how-rag-works", "viva-questions-rag-projects"],
  "chat-with-youtube": ["defending-chat-with-youtube-viva", "how-rag-works", "hybrid-search-rag-explained"],
  "chat-with-data": ["chat-with-data-viva-questions", "three-patterns-for-ai-projects", "streamlit-final-year-ai-demos"],
  "resume-jd-matcher": ["resume-jd-matcher-explainable-scoring", "three-patterns-for-ai-projects"],
  "library-management-system": ["mern-library-rbac-viva", "same-project-differentiate"],
  "hotel-booking-system": ["hotel-booking-system-architecture"],
  "restaurant-management-system": ["restaurant-management-system-guide"],
  "vehicle-fleet-management-system": ["vehicle-fleet-management-final-year", "mern-library-rbac-viva"],
  "mern-ecommerce": ["razorpay-mern-ecommerce-viva"],
  "face-recognition-attendance": ["choosing-a-final-year-project", "what-examiners-look-for-demo"],
  "college-faq-chatbot": ["how-rag-works", "viva-questions-rag-projects"],
  "fake-news-detection": ["three-patterns-for-ai-projects", "streamlit-final-year-ai-demos"],
  "plant-disease-classification": ["streamlit-final-year-ai-demos", "choosing-a-final-year-project"],
  "sentiment-analysis-dashboard": ["streamlit-final-year-ai-demos", "three-patterns-for-ai-projects"],
  "movie-recommendation-system": ["three-patterns-for-ai-projects", "streamlit-final-year-ai-demos"],
  "speech-to-text-notes": ["streamlit-final-year-ai-demos", "choosing-a-final-year-project"],
  "traffic-sign-recognition": ["streamlit-final-year-ai-demos", "faiss-vs-pinecone-student-projects"],
  "hospital-management-system": ["mern-library-rbac-viva", "eight-chapter-report-structure"],
  "online-examination-system": ["eight-chapter-report-structure", "what-examiners-look-for-demo"],
  "inventory-management-system": ["mern-library-rbac-viva", "eight-chapter-report-structure"],
  "job-portal": ["resume-jd-matcher-explainable-scoring", "eight-chapter-report-structure"],
  "gym-management-system": ["eight-chapter-report-structure", "what-examiners-look-for-demo"],
  "college-erp-system": ["eight-chapter-report-structure", "customize-kit-college-name"],
  "multi-vendor-marketplace": ["razorpay-mern-ecommerce-viva", "ai-vs-mern-final-year-project"],
  "food-delivery-app": ["razorpay-mern-ecommerce-viva", "restaurant-management-system-guide"],
  "bookstore-ecommerce": ["razorpay-mern-ecommerce-viva"],
  "fashion-boutique-store": ["razorpay-mern-ecommerce-viva"],
  "pharmacy-ecommerce": ["razorpay-mern-ecommerce-viva"],
  "flutter-notes-app": ["ai-vs-mern-final-year-project", "choosing-a-final-year-project"],
  "flutter-expense-tracker": ["ai-vs-mern-final-year-project", "choosing-a-final-year-project"],
  "flutter-doctor-appointment": ["ai-vs-mern-final-year-project", "what-examiners-look-for-demo"],
  "flutter-recipe-app": ["ai-vs-mern-final-year-project", "choosing-a-final-year-project"],
  "react-native-fitness-app": ["ai-vs-mern-final-year-project", "choosing-a-final-year-project"],
  "react-native-chat-app": ["ai-vs-mern-final-year-project", "what-examiners-look-for-demo"],
};

const CATEGORY_BLOG_FALLBACK: Record<string, string[]> = {
  "ai-ml": ["how-rag-works", "streamlit-final-year-ai-demos", "choosing-a-final-year-project"],
  mern: ["eight-chapter-report-structure", "ai-vs-mern-final-year-project", "what-examiners-look-for-demo"],
  ecommerce: ["razorpay-mern-ecommerce-viva", "ai-vs-mern-final-year-project"],
  mobile: ["ai-vs-mern-final-year-project", "choosing-a-final-year-project"],
};

export function getRelatedBlogPosts(projectSlug: string, category: string, limit = 3) {
  const slugs = PROJECT_BLOG_LINKS[projectSlug] ?? CATEGORY_BLOG_FALLBACK[category] ?? [];
  return slugs
    .map((s) => getBlogPost(s))
    .filter((p): p is BlogPost => Boolean(p))
    .slice(0, limit);
}

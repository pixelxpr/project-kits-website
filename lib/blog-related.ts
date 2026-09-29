// blog-related.ts — curated "More posts" + suggested projects per blog slug.
// Edit this file to manage cross-links on /blog/[slug] without touching page.tsx.

import { blogPosts, getBlogPost, type BlogPost } from "@/lib/blog";
import { getProject, type Project } from "@/lib/projects";

export type BlogRelations = {
  /** Other blog slugs shown under "More posts" (order preserved). */
  relatedPosts: string[];
  /** Project kit slugs shown under "Suggested kits" (order preserved). */
  suggestedProjects: string[];
};

/**
 * Per-post overrides. Anything missing falls back to category-based defaults.
 * Keep 2–3 related posts and 2–3 projects for a tight footer.
 */
export const blogRelations: Record<string, BlogRelations> = {
  "how-rag-works": {
    relatedPosts: [
      "hybrid-search-rag-explained",
      "viva-questions-rag-projects",
      "faiss-vs-pinecone-student-projects",
    ],
    suggestedProjects: ["pdf-rag-chat", "chat-with-youtube", "college-faq-chatbot"],
  },
  "hybrid-search-rag-explained": {
    relatedPosts: ["how-rag-works", "viva-questions-rag-projects", "defending-chat-with-pdf-viva"],
    suggestedProjects: ["pdf-rag-chat", "chat-with-youtube", "chat-with-data"],
  },
  "viva-questions-rag-projects": {
    relatedPosts: ["how-rag-works", "defending-chat-with-pdf-viva", "faiss-vs-pinecone-student-projects"],
    suggestedProjects: ["pdf-rag-chat", "chat-with-youtube", "college-faq-chatbot"],
  },
  "faiss-vs-pinecone-student-projects": {
    relatedPosts: ["how-rag-works", "hybrid-search-rag-explained", "streamlit-final-year-ai-demos"],
    suggestedProjects: ["pdf-rag-chat", "chat-with-youtube", "college-faq-chatbot"],
  },
  "defending-chat-with-pdf-viva": {
    relatedPosts: ["viva-questions-rag-projects", "how-rag-works", "hybrid-search-rag-explained"],
    suggestedProjects: ["pdf-rag-chat", "chat-with-youtube", "resume-jd-matcher"],
  },
  "defending-chat-with-youtube-viva": {
    relatedPosts: ["how-rag-works", "viva-questions-rag-projects", "streamlit-final-year-ai-demos"],
    suggestedProjects: ["chat-with-youtube", "pdf-rag-chat", "speech-to-text-notes"],
  },
  "chat-with-data-viva-questions": {
    relatedPosts: ["three-patterns-for-ai-projects", "streamlit-final-year-ai-demos", "how-rag-works"],
    suggestedProjects: ["chat-with-data", "resume-jd-matcher", "pdf-rag-chat"],
  },
  "three-patterns-for-ai-projects": {
    relatedPosts: ["how-rag-works", "streamlit-final-year-ai-demos", "ai-vs-mern-final-year-project"],
    suggestedProjects: ["pdf-rag-chat", "chat-with-data", "resume-jd-matcher"],
  },
  "streamlit-final-year-ai-demos": {
    relatedPosts: ["three-patterns-for-ai-projects", "how-rag-works", "what-examiners-look-for-demo"],
    suggestedProjects: ["pdf-rag-chat", "fake-news-detection", "sentiment-analysis-dashboard"],
  },
  "resume-jd-matcher-explainable-scoring": {
    relatedPosts: ["three-patterns-for-ai-projects", "ai-vs-mern-final-year-project", "what-examiners-look-for-demo"],
    suggestedProjects: ["resume-jd-matcher", "job-portal", "chat-with-data"],
  },
  "ai-vs-mern-final-year-project": {
    relatedPosts: ["choosing-a-final-year-project", "three-patterns-for-ai-projects", "eight-chapter-report-structure"],
    suggestedProjects: ["pdf-rag-chat", "library-management-system", "mern-ecommerce"],
  },
  "choosing-a-final-year-project": {
    relatedPosts: ["ai-vs-mern-final-year-project", "same-project-differentiate", "academic-integrity-project-kits"],
    suggestedProjects: ["pdf-rag-chat", "library-management-system", "flutter-notes-app"],
  },
  "same-project-differentiate": {
    relatedPosts: ["academic-integrity-project-kits", "what-examiners-look-for-demo", "common-viva-mistakes-cs"],
    suggestedProjects: ["library-management-system", "pdf-rag-chat", "hotel-booking-system"],
  },
  "academic-integrity-project-kits": {
    relatedPosts: ["same-project-differentiate", "customize-kit-college-name", "choosing-a-final-year-project"],
    suggestedProjects: ["pdf-rag-chat", "library-management-system", "mern-ecommerce"],
  },
  "customize-kit-college-name": {
    relatedPosts: ["academic-integrity-project-kits", "eight-chapter-report-structure", "final-year-presentation-14-slides"],
    suggestedProjects: ["college-erp-system", "library-management-system", "college-faq-chatbot"],
  },
  "eight-chapter-report-structure": {
    relatedPosts: ["final-year-presentation-14-slides", "what-examiners-look-for-demo", "common-viva-mistakes-cs"],
    suggestedProjects: ["library-management-system", "pdf-rag-chat", "mern-ecommerce"],
  },
  "final-year-presentation-14-slides": {
    relatedPosts: ["eight-chapter-report-structure", "what-examiners-look-for-demo", "common-viva-mistakes-cs"],
    suggestedProjects: ["pdf-rag-chat", "hotel-booking-system", "mern-ecommerce"],
  },
  "what-examiners-look-for-demo": {
    relatedPosts: ["common-viva-mistakes-cs", "final-year-presentation-14-slides", "eight-chapter-report-structure"],
    suggestedProjects: ["pdf-rag-chat", "library-management-system", "resume-jd-matcher"],
  },
  "common-viva-mistakes-cs": {
    relatedPosts: ["what-examiners-look-for-demo", "viva-questions-rag-projects", "eight-chapter-report-structure"],
    suggestedProjects: ["pdf-rag-chat", "library-management-system", "mern-ecommerce"],
  },
  "mern-library-rbac-viva": {
    relatedPosts: ["vehicle-fleet-management-final-year", "hotel-booking-system-architecture", "eight-chapter-report-structure"],
    suggestedProjects: ["library-management-system", "hotel-booking-system", "vehicle-fleet-management-system"],
  },
  "hotel-booking-system-architecture": {
    relatedPosts: ["mern-library-rbac-viva", "restaurant-management-system-guide", "razorpay-mern-ecommerce-viva"],
    suggestedProjects: ["hotel-booking-system", "restaurant-management-system", "library-management-system"],
  },
  "restaurant-management-system-guide": {
    relatedPosts: ["hotel-booking-system-architecture", "mern-library-rbac-viva", "razorpay-mern-ecommerce-viva"],
    suggestedProjects: ["restaurant-management-system", "food-delivery-app", "hotel-booking-system"],
  },
  "vehicle-fleet-management-final-year": {
    relatedPosts: ["mern-library-rbac-viva", "hotel-booking-system-architecture", "eight-chapter-report-structure"],
    suggestedProjects: ["vehicle-fleet-management-system", "library-management-system", "inventory-management-system"],
  },
  "razorpay-mern-ecommerce-viva": {
    relatedPosts: ["ai-vs-mern-final-year-project", "restaurant-management-system-guide", "what-examiners-look-for-demo"],
    suggestedProjects: ["mern-ecommerce", "bookstore-ecommerce", "multi-vendor-marketplace"],
  },
  "jwt-auth-mern-final-year": {
    relatedPosts: ["mern-library-rbac-viva", "mongodb-schema-design-final-year", "ai-vs-mern-final-year-project"],
    suggestedProjects: ["library-management-system", "hotel-booking-system", "mern-ecommerce"],
  },
  "mongodb-schema-design-final-year": {
    relatedPosts: ["jwt-auth-mern-final-year", "mern-library-rbac-viva", "eight-chapter-report-structure"],
    suggestedProjects: ["library-management-system", "hospital-management-system", "job-portal"],
  },
  "flutter-vs-react-native-final-year": {
    relatedPosts: ["ai-vs-mern-final-year-project", "choosing-a-final-year-project", "what-examiners-look-for-demo"],
    suggestedProjects: ["flutter-notes-app", "react-native-fitness-app", "flutter-expense-tracker"],
  },
  "defending-face-recognition-attendance-viva": {
    relatedPosts: ["cnn-image-classification-viva", "common-viva-mistakes-cs", "what-examiners-look-for-demo"],
    suggestedProjects: ["face-recognition-attendance", "plant-disease-classification", "college-erp-system"],
  },
  "hospital-management-system-rbac": {
    relatedPosts: ["mern-library-rbac-viva", "jwt-auth-mern-final-year", "mongodb-schema-design-final-year"],
    suggestedProjects: ["hospital-management-system", "library-management-system", "gym-management-system"],
  },
  "job-portal-mern-architecture": {
    relatedPosts: ["resume-jd-matcher-explainable-scoring", "jwt-auth-mern-final-year", "mongodb-schema-design-final-year"],
    suggestedProjects: ["job-portal", "resume-jd-matcher", "mern-ecommerce"],
  },
  "cnn-image-classification-viva": {
    relatedPosts: ["defending-face-recognition-attendance-viva", "streamlit-final-year-ai-demos", "three-patterns-for-ai-projects"],
    suggestedProjects: ["plant-disease-classification", "traffic-sign-recognition", "face-recognition-attendance"],
  },
  "group-project-roles-final-year": {
    relatedPosts: ["same-project-differentiate", "academic-integrity-project-kits", "seed-data-demo-ready-viva"],
    suggestedProjects: ["library-management-system", "pdf-rag-chat", "mern-ecommerce"],
  },
  "plagiarism-check-project-report": {
    relatedPosts: ["academic-integrity-project-kits", "eight-chapter-report-structure", "customize-kit-college-name"],
    suggestedProjects: ["pdf-rag-chat", "library-management-system", "resume-jd-matcher"],
  },
  "seed-data-demo-ready-viva": {
    relatedPosts: ["what-examiners-look-for-demo", "common-viva-mistakes-cs", "group-project-roles-final-year"],
    suggestedProjects: ["library-management-system", "hotel-booking-system", "pdf-rag-chat"],
  },
};

const CATEGORY_DEFAULTS: Record<string, BlogRelations> = {
  Architecture: {
    relatedPosts: ["how-rag-works", "three-patterns-for-ai-projects", "hybrid-search-rag-explained"],
    suggestedProjects: ["pdf-rag-chat", "chat-with-data", "resume-jd-matcher"],
  },
  "Viva Prep": {
    relatedPosts: ["common-viva-mistakes-cs", "what-examiners-look-for-demo", "viva-questions-rag-projects"],
    suggestedProjects: ["pdf-rag-chat", "library-management-system", "mern-ecommerce"],
  },
  Guides: {
    relatedPosts: ["choosing-a-final-year-project", "eight-chapter-report-structure", "academic-integrity-project-kits"],
    suggestedProjects: ["pdf-rag-chat", "library-management-system", "flutter-notes-app"],
  },
};

function resolveSlugs(slugs: string[], current: string, limit: number): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of slugs) {
    if (!s || s === current || seen.has(s)) continue;
    seen.add(s);
    out.push(s);
    if (out.length >= limit) break;
  }
  return out;
}

export function getBlogRelations(slug: string): {
  relatedPosts: BlogPost[];
  suggestedProjects: Project[];
} {
  const post = getBlogPost(slug);
  const configured = blogRelations[slug];
  const fallback = post
    ? CATEGORY_DEFAULTS[post.category] ?? CATEGORY_DEFAULTS.Guides
    : CATEGORY_DEFAULTS.Guides;

  const postSlugs = resolveSlugs(
    [...(configured?.relatedPosts ?? []), ...(fallback.relatedPosts ?? [])],
    slug,
    3,
  );

  // If still short, fill from same category then any other post
  if (postSlugs.length < 2 && post) {
    for (const p of blogPosts) {
      if (p.slug === slug || postSlugs.includes(p.slug)) continue;
      if (p.category === post.category) postSlugs.push(p.slug);
      if (postSlugs.length >= 3) break;
    }
  }
  if (postSlugs.length < 2) {
    for (const p of blogPosts) {
      if (p.slug === slug || postSlugs.includes(p.slug)) continue;
      postSlugs.push(p.slug);
      if (postSlugs.length >= 3) break;
    }
  }

  const projectSlugs = resolveSlugs(
    [...(configured?.suggestedProjects ?? []), ...(fallback.suggestedProjects ?? [])],
    "",
    3,
  );

  return {
    relatedPosts: postSlugs
      .map((s) => getBlogPost(s))
      .filter((p): p is BlogPost => Boolean(p)),
    suggestedProjects: projectSlugs
      .map((s) => getProject(s))
      .filter((p): p is Project => Boolean(p)),
  };
}

// project-related.ts — curated "Guides for this kit" per project slug.
// Edit this file to manage blog links on /projects/[slug] without touching page.tsx.

import { getBlogPost, type BlogPost } from "@/lib/blog";

export type ProjectRelations = {
  /** Blog slugs shown under "Guides for this kit" (order preserved). */
  guides: string[];
};

/**
 * Per-project guide overrides. Missing slugs fall back to category defaults.
 * Keep 2–3 guides for a tight section.
 */
export const projectRelations: Record<string, ProjectRelations> = {
  "pdf-rag-chat": {
    guides: ["defending-chat-with-pdf-viva", "how-rag-works", "viva-questions-rag-projects"],
  },
  "chat-with-youtube": {
    guides: ["defending-chat-with-youtube-viva", "how-rag-works", "hybrid-search-rag-explained"],
  },
  "chat-with-data": {
    guides: ["chat-with-data-viva-questions", "three-patterns-for-ai-projects", "streamlit-final-year-ai-demos"],
  },
  "resume-jd-matcher": {
    guides: ["resume-jd-matcher-explainable-scoring", "three-patterns-for-ai-projects"],
  },
  "library-management-system": {
    guides: ["mern-library-rbac-viva", "same-project-differentiate"],
  },
  "hotel-booking-system": {
    guides: ["hotel-booking-system-architecture", "mern-library-rbac-viva"],
  },
  "restaurant-management-system": {
    guides: ["restaurant-management-system-guide", "hotel-booking-system-architecture"],
  },
  "vehicle-fleet-management-system": {
    guides: ["vehicle-fleet-management-final-year", "mern-library-rbac-viva"],
  },
  "mern-ecommerce": {
    guides: ["razorpay-mern-ecommerce-viva", "ai-vs-mern-final-year-project"],
  },
  "face-recognition-attendance": {
    guides: ["choosing-a-final-year-project", "what-examiners-look-for-demo"],
  },
  "college-faq-chatbot": {
    guides: ["how-rag-works", "viva-questions-rag-projects"],
  },
  "fake-news-detection": {
    guides: ["three-patterns-for-ai-projects", "streamlit-final-year-ai-demos"],
  },
  "plant-disease-classification": {
    guides: ["streamlit-final-year-ai-demos", "choosing-a-final-year-project"],
  },
  "sentiment-analysis-dashboard": {
    guides: ["streamlit-final-year-ai-demos", "three-patterns-for-ai-projects"],
  },
  "movie-recommendation-system": {
    guides: ["three-patterns-for-ai-projects", "streamlit-final-year-ai-demos"],
  },
  "speech-to-text-notes": {
    guides: ["streamlit-final-year-ai-demos", "choosing-a-final-year-project"],
  },
  "traffic-sign-recognition": {
    guides: ["streamlit-final-year-ai-demos", "faiss-vs-pinecone-student-projects"],
  },
  "hospital-management-system": {
    guides: ["mern-library-rbac-viva", "eight-chapter-report-structure"],
  },
  "online-examination-system": {
    guides: ["eight-chapter-report-structure", "what-examiners-look-for-demo"],
  },
  "inventory-management-system": {
    guides: ["mern-library-rbac-viva", "eight-chapter-report-structure"],
  },
  "job-portal": {
    guides: ["resume-jd-matcher-explainable-scoring", "eight-chapter-report-structure"],
  },
  "gym-management-system": {
    guides: ["eight-chapter-report-structure", "what-examiners-look-for-demo"],
  },
  "college-erp-system": {
    guides: ["eight-chapter-report-structure", "customize-kit-college-name"],
  },
  "multi-vendor-marketplace": {
    guides: ["razorpay-mern-ecommerce-viva", "ai-vs-mern-final-year-project"],
  },
  "food-delivery-app": {
    guides: ["razorpay-mern-ecommerce-viva", "restaurant-management-system-guide"],
  },
  "bookstore-ecommerce": {
    guides: ["razorpay-mern-ecommerce-viva", "ai-vs-mern-final-year-project"],
  },
  "fashion-boutique-store": {
    guides: ["razorpay-mern-ecommerce-viva"],
  },
  "pharmacy-ecommerce": {
    guides: ["razorpay-mern-ecommerce-viva"],
  },
  "flutter-notes-app": {
    guides: ["ai-vs-mern-final-year-project", "choosing-a-final-year-project"],
  },
  "flutter-expense-tracker": {
    guides: ["ai-vs-mern-final-year-project", "choosing-a-final-year-project"],
  },
  "flutter-doctor-appointment": {
    guides: ["ai-vs-mern-final-year-project", "what-examiners-look-for-demo"],
  },
  "flutter-recipe-app": {
    guides: ["ai-vs-mern-final-year-project", "choosing-a-final-year-project"],
  },
  "react-native-fitness-app": {
    guides: ["ai-vs-mern-final-year-project", "choosing-a-final-year-project"],
  },
  "react-native-chat-app": {
    guides: ["ai-vs-mern-final-year-project", "what-examiners-look-for-demo"],
  },
};

const CATEGORY_GUIDE_FALLBACK: Record<string, string[]> = {
  "ai-ml": ["how-rag-works", "streamlit-final-year-ai-demos", "choosing-a-final-year-project"],
  mern: ["eight-chapter-report-structure", "ai-vs-mern-final-year-project", "what-examiners-look-for-demo"],
  ecommerce: ["razorpay-mern-ecommerce-viva", "ai-vs-mern-final-year-project"],
  mobile: ["ai-vs-mern-final-year-project", "choosing-a-final-year-project"],
};

export function getProjectGuides(
  projectSlug: string,
  category: string,
  limit = 3,
): BlogPost[] {
  const configured = projectRelations[projectSlug]?.guides ?? [];
  const fallback = CATEGORY_GUIDE_FALLBACK[category] ?? [];
  const seen = new Set<string>();
  const slugs: string[] = [];

  for (const s of [...configured, ...fallback]) {
    if (!s || seen.has(s)) continue;
    seen.add(s);
    slugs.push(s);
    if (slugs.length >= limit) break;
  }

  return slugs
    .map((s) => getBlogPost(s))
    .filter((p): p is BlogPost => Boolean(p));
}

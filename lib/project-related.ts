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
    guides: [
      "defending-chat-with-pdf-viva",
      "top-10-streamlit-ai-demo-projects",
      "how-rag-works",
    ],
  },
  "chat-with-youtube": {
    guides: [
      "defending-chat-with-youtube-viva",
      "top-10-streamlit-ai-demo-projects",
      "how-rag-works",
    ],
  },
  "chat-with-data": {
    guides: [
      "chat-with-data-viva-questions",
      "top-10-streamlit-ai-demo-projects",
      "three-patterns-for-ai-projects",
    ],
  },
  "resume-jd-matcher": {
    guides: [
      "resume-jd-matcher-explainable-scoring",
      "top-10-streamlit-ai-demo-projects",
      "three-patterns-for-ai-projects",
    ],
  },
  "library-management-system": {
    guides: [
      "mern-library-rbac-viva",
      "top-10-rbac-admin-panel-mern-ideas",
      "jwt-auth-mern-final-year",
    ],
  },
  "hotel-booking-system": {
    guides: [
      "hotel-booking-system-architecture",
      "top-10-project-ideas-beyond-library-hotel",
      "mern-library-rbac-viva",
    ],
  },
  "restaurant-management-system": {
    guides: [
      "restaurant-management-system-guide",
      "top-10-project-ideas-beyond-library-hotel",
      "hotel-booking-system-architecture",
    ],
  },
  "vehicle-fleet-management-system": {
    guides: [
      "vehicle-fleet-management-final-year",
      "top-10-rbac-admin-panel-mern-ideas",
      "mern-library-rbac-viva",
    ],
  },
  "mern-ecommerce": {
    guides: ["razorpay-mern-ecommerce-viva", "ai-vs-mern-final-year-project"],
  },
  "face-recognition-attendance": {
    guides: [
      "defending-face-recognition-attendance-viva",
      "top-10-computer-vision-final-year-project-ideas",
      "top-10-offline-friendly-final-year-projects",
    ],
  },
  "college-faq-chatbot": {
    guides: ["how-rag-works", "viva-questions-rag-projects", "top-10-ai-ml-final-year-project-ideas-2026"],
  },
  "fake-news-detection": {
    guides: [
      "three-patterns-for-ai-projects",
      "top-10-diploma-aiml-project-ideas",
      "streamlit-final-year-ai-demos",
    ],
  },
  "plant-disease-classification": {
    guides: [
      "cnn-image-classification-viva",
      "top-10-computer-vision-final-year-project-ideas",
      "top-10-offline-friendly-final-year-projects",
    ],
  },
  "sentiment-analysis-dashboard": {
    guides: [
      "streamlit-final-year-ai-demos",
      "top-10-diploma-aiml-project-ideas",
      "top-10-final-year-projects-laptop-no-gpu",
    ],
  },
  "movie-recommendation-system": {
    guides: [
      "three-patterns-for-ai-projects",
      "top-10-final-year-projects-laptop-no-gpu",
      "streamlit-final-year-ai-demos",
    ],
  },
  "speech-to-text-notes": {
    guides: ["streamlit-final-year-ai-demos", "top-10-streamlit-ai-demo-projects", "choosing-a-final-year-project"],
  },
  "traffic-sign-recognition": {
    guides: [
      "cnn-image-classification-viva",
      "top-10-computer-vision-final-year-project-ideas",
      "streamlit-final-year-ai-demos",
    ],
  },
  "hospital-management-system": {
    guides: [
      "hospital-management-system-rbac",
      "top-10-rbac-admin-panel-mern-ideas",
      "jwt-auth-mern-final-year",
    ],
  },
  "online-examination-system": {
    guides: [
      "eight-chapter-report-structure",
      "top-10-rbac-admin-panel-mern-ideas",
      "what-examiners-look-for-demo",
    ],
  },
  "inventory-management-system": {
    guides: [
      "mern-library-rbac-viva",
      "top-10-final-year-projects-live-demo-csv-export",
      "eight-chapter-report-structure",
    ],
  },
  "job-portal": {
    guides: [
      "job-portal-mern-architecture",
      "top-10-mern-stack-project-ideas-cse",
      "jwt-auth-mern-final-year",
    ],
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
    guides: [
      "flutter-vs-react-native-final-year",
      "top-10-final-year-projects-laptop-no-gpu",
      "top-10-offline-friendly-final-year-projects",
    ],
  },
  "flutter-expense-tracker": {
    guides: ["flutter-vs-react-native-final-year", "ai-vs-mern-final-year-project", "choosing-a-final-year-project"],
  },
  "flutter-doctor-appointment": {
    guides: ["flutter-vs-react-native-final-year", "ai-vs-mern-final-year-project", "what-examiners-look-for-demo"],
  },
  "flutter-recipe-app": {
    guides: ["flutter-vs-react-native-final-year", "ai-vs-mern-final-year-project", "choosing-a-final-year-project"],
  },
  "react-native-fitness-app": {
    guides: ["flutter-vs-react-native-final-year", "ai-vs-mern-final-year-project", "choosing-a-final-year-project"],
  },
  "react-native-chat-app": {
    guides: ["flutter-vs-react-native-final-year", "ai-vs-mern-final-year-project", "what-examiners-look-for-demo"],
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

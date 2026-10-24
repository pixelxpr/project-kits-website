/** Google Ads destination configs — noindex landings matched to keyword intent. */

export const ADS_LANDING_FEATURED_SLUGS = [
  "pdf-rag-chat",
  "library-management-system",
  "hotel-booking-system",
  "chat-with-data",
  "plant-disease-classification",
  "job-portal",
] as const;

export const ADS_LANDING_PATH = "/ads/final-year-projects";

export type AdsDestination = {
  slug: string;
  path: string;
  /** Match this to the Google Ads keyword theme */
  keywordLabel: string;
  seoTitle: string;
  description: string;
  h1: string;
  intro: string;
  featuredSlugs: readonly string[];
  /** Indexable hub for “learn more” / SEO */
  organicHubPath: string;
  organicHubLabel: string;
};

export const adsDestinations: AdsDestination[] = [
  {
    slug: "computer-science",
    path: "/ads/computer-science",
    keywordLabel: "Computer Science final year projects",
    seoTitle: "Computer Science Final Year Projects — Code & Report",
    description:
      "CSE final year learning projects — runnable code, setup guides, and viva prep. Customize on your machine and follow your college integrity rules.",
    h1: "Computer Science final year projects you can run and defend",
    intro:
      "Built for CSE searches: RAG chatbots, MERN systems with RBAC, and payment-backed stores. Pick a project, run it locally, customize it, then use the docs as a scaffold — not a blind paste.",
    featuredSlugs: [
      "pdf-rag-chat",
      "library-management-system",
      "mern-ecommerce",
      "chat-with-data",
      "resume-jd-matcher",
      "face-recognition-attendance",
    ],
    organicHubPath: "/final-year-projects/computer-science",
    organicHubLabel: "Computer Science catalog",
  },
  {
    slug: "information-technology",
    path: "/ads/information-technology",
    keywordLabel: "IT final year projects",
    seoTitle: "IT Final Year Projects — Code & Report",
    description:
      "Information Technology final year projects — web workflows, AI demos, and full-stack apps with documentation you adapt for your college.",
    h1: "IT final year projects — clear workflows, real demos",
    intro:
      "IT panels like systems you can walk through: users, roles, data flow, and a working demo. These projects map to campus and business problems — bookings, catalogues, document chat — with setup help included.",
    featuredSlugs: [
      "library-management-system",
      "hotel-booking-system",
      "restaurant-management-system",
      "vehicle-fleet-management-system",
      "mern-ecommerce",
      "pdf-rag-chat",
    ],
    organicHubPath: "/final-year-projects/information-technology",
    organicHubLabel: "IT catalog",
  },
  {
    slug: "ai-ml",
    path: "/ads/ai-ml",
    keywordLabel: "AI ML final year projects",
    seoTitle: "AI ML Final Year Projects — Code & Report",
    description:
      "AI and ML final year learning projects — RAG, classifiers, and Streamlit demos with viva-oriented study materials.",
    h1: "AI & ML final year projects with demos you can explain",
    intro:
      "For students searching AI/ML project ideas: chat-with-PDF, spreadsheet analytics, resume matching, and classic CV demos. Focus on understanding retrieval, metrics, and failure cases — that is what viva panels probe.",
    featuredSlugs: [
      "pdf-rag-chat",
      "chat-with-youtube",
      "chat-with-data",
      "resume-jd-matcher",
      "face-recognition-attendance",
      "plant-disease-classification",
    ],
    organicHubPath: "/final-year-projects/ai-ml",
    organicHubLabel: "AI / ML catalog",
  },
];

export function getAdsDestination(slug: string): AdsDestination | undefined {
  return adsDestinations.find((d) => d.slug === slug);
}

// project-hubs.ts — SEO landing pages for catalog / degree / category hubs.
// Used by /final-year-projects and /bba-projects etc.

import { categories } from "@/lib/site";
import { projects, type Project } from "@/lib/projects";

export type HubCategoryId = "ai-ml" | "mern" | "ecommerce" | "mobile";

export type ProjectHub = {
  slug: string;
  path: string;
  /** Short nav/footer label */
  label: string;
  h1: string;
  seoTitle: string;
  description: string;
  intro: string;
  /** Optional filter — omit to show all projects */
  categoryId?: HubCategoryId;
  /** Prefer these projects at the top of the grid */
  featuredSlugs?: string[];
  ideas: string[];
};

export const categoryHubs: ProjectHub[] = [
  {
    slug: "ai-ml",
    path: "/final-year-projects/ai-ml",
    label: "AI / ML projects",
    h1: "AI & ML final year project ideas (with viva-ready projects)",
    seoTitle: "AI ML Final Year Projects — Ideas & Code",
    description:
      "Trending AI and ML final year project ideas for B.Tech, BCA, and MCA — RAG chatbots, classifiers, and Streamlit demos with report and viva prep.",
    intro:
      "Students searching for “trending AI final year projects” usually need more than a title list. Below are submission-ready AI/ML projects — RAG, text-to-code, explainable scoring, and classic CV/NLP demos — each with working code, an 8-chapter report, slides, and viva questions.",
    categoryId: "ai-ml",
    ideas: [
      "Chat with PDF / YouTube using RAG and citations",
      "Chat with spreadsheet data (text-to-pandas)",
      "Resume–JD matcher with explainable scores",
      "Fake news or sentiment dashboards",
      "Plant disease / traffic-sign CNN classifiers",
      "Face recognition attendance with an admin panel",
      "College FAQ chatbot over campus rules",
    ],
  },
  {
    slug: "mern",
    path: "/final-year-projects/mern",
    label: "MERN projects",
    h1: "MERN stack final year projects with RBAC and real workflows",
    seoTitle: "MERN Final Year Projects — Ideas & Code",
    description:
      "MERN final year project ideas for college submission — library, hotel, hospital, job portal, ERP and more with JWT, roles, and viva prep.",
    intro:
      "MERN projects win vivas when you can explain auth, roles, and domain rules — not when you only show CRUD screens. These projects are built around that bar: library loans, bookings, hospital appointments, exams, inventory, and campus ERP.",
    categoryId: "mern",
    ideas: [
      "Library management with RBAC and audit logs",
      "Hotel booking with server-side pricing",
      "Hospital management with doctor/patient roles",
      "Online examination with timers and auto-score",
      "Job portal for seekers and recruiters",
      "College ERP / student portal",
      "Gym, inventory, and fleet management systems",
    ],
  },
  {
    slug: "ecommerce",
    path: "/final-year-projects/ecommerce",
    label: "E-commerce projects",
    h1: "E-commerce final year projects with Razorpay checkout",
    seoTitle: "E-commerce Final Year Projects — Code & Report",
    description:
      "E-commerce final year projects — MERN stores, multi-vendor, food delivery, and pharmacy apps with payment verification, report, and viva prep.",
    intro:
      "E-commerce projects are popular for BBA and CS students alike. The viva differentiator is payment verification, cart integrity, and admin order flow — not a pretty product grid. Browse single-store and multi-vendor options below.",
    categoryId: "ecommerce",
    ideas: [
      "MERN store with Razorpay signature verification",
      "Multi-vendor marketplace with commissions",
      "Food delivery with restaurant partner roles",
      "Bookstore with reviews and wishlist",
      "Fashion boutique with size/color variants",
      "Pharmacy store with prescription upload flags",
    ],
  },
  {
    slug: "mobile",
    path: "/final-year-projects/mobile",
    label: "Mobile app projects",
    h1: "Flutter & React Native final year project ideas",
    seoTitle: "Mobile Final Year Projects — Flutter & RN",
    description:
      "Flutter and React Native final year projects — notes, expenses, fitness, recipes, chat, and appointments with code and viva prep.",
    intro:
      "Mobile projects work well when you want a device demo on exam day. Pick Flutter or React Native based on your course stack, then defend navigation, local/Firebase data, and one clear user journey. See also our Flutter vs React Native guide on the blog.",
    categoryId: "mobile",
    ideas: [
      "Flutter notes & tasks with reminders",
      "Flutter expense tracker with charts",
      "Flutter doctor appointment booking",
      "Flutter recipe finder with favorites",
      "React Native fitness tracker",
      "React Native one-to-one chat",
    ],
  },
  {
    slug: "computer-science",
    path: "/final-year-projects/computer-science",
    label: "Computer Science",
    h1: "Computer Science final year project ideas (2026)",
    seoTitle: "Computer Science Final Year Projects — Ideas & Code",
    description:
      "Computer Science final year projects for B.Tech CSE and BCA — AI/ML, MERN, e-commerce, and mobile with code, report, and viva prep.",
    intro:
      "Searching for computer science final year projects usually means you need a topic examiners recognize plus something you can demo and defend. Start with RAG chatbots, RBAC systems, or payment-backed stores — then open a project that already includes the academic pack.",
    featuredSlugs: [
      "pdf-rag-chat",
      "library-management-system",
      "mern-ecommerce",
      "chat-with-data",
      "resume-jd-matcher",
      "face-recognition-attendance",
      "hotel-booking-system",
      "chat-with-youtube",
    ],
    ideas: [
      "Chat with PDF / YouTube (RAG + citations)",
      "Library or hotel management with JWT RBAC",
      "MERN e-commerce with Razorpay verification",
      "Resume–JD matcher with explainable scores",
      "Face recognition attendance system",
      "Text-to-code analytics over Excel/CSV",
    ],
  },
  {
    slug: "information-technology",
    path: "/final-year-projects/information-technology",
    label: "Information Technology",
    h1: "IT final year project ideas for college submission",
    seoTitle: "IT Final Year Projects — Ideas & Code India",
    description:
      "IT final year projects for B.Tech IT, BCA, and MCA — web apps, AI demos, and full-stack systems with code, report, and viva prep.",
    intro:
      "IT final year projects score when the workflow is clear: users, roles, data flow, and a working demo. Prefer projects that map to campus or business problems — bookings, catalogues, chat-with-documents — and come with report chapters your guide already expects.",
    featuredSlugs: [
      "library-management-system",
      "hotel-booking-system",
      "restaurant-management-system",
      "vehicle-fleet-management-system",
      "mern-ecommerce",
      "pdf-rag-chat",
      "chat-with-data",
      "resume-jd-matcher",
    ],
    ideas: [
      "Domain MERN systems (library, hotel, fleet, restaurant)",
      "Document or spreadsheet AI assistants",
      "E-commerce / inventory style workflows",
      "Attendance or exam portals",
      "Job portal or college ERP",
    ],
  },
  {
    slug: "ieee-projects",
    path: "/final-year-projects/ieee-projects",
    label: "IEEE-style projects",
    h1: "IEEE-format friendly final year projects (with code & report)",
    seoTitle: "IEEE Final Year Projects with Code & Report",
    description:
      "IEEE-style final year projects — abstracts, architecture, testing, and references plus working code for AI/ML and full-stack submissions.",
    intro:
      "Many colleges ask for IEEE-like report structure (abstract, methodology, results, references) even when they do not require a published paper. These projects ship an 8-chapter Word report and slides aligned to the same codebase — so your documentation matches the demo, not a generic template.",
    featuredSlugs: [
      "pdf-rag-chat",
      "chat-with-youtube",
      "chat-with-data",
      "resume-jd-matcher",
      "face-recognition-attendance",
      "library-management-system",
      "mern-ecommerce",
      "vehicle-fleet-management-system",
    ],
    ideas: [
      "RAG systems with evaluation discussion",
      "CV attendance with accuracy limits documented",
      "Explainable matching / scoring pipelines",
      "Full-stack systems with RBAC and audit logs",
      "Clear abstract + architecture + test cases in the report",
    ],
  },
];

/** SEO track hubs (CSE / IT / IEEE) — shown separately from product category chips */
export function seoTrackHubs(): ProjectHub[] {
  return categoryHubs.filter((h) =>
    ["computer-science", "information-technology", "ieee-projects"].includes(h.slug),
  );
}

export const degreeHubs: ProjectHub[] = [
  {
    slug: "btech",
    path: "/btech-projects",
    label: "B.Tech projects",
    h1: "B.Tech final year project ideas with code, report & viva prep",
    seoTitle: "B.Tech Final Year Projects — Ideas & Code",
    description:
      "B.Tech final year project ideas for CSE/IT — AI/ML, MERN, e-commerce, and mobile projects with code, report, slides, and viva prep.",
    intro:
      "B.Tech panels expect architecture diagrams, test cases, and honest limitations. Use this catalog to pick a domain you can defend — then open a project for working code plus the academic pack. AI/ML and full-stack MERN options are listed first because they map cleanly to most CSE syllabi.",
    featuredSlugs: [
      "pdf-rag-chat",
      "library-management-system",
      "mern-ecommerce",
      "chat-with-data",
      "resume-jd-matcher",
      "hospital-management-system",
    ],
    ideas: [
      "RAG chatbot over PDFs or YouTube lectures",
      "MERN domain system with JWT and RBAC",
      "Razorpay e-commerce with server verification",
      "CNN image classification (plants / traffic signs)",
      "College ERP or online examination portal",
      "Flutter or React Native utility app",
    ],
  },
  {
    slug: "bca",
    path: "/bca-projects",
    label: "BCA projects",
    h1: "BCA project topics & final year projects",
    seoTitle: "BCA Projects — Topics & Code India",
    description:
      "BCA project topics for final year — web, MERN, AI demos, and mobile projects with reports and viva prep tailored for BCA colleges in India.",
    intro:
      "BCA students often need a project that is impressive in demo but still explainable without heavy theory. Prefer projects with a clear user journey (library, booking, chat-with-PDF) and a report structure your guide already expects. Browse everything below, with practical web and AI options highlighted.",
    featuredSlugs: [
      "library-management-system",
      "pdf-rag-chat",
      "hotel-booking-system",
      "mern-ecommerce",
      "flutter-notes-app",
      "college-faq-chatbot",
    ],
    ideas: [
      "Library / hotel / restaurant management (MERN)",
      "Chat with PDF for document Q&A",
      "E-commerce store with admin dashboard",
      "College FAQ chatbot",
      "Flutter notes or expense tracker",
      "Online examination or job portal",
    ],
  },
  {
    slug: "bba",
    path: "/bba-projects",
    label: "BBA projects",
    h1: "BBA project topics for final year (management + tech projects)",
    seoTitle: "BBA Project Topics — Final Year Projects",
    description:
      "BBA final year project topics — e-commerce, inventory, gym, hotel, and job portal systems with code and documentation for management + IT.",
    intro:
      "BBA project topics search volume is high because students need business-facing systems, not only algorithms. These projects emphasize workflows managers understand — inventory, bookings, storefronts, gym memberships — while still shipping real code your IT co-guide can inspect.",
    featuredSlugs: [
      "mern-ecommerce",
      "inventory-management-system",
      "hotel-booking-system",
      "gym-management-system",
      "job-portal",
      "food-delivery-app",
      "multi-vendor-marketplace",
      "bookstore-ecommerce",
    ],
    ideas: [
      "Online store or multi-vendor marketplace",
      "Inventory & warehouse management",
      "Hotel or restaurant operations system",
      "Gym membership and attendance",
      "Job portal for campus placements",
      "Food delivery platform demo",
    ],
  },
  {
    slug: "mca",
    path: "/mca-projects",
    label: "MCA projects",
    h1: "MCA final year project ideas with deeper technical scope",
    seoTitle: "MCA Final Year Projects — Ideas & Code",
    description:
      "MCA final year projects — advanced AI/ML and MERN systems with architecture depth, reports, and viva banks for postgraduate CS.",
    intro:
      "MCA viva panels push harder on design tradeoffs, security, and evaluation. Prefer projects where you can discuss hybrid search, RBAC matrices, payment signatures, or CNN metrics — then customize seed data and add one enhancement you can own in the report.",
    featuredSlugs: [
      "pdf-rag-chat",
      "chat-with-youtube",
      "chat-with-data",
      "resume-jd-matcher",
      "vehicle-fleet-management-system",
      "multi-vendor-marketplace",
      "face-recognition-attendance",
      "college-erp-system",
    ],
    ideas: [
      "Hybrid-search RAG over documents or video",
      "Text-to-code analytics over Excel data",
      "Explainable resume–JD matching",
      "Record-level RBAC (fleet / hospital)",
      "Multi-vendor marketplace commissions",
      "Face recognition attendance systems",
    ],
  },
];

export const mainCatalogHub: ProjectHub = {
  slug: "final-year-projects",
  path: "/final-year-projects",
  label: "All projects",
  h1: "Final year project ideas for college submission",
  seoTitle: "Final Year Projects — Ideas & Code India",
  description:
    "Browse final year project ideas for B.Tech, BCA, BBA, and MCA — AI/ML, MERN, e-commerce, and mobile projects with code, report, slides, and viva prep.",
  intro:
    "Looking for final year project ideas that you can actually submit and defend? This catalog lists working projects used by Indian college students — not title-only lists. Filter by domain below, or jump to degree pages for B.Tech, BCA, BBA, and MCA.",
  ideas: [
    "Pick a domain examiners recognize (RAG, RBAC, payments, CNN)",
    "Prefer projects with report + slides + viva bank included",
    "Customize college name, seed data, and one feature before viva",
    "Rehearse a 4-minute demo with edge cases, not only happy path",
  ],
};

export function getCategoryHub(slug: string): ProjectHub | undefined {
  return categoryHubs.find((h) => h.slug === slug);
}

export function getDegreeHub(slug: string): ProjectHub | undefined {
  return degreeHubs.find((h) => h.slug === slug);
}

export function projectsForHub(hub: ProjectHub): Project[] {
  let list = [...projects];
  if (hub.categoryId) {
    list = list.filter((p) => p.category === hub.categoryId);
  }
  if (hub.featuredSlugs?.length) {
    const rank = new Map(hub.featuredSlugs.map((s, i) => [s, i]));
    list.sort((a, b) => {
      const ra = rank.has(a.slug) ? (rank.get(a.slug) as number) : 1000;
      const rb = rank.has(b.slug) ? (rank.get(b.slug) as number) : 1000;
      if (ra !== rb) return ra - rb;
      return a.title.localeCompare(b.title);
    });
  }
  return list;
}

export function categoryNav() {
  return categories.map((c) => {
    const hub = categoryHubs.find((h) => h.slug === c.id);
    return {
      id: c.id,
      label: c.label,
      href: hub?.path ?? `/final-year-projects/${c.id}`,
      count: projects.filter((p) => p.category === c.id).length,
    };
  });
}

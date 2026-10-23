import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs, { JsonLd } from "@/components/Breadcrumbs";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { readyTopicProjects, topicPath, topicSeoTitle } from "@/lib/project-topics";
import { BOOKING_FEE_INR } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Final Year Project Topics — Ready Kits with Code & Report",
  description:
    "Browse final year project topics with submission-ready projects — source code, Word report, PPT, and viva prep for AI/ML, MERN, and more.",
  alternates: { canonical: "/project-topics" },
  openGraph: {
    type: "website",
    siteName: "FinalYearKit",
    url: "https://finalyearkit.com/project-topics",
    title: "Final Year Project Topics — Ready Kits",
    description:
      "Topic pages for submission-ready final year projects with code, report, and viva prep.",
    images: [{ url: "/og-image.jpg", width: 1280, height: 720, alt: "FinalYearKit" }],
  },
};

const CATEGORY_LABEL: Record<string, string> = {
  "ai-ml": "AI / ML",
  mern: "MERN",
  ecommerce: "E-commerce",
  mobile: "Mobile",
};

export default function ProjectTopicsIndexPage() {
  const list = readyTopicProjects();
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Final year projects", href: "/final-year-projects" },
    { name: "Project topics", href: "/project-topics" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8 py-16 sm:py-20">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} className="mb-8" />

      <header className="max-w-3xl mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">
          SEO topic pages
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-text leading-[1.25]">
          Final year project topics with ready projects
        </h1>
        <p className="text-text-muted mt-4 text-lg leading-relaxed">
          Each topic page covers the problem, stack, and viva angles for a project we actually ship —
          not a title-only list. Open a topic for the overview, then book the full kit from ₹
          {BOOKING_FEE_INR}.
        </p>
      </header>

      <ul className="space-y-3">
        {list.map((p) => (
          <li key={p.slug}>
            <Link
              href={topicPath(p.slug)}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 rounded-xl border border-border bg-paper-card px-4 py-3.5 hover:border-teal/40 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-teal shrink-0">
                {CATEGORY_LABEL[p.category] ?? p.category}
              </span>
              <span className="font-display font-semibold text-text">{topicSeoTitle(p)}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-text-muted">
        Prefer browsing by degree or domain?{" "}
        <Link href="/final-year-projects" className="text-teal hover:underline">
          Full project catalog
        </Link>
        .
      </p>
    </div>
  );
}

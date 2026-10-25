import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs, { JsonLd } from "@/components/Breadcrumbs";
import { breadcrumbJsonLd, webArticleJsonLd } from "@/lib/json-ld";
import { BASE_PRICE_INR, formatInr } from "@/lib/pricing";
import { site } from "@/lib/site";

const PAGE_TITLE = "GitHub Zip vs Final Year Project — Comparison";
const PAGE_DESC =
  "GitHub zips are free but often incomplete for submission. Compare runnable setup, matched report & slides, and viva prep you still earn yourself.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: "/github-vs-kit" },
  openGraph: {
    type: "article",
    siteName: "Final Year Projects",
    url: "https://finalyearkit.com/github-vs-kit",
    title: "GitHub Project vs Final Year Project",
    description:
      "Honest comparison: free GitHub projects vs submission-oriented learning projects with code, docs, and viva prep.",
    images: [{ url: "/og-image.jpg", width: 1280, height: 720, alt: "Final year projects" }],
  },
};

const ROWS: { feature: string; github: string; kit: string }[] = [
  {
    feature: "Cost",
    github: "Free (usually)",
    kit: `From ${formatInr(BASE_PRICE_INR)} · Instant download or few hours`,
  },
  {
    feature: "Runs on your laptop",
    github: "Hit-or-miss — missing env, broken deps, no README",
    kit: "Setup path documented; aimed at a first-run demo",
  },
  {
    feature: "Report & PPT",
    github: "Rarely matched to the code you cloned",
    kit: "8-chapter Word + slides aligned to the same repo",
  },
  {
    feature: "Viva prep",
    github: "You invent questions from scratch",
    kit: "Question bank from that architecture — you still rehearse",
  },
  {
    feature: "Academic integrity",
    github: "Easy to submit unread code (risky)",
    kit: "Positioned as a learning scaffold — customize & own it",
  },
  {
    feature: "Support",
    github: "Issues tab / none",
    kit: "WhatsApp help on setup until you can demo",
  },
];

export default function GithubVsKitPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "GitHub vs our projects", href: "/github-vs-kit" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-20">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={webArticleJsonLd({
          headline: PAGE_TITLE,
          description: PAGE_DESC,
          path: "/github-vs-kit",
          image: "/og-image.jpg",
          articleSection: "Comparison",
        })}
      />
      <Breadcrumbs items={crumbs} className="mb-8" />

      <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">Honest comparison</p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-text leading-[1.25]">
        GitHub zip vs a FinalYearKit project
      </h1>
      <p className="text-text-muted mt-4 text-lg leading-relaxed">
        Free repos are great for learning. They are often a poor fit the week before submission —
        broken setup, no report, and a viva you cannot defend. Here is a straight comparison so you
        can choose deliberately.
      </p>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm text-left min-w-[32rem]">
          <thead>
            <tr className="border-b border-border bg-paper-raised">
              <th className="font-mono text-[11px] uppercase tracking-wider text-text-faint px-4 py-3">
                Feature
              </th>
              <th className="font-mono text-[11px] uppercase tracking-wider text-text-faint px-4 py-3">
                Typical GitHub project
              </th>
              <th className="font-mono text-[11px] uppercase tracking-wider text-teal px-4 py-3">
                FinalYearKit
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.feature} className="border-b border-border last:border-0">
                <td className="px-4 py-3.5 font-display font-semibold text-text align-top">
                  {row.feature}
                </td>
                <td className="px-4 py-3.5 text-text-muted align-top leading-relaxed">
                  {row.github}
                </td>
                <td className="px-4 py-3.5 text-text-muted align-top leading-relaxed">{row.kit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-12 space-y-4 text-text-muted leading-relaxed">
        <h2 className="font-display text-xl font-bold text-text">When GitHub is enough</h2>
        <p>
          You have months left, enjoy debugging, and your college only needs a demo — not a matched
          report. Fork, break things, write your own documentation. That path builds real skill.
        </p>
        <h2 className="font-display text-xl font-bold text-text pt-4">When a project helps</h2>
        <p>
          Deadline pressure, you need a coherent code + report + slides story, and you still plan to
          customize seed data, branding, and at least one feature so the viva is yours. A packaged project is a
          scaffold — not a substitute for understanding.
        </p>
      </section>

      <div className="mt-10 rounded-xl border border-teal/25 bg-teal/5 p-5 sm:p-6">
        <p className="font-display font-semibold text-text text-sm sm:text-base">
          Academic integrity
        </p>
        <p className="text-sm text-text-muted mt-2 leading-relaxed">
          We do not take exams or write submissions for you. Read the{" "}
          <Link
            href="/blog/academic-integrity-project-kits"
            className="text-teal font-medium hover:underline"
          >
            integrity guide
          </Link>{" "}
          before you buy.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3 items-center">
        <Link
          href="/final-year-projects"
          className="inline-flex items-center rounded-lg btn-primary px-5 py-3 text-sm font-semibold"
        >
          Browse projects from {formatInr(BASE_PRICE_INR)}
        </Link>
        <Link
          href="/final-year-projects/computer-science"
          className="inline-flex items-center rounded-lg border border-border px-5 py-3 text-sm font-semibold text-text hover:border-teal/40 hover:text-teal transition-colors"
        >
          Computer Science projects
        </Link>
      </div>
    </div>
  );
}

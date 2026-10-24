import Link from "next/link";
import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import {
  ADS_LANDING_FEATURED_SLUGS,
  ADS_LANDING_PATH,
  adsDestinations,
} from "@/lib/ad-landing";
import { degreeHubs } from "@/lib/project-hubs";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const PAGE_TITLE = "Final Year Projects with Code & Report";
const PAGE_DESCRIPTION =
  "Runnable source code, setup guides, and viva prep for B.Tech, BCA, BBA & MCA students. Customize projects on your machine and follow your college academic integrity rules.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  robots: { index: false, follow: true },
  alternates: { canonical: `https://finalyearkit.com${ADS_LANDING_PATH}` },
  openGraph: {
    type: "website",
    siteName: "Final Year Projects",
    url: `https://finalyearkit.com${ADS_LANDING_PATH}`,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1280, height: 720, alt: "Final year projects" }],
  },
};

const STEPS = [
  {
    title: "Pick a topic you can explain",
    body: "Choose a project that matches your course — MERN, AI/ML, e-commerce, or mobile. Run it locally before you commit.",
  },
  {
    title: "Customize and test",
    body: "Change branding, seed data, and at least one feature. Break something on purpose and fix it — that is what vivas test.",
  },
  {
    title: "Use docs as a scaffold",
    body: "Report and slide templates follow a standard academic structure. Rewrite in your own words with your guide’s format and your test results.",
  },
];

const INCLUDES = [
  "Full source code with setup instructions",
  "Architecture you can draw in a viva",
  "Report & slide templates aligned to the codebase",
  "Viva question bank to rehearse — not to memorize blindly",
];

export default function AdsFinalYearKitsPage() {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const featured = ADS_LANDING_FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <div>
      <section className="border-b border-border bg-paper-raised">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-14 pb-12">
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-teal">
            For students
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-text mt-3 leading-[1.2]">
            Final year learning projects — code you run, customize, and defend
          </h1>
          <p className="text-text-muted mt-5 text-lg leading-relaxed">
            FinalYearKit is not an exam or assignment service. We ship runnable projects with setup
            help and study materials so you can learn the stack, demo it on your laptop, and prepare
            for your panel — following your institution&apos;s academic integrity policy.
          </p>

          <p className="mt-5 text-sm text-text-muted leading-relaxed">
            Learning projects — you run and customize the project for your college.{" "}
            <Link
              href="/blog/academic-integrity-project-kits"
              className="text-teal font-medium hover:underline"
            >
              How we expect you to use a project
            </Link>
            .
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#featured-kits"
              className="inline-flex items-center rounded-lg btn-primary px-6 py-3 text-sm font-semibold"
            >
              Browse example projects
            </a>
            <Link
              href="/final-year-projects"
              className="inline-flex items-center rounded-lg border border-border bg-paper-card px-6 py-3 text-sm font-semibold text-text hover:border-teal/40 hover:text-teal transition-colors"
            >
              Full catalog
            </Link>
            <Link
              href="/github-vs-kit"
              className="inline-flex items-center rounded-lg border border-border bg-paper-card px-6 py-3 text-sm font-semibold text-text hover:border-teal/40 hover:text-teal transition-colors"
            >
              GitHub zip vs our projects
            </Link>
          </div>
          <p className="font-mono text-xs text-text-faint mt-4">
            Book any project from ₹49 · Full packages from ₹2,499 · Viva prep on Complete
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
        <FadeIn>
          <h2 className="font-display text-xl font-bold text-text">How students use a project</h2>
        </FadeIn>
        <StaggerGroup className="mt-8 space-y-6">
          {STEPS.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="flex gap-4">
                <span className="font-mono text-sm text-teal shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display font-semibold text-text">{step.title}</h3>
                  <p className="text-sm text-text-muted mt-1 leading-relaxed">{step.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="border-y border-border bg-paper-raised">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
          <h2 className="font-display text-xl font-bold text-text">What&apos;s included</h2>
          <ul className="mt-6 space-y-3">
            {INCLUDES.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-text-muted leading-relaxed">
                <span className="text-teal shrink-0" aria-hidden>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-text-muted mt-6">
            Compare tiers on the{" "}
            <Link href="/#pricing" className="text-teal font-medium hover:underline">
              pricing section
            </Link>{" "}
            or read{" "}
            <Link href="/blog/choosing-a-final-year-project" className="text-teal font-medium hover:underline">
              how to choose a project
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="featured-kits" className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-2xl font-bold text-text">Popular projects</h2>
          <p className="text-text-muted mt-3 leading-relaxed">
            Sample topics students explore — each with working code and documentation you adapt for
            your college.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <p className="text-sm text-text-muted mt-10 text-center">
          <Link href="/final-year-projects" className="text-teal font-medium hover:underline">
            View full catalog
          </Link>
          {" · "}
          <Link href="/github-vs-kit" className="text-teal font-medium hover:underline">
            GitHub vs our projects
          </Link>
        </p>
      </section>

      <section className="border-t border-border bg-paper-raised">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
          <h2 className="font-display text-xl font-bold text-text">Match your search</h2>
          <p className="text-sm text-text-muted mt-2 leading-relaxed">
            Use these Ads destinations when the keyword is CSE, IT, or AI/ML — same integrity rules,
            tighter project shortlists.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {adsDestinations.map((d) => (
              <Link
                key={d.slug}
                href={d.path}
                className="font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg border border-border text-text-muted hover:border-teal/40 hover:text-teal transition-colors"
              >
                {d.keywordLabel}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
          <h2 className="font-display text-xl font-bold text-text">By degree</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {degreeHubs.map((h) => (
              <Link
                key={h.slug}
                href={h.path}
                className="font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg border border-border text-text-muted hover:border-teal/40 hover:text-teal transition-colors"
              >
                {h.label}
              </Link>
            ))}
          </div>
          <div className="mt-12 rounded-xl border border-border bg-paper-card p-6 sm:p-8 text-center">
            <p className="text-text-muted text-sm leading-relaxed max-w-md mx-auto">
              Open a project you like and book it from ₹49 — we follow up on WhatsApp about setup,
              tier, and syllabus fit.
            </p>
            <div className="mt-5 flex justify-center">
              <a
                href="#featured-kits"
                className="inline-flex items-center justify-center rounded-xl btn-primary px-5 py-3 font-mono text-sm font-medium"
              >
                See example projects
              </a>
            </div>
            <p className="font-mono text-[10px] text-text-faint mt-4">
              {site.brandName} · {site.email}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import WhatsAppInlineCta from "@/components/WhatsAppInlineCta";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ADS_LANDING_FEATURED_SLUGS, ADS_LANDING_PATH } from "@/lib/ad-landing";
import { categoryHubs, degreeHubs } from "@/lib/project-hubs";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { whatsappMessages } from "@/lib/whatsapp-messages";

const PAGE_TITLE = "Final Year Project Learning Kits | FinalYearKit";
const PAGE_DESCRIPTION =
  "Runnable source code, setup guides, and viva prep for B.Tech, BCA, BBA & MCA students. Customize projects on your machine and follow your college academic integrity rules.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: { canonical: `https://finalyearkit.com${ADS_LANDING_PATH}` },
  openGraph: {
    type: "website",
    siteName: "FinalYearKit",
    url: `https://finalyearkit.com${ADS_LANDING_PATH}`,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1280, height: 720, alt: "FinalYearKit" }],
  },
};

const STEPS = [
  {
    title: "Pick a topic you can explain",
    body: "Choose a kit that matches your course — MERN, AI/ML, e-commerce, or mobile. Run it locally before you commit.",
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

export default function AdsFinalYearProjectsPage() {
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
            Final year project learning kits — code you run, customize, and defend
          </h1>
          <p className="text-text-muted mt-5 text-lg leading-relaxed">
            FinalYearKit is not an exam or assignment service. We ship runnable projects with setup
            help and study materials so you can learn the stack, demo it on your laptop, and prepare
            for your panel — following your institution&apos;s academic integrity policy.
          </p>

          <div className="mt-8 rounded-xl border border-teal/25 bg-teal/5 p-5 sm:p-6">
            <p className="font-display font-semibold text-text text-sm sm:text-base">
              Academic integrity
            </p>
            <p className="text-sm text-text-muted mt-2 leading-relaxed">
              You are responsible for how you use any kit. Customize the work, understand the code,
              and check your department rules before submission. Read our{" "}
              <Link
                href="/blog/academic-integrity-project-kits"
                className="text-teal font-medium hover:underline"
              >
                academic integrity guide
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-teal font-medium hover:underline">
                terms
              </Link>
              .
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#featured-kits"
              className="inline-flex items-center rounded-lg btn-primary px-6 py-3 text-sm font-semibold"
            >
              Browse example kits
            </a>
            <WhatsAppInlineCta
              message={whatsappMessages.adsLanding}
              label="Ask on WhatsApp"
            />
          </div>
          <p className="font-mono text-xs text-text-faint mt-4">
            From ₹1,499 · Setup support · Viva prep included on Complete tier
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
        <FadeIn>
          <h2 className="font-display text-xl font-bold text-text">How students use a kit</h2>
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
          <h2 className="font-display text-xl font-bold text-text">What&apos;s in a kit</h2>
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
          <h2 className="font-display text-2xl font-bold text-text">Popular learning kits</h2>
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
          {categoryHubs.map((h, i) => (
            <span key={h.slug}>
              <Link href={h.path} className="text-teal font-medium hover:underline">
                {h.label}
              </Link>
              {i < categoryHubs.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
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
              Questions about Mac or Windows setup, tier choice, or which topic fits your syllabus?
            </p>
            <div className="mt-5 flex justify-center">
              <WhatsAppInlineCta message={whatsappMessages.adsLanding} full />
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

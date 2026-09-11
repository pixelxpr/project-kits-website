import Link from "next/link";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import WhatsAppInlineCta from "@/components/WhatsAppInlineCta";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata = {
  title: "About — Final Year Project Kits | FinalYearKit",
  description:
    "How FinalYearKit builds submission-ready project kits: working code, matching reports, and viva prep you can actually defend.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    siteName: "FinalYearKit",
    url: "https://finalyearkit.com/about",
    title: "About — Final Year Project Kits | FinalYearKit",
    description:
      "How FinalYearKit builds submission-ready project kits: working code, matching reports, and viva prep you can actually defend.",
    images: [{ url: "/og-image.jpg", width: 1280, height: 720, alt: "FinalYearKit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Final Year Project Kits | FinalYearKit",
    description:
      "How FinalYearKit builds submission-ready project kits: working code, matching reports, and viva prep you can actually defend.",
    images: ["/og-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-5 sm:px-8 pt-16 pb-14">
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-teal">About</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-text mt-3 leading-[1.25]">
          Built by an engineer who ships the whole kit — not just the zip file.
        </h1>

        <FadeIn delay={0.1} className="mt-10 space-y-6 text-text-muted leading-relaxed">
          <p>
            I&apos;m a software engineer who builds these project kits end to end: the code, the
            report, the presentation, and the viva question bank. Every project on this site is one
            I&apos;ve personally built, tested, and documented. Nothing here is outsourced or resold.
          </p>
          <p>
            That matters because documentation has to match the architecture you&apos;re submitting —
            not a generic template with your name swapped in.
          </p>
        </FadeIn>

        <StaggerGroup className="mt-12 grid sm:grid-cols-3 gap-5">
          {site.trustPoints.map((t, i) => (
            <StaggerItem key={t.stat}>
              <div className="rounded-xl border border-border bg-paper-card p-5">
                <span className="font-mono text-xs text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-xl font-bold text-text mt-2 leading-[1.25]">
                  {t.stat}
                </p>
                <p className="text-sm text-text-muted mt-2 leading-relaxed">{t.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="border-y border-border bg-paper-raised">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
          <FadeIn>
            <h2 className="font-display text-xl font-bold text-text mb-6">
              Every kit passes the same bar before it&apos;s listed
            </h2>
          </FadeIn>
          <StaggerGroup className="space-y-5">
            <StaggerItem>
              <ChecklistItem
                title="Working code, tested end to end"
                desc="Test cases are documented in the report — you can see what was verified before you buy."
              />
            </StaggerItem>
            <StaggerItem>
              <ChecklistItem
                title="Documentation that matches the code"
                desc="The report and slide deck describe the exact architecture in the codebase."
              />
            </StaggerItem>
            <StaggerItem>
              <ChecklistItem
                title="A viva question bank built for it"
                desc="Questions specific to the design decisions in that project — so you can defend it."
              />
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
        <FadeIn>
          <h2 className="font-display text-xl font-bold text-text mb-2">What&apos;s actually in a kit</h2>
          <p className="text-text-muted mb-6">
            Using {projects[0].title} as an example — every project follows the same structure.
          </p>
        </FadeIn>
        <StaggerGroup className="space-y-2.5">
          {projects[0].whatIncluded.map((item) => (
            <StaggerItem key={item}>
              <div className="flex items-start gap-2.5 text-text-muted">
                <span className="text-success font-mono mt-0.5">{"\u2713"}</span>
                <span>{item}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="bg-paper-raised border-t border-border">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16">
          <p className="font-display text-xl font-bold text-text mb-3">Still unsure?</p>
          <p className="text-text-muted leading-relaxed max-w-xl">
            Message us before paying — ask to see the report or a screen recording of the demo for
            the project you&apos;re considering. That&apos;s a completely reasonable ask.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-8 py-20">
        <FadeIn>
          <h2 className="font-display text-2xl font-bold text-text text-center">Where to next</h2>
        </FadeIn>
        <StaggerGroup className="grid sm:grid-cols-3 gap-5 mt-10">
          <StaggerItem>
            <Link
              href="/#projects"
              className="group flex flex-col items-center text-center rounded-xl border border-border bg-paper-card p-8 h-full hover:border-teal/40 transition-colors"
            >
              <p className="font-display font-semibold text-text group-hover:text-teal transition-colors">
                Browse available projects
              </p>
              <p className="text-sm text-text-muted mt-2">
                See demos, screenshots, and pricing for every kit.
              </p>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link
              href="/blog"
              className="group flex flex-col items-center text-center rounded-xl border border-border bg-paper-card p-8 h-full hover:border-teal/40 transition-colors"
            >
              <p className="font-display font-semibold text-text group-hover:text-teal transition-colors">
                Read the blog
              </p>
              <p className="text-sm text-text-muted mt-2">
                Architecture explainers, viva prep, and project-picking guides.
              </p>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-col items-center text-center rounded-xl border border-border bg-paper-card p-8 h-full">
              <p className="font-display font-semibold text-text">Still have questions?</p>
              <p className="text-sm text-text-muted mt-2 mb-5">
                Ask us directly before you buy.
              </p>
              <WhatsAppInlineCta message="Hi! I read your About page and had a question before buying." />
            </div>
          </StaggerItem>
        </StaggerGroup>
      </section>
    </div>
  );
}

function ChecklistItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-success font-mono text-lg mt-0.5 shrink-0">{"\u2713"}</span>
      <div>
        <p className="font-medium text-text">{title}</p>
        <p className="text-sm text-text-muted mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { projects } from "@/lib/projects";
import StampBadge from "@/components/StampBadge";
import WhatsAppInlineCta from "@/components/WhatsAppInlineCta";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata = {
  title: "About & Trust — Final Year Project Kits | FinalYearKit",
  description: "Why you can trust a project kit you found on Instagram. Learn about our transparent process, what is included in every kit, and how we guarantee it works.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    url: "https://finalyearkit.com/about",
    title: "About & Trust — Final Year Project Kits | FinalYearKit",
    description: "Why you can trust a project kit you found on Instagram. Learn about our transparent process, what is included in every kit, and how we guarantee it works.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FinalYearKit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About & Trust — Final Year Project Kits | FinalYearKit",
    description: "Why you can trust a project kit you found on Instagram. Learn about our transparent process, what is included in every kit, and how we guarantee it works.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-5 sm:px-8 pt-16 pb-14">
        <FadeIn>
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-cyan">
            Why trust this
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-text mt-3 leading-tight">
            You&apos;re about to send money to someone you found on Instagram.
            <br />
            Here&apos;s why that&apos;s reasonable.
          </h1>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10 space-y-6 text-text-muted leading-relaxed">
          <p>
            I&apos;m a software engineer who builds these project kits myself, end to
            end &mdash; the code, the report, the presentation, and the viva
            question bank. Every project on this site is one I&apos;ve personally
            built, tested, and used to write the documentation for. Nothing here
            is outsourced or resold.
          </p>
          <p>
            That matters because it means every kit comes with real, working
            code and documentation that matches it exactly &mdash; not a generic
            template with your name swapped in.
          </p>
        </FadeIn>

        <StaggerGroup className="mt-12 grid sm:grid-cols-3 gap-5">
          <StaggerItem>
            <div className="rounded-xl glass p-5">
              <p className="font-display text-2xl font-bold text-gradient">Every</p>
              <p className="text-sm text-text-muted mt-1">kit ships with full code, report, deck &amp; viva bank</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="rounded-xl glass p-5">
              <p className="font-display text-2xl font-bold text-gradient">10/10</p>
              <p className="text-sm text-text-muted mt-1">test cases passed on every project, documented in the report</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="rounded-xl glass p-5">
              <p className="font-display text-2xl font-bold text-gradient">100%</p>
              <p className="text-sm text-text-muted mt-1">customized to your name, college, and department</p>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </section>

      <section className="border-y border-border bg-void-raised">
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
                desc="Every project's test cases are documented in its report — you can see exactly what was tested before you buy."
              />
            </StaggerItem>
            <StaggerItem>
              <ChecklistItem
                title="Documentation that matches the code"
                desc="The report and slide deck are generated to describe the exact architecture in the codebase, not a generic template."
              />
            </StaggerItem>
            <StaggerItem>
              <ChecklistItem
                title="A viva question bank built for it"
                desc="Not generic interview questions — questions specific to the design decisions in that exact project, so you can actually defend it."
              />
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
        <FadeIn>
          <h2 className="font-display text-xl font-bold text-text mb-2">What&apos;s actually in a kit</h2>
          <p className="text-text-muted mb-6">
            Using {projects[0].title} as an example &mdash; every project follows the same structure.
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

      <section className="bg-void-raised border-t border-border">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16 flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <StampBadge text="STILL UNSURE?" className="w-32 h-32 shrink-0" />
          <p className="text-text-muted leading-relaxed">
            Message us before paying &mdash; ask to see the actual report or
            a screen recording of the demo for the project you&apos;re
            considering. That&apos;s a completely reasonable ask.
          </p>
        </div>
      </section>

      {/* Where to next */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 py-20">
        <FadeIn>
          <h2 className="font-display text-2xl font-bold text-text text-center">Where to next</h2>
        </FadeIn>
        <StaggerGroup className="grid sm:grid-cols-3 gap-5 mt-10">
          <StaggerItem>
            <Link
              href="/#projects"
              className="group flex flex-col items-center text-center rounded-xl glass p-8 h-full hover:border-cyan/40 hover:glow-cyan transition-[border-color,box-shadow] duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-void-card border border-border flex items-center justify-center text-cyan mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-display font-semibold text-text group-hover:text-cyan transition-colors">
                Browse available projects
              </p>
              <p className="text-sm text-text-muted mt-2">See working demos, screenshots, and pricing for every kit.</p>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link
              href="/blog"
              className="group flex flex-col items-center text-center rounded-xl glass p-8 h-full hover:border-cyan/40 hover:glow-cyan transition-[border-color,box-shadow] duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-void-card border border-border flex items-center justify-center text-cyan mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-display font-semibold text-text group-hover:text-cyan transition-colors">
                Read the blog
              </p>
              <p className="text-sm text-text-muted mt-2">Architecture explainers, viva prep, and project-picking guides.</p>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-col items-center text-center rounded-xl glass p-8 h-full">
              <div className="h-12 w-12 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39c1.44.79 3.06 1.2 4.72 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.93 6.44 17.5 2 12.04 2zm5.83 14.02c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.13 1.01-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.23 1.38.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.87.27.13.44.19.51.3.07.11.07.63-.17 1.32z" />
                </svg>
              </div>
              <p className="font-display font-semibold text-text">Still have questions?</p>
              <p className="text-sm text-text-muted mt-2 mb-5">Ask us directly before you buy &mdash; that&apos;s what we&apos;re here for.</p>
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

"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import { BASE_PRICE_INR, formatInr } from "@/lib/pricing";
import { FREE_PROJECT_SLUGS } from "@/lib/free-projects";
import HeroProjectProof from "@/components/sections/HeroProjectProof";

/** Real covers first — credibility in the first viewport. */
const HERO_PROOF_SLUGS = [
  "face-recognition-attendance",
  "pdf-rag-chat",
  "library-management-system",
  "hotel-booking-system",
  "mern-ecommerce",
  "chat-with-data",
] as const;

export default function Hero() {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const proofProjects = HERO_PROOF_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (p): p is (typeof projects)[number] => Boolean(p),
  );

  return (
    <section className="relative overflow-hidden border-b border-border min-h-[70vh] sm:min-h-[78vh] flex flex-col justify-center">
      <div
        aria-hidden
        className="absolute inset-0 bg-paper-grain"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_85%_20%,rgba(13,115,119,0.12),transparent_55%),radial-gradient(ellipse_50%_40%_at_10%_90%,rgba(11,31,58,0.06),transparent_50%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-12 sm:pt-20 sm:pb-16 w-full">
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-14 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-text leading-[1.15]"
            >
              Final<span className="text-teal">Year</span>Kit
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-display text-xl sm:text-3xl font-bold text-text mt-5 max-w-xl leading-[1.3]"
            >
              Submission-ready final year projects — not just source code.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-text-muted mt-4 text-base sm:text-lg leading-relaxed max-w-lg"
            >
              Working app, 8-chapter report, and slides — for B.Tech, BCA, BBA &amp; MCA.
              Optional add-ons for viva, customize, and install help.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="/final-year-projects"
                className="inline-flex items-center rounded-lg btn-primary px-6 py-3 text-sm font-semibold"
              >
                Browse projects
              </a>
              <a
                href="/#pricing"
                className="inline-flex items-center rounded-lg border border-border bg-paper-card/90 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-text hover:border-teal/40 hover:text-teal transition-colors"
              >
                See pricing
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.36 }}
              className="mt-5 font-mono text-xs text-text-faint leading-relaxed"
            >
              {projects.length} projects · B.Tech / BCA / BBA / MCA · From{" "}
              {formatInr(BASE_PRICE_INR)} · {FREE_PROJECT_SLUGS.length} free downloads
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.44 }}
              className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2"
            >
              {[
                { label: "B.Tech", href: "/btech-projects" },
                { label: "BCA", href: "/bca-projects" },
                { label: "BBA", href: "/bba-projects" },
                { label: "MCA", href: "/mca-projects" },
              ].map((d) => (
                <a
                  key={d.href}
                  href={d.href}
                  className="text-xs font-medium text-text-muted underline decoration-border underline-offset-4 hover:text-teal hover:decoration-teal transition-colors"
                >
                  {d.label}
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="w-full"
          >
            <HeroProjectProof projects={proofProjects} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

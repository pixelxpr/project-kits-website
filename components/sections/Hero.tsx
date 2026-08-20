"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ChatMockup from "@/components/ChatMockup";
import StampBadge from "@/components/StampBadge";
import SciFiBackground from "@/components/SciFiBackground";
import type { Project } from "@/lib/projects";

export default function Hero({ heroProject }: { heroProject: Project }) {
  return (
    <section className="relative overflow-hidden">
      <SciFiBackground />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-20 sm:pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-cyan flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
              Final year &amp; college project kits — B.Tech · BCA · BBA · MCA
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-6xl font-bold text-text mt-4 leading-[1.05]"
            >
              Working projects.
              <br />
              <span className="text-gradient">Not just source code.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-muted mt-6 text-lg leading-relaxed max-w-md"
            >
              Every final year project kit includes the full working app, an
              8-chapter submission report, a presentation deck, and a viva
              question bank built for the exact code you&apos;re submitting
              &mdash; for B.Tech, BCA, BBA, MCA, and engineering students.
              Not a generic template with your name swapped in.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-text-faint mt-3 text-sm leading-relaxed max-w-md"
            >
              Ask to see a real demo before you pay a single rupee — that&apos;s
              a completely reasonable thing to ask, and we expect it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/#projects"
                className="inline-flex items-center rounded-full bg-cyan text-void px-6 py-3 font-mono text-sm font-semibold hover:brightness-110 transition-all glow-cyan"
              >
                Browse project kits
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center text-sm font-medium text-text-muted hover:text-text transition-colors"
              >
                Why trust this? &rarr;
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="animate-float">
              <ChatMockup {...heroProject.demoExchange} />
            </div>
            <StampBadge className="absolute -top-6 -right-4 sm:-right-8 w-28 h-28 sm:w-32 sm:h-32" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import WhatsAppLink from "@/components/WhatsAppLink";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border min-h-[78vh] flex flex-col justify-end">
      <div className="absolute inset-0">
        <Image
          src="/hero-kit-package.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/85 to-paper/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/70 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-14 sm:pb-16 w-full">
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
          Submission-ready project kits — not just source code.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-text-muted mt-4 text-base sm:text-lg leading-relaxed max-w-lg"
        >
          Working app, 8-chapter report, slides, and viva prep — for B.Tech,
          BCA, BBA &amp; MCA.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <WhatsAppLink
            placement="hero"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] hover:brightness-110 text-white px-6 py-3 text-sm font-semibold transition-all"
          >
            Ask on WhatsApp
          </WhatsAppLink>
          <a
            href="/final-year-projects"
            className="inline-flex items-center rounded-lg border border-border bg-paper-card/90 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-text hover:border-teal/40 hover:text-teal transition-colors"
          >
            Browse kits
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.36 }}
          className="mt-5 font-mono text-xs text-text-faint"
        >
          From ₹1,499 · Delivered in hours · Report + viva included
        </motion.p>
      </div>
    </section>
  );
}

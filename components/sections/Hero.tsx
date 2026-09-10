"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

const WA_URL = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border min-h-[88vh] flex flex-col justify-end">
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

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-24 pb-20 sm:pb-28 w-full">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-text"
        >
          Final<span className="text-teal">Year</span>Kit
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="font-display text-xl sm:text-3xl font-bold text-text mt-5 max-w-xl leading-snug"
        >
          Submission-ready project kits — not just source code.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-text-muted mt-4 text-lg leading-relaxed max-w-lg"
        >
          Working app, 8-chapter report, presentation deck, and viva prep —
          customized for B.Tech, BCA, BBA &amp; MCA students.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="/#projects"
            className="inline-flex items-center rounded-lg btn-primary px-6 py-3 text-sm"
          >
            Browse project kits
          </a>
          <Link
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-border bg-paper-card/90 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-text hover:border-teal/40 hover:text-teal transition-colors"
          >
            Ask on WhatsApp
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

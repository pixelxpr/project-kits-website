"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";
import FadeIn from "@/components/motion/FadeIn";

export default function CtaBanner() {
  const text = encodeURIComponent(site.whatsappDefaultMessage);
  const href = `https://wa.me/${site.whatsappNumber}?text=${text}`;

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24" id="contact">
      <FadeIn>
        <div className="relative rounded-2xl glass glow-cyan overflow-hidden px-8 py-16 sm:py-20 text-center">
          <motion.div
            className="absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-cyan/20 blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text max-w-2xl mx-auto leading-tight">
              Still deciding? <span className="text-gradient">Ask before you buy.</span>
            </h2>
            <p className="text-text-muted mt-4 max-w-md mx-auto">
              Message us for a real demo of any project before you send a single rupee.
            </p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-8 rounded-full bg-cyan text-void px-7 py-3.5 font-mono text-sm font-semibold hover:brightness-110 transition-all"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

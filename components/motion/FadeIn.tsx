"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll reveal that never paints opacity:0 in the SSR HTML.
 * Ahrefs/Google treat opacity:0 ancestors as hiding H1s and link text.
 * We only translate on the Y axis so content stays fully opaque for crawlers.
 */
export default function FadeIn({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { y }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`overflow-visible ${className}`.trim()}
      style={{ overflow: "visible" }}
    >
      {children}
    </motion.div>
  );
}

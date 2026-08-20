"use client";

import { motion } from "framer-motion";

export default function StampBadge({
  text = "10 / 10 TESTED",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -30, opacity: 0 }}
      animate={{ scale: 1, rotate: -10, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 150, damping: 12 }}
      className={`select-none inline-flex items-center justify-center rounded-full border-[3px] border-cyan text-cyan font-mono font-bold uppercase tracking-wider px-4 py-3 text-center leading-tight glow-cyan bg-void-raised/80 backdrop-blur-sm ${className}`}
    >
      {text}
    </motion.div>
  );
}

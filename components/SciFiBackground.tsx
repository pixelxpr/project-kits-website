"use client";

import { motion } from "framer-motion";

export default function SciFiBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" />

      <motion.div
        className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-cyan/25 blur-[110px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-10 right-[-100px] h-[380px] w-[380px] rounded-full bg-violet/25 blur-[110px]"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-120px] left-1/3 h-[340px] w-[340px] rounded-full bg-magenta/15 blur-[110px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scanline sweep */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

export default function WhatsAppButton({ message }: { message?: string }) {
  const text = encodeURIComponent(message ?? site.whatsappDefaultMessage);
  const href = `https://wa.me/${site.whatsappNumber}?text=${text}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.05 }}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-void pl-4 pr-5 py-3 shadow-lg shadow-black/30 font-mono text-sm font-medium"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39c1.44.79 3.06 1.2 4.72 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.93 6.44 17.5 2 12.04 2zm5.83 14.02c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.13 1.01-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.23 1.38.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.87.27.13.44.19.51.3.07.11.07.63-.17 1.32z" />
      </svg>
      Message us
    </motion.a>
  );
}

"use client";

import WhatsAppLink from "@/components/WhatsAppLink";
import { site } from "@/lib/site";

export default function WhatsAppInlineCta({
  message,
  label = "Ask about this on WhatsApp",
  full = false,
}: {
  message?: string;
  label?: string;
  full?: boolean;
}) {
  return (
    <WhatsAppLink
      placement="inline"
      message={message ?? site.whatsappDefaultMessage}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white px-5 py-3 font-mono text-sm font-medium hover:brightness-110 transition-all ${
        full ? "w-full" : ""
      }`}
    >
      {label}
    </WhatsAppLink>
  );
}

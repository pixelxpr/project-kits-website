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
  const text = encodeURIComponent(message ?? site.whatsappDefaultMessage);
  const href = `https://wa.me/${site.whatsappNumber}?text=${text}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-void px-5 py-3 font-mono text-sm font-medium hover:brightness-110 transition-all ${
        full ? "w-full" : ""
      }`}
    >
      {label}
    </a>
  );
}

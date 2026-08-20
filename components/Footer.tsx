import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

function SocialIcon({ href, label, path }: { href: string; label: string; path: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-cyan hover:border-cyan/40 transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  );
}

const ICONS = {
  instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.9 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.35 2.63 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.63 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.63-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.84a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
  whatsapp:
    "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39c1.44.79 3.06 1.2 4.72 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.93 6.44 17.5 2 12.04 2zm5.83 14.02c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.13 1.01-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.23 1.38.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.87.27.13.44.19.51.3.07.11.07.63-.17 1.32z",
  mail: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.24l8 6.66 8-6.66V18H4z",
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-void-raised mt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10">
          <div>
            <Link href="/" className="font-display font-bold text-lg text-text flex items-center gap-2.5">
              <Image src="/logo-icon.svg" alt="" width={28} height={28} className="rounded-md" />
              Final<span className="text-gradient">Year</span>Kit
            </Link>
            <p className="text-sm text-text-muted mt-3 max-w-xs leading-relaxed">{site.tagline}</p>
            <div className="flex items-center gap-3 mt-5">
              {site.instagramHandle && <SocialIcon href={`https://instagram.com/${site.instagramHandle}`} label="Instagram" path={ICONS.instagram} />}
              {site.whatsappNumber && <SocialIcon href={`https://wa.me/${site.whatsappNumber}`} label="WhatsApp" path={ICONS.whatsapp} />}
              {site.email && <SocialIcon href={`mailto:${site.email}`} label="Email" path={ICONS.mail} />}
            </div>
          </div>

          {site.footer.columns.map((col) => (
            <div key={col.title}>
              <p className="font-display text-sm font-semibold text-text mb-4">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-text-muted hover:text-cyan transition-colors inline-flex items-center gap-2">
                      {link.label}
                      {"badge" in link && link.badge && (
                        <span className="font-mono text-[10px] uppercase tracking-wider bg-violet/15 text-violet px-1.5 py-0.5 rounded-sm">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col gap-4">
          <p className="text-xs text-text-faint leading-relaxed max-w-3xl">{site.footer.disclaimer}</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-text-faint font-mono">
              &copy; {new Date().getFullYear()} {site.brandName}. All rights reserved.
            </p>
            <p className="text-xs text-text-faint font-mono">Built with Next.js</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

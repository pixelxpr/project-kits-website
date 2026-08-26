import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

// ── Social icon component ────────────────────────────────────────────────────
function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-cyan hover:border-cyan/40 hover:bg-cyan/5 transition-all duration-200"
    >
      {children}
    </a>
  );
}

// ── Icon paths ───────────────────────────────────────────────────────────────
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.9 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.35 2.63 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.63 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.63-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.84a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.24l8 6.66 8-6.66V18H4z" />
  </svg>
);

// ── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const waUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;

  return (
    <footer className="mt-32">

      {/* Pre-footer CTA strip */}
      <div className="mx-4 sm:mx-8 lg:mx-auto lg:max-w-7xl">
        <div className="rounded-2xl border border-cyan/20 bg-gradient-to-br from-cyan/5 via-void-card to-violet/5 px-8 py-12 text-center relative overflow-hidden">
          {/* Glow blobs */}
          <div className="absolute -top-12 left-1/4 w-48 h-48 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 right-1/4 w-48 h-48 bg-violet/10 rounded-full blur-3xl pointer-events-none" />

          <p className="font-mono text-xs uppercase tracking-widest text-cyan mb-4">
            Ready when you are
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text mb-3">
            Stop stressing about your final year project
          </h2>
          <p className="text-text-muted text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Message us on WhatsApp — describe your course and domain, and we&apos;ll recommend the right kit. Usually replies in under 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_4px_28px_rgba(37,211,102,0.45)] hover:-translate-y-0.5"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
            >
              or email {site.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="border-t border-border bg-void-raised mt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
          <div className="grid md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-10">

            {/* Brand column */}
            <div>
              <Link href="/" className="font-display font-bold text-lg text-text flex items-center gap-2.5">
                <Image src="/logo-icon.svg" alt="" width={28} height={28} className="rounded-md" />
                Final<span className="text-gradient">Year</span>Kit
              </Link>
              <p className="text-sm text-text-muted mt-3 max-w-xs leading-relaxed">
                Working project kits for B.Tech, BCA, BBA &amp; MCA students. Code, report, slides, and viva prep — all in one.
              </p>

              {/* Social row */}
              <div className="flex items-center gap-2.5 mt-6">
                {site.instagramHandle && (
                  <SocialIcon href={`https://instagram.com/${site.instagramHandle}`} label="Instagram">
                    <InstagramIcon />
                  </SocialIcon>
                )}
                {site.youtubeHandle && (
                  <SocialIcon href={`https://www.youtube.com/@${site.youtubeHandle}`} label="YouTube">
                    <YouTubeIcon />
                  </SocialIcon>
                )}
                {site.whatsappNumber && (
                  <SocialIcon href={waUrl} label="WhatsApp">
                    <WhatsAppIcon />
                  </SocialIcon>
                )}
                {site.email && (
                  <SocialIcon href={`mailto:${site.email}`} label="Email">
                    <MailIcon />
                  </SocialIcon>
                )}
              </div>
            </div>

            {/* Link columns */}
            {site.footer.columns.map((col) => (
              <div key={col.title}>
                <p className="font-display text-sm font-semibold text-text mb-4">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted hover:text-cyan transition-colors inline-flex items-center gap-2"
                      >
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

          {/* Bottom bar */}
          <div className="mt-14 pt-8 border-t border-border">
            <p className="text-xs text-text-faint leading-relaxed max-w-3xl mb-6">
              {site.footer.disclaimer}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-xs text-text-faint font-mono">
                &copy; {new Date().getFullYear()} {site.brandName}. All rights reserved.
              </p>
              <p className="text-xs text-text-faint">
                Made with ❤️ in India
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

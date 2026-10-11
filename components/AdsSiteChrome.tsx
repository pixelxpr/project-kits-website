import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { site } from "@/lib/site";

/** Minimal chrome for Google Ads landing pages — no “submission-ready” marketing shell. */
export function AdsHeader() {
  return (
    <header className="border-b border-border bg-paper">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
        <BrandLogo />
        <nav className="flex flex-wrap items-center gap-4 font-mono text-xs text-text-muted">
          <Link href="/blog/academic-integrity-project-kits" className="hover:text-teal">
            Academic integrity
          </Link>
          <Link href="/terms" className="hover:text-teal">
            Terms
          </Link>
          <a href={`mailto:${site.email}`} className="hover:text-teal">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

export function AdsFooter() {
  return (
    <footer className="border-t border-border bg-paper-raised mt-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-10 text-center">
        <p className="text-sm text-text-muted leading-relaxed max-w-lg mx-auto">
          {site.brandName} provides educational project learning kits — source code, setup guides,
          and viva study materials. We do not take exams, write submissions for students, or sell
          forged documents.
        </p>
        <p className="font-mono text-[11px] text-text-faint mt-4">
          <Link href="/privacy" className="hover:text-teal">Privacy</Link>
          {" · "}
          <Link href="/terms" className="hover:text-teal">Terms</Link>
          {" · "}
          <Link href="/refund" className="hover:text-teal">Refund</Link>
        </p>
      </div>
    </footer>
  );
}

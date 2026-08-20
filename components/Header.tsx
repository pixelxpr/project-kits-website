"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-lg tracking-tight text-text flex items-center gap-2.5">
          <Image src="/logo-icon.svg" alt="" width={32} height={32} priority className="rounded-lg" />
          Final<span className="text-gradient">Year</span>Kit
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-text transition-colors">
              {item.label}
            </Link>
          ))}
          <Link
            href="/#projects"
            className="inline-flex items-center rounded-full bg-cyan/10 border border-cyan/30 text-cyan px-4 py-1.5 font-mono text-xs font-medium hover:bg-cyan/20 transition-colors"
          >
            Browse kits
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-text-muted p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border px-5 py-4 flex flex-col gap-4 text-sm font-medium text-text-muted">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="hover:text-text transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

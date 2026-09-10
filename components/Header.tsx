"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const WA_URL = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-paper/95 backdrop-blur-md border-b border-border shadow-[0_1px_12px_rgba(11,31,58,0.06)]"
            : "bg-paper/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
          <Link
            href="/"
            className="font-display font-extrabold text-lg tracking-tight text-text flex items-center gap-2.5 shrink-0"
          >
            <Image
              src="/logo-icon.svg"
              alt="FinalYearKit"
              width={30}
              height={30}
              priority
              className="rounded-lg"
            />
            <span>
              Final<span className="text-teal">Year</span>Kit
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {site.nav.map((item) => {
              const active = isActive(item.href);
              // Native <a> for /#hash links — Next.js <Link> can append hashes
              // (e.g. /#projects#how-it-works) when navigating between sections.
              const className = `relative px-3 py-2 rounded-lg transition-colors duration-150 ${
                active
                  ? "text-text bg-paper-raised"
                  : "text-text-muted hover:text-text hover:bg-paper-raised"
              }`;
              if (item.href.includes("#")) {
                return (
                  <a key={item.href} href={item.href} className={className}>
                    {item.label}
                    {active && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal" />
                    )}
                  </a>
                );
              }
              return (
                <Link key={item.href} href={item.href} className={className}>
                  {item.label}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary rounded-lg px-4 py-2 text-sm"
            >
              Get kit on WhatsApp
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-text-muted hover:text-text transition-colors p-2 rounded-lg hover:bg-paper-raised"
            aria-label={open ? "Close menu" : "Open menu"}
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
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-text/30 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-16 left-0 right-0 z-40 md:hidden transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="mx-4 mt-2 rounded-2xl border border-border bg-paper-card shadow-xl overflow-hidden">
          <div className="p-4 flex flex-col gap-1">
            {site.nav.map((item) => {
              const active = isActive(item.href);
              const className = `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-paper-raised text-text"
                  : "text-text-muted hover:bg-paper-raised hover:text-text"
              }`;
              if (item.href.includes("#")) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={className}
                  >
                    {item.label}
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-teal" />}
                  </a>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={className}
                >
                  {item.label}
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-teal" />}
                </Link>
              );
            })}
          </div>
          <div className="p-4 pt-0">
            <div className="border-t border-border pt-4">
              <Link
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl btn-primary text-sm"
              >
                Get kit on WhatsApp
              </Link>
              <p className="text-center text-xs text-text-muted mt-2">
                Usually replies in under 30 minutes
              </p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

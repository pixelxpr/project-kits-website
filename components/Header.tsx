"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import BrandLogo from "@/components/BrandLogo";
import WhatsAppLink from "@/components/WhatsAppLink";
import { whatsappMessages } from "@/lib/whatsapp-messages";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProjectsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setProjectsOpen(false);
        setOpen(false);
      }
    }
    function onPointer(e: MouseEvent) {
      if (
        projectsRef.current &&
        !projectsRef.current.contains(e.target as Node)
      ) {
        setProjectsOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  const projectsActive =
    pathname.startsWith("/final-year-projects") ||
    pathname.startsWith("/btech-projects") ||
    pathname.startsWith("/bca-projects") ||
    pathname.startsWith("/bba-projects") ||
    pathname.startsWith("/mca-projects") ||
    pathname.startsWith("/projects");

  const { projectsMenu } = site;
  const linkClass = (active: boolean) =>
    `relative px-3 py-2 rounded-lg transition-colors duration-150 ${
      active
        ? "text-text bg-paper-raised"
        : "text-text-muted hover:text-text hover:bg-paper-raised"
    }`;

  const degreeShort: Record<string, string> = {
    "/btech-projects": "B.Tech",
    "/bca-projects": "BCA",
    "/bba-projects": "BBA",
    "/mca-projects": "MCA",
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
          <BrandLogo size="lg" />

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <div className="relative" ref={projectsRef}>
              <button
                type="button"
                className={`${linkClass(projectsActive)} inline-flex items-center gap-1`}
                aria-expanded={projectsOpen}
                aria-haspopup="true"
                onClick={() => setProjectsOpen((v) => !v)}
              >
                {projectsMenu.label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform ${projectsOpen ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {projectsActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal" />
                )}
              </button>

              {projectsOpen ? (
                <div className="absolute left-0 top-full z-50 mt-2 w-[22rem] rounded-2xl border border-border bg-paper-card p-4 shadow-xl">
                  <Link
                    href={projectsMenu.href}
                    className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-text hover:bg-paper-raised transition-colors"
                    onClick={() => setProjectsOpen(false)}
                  >
                    All final year projects
                  </Link>
                  <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-3">
                    <div>
                      <p className="px-3 font-mono text-[10px] uppercase tracking-widest text-text-faint">
                        By degree
                      </p>
                      <ul className="mt-1.5 space-y-0.5">
                        {projectsMenu.degrees.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="block rounded-lg px-3 py-1.5 text-sm text-text-muted hover:bg-paper-raised hover:text-text transition-colors"
                              onClick={() => setProjectsOpen(false)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="px-3 font-mono text-[10px] uppercase tracking-widest text-text-faint">
                        By domain
                      </p>
                      <ul className="mt-1.5 space-y-0.5">
                        {projectsMenu.domains.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="block rounded-lg px-3 py-1.5 text-sm text-text-muted hover:bg-paper-raised hover:text-text transition-colors"
                              onClick={() => setProjectsOpen(false)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {site.nav.map((item) => {
              const active = isActive(item.href);
              const className = linkClass(active);
              if (item.href.includes("#")) {
                return (
                  <a key={item.href} href={item.href} className={className}>
                    {item.label}
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
            <WhatsAppLink
              placement="header"
              message={whatsappMessages.header}
              className="inline-flex items-center gap-2 btn-primary rounded-lg px-4 py-2 text-sm"
            >
              Get kit on WhatsApp
            </WhatsAppLink>
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
        <nav className="mx-4 mt-2 rounded-2xl border border-border bg-paper-card shadow-xl overflow-hidden max-h-[calc(100vh-5.5rem)] overflow-y-auto">
          <div className="p-4 space-y-5">
            <div>
              <Link
                href={projectsMenu.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl bg-paper-raised px-4 py-3.5 text-sm font-semibold text-text"
              >
                All final year projects
                <span className="text-teal" aria-hidden>
                  →
                </span>
              </Link>

              <p className="mt-4 mb-2 px-1 font-mono text-[10px] uppercase tracking-widest text-text-faint">
                By degree
              </p>
              <div className="grid grid-cols-2 gap-2">
                {projectsMenu.degrees.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl border border-border px-3 py-3 text-center text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "border-teal/40 bg-teal/5 text-teal"
                        : "text-text hover:border-teal/30"
                    }`}
                  >
                    {degreeShort[link.href] ?? link.label}
                  </Link>
                ))}
              </div>

              <p className="mt-4 mb-2 px-1 font-mono text-[10px] uppercase tracking-widest text-text-faint">
                By domain
              </p>
              <div className="flex flex-wrap gap-2">
                {projectsMenu.domains.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors ${
                      isActive(link.href)
                        ? "border-teal/40 bg-teal/5 text-teal"
                        : "text-text-muted hover:text-text hover:border-teal/30"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="mb-2 px-1 font-mono text-[10px] uppercase tracking-widest text-text-faint">
                Site
              </p>
              <div className="flex flex-col gap-0.5">
                {site.nav.map((item) => {
                  const active = isActive(item.href);
                  const className = `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
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
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <WhatsAppLink
                placement="header"
                message={whatsappMessages.header}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl btn-primary text-sm"
              >
                Get kit on WhatsApp
              </WhatsAppLink>
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

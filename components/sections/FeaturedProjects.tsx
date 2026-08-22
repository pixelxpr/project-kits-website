"use client";

import { useState } from "react";
import { type Project } from "@/lib/projects";
import { categories } from "@/lib/site";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import WhatsAppInlineCta from "@/components/WhatsAppInlineCta";

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("ai-ml");
  const filtered = projects.filter((p) => p.category === active);
  const activeCategory = categories.find((c) => c.id === active);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 sm:px-8 py-24">

      {/* Section header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan mb-3 block">
              Project Catalog
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text leading-tight">
              Available project kits
            </h2>
            <p className="text-text-muted mt-3 max-w-lg leading-relaxed">
              Real, working applications — every kit ships with full source code, an 8-chapter report, slide deck, and a viva question bank.
            </p>
          </div>
          <div className="shrink-0 text-right hidden sm:block">
            <span className="font-mono text-4xl font-bold text-cyan">{projects.filter(p => p.hasScreenshots !== false || p.demoYoutubeId).length}</span>
            <p className="text-xs text-text-muted mt-1">kits with demo</p>
          </div>
        </div>
      </FadeIn>

      {/* Category tabs */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-8 p-1 bg-void-card border border-border rounded-xl w-fit">
          {categories.map((cat) => {
            const count = projects.filter((p) => p.category === cat.id).length;
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => cat.status === "live" ? setActive(cat.id) : undefined}
                disabled={cat.status === "coming-soon"}
                className={`relative flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-cyan text-void font-semibold shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)]"
                    : cat.status === "coming-soon"
                    ? "text-text-muted/40 cursor-not-allowed"
                    : "text-text-muted hover:text-text hover:bg-void-raised"
                }`}
              >
                {cat.label}
                {cat.status === "coming-soon" ? (
                  <span className="text-[9px] bg-violet/20 text-violet border border-violet/30 px-1.5 py-0.5 rounded-sm normal-case tracking-normal">
                    Soon
                  </span>
                ) : (
                  <span className={`text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-sm ${isActive ? "bg-void/20 text-void" : "bg-void text-text-muted border border-border"}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </FadeIn>

      {/* Grid */}
      {filtered.length > 0 ? (
        <StaggerGroup key={active} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <StaggerItem key={p.slug}>
              <ProjectCard project={p} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <FadeIn delay={0.1}>
          <div className="mt-2 rounded-2xl border border-dashed border-border bg-void-card/50 p-14 text-center">
            <div className="w-14 h-14 rounded-full bg-void border border-border flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-display text-lg font-semibold text-text">
              {activeCategory?.label} kits — coming soon
            </p>
            <p className="text-text-muted mt-2 max-w-sm mx-auto text-sm leading-relaxed">
              We&apos;re working on this category. Message us on WhatsApp to get notified the moment it launches.
            </p>
            <div className="mt-6 flex justify-center">
              <WhatsAppInlineCta message={`Hi! I want to be notified when ${activeCategory?.label} kits launch.`} />
            </div>
          </div>
        </FadeIn>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import { type Project } from "@/lib/projects";
import { categories } from "@/lib/site";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("ai-ml");


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
                onClick={() => setActive(cat.id)}
                className={`relative flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-cyan text-void font-semibold shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)]"
                    : "text-text-muted hover:text-text hover:bg-void-raised"
                }`}
              >
                {cat.label}
                <span className={`text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-sm ${isActive ? "bg-void/20 text-void" : "bg-void text-text-muted border border-border"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </FadeIn>

      {/* Grid — render ALL cards but hide non-active via CSS so crawlers see every project link */}
      {categories.map((cat) => {
        const catProjects = projects.filter((p) => p.category === cat.id);
        if (catProjects.length === 0) return null;
        return (
          <div key={cat.id} className={cat.id === active ? "block" : "hidden"}>
            <StaggerGroup key={cat.id} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {catProjects.map((p) => (
                <StaggerItem key={p.slug}>
                  <ProjectCard project={p} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        );
      })}
    </section>
  );
}

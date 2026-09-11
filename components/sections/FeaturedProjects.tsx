"use client";

import { type Project } from "@/lib/projects";
import { categories } from "@/lib/site";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

/**
 * Every kit stays in the visible DOM (no display:none tabs).
 * Ahrefs treats hidden-tab / sr-only links as missing inlinks → orphan pages.
 * Category pills are in-page jump links to each section.
 */
export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="border-y border-border bg-paper-raised">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-24">
        <FadeIn>
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-teal mb-3 block">
              Project catalog
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text leading-[1.25]">
              Available project kits
            </h2>
            <p className="text-text-muted mt-3 max-w-lg leading-relaxed">
              Real applications with matching reports and viva prep. Jump a category or scroll the full catalog.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <nav
            aria-label="Project categories"
            className="flex flex-wrap gap-2 mb-12 p-1 bg-paper-card border border-border rounded-xl w-fit"
          >
            {categories.map((cat) => {
              const count = projects.filter((p) => p.category === cat.id).length;
              if (count === 0) return null;
              return (
                <a
                  key={cat.id}
                  href={`#projects-${cat.id}`}
                  className="relative flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg text-text-muted hover:text-text hover:bg-paper-raised transition-all duration-200"
                >
                  {cat.label}
                  <span className="text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-sm bg-paper-raised text-text-muted border border-border">
                    {count}
                  </span>
                </a>
              );
            })}
          </nav>
        </FadeIn>

        <div className="space-y-16">
          {categories.map((cat) => {
            const catProjects = projects.filter((p) => p.category === cat.id);
            if (catProjects.length === 0) return null;
            return (
              <div key={cat.id} id={`projects-${cat.id}`} className="scroll-mt-28">
                <FadeIn>
                  <div className="flex items-baseline justify-between gap-4 mb-6">
                    <h3 className="font-display text-xl font-bold text-text">{cat.label}</h3>
                    <span className="font-mono text-xs text-text-faint">{catProjects.length} kits</span>
                  </div>
                </FadeIn>
                <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {catProjects.map((p) => (
                    <StaggerItem key={p.slug}>
                      <ProjectCard project={p} />
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

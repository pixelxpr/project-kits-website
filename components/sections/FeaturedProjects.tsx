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
              Real applications with matching reports and viva prep. Filter by category and open a kit to see the demo.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8 p-1 bg-paper-card border border-border rounded-xl w-fit">
            {categories.map((cat) => {
              const count = projects.filter((p) => p.category === cat.id).length;
              const isActive = active === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`relative flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-teal text-white font-semibold"
                      : "text-text-muted hover:text-text hover:bg-paper-raised"
                  }`}
                >
                  {cat.label}
                  <span
                    className={`text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-sm ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-paper-raised text-text-muted border border-border"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {categories.map((cat) => {
          const catProjects = projects.filter((p) => p.category === cat.id);
          if (catProjects.length === 0) return null;
          return (
            <div
              key={cat.id}
              className={cat.id === active ? "block" : "hidden"}
              // Keep inactive tabs out of the a11y tree, but we expose every kit
              // in the sr-only catalog below so crawlers still get inlinks.
              aria-hidden={cat.id !== active}
            >
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

        {/* All kit URLs stay in the HTML for crawlers (inactive tabs use display:none). */}
        <nav className="sr-only" aria-label="All project kits">
          <ul>
            {projects.map((p) => (
              <li key={p.slug}>
                <a href={`/projects/${p.slug}`}>{p.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

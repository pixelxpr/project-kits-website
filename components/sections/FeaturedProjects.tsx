"use client";

import { useState } from "react";
import { type Project } from "@/lib/projects";
import { categories } from "@/lib/site";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("ai-ml");
  const filtered = projects.filter((p) => p.category === active);
  const activeCategory = categories.find((c) => c.id === active);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 sm:px-8 py-24">
      <FadeIn>
        <h2 className="font-display text-3xl font-bold text-text">Available project kits</h2>
        <p className="text-text-muted mt-3 max-w-xl">
          Every project below is a real, working application — click through to see
          screenshots, a demo, and exactly what&apos;s included.
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="flex flex-wrap gap-2 mt-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-colors ${
              active === cat.id
                ? "bg-cyan/15 border-cyan/50 text-cyan"
                : "border-border text-text-muted hover:border-border-strong"
            }`}
          >
            {cat.label}
            {cat.status === "coming-soon" && (
              <span className="ml-2 text-violet">soon</span>
            )}
          </button>
        ))}
      </FadeIn>

      {filtered.length > 0 ? (
        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {filtered.map((p) => (
            <StaggerItem key={p.slug}>
              <ProjectCard project={p} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <FadeIn delay={0.1} className="mt-8 rounded-xl glass p-12 text-center">
          <p className="font-display text-lg font-semibold text-text">
            {activeCategory?.label} kits are coming soon
          </p>
          <p className="text-text-muted mt-2 max-w-md mx-auto">
            Message us on WhatsApp if you want to be notified the moment this
            category launches.
          </p>
        </FadeIn>
      )}
    </section>
  );
}

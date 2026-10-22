import Link from "next/link";
import { type Project } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { categoryHubs, degreeHubs } from "@/lib/project-hubs";

/** Curated homepage sample — full catalog lives on /final-year-projects. */
const FEATURED_SLUGS = [
  "pdf-rag-chat",
  "library-management-system",
  "mern-ecommerce",
  "flutter-notes-app",
  "chat-with-data",
  "hospital-management-system",
  "multi-vendor-marketplace",
  "face-recognition-attendance",
] as const;

const degreeShort: Record<string, string> = {
  btech: "B.Tech",
  bca: "BCA",
  bba: "BBA",
  mca: "MCA",
};

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const featured = FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (p): p is Project => Boolean(p),
  );

  return (
    <section id="projects" className="border-y border-border bg-paper-raised">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20">
        <FadeIn className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">
              Popular projects
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text leading-[1.25] max-w-xl">
              Start with a project students ask for most
            </h2>
            <p className="text-text-muted mt-3 max-w-lg leading-relaxed">
              Open any project to see demos and book from ₹49 — or browse the full catalog.
            </p>
          </div>
          <Link
            href="/final-year-projects"
            className="inline-flex items-center justify-center rounded-lg btn-primary px-5 py-3 text-sm font-semibold shrink-0"
          >
            Browse all projects
          </Link>
        </FadeIn>

        <StaggerGroup className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {featured.map((p) => (
            <StaggerItem key={p.slug}>
              <ProjectCard project={p} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeIn delay={0.08}>
          <div className="mt-12 pt-8 border-t border-border">
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint mb-3">
              Or browse by degree
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {degreeHubs.map((hub) => (
                <Link
                  key={hub.slug}
                  href={hub.path}
                  className="text-sm font-medium text-text-muted hover:text-teal transition-colors"
                >
                  {degreeShort[hub.slug] ?? hub.label}
                </Link>
              ))}
              <span className="text-border" aria-hidden>
                ·
              </span>
              {categoryHubs.map((hub) => (
                <Link
                  key={hub.slug}
                  href={hub.path}
                  className="text-sm font-medium text-text-muted hover:text-teal transition-colors"
                >
                  {hub.label.replace(" projects", "")}
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

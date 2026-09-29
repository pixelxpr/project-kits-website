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
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">
            Find a kit
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text leading-[1.25] max-w-xl">
            Pick your degree, then a stack
          </h2>
          <p className="text-text-muted mt-3 max-w-lg leading-relaxed">
            Full catalog is on the hubs — here&apos;s a quick path in and a few
            kits students ask about most.
          </p>
        </FadeIn>

        <StaggerGroup className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {degreeHubs.map((hub) => (
            <StaggerItem key={hub.slug}>
              <Link
                href={hub.path}
                className="group flex flex-col rounded-xl border border-border bg-paper-card px-4 py-4 transition-colors hover:border-teal/40"
              >
                <span className="font-display text-lg font-bold text-text group-hover:text-teal transition-colors">
                  {degreeShort[hub.slug] ?? hub.label}
                </span>
                <span className="mt-1 text-xs text-text-muted">View kits →</span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeIn delay={0.08}>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-faint">
              Domains
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
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 flex items-end justify-between gap-4">
            <h3 className="font-display text-xl font-bold text-text">
              Popular kits
            </h3>
            <Link
              href="/final-year-projects"
              className="font-mono text-sm text-teal hover:underline shrink-0"
            >
              Full catalog →
            </Link>
          </div>
        </FadeIn>

        <StaggerGroup className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {featured.map((p) => (
            <StaggerItem key={p.slug}>
              <ProjectCard project={p} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

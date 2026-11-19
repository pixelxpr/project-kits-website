import Link from "next/link";
import { type Project, getProject } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { categoryHubs, degreeHubs } from "@/lib/project-hubs";
import { BASE_PRICE_INR, formatInr } from "@/lib/pricing";
import YouTubeEmbed from "@/components/YouTubeEmbed";

/** Curated homepage sample — full catalog lives on /final-year-projects. */
const FEATURED_SLUGS = [
  "library-management-system",
  "hotel-booking-system",
  "pdf-rag-chat",
  "face-recognition-attendance",
  "mern-ecommerce",
  "chat-with-data",
  "flutter-notes-app",
  "hospital-management-system",
] as const;

const DEMO_SLUG = "face-recognition-attendance";

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
  const demoProject = getProject(DEMO_SLUG);

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
              From {formatInr(BASE_PRICE_INR)} — Instant or a few hours.{" "}
              <a href="#free-projects" className="text-success font-medium hover:underline">
                Two free downloads above
              </a>
              .
            </p>
          </div>
          <Link
            href="/final-year-projects"
            className="inline-flex items-center justify-center rounded-lg btn-primary px-5 py-3 text-sm font-semibold shrink-0"
          >
            Browse all projects
          </Link>
        </FadeIn>

        <FadeIn delay={0.06} className="mt-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint mb-3">
            Browse by domain
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {categoryHubs.map((hub) => (
              <Link
                key={hub.slug}
                href={hub.path}
                className="text-sm font-medium text-text hover:text-teal transition-colors underline decoration-border underline-offset-4 hover:decoration-teal"
              >
                {hub.label.replace(" projects", "")}
              </Link>
            ))}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint mt-5 mb-3">
            Or by degree
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
          </div>
        </FadeIn>

        <StaggerGroup className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {featured.map((p) => (
            <StaggerItem key={p.slug}>
              <ProjectCard project={p} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {demoProject?.demoYoutubeId && (
          <FadeIn delay={0.1} className="mt-14 pt-10 border-t border-border">
            <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-12 items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">
                  Live demo
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-text leading-[1.25]">
                  See a real project running
                </h3>
                <p className="text-text-muted mt-3 leading-relaxed max-w-md">
                  {demoProject.title} — mark attendance from a camera, then export CSV. Same class of
                  demo you&apos;ll walk through in viva.
                </p>
                <Link
                  href={`/projects/${demoProject.slug}`}
                  className="inline-flex mt-5 text-sm font-medium text-teal hover:underline underline-offset-4"
                >
                  Open project page →
                </Link>
              </div>
              <YouTubeEmbed
                videoId={demoProject.demoYoutubeId}
                title={`${demoProject.title} demo`}
              />
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

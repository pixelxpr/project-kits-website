import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/motion/FadeIn";
import type { AdsDestination } from "@/lib/ad-landing";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

type Props = {
  destination: AdsDestination;
};

export default function AdsDestinationView({ destination }: Props) {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const featured = destination.featuredSlugs
    .map((slug) => bySlug.get(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div>
      <section className="border-b border-border bg-paper-raised">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-14 pb-12">
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-teal">
            {destination.keywordLabel}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-text mt-3 leading-[1.2]">
            {destination.h1}
          </h1>
          <p className="text-text-muted mt-5 text-lg leading-relaxed">{destination.intro}</p>

          <p className="mt-5 text-sm text-text-muted leading-relaxed">
            Built as learning kits — run the code, customize it for your college, and use the docs as
            a scaffold.{" "}
            <Link
              href="/blog/academic-integrity-project-kits"
              className="text-teal font-medium hover:underline"
            >
              How we expect you to use a kit
            </Link>
            .
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#featured-kits"
              className="inline-flex items-center rounded-lg btn-primary px-6 py-3 text-sm font-semibold"
            >
              Browse matching kits
            </a>
            <Link
              href={destination.organicHubPath}
              className="inline-flex items-center rounded-lg border border-border bg-paper-card px-6 py-3 text-sm font-semibold text-text hover:border-teal/40 hover:text-teal transition-colors"
            >
              {destination.organicHubLabel}
            </Link>
            <Link
              href="/github-vs-kit"
              className="inline-flex items-center rounded-lg border border-border bg-paper-card px-6 py-3 text-sm font-semibold text-text hover:border-teal/40 hover:text-teal transition-colors"
            >
              GitHub zip vs kit
            </Link>
          </div>
          <p className="font-mono text-xs text-text-faint mt-4">
            Book from ₹49 · Packages from ₹1,499 · You own the customization
          </p>
        </div>
      </section>

      <section id="featured-kits" className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
        <FadeIn>
          <div className="max-w-3xl mb-10">
            <h2 className="font-display text-2xl font-bold text-text">Kits that match this search</h2>
            <p className="text-text-muted mt-3 leading-relaxed">
              Open a project, run it locally, then book if it fits your syllabus. Docs are scaffolds
              — rewrite them with your tests and your guide&apos;s format.
            </p>
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-14 text-center">
          <p className="text-text-muted text-sm leading-relaxed max-w-md mx-auto">
            Prefer the full indexable catalog?{" "}
            <Link
              href={destination.organicHubPath}
              className="text-teal font-medium hover:underline"
            >
              {destination.organicHubLabel}
            </Link>
            {" · "}
            <Link href="/github-vs-kit" className="text-teal font-medium hover:underline">
              Why not just use GitHub?
            </Link>
          </p>
          <p className="font-mono text-[10px] text-text-faint mt-6">
            {site.brandName} · {site.email}
          </p>
        </div>
      </section>
    </div>
  );
}

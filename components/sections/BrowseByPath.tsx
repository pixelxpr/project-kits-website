import Link from "next/link";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { categoryHubs, degreeHubs } from "@/lib/project-hubs";

const degreeShort: Record<string, string> = {
  btech: "B.Tech",
  bca: "BCA",
  bba: "BBA",
  mca: "MCA",
};

export default function BrowseByPath() {
  return (
    <section
      id="browse-by-path"
      className="border-y border-border bg-paper-raised/40 py-20 sm:py-24"
      aria-labelledby="browse-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">
            Find your path
          </p>
          <h2
            id="browse-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-text max-w-xl"
          >
            Browse by degree or domain
          </h2>
          <p className="text-text-muted mt-4 max-w-xl leading-relaxed">
            Same submission-ready kits — filtered for your course and the stack
            you want to defend in viva.
          </p>
        </FadeIn>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {degreeHubs.map((hub) => (
            <StaggerItem key={hub.slug}>
              <Link
                href={hub.path}
                className="group block border-b-2 border-transparent pb-3 transition-colors hover:border-teal"
              >
                <p className="font-display text-xl font-bold text-text transition-colors group-hover:text-teal">
                  {degreeShort[hub.slug] ?? hub.label}
                </p>
                <p className="mt-1 text-sm text-text-muted leading-relaxed line-clamp-2">
                  {hub.description}
                </p>
                <span className="mt-2 inline-block text-sm font-semibold text-teal">
                  View kits →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeIn delay={0.12}>
          <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-border pt-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-faint">
              Domains
            </span>
            {categoryHubs.map((hub) => (
              <Link
                key={hub.slug}
                href={hub.path}
                className="text-sm font-medium text-text underline decoration-border underline-offset-4 transition-colors hover:text-teal hover:decoration-teal"
              >
                {hub.label.replace(" projects", "")}
              </Link>
            ))}
            <Link
              href="/final-year-projects"
              className="text-sm font-semibold text-teal"
            >
              All projects →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

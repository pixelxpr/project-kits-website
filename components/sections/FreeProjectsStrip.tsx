import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/motion/FadeIn";
import { FREE_PROJECT_SLUGS } from "@/lib/free-projects";
import { getProject } from "@/lib/projects";
import { projectCoverSrc, hasStaticProjectCover } from "@/lib/project-media";

/** Homepage block — free kits with cover + Get free ZIP. List from lib/free-projects.ts */
export default function FreeProjectsStrip() {
  const items = FREE_PROJECT_SLUGS.map((slug) => getProject(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  if (items.length === 0) return null;

  return (
    <section
      id="free-projects"
      className="border-b border-border bg-success/[0.06]"
      aria-labelledby="free-projects-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-14">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-success mb-3">
            No payment for the base ZIP
          </p>
          <h2
            id="free-projects-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-text leading-[1.25] max-w-xl"
          >
            Free final year projects — download after contact
          </h2>
          <p className="text-text-muted mt-3 max-w-xl leading-relaxed">
            Same code + report + slides package. Share name, email, and WhatsApp to unlock the ZIP.
            Paid add-ons stay optional.
          </p>
        </FadeIn>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {items.map((p, i) => (
            <FadeIn key={p.slug} delay={0.05 * (i + 1)}>
              <Link
                href={`/projects/${p.slug}`}
                className="group flex gap-4 rounded-2xl border border-success/30 bg-paper-card p-3 sm:p-4 hover:border-success/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                <div className="relative w-28 sm:w-36 aspect-video shrink-0 rounded-lg overflow-hidden border border-border bg-paper-raised">
                  <Image
                    src={projectCoverSrc(p.slug)}
                    unoptimized={!hasStaticProjectCover(p.slug)}
                    alt=""
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="144px"
                  />
                </div>
                <div className="min-w-0 flex flex-col justify-center py-0.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-success font-semibold">
                    Free ZIP
                  </span>
                  <span className="font-display font-semibold text-text mt-1 group-hover:text-teal transition-colors leading-snug">
                    {p.title}
                  </span>
                  <span className="text-xs text-text-muted mt-1 line-clamp-2 leading-relaxed">
                    {p.tagline}
                  </span>
                  <span className="mt-3 inline-flex items-center font-mono text-xs font-medium text-teal">
                    Get free ZIP
                    <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

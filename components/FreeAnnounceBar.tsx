import Link from "next/link";
import Marquee from "@/components/motion/Marquee";
import { FREE_PROJECT_SLUGS } from "@/lib/free-projects";
import { getProject } from "@/lib/projects";

/**
 * Site-wide top bar — free kits from lib/free-projects.ts.
 * More visible than inline copy; skipped on /ads landings via AppChrome.
 */
export default function FreeAnnounceBar() {
  const items = FREE_PROJECT_SLUGS.map((slug) => getProject(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  if (items.length === 0) return null;

  const track = (
    <div className="flex items-center gap-8 pr-8 py-2.5">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-success shrink-0">
        Free download
      </span>
      {items.map((p) => (
        <Link
          key={p.slug}
          href={`/projects/${p.slug}`}
          className="font-display text-sm font-semibold text-text hover:text-teal whitespace-nowrap transition-colors shrink-0"
        >
          {p.title}
          <span className="text-success font-mono text-[10px] uppercase tracking-wider ml-2">
            Free
          </span>
        </Link>
      ))}
      <span className="font-mono text-[11px] text-text-muted whitespace-nowrap shrink-0">
        Code + report + slides · contact to unlock ZIP
      </span>
      <span className="text-border-strong shrink-0" aria-hidden>
        /
      </span>
    </div>
  );

  return (
    <div
      className="border-b border-success/25 bg-success/[0.09] text-text"
      role="region"
      aria-label="Free project downloads"
    >
      <Marquee>{track}</Marquee>
    </div>
  );
}

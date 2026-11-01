import Link from "next/link";
import { FREE_PROJECT_SLUGS } from "@/lib/free-projects";
import { getProject } from "@/lib/projects";

/** Visible free-download callout — list from lib/free-projects.ts */
export default function FreeProjectsCallout({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const items = FREE_PROJECT_SLUGS.map((slug) => getProject(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  if (items.length === 0) return null;

  if (compact) {
    return (
      <p className={className || "text-sm text-text-muted leading-relaxed"}>
        <span className="inline-flex items-center rounded-md bg-success/15 text-success font-mono text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 mr-2 align-middle">
          Free
        </span>
        {items.map((p, i) => (
          <span key={p.slug}>
            {i > 0 && (i === items.length - 1 ? " · " : " · ")}
            <Link href={`/projects/${p.slug}`} className="text-teal font-medium hover:underline">
              {p.title}
            </Link>
          </span>
        ))}
      </p>
    );
  }

  return (
    <div
      className={
        className ||
        "rounded-2xl border border-success/35 bg-success/[0.09] p-4 sm:p-5 max-w-2xl"
      }
      role="region"
      aria-label="Free project downloads"
    >
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="inline-flex items-center rounded-md bg-success text-white font-mono text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
          Free to download
        </span>
        <span className="font-mono text-[11px] text-text-muted">
          Contact to unlock ZIP · add-ons optional
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="inline-flex items-center gap-2 rounded-xl border border-success/40 bg-paper-card px-3 py-2 text-sm font-display font-semibold text-text hover:border-success hover:text-teal transition-colors"
          >
            {p.title}
            <span className="font-mono text-[10px] uppercase tracking-wider text-success font-semibold">
              Free
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { FREE_PROJECT_SLUGS } from "@/lib/free-projects";
import { getProject } from "@/lib/projects";

/** Short, reusable note that free kits exist — keep list in lib/free-projects.ts */
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

  return (
    <p
      className={
        className ||
        (compact
          ? "font-mono text-xs text-text-faint"
          : "text-sm text-text-muted leading-relaxed")
      }
    >
      <span className="font-semibold text-success">Free to download:</span>{" "}
      {items.map((p, i) => (
        <span key={p.slug}>
          {i > 0 && (i === items.length - 1 ? " and " : ", ")}
          <Link href={`/projects/${p.slug}`} className="text-teal hover:underline font-medium">
            {p.title}
          </Link>
        </span>
      ))}
      {" — "}
      contact required, add-ons optional.
    </p>
  );
}

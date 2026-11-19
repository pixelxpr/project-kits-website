import Link from "next/link";
import FadeIn from "@/components/motion/FadeIn";
import { BASE_PRICE_INR, formatInr } from "@/lib/pricing";

const REPORT_CHAPTERS = [
  "Introduction & objectives",
  "Literature survey",
  "System analysis",
  "System design / architecture",
  "Implementation",
  "Testing",
  "Conclusion & future work",
  "References",
];

const ZIP_TREE = [
  { name: "your-project.zip", kind: "root" as const },
  { name: "code/", kind: "dir" as const, note: "Runnable source + README" },
  { name: "report.docx", kind: "file" as const, note: "8-chapter Word report" },
  { name: "slides.pptx", kind: "file" as const, note: "~14 slides, same architecture" },
];

export default function WhatsIncluded() {
  return (
    <section id="whats-included" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">
              What you download
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text max-w-xl leading-[1.25]">
              A submission package — not a GitHub dump
            </h2>
            <p className="text-text-muted mt-4 max-w-xl leading-relaxed">
              Every paid project starts at {formatInr(BASE_PRICE_INR)} with working code, an academic
              report, and slides written for the same system. Customize, viva bank, install help, and
              walkthroughs are optional add-ons.
            </p>
            <p className="mt-5">
              <Link
                href="/github-vs-kit"
                className="text-sm font-medium text-teal hover:underline underline-offset-4"
              >
                How this differs from a random GitHub repo →
              </Link>
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-sm border border-border bg-paper-raised/80 overflow-hidden">
              <div className="border-b border-border px-4 sm:px-5 py-3 flex items-center gap-2 bg-paper-card">
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-faint">
                  Package contents
                </span>
              </div>

              <div className="grid sm:grid-cols-2">
                <div className="p-4 sm:p-5 sm:border-r border-border">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-teal mb-3">
                    ZIP layout
                  </p>
                  <ul className="font-mono text-sm text-text space-y-2.5">
                    {ZIP_TREE.map((item) => (
                      <li
                        key={item.name}
                        className={item.kind === "root" ? "font-semibold" : "pl-4 border-l border-border ml-1"}
                      >
                        <span className={item.kind === "dir" ? "text-teal" : undefined}>
                          {item.name}
                        </span>
                        {"note" in item && item.note && (
                          <span className="block text-xs text-text-faint font-sans mt-0.5 font-normal">
                            {item.note}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 sm:p-5 border-t sm:border-t-0 border-border">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-teal mb-3">
                    Report chapters
                  </p>
                  <ol className="space-y-2">
                    {REPORT_CHAPTERS.map((chapter, i) => (
                      <li key={chapter} className="flex gap-3 text-sm text-text leading-snug">
                        <span className="font-mono text-xs text-text-faint w-5 shrink-0 pt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{chapter}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

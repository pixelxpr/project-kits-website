import { site } from "@/lib/site";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import Marquee from "@/components/motion/Marquee";

const TECH = [
  "Next.js", "Python", "Groq", "FAISS", "Streamlit", "Plotly",
  "sentence-transformers", "pandas", "Whisper", "OpenAI-compatible APIs",
];

function StatDisplay({ stat, label }: { stat: string; label: string }) {
  const numericMatch = stat.match(/^(\d+)(.*)$/);
  if (numericMatch) {
    const [, num, suffix] = numericMatch;
    return (
      <div className="flex items-baseline gap-2">
        <span className="font-display text-2xl font-bold text-gradient">
          <AnimatedCounter value={parseInt(num, 10)} suffix={suffix} />
        </span>
        <span className="text-sm text-text-muted">{label}</span>
      </div>
    );
  }
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-display text-2xl font-bold text-gradient animate-pulse-glow">{stat}</span>
      <span className="text-sm text-text-muted">{label}</span>
    </div>
  );
}

export default function TrustBar() {
  return (
    <section className="border-y border-border bg-void-raised">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-3">
        {site.trustPoints.map((t) => (
          <StatDisplay key={t.label} stat={t.stat} label={t.label} />
        ))}
      </div>
      <div className="border-t border-border py-5">
        <Marquee>
          {TECH.map((t) => (
            <span key={t} className="font-mono text-sm text-text-faint whitespace-nowrap">
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

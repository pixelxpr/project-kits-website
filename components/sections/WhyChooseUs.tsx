import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { AnimatedCheck, AnimatedCross } from "@/components/motion/AnimatedMarks";

const ICONS = {
  package: "M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21",
  fileCheck: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M9 15l2 2 4-4",
  search: "M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z",
  chat: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  sparkles: "M12 3l1.9 4.9L19 9.8l-5.1 1.9L12 16.6l-1.9-4.9L5 9.8l5.1-1.9L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
};

const COMPARISON = [
  {
    icon: ICONS.package,
    theirs: "A zip file with code and nothing else",
    ours: "Code, an 8-chapter report, a slide deck, and a viva question bank — one complete submission package",
  },
  {
    icon: ICONS.fileCheck,
    theirs: "Generic documentation that doesn't match the actual code",
    ours: "Every report and deck is written to describe the exact architecture in that specific codebase",
  },
  {
    icon: ICONS.search,
    theirs: "No way to verify it works before you pay",
    ours: "A real demo Q&A shown on every project page, and we'll show you more on request before you buy",
  },
  {
    icon: ICONS.chat,
    theirs: "Silence after payment if something breaks",
    ours: "WhatsApp support included until you've actually submitted, not just until payment clears",
  },
  {
    icon: ICONS.sparkles,
    theirs: "The same generic project every classmate can also buy",
    ours: "Guidance on customizing the demo domain, dataset, and framing so submissions don't look identical",
  },
  {
    icon: ICONS.book,
    theirs: "Generic interview-prep questions, if any",
    ours: "A question bank built from the specific design decisions in your exact project, not generic trivia",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-void-raised border-y border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan">The difference</p>
          <h2 className="font-display text-3xl font-bold text-text mt-3 max-w-2xl">
            What you get here vs. a random project seller
          </h2>
          <p className="text-text-muted mt-3 max-w-2xl leading-relaxed">
            There&apos;s no shortage of people selling college project code online.
            The gap is almost never the code itself &mdash; it&apos;s everything around
            it: whether it actually runs, whether the documentation matches
            what you&apos;re submitting for your final year project, and whether
            you can defend it when your examiner asks a direct question.
          </p>
        </FadeIn>

        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {COMPARISON.map((row, i) => (
            <StaggerItem key={i}>
              <div className="group rounded-xl glass p-6 h-full hover:border-cyan/40 hover:glow-cyan transition-[border-color,box-shadow] duration-300">
                <div className="h-11 w-11 rounded-lg bg-void-card border border-border flex items-center justify-center text-cyan group-hover:scale-110 transition-transform duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d={row.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="flex items-start gap-2.5 mt-5">
                  <span className="h-5 w-5 rounded-full bg-magenta/10 text-magenta flex items-center justify-center shrink-0 mt-0.5">
                    <AnimatedCross className="h-3 w-3" />
                  </span>
                  <p className="text-sm text-text-faint leading-relaxed">{row.theirs}</p>
                </div>

                <div className="flex items-start gap-2.5 mt-3 pt-3 border-t border-border">
                  <span className="h-5 w-5 rounded-full bg-cyan/10 text-cyan flex items-center justify-center shrink-0 mt-0.5">
                    <AnimatedCheck className="h-3 w-3" />
                  </span>
                  <p className="text-sm text-text leading-relaxed">{row.ours}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

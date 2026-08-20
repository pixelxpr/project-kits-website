import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

const STEPS = [
  {
    step: "01",
    title: "Pick a project",
    desc: "Browse the working demos below and pick the one that fits your submission. Every project page shows a real question-and-answer exchange, so you can see it work before deciding.",
  },
  {
    step: "02",
    title: "Get your customized kit",
    desc: "Code, an 8-chapter report, a presentation deck, and a viva question bank — customized with your name, college, and department, delivered as a complete package rather than piecemeal.",
  },
  {
    step: "03",
    title: "Submit and defend it",
    desc: "Walk into your viva with a question bank built from the exact architecture you're submitting, not generic interview trivia — and message us on WhatsApp if anything still isn't clicking.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-void-raised border-y border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24">
        <FadeIn>
          <h2 className="font-display text-3xl font-bold text-text">How it works</h2>
        </FadeIn>
        <StaggerGroup className="grid sm:grid-cols-3 gap-8 mt-12 relative">
          <div className="hidden sm:block absolute top-6 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-cyan/40 via-violet/40 to-magenta/40" />
          {STEPS.map((s) => (
            <StaggerItem key={s.step} className="relative">
              <div className="h-12 w-12 rounded-full glass glow-cyan flex items-center justify-center font-display font-bold text-cyan relative z-10 bg-void-raised">
                {s.step}
              </div>
              <p className="font-display font-semibold text-text mt-4">{s.title}</p>
              <p className="text-sm text-text-muted mt-1.5 leading-relaxed">{s.desc}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

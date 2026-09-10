import Link from "next/link";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { site } from "@/lib/site";

const WA_URL = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;

const STEPS = [
  {
    step: "01",
    title: "Choose a kit",
    desc: "Browse working demos and pick the project that fits your course and domain. Ask to see it run live before you pay a rupee.",
  },
  {
    step: "02",
    title: "Message on WhatsApp",
    desc: "Share your course, college, and preferred tier. Confirm over UPI — most kits deliver the same day once we have your details.",
  },
  {
    step: "03",
    title: "Submit & defend",
    desc: "Get customized code, report, slides, and viva prep. Message us anytime until you've submitted if something still isn't clear.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border bg-paper-raised">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-24">
        <FadeIn className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">
              How it works
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text leading-tight max-w-lg">
              From browsing to viva — without the freelancer chaos.
            </h2>
            <p className="text-text-muted mt-4 max-w-xl leading-relaxed">
              One WhatsApp thread. One complete package. Support until you submit.
            </p>
          </div>
          <Link
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold px-5 py-3 text-sm transition-colors"
          >
            Chat to get started
          </Link>
        </FadeIn>

        <StaggerGroup className="grid sm:grid-cols-3 gap-6 mt-12">
          {STEPS.map((s) => (
            <StaggerItem key={s.step}>
              <div className="h-full rounded-2xl border border-border bg-paper-card p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-teal bg-teal/10 border border-teal/20 rounded-md px-2 py-1">
                    {s.step}
                  </span>
                  {s.step === "02" && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/25 rounded-md px-2 py-1">
                      WhatsApp
                    </span>
                  )}
                </div>
                <p className="font-display font-semibold text-text text-lg mt-5">{s.title}</p>
                <p className="text-sm text-text-muted mt-2 leading-relaxed">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

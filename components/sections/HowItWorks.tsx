"use client";

import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import Link from "next/link";
import { BOOKING_FEE_INR } from "@/lib/booking";

const STEPS = [
  {
    step: "01",
    title: "Choose a project",
    desc: "Browse demos and pick the project that fits your course and domain. Questions first? Contact us on WhatsApp from the header.",
  },
  {
    step: "02",
    title: `Book from ₹${BOOKING_FEE_INR}`,
    desc: `On the project page, pay a non-refundable ₹${BOOKING_FEE_INR} booking fee. We WhatsApp you to confirm college details and tier — then deliver the same day in most cases.`,
  },
  {
    step: "03",
    title: "Customize & defend",
    desc: "Get code, report, slides, and viva prep. Message us anytime until you've submitted if something still isn't clear.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border bg-paper-raised">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">
            How it works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text leading-[1.25] max-w-lg">
            From browsing to viva — without the freelancer chaos.
          </h2>
          <p className="text-text-muted mt-4 max-w-xl leading-relaxed">
            Book the project, get support on WhatsApp, submit with confidence.
          </p>
        </FadeIn>

        <StaggerGroup className="grid sm:grid-cols-3 gap-4 sm:gap-6 mt-10">
          {STEPS.map((s) => (
            <StaggerItem key={s.step}>
              <div className="h-full rounded-2xl border border-border bg-paper-card p-5 sm:p-7">
                <span className="font-mono text-xs font-semibold text-teal bg-teal/10 border border-teal/20 rounded-md px-2 py-1">
                  {s.step}
                </span>
                <p className="font-display font-semibold text-text text-lg mt-4">{s.title}</p>
                <p className="text-sm text-text-muted mt-2 leading-relaxed">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeIn delay={0.1}>
          <p className="mt-8 text-sm text-text-muted">
            Prefer to talk first? Use Contact on WhatsApp — or{" "}
            <Link href="/#pricing" className="text-teal font-medium hover:underline">
              see pricing
            </Link>
            .
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

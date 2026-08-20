import FaqAccordion from "@/components/FaqAccordion";
import FadeIn from "@/components/motion/FadeIn";

const HOME_FAQ = [
  {
    q: "Does this work for B.Tech, BCA, BBA, and MCA students?",
    a: "Yes — kits are built to suit the standard final year project requirements across engineering, computer applications, and business programs. The report follows an 8-chapter academic structure that fits most university submission guidelines, and we can customise the domain framing, college name, and department on every kit regardless of your degree.",
  },
  {
    q: "Is this actually my own work if I buy it?",
    a: "You get the full source code and can (and should) understand it before submitting — the viva question bank exists specifically so you can defend it confidently. Check your own institution's academic integrity policy on using external resources before submitting; that policy varies by college and we can't make that call for you.",
  },
  {
    q: "What if it doesn't work on my machine?",
    a: "Every kit ships with exact setup instructions and a working requirements file, tested on a clean environment before it's listed. If you still get stuck — a Python version mismatch, a missing system dependency, whatever it is — message us on WhatsApp. Support is included until you've submitted, not just until payment clears.",
  },
  {
    q: "How is this different from a random GitHub repo?",
    a: "A GitHub repo doesn't come with a report, a presentation, or a viva question bank written for that exact codebase — and it definitely won't have your name and college on it. This is a complete submission package: code, documentation, and defense material, built together so they actually match.",
  },
  {
    q: "Do you only do AI/ML projects?",
    a: "AI/ML is what we've shipped so far, but the catalog is built to expand — e-commerce and MERN-stack kits are next, using the same standard: working code, matching documentation, and a real viva question bank. Message us if you need something in a category that isn't live yet.",
  },
  {
    q: "Can you customize the project further?",
    a: "Yes — message us on WhatsApp with what you need. Small customizations, like swapping the demo dataset or video domain so your submission doesn't look identical to a classmate's, are usually included. Larger structural changes may cost extra depending on scope.",
  },
  {
    q: "Will two students from the same college get an identical project?",
    a: "Not if you tell us — we can vary the demo domain, some copy in the report, or (for the more technical students) suggest one extra feature to implement for real. Worth flagging this to us before you buy if it matters for your class.",
  },
  {
    q: "How long does delivery take?",
    a: "Most kits are same-day, since the report and deck generation is largely automated once we have your details. Heavier customization requests may take longer — we'll tell you upfront, before you pay, if that's the case for what you're asking.",
  },
  {
    q: "What payment methods do you accept?",
    a: "UPI is the simplest for most students — confirm details directly over WhatsApp before paying. We don't currently support international payment methods.",
  },
  {
    q: "What if I need help understanding the code before my viva?",
    a: "That's exactly what the viva question bank and cheat sheet are for — they walk through the design decisions in plain language. If a specific part still isn't clicking, message us and we'll explain it directly.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-void-raised border-t border-border">
      <div className="mx-auto max-w-2xl px-5 sm:px-8 py-24">
        <FadeIn>
          <h2 className="font-display text-3xl font-bold text-text">Common questions</h2>
        </FadeIn>
        <FadeIn delay={0.1} className="mt-10">
          <FaqAccordion items={HOME_FAQ} />
        </FadeIn>
      </div>
    </section>
  );
}

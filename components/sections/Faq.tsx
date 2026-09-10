import FaqAccordion from "@/components/FaqAccordion";
import FadeIn from "@/components/motion/FadeIn";

const HOME_FAQ = [
  {
    q: "Does this work for B.Tech, BCA, BBA, and MCA students?",
    a: "Yes — kits are built to suit standard final year project requirements across engineering, computer applications, and business programs. The report follows an 8-chapter academic structure that fits most university guidelines, and we customise college name and department on every kit.",
  },
  {
    q: "Is this actually my own work if I buy it?",
    a: "You get the full source code and should understand it before submitting — the viva question bank exists so you can defend it. Check your institution's academic integrity policy on external resources; that call is yours.",
  },
  {
    q: "What if it doesn't work on my machine?",
    a: "Every kit ships with setup instructions and a working requirements file. If you still get stuck, message us on WhatsApp. Support is included until you've submitted.",
  },
  {
    q: "How is this different from a random GitHub repo?",
    a: "A GitHub repo doesn't come with a report, presentation, or viva bank written for that exact codebase — and it won't have your name and college on it. This is a complete submission package.",
  },
  {
    q: "Do you only do AI/ML projects?",
    a: "No — the catalog includes AI/ML, MERN stack, and e-commerce kits, all to the same standard: working code, matching documentation, and a real viva question bank.",
  },
  {
    q: "Can you customize the project further?",
    a: "Yes — message us on WhatsApp. Small customizations like swapping the demo domain are usually included. Larger structural changes may cost extra depending on scope.",
  },
  {
    q: "Will two students from the same college get an identical project?",
    a: "Not if you tell us — we can vary the demo domain, report copy, or suggest an extra feature. Flag this before you buy if it matters for your class.",
  },
  {
    q: "How long does delivery take?",
    a: "Most kits are same-day once we have your details. Heavier customization may take longer — we'll tell you upfront before you pay.",
  },
  {
    q: "What payment methods do you accept?",
    a: "UPI is simplest for most students — confirm details over WhatsApp before paying. We don't currently support international payment methods.",
  },
  {
    q: "What if I need help understanding the code before my viva?",
    a: "That's what the viva question bank and cheat sheet are for. If a specific part still isn't clicking, message us and we'll explain it directly.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="border-t border-border bg-paper-raised">
      <div className="mx-auto max-w-2xl px-5 sm:px-8 py-20 sm:py-24">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">FAQ</p>
          <h2 className="font-display text-3xl font-bold text-text">Common questions</h2>
        </FadeIn>
        <FadeIn delay={0.1} className="mt-10">
          <FaqAccordion items={HOME_FAQ} />
        </FadeIn>
      </div>
    </section>
  );
}

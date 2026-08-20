import { testimonials } from "@/lib/testimonials";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24">
      <FadeIn>
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-cyan">Student reviews</p>
        <h2 className="font-display text-3xl font-bold text-text mt-3">What students are saying</h2>
        <p className="text-text-muted mt-3 max-w-xl">
          Real ratings from B.Tech, BCA, and MCA students who used these kits for their final year project submissions.
        </p>
      </FadeIn>
      <StaggerGroup className="grid sm:grid-cols-3 gap-5 mt-10">
        {testimonials.map((t, i) => (
          <StaggerItem key={i}>
            <div className="rounded-xl glass p-6 h-full flex flex-col hover:border-cyan/30 transition-colors duration-300">
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none" className="text-cyan/30 mb-4 shrink-0">
                <path
                  d="M0 22V13.2C0 8.53 1.13 5.13 3.4 3C5.67 0.87 8.53 0 12 0V4.4C10.13 4.4 8.67 4.93 7.6 6C6.53 7.07 6 8.53 6 10.4H12V22H0ZM16 22V13.2C16 8.53 17.13 5.13 19.4 3C21.67 0.87 24.53 0 28 0V4.4C26.13 4.4 24.67 4.93 23.6 6C22.53 7.07 22 8.53 22 10.4H28V22H16Z"
                  fill="currentColor"
                />
              </svg>
              <p className="text-sm text-text-muted leading-relaxed flex-1">{t.quote}</p>
              <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center font-mono text-xs font-bold text-cyan shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{t.name}</p>
                  <p className="text-xs text-text-faint">{t.meta}</p>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

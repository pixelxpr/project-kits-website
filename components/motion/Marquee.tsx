import type { ReactNode } from "react";

export default function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee">
        <div className="flex items-center gap-12 pr-12">{children}</div>
        <div className="flex items-center gap-12 pr-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

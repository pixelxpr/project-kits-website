import type { Metadata } from "next";

/** Ads landings use minimal chrome (see AppChrome) and learning-first defaults. */
export const metadata: Metadata = {
  title: {
    default: "Final Year Project Learning Kits | FinalYearKit",
    template: "%s | FinalYearKit",
  },
};

export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

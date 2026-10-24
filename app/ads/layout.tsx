import type { Metadata } from "next";

/** Ads landings use minimal chrome (see AppChrome) and learning-first defaults. */
export const metadata: Metadata = {
  title: "Final Year Projects with Code & Report",
};

export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

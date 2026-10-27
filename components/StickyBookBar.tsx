"use client";

import { useEffect, useState } from "react";
import CheckoutButton from "@/components/CheckoutButton";
import {
  BASE_PRICE_INR,
  chargeInr,
  deliveryBadgeLabel,
  formatInr,
  type DeliveryMode,
} from "@/lib/pricing";

type Props = {
  sentinelId?: string;
  projectSlug: string;
  projectTitle: string;
  deliveryMode: DeliveryMode;
};

export default function StickyBookBar({
  sentinelId = "project-hero",
  projectSlug,
  projectTitle,
  deliveryMode,
}: Props) {
  const [visible, setVisible] = useState(false);
  const due = chargeInr(deliveryMode, []);

  useEffect(() => {
    const el = document.getElementById(sentinelId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-48px 0px 0px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sentinelId]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-border bg-paper-card/95 backdrop-blur-md px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgba(11,31,58,0.25)]"
      role="region"
      aria-label="Buy this project"
    >
      <div className="mx-auto max-w-6xl flex items-center gap-3 pr-14">
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-semibold text-text truncate">{projectTitle}</p>
          <p className="font-mono text-[11px] text-text-muted">
            {deliveryBadgeLabel(deliveryMode)}
            {deliveryMode === "free"
              ? " · Free ZIP"
              : ` · from ${formatInr(BASE_PRICE_INR)}`}
          </p>
        </div>
        <CheckoutButton
          projectSlug={projectSlug}
          projectTitle={projectTitle}
          deliveryMode={deliveryMode}
          addonIds={[]}
          amountInr={due}
          label={due < 1 ? "Get free ZIP" : `Pay · ${formatInr(due)}`}
          className="shrink-0 inline-flex items-center justify-center rounded-xl btn-primary px-4 py-2.5 font-mono text-sm font-medium"
        />
      </div>
    </div>
  );
}

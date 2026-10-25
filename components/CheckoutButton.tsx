"use client";

import { useState } from "react";
import CheckoutModal from "@/components/CheckoutModal";
import type { AddonId, DeliveryMode } from "@/lib/pricing";
import { formatInr } from "@/lib/pricing";

type Props = {
  projectSlug: string;
  projectTitle: string;
  deliveryMode: DeliveryMode;
  addonIds: AddonId[];
  amountInr: number;
  label?: string;
  className?: string;
};

export default function CheckoutButton({
  projectSlug,
  projectTitle,
  deliveryMode,
  addonIds,
  amountInr,
  label,
  className,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "inline-flex items-center justify-center rounded-xl btn-primary px-5 py-3 text-sm font-semibold"
        }
      >
        {label ?? `Pay ${formatInr(amountInr)}`}
      </button>
      <CheckoutModal
        open={open}
        onClose={() => setOpen(false)}
        projectSlug={projectSlug}
        projectTitle={projectTitle}
        deliveryMode={deliveryMode}
        addonIds={addonIds}
        amountInr={amountInr}
      />
    </>
  );
}

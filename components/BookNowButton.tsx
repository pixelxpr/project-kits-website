"use client";

import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import { BOOKING_FEE_INR } from "@/lib/booking";

type Props = {
  label?: string;
  full?: boolean;
  className?: string;
  projectSlug?: string;
  projectTitle?: string;
  preferredTier?: string;
  /** Visual variant for pricing cards */
  variant?: "primary" | "secondary";
};

export default function BookNowButton({
  label = `Book this project · ₹${BOOKING_FEE_INR}`,
  full = false,
  className,
  projectSlug,
  projectTitle,
  preferredTier,
  variant = "primary",
}: Props) {
  const [open, setOpen] = useState(false);

  const base =
    variant === "primary"
      ? "btn-primary"
      : "border border-border text-text hover:border-teal/50 hover:text-teal";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-mono text-sm font-medium transition-all ${base} ${
            full ? "w-full" : ""
          }`
        }
      >
        {label}
      </button>
      <BookingModal
        open={open}
        onClose={() => setOpen(false)}
        projectSlug={projectSlug}
        projectTitle={projectTitle}
        preferredTier={preferredTier}
      />
    </>
  );
}

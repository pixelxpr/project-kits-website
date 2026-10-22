"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import BookNowButton from "@/components/BookNowButton";
import { BOOKING_FEE_INR } from "@/lib/booking";
import type { ProjectRef } from "@/lib/whatsapp-messages";

export default function PricingTiers({ project }: { project?: ProjectRef }) {
  const hasProject = Boolean(project?.slug);
  const defaultTier =
    site.pricingTiers.find((t) => t.highlighted)?.name ?? site.pricingTiers[0]?.name ?? "Standard";
  const [selectedTier, setSelectedTier] = useState<string>(defaultTier);

  return (
    <div>
      <div className="flex items-center gap-3 mb-8 p-4 rounded-xl border border-dashed border-border bg-paper-raised">
        <p className="text-sm text-text-muted leading-relaxed">
          {hasProject ? (
            <>
              Pay ₹{BOOKING_FEE_INR} now to book this project. Package prices below are what you
              pay later after we confirm college details on WhatsApp — not the booking fee.
            </>
          ) : (
            <>
              A freelancer would charge{" "}
              <span className="text-text font-semibold">₹10,000–₹20,000</span> for the same
              project. Our kits start at{" "}
              <span className="text-teal font-semibold">₹1,499</span>. Book any project from ₹
              {BOOKING_FEE_INR} on its page — we confirm the rest on WhatsApp.
            </>
          )}
        </p>
      </div>

      {hasProject && (
        <p className="text-sm text-text-muted mb-4">
          Choose your preferred package{" "}
          <span className="text-text-faint">(you can change this on WhatsApp)</span>
        </p>
      )}

      <div className="grid sm:grid-cols-3 gap-4">
        {site.pricingTiers.map((tier) => {
          const isHighlighted = tier.highlighted;
          const hasSaving = !!tier.saving;
          const hasBadge = !!tier.badge;
          const isSelected = hasProject && selectedTier === tier.name;

          const cardClass = hasProject
            ? isSelected
              ? "border-2 border-teal bg-paper-card shadow-[0_12px_40px_-16px_rgba(13,115,119,0.35)] scale-[1.02] ring-2 ring-teal/20"
              : "border border-border bg-paper-card hover:border-teal/40 cursor-pointer"
            : isHighlighted
              ? "border-2 border-teal bg-paper-card shadow-[0_12px_40px_-16px_rgba(13,115,119,0.35)] scale-[1.02]"
              : "border border-border bg-paper-card hover:border-border-strong";

          const inner = (
            <>
              {hasBadge && (
                <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                  <span
                    className={`font-mono text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      isSelected || isHighlighted ? "bg-teal text-white" : "bg-text text-white"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display font-bold text-text text-lg">{tier.name}</p>
                  {hasProject && (
                    <span
                      className={`w-4 h-4 rounded-full border-2 shrink-0 ${
                        isSelected ? "border-teal bg-teal" : "border-border"
                      }`}
                      aria-hidden
                    />
                  )}
                </div>
                <p className="text-xs text-text-muted mt-1">{tier.description}</p>

                <div className="mt-5 mb-1">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`font-display text-4xl font-extrabold ${
                        isSelected || isHighlighted ? "text-teal" : "text-text"
                      }`}
                    >
                      {tier.price}
                    </span>
                    <span className="text-sm text-text-muted line-through">
                      {tier.originalPrice}
                    </span>
                  </div>
                  {hasSaving && (
                    <span className="inline-block mt-1.5 font-mono text-[11px] font-semibold bg-success/10 text-success border border-success/25 px-2 py-0.5 rounded-full">
                      {tier.saving}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 mt-3 mb-5">
                  <svg
                    className="w-3.5 h-3.5 text-teal shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-xs text-text-muted">
                    Delivered within{" "}
                    <span className="text-text font-medium">{tier.deliveryHours} hours</span> via
                    WhatsApp
                  </span>
                </div>

                <div className="border-t border-border mb-5" />

                <ul className="space-y-2.5 text-sm text-text-muted flex-1">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-success font-mono mt-0.5 shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {!hasProject && (
                  <Link
                    href="/final-year-projects"
                    className={`mt-6 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                      isHighlighted
                        ? "btn-primary"
                        : "border border-border text-text hover:border-teal/50 hover:text-teal"
                    }`}
                  >
                    Choose a project to book
                  </Link>
                )}
              </div>
            </>
          );

          if (hasProject) {
            return (
              <button
                key={tier.name}
                type="button"
                onClick={() => setSelectedTier(tier.name)}
                aria-pressed={isSelected}
                className={`rounded-2xl flex flex-col relative text-left transition-all duration-300 w-full ${cardClass}`}
              >
                {inner}
              </button>
            );
          }

          return (
            <div
              key={tier.name}
              className={`rounded-2xl flex flex-col relative transition-all duration-300 ${cardClass}`}
            >
              {inner}
            </div>
          );
        })}
      </div>

      {hasProject && (
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl border border-border bg-paper-card">
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold text-text">
              Book this project · ₹{BOOKING_FEE_INR}
            </p>
            <p className="text-sm text-text-muted mt-1">
              Preferred package:{" "}
              <span className="text-text font-medium">{selectedTier}</span> — paid after WhatsApp
              confirmation, not now.
            </p>
          </div>
          <BookNowButton
            label={`Book · ₹${BOOKING_FEE_INR}`}
            projectSlug={project!.slug}
            projectTitle={project!.title}
            preferredTier={selectedTier}
            className="shrink-0 inline-flex items-center justify-center rounded-xl btn-primary px-6 py-3 text-sm font-semibold"
          />
        </div>
      )}

      <div className="flex items-start gap-3 mt-6 p-4 rounded-xl border border-success/20 bg-success/5">
        <div>
          <p className="text-sm font-semibold text-text">Satisfaction guarantee</p>
          <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
            Not happy with the kit after delivery? Message us within 24 hours and we&apos;ll either
            fix it or refund the kit price — no questions asked. The ₹{BOOKING_FEE_INR} booking fee
            is non-refundable.
          </p>
        </div>
      </div>
    </div>
  );
}

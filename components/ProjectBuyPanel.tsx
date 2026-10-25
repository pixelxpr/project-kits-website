"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";
import {
  BASE_EXCLUDES_NOTE,
  BASE_INCLUDES,
  BASE_PRICE_INR,
  PRICING_ADDONS,
  chargeInr,
  formatInr,
  fullOrderInr,
  type AddonId,
  type DeliveryMode,
} from "@/lib/pricing";

export default function ProjectBuyPanel({
  projectSlug,
  projectTitle,
  deliveryMode,
  homepage = false,
}: {
  projectSlug?: string;
  projectTitle?: string;
  deliveryMode?: DeliveryMode;
  /** Homepage pricing explainer (no project) */
  homepage?: boolean;
}) {
  const mode: DeliveryMode = deliveryMode ?? "instant";
  const [addons, setAddons] = useState<AddonId[]>([]);

  const toggle = (id: AddonId) => {
    setAddons((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const full = useMemo(() => fullOrderInr(addons), [addons]);
  const due = useMemo(() => chargeInr(mode, addons), [mode, addons]);

  if (homepage) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl border-2 border-teal bg-paper-card p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-teal mb-2">
            Flat package
          </p>
          <p className="font-display text-4xl font-extrabold text-teal">{formatInr(BASE_PRICE_INR)}</p>
          <p className="text-sm text-text-muted mt-2 leading-relaxed">
            Code + 8-chapter report + slides (placeholder name/college). Instant download on ready
            projects · 50% now on made-to-order.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-text-muted">
            {BASE_INCLUDES.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-success font-mono">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-text-faint leading-relaxed">{BASE_EXCLUDES_NOTE}</p>
          <div className="mt-6 border-t border-border pt-5">
            <p className="font-display font-semibold text-text mb-3">Optional add-ons</p>
            <ul className="space-y-2 text-sm text-text-muted">
              {PRICING_ADDONS.map((a) => (
                <li key={a.id} className="flex justify-between gap-4">
                  <span>{a.name}</span>
                  <span className="font-mono text-text shrink-0">+{formatInr(a.priceInr)}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/final-year-projects"
            className="mt-6 flex items-center justify-center rounded-xl btn-primary px-6 py-3 text-sm font-semibold"
          >
            Choose a project to buy
          </Link>
        </div>
      </div>
    );
  }

  const isInstant = mode === "instant";

  return (
    <div>
      <div
        className={`mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${
          isInstant
            ? "border-teal/40 bg-teal/10 text-teal"
            : "border-border bg-paper-raised text-text-muted"
        }`}
      >
        {isInstant ? "Instant download after payment" : "50% now · deliver in a few hours"}
      </div>

      <div className="rounded-2xl border-2 border-teal bg-paper-card p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="font-display text-lg font-bold text-text">Project package</p>
            <p className="text-xs text-text-muted mt-1">
              Code + report + slides · placeholders for your details
            </p>
          </div>
          <p className="font-display text-3xl font-extrabold text-teal">
            {formatInr(BASE_PRICE_INR)}
          </p>
        </div>
        <ul className="mt-5 space-y-2 text-sm text-text-muted">
          {BASE_INCLUDES.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-success font-mono">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-text-faint leading-relaxed">{BASE_EXCLUDES_NOTE}</p>
      </div>

      <p className="font-display font-semibold text-text mt-8 mb-3">Add-ons (optional)</p>
      <ul className="space-y-3">
        {PRICING_ADDONS.map((a) => {
          const on = addons.includes(a.id);
          return (
            <li key={a.id}>
              <label
                className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                  on ? "border-teal bg-teal/5" : "border-border bg-paper-card hover:border-teal/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(a.id)}
                  className="mt-1 accent-[var(--teal,#0D7377)]"
                />
                <span className="flex-1 min-w-0">
                  <span className="flex justify-between gap-3">
                    <span className="font-medium text-text text-sm">{a.name}</span>
                    <span className="font-mono text-sm text-teal shrink-0">
                      +{formatInr(a.priceInr)}
                    </span>
                  </span>
                  <span className="block text-xs text-text-muted mt-1 leading-relaxed">
                    {a.description}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 p-5 rounded-xl border border-border bg-paper-raised flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-text-muted">
            Package total{" "}
            <span className="font-semibold text-text">{formatInr(full)}</span>
            {!isInstant && (
              <>
                {" "}
                · pay now{" "}
                <span className="font-semibold text-teal">{formatInr(due)}</span> (50%)
              </>
            )}
          </p>
          <p className="text-xs text-text-faint mt-1">
            {isInstant
              ? "After payment you get a download link for the ZIP."
              : "We WhatsApp you after payment and deliver the project in a few hours. Balance due on delivery."}
          </p>
        </div>
        <CheckoutButton
          projectSlug={projectSlug!}
          projectTitle={projectTitle!}
          deliveryMode={mode}
          addonIds={addons}
          amountInr={due}
          label={isInstant ? `Pay ${formatInr(due)} · download` : `Pay ${formatInr(due)} · 50%`}
          className="shrink-0 inline-flex items-center justify-center rounded-xl btn-primary px-6 py-3 text-sm font-semibold"
        />
      </div>

      <div className="flex items-start gap-3 mt-6 p-4 rounded-xl border border-success/20 bg-success/5">
        <div>
          <p className="text-sm font-semibold text-text">Satisfaction note</p>
          <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
            Instant downloads are final once the ZIP link is issued. Made-to-order deposits are
            applied to your order; see Refund Policy for details.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useId, useState } from "react";
import { BOOKING_FEE_INR } from "@/lib/booking";
import { site } from "@/lib/site";

type Props = {
  open: boolean;
  onClose: () => void;
  projectSlug?: string;
  projectTitle?: string;
  preferredTier?: string;
};

type RazorpaySuccess = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  notes: Record<string, string>;
  theme: { color: string };
  handler: (response: RazorpaySuccess) => void;
  modal?: { ondismiss?: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function track(event: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", event, params);
}

export default function BookingModal({
  open,
  onClose,
  projectSlug,
  projectTitle,
  preferredTier,
}: Props) {
  const titleId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, busy, onClose]);

  useEffect(() => {
    if (!open) {
      setError(null);
      setDone(false);
      setBusy(false);
    }
  }, [open]);

  if (!open) return null;

  async function onPay(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    track("booking_start", {
      project_slug: projectSlug ?? "general",
      preferred_tier: preferredTier ?? "",
    });

    try {
      const orderRes = await fetch("/api/booking/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          projectSlug,
          projectTitle,
          preferredTier,
        }),
      });
      const orderJson = (await orderRes.json()) as {
        error?: string;
        orderId?: string;
        amount?: number;
        currency?: string;
        keyId?: string;
        name?: string;
        email?: string;
        phone?: string;
      };
      if (!orderRes.ok || !orderJson.orderId || !orderJson.keyId) {
        throw new Error(orderJson.error ?? "Could not start payment.");
      }

      const ok = await loadRazorpayScript();
      if (!ok || !window.Razorpay) {
        throw new Error("Payment widget failed to load. Check your connection and try again.");
      }

      const rzp = new window.Razorpay({
        key: orderJson.keyId,
        amount: orderJson.amount ?? BOOKING_FEE_INR * 100,
        currency: orderJson.currency ?? "INR",
        name: site.brandName,
          description: projectTitle
          ? `Booking fee — ${projectTitle}`
          : "Project booking fee",
        order_id: orderJson.orderId,
        prefill: {
          name: orderJson.name ?? name,
          email: orderJson.email ?? email,
          contact: orderJson.phone ?? phone,
        },
        notes: {
          project_slug: projectSlug ?? "",
          preferred_tier: preferredTier ?? "",
        },
        theme: { color: "#0D7377" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/booking/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                email,
                phone,
                projectSlug,
                projectTitle,
                preferredTier,
                ...response,
              }),
            });
            const verifyJson = (await verifyRes.json()) as { error?: string; ok?: boolean };
            if (!verifyRes.ok || !verifyJson.ok) {
              throw new Error(verifyJson.error ?? "Payment received but verification failed. Message us on WhatsApp with your payment ID.");
            }
            track("booking_paid", {
              project_slug: projectSlug ?? "general",
              preferred_tier: preferredTier ?? "",
            });
            setDone(true);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Verification failed.");
          } finally {
            setBusy(false);
          }
        },
        modal: {
          ondismiss: () => setBusy(false),
        },
      });
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-text/50 backdrop-blur-[2px]"
        aria-label="Close"
        disabled={busy}
        onClick={() => !busy && onClose()}
      />
      <div className="relative w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-border bg-paper-card shadow-xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 p-5 border-b border-border">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-teal">Book a project</p>
            <h2 id={titleId} className="font-display text-xl font-bold text-text mt-1">
              {done ? "Booking confirmed" : `Pay ₹${BOOKING_FEE_INR} to book`}
            </h2>
            {projectTitle && !done && (
              <p className="text-sm text-text-muted mt-1">{projectTitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => !busy && onClose()}
            disabled={busy}
            className="text-text-muted hover:text-text p-1 rounded-lg"
            aria-label="Close dialog"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {done ? (
          <div className="p-5 space-y-4">
            <p className="text-text-muted text-sm leading-relaxed">
              We received your ₹{BOOKING_FEE_INR} booking fee. Our team will message you on WhatsApp
              at the number you shared — usually within a few hours — to confirm your project and
              collect college details.
            </p>
            <p className="font-mono text-xs text-text-faint">
              Keep this number reachable. Questions meanwhile? Use Contact on WhatsApp in the header.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full btn-primary rounded-xl py-3 text-sm font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={onPay} className="p-5 space-y-4">
            <p className="text-sm text-text-muted leading-relaxed">
              ₹{BOOKING_FEE_INR} holds your project slot. Non-refundable booking fee. We WhatsApp
              you after payment to finalize the package (₹1,499–₹3,499).
            </p>

            {preferredTier && (
              <p className="font-mono text-xs text-teal bg-teal/10 border border-teal/20 rounded-lg px-3 py-2">
                Preferred tier: {preferredTier}
              </p>
            )}

            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-faint">Full name</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-paper px-3 py-2.5 text-sm text-text outline-none focus:border-teal"
                placeholder="Anita Sharma"
                autoComplete="name"
              />
            </label>

            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-faint">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-paper px-3 py-2.5 text-sm text-text outline-none focus:border-teal"
                placeholder="you@college.edu"
                autoComplete="email"
              />
            </label>

            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-faint">WhatsApp number</span>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-paper px-3 py-2.5 text-sm text-text outline-none focus:border-teal"
                placeholder="98XXXXXXXX"
                autoComplete="tel"
                inputMode="numeric"
              />
            </label>

            {error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full btn-primary rounded-xl py-3 text-sm font-semibold disabled:opacity-60"
            >
              {busy ? "Opening payment…" : `Pay ₹${BOOKING_FEE_INR} & book`}
            </button>

            <p className="text-[11px] text-text-faint leading-relaxed text-center">
              Secured by Razorpay ·{" "}
              <a href="/refund" className="text-teal hover:underline">
                Booking fee policy
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

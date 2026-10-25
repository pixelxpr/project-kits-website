"use client";

import { useEffect, useId, useState } from "react";
import { site } from "@/lib/site";
import type { AddonId, DeliveryMode } from "@/lib/pricing";
import { formatInr } from "@/lib/pricing";

type Props = {
  open: boolean;
  onClose: () => void;
  projectSlug: string;
  projectTitle: string;
  deliveryMode: DeliveryMode;
  addonIds: AddonId[];
  amountInr: number;
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
    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );
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

export default function CheckoutModal({
  open,
  onClose,
  projectSlug,
  projectTitle,
  deliveryMode,
  addonIds,
  amountInr,
}: Props) {
  const titleId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const isInstant = deliveryMode === "instant";

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
      setBusy(false);
      setDone(false);
      setDownloadUrl(null);
    }
  }, [open]);

  if (!open) return null;

  const pay = async () => {
    setError(null);
    setBusy(true);
    try {
      const orderRes = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          projectSlug,
          projectTitle,
          deliveryMode,
          addonIds,
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
        throw new Error("Could not load Razorpay. Check your connection and try again.");
      }

      await new Promise<void>((resolve, reject) => {
        const rzp = new window.Razorpay!({
          key: orderJson.keyId!,
          amount: orderJson.amount ?? amountInr * 100,
          currency: orderJson.currency ?? "INR",
          name: site.brandName,
          description: `${projectTitle} (${deliveryMode})`,
          order_id: orderJson.orderId!,
          prefill: {
            name: orderJson.name ?? name,
            email: orderJson.email ?? email,
            contact: orderJson.phone ?? phone,
          },
          notes: {
            project_slug: projectSlug,
            delivery_mode: deliveryMode,
            addons: addonIds.join(","),
          },
          theme: { color: "#0D7377" },
          handler: async (response) => {
            try {
              const verifyRes = await fetch("/api/checkout/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name,
                  email,
                  phone,
                  projectSlug,
                  projectTitle,
                  deliveryMode,
                  addonIds,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });
              const verifyJson = (await verifyRes.json()) as {
                error?: string;
                downloadUrl?: string | null;
              };
              if (!verifyRes.ok) {
                throw new Error(verifyJson.error ?? "Payment verification failed.");
              }
              track("purchase", {
                project_slug: projectSlug,
                delivery_mode: deliveryMode,
                value: String(amountInr),
              });
              setDownloadUrl(verifyJson.downloadUrl ?? null);
              setDone(true);
              resolve();
            } catch (e) {
              reject(e);
            }
          },
          modal: {
            ondismiss: () => {
              setBusy(false);
              resolve();
            },
          },
        });
        rzp.open();
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-text/40 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={() => !busy && onClose()}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-border bg-paper-card shadow-xl p-6 max-h-[90vh] overflow-y-auto"
      >
        <h2 id={titleId} className="font-display text-xl font-bold text-text">
          {done
            ? isInstant
              ? "Payment confirmed"
              : "Booking confirmed"
            : `Pay ${formatInr(amountInr)}`}
        </h2>
        <p className="text-sm text-text-muted mt-1">{projectTitle}</p>

        {done ? (
          <div className="mt-6 space-y-4">
            {isInstant && downloadUrl ? (
              <>
                <p className="text-sm text-text-muted leading-relaxed">
                  Your ZIP is ready. The link expires in about an hour — download it now.
                </p>
                <a
                  href={downloadUrl}
                  className="flex items-center justify-center rounded-xl btn-primary px-5 py-3 text-sm font-semibold"
                >
                  Download ZIP
                </a>
              </>
            ) : isInstant && !downloadUrl ? (
              <p className="text-sm text-text-muted leading-relaxed">
                Payment received. We will WhatsApp your download link shortly if the file is still
                being attached.
              </p>
            ) : (
              <p className="text-sm text-text-muted leading-relaxed">
                We received your 50% payment. Our team will message you on WhatsApp to confirm
                details and deliver within a few hours. Balance is due on delivery.
              </p>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl border border-border py-3 text-sm font-semibold text-text hover:border-teal/40"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void pay();
            }}
          >
            <p className="text-xs text-text-faint leading-relaxed">
              {isInstant
                ? "Pay in full for instant ZIP download after payment."
                : `Pay ${formatInr(amountInr)} now (50%). We deliver in a few hours via WhatsApp.`}
            </p>
            <label className="block">
              <span className="text-xs font-medium text-text-muted">Full name</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-paper px-3 py-2.5 text-sm text-text"
                autoComplete="name"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-text-muted">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-paper px-3 py-2.5 text-sm text-text"
                autoComplete="email"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-text-muted">WhatsApp phone</span>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile"
                className="mt-1 w-full rounded-lg border border-border bg-paper px-3 py-2.5 text-sm text-text"
                autoComplete="tel"
              />
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl btn-primary py-3 text-sm font-semibold disabled:opacity-60"
            >
              {busy ? "Opening payment…" : `Pay ${formatInr(amountInr)}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

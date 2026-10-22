/**
 * Booking fee (INR) — set via env so you can change without a code deploy of magic numbers.
 * Prefer NEXT_PUBLIC_BOOKING_FEE_INR so the UI and Razorpay amount stay in sync.
 */
function parseBookingFeeInr(): number {
  const raw =
    process.env.NEXT_PUBLIC_BOOKING_FEE_INR ??
    process.env.BOOKING_FEE_INR ??
    "49";
  const n = Number.parseInt(String(raw).trim(), 10);
  return Number.isFinite(n) && n >= 1 ? n : 49;
}

/** Non-refundable hold; we WhatsApp after payment. */
export const BOOKING_FEE_INR = parseBookingFeeInr();
export const BOOKING_FEE_PAISE = BOOKING_FEE_INR * 100;

export type BookingPayload = {
  name: string;
  email: string;
  phone: string;
  projectSlug?: string;
  projectTitle?: string;
  preferredTier?: string;
};

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  return digits;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 12 && digits.startsWith("91"));
}

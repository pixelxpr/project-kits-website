import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { BOOKING_FEE_INR, type BookingPayload } from "@/lib/booking";
import { appendBookingToSheet } from "@/lib/booking-sheet";

export const runtime = "nodejs";

type VerifyBody = BookingPayload & {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

function signaturesMatch(orderId: string, paymentId: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;
  const expected = createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  try {
    const a = Buffer.from(expected);
    const b = Buffer.from(signature);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: "Razorpay is not configured." }, { status: 503 });
  }

  let body: VerifyBody;
  try {
    body = (await req.json()) as VerifyBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing payment fields." }, { status: 400 });
  }

  if (!signaturesMatch(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  const paidAt = new Date().toISOString();
  await appendBookingToSheet({
    name: body.name?.trim() ?? "",
    email: body.email?.trim().toLowerCase() ?? "",
    phone: body.phone?.trim() ?? "",
    projectSlug: body.projectSlug,
    projectTitle: body.projectTitle,
    preferredTier: body.preferredTier,
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    amountInr: BOOKING_FEE_INR,
    paidAt,
  });

  return NextResponse.json({
    ok: true,
    paymentId: razorpay_payment_id,
    message: "Booking confirmed. We will message you on WhatsApp shortly.",
  });
}

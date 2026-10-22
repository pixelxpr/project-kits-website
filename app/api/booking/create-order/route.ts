import { NextResponse } from "next/server";
import {
  BOOKING_FEE_PAISE,
  isValidEmail,
  isValidPhone,
  normalizePhone,
  type BookingPayload,
} from "@/lib/booking";

export const runtime = "nodejs";

function razorpayAuthHeader(): string | null {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
}

export async function POST(req: Request) {
  const auth = razorpayAuthHeader();
  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!auth || !keyId) {
    return NextResponse.json(
      { error: "Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." },
      { status: 503 },
    );
  }

  let body: BookingPayload;
  try {
    body = (await req.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const phone = body.phone?.trim() ?? "";

  if (name.length < 2) {
    return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ error: "Please enter a valid 10-digit phone number." }, { status: 400 });
  }

  const notes = {
    name,
    email,
    phone: normalizePhone(phone),
    project_slug: body.projectSlug ?? "",
    project_title: body.projectTitle ?? "",
    preferred_tier: body.preferredTier ?? "",
    source: "finalyearkit_booking",
  };

  const receipt = `bk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  const rpRes = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: BOOKING_FEE_PAISE,
      currency: "INR",
      receipt: receipt.slice(0, 40),
      notes,
    }),
  });

  const rpJson = (await rpRes.json()) as { id?: string; error?: { description?: string } };
  if (!rpRes.ok || !rpJson.id) {
    console.error("[booking] razorpay order failed", rpJson);
    return NextResponse.json(
      { error: rpJson.error?.description ?? "Could not create payment order." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    orderId: rpJson.id,
    amount: BOOKING_FEE_PAISE,
    currency: "INR",
    keyId,
    name,
    email,
    phone: normalizePhone(phone),
  });
}

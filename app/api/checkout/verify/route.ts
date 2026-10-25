import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { appendBookingToSheet } from "@/lib/booking-sheet";
import {
  addonById,
  chargeInr,
  deliveryModeForSlug,
  type AddonId,
} from "@/lib/pricing";
import { getProject } from "@/lib/projects";
import { signedInstantDownloadUrl } from "@/lib/r2";

export const runtime = "nodejs";

type VerifyBody = {
  name?: string;
  email?: string;
  phone?: string;
  projectSlug?: string;
  projectTitle?: string;
  deliveryMode?: string;
  addonIds?: string[];
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

function sanitizeAddons(raw: string[] | undefined): AddonId[] {
  if (!Array.isArray(raw)) return [];
  const out: AddonId[] = [];
  for (const id of raw) {
    if (addonById(id) && !out.includes(id as AddonId)) out.push(id as AddonId);
  }
  return out;
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

  const projectSlug = body.projectSlug?.trim() ?? "";
  const project = getProject(projectSlug);
  if (!project) {
    return NextResponse.json({ error: "Unknown project." }, { status: 400 });
  }

  const deliveryMode = deliveryModeForSlug(projectSlug);
  const addonIds = sanitizeAddons(body.addonIds);
  const amountInr = chargeInr(deliveryMode, addonIds);

  let downloadUrl: string | null = null;
  if (deliveryMode === "instant") {
    downloadUrl = await signedInstantDownloadUrl(projectSlug);
  }

  const paidAt = new Date().toISOString();
  await appendBookingToSheet({
    name: body.name?.trim() ?? "",
    email: body.email?.trim().toLowerCase() ?? "",
    phone: body.phone?.trim() ?? "",
    projectSlug,
    projectTitle: project.title,
    preferredTier: `${deliveryMode}|${addonIds.join(",") || "base"}`,
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    amountInr,
    paidAt,
  });

  return NextResponse.json({
    ok: true,
    paymentId: razorpay_payment_id,
    deliveryMode,
    downloadUrl,
    message:
      deliveryMode === "instant"
        ? downloadUrl
          ? "Payment confirmed. Download your ZIP."
          : "Payment confirmed. We will WhatsApp your download link shortly."
        : "Payment confirmed. We will WhatsApp you shortly to deliver your project.",
  });
}

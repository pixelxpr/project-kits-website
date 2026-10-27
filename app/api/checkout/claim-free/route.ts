import { NextResponse } from "next/server";
import {
  isValidEmail,
  isValidPhone,
  normalizePhone,
} from "@/lib/booking";
import { appendBookingToSheet } from "@/lib/booking-sheet";
import {
  addonById,
  chargeInr,
  deliveryModeForSlug,
  offersZipDownload,
  type AddonId,
} from "@/lib/pricing";
import { getProject } from "@/lib/projects";
import { signedInstantDownloadUrl } from "@/lib/r2";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  projectSlug?: string;
  addonIds?: string[];
};

function sanitizeAddons(raw: string[] | undefined): AddonId[] {
  if (!Array.isArray(raw)) return [];
  const out: AddonId[] = [];
  for (const id of raw) {
    if (addonById(id) && !out.includes(id as AddonId)) out.push(id as AddonId);
  }
  return out;
}

/**
 * Gated free ZIP: contact required, no Razorpay when charge is ₹0.
 * Free + paid add-ons must use /api/checkout/create-order instead.
 */
export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const phone = body.phone?.trim() ?? "";
  const projectSlug = body.projectSlug?.trim() ?? "";
  const project = getProject(projectSlug);

  if (!project) {
    return NextResponse.json({ error: "Unknown project." }, { status: 400 });
  }
  if (name.length < 2) {
    return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ error: "Please enter a valid 10-digit phone number." }, { status: 400 });
  }

  const deliveryMode = deliveryModeForSlug(projectSlug);
  if (deliveryMode !== "free") {
    return NextResponse.json({ error: "This project is not free." }, { status: 400 });
  }

  const addonIds = sanitizeAddons(body.addonIds);
  const amountInr = chargeInr(deliveryMode, addonIds);
  if (amountInr > 0) {
    return NextResponse.json(
      { error: "Paid add-ons require checkout. Remove add-ons or use Pay." },
      { status: 400 },
    );
  }

  const downloadUrl = offersZipDownload(deliveryMode)
    ? await signedInstantDownloadUrl(projectSlug)
    : null;

  const paidAt = new Date().toISOString();
  const orderId = `free_${Date.now().toString(36)}`;

  await appendBookingToSheet({
    name,
    email,
    phone: normalizePhone(phone),
    projectSlug,
    projectTitle: project.title,
    preferredTier: `free|base`,
    paymentId: "free",
    orderId,
    amountInr: 0,
    paidAt,
  });

  return NextResponse.json({
    ok: true,
    deliveryMode: "free" as const,
    downloadUrl,
    amountInr: 0,
    message: downloadUrl
      ? "Free download ready."
      : "Claim recorded. We will WhatsApp your download link shortly.",
  });
}

import { NextResponse } from "next/server";
import {
  isValidEmail,
  isValidPhone,
  normalizePhone,
} from "@/lib/booking";
import {
  chargeInr,
  deliveryModeForSlug,
  type AddonId,
  type DeliveryMode,
  addonById,
} from "@/lib/pricing";
import { getProject } from "@/lib/projects";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  projectSlug?: string;
  projectTitle?: string;
  deliveryMode?: DeliveryMode;
  addonIds?: string[];
};

function razorpayAuthHeader(): string | null {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
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
  const auth = razorpayAuthHeader();
  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!auth || !keyId) {
    return NextResponse.json(
      { error: "Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." },
      { status: 503 },
    );
  }

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
  const addonIds = sanitizeAddons(body.addonIds);
  const amountInr = chargeInr(deliveryMode, addonIds);
  if (amountInr < 1) {
    return NextResponse.json(
      { error: "No payment due. Use the free download claim instead." },
      { status: 400 },
    );
  }
  const amountPaise = amountInr * 100;

  const notes = {
    name,
    email,
    phone: normalizePhone(phone),
    project_slug: projectSlug,
    project_title: project.title,
    delivery_mode: deliveryMode,
    addons: addonIds.join(","),
    amount_inr: String(amountInr),
    source: "finalyearkit_checkout",
  };

  const receipt = `ck_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  const rpRes = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountPaise,
      currency: "INR",
      receipt: receipt.slice(0, 40),
      notes,
    }),
  });

  const rpJson = (await rpRes.json()) as { id?: string; error?: { description?: string } };
  if (!rpRes.ok || !rpJson.id) {
    console.error("[checkout] razorpay order failed", rpJson);
    return NextResponse.json(
      { error: rpJson.error?.description ?? "Could not create payment order." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    orderId: rpJson.id,
    amount: amountPaise,
    currency: "INR",
    keyId,
    name,
    email,
    phone: normalizePhone(phone),
    deliveryMode,
    amountInr,
  });
}

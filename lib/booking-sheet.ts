import type { BookingPayload } from "@/lib/booking";

export type SheetBookingRow = BookingPayload & {
  paymentId: string;
  orderId: string;
  amountInr: number;
  paidAt: string;
};

/**
 * Appends a paid booking to a Google Sheet via Apps Script web app.
 * Set BOOKING_SHEET_WEBHOOK_URL in env (see docs/booking-setup.md).
 */
export async function appendBookingToSheet(row: SheetBookingRow): Promise<boolean> {
  const url = process.env.BOOKING_SHEET_WEBHOOK_URL;
  if (!url) {
    console.warn("[booking] BOOKING_SHEET_WEBHOOK_URL not set — skipping sheet write", row);
    return false;
  }

  try {
    // Apps Script returns 302 → googleusercontent echo URL. Clients must follow
    // as GET (not re-POST). Use text/plain so the body is still available as
    // e.postData.contents without a CORS preflight from browsers.
    const body = JSON.stringify(row);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
      redirect: "manual",
    });

    let finalRes = res;
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("Location");
      if (!location) {
        console.error("[booking] sheet webhook redirect missing Location", res.status);
        return false;
      }
      finalRes = await fetch(location, { method: "GET", redirect: "follow" });
    }

    if (!finalRes.ok) {
      console.error(
        "[booking] sheet webhook failed",
        finalRes.status,
        await finalRes.text()
      );
      return false;
    }
    return true;
  } catch (err) {
    console.error("[booking] sheet webhook error", err);
    return false;
  }
}

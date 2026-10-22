# Project booking (Razorpay + Google Sheet)

## Vercel environment variables

Project → **Settings** → **Environment Variables** → add for Production (and Preview if you test there):

| Variable | Example | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_BOOKING_FEE_INR` | `49` | Yes — fee shown in UI + charged |
| `RAZORPAY_KEY_ID` | `rzp_live_...` or `rzp_test_...` | Yes — returned to Checkout from the API |
| `RAZORPAY_KEY_SECRET` | `...` | Yes (server only — never expose) |
| `BOOKING_SHEET_WEBHOOK_URL` | `https://script.google.com/macros/s/.../exec` | Yes for Sheet rows |

You do **not** need a separate `NEXT_PUBLIC_RAZORPAY_KEY_ID`. The Key ID is not a secret (Checkout needs it), but we pass it from `/api/booking/create-order` so one server env var is enough.

After changing env vars (especially `NEXT_PUBLIC_*`), **redeploy** so the build picks them up.

Local: copy `.env.example` → `.env.local` and fill values.

---

## How to get the Google Sheet webhook URL

### 1. Create the spreadsheet

1. Go to [Google Sheets](https://sheets.google.com) → blank spreadsheet.
2. Name it e.g. `FinalYearKit Bookings`.
3. In row 1, put headers (one cell each):

   `paidAt` | `name` | `email` | `phone` | `projectSlug` | `projectTitle` | `preferredTier` | `paymentId` | `orderId` | `amountInr`

### 2. Open Apps Script

1. In the sheet: **Extensions** → **Apps Script**.
2. Delete any sample code. Paste this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.paidAt || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.projectSlug || "",
      data.projectTitle || "",
      data.preferredTier || "",
      data.paymentId || "",
      data.orderId || "",
      data.amountInr || "",
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/** Optional: open the web app URL in a browser to check deploy works. */
function doGet() {
  return ContentService.createTextOutput("FinalYearKit booking webhook OK");
}
```

3. Click **Save** (disk icon). Project name e.g. `BookingWebhook`.

### 3. Deploy as web app

1. **Deploy** → **New deployment**.
2. Gear icon → type **Web app**.
3. Settings:
   - **Description:** `booking v1`
   - **Execute as:** Me (your Google account)
   - **Who has access:** **Anyone**
4. **Deploy** → authorize Google when asked (Allow).
5. Copy the **Web app URL** — it looks like:

   `https://script.google.com/macros/s/AKfycb.../exec`

6. Paste that into Vercel as `BOOKING_SHEET_WEBHOOK_URL`.

### 4. Test the webhook (optional)

```bash
# Do not use curl -X POST with -L — that re-POSTs after Google's 302 and gets 405.
# -d alone POSTs once; -L then GETs the redirect for the {"ok":true} body.
curl -sS -L "$BOOKING_SHEET_WEBHOOK_URL" \
  -H "Content-Type: text/plain;charset=utf-8" \
  -d '{"paidAt":"2026-10-21T12:00:00Z","name":"Test","email":"t@test.com","phone":"919999999999","projectSlug":"pdf-rag-chat","projectTitle":"Chat with PDF","preferredTier":"Complete","paymentId":"pay_test","orderId":"order_test","amountInr":49}'
```

You should see `{"ok":true}` and a new row in the sheet.

**If you edit the script later:** Deploy → **Manage deployments** → edit → **New version** (same URL usually keeps working).

---

## Razorpay keys

1. [Razorpay Dashboard](https://dashboard.razorpay.com/) → **Account & Settings** → **API Keys**.
2. Generate **Test** keys first; switch to **Live** when ready.
3. Put Key ID in `RAZORPAY_KEY_ID` and Key Secret in `RAZORPAY_KEY_SECRET` (never commit the secret).

Payments always show in Razorpay even if the Sheet webhook fails.

---

## Ops after a booking

1. Check Sheet (or Razorpay Payments) for name / phone / project.  
2. WhatsApp them within a few hours.  
3. Confirm tier + college → collect remaining package payment.  
4. Deliver files.

## GA4

- `booking_start` — checkout opened  
- `booking_paid` — payment verified  

Mark `booking_paid` as a conversion in GA4 / Ads.

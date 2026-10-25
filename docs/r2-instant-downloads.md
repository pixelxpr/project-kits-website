# Instant ZIP hosting (signed downloads)

Private objects + short-lived signed download URLs after Razorpay payment. No public listing of ZIPs.

## Card required for Cloudflare R2?

**Yes — Cloudflare usually asks for a payment method before you can create an R2 bucket**, even though the free tier is $0 if you stay within limits. That is a billing-verification step, not a paid plan. If you do not want to add a card, **skip R2** and use one of the options below.

## Option 0 — No storage yet (works today)

Leave `R2_*` / `S3_*` unset. Instant checkout still succeeds; the buyer sees “we will WhatsApp your download link.” You send the ZIP from `dist/instant/{slug}.zip` manually. Fine until you want the Download button.

## Option A — Cloudflare R2 (card required)

1. [Cloudflare](https://dash.cloudflare.com/) → **R2** → add payment method when prompted → create bucket `finalyearkit-downloads` (private).
2. **Manage R2 API Tokens** → Object Read & Write on that bucket.
3. Set on Vercel:

| Variable | Example |
| --- | --- |
| `R2_ACCOUNT_ID` | Cloudflare account ID |
| `R2_ACCESS_KEY_ID` | From the API token |
| `R2_SECRET_ACCESS_KEY` | From the API token |
| `R2_BUCKET` | `finalyearkit-downloads` |

Upload keys: `instant/{slug}.zip` (see below).

## Option B — Supabase Storage (usually no card)

Free Supabase projects typically do **not** require a card for Storage.

1. Create a project at [supabase.com](https://supabase.com).
2. **Storage** → create a **private** bucket named e.g. `finalyearkit-downloads`.
3. **Project Settings → Storage → S3 access keys** (or “S3 protocol”) → create access key.
4. Set on Vercel (use these **instead of** `R2_*`):

| Variable | Example |
| --- | --- |
| `S3_ENDPOINT` | `https://YOUR_PROJECT_REF.storage.supabase.co/storage/v1/s3` |
| `S3_REGION` | `ap-south-1` (or whatever the dashboard shows) |
| `S3_ACCESS_KEY_ID` | From Supabase S3 keys |
| `S3_SECRET_ACCESS_KEY` | From Supabase S3 keys |
| `S3_BUCKET` | `finalyearkit-downloads` |

5. Upload objects as `instant/{slug}.zip` into that bucket (dashboard upload or AWS CLI with `--endpoint-url` = `S3_ENDPOINT`).

`lib/r2.ts` prefers `S3_ENDPOINT` when set; otherwise it uses Cloudflare R2 env vars.

## Build ZIPs locally

```bash
npm run package:instant
# or one slug:
node scripts/package-instant-zips.mjs pdf-rag-chat
```

Output: `dist/instant/{slug}.zip`

## Upload (R2 or any S3-compatible endpoint)

### Wrangler (R2 only)

```bash
npx wrangler r2 object put finalyearkit-downloads/instant/pdf-rag-chat.zip \
  --file=dist/instant/pdf-rag-chat.zip \
  --remote
```

### AWS CLI (R2 or Supabase)

```bash
# R2 example:
aws s3 cp dist/instant/pdf-rag-chat.zip \
  s3://finalyearkit-downloads/instant/pdf-rag-chat.zip \
  --endpoint-url "https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com"

# Supabase: same command, --endpoint-url "$S3_ENDPOINT"
```

Loop:

```bash
for f in dist/instant/*.zip; do
  slug=$(basename "$f")
  aws s3 cp "$f" "s3://$S3_BUCKET/instant/$slug" \
    --endpoint-url "$S3_ENDPOINT"
done
```

## Re-publish after kit updates

1. Re-run `npm run package:instant` (or one slug)
2. Re-upload `instant/{slug}.zip`
3. Add new Instant slugs in `lib/pricing.ts` (`INSTANT_SLUGS`) and `SOURCE_DIRS` in the packaging script when you expand the catalog.

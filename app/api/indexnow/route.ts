import { NextResponse } from "next/server";
import {
  getIndexNowUrlList,
  submitToIndexNow,
} from "@/lib/indexnow";

export const runtime = "nodejs";

function authorized(req: Request): boolean {
  const secret = process.env.INDEXNOW_SECRET;
  if (!secret) return false;

  const header =
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    req.headers.get("x-indexnow-secret");
  const url = new URL(req.url);
  const query = url.searchParams.get("secret");

  return header === secret || query === secret;
}

/**
 * POST /api/indexnow
 * Auth: Authorization: Bearer $INDEXNOW_SECRET  (or ?secret= / x-indexnow-secret)
 * Optional JSON body: { "urls": ["https://finalyearkit.com/..."] }
 * Omitting urls submits the full sitemap set.
 */
export async function POST(req: Request) {
  if (!process.env.INDEXNOW_SECRET) {
    return NextResponse.json(
      {
        error:
          "INDEXNOW_SECRET is not set. Add it in Vercel env vars before submitting.",
      },
      { status: 503 },
    );
  }

  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let urls = getIndexNowUrlList();

  try {
    const body = (await req.json()) as { urls?: string[] };
    if (Array.isArray(body?.urls) && body.urls.length > 0) {
      urls = body.urls;
    }
  } catch {
    // empty body → full list
  }

  const results = await submitToIndexNow(urls);
  const ok = results.every((r) => r.ok);

  return NextResponse.json(
    {
      ok,
      host: "finalyearkit.com",
      urlCount: urls.length,
      results,
    },
    { status: ok ? 200 : 502 },
  );
}

/** Quick check that the route is deployed (does not submit). */
export async function GET() {
  return NextResponse.json({
    ready: Boolean(process.env.INDEXNOW_SECRET),
    hint: "POST with Authorization: Bearer $INDEXNOW_SECRET to submit URLs",
    keyFile: "https://finalyearkit.com/296f4cd616cd49dcbc8958314d8b0196.txt",
  });
}

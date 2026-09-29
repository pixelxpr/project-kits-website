import { projects } from "@/lib/projects";
import { blogPosts } from "@/lib/blog";
import { categoryHubs, degreeHubs, mainCatalogHub } from "@/lib/project-hubs";

/** Public IndexNow key — must match /public/{key}.txt */
export const INDEXNOW_KEY = "296f4cd616cd49dcbc8958314d8b0196";

export const INDEXNOW_HOST = "finalyearkit.com";

export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

const BASE = `https://${INDEXNOW_HOST}`;

/** Every URL we want Bing/others to discover (mirrors sitemap). */
export function getIndexNowUrlList(): string[] {
  const urls = [
    BASE,
    `${BASE}${mainCatalogHub.path}`,
    ...categoryHubs.map((h) => `${BASE}${h.path}`),
    ...degreeHubs.map((h) => `${BASE}${h.path}`),
    `${BASE}/about`,
    `${BASE}/blog`,
    `${BASE}/privacy`,
    `${BASE}/terms`,
    `${BASE}/refund`,
    ...projects.map((p) => `${BASE}/projects/${p.slug}`),
    ...blogPosts.map((p) => `${BASE}/blog/${p.slug}`),
  ];
  return [...new Set(urls)];
}

export type IndexNowResult = {
  ok: boolean;
  status: number;
  submitted: number;
  body: string;
};

/**
 * POST URL list to IndexNow (Bing + participating engines).
 * Max ~10k URLs per request; we chunk at 100 for safety.
 */
export async function submitToIndexNow(
  urls: string[],
  fetchImpl: typeof fetch = fetch,
): Promise<IndexNowResult[]> {
  const unique = [...new Set(urls)].filter((u) =>
    u.startsWith(`https://${INDEXNOW_HOST}/`) || u === `https://${INDEXNOW_HOST}`,
  );

  if (unique.length === 0) {
    return [{ ok: false, status: 400, submitted: 0, body: "No valid URLs" }];
  }

  const chunkSize = 100;
  const results: IndexNowResult[] = [];

  for (let i = 0; i < unique.length; i += chunkSize) {
    const chunk = unique.slice(i, i + chunkSize);
    const res = await fetchImpl("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList: chunk,
      }),
    });

    const body = await res.text().catch(() => "");
    // IndexNow treats 200 and 202 as success; 422 often means key/host mismatch.
    results.push({
      ok: res.status === 200 || res.status === 202,
      status: res.status,
      submitted: chunk.length,
      body: body.slice(0, 500),
    });
  }

  return results;
}

#!/usr/bin/env node
/**
 * Submit FinalYearKit URLs to IndexNow (Bing + others).
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs
 *   node scripts/submit-indexnow.mjs https://finalyearkit.com/final-year-projects
 *
 * Or hit the deployed API (needs INDEXNOW_SECRET in env):
 *   INDEXNOW_SECRET=... node scripts/submit-indexnow.mjs --via-api
 */

const HOST = "finalyearkit.com";
const KEY = "296f4cd616cd49dcbc8958314d8b0196";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const BASE = `https://${HOST}`;

const STATIC = [
  BASE,
  `${BASE}/final-year-projects`,
  `${BASE}/final-year-projects/ai-ml`,
  `${BASE}/final-year-projects/mern`,
  `${BASE}/final-year-projects/ecommerce`,
  `${BASE}/final-year-projects/mobile`,
  `${BASE}/btech-projects`,
  `${BASE}/bca-projects`,
  `${BASE}/bba-projects`,
  `${BASE}/mca-projects`,
  `${BASE}/about`,
  `${BASE}/blog`,
  `${BASE}/privacy`,
  `${BASE}/terms`,
  `${BASE}/refund`,
];

async function urlsFromSitemap() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return locs.length ? locs : STATIC;
}

async function submitDirect(urls) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });
  const body = await res.text();
  return { status: res.status, body, ok: res.status === 200 || res.status === 202 };
}

async function submitViaApi(urls) {
  const secret = process.env.INDEXNOW_SECRET;
  if (!secret) {
    throw new Error("Set INDEXNOW_SECRET to call the deployed /api/indexnow route");
  }
  const res = await fetch(`${BASE}/api/indexnow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({ urls }),
  });
  const json = await res.json();
  return { status: res.status, body: JSON.stringify(json), ok: res.ok && json.ok };
}

async function main() {
  const args = process.argv.slice(2).filter((a) => a !== "--via-api");
  const viaApi = process.argv.includes("--via-api");

  let urls;
  if (args.length) {
    urls = args;
  } else {
    try {
      urls = await urlsFromSitemap();
      console.log(`Loaded ${urls.length} URLs from sitemap.xml`);
    } catch (e) {
      console.warn("Sitemap fetch failed, using static list:", e.message);
      urls = STATIC;
    }
  }

  // IndexNow allows large batches; keep under 100 per request
  const chunkSize = 100;
  let allOk = true;

  for (let i = 0; i < urls.length; i += chunkSize) {
    const chunk = urls.slice(i, i + chunkSize);
    const result = viaApi
      ? await submitViaApi(chunk)
      : await submitDirect(chunk);
    console.log(
      `Chunk ${i / chunkSize + 1}: ${chunk.length} urls → HTTP ${result.status} ${result.ok ? "OK" : "FAIL"}`,
    );
    if (result.body) console.log(result.body.slice(0, 300));
    if (!result.ok) allOk = false;
  }

  if (!allOk) process.exit(1);
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

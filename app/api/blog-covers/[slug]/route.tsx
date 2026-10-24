import { readFile } from "fs/promises";
import path from "path";
import { getBlogPost } from "@/lib/blog";

/** Legacy OG URL — serve the static diagram (no redirect chain). */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!getBlogPost(slug)) return new Response("Not found", { status: 404 });

  try {
    const file = path.join(process.cwd(), "public", "blog-covers", `${slug}.jpg`);
    const buf = await readFile(file);
    return new Response(buf, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

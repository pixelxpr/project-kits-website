import { NextResponse } from "next/server";
import { getBlogPost } from "@/lib/blog";
import { blogCoverSrc } from "@/lib/blog-cover";

/** Legacy OG URL — redirect to the static diagram cover. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!getBlogPost(slug)) return new Response("Not found", { status: 404 });
  return NextResponse.redirect(new URL(blogCoverSrc(slug), "https://finalyearkit.com"), 308);
}

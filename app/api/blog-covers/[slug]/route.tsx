import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/blog";

const W = 1280;
const H = 720;

const CATEGORY_COLOR: Record<string, string> = {
  Architecture: "#0D7377",
  "Viva Prep": "#0B1F3A",
  Guides: "#1A7F4B",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return new Response("Not found", { status: 404 });

  const color = CATEGORY_COLOR[post.category] ?? "#0D7377";

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          background: "#F4F7FB",
          display: "flex",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(11,31,58,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,31,58,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -60,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: color,
            opacity: 0.08,
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 100px",
            position: "relative",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div
              style={{
                background: `${color}14`,
                border: `1px solid ${color}40`,
                color,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: 6,
                display: "flex",
              }}
            >
              {post.category}
            </div>
            <div style={{ color: "#7A8BA3", fontSize: 14, display: "flex" }}>{post.readTime}</div>
          </div>
          <div
            style={{
              fontSize: post.title.length > 50 ? 48 : 58,
              fontWeight: 800,
              color: "#0B1F3A",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              maxWidth: 920,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              width: 56,
              height: 3,
              background: color,
              borderRadius: 2,
              marginTop: 36,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 20,
              color: "#4A5D78",
              lineHeight: 1.55,
              maxWidth: 780,
              marginTop: 24,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {post.excerpt}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 52,
              right: 100,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: color,
                display: "flex",
              }}
            />
            <div style={{ fontSize: 14, color: "#7A8BA3", letterSpacing: "0.06em", display: "flex" }}>
              finalyearkit.com
            </div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H }
  );
}

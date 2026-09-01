import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/blog";

export const runtime = "edge";

const W = 1280;
const H = 720;

const CATEGORY_COLOR: Record<string, string> = {
  "Architecture": "#22d3ee",
  "Viva Prep":    "#a78bfa",
  "Guides":       "#4ade80",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return new Response("Not found", { status: 404 });

  const color = CATEGORY_COLOR[post.category] ?? "#22d3ee";

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          background: "#0d1117",
          display: "flex",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, #30363d 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            opacity: 0.4,
            display: "flex",
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: -150,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: color,
            opacity: 0.05,
            filter: "blur(100px)",
            display: "flex",
          }}
        />

        {/* Content */}
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
          {/* Category + read time */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div
              style={{
                background: `${color}18`,
                border: `1px solid ${color}50`,
                color: color,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: 4,
                display: "flex",
              }}
            >
              {post.category}
            </div>
            <div
              style={{
                color: "#8b949e",
                fontSize: 14,
                fontFamily: "monospace",
                display: "flex",
              }}
            >
              {post.readTime}
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: post.title.length > 50 ? 52 : 64,
              fontWeight: 800,
              color: "#f0f6fc",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 900,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {post.title}
          </div>

          {/* Accent line */}
          <div
            style={{
              width: 56,
              height: 3,
              background: color,
              borderRadius: 2,
              marginTop: 40,
              display: "flex",
            }}
          />

          {/* Excerpt */}
          <div
            style={{
              fontSize: 20,
              color: "#8b949e",
              lineHeight: 1.55,
              maxWidth: 780,
              marginTop: 28,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {post.excerpt}
          </div>

          {/* Branding */}
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
            <div
              style={{
                fontSize: 14,
                color: "#8b949e",
                letterSpacing: "0.06em",
                display: "flex",
              }}
            >
              finalyearkit.com
            </div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H }
  );
}

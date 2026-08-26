import { ImageResponse } from "next/og";
import { getProject } from "@/lib/projects";

export const runtime = "edge";

const W = 1280;
const H = 720;

const CATEGORY: Record<string, { label: string; color: string }> = {
  "ai-ml":      { label: "AI / ML",      color: "#22d3ee" },
  "mern":       { label: "MERN Stack",   color: "#4ade80" },
  "ecommerce":  { label: "E-commerce",   color: "#a78bfa" },
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new Response("Not found", { status: 404 });

  const cat = CATEGORY[project.category] ?? { label: project.category, color: "#22d3ee" };

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
        {/* Subtle dot grid background */}
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

        {/* Accent glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: cat.color,
            opacity: 0.06,
            filter: "blur(80px)",
            display: "flex",
          }}
        />

        {/* ── LEFT PANEL ── */}
        <div
          style={{
            width: 680,
            height: H,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 56px 60px 64px",
            position: "relative",
          }}
        >
          {/* Category badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 28,
            }}
          >
            <div
              style={{
                background: `${cat.color}18`,
                border: `1px solid ${cat.color}50`,
                color: cat.color,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: 4,
                display: "flex",
              }}
            >
              {cat.label}
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 58,
              fontWeight: 800,
              color: "#f0f6fc",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 20,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {project.title}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 20,
              color: "#8b949e",
              lineHeight: 1.55,
              maxWidth: 520,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {project.tagline}
          </div>

          {/* Cyan accent line */}
          <div
            style={{
              width: 48,
              height: 3,
              background: cat.color,
              borderRadius: 2,
              marginTop: 36,
              display: "flex",
            }}
          />

          {/* Bottom branding */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: 64,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: "#8b949e",
                letterSpacing: "0.06em",
                display: "flex",
              }}
            >
              finalyearkit.com
            </div>
          </div>
        </div>

        {/* ── VERTICAL DIVIDER ── */}
        <div
          style={{
            width: 1,
            height: "60%",
            background: "#30363d",
            alignSelf: "center",
            display: "flex",
          }}
        />

        {/* ── RIGHT PANEL ── */}
        <div
          style={{
            flex: 1,
            height: H,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 64px 60px 56px",
          }}
        >
          {/* Tech stack */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginBottom: 40,
            }}
          >
            {project.techStack.slice(0, 4).map((t) => (
              <div
                key={t}
                style={{
                  background: "#161b22",
                  border: "1px solid #30363d",
                  color: "#8b949e",
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "monospace",
                  padding: "5px 12px",
                  borderRadius: 4,
                  marginRight: 8,
                  marginBottom: 8,
                  display: "flex",
                }}
              >
                {t}
              </div>
            ))}
          </div>

          {/* Features */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {project.features.slice(0, 3).map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    color: cat.color,
                    fontSize: 16,
                    fontWeight: 700,
                    marginRight: 12,
                    marginTop: 2,
                    display: "flex",
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    color: "#c9d1d9",
                    fontSize: 16,
                    lineHeight: 1.5,
                    flex: 1,
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {f}
                </div>
              </div>
            ))}
          </div>

          {/* What's included badge */}
          <div
            style={{
              marginTop: 32,
              background: "#161b22",
              border: "1px solid #30363d",
              borderRadius: 8,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: cat.color,
                fontSize: 13,
                marginRight: 10,
                display: "flex",
              }}
            >
              📦
            </div>
            <div
              style={{
                color: "#8b949e",
                fontSize: 13,
                display: "flex",
              }}
            >
              Source code · Report · Slides · Viva Q&amp;A
            </div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H }
  );
}

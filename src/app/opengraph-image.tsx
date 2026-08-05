import { ImageResponse } from "next/og";
import { config } from "@/data/config";

// Auto-generated Open Graph image (used for link previews on LinkedIn, X, etc.)
export const runtime = "nodejs";
export const alt = "Nilesh Raj — AI/ML Engineer & Forward Deployed Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 20% 20%, #1e293b 0%, #0b0f19 55%, #05070d 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
          color: "#f8fafc",
        }}
      >
        {/* Top row: eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "9999px",
              background: "#6366f1",
            }}
          />
          <div style={{ fontSize: "28px", color: "#94a3b8", letterSpacing: "2px" }}>
            PORTFOLIO
          </div>
        </div>

        {/* Middle: name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "104px", fontWeight: 800, lineHeight: 1.05 }}>
            {config.author}
          </div>
          <div style={{ fontSize: "40px", color: "#cbd5e1", marginTop: "12px" }}>
            AI/ML Engineer · Forward Deployed Engineer
          </div>
          <div style={{ fontSize: "28px", color: "#818cf8", marginTop: "24px" }}>
            LLMs · RAG · Agentic AI · LangGraph · CrewAI · FastAPI
          </div>
        </div>

        {/* Bottom row: site + github */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "26px",
            color: "#94a3b8",
          }}
        >
          <div>{config.site.replace("https://", "")}</div>
          <div>github.com/{config.githubUsername}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

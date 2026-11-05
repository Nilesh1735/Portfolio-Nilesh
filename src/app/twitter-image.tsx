import { ImageResponse } from "next/og";
import { config } from "@/data/config";

// Link preview image for LinkedIn, X and the like.
//
// Satori (which renders this) requires an explicit `display` on every element
// that has more than one child; without it the route throws at request time
// and the preview silently renders nothing. Every div below sets it.
export const runtime = "nodejs";
export const alt = "Nilesh Raj, Founder and AI Engineer at AgentNine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BRAND = "#dd0200";
const INK = "#0c0c0c";
const TEXT = "#f5f5f5";
const MUTED = "#8a8a8a";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
          background: INK,
          padding: "72px",
          fontFamily: "sans-serif",
          color: TEXT,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              width: "16px",
              height: "16px",
              borderRadius: "9999px",
              background: BRAND,
            }}
          />
          <div style={{ display: "flex", fontSize: "26px", color: MUTED, letterSpacing: "2px" }}>
            PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: "104px", fontWeight: 600, lineHeight: 1.05 }}>
            {config.author}
          </div>
          <div style={{ display: "flex", fontSize: "40px", color: TEXT, marginTop: "16px" }}>
            Founder and AI Engineer at AgentNine
          </div>
          <div style={{ display: "flex", fontSize: "26px", color: MUTED, marginTop: "20px" }}>
            Agentic AI · RAG · LangGraph · CrewAI · FastAPI · Next.js
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "24px",
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>{config.site.replace("https://", "")}</div>
          <div style={{ display: "flex" }}>github.com/{config.githubUsername}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

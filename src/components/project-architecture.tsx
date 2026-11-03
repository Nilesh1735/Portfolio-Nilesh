import React from "react";

/**
 * Static architecture diagrams, hand-rendered as inline SVG.
 *
 * These replaced a full ReactFlow graph runtime that was pulled in to draw
 * three fixed, non-interactive flows — the library was by far the most
 * expensive thing on the projects section for no behaviour the diagrams use.
 */

type Step = { label: string; accent?: "start" | "end" };
type Flow = { label: string; lanes: Step[][] };

const FLOWS: Record<string, Flow> = {
  agentnine: {
    label: "Next.js + Supabase",
    lanes: [
      [{ label: "Upstream Repo", accent: "start" }],
      [{ label: "Listing Intake" }],
      [{ label: "5-Point Verification" }],
      [{ label: "Setup + Access Notes" }, { label: "Supabase Postgres" }],
      [{ label: "Search + Filters" }],
      [{ label: "Browse / Compare", accent: "end" }],
    ],
  },
  "omnicrew-ai": {
    label: "CrewAI",
    lanes: [
      [{ label: "User Request", accent: "start" }],
      [{ label: "Researcher Agent" }],
      [{ label: "Web Scraper" }, { label: "Snov.io Enrichment" }],
      [{ label: "Extraction Analyst" }],
      [{ label: "Validation Manager" }],
      [{ label: "Database", accent: "end" }],
    ],
  },
  lumanguide: {
    label: "LangGraph",
    lanes: [
      [{ label: "User Query", accent: "start" }],
      [{ label: "Guardrail (Security)" }],
      [{ label: "Evaluate Intent" }],
      [{ label: "Retriever / FAISS" }, { label: "Team Navigator" }],
      [{ label: "Grade Relevance" }],
      [{ label: "Generate Response", accent: "end" }],
    ],
  },
};

const BOX_W = 190;
const BOX_H = 44;
const GAP_X = 28;
const GAP_Y = 30;
const PAD = 16;

export default function ProjectArchitecture({ projectId }: { projectId: string }) {
  const flow = FLOWS[projectId];
  if (!flow) return null;

  const maxPerLane = Math.max(...flow.lanes.map((l) => l.length));
  const width = maxPerLane * BOX_W + (maxPerLane - 1) * GAP_X + PAD * 2;
  const height = flow.lanes.length * BOX_H + (flow.lanes.length - 1) * GAP_Y + PAD * 2;

  // Pre-compute each node's centre so edges can be drawn between lanes.
  const placed = flow.lanes.map((lane, row) => {
    const rowW = lane.length * BOX_W + (lane.length - 1) * GAP_X;
    const startX = (width - rowW) / 2;
    return lane.map((step, i) => ({
      ...step,
      x: startX + i * (BOX_W + GAP_X),
      y: PAD + row * (BOX_H + GAP_Y),
    }));
  });

  return (
    <figure className="mt-8 border-t border-border pt-6">
      <figcaption className="text-xl font-bold mb-4 text-foreground">
        Architecture Flow ({flow.label})
      </figcaption>
      <div className="overflow-x-auto rounded-lg border border-border bg-[#0d1117] p-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          style={{ maxWidth: width, margin: "0 auto", display: "block" }}
          role="img"
          aria-label={`${flow.label} architecture: ${flow.lanes
            .map((l) => l.map((s) => s.label).join(" and "))
            .join(", then ")}.`}
        >
          {/* Edges first so boxes paint over the line ends. */}
          <g stroke="#30363d" strokeWidth="1.5" fill="none">
            {placed.slice(0, -1).map((lane, row) =>
              lane.flatMap((from) =>
                placed[row + 1].map((to) => {
                  const x1 = from.x + BOX_W / 2;
                  const y1 = from.y + BOX_H;
                  const x2 = to.x + BOX_W / 2;
                  const y2 = to.y;
                  const mid = y1 + GAP_Y / 2;
                  return (
                    <path
                      key={`${row}-${from.label}-${to.label}`}
                      d={`M${x1} ${y1} V${mid} H${x2} V${y2}`}
                    />
                  );
                }),
              ),
            )}
          </g>

          {placed.flat().map((node) => {
            const stroke =
              node.accent === "end"
                ? "#22c55e"
                : node.accent === "start"
                  ? "#ED462D"
                  : "#30363d";
            return (
              <g key={node.label}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={BOX_W}
                  height={BOX_H}
                  rx="8"
                  fill="#161b22"
                  stroke={stroke}
                  strokeWidth="1"
                />
                <text
                  x={node.x + BOX_W / 2}
                  y={node.y + BOX_H / 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#f0f6fc"
                  fontSize="12"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}

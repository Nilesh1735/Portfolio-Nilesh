"use client";

import React, { useMemo } from "react";
import ReactFlow, { Background, Controls, MiniMap, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

// Styling for the dark mode nodes
const nodeStyle = {
  background: "#161b22",
  color: "#f0f6fc",
  border: "1px solid #30363d",
  borderRadius: "8px",
  padding: "10px 15px",
  fontSize: "12px",
  fontFamily: "monospace",
  width: 150,
  textAlign: "center" as const,
};

// Define the architectures for your AI projects
const architectures: Record<string, { nodes: Node[]; edges: Edge[] }> = {
  "lumanguide": {
    nodes: [
      { id: "1", data: { label: "User Query" }, position: { x: 250, y: 0 }, style: nodeStyle },
      { id: "2", data: { label: "Guardrail (Security)" }, position: { x: 250, y: 80 }, style: nodeStyle },
      { id: "3", data: { label: "Evaluate Intent" }, position: { x: 250, y: 160 }, style: nodeStyle },
      { id: "4", data: { label: "Retriever / Web Search" }, position: { x: 100, y: 240 }, style: nodeStyle },
      { id: "5", data: { label: "Team Navigator" }, position: { x: 400, y: 240 }, style: nodeStyle },
      { id: "6", data: { label: "Grade Relevance" }, position: { x: 250, y: 320 }, style: nodeStyle },
      { id: "7", data: { label: "Generate Response" }, position: { x: 250, y: 400 }, style: { ...nodeStyle, background: "#0d1117", borderColor: "#ED462D" } },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#ED462D" } },
      { id: "e2-3", source: "2", target: "3", animated: true, style: { stroke: "#ED462D" } },
      { id: "e3-4", source: "3", target: "4", animated: true, style: { stroke: "#58a6ff" } },
      { id: "e3-5", source: "3", target: "5", animated: true, style: { stroke: "#58a6ff" } },
      { id: "e4-6", source: "4", target: "6", animated: true, style: { stroke: "#58a6ff" } },
      { id: "e5-6", source: "5", target: "6", animated: true, style: { stroke: "#58a6ff" } },
      { id: "e6-7", source: "6", target: "7", animated: true, style: { stroke: "#22c55e" } },
    ],
  },
  "omnicrew-ai": {
    nodes: [
      { id: "1", data: { label: "User Request" }, position: { x: 250, y: 0 }, style: nodeStyle },
      { id: "2", data: { label: "Researcher Agent" }, position: { x: 250, y: 80 }, style: nodeStyle },
      { id: "3", data: { label: "Web Scraper (Tool)" }, position: { x: 100, y: 160 }, style: { ...nodeStyle, background: "#0d1117" } },
      { id: "4", data: { label: "Extraction Analyst" }, position: { x: 250, y: 240 }, style: nodeStyle },
      { id: "5", data: { label: "Validation Manager" }, position: { x: 250, y: 320 }, style: nodeStyle },
      { id: "6", data: { label: "MySQL Database" }, position: { x: 250, y: 400 }, style: { ...nodeStyle, background: "#0d1117" } },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#ED462D" } },
      { id: "e2-3", source: "2", target: "3", animated: true, style: { stroke: "#58a6ff" } },
      { id: "e2-4", source: "2", target: "4", animated: true, style: { stroke: "#ED462D" } },
      { id: "e4-5", source: "4", target: "5", animated: true, style: { stroke: "#ED462D" } },
      { id: "e5-6", source: "5", target: "6", animated: true, style: { stroke: "#22c55e" } },
    ],
  },
};

export default function ProjectArchitecture({ projectId }: { projectId: string }) {
  const data = architectures[projectId];

  // If the project doesn't have a defined architecture, don't render anything
  if (!data) return null;

  return (
    <div className="mt-8 border-t border-border pt-6">
      <h3 className="text-xl font-bold mb-4 text-foreground">Architecture Flow ({projectId === "lumanguide" ? "LangGraph" : "CrewAI"})</h3>
      <div style={{ height: 400, width: "100%", background: "#0d1117", borderRadius: "8px", border: "1px solid #30363d" }} className="overflow-hidden">
        <ReactFlow
          nodes={data.nodes}
          edges={data.edges}
          fitView
          nodesDraggable={true}
          nodesConnectable={false}
          zoomOnScroll={false}
          panOnDrag={true}
        >
          <Background color="#30363d" gap={16} />
          <Controls showInteractive={false} style={{ background: "#161b22", borderColor: "#30363d" }} />
          <MiniMap 
            nodeColor={(n) => n.style?.background === "#0d1117" ? "#0d1117" : "#161b22"} 
            maskColor="rgba(13, 17, 23, 0.8)"
            style={{ background: "#161b22" }}
          />
        </ReactFlow>
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">Drag the nodes to explore the agentic pipeline.</p>
    </div>
  );
}
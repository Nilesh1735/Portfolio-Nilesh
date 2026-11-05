export type Highlight = {
  id: string;
  title: string;
  blurb: string;
  categories: string[];
  image: string;
  live: string;
  code: string;
};

export const CATEGORIES = ["agentic ai", "rag", "ml", "web", "books"] as const;

/** The one pill that swaps the panel's contents rather than filtering it. */
export const BOOKS_CATEGORY = "books";

export const HIGHLIGHTS: Highlight[] = [
  {
    id: "agentnine",
    title: "AgentNine",
    blurb:
      "an open-source ai agent directory. every listing carries its source repo, install steps for windows, macos and linux, the access it asks for, and what's still undocumented.",
    categories: ["agentic ai", "web"],
    image: "/images/agentnine/logo-card.webp",
    live: "https://agentnine.pro",
    code: "https://github.com/Nilesh1735/AgentNine",
  },
  {
    id: "omnicrew",
    title: "OmniCrew AI",
    blurb:
      "autonomous multi-agent b2b lead generation. a 3-tier llm fallback router (deepseek → mistral → gemini), redis md5 caching, and ssrf-hardened scraping.",
    categories: ["agentic ai", "ml"],
    image: "/images/omnicrew1.webp",
    live: "https://omnicrew-ai.vercel.app/",
    code: "https://github.com/Nilesh1735/OMNICREW-AI",
  },
  {
    id: "lumanguide",
    title: "LumanGuide",
    blurb:
      "an agentic rag system on a langgraph state machine, with a grade-and-rewrite retrieval cycle, faiss vector search, prompt-injection guardrails and jwt rbac.",
    categories: ["rag", "agentic ai"],
    image: "/images/Luman1.webp",
    live: "https://lumanguide-app.streamlit.app/",
    code: "https://github.com/Nilesh1735/LumanGuide-Onboarding-Illuminated",
  },
];

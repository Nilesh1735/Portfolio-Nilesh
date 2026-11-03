"use client";

import { BlurIn } from "@/components/reveal-animations";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import ParallaxMockup from "@/components/ui/parallax-mockup";

type FeaturedProject = {
  title: string;
  eyebrow: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  mockup: {
    images: string[];
    urlLabel: string;
    metric: string;
    subtext: string;
    glow: string;
  };
};

const projects: FeaturedProject[] = [
  {
    title: "AgentNine",
    eyebrow: "Founder · Live Product",
    description:
      "An independent, community-led directory for discovering open-source AI agents. Finding an agent is easy; working out how to set it up and what it needs is not. Every listing links back to its upstream repository and sets out install steps for Windows, macOS and Linux, the access it requests, the version reviewed — and states plainly what is still undocumented. Each one passes a 5-point verification checklist before publication.",
    tech: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Supabase",
      "Postgres",
      "Fuse.js",
      "Vitest",
      "Vercel",
    ],
    github: "https://github.com/Nilesh1735/AgentNine",
    live: "https://agentnine.pro",
    mockup: {
      images: [
        "/images/agentnine/agents.png",
        "/images/agentnine/categories.png",
        "/images/agentnine/search.png",
        "/images/agentnine/methodology.png",
      ],
      urlLabel: "agentnine.pro/agents",
      metric: "Directory Live",
      subtext: "Verified listings across 4 categories",
      glow: "from-rose-500/20 to-orange-500/10",
    },
  },
  {
    title: "OMNICREW AI",
    eyebrow: "Agentic AI · Full Stack",
    description:
      "An autonomous multi-agent B2B lead generation platform that scrapes, structures, and enriches web data in real time. Engineered with a resilient 3-tier LLM fallback router (DeepSeek → Mistral → Gemini), alongside autonomous Snov.io email enrichment, MD5 Redis caching for zero-token duplicate queries, and strict JWT multi-tenant data isolation.",
    tech: [
      "Python",
      "CrewAI",
      "LangChain",
      "FastAPI",
      "Pydantic",
      "React",
      "Docker",
      "Redis",
      "AWS S3",
      "Snov.io API",
    ],
    github: "https://github.com/Nilesh1735/OMNICREW-AI",
    live: "https://omnicrew-ai.vercel.app/",
    mockup: {
      images: [
        "/images/omnicrew1.png",
        "/images/omnicrew2.png",
        "/images/omnicrew5.png",
        "/images/omnicrew4.png",
      ],
      urlLabel: "omnicrew-ai.vercel.app",
      metric: "Agents Online",
      subtext: "Live WebSocket telemetry",
      glow: "from-blue-500/20 to-cyan-500/10",
    },
  },
  {
    title: "LumanGuide",
    eyebrow: "Agentic RAG",
    description:
      "An enterprise Agentic RAG system built on a LangGraph state machine, designed to streamline engineering onboarding and knowledge management. Orchestrates dynamic document grading and query routing with strict AppSec measures (JWT RBAC, prompt-injection guardrails, automated secret scanning), backed by MongoDB Atlas for persistent multi-tenant chat history and LangSmith for end-to-end observability.",
    tech: [
      "Python",
      "LangGraph",
      "LangChain",
      "DeepSeek",
      "Gemini",
      "FAISS",
      "FastAPI",
      "MongoDB Atlas",
      "Streamlit",
      "LangSmith",
    ],
    github: "https://github.com/Nilesh1735/LumanGuide-Onboarding-Illuminated",
    live: "https://lumanguide-app.streamlit.app/",
    mockup: {
      images: [
        "/images/Luman1.png",
        "/images/Luman2.png",
        "/images/Luman3.png",
        "/images/Luman4.png",
      ],
      urlLabel: "lumanguide-app.streamlit.app",
      metric: "RAG Pipeline Nominal",
      subtext: "LangGraph state machine active",
      glow: "from-purple-500/20 to-pink-500/10",
    },
  },
];

function ProjectLinks({ github, live, size = 18 }: { github: string; live: string; size?: number }) {
  return (
    <div className="flex gap-4 mt-auto pt-2">
      <Link
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors flex items-center gap-2 text-sm"
      >
        <Github size={size} /> Code
      </Link>
      <Link
        href={live}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors flex items-center gap-2 text-sm"
      >
        <ExternalLink size={size} /> Live
      </Link>
    </div>
  );
}

function TechTags({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tech.map((t) => (
        <span
          key={t}
          className="px-2 py-1 text-xs rounded-full border border-border bg-muted"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default function ProjectsSection() {
  const [flagship, ...rest] = projects;

  return (
    <section id="projects" className="relative z-10 max-w-7xl mx-auto py-24 px-4">
      <BlurIn>
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-display">
          Featured Projects
        </h2>
      </BlurIn>

      {/* Flagship spans the full width; the rest share a two-up row below it. */}
      <div className="space-y-6 perspective-container">
        <BlurIn delay={0.1}>
          <div className="project-card flex flex-col lg:flex-row gap-8 p-6">
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                {flagship.eyebrow}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">{flagship.title}</h3>
              <p className="text-muted-foreground mb-4 max-w-prose">{flagship.description}</p>
              <TechTags tech={flagship.tech} />
              <ProjectLinks github={flagship.github} live={flagship.live} />
            </div>

            <div className="flex-1 min-h-[350px]">
              <ParallaxMockup {...flagship.mockup} priority />
            </div>
          </div>
        </BlurIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rest.map((project, i) => (
            <BlurIn key={project.title} delay={0.2 + i * 0.1}>
              <div className="project-card h-full flex flex-col p-6">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                  {project.eyebrow}
                </span>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>

                <div className="my-4 min-h-[200px]">
                  <ParallaxMockup {...project.mockup} />
                </div>

                <TechTags tech={project.tech} />
                <ProjectLinks github={project.github} live={project.live} size={16} />
              </div>
            </BlurIn>
          ))}
        </div>
      </div>
    </section>
  );
}

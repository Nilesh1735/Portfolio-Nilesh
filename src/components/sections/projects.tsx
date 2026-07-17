"use client";

import { BlurIn } from "@/components/reveal-animations";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import ParallaxMockup from "@/components/ui/parallax-mockup";

const projects = [
  {
    title: "OMNICREW AI",
    description: "An autonomous multi-agent RPA platform that orchestrates AI crews to extract and structure unstructured web data in real time. Engineered with a resilient LLM routing pipeline (Mistral → OpenAI) for high availability, alongside semantic deduplication and AWS S3 archival to ensure clean, enterprise-scale data ingestion. Deployed via Docker with live telemetry streaming for full pipeline observability.",
    tech: ["Python", "CrewAI", "LangChain", "FastAPI", "Pydantic", "React", "Docker", "AWS S3 (Boto3)", "Claude Code"],
    github: "https://github.com/Nilesh1735/OMNICREW-AI", 
    live: "https://omnicrew-ai.vercel.app/", 
    featured: true,
  },
  {
    title: "LumanGuide",
    description: "An Agentic RAG system designed to streamline engineering onboarding and knowledge management. Built on a LangGraph state machine that orchestrates intelligent query routing, dynamic document grading, and real-time web search. Hardened with AppSec measures including JWT RBAC, prompt injection guardrails, and multimodal PDF ingestion for secure, scalable knowledge retrieval.",
    tech: ["Python", "LangGraph", "LangChain", "LangSmith", "FastAPI", "Gemini", "FAISS", "PostgreSQL", "MongoDB", "Streamlit", "JWT RBAC"],
    github: "https://github.com/Nilesh1735/LumanGuide-Onboarding-Illuminated",
    live: "https://lumanguide-app.streamlit.app/",
    featured: true,
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 max-w-7xl mx-auto py-24 px-4">
      <BlurIn>
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-display">
          Featured Projects
        </h2>
      </BlurIn>

      {/* Asymmetric Grid Layout: 2 columns for OmniCrew, 1 for LumanGuide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 perspective-container">
        
        {/* 1. OMNICREW AI (Takes up 2 columns) */}
        <BlurIn delay={0.1} className="lg:col-span-2">
          <div className="project-card h-full flex flex-col lg:flex-row gap-8 p-6">
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Flagship Project</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">{projects[0].title}</h3>
              <p className="text-muted-foreground mb-4 max-w-prose">{projects[0].description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {projects[0].tech.map((t) => (
                  <span key={t} className="px-2 py-1 text-xs rounded-full border border-border bg-muted">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <Link href={projects[0].github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 text-sm">
                  <Github size={18} /> Code
                </Link>
                <Link href={projects[0].live} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 text-sm">
                  <ExternalLink size={18} /> Live
                </Link>
              </div>
            </div>
            
            {/* Parallax Visual for OmniCrew */}
            <div className="flex-1 min-h-[350px]">
              <ParallaxMockup projectIndex={0} />
            </div>
          </div>
        </BlurIn>

        {/* 2. LumanGuide (Takes up 1 column, sits next to OmniCrew) */}
        <BlurIn delay={0.2} className="lg:col-span-1">
          <div className="project-card h-full flex flex-col p-6">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-foreground mb-2">Agentic RAG</span>
            <h3 className="text-xl font-bold mb-2">{projects[1].title}</h3>
            <p className="text-muted-foreground mb-4 flex-grow text-sm">{projects[1].description}</p>
            
            {/* Parallax Visual for LumanGuide */}
            <div className="my-4 min-h-[200px]">
               <ParallaxMockup projectIndex={1} />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {projects[1].tech.map((t) => (
                <span key={t} className="px-2 py-1 text-xs rounded-full border border-border bg-muted">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-auto">
              <Link href={projects[1].github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 text-sm">
                <Github size={16} /> Code
              </Link>
              <Link href={projects[1].live} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 text-sm">
                <ExternalLink size={16} /> Live
              </Link>
            </div>
          </div>
        </BlurIn>

      </div>
    </section>
  );
}
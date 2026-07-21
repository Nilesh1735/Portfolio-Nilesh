import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import ProjectArchitecture from "@/components/project-architecture"; // ADDED IMPORT

const BASE_PATH = "/assets/projects-screenshots";
const PLACEHOLDER_IMG = "/assets/logo-dark.svg";

const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live, github }: { live?: string; github?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link className="font-mono underline flex gap-2" rel="noopener" target="_new" href={live}>
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {github && github !== "#" && (
        <Link className="font-mono underline flex gap-2" rel="noopener" target="_new" href={github}>
          <Button variant={"outline"} size={"sm"}>
            View on GitHub
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});

const PROJECT_SKILLS = {
  next: brand("Next.js", "nextdotjs-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  mongo: brand("MongoDB", "mongodb-mono.svg"),
  aiSDK: brand("Vercel AI SDK", "vercel-mono.svg"),
  anthropic: brand("Anthropic Claude", "anthropic-mono.svg"),
  fastapi: brand("FastAPI", "fastapi-mono.svg"),
  langchain: brand("LangChain", "langchain-mono.svg"),
  openai: brand("OpenAI", "openai-mono.svg"),
  huggingface: brand("Hugging Face", "huggingface-mono.svg"),
  faiss: brand("FAISS", "faiss-mono.svg"),
  streamlit: brand("Streamlit", "streamlit-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  aws: brand("AWS", "cloudflare-mono.svg"),
  // Added mappings to prevent UI from breaking while keeping correct text labels
  crewai: brand("CrewAI", "langchain-mono.svg"),
  langgraph: brand("LangGraph", "langchain-mono.svg"),
  redis: brand("Redis", "nodedotjs-mono.svg"),
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};

const projects: Project[] = [
  {
    id: "omnicrew-ai",
    category: "Agentic AI / Full Stack",
    title: "OmniCrew AI",
    src: PLACEHOLDER_IMG,
    screenshots: [],
    github: "https://github.com/Nilesh1735/OMNICREW-AI",
    live: "https://omnicrew-ai.vercel.app/",
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.fastapi, PROJECT_SKILLS.crewai, PROJECT_SKILLS.docker, PROJECT_SKILLS.aws, PROJECT_SKILLS.redis],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            An autonomous multi-agent B2B lead generation platform that scrapes, structures, and enriches web data in real time. Engineered with a resilient 3-tier LLM fallback router (OpenAI → Mistral → Gemini) for 99.9% uptime, alongside autonomous Snov.io email enrichment and strict JWT multi-tenant data isolation.
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            <strong>Key Features:</strong> MD5 Redis caching for zero-token duplicate queries, semantic deduplication, AWS S3 archival, and live WebSocket telemetry streaming for full pipeline observability. Built with CrewAI and containerized via Docker.
          </TypographyP>
          <ProjectsLinks live={this.live} github={this.github} />
          {/* ADDED: Interactive Architecture Diagram */}
          <ProjectArchitecture projectId={this.id} />
          <SlideShow images={[PLACEHOLDER_IMG]} />
        </div>
      );
    },
  },
  {
    id: "lumanguide",
    category: "AI / RAG System",
    title: "LumanGuide",
    src: PLACEHOLDER_IMG,
    screenshots: [],
    github: "https://github.com/Nilesh1735/LumanGuide-Onboarding-Illuminated",
    live: "https://lumanguide-app.streamlit.app/",
    skills: {
      frontend: [PROJECT_SKILLS.streamlit, PROJECT_SKILLS.python],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.fastapi, PROJECT_SKILLS.langgraph, PROJECT_SKILLS.openai, PROJECT_SKILLS.faiss, PROJECT_SKILLS.mongo],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            An enterprise Agentic RAG system built on a LangGraph state machine, designed to streamline engineering onboarding and knowledge management. Orchestrates dynamic document grading and query routing with strict AppSec measures (JWT RBAC, prompt injection guardrails, automated secret scanning).
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            <strong>Key Features:</strong> Premium split-screen SaaS UI with live agent telemetry, backed by MongoDB Atlas for persistent, isolated multi-tenant chat history and LangSmith for full LLMOps observability.
          </TypographyP>
          <ProjectsLinks live={this.live} github={this.github} />
          {/* ADDED: Interactive Architecture Diagram */}
          <ProjectArchitecture projectId={this.id} />
          <SlideShow images={[PLACEHOLDER_IMG]} />
        </div>
      );
    },
  },
];

export default projects;
// Skills & Experience for Nilesh Raj — AI/ML Engineer

export enum SkillNames {
  PYTHON = "python",
  HUGGINGFACE = "huggingface",
  FAISS = "faiss",
  PYTORCH = "pytorch",
  NUMPY = "numpy",
  PANDAS = "pandas",
  GIT = "git",
  GITHUB = "github",
  DOCKER = "docker",
  AWS = "aws",
  VERCEL = "vercel",
  STREAMLIT = "streamlit",
  LANGCHAIN = "langchain",
  LANGGRAPH = "langgraph",
  EXPRESS = "express",
  FASTAPI = "fastapi",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  SQLITE = "sqlite",
  OPENAI = "openai",
  CLAUDE = "claude",
  JS = "js",
  REACT = "react",
  NEXTJS = "nextjs",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
}

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.PYTHON]: {
    id: 1,
    name: "python",
    label: "Python",
    shortDescription: "My go-to language for building AI/ML applications and automation pipelines",
    color: "#3776AB",
    icon: "https://api.iconify.design/logos:python.svg",
  },
  [SkillNames.HUGGINGFACE]: {
    id: 2,
    name: "huggingface",
    label: "Hugging Face",
    shortDescription: "Open-source models, transformers, and NLP tools for AI development",
    color: "#FFD21E",
    icon: "https://api.iconify.design/simple-icons:huggingface.svg?color=%23FFD21E",
  },
  [SkillNames.FAISS]: {
    id: 3,
    name: "faiss",
    label: "FAISS",
    shortDescription: "Efficient similarity search and clustering of dense vectors for RAG",
    color: "#8A2BE2",
    icon: "https://api.iconify.design/material-symbols:database-outline.svg?color=%238A2BE2",
  },
  [SkillNames.PYTORCH]: {
    id: 4,
    name: "pytorch",
    label: "PyTorch",
    shortDescription: "Deep learning framework for building and training neural network models",
    color: "#ee4c2c",
    icon: "https://api.iconify.design/logos:pytorch.svg",
  },
  [SkillNames.NUMPY]: {
    id: 5,
    name: "numpy",
    label: "NumPy",
    shortDescription: "Fundamental package for scientific computing and numerical operations",
    color: "#013243",
    icon: "https://api.iconify.design/logos:numpy.svg",
  },
  [SkillNames.PANDAS]: {
    id: 6,
    name: "pandas",
    label: "Pandas",
    shortDescription: "Data manipulation and analysis library for structured data workflows",
    color: "#150458",
    icon: "https://api.iconify.design/simple-icons:pandas.svg?color=%23150458",
  },
  [SkillNames.GIT]: {
    id: 7,
    name: "git",
    label: "Git",
    shortDescription: "Version control for tracking every change in my codebase",
    color: "#f1502f",
    icon: "https://api.iconify.design/logos:git-icon.svg",
  },
  [SkillNames.GITHUB]: {
    id: 8,
    name: "github",
    label: "GitHub",
    shortDescription: "Collaboration, code review, and open-source contributions",
    color: "#ffffff",
    icon: "https://api.iconify.design/simple-icons:github.svg?color=white",
  },
  [SkillNames.DOCKER]: {
    id: 9,
    name: "docker",
    label: "Docker",
    shortDescription: "Containerization for consistent development and deployment environments",
    color: "#2496ed",
    icon: "https://api.iconify.design/logos:docker-icon.svg",
  },
  [SkillNames.AWS]: {
    id: 10,
    name: "aws",
    label: "AWS",
    shortDescription: "Cloud infrastructure services for scalable deployments",
    color: "#ff9900",
    icon: "https://api.iconify.design/logos:aws.svg",
  },
  [SkillNames.VERCEL]: {
    id: 11,
    name: "vercel",
    label: "Vercel",
    shortDescription: "Seamless deployment platform for frontend and full-stack apps",
    color: "#ffffff",
    icon: "https://api.iconify.design/simple-icons:vercel.svg?color=white",
  },
  [SkillNames.STREAMLIT]: {
    id: 12,
    name: "streamlit",
    label: "Streamlit",
    shortDescription: "Rapid prototyping of ML and data apps with interactive Python dashboards",
    color: "#ff4b4b",
    icon: "https://api.iconify.design/simple-icons:streamlit.svg?color=%23FF4B4B",
  },
  [SkillNames.LANGCHAIN]: {
    id: 13,
    name: "langchain",
    label: "LangChain",
    shortDescription: "Framework for building LLM-powered applications with chains and agents",
    color: "#ffffff",
    // FIX: Forced white color so it is visible on dark backgrounds
    icon: "https://api.iconify.design/simple-icons:langchain.svg?color=white",
  },
  [SkillNames.LANGGRAPH]: {
    id: 14,
    name: "langgraph",
    label: "LangGraph",
    shortDescription: "Stateful orchestration for complex, multi-agent AI workflows",
    color: "#4ADE80",
    // FIX: Using a graph icon since LangGraph doesn't have an official logo in icon libraries yet
    icon: "https://api.iconify.design/mdi:graph-outline.svg?color=%234ADE80",
  },
  [SkillNames.EXPRESS]: {
    id: 15,
    name: "express",
    label: "Express",
    shortDescription: "Minimal and flexible Node.js web application framework",
    color: "#ffffff",
    icon: "https://api.iconify.design/simple-icons:express.svg?color=white",
  },
  [SkillNames.FASTAPI]: {
    id: 16,
    name: "fastapi",
    label: "FastAPI",
    shortDescription: "Modern, fast Python web framework for building APIs with auto-docs",
    color: "#009688",
    icon: "https://api.iconify.design/simple-icons:fastapi.svg?color=%23009088",
  },
  [SkillNames.POSTGRES]: {
    id: 17,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription: "Powerful relational database for production-grade applications",
    color: "#336791",
    icon: "https://api.iconify.design/simple-icons:postgresql.svg?color=%23336791",
  },
  [SkillNames.MONGODB]: {
    id: 18,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "NoSQL database for flexible, document-based data storage",
    color: "#47A248",
    icon: "https://api.iconify.design/simple-icons:mongodb.svg?color=%2347A248",
  },
  [SkillNames.SQLITE]: {
    id: 19,
    name: "sqlite",
    label: "SQLite",
    shortDescription: "Lightweight, serverless database for quick prototyping and local storage",
    color: "#003b57",
    icon: "https://api.iconify.design/simple-icons:sqlite.svg?color=%23003B57",
  },
  [SkillNames.OPENAI]: {
    id: 20,
    name: "openai",
    label: "OpenAI",
    shortDescription: "GPT and embedding APIs for intelligent text generation and analysis",
    color: "#ffffff",
    icon: "https://api.iconify.design/simple-icons:openai.svg?color=white",
  },
  [SkillNames.CLAUDE]: {
    id: 21,
    name: "claude",
    label: "Claude",
    shortDescription: "Anthropic Claude API for safe and helpful AI interactions",
    color: "#D97757",
    // FIX: Using a psychology/AI brain icon for Claude as Anthropic doesn't have a public logo in simple-icons
    icon: "https://api.iconify.design/material-symbols:psychology.svg?color=%23D97757",
  },
  [SkillNames.JS]: {
    id: 22,
    name: "js",
    label: "JavaScript",
    shortDescription: "Dynamic scripting for web development and full-stack projects",
    color: "#f0db4f",
    icon: "https://api.iconify.design/logos:javascript.svg",
  },
  [SkillNames.REACT]: {
    id: 23,
    name: "react",
    label: "React",
    shortDescription: "Building interactive UIs with component-based architecture",
    color: "#61dafb",
    icon: "https://api.iconify.design/logos:react.svg",
  },
  [SkillNames.NEXTJS]: {
    id: 24,
    name: "nextjs",
    label: "Next.js",
    shortDescription: "Full-stack React framework for production-ready applications",
    color: "#ffffff",
    icon: "https://api.iconify.design/simple-icons:nextdotjs.svg?color=white",
  },
  [SkillNames.TAILWIND]: {
    id: 25,
    name: "tailwind",
    label: "Tailwind",
    shortDescription: "Utility-first CSS for rapid and consistent UI development",
    color: "#38bdf8",
    icon: "https://api.iconify.design/simple-icons:tailwindcss.svg?color=%2338BDF8",
  },
  [SkillNames.NODEJS]: {
    id: 26,
    name: "nodejs",
    label: "Node.js",
    shortDescription: "Server-side JavaScript for building backend services and APIs",
    color: "#6cc24a",
    icon: "https://api.iconify.design/logos:nodejs-icon.svg",
  },
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description?: string[];
  skills?: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "2023",
    endDate: "2024",
    title: "AI/ML Trainee",
    company: "Technosavvys Education Technology",
    description: [
      "Engineered and optimized Retrieval-Augmented Generation (RAG) pipelines using LangChain and FAISS for educational content retrieval.",
      "Developed high-performance REST APIs using FastAPI to serve machine learning models and LLM agents.",
      "Integrated multiple LLM providers (OpenAI, Claude, Gemini) into agentic workflows, reducing manual data processing time by 60%.",
      "Set up a Streamlit dashboard backed by SQLite for scheduled analysis, giving 10+ mentors a live view of student feedback across 5+ courses.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.LANGCHAIN,
      SkillNames.FASTAPI,
      SkillNames.FAISS,
      SkillNames.STREAMLIT,
      SkillNames.SQLITE,
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode activated! Your AI models might need recalibration.",
    "Caution: High brightness detected. All neural networks still operational.",
    "Light mode engaged! Even LLMs need to see the light sometimes.",
    "Switching to light mode... Embeddings work better in daylight, right?",
    "Light mode on! Claude would approve of this decision.",
  ],
  dark: [
    "Dark mode activated! The natural habitat of every AI developer.",
    "Switching to dark mode... Where my vector embeddings feel at home.",
    "Dark mode on! This is where the real RAG pipelines thrive.",
    "Welcome back to the dark side. LLMs love it here.",
    "Dark mode activated! Perfect for late-night prompt engineering sessions.",
  ],
};
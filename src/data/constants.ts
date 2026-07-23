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
  CREWAI = "crewai",
  FASTAPI = "fastapi",
  PYDANTIC = "pydantic",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  REDIS = "redis",
  DEEPSEEK = "deepseek",
  MISTRAL = "mistral",
  LANGSMITH = "langsmith",
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
    shortDescription: "Cloud infrastructure services for scalable deployments (S3, EC2)",
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
    icon: "https://api.iconify.design/simple-icons:langchain.svg?color=white",
  },
  [SkillNames.LANGGRAPH]: {
    id: 14,
    name: "langgraph",
    label: "LangGraph",
    shortDescription: "Stateful orchestration for complex, multi-agent AI workflows",
    color: "#4ADE80",
    icon: "https://api.iconify.design/mdi:graph-outline.svg?color=%234ADE80",
  },
  [SkillNames.CREWAI]: {
    id: 15,
    name: "crewai",
    label: "CrewAI",
    shortDescription: "Role-playing autonomous AI agents for complex task execution",
    color: "#FF6B35",
    icon: "https://api.iconify.design/material-symbols:smart-toy-outline.svg?color=%23FF6B35",
  },
  [SkillNames.FASTAPI]: {
    id: 16,
    name: "fastapi",
    label: "FastAPI",
    shortDescription: "Modern, fast Python web framework for building APIs with auto-docs",
    color: "#009688",
    icon: "https://api.iconify.design/simple-icons:fastapi.svg?color=%23009088",
  },
  [SkillNames.PYDANTIC]: {
    id: 17,
    name: "pydantic",
    label: "Pydantic",
    shortDescription: "Strict data validation for structured LLM outputs and backend schemas",
    color: "#E92063",
    icon: "https://api.iconify.design/simple-icons:pydantic.svg?color=%23E92063",
  },
  [SkillNames.POSTGRES]: {
    id: 18,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription: "Powerful relational database for production-grade applications",
    color: "#336791",
    icon: "https://api.iconify.design/simple-icons:postgresql.svg?color=%23336791",
  },
  [SkillNames.MONGODB]: {
    id: 19,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "NoSQL database for flexible, document-based data storage",
    color: "#47A248",
    icon: "https://api.iconify.design/simple-icons:mongodb.svg?color=%2347A248",
  },
  [SkillNames.REDIS]: {
    id: 20,
    name: "redis",
    label: "Redis",
    shortDescription: "In-memory data store for zero-token caching and WebSocket pub/sub",
    color: "#FF4438",
    icon: "https://api.iconify.design/simple-icons:redis.svg?color=%23FF4438",
  },
  [SkillNames.DEEPSEEK]: {
    id: 21,
    name: "deepseek",
    label: "DeepSeek",
    shortDescription: "Primary LLM for high-quality reasoning and cost-effective inference",
    color: "#4D6BFE",
    icon: "https://api.iconify.design/simple-icons:deepseek.svg?color=%234D6BFE",
  },
  [SkillNames.MISTRAL]: {
    id: 22,
    name: "mistral",
    label: "Mistral AI",
    shortDescription: "Open-weight LLMs used for resilient fallback routing in production",
    color: "#FF7000",
    icon: "https://api.iconify.design/simple-icons:mistralai.svg?color=%23FF7000",
  },
  [SkillNames.LANGSMITH]: {
    id: 23,
    name: "langsmith",
    label: "LangSmith",
    shortDescription: "LLMOps platform for tracing, evaluating, and monitoring AI agents",
    color: "#F1F1F1",
    icon: "https://api.iconify.design/mdi:chart-areaspline.svg?color=%23F1F1F1",
  },
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  location: string;
  description?: string[];
  skills?: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "Feb 2026",
    endDate: "May 2026",
    title: "AI/ML Trainee",
    company: "Technosavvys Education Technology",
    location: "Remote",
    description: [
      "Engineered a BERT-based text classifier via Hugging Face to automate sentiment analysis of 500+ student course reviews, achieving 88% accuracy through iterative hyperparameter tuning.",
      "Streamlined instructional workflows by reducing manual review time by 60%, while simultaneously boosting baseline model accuracy by 15% through advanced NLP techniques.",
      "Deployed a real-time Streamlit dashboard supported by a scheduled SQLite backend, providing 10+ mentors with live sentiment tracking across 5+ active courses.",
    ],
    skills: [
      "Python",
      "BERT",
      "Hugging Face",
      "NLP",
      "Streamlit",
      "SQLite"
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
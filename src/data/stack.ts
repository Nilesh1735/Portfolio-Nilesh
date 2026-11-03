/**
 * The grouped "skill stack".
 *
 * Plain strings on purpose: the redesign renders these as text pills, so
 * there are no icons to fetch. That removes ~25 blocking requests to an
 * external icon CDN that the old skills section made on every page load.
 */
export type StackGroup = { title: string; items: string[] };

export const STACK: StackGroup[] = [
  {
    title: "agentic ai & genai",
    items: [
      "LangGraph", "CrewAI", "LangChain", "RAG Pipelines", "Prompt Engineering",
      "Vector Search", "FAISS", "LangSmith", "DeepSeek", "Mistral AI", "Gemini",
      "OpenAI API", "NVIDIA NIM",
    ],
  },
  {
    title: "ml engineering",
    items: [
      "Python", "PyTorch", "Scikit-learn", "Hugging Face", "BERT", "Transformers",
      "NLP", "Fine-tuning", "Pandas", "NumPy",
    ],
  },
  {
    title: "product & web",
    items: [
      "Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Streamlit", "Vitest",
    ],
  },
  {
    title: "infra & devops",
    items: [
      "FastAPI", "Docker", "Redis", "AWS", "PostgreSQL", "MongoDB Atlas",
      "Pydantic", "Git/GitHub", "CI/CD", "Vercel",
    ],
  },
];

export type Education = {
  institution: string;
  degree: string;
  detail?: string;
  duration: string;
};

export const EDUCATION: Education[] = [
  {
    institution: "united university",
    degree: "bca, artificial intelligence (ibm specialization)",
    detail: "Prayagraj, UP",
    duration: "aug 2022 - may 2025",
  },
];

export type Certification = { title: string; issuer: string; year: string };

export const CERTIFICATIONS: Certification[] = [
  { title: "Introduction to Generative AI – Art of the Possible", issuer: "Amazon Web Services", year: "may 2026" },
  { title: "Building LLM Applications with Prompt Engineering", issuer: "NVIDIA Deep Learning Institute", year: "2025" },
  { title: "Introduction to Python", issuer: "IBM", year: "apr 2023" },
];

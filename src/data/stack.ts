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
  { title: "Building LLM Applications with Prompt Engineering", issuer: "NVIDIA Deep Learning Institute", year: "2025" },
];

export type Book = { title: string; author: string };

/** Books read, newest interest first. Plain text, no cover images to fetch. */
export const BOOKS: Book[] = [
  { title: "Psycho-Cybernetics", author: "Maxwell Maltz" },
  { title: "12 Rules for Life", author: "Jordan Peterson" },
  { title: "The Courage to Be Disliked", author: "Fumitake Koga and Ichiro Kishimi" },
  {
    title: "Becoming Supernatural: How Common People Are Doing the Uncommon",
    author: "Joe Dispenza",
  },
];

const config = {
  title: "Nilesh Raj | AI/ML & GenAI Developer",
  description: {
    long: "Explore the portfolio of Nilesh Raj — AI/ML Engineer specializing in building practical applications with large language models, RAG pipelines, and agentic AI architectures using Python, LangChain, and FastAPI.",
    short:
      "Portfolio of Nilesh Raj — AI/ML Engineer building intelligent applications with LLMs, RAG, and Agentic AI.",
  },
  keywords: [
    "Nilesh Raj",
    "AI Engineer",
    "GenAI Developer",
    "Machine Learning",
    "LLM",
    "RAG",
    "Agentic AI",
    "LangChain",
    "LangGraph",
    "Python",
    "FastAPI",
    "React",
    "TypeScript",
    "Hugging Face",
    "NLP",
  ],
  author: "Nilesh Raj",
  email: "nileshraj1735@gmail.com",
  site: "https://nileshraj.vercel.app",

  // Point this to your new top project!
  githubUsername: "Nilesh1735",
  githubRepo: "OmniCrew-AI", 

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "",
    linkedin: "https://www.linkedin.com/in/nilesh-raj-nr1735",
    instagram: "",
    facebook: "",
    github: "https://github.com/Nilesh1735",
  },
};
export { config };
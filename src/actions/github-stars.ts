"use server";

import { cacheLife } from "next/cache";
import { config } from "@/data/config";

// unauthenticated github api = 60 req/hr per ip; 5min cache -> ~12 req/hr
// returns 0 gracefully on failure (repo not found, rate limit, etc.)
export async function getGithubStars(): Promise<number> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300 });

  try {
    const res = await fetch(
      `https://api.github.com/repos/${config.githubUsername}/${config.githubRepo}`,
      { headers: { Accept: "application/vnd.github+json" } },
    );
    if (!res.ok) {
      return 0;
    }

    const data = await res.json();
    if (typeof data.stargazers_count !== "number") {
      return 0;
    }
    return data.stargazers_count;
  } catch {
    return 0;
  }
}

export type GithubRepo = {
  name: string;
  label: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
};

export type GithubProfile = {
  followers: number;
  publicRepos: number;
  totalStars: number;
  topRepos: GithubRepo[];
};

const GITHUB_HEADERS: HeadersInit = { Accept: "application/vnd.github+json" };

// Flagship repos always shown first, in this order.
const PINNED_REPO_NAMES = ["AgentNine", "OMNICREW-AI", "LumanGuide-Onboarding-Illuminated"];
// Friendlier card labels (repo slugs are long / all-caps).
const REPO_DISPLAY_NAMES: Record<string, string> = {
  AgentNine: "AgentNine",
  "OMNICREW-AI": "OmniCrew AI",
  "LumanGuide-Onboarding-Illuminated": "LumanGuide",
};
// Fallback blurbs so flagship cards never show "No description provided".
const REPO_FALLBACK_DESCRIPTIONS: Record<string, string> = {
  AgentNine:
    "Open-source AI agent directory with per-listing setup steps, access requirements and verification context.",
  "OMNICREW-AI":
    "Autonomous multi-agent B2B lead-gen platform (CrewAI) with a 3-tier LLM fallback router and Redis caching.",
  "LumanGuide-Onboarding-Illuminated":
    "Enterprise Agentic RAG system on a LangGraph state machine with dynamic document grading and query routing.",
};

const pinIndex = (name: string) =>
  PINNED_REPO_NAMES.findIndex((n) => n.toLowerCase() === name.toLowerCase());

// Aggregates public profile stats + the visitor's most-starred repos.
// All network failures degrade to null so the UI can hide the block cleanly.
export async function getGithubProfile(): Promise<GithubProfile | null> {
  "use cache";
  cacheLife({ stale: 3600, revalidate: 3600 });

  const user = config.githubUsername;

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`, { headers: GITHUB_HEADERS }),
      fetch(
        `https://api.github.com/users/${user}/repos?per_page=100&sort=updated&type=owner`,
        { headers: GITHUB_HEADERS },
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const userData = await userRes.json();
    const reposData = (await reposRes.json()) as Array<{
      name: string;
      description: string | null;
      html_url: string;
      language: string | null;
      stargazers_count: number;
      forks_count: number;
      fork: boolean;
      archived: boolean;
    }>;

    if (!Array.isArray(reposData)) return null;

    const owned = reposData.filter((r) => !r.fork && !r.archived);
    const totalStars = owned.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

    // Ranking: pinned flagships first, then repos with a description, then by
    // stars/forks. Keeps empty "No description" repos out of the top slots.
    const topRepos: GithubRepo[] = [...owned]
      .sort((a, b) => {
        const pa = pinIndex(a.name);
        const pb = pinIndex(b.name);
        if (pa !== -1 || pb !== -1) {
          if (pa === -1) return 1;
          if (pb === -1) return -1;
          return pa - pb;
        }
        const da = a.description ? 1 : 0;
        const db = b.description ? 1 : 0;
        if (da !== db) return db - da;
        return b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count;
      })
      .slice(0, 4)
      .map((r) => ({
        name: r.name,
        label: REPO_DISPLAY_NAMES[r.name] ?? r.name,
        description: r.description ?? REPO_FALLBACK_DESCRIPTIONS[r.name] ?? null,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
      }));

    return {
      followers: typeof userData.followers === "number" ? userData.followers : 0,
      publicRepos: typeof userData.public_repos === "number" ? userData.public_repos : owned.length,
      totalStars,
      topRepos,
    };
  } catch {
    return null;
  }
}

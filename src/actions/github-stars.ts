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

    const topRepos: GithubRepo[] = [...owned]
      .sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count)
      .slice(0, 4)
      .map((r) => ({
        name: r.name,
        description: r.description,
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

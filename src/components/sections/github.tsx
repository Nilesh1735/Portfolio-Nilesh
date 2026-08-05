"use client";

import React, { useEffect, useState } from "react";
import { BlurIn } from "@/components/reveal-animations";
import { Github, Star, GitFork, Users, BookMarked, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { config } from "@/data/config";
import { getGithubProfile, type GithubProfile } from "@/actions/github-stars";
import { cn } from "@/lib/utils";

// Small map of common languages to their brand colors (GitHub-style dots).
const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B",
  Shell: "#89e051",
  Dockerfile: "#384d54",
};

const GITHUB_USER = config.githubUsername;

function StatTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card/60 px-4 py-5 text-center transition-colors hover:border-primary/40">
      <span className="text-primary">{icon}</span>
      <span className="text-2xl font-bold text-foreground tabular-nums">{value.toLocaleString()}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export default function GithubSection() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGithubProfile()
      .then(setProfile)
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, []);

  // Hide the whole section if GitHub is unreachable — no broken/empty block.
  if (!loading && !profile) return null;

  return (
    <section id="github" className="relative z-10 mx-auto max-w-5xl px-4 py-24">
      <BlurIn>
        <h2 className="mb-3 text-center font-display text-4xl font-bold md:text-5xl">
          GitHub Activity
        </h2>
        <p className="mb-12 text-center text-muted-foreground">
          Open-source work and contributions
        </p>
      </BlurIn>

      {loading ? (
        <div className="flex justify-center py-12">
          <span className="animate-pulse font-mono text-sm text-muted-foreground">
            Loading GitHub activity…
          </span>
        </div>
      ) : (
        profile && (
          <div className="space-y-8">
            {/* Stat tiles */}
            <BlurIn delay={0.1}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatTile icon={<Star size={20} />} label="Total Stars" value={profile.totalStars} />
                <StatTile icon={<BookMarked size={20} />} label="Public Repos" value={profile.publicRepos} />
                <StatTile icon={<Users size={20} />} label="Followers" value={profile.followers} />
                <StatTile
                  icon={<GitFork size={20} />}
                  label="Top Repo Forks"
                  value={profile.topRepos.reduce((s, r) => s + r.forks, 0)}
                />
              </div>
            </BlurIn>

            {/* Contribution graph (rendered by an external service, no auth needed) */}
            <BlurIn delay={0.2}>
              <div className="overflow-x-auto rounded-xl border border-border bg-card/60 p-4">
                <p className="mb-3 text-sm font-medium text-foreground">Contribution graph</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://ghchart.rshah.org/6366f1/${GITHUB_USER}`}
                  alt={`${GITHUB_USER}'s GitHub contribution graph`}
                  className="min-w-[600px] w-full"
                  loading="lazy"
                />
              </div>
            </BlurIn>

            {/* Top repositories */}
            {profile.topRepos.length > 0 && (
              <BlurIn delay={0.3}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {profile.topRepos.map((repo) => (
                    <Link
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-xl border border-border bg-card/60 p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <BookMarked size={16} className="text-primary shrink-0" />
                        <span className="truncate font-semibold text-foreground">{repo.label}</span>
                        <ArrowUpRight
                          size={16}
                          className="ml-auto shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        />
                      </div>
                      <p className="mb-4 line-clamp-2 flex-grow text-sm text-muted-foreground">
                        {repo.description ?? "No description provided."}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ background: LANG_COLORS[repo.language] ?? "#8b949e" }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star size={13} /> {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork size={13} /> {repo.forks}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </BlurIn>
            )}

            {/* Profile link */}
            <BlurIn delay={0.4}>
              <div className="flex justify-center pt-2">
                <Link
                  href={config.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-2.5 text-sm font-medium",
                    "text-foreground transition-colors hover:border-primary/50 hover:text-primary cursor-can-hover",
                  )}
                >
                  <Github size={18} />
                  View full profile on GitHub
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </BlurIn>
          </div>
        )
      )}
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { config } from "@/data/config";
import { getGithubProfile, type GithubProfile } from "@/actions/github-stars";

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "Jupyter Notebook": "#DA5B0B",
  Shell: "#89e051",
  Dockerfile: "#384d54",
};

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="text-[18.4px] tabular-nums text-foreground">{value.toLocaleString()}</p>
      <p className="mt-0.5 text-[12px] text-muted-foreground">{label}</p>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section id="github" className="px-4 py-14">
      <div className="mx-auto max-w-[752px]">
        <h2 className="mb-1 text-center text-[18.4px] text-foreground">on github</h2>
        <p className="mb-8 text-center text-[13.6px] text-muted-foreground">
          what i&apos;ve been building in the open
        </p>
        {children}
      </div>
    </section>
  );
}

/**
 * Presentation only. Kept separate from the fetch so it can be rendered
 * from fixture data in tests and screenshots, and server-rendered later
 * without touching the markup.
 */
export function GithubActivityView({ profile }: { profile: GithubProfile }) {
  return (
    <Shell>
      <div className="grid grid-cols-3 gap-4 rounded-[20px] border border-border bg-card px-6 py-6">
        <Stat label="stars" value={profile.totalStars} />
        <Stat label="repositories" value={profile.publicRepos} />
        <Stat label="followers" value={profile.followers} />
      </div>

      {/* Rendered by an external service. Lazy, with explicit dimensions so a
          slow or failed load cannot shift the layout. */}
      <div className="mt-5 overflow-x-auto rounded-[20px] border border-border bg-card p-5">
        <p className="mb-3 text-[13.6px] text-muted-foreground">contributions</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/dd0200/${config.githubUsername}`}
          alt={`${config.githubUsername}'s GitHub contribution graph`}
          width={663}
          height={104}
          loading="lazy"
          decoding="async"
          className="w-full min-w-[560px]"
        />
      </div>

      {profile.topRepos.length > 0 && (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {profile.topRepos.map((repo) => (
            <li key={repo.name}>
              <Link
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-[20px] border border-border bg-card p-5 transition-colors duration-200 hover:border-foreground/25"
              >
                <span className="inline-flex items-center gap-1.5 text-[15.2px] text-foreground">
                  {repo.label}
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="text-muted-foreground transition-colors group-hover:text-[color:var(--brand-text)]"
                  />
                </span>
                <span className="mt-2 flex-1 text-[13.6px] leading-relaxed text-muted-foreground">
                  {repo.description ?? "No description provided."}
                </span>
                <span className="mt-4 flex items-center gap-4 text-[12px] text-muted-foreground">
                  {repo.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full"
                        style={{ background: LANG_COLORS[repo.language] ?? "#8b949e" }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span>{repo.stars} stars</span>
                  <span>{repo.forks} forks</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 text-center">
        <Link
          href={config.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13.6px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          full profile on github
          <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </Shell>
  );
}

export default function GithubActivity() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let alive = true;
    getGithubProfile()
      .then((p) => alive && setProfile(p))
      .catch(() => alive && setProfile(null))
      .finally(() => alive && setDone(true));
    return () => {
      alive = false;
    };
  }, []);

  // GitHub unreachable or rate-limited: render nothing at all rather than an
  // empty shell with a heading and no content.
  if (done && !profile) return null;

  if (!done) {
    return (
      <Shell>
        {/* Fixed height so arriving data doesn't shift the page. */}
        <div className="h-[92px] animate-pulse rounded-[20px] border border-border bg-card/50" />
      </Shell>
    );
  }

  return <GithubActivityView profile={profile!} />;
}

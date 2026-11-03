import type { Metadata } from "next";
import { config } from "@/data/config";

export const metadata: Metadata = {
  title: `About | ${config.author}`,
  description: config.description.short,
};

export default function AboutPage() {
  return (
    <main className="px-4 py-16">
      <div className="mx-auto max-w-[600px]">
        <h1 className="text-center font-display text-[40px] leading-tight text-foreground">
          Who am i?
        </h1>
        <p className="mb-10 mt-1 text-center text-[13.6px] text-muted-foreground">
          about me
        </p>

        <div className="space-y-5 text-[15.2px] leading-relaxed text-muted-foreground">
          <p>
            i&apos;m an ai engineer who builds and ships ai systems end to end —
            architecture, implementation, and the unglamorous part where it has to
            keep running in production.
          </p>
          <p>
            my toolkit is python, langgraph, crewai, langchain, fastapi and docker.
            i care about jwt rbac, rate-limit handling, load balancing and
            observability as much as prompt design and model accuracy, because
            that&apos;s usually what separates a demo from something people can
            actually depend on.
          </p>
          <p>
            i founded{" "}
            <a
              href="https://agentnine.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-[color:var(--brand-text)]"
            >
              agentnine
            </a>
            , an independent directory of open-source ai agents. finding an agent is
            easy; finding out how to set it up and what access it wants is not. every
            listing shows the repository, install steps for windows, macos and linux,
            what the agent can reach, and what&apos;s still undocumented. i lead
            product direction and technical decisions, working with a small team
            across product, engineering and launch.
          </p>
          <p>
            before that, as an ai/ml trainee at technosavvys, i fine-tuned a bert
            classifier on 500+ student reviews with hugging face — 88% accuracy, a
            15% lift over a tf-idf baseline — and shipped the streamlit dashboard
            mentors actually used.
          </p>
          <p>
            i&apos;m open to ai engineer and applied ai roles, remote or hybrid.
          </p>
        </div>
      </div>
    </main>
  );
}

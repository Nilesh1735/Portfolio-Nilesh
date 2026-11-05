import CurvedName from "@/components/v2/curved-name";
import AvatarMark from "@/components/v2/avatar-mark";
import CopyPill from "@/components/v2/copy-pill";
import Highlights from "@/components/v2/highlights";
import ExperienceList from "@/components/v2/experience-list";
import SkillStack from "@/components/v2/skill-stack";
import Section from "@/components/v2/section";
import GithubActivity from "@/components/v2/github-activity";
import { config } from "@/data/config";
import { EDUCATION, CERTIFICATIONS } from "@/data/stack";

// The `npx` card is only advertised once the package is actually published —
// otherwise the command errors for anyone who runs it. Flip this on after
// `npm publish` (see package/README.md).
const NPX_PUBLISHED = false;

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="anim-up delay-2 px-4 pb-6 pt-14">
        <div className="mx-auto flex max-w-[600px] flex-col items-center text-center">
          {/* The arc's open bottom cradles the avatar; the negative margin
              is tuned to the viewBox, not guessed. */}
          <div className="relative flex flex-col items-center">
            {/* The name is the page heading. Wrapping the arc in an h1 gives
                the document a top-level heading without changing the layout;
                the SVG already carries the accessible name. */}
            <h1 className="contents">
              <CurvedName
                text={config.author}
                className="anim-fade delay-3 h-[150px] w-[300px] text-foreground"
              />
            </h1>
            {/* Clearance tuned so the arc's descenders clear the circle;
                a tighter overlap was cutting into the lettering. */}
            <div className="anim-pop delay-5 -mt-[78px]">
              <AvatarMark alt={`${config.author} avatar`} size={160} />
            </div>
          </div>

          <p className="mt-5 text-[17.6px] text-foreground">
            founder &amp; ai engineer @ agentnine
          </p>

          <div className="mt-4">
            {NPX_PUBLISHED ? (
              <CopyPill command="npx nileshraj" />
            ) : (
              <CopyPill command={config.email} prefix="✉" />
            )}
          </div>

          <p className="mt-8 text-[15.2px] leading-relaxed text-muted-foreground">
            i build and ship ai systems, from architecture to live deployment. my
            toolkit is python, langgraph, crewai, langchain, fastapi and docker. i
            treat jwt rbac, rate limiting and observability as seriously as prompt
            design and model accuracy.
          </p>
        </div>
      </section>

      <Section
        id="highlights"
        title="highlights!"
        subtitle="some things i made because i could"
        wide
      >
        <Highlights />
      </Section>

      <GithubActivity />

      <Section id="experience" title="my experience">
        <ExperienceList />
      </Section>

      <Section id="skills" title="skill stack">
        <SkillStack />
      </Section>

      <Section id="education" title="my education">
        <ul className="divide-y divide-border">
          {EDUCATION.map((e) => (
            <li key={e.institution} className="flex items-start justify-between gap-6 py-5">
              <div className="min-w-0">
                <h3 className="text-[17.6px] text-foreground">{e.institution}</h3>
                <p className="mt-0.5 text-[13.6px] text-muted-foreground">{e.degree}</p>
                {e.detail && (
                  <p className="text-[12px] text-muted-foreground">{e.detail}</p>
                )}
              </div>
              <p className="shrink-0 text-[12px] text-muted-foreground">{e.duration}</p>
            </li>
          ))}
        </ul>

        <h3 className="mb-3 mt-10 flex items-center gap-2 text-[15.2px] text-foreground">
          <span aria-hidden="true" style={{ color: "var(--brand-text)" }}>✦</span>
          certifications
        </h3>
        <ul className="divide-y divide-border">
          {CERTIFICATIONS.map((c) => (
            <li key={c.title} className="flex items-start justify-between gap-6 py-4">
              <div className="min-w-0">
                <p className="text-[15.2px] text-foreground">{c.title}</p>
                <p className="mt-0.5 text-[13.6px] text-muted-foreground">{c.issuer}</p>
              </div>
              <p className="shrink-0 text-[12px] text-muted-foreground">{c.year}</p>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}

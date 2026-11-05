"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { EXPERIENCE } from "@/data/constants";

/**
 * Compact experience rows with a "my work" disclosure.
 *
 * Uses real <button aria-expanded> + conditional content rather than a
 * max-height transition, so collapsed bullets are genuinely absent from
 * the accessibility tree and the tab order.
 */
function Row({ exp }: { exp: (typeof EXPERIENCE)[number] }) {
  const [open, setOpen] = useState(false);
  const panelId = `work-${exp.id}`;

  return (
    <li className="py-5">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="text-[17.6px] text-foreground">{exp.company.toLowerCase()}</h3>
          <p className="mt-0.5 text-[13.6px] text-muted-foreground">
            {exp.title.toLowerCase()}
          </p>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-2 inline-flex items-center gap-1.5 text-[13.6px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <ChevronRight
              size={13}
              aria-hidden="true"
              className="transition-transform duration-200"
              style={{ transform: open ? "rotate(90deg)" : "none", color: "var(--brand-text)" }}
            />
            my work
          </button>
        </div>

        <div className="shrink-0 text-right text-[12px] leading-5 text-muted-foreground">
          <p>{`${exp.startDate} - ${exp.endDate}`.toLowerCase()}</p>
          <p>{exp.location.toLowerCase()}</p>
        </div>
      </div>

      {/* Always rendered so the height can transition; the grid 0fr->1fr
          trick animates to an unknown height without measuring it in JS.
          `inert` keeps the collapsed bullets out of the tab order and the
          accessibility tree, which plain overflow:hidden would not. */}
      <div className="disclosure" data-open={open} aria-hidden={!open} inert={!open || undefined}>
        <div>
          <ul id={panelId} className="space-y-2 pr-4">
            {(exp.description ?? []).map((point) => (
              <li
                key={point}
                className="text-[13.6px] leading-relaxed text-muted-foreground before:mr-2 before:text-[color:var(--brand-text)] before:content-['–']"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

export default function ExperienceList() {
  return (
    <ul className="divide-y divide-border">
      {EXPERIENCE.map((exp) => (
        <Row key={exp.id} exp={exp} />
      ))}
    </ul>
  );
}

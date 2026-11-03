"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, HIGHLIGHTS } from "@/data/highlights";

export default function Highlights() {
  const [active, setActive] = useState<string>("all");

  const shown =
    active === "all"
      ? HIGHLIGHTS
      : HIGHLIGHTS.filter((h) => h.categories.includes(active));

  return (
    <div>
      {/* Category pills. A radiogroup, because exactly one is ever active. */}
      <div
        role="radiogroup"
        aria-label="Filter highlights by category"
        className="mx-auto mb-8 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full p-1.5"
        style={{ background: "var(--brand)" }}
      >
        {CATEGORIES.map((cat) => {
          const selected = active === cat;
          return (
            <button
              key={cat}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setActive(cat)}
              className="rounded-full px-4 py-1.5 text-[13.6px] transition-colors duration-200"
              style={
                selected
                  ? { background: "#fff", color: "#0c0c0c" }
                  : { color: "rgba(255,255,255,0.92)" }
              }
            >
              {cat}
            </button>
          );
        })}
      </div>

      <ul className="grid gap-5 sm:grid-cols-2">
        {shown.map((h, i) => (
          <li key={h.id} className="group">
            <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-card">
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                <Image
                  src={h.image}
                  alt={`${h.title} interface`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top"
                  priority={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[17.6px] text-foreground">{h.title}</h3>
                <p className="mt-2 flex-1 text-[13.6px] leading-relaxed text-muted-foreground">
                  {h.blurb}
                </p>

                <div className="mt-4 flex gap-4 text-[13.6px]">
                  <Link
                    href={h.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-foreground transition-colors duration-200 hover:text-[color:var(--brand-text)]"
                  >
                    live <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                  <Link
                    href={h.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    code <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {shown.length === 0 && (
        <p className="py-8 text-center text-[13.6px] text-muted-foreground">
          nothing here yet.
        </p>
      )}
    </div>
  );
}

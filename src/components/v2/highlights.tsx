"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, BOOKS_CATEGORY, HIGHLIGHTS } from "@/data/highlights";
import { BOOKS } from "@/data/stack";

export default function Highlights() {
  // No "all" pill: the row stays short, and nothing selected means every
  // project is shown. Clicking the active pill clears it again.
  const [active, setActive] = useState<string | null>(null);

  // "books" is the odd one out: it replaces the panel rather than filtering
  // it, since books have no overlap with the project categories.
  const showingBooks = active === BOOKS_CATEGORY;
  const shown =
    active && !showingBooks
      ? HIGHLIGHTS.filter((h) => h.categories.includes(active))
      : HIGHLIGHTS;

  return (
    <div>
      {/* Category pills. A radiogroup, because exactly one is ever active. */}
      <div
        role="group"
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
              aria-pressed={selected}
              onClick={() => setActive(selected ? null : cat)}
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

      {showingBooks ? (
        <section
          className="mx-auto max-w-[600px]"
          aria-labelledby="book-recommendations-title"
        >
          <h3
            id="book-recommendations-title"
            className="mb-1 text-[16px] text-foreground"
          >
            books i&apos;ve read
          </h3>
          <p className="mb-3 text-[13.6px] text-muted-foreground">
            and would recommend to you.
          </p>
          <ul className="divide-y divide-border">
            {BOOKS.map((book) => (
              <li
                key={book.title}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
              >
                <p className="min-w-0 text-[15.2px] text-foreground">{book.title}</p>
                <p className="text-[13.6px] text-muted-foreground sm:shrink-0 sm:text-right">
                  by {book.author}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : (
      <ul className="grid gap-5 sm:grid-cols-2">
        {shown.map((h, i) => (
          <li key={h.id} className="group">
            <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-card transition-[transform,border-color] duration-300 ease-out will-change-transform group-hover:-translate-y-1 group-hover:border-foreground/25 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
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
      )}

      {!showingBooks && shown.length === 0 && (
        <p className="py-8 text-center text-[13.6px] text-muted-foreground">
          nothing here yet.
        </p>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { config } from "@/data/config";

export const metadata: Metadata = {
  title: `Contact | ${config.author}`,
  description: `Get in touch with ${config.author}.`,
};

const LINKS = [
  { label: "email", value: config.email, href: `mailto:${config.email}` },
  { label: "linkedin", value: "in/nilesh-raj-ai", href: config.social.linkedin },
  { label: "github", value: "Nilesh1735", href: config.social.github },
  { label: "agentnine", value: "agentnine.pro", href: "https://agentnine.pro" },
];

export default function ContactPage() {
  return (
    <main className="px-4 py-16">
      <div className="mx-auto max-w-[600px]">
        <h1 className="text-center font-display text-[40px] leading-tight text-foreground">
          Wanna Contact?
        </h1>
        <p className="mb-10 mt-1 text-center text-[13.6px] text-muted-foreground">
          get in touch
        </p>

        <p className="mb-8 text-center text-[15.2px] leading-relaxed text-muted-foreground">
          if you want to get in touch, pick whichever way suits you and i&apos;ll get
          back to you :)
        </p>

        <ul className="divide-y divide-border">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="group flex items-center justify-between gap-6 py-4 transition-colors duration-200"
              >
                <span className="text-[13.6px] text-muted-foreground">{l.label}</span>
                <span className="inline-flex items-center gap-1.5 text-[15.2px] text-foreground transition-colors duration-200 group-hover:text-[color:var(--brand-text)]">
                  {l.value}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

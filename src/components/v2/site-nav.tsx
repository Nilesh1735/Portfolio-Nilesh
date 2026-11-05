"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LEFT = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
];
const RIGHT = [
  { label: "resume", href: "/resume" },
  { label: "contact", href: "/contact" },
];

function NavLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "px-3 py-1 text-[15.2px] transition-colors duration-200",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const is = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className="anim-down delay-1 w-full pt-8">
      <nav aria-label="Primary" className="flex items-center justify-center gap-1">
        {LEFT.map((l) => (
          <NavLink key={l.href} {...l} active={!!is(l.href)} />
        ))}

        <Link href="/" aria-label="Home" className="mx-2 inline-flex">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M12 2.5l2.9 6.3 6.6.8-4.9 4.5 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6L2.5 9.6l6.6-.8z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
              className="text-foreground"
            />
          </svg>
        </Link>

        {RIGHT.map((l) => (
          <NavLink key={l.href} {...l} active={!!is(l.href)} />
        ))}
      </nav>
    </header>
  );
}

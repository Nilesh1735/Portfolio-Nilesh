"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { footer } from "./config";
import SocialMediaButtons from "../social/social-media-icons";
import { config } from "@/data/config";

function CurrentYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (year === null) return null;

  return <span suppressHydrationWarning>{year}</span>;
}

function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-border px-4 py-6 sm:flex-row md:px-6 sm:justify-between">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © <CurrentYear /> {config.author}. All rights reserved.
      </p>
      <SocialMediaButtons />
      <nav className="flex gap-4 sm:gap-6 z-10">
        {footer.map((link, index) => {
          const { title, href } = link;

          // External, so open in a new tab and carry rel. Previously these
          // wrapped a <Button> inside the <Link>, which is invalid HTML and
          // announces as a button nested in a link to screen readers.
          const external = href.startsWith("http");

          return (
            <Link
              className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              href={href}
              key={`l_${index}`}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              {title}
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}

export default Footer;

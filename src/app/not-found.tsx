import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

const NotFoundPage = () => {
  return (
    <main className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-sm tracking-[0.3em] text-muted-foreground">404</p>
      <h1 className="font-display text-5xl font-bold md:text-7xl">Page not found</h1>
      <p className="max-w-prose text-muted-foreground">
        That page doesn&apos;t exist, or it has moved somewhere else.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg border border-border bg-card/60 px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
      >
        Back to home
      </Link>
    </main>
  );
};

export default NotFoundPage;

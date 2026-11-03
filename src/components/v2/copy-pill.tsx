"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * The monospace command pill with a copy affordance.
 *
 * `prefix` is decorative (a shell prompt) and hidden from assistive tech,
 * so screen readers announce only the command itself.
 */
export default function CopyPill({
  command,
  prefix = "%",
  copyValue,
}: {
  command: string;
  prefix?: string;
  copyValue?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = useCallback(async () => {
    const value = copyValue ?? command;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return; // clipboard blocked (insecure context / denied) — stay silent
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }, [command, copyValue]);

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-3 rounded-full border border-border bg-secondary/60 px-5 py-2.5 font-mono text-[13.6px] text-foreground transition-colors duration-200 hover:border-foreground/25"
      aria-label={copied ? `Copied ${command}` : `Copy ${command}`}
    >
      <span aria-hidden="true" style={{ color: "var(--brand-text)" }}>
        {prefix}
      </span>
      <span>{command}</span>
      <span className="text-muted-foreground transition-colors group-hover:text-foreground">
        {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}

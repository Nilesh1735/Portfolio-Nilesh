import type { ReactNode } from "react";

/**
 * One content band. The column is deliberately narrow (600px) — that
 * measure is a large part of why the reference design reads as calm.
 */
export default function Section({
  title,
  subtitle,
  children,
  id,
  wide = false,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  id?: string;
  wide?: boolean;
}) {
  return (
    <section id={id} className="anim-up delay-3 px-4 py-14">
      <div className={wide ? "mx-auto max-w-[752px]" : "mx-auto max-w-[600px]"}>
        {title && (
          <h2 className="mb-1 text-center text-[18.4px] text-foreground">{title}</h2>
        )}
        {subtitle && (
          <p className="mb-8 text-center text-[13.6px] text-muted-foreground">{subtitle}</p>
        )}
        {!subtitle && title && <div className="mb-8" />}
        {children}
      </div>
    </section>
  );
}

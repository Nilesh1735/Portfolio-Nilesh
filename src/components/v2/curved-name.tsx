/**
 * The name set on a circular arc, in Instrument Serif.
 *
 * Pure SVG <textPath> — no JS and nothing animated, so it costs one paint.
 *
 * Geometry: the arc runs (30,160) → (290,160) with r=133, which puts its
 * apex at y=55. Glyphs rise ~30px from the baseline, so their tops land
 * near y=25 and stay inside the viewBox. An earlier version used a
 * semicircle whose apex sat at y=10 and the lettering was clipped off the
 * top edge.
 */
export default function CurvedName({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 170"
      className={className}
      role="img"
      aria-label={text}
      focusable="false"
      // overflow stays visible so a longer name degrades by spilling rather
      // than being silently cut.
      style={{ overflow: "visible" }}
    >
      <path id="name-arc" d="M 30 160 A 133 133 0 0 1 290 160" fill="none" />
      <text
        fill="currentColor"
        fontFamily="var(--font-display), Georgia, serif"
        fontSize="40"
        letterSpacing="2"
      >
        <textPath href="#name-arc" startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

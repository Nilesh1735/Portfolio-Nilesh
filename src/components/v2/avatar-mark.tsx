import Image from "next/image";

/**
 * The accent circle at the centre of the hero.
 *
 * PLACEHOLDER: a neutral geometric mark stands in until an illustrated
 * portrait is supplied. Drop a square SVG/PNG at /images/avatar.svg (or
 * .png) and pass `src` — the circle, sizing and mask stay as they are.
 */
export default function AvatarMark({
  src,
  alt,
  size = 168,
}: {
  src?: string;
  alt: string;
  size?: number;
}) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full"
      style={{ width: size, height: size, background: "var(--brand)" }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          priority
          className="h-full w-full object-cover"
        />
      ) : (
        // Interim mark: a monogram-adjacent glyph that reads as intentional
        // rather than as a missing image.
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full"
          role="img"
          aria-label={alt}
        >
          <g
            fill="none"
            stroke="#fff"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M34 68V32l32 36V32" />
            <circle cx="50" cy="50" r="30" strokeOpacity="0.35" />
          </g>
        </svg>
      )}
    </div>
  );
}

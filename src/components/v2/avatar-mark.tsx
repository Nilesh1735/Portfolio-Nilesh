import Image from "next/image";

/**
 * The portrait mark in the hero.
 *
 * The brand circle is part of the artwork itself (red ring, white disc,
 * two-tone portrait), so this renders the image alone — no coloured
 * background behind it, which would show as a second ring at the edges.
 *
 * The art is thresholded once at 1024px and every size, including the
 * favicons, is a downscale of that same master, so the tab icon and the
 * hero show identical artwork.
 */
export default function AvatarMark({
  src = "/images/avatar.webp",
  alt,
  size = 168,
}: {
  src?: string;
  alt: string;
  size?: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      priority
      sizes={`${size}px`}
      className="shrink-0 rounded-full"
      style={{ width: size, height: size }}
    />
  );
}

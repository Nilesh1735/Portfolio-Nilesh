import Image from "next/image";

/**
 * The portrait mark in the hero.
 *
 * An illustration drawn as SVG, not derived from a photo — the two photo
 * treatments tried before could not produce drawn linework. The brand
 * circle is part of the artwork, so nothing is painted behind it.
 *
 * Vector, so it stays crisp at any size and costs ~2.5KB. The favicons are
 * rasterised from this same file, so the tab icon and the hero match.
 */
export default function AvatarMark({
  src = "/images/avatar.svg",
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

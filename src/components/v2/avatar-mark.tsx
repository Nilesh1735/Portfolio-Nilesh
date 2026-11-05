import Image from "next/image";

/**
 * The portrait mark in the hero.
 *
 * Two states: the plain portrait at rest, the blushing one on hover. Both
 * are stacked and cross-faded with opacity alone — no layout, no repaint,
 * so the swap runs on the compositor and costs nothing on a frame.
 *
 * The plain state is the default because hover does not exist on touch,
 * where the resting state is all anyone sees. Both images are eagerly
 * loaded: the hover one is 21KB and fetching it on first hover would show
 * a blank flash.
 *
 * The brand circle is baked into both images, so nothing is painted
 * behind them. The icon files are generated from the plain variant, so the
 * tab icon matches the resting state.
 */
export default function AvatarMark({
  alt,
  size = 168,
}: {
  alt: string;
  size?: number;
}) {
  return (
    <span
      className="group relative block shrink-0 rounded-full"
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/avatar.webp"
        alt={alt}
        width={size}
        height={size}
        priority
        sizes={`${size}px`}
        className="absolute inset-0 h-full w-full rounded-full transition-opacity duration-300 ease-out group-hover:opacity-0 motion-reduce:transition-none"
      />
      <Image
        src="/images/avatar-blush.webp"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        priority
        sizes={`${size}px`}
        className="absolute inset-0 h-full w-full rounded-full opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:transition-none"
      />
    </span>
  );
}

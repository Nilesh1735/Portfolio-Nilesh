import { motion } from "motion/react";
import Link from "next/link";
import styles from "./style.module.scss";
import { blur, translate } from "../../anim";
import { Link as LinkType } from "@/types";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FunnyThemeToggle from "@/components/theme/funny-theme-toggle";

interface SelectedLink {
  isActive: boolean;
  index: number;
}

interface BodyProps {
  links: LinkType[];
  selectedLink: SelectedLink;
  setSelectedLink: (selectedLink: SelectedLink) => void;
  setIsActive: (isActive: boolean) => void;
}

export default function Body({
  links,
  selectedLink,
  setSelectedLink,
  setIsActive,
}: BodyProps) {
  const params = useParams();
  const [currentHref, setCurrentHref] = useState("/");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const { pathname } = window.location;

    // Only scroll-spy on the single-page home route.
    if (pathname !== "/") {
      setCurrentHref(pathname + window.location.hash);
      return;
    }

    // Map each nav link to the id of the section it points at.
    const hrefToId = (href: string) => {
      if (href === "/") return "hero";
      const i = href.indexOf("#");
      return i === -1 ? null : href.slice(i + 1);
    };

    const targets = links
      .map((l) => ({ href: l.href, el: document.getElementById(hrefToId(l.href) ?? "") }))
      .filter((t): t is { href: string; el: HTMLElement } => Boolean(t.el));

    if (targets.length === 0) return;

    // Active = the last linked section whose top has passed the 35% viewport line.
    const computeActive = () => {
      const line = window.scrollY + window.innerHeight * 0.35;
      let active = targets[0].href;
      for (const t of targets) {
        if (t.el.offsetTop <= line) active = t.href;
      }
      setCurrentHref(active);
    };

    computeActive();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeActive);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [params, links]);

  const getChars = (word: string) => {
    let chars: React.JSX.Element[] = [];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          className="pointer-events-none"
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      );
    });
    return chars;
  };

  return (
    <div className={cn(styles.body, "flex flex-col items-end md:flex-row")}>
      <FunnyThemeToggle className="w-6 h-6 mr-6 flex md:hidden" />
      {links.map((link, index) => {
        const { title, href, target } = link;

        return (
          <Link
            key={`l_${index}`}
            href={href}
            target={target}
            className="cursor-can-hover rounded-lg"
          >
            <motion.p
              className={cn(
                "font-display rounded-lg",
                currentHref !== href ? "text-muted-foreground" : "underline"
              )}
              onClick={() => setIsActive(false)}
              onMouseOver={() => setSelectedLink({ isActive: true, index })}
              onMouseLeave={() => setSelectedLink({ isActive: false, index })}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? "open"
                  : "closed"
              }
            >
              {getChars(title)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
}

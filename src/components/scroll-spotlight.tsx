"use client";

import { useEffect, useRef } from "react";

export default function ScrollSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    // Update the gradient position by writing a CSS variable directly on the
    // element — no React state, so scrolling triggers zero re-renders. Work is
    // coalesced into one rAF per frame regardless of scroll-event volume.
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
      el.style.setProperty("--spotlight-y", `${percent}%`);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div ref={ref} className="spotlight-bg" />;
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Pan speed (CSS px/sec). 
const PAN_SPEED = 70;
const PAUSE = 1.2; 
const MIN_SCROLL_OVERFLOW = 0.2;
const FALLBACK_BG = "linear-gradient(135deg, #1e293b, #0f172a)";

const ScrollingPreview = ({
  src,
  alt,
  bg,
}: {
  src: string;
  alt: string;
  bg?: string;
}) => {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scrollPx, setScrollPx] = useState(0);
  const [bgReady, setBgReady] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    const compute = () => {
      const vp = viewportRef.current;
      if (cancelled || !vp || !img.naturalWidth) return;
      const ratio = img.naturalHeight / img.naturalWidth;
      const displayedHeight = vp.clientWidth * ratio;
      const overflow = displayedHeight - vp.clientHeight;
      setScrollPx(overflow > vp.clientHeight * MIN_SCROLL_OVERFLOW ? overflow : 0);
      setImgLoaded(true);
    };
    img.onload = compute;
    img.src = src;
    if (img.complete) compute();
    
    const handleResize = () => {
      const vp = viewportRef.current;
      if (!vp || !img.naturalWidth) return;
      const ratio = img.naturalHeight / img.naturalWidth;
      const displayedHeight = vp.clientWidth * ratio;
      const overflow = displayedHeight - vp.clientHeight;
      setScrollPx(overflow > vp.clientHeight * MIN_SCROLL_OVERFLOW ? overflow : 0);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
    };
  }, [src]);

  useEffect(() => {
    if (!bg) {
      setBgReady(false);
      return;
    }
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => !cancelled && setBgReady(true);
    img.onerror = () => !cancelled && setBgReady(false);
    img.src = bg;
    return () => { cancelled = true; };
  }, [bg]);

  const scrolls = scrollPx > 0;
  const animate = !reduceMotion && scrolls && imgLoaded;

  const pan = scrollPx / PAN_SPEED;
  const total = pan * 2 + PAUSE * 2;
  const times = [0, pan / total, (pan + PAUSE) / total, (pan * 2 + PAUSE) / total, 1];

  return (
    <div
      className="pointer-events-none absolute inset-0"
      role="img"
      aria-label={alt}
    >
      {/* wallpaper background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#0f172a",
          backgroundImage: bgReady && bg ? `url("${bg}")` : FALLBACK_BG,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* floating screenshot panel */}
      <div
        ref={viewportRef}
        className="sp-shot"
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          top: 20,
          bottom: 0,
          overflow: "hidden",
          borderRadius: 10,
          boxShadow:
            "0 24px 50px -12px rgba(8,20,55,0.55), 0 8px 18px -8px rgba(8,20,55,0.45)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url("${src}")`,
            backgroundSize: scrolls ? "100% auto" : "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: scrolls ? "50% 0%" : "center",
            willChange: "transform", 
          }}
          // FIX 1: Only animate when the card is actually in the viewport
          // FIX 2: Animate 'y' (transform) instead of 'backgroundPosition' for GPU acceleration
          animate={
            animate
              ? {
                  y: [0, -scrollPx, -scrollPx, 0, 0],
                }
              : undefined
          }
          transition={
            animate
              ? { duration: total, ease: "easeInOut", repeat: Infinity, times }
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default ScrollingPreview;
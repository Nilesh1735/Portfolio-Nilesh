"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import Image from "next/image";

interface ParallaxMockupProps {
  /** Screenshots to crossfade through as the card scrolls. */
  images: string[];
  /** Fake address-bar text in the mock browser chrome. */
  urlLabel: string;
  /** Floating status pill heading. */
  metric: string;
  /** Floating status pill subtext. */
  subtext: string;
  /** Tailwind gradient classes for the ambient glow. */
  glow?: string;
  /**
   * Only the first above-the-fold mockup should preload its image —
   * marking every card `priority` forces the browser to fetch all of
   * them up front and pushes out LCP.
   */
  priority?: boolean;
}

export default function ParallaxMockup({
  images,
  urlLabel,
  metric,
  subtext,
  glow = "from-blue-500/20 to-cyan-500/10",
  priority = false,
}: ParallaxMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const yMain = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const yFloat = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const slideCount = images.length;

  useEffect(() => {
    if (slideCount <= 1) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const progress = Math.min(0.99, Math.max(0, latest));
      const newIndex = Math.floor(progress * slideCount);
      setImageIndex((prev) => (prev !== newIndex ? newIndex : prev));
    });

    return () => unsubscribe();
  }, [scrollYProgress, slideCount]);

  if (slideCount === 0) return null;

  const activeIndex = Math.min(imageIndex, slideCount - 1);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450px] rounded-xl overflow-hidden border border-border bg-muted/20 perspective-container"
    >
      {/* Layer 1: Ambient Background Glow */}
      <motion.div
        style={{ y: yBg }}
        className={`absolute inset-0 z-0 bg-gradient-to-br ${glow}`}
        aria-hidden="true"
      >
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/30 rounded-full blur-3xl" />
      </motion.div>

      {/* Layer 2: Main App Window */}
      <motion.div
        style={{ y: yMain }}
        className="absolute inset-x-6 top-6 bottom-6 z-10 rounded-lg bg-card border border-border shadow-2xl overflow-hidden flex flex-col backdrop-blur-sm"
      >
        {/* Browser/App Bar */}
        <div className="h-8 bg-muted flex items-center gap-2 px-4 border-b border-border shrink-0 z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          <div className="ml-3 text-[10px] text-muted-foreground font-mono truncate">
            {urlLabel}
          </div>
        </div>

        {/* Screenshot Area with AnimatePresence for crossfade */}
        <div className="relative flex-1 w-full bg-[#0a0a0a] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center p-4"
            >
              <Image
                src={images[activeIndex]}
                alt={`${urlLabel} interface, view ${activeIndex + 1} of ${slideCount}`}
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={priority && activeIndex === 0}
                loading={priority && activeIndex === 0 ? undefined : "lazy"}
              />
            </motion.div>
          </AnimatePresence>

          {/* Subtle gradient overlay to blend the image into the card */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Layer 3: Floating UI Element */}
      <motion.div
        style={{ y: yFloat }}
        className="absolute bottom-4 right-4 z-20 bg-card border border-border p-3 rounded-lg shadow-xl flex items-center gap-2 backdrop-blur-md bg-card/90 pointer-events-none"
      >
        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 text-xs font-bold animate-pulse">
          {"✓"}
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground">{metric}</p>
          <p className="text-[10px] text-muted-foreground">{subtext}</p>
        </div>
      </motion.div>
    </div>
  );
}

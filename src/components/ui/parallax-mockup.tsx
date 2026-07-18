"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import Image from "next/image";

// Explicit interface definition to satisfy TypeScript
interface ParallaxMockupProps {
  projectIndex: number;
}

export default function ParallaxMockup({ projectIndex }: ParallaxMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const yMain = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const yFloat = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const glowColor = projectIndex === 0 ? "from-blue-500/20 to-cyan-500/10" : "from-purple-500/20 to-pink-500/10";
  const floatingMetric = projectIndex === 0 ? "Agents Online" : "SaaS System Nominal";
  const floatingSubtext = projectIndex === 0 ? "Tasks Automated: 1,204" : "Socratic Engine Active";
  
  // UPDATED IMAGE ARRAYS FOR OMNICREW AI
  const images = projectIndex === 0 
    ? [
        "/images/omnicrew1.png", // Landing Page
        "/images/omnicrew2.png", // Login/Signup
        "/images/omnicrew5.png", // Dashboard
        "/images/omnicrew4.png"  // History Page
      ] 
    : [
        "/images/Luman1.png",
        "/images/Luman2.png",
        "/images/Luman3.png",
        "/images/Luman4.png",
        "/images/Luman5.png",
        "/images/Luman6.png",
      ];

  useEffect(() => {
    if (images.length <= 1) return;
    
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const progress = Math.min(0.99, Math.max(0, latest));
      const newIndex = Math.floor(progress * images.length);
      
      setImageIndex((prev) => (prev !== newIndex ? newIndex : prev));
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, images.length]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[450px] rounded-xl overflow-hidden border border-border bg-muted/20 perspective-container"
    >
      {/* Layer 1: Ambient Background Glow */}
      <motion.div 
        style={{ y: yBg }} 
        className={`absolute inset-0 z-0 bg-gradient-to-br ${glowColor}`}
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
            {projectIndex === 0 ? "omnicrew.ai/terminal" : "lumanguide.ai/chat"}
          </div>
        </div>
        
        {/* Screenshot Area with AnimatePresence for crossfade */}
        <div className="relative flex-1 w-full bg-[#0a0a0a] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={imageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center p-4"
            >
              <Image
                src={images[Math.min(imageIndex, images.length - 1)]}
                alt={`App Interface ${imageIndex + 1}`}
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
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
          <p className="text-xs font-semibold text-foreground">{floatingMetric}</p>
          <p className="text-[10px] text-muted-foreground">{floatingSubtext}</p>
        </div>
      </motion.div>
    </div>
  );
}
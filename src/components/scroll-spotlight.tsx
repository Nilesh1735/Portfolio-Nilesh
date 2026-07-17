"use client";

import { useEffect, useState } from "react";

export default function ScrollSpotlight() {
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setPos(scrollPercent);
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className="spotlight-bg" 
      style={{ background: `radial-gradient(circle at 50% ${pos}%, hsl(var(--primary) / 0.05), transparent 50%)` }}
    />
  );
}
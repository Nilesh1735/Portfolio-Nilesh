"use client";

import type { CSSProperties } from "react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { SKILLS } from "@/data/constants";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

// A premium 3D tilt card that reacts to mouse movement. Very performant (GPU accelerated).
const TiltCard = ({ skill }: { skill: { name: string; label: string; color: string; icon: string; shortDescription: string } }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth out the mouse movement
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.li
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", "--skill": skill.color } as CSSProperties}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-5 border",
        "border-border/60 bg-secondary/20 backdrop-blur-sm transition-colors duration-300",
        "hover:border-[var(--skill)] hover:bg-secondary/40",
        "hover:shadow-[0_10px_40px_-12px_var(--skill)]"
      )}
    >
      {/* Glow */}
      <motion.span 
        style={{ background: "var(--skill)" }} 
        className="pointer-events-none absolute -top-6 h-16 w-16 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
      />
      {/* Icon */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={skill.icon}
        alt={skill.label}
        width={48}
        height={48}
        loading="lazy"
        className="relative size-12 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
        style={{ transform: "translateZ(50px)" }}
      />
      {/* Label */}
      <span 
        className="relative text-center text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground"
        style={{ transform: "translateZ(30px)" }}
      >
        {skill.label}
      </span>
    </motion.li>
  );
};

const SkillsSection = () => {
  return (
    <SectionWrapper
      id="skills"
      className="flex w-full min-h-screen flex-col justify-center py-24"
    >
      <SectionHeader
        id="skills"
        title="Tech Stack"
        desc="Tools I build with"
        className="static mb-14"
      />
      <ul className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 [perspective:1000px]">
        {Object.values(SKILLS).map((skill) => (
          <TiltCard key={skill.name} skill={skill} />
        ))}
      </ul>
    </SectionWrapper>
  );
};

export default SkillsSection;
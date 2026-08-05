"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import ClientAnimatedBackground from "@/components/client-animated-background"; // Import the wrapper
import SkillsSection from "@/components/sections/skills";
import ExperienceSection from "@/components/sections/experience";
import EducationSection from "@/components/sections/education";
import ProjectsSection from "@/components/sections/projects";
import GithubSection from "@/components/sections/github";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";

function MainPage() {
  return (
    <SmoothScroll>
      <ClientAnimatedBackground />
      <main className={cn("bg-slate-100 dark:bg-transparent canvas-overlay-mode")}>
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <GithubSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}

export default MainPage;
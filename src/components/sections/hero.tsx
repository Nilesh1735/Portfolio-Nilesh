"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn } from "../reveal-animations";
import { Github, Linkedin } from "lucide-react";
import { config } from "@/data/config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MagneticButton from "../ui/magnetic-button";

gsap.registerPlugin(ScrollTrigger);

import SectionWrapper from "../ui/section-wrapper";

const HeroSection = () => {
  const { isLoading } = usePreloader();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading || !heroRef.current) return;

    const ctx = gsap.context((self) => {
      const content = heroRef.current?.querySelector(".hero-content");
      if (!content) return;

      gsap.to(content, {
        opacity: 0,
        scale: 0.9,
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          pinSpacing: false,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <SectionWrapper id="hero" className={cn("relative w-full h-screen overflow-hidden")}>
      <div ref={heroRef} className="hero-content absolute inset-0 flex items-center justify-center">
        <div className="grid md:grid-cols-2 w-full max-w-7xl mx-auto">
          <div
            className={cn(
              "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
              "col-span-1",
              "flex flex-col justify-start md:justify-center items-center md:items-start",
              "pt-28 sm:pb-16 md:p-20 lg:p-24 xl:p-28"
            )}
          >
            {!isLoading && (
              <div className="flex flex-col">
                <div>
                  <BlurIn delay={0.7}>
                    <p
                      className={cn(
                        "md:self-start mt-4 font-medium text-md text-slate-500 dark:text-zinc-400",
                        "cursor-default sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                      )}
                    >
                      Hi, I am
                      <br className="md:hidden" />
                    </p>
                  </BlurIn>

                  <BlurIn delay={1}>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <h1
                          className={cn(
                            "-ml-[6px] leading-none text-transparent text-slate-800 text-left",
                            "font-bold text-7xl md:text-7xl lg:text-8xl xl:text-9xl",
                            "cursor-default text-edge-outline font-display "
                          )}
                        >
                          {config.author.split(" ")[0]}
                          <br className="md:block hiidden" />
                          {config.author.split(" ")[1]}
                        </h1>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="dark:bg-white dark:text-black"
                      >
                        building AI that actually works
                      </TooltipContent>
                    </Tooltip>
                  </BlurIn>
                  <BlurIn delay={1.2}>
                    <p
                      className={cn(
                        "md:self-start md:mt-4 font-medium text-md text-slate-500 dark:text-zinc-400",
                        "cursor-default sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                      )}
                    >
                      AI/ML Engineer | GenAI Developer
                    </p>
                  </BlurIn>
                </div>
                
                {/* Button Group */}
                <div className="mt-8 flex flex-col gap-3 w-fit">
                  <div className="md:self-start flex gap-3 flex-wrap">
                    
                    {/* Hire Me Button */}
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <MagneticButton>
                          <Link href={"#contact"}>
                            <Button
                              variant={"outline"}
                              className="block w-full overflow-hidden"
                            >
                              Hire Me
                            </Button>
                          </Link>
                        </MagneticButton>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>let&apos;s build something great together</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Resume Button */}
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <MagneticButton>
                          <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                            <Button
                              variant={"outline"}
                              className="block w-full overflow-hidden"
                            >
                              Resume
                            </Button>
                          </Link>
                        </MagneticButton>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>view my resume</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Social Icons */}
                    <div className="flex items-center h-full gap-2">
                      <Link
                        href={config.social.github}
                        target="_blank"
                        className="cursor-can-hover"
                      >
                        <Button variant={"outline"}>
                          <Github size={24} />
                        </Button>
                      </Link>
                      <Link
                        href={config.social.linkedin}
                        target="_blank"
                        className="cursor-can-hover"
                      >
                        <Button variant={"outline"}>
                          <Linkedin size={24} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="grid col-span-1"></div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
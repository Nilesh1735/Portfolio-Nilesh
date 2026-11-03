"use client";

import React from "react";
import { BlurIn } from "@/components/reveal-animations";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { EXPERIENCE } from "@/data/constants";

// Rendered straight from the shared EXPERIENCE data so this section and the
// AI assistant's knowledge base can never drift apart. Entries are ordered
// most-recent first in constants.ts.
const experiences = EXPERIENCE.map((exp) => ({
  role: exp.title,
  company: exp.company,
  location: exp.location,
  duration: `${exp.startDate} - ${exp.endDate}`,
  points: exp.description ?? [],
  tech: exp.skills ?? [],
}));

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative z-10 max-w-4xl mx-auto py-24 px-4">
      <BlurIn>
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center font-display">
          Experience
        </h2>
      </BlurIn>

      <div className="relative space-y-8">
        {experiences.map((exp) => (
          <BlurIn key={`${exp.company}-${exp.duration}`} delay={0.2}>
            {/* 
              The Card Wrapper: 
              Left border acts as the timeline accent, glows on hover.
              No twitching transforms, just a subtle box-shadow and border-color change.
            */}
            <div className="group relative bg-card border border-border rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5">
              
              {/* Accent Line on the left */}
              <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-transparent group-hover:bg-primary/50 transition-colors duration-300" />

              <div className="grid md:grid-cols-3 gap-6">
                {/* Left Column: Role & Meta */}
                <div className="md:col-span-1">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Briefcase size={18} />
                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                  </div>
                  <p className="font-medium text-foreground/80 mb-3">{exp.company}</p>
                  
                  <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary/70" /> 
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={14} className="text-primary/70" /> 
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Right Column: Achievements & Tech */}
                <div className="md:col-span-2 md:border-l md:border-border md:pl-6">
                  <ul className="space-y-4 mb-6">
                    {exp.points.map((point, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-3 leading-relaxed">
                        <span className="text-primary mt-1 font-mono">▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-muted text-muted-foreground/80 border border-border/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </BlurIn>
        ))}
      </div>
    </section>
  );
}
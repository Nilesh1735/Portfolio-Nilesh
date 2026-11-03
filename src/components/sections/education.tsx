"use client";

import React from "react";
import { BlurIn } from "@/components/reveal-animations";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

const education = [
  {
    degree: "BCA, Artificial Intelligence (IBM Specialization)",
    institution: "United University",
    location: "Prayagraj, UP",
    duration: "Aug 2022 - May 2025",
  },
];

const certifications = [
  {
    title: "Introduction to Generative AI - Art of the Possible",
    issuer: "Amazon Web Services (AWS)",
    year: "May 2026",
    points: [
      "Covered foundation models, prompt engineering, responsible AI, and real-world applications of AI across business and technology.",
    ],
  },
  {
    title: "Building LLM Applications with Prompt Engineering",
    issuer: "NVIDIA Deep Learning Institute",
    year: "2025",
    points: [
      "Built LLM-powered applications using NVIDIA NIM (Llama 3.1) and LangChain with live API integration and Pydantic-structured output validation across a capstone agentic workflow.",
    ],
  },
  {
    title: "Introduction to Python",
    issuer: "IBM",
    year: "Apr 2023",
    points: [
      "Python fundamentals through IBM's CognitiveClass track, covering data structures, control flow, and scripting foundations.",
    ],
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="relative z-10 max-w-4xl mx-auto py-24 px-4">
      <BlurIn>
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center font-display">
          Education
        </h2>
      </BlurIn>

      <div className="relative space-y-8">
        {education.map((edu, index) => (
          <BlurIn key={index} delay={0.2}>
            <div className="group relative bg-card border border-border rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5">
              {/* Accent Line on the left */}
              <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-transparent group-hover:bg-primary/50 transition-colors duration-300" />

              <div className="flex items-start gap-2 text-primary mb-2">
                <GraduationCap size={20} className="mt-0.5 shrink-0" />
                <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
              </div>
              <p className="font-medium text-foreground/80 mb-3 md:pl-7">{edu.institution}</p>

              <div className="flex flex-col sm:flex-row sm:gap-6 gap-2 text-xs text-muted-foreground md:pl-7">
                <span className="flex items-center gap-2">
                  <Calendar size={14} className="text-primary/70" />
                  {edu.duration}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary/70" />
                  {edu.location}
                </span>
              </div>
            </div>
          </BlurIn>
        ))}
      </div>

      {/* Certifications */}
      <BlurIn delay={0.2}>
        <h3 className="text-2xl md:text-3xl font-bold mt-16 mb-8 text-center font-display">
          Certifications
        </h3>
      </BlurIn>

      <div className="relative space-y-8">
        {certifications.map((cert, index) => (
          <BlurIn key={index} delay={0.3}>
            <div className="group relative bg-card border border-border rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5">
              <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-transparent group-hover:bg-primary/50 transition-colors duration-300" />

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="flex items-start gap-2 text-primary mb-2">
                    <Award size={18} className="mt-0.5 shrink-0" />
                    <h4 className="text-lg font-bold text-foreground">{cert.title}</h4>
                  </div>
                  <p className="font-medium text-foreground/80 mb-3">{cert.issuer}</p>
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar size={14} className="text-primary/70" />
                    {cert.year}
                  </span>
                </div>

                <div className="md:col-span-2 md:border-l md:border-border md:pl-6">
                  <ul className="space-y-4">
                    {cert.points.map((point, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-3 leading-relaxed">
                        <span className="text-primary mt-1 font-mono">▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </BlurIn>
        ))}
      </div>
    </section>
  );
}

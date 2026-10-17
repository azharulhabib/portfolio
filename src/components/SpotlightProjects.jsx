import React from "react";
import { spotlightProjects } from "../data/projects";
import { ExternalLink, Activity, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "./Icons";

export default function SpotlightProjects() {
  return (
    <section id="spotlight" className="py-16 sm:py-24 max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 scroll-mt-20 sm:scroll-mt-28">
      {/* Section Title */}
      <div className="flex items-center gap-4 mb-10 sm:mb-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f1f5f9] font-mono flex items-center gap-2">
          <span className="text-[#2dd4bf] text-lg sm:text-xl">03.</span>
          Spotlight Projects
        </h2>
        <div className="flex-1 h-[1px] bg-[#1f293d] max-w-xs"></div>
      </div>

      <div className="space-y-10 sm:space-y-16">
        {spotlightProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl bg-[#111827] border border-[#1f293d] hover:border-[#2dd4bf]/50 p-4 sm:p-7 md:p-9 relative overflow-hidden transition-all duration-300 shadow-md shadow-[#030712]/50 hover:shadow-[0_12px_35px_-10px_rgba(3,7,18,0.7),0_0_25px_-5px_rgba(45,212,191,0.12)]"
          >
            {/* Header / Category */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <span className="font-mono text-[11px] sm:text-xs text-[#2dd4bf] uppercase tracking-wider block mb-0.5 sm:mb-1">
                  Featured Project · {project.category}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#f1f5f9]">
                  {project.title}
                </h3>
              </div>

              {/* GitHub Link */}
              <div className="flex items-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs px-3 py-2 sm:py-2 rounded bg-[#0b111e] border border-[#1f293d] text-[#f1f5f9] hover:text-[#2dd4bf] hover:border-[#2dd4bf]/50 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Source Code</span>
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2dd4bf]" />
                </a>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm font-medium text-[#2dd4bf]/90 font-mono mb-3 sm:mb-4">
              {project.subtitle}
            </p>

            {/* Description Card */}
            <div className="bg-[#090d16]/75 rounded-xl p-4 sm:p-6 border border-[#1f293d]/60 text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-5 sm:mb-6">
              {project.description}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-5 sm:mb-6">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg bg-[#090d16] border border-[#1f293d]/80 p-2 sm:p-3 text-center"
                >
                  <div className="text-sm sm:text-lg md:text-xl font-mono font-bold text-[#2dd4bf] truncate">
                    {m.value}
                  </div>
                  <div className="text-[9px] sm:text-[11px] font-mono text-[#94a3b8] uppercase tracking-wider mt-0.5 truncate">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Architectural Highlights */}
            <div className="space-y-2 mb-5 sm:mb-6">
              <h4 className="text-[11px] sm:text-xs font-mono font-semibold text-[#f1f5f9] uppercase tracking-wider">
                Key Engineering Highlights:
              </h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-2.5 text-xs text-[#94a3b8] leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2dd4bf] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Tags */}
            <div className="pt-3 sm:pt-4 border-t border-[#1f293d]/60 flex flex-wrap gap-1.5 sm:gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#0b111e] border border-[#1f293d] text-[10px] sm:text-xs font-mono text-[#cbd5e1]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import React from "react";
import { noteworthyProjects } from "../data/projects";
import { Folder, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./Icons";

export default function NoteworthyProjects() {
  return (
    <section id="projects" className="py-16 sm:py-24 max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 scroll-mt-20 sm:scroll-mt-28">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f1f5f9] font-mono flex items-center justify-center gap-2 mb-3">
          <span className="text-[#2dd4bf] text-lg sm:text-xl">04.</span>
          Other Noteworthy Projects
        </h2>
        <p className="text-xs sm:text-sm text-[#94a3b8] px-2">
          A collection of side projects, technical experiments, and things I've loved building.
        </p>
      </div>

      {/* 3-Column Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {noteworthyProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl bg-[#111827] border border-[#1f293d] hover:border-[#2dd4bf]/50 p-5 sm:p-6 flex flex-col justify-between group transition-colors duration-300 shadow-md shadow-[#030712]/40 md:last:col-span-2 lg:last:col-span-1 md:last:max-w-xl md:last:mx-auto md:last:w-full lg:last:max-w-none"
          >
            <div>
              {/* Card Top: Folder Icon & Links */}
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <Folder className="w-8 h-8 sm:w-10 sm:h-10 text-[#2dd4bf] stroke-1 group-hover:scale-105 transition-transform" />
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub repository for ${project.title}`}
                  className="text-[#94a3b8] hover:text-[#2dd4bf] p-1.5 transition-colors"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              </div>

              {/* Category Pill */}
              <span className="text-[10px] sm:text-[11px] font-mono text-[#2dd4bf] uppercase tracking-wider block mb-1.5 sm:mb-2">
                {project.category}
              </span>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-[#f1f5f9] group-hover:text-[#2dd4bf] transition-colors mb-2.5 sm:mb-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5"
                >
                  {project.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </h3>

              {/* Description */}
              <p className="text-xs text-[#94a3b8] leading-relaxed mb-5 sm:mb-6">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Footer */}
            <div className="pt-3.5 sm:pt-4 border-t border-[#1f293d]/60 flex flex-wrap gap-1.5 sm:gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] sm:text-[11px] text-[#94a3b8]"
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

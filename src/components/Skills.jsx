import React from "react";
import { skillsData } from "../data/projects";
import { Terminal, Cpu, Database, Layout } from "lucide-react";

export default function Skills() {
  const categoryIcons = {
    Languages: <Terminal className="w-5 h-5 text-[#2dd4bf]" />,
    "AI, ML & Deep Learning": <Cpu className="w-5 h-5 text-[#2dd4bf]" />,
    "Backend & Systems": <Database className="w-5 h-5 text-[#2dd4bf]" />,
    "Frontend & Tools": <Layout className="w-5 h-5 text-[#2dd4bf]" />,
  };

  return (
    <section id="skills" className="py-16 sm:py-24 max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 scroll-mt-20 sm:scroll-mt-28">
      {/* Section Title */}
      <div className="flex items-center gap-4 mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f1f5f9] font-mono flex items-center gap-2">
          <span className="text-[#2dd4bf] text-lg sm:text-xl">02.</span>
          Technical Skills &amp; Stack
        </h2>
        <div className="flex-1 h-[1px] bg-[#1f293d] max-w-xs"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {skillsData.map((category) => (
          <div
            key={category.category}
            className="rounded-xl bg-[#111827] border border-[#1f293d] p-4 sm:p-6 hover:border-[#2dd4bf]/50 transition-colors"
          >
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-[#1f293d]/60">
              {categoryIcons[category.category] || <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-[#2dd4bf]" />}
              <h3 className="text-sm sm:text-base font-bold text-[#f1f5f9] font-mono">
                {category.category}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded bg-[#0b111e] border border-[#1f293d] text-[11px] sm:text-xs font-mono text-[#f1f5f9] hover:text-[#2dd4bf] hover:border-[#2dd4bf]/50 transition-colors cursor-default"
                >
                  <span className="text-[#2dd4bf] mr-1">▹</span>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

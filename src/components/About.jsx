import React from "react";

export default function About() {
  const currentTech = [
    "Python",
    "React.js",
    "JavaScript (ES6+)",
    "FastAPI",
    "PyTorch & Deep Learning",
    "PostgreSQL",
  ];

  return (
    <section id="about" className="py-16 sm:py-24 max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 scroll-mt-20 sm:scroll-mt-28">
      {/* Section Title */}
      <div className="flex items-center gap-4 mb-8 sm:mb-14">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f1f5f9] font-mono flex items-center gap-2">
          <span className="text-[#2dd4bf] text-lg sm:text-xl">01.</span>
          About Me
        </h2>
        <div className="flex-1 h-[1px] bg-[#1f293d] max-w-xs"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
        {/* Left Editorial Rail - Minimalist System Metadata */}
        <div className="md:col-span-4 font-mono text-xs text-[#64748b] space-y-4 md:space-y-6 pt-1">
          <div className="flex items-center gap-2.5 text-[#2dd4bf]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] animate-pulse"></span>
            <span className="tracking-widest uppercase text-[10px] sm:text-[11px] font-semibold">Undergrad &amp; SWE</span>
          </div>

          <div className="grid grid-cols-2 gap-3 border-l border-[#1f293d] pl-3.5 md:block md:space-y-4 md:pl-4">
            <div>
              <p className="text-[9px] sm:text-[10px] text-[#64748b] uppercase tracking-wider">Institution</p>
              <p className="text-[#cbd5e1] font-medium text-xs pt-0.5">BRAC University</p>
              <p className="text-[10px] sm:text-[11px] text-[#94a3b8]">Computer Science &amp; Eng.</p>
            </div>

            <div>
              <p className="text-[9px] sm:text-[10px] text-[#64748b] uppercase tracking-wider">Primary Track</p>
              <p className="text-[#cbd5e1] font-medium text-xs pt-0.5">Applied ML</p>
              <p className="text-[10px] sm:text-[11px] text-[#94a3b8]">Full-Stack Systems</p>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative & Tech Matrix (Completely open, zero container) */}
        <div className="md:col-span-8 space-y-6 sm:space-y-8">
          {/* Main Narrative Paragraph */}
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
            I’m currently studying Computer Science at{" "}
            <a
              href="https://www.bracu.ac.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2dd4bf] hover:underline font-medium"
            >
              BRAC University
            </a>
            . I got hooked on AI because it’s solving problems impossibly fast compared to any other generation, and I wanted to be part of that. But I don’t just want to be a theorist—I love actually building things and creating systems that put AI to work.
          </p>

          {/* Recent Technologies Matrix */}
          <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
            <p className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#94a3b8] flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#2dd4bf]"></span>
              Here are a few technologies I’ve been working with recently:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 sm:gap-x-6 gap-y-1 sm:gap-y-2 pt-1 font-mono text-[11px] sm:text-xs">
              {currentTech.map((tech, idx) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 sm:gap-2.5 py-2 sm:py-2.5 border-b border-[#1f293d]/60 hover:border-[#2dd4bf]/60 transition-colors group cursor-default"
                >
                  <span className="text-[#2dd4bf]/60 text-[9px] sm:text-[10px] group-hover:text-[#2dd4bf] transition-colors">
                    {`0${idx + 1}.`}
                  </span>
                  <span className="text-[#cbd5e1] group-hover:text-[#f1f5f9] transition-colors truncate">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hobbies / Personal Line */}
          <p className="text-xs sm:text-sm md:text-base text-[#94a3b8] leading-relaxed border-l-2 border-[#2dd4bf]/50 pl-3 sm:pl-4 font-normal">
            In my free time, I’m big on sports—mostly basketball and football, hit the gym, and run on way too much caffeine.
          </p>
        </div>
      </div>
    </section>
  );
}

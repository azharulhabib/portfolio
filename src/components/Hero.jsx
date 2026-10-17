import React from "react";
import { ArrowRight } from "lucide-react";
import AsciiPortrait from "./AsciiPortrait";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-8 items-center">
        
        {/* Left Column: Greeting, Typography & CTAs */}
        <div className="md:col-span-7 space-y-3.5 sm:space-y-4 text-center md:text-left">
          {/* Main Greeting & Name Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-7xl font-extrabold text-[#f1f5f9] tracking-tight leading-[1.12]">
            Hi, I'm Azharul.
          </h1>

          {/* Clear, Definitive Subtitle */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-[#94a3b8] tracking-tight pt-0.5 sm:pt-1 leading-snug">
            Software Engineer &amp; Machine Learning Developer.
          </h2>

          {/* Summary Narrative */}
          <p className="max-w-xl text-[#94a3b8] text-sm sm:text-base md:text-base lg:text-lg leading-relaxed pt-1 sm:pt-2 mx-auto md:mx-0">
            I enjoy turning complex deep learning models and modern full-stack architectures into clean, practical tools that solve real-world problems.
          </p>

          {/* CTA Buttons - Responsive full width on mobile, row on tablet/PC */}
          <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3 sm:gap-4">
            <a
              href="#spotlight"
              className="group flex items-center justify-center gap-2 font-mono text-xs sm:text-sm px-5 py-3 sm:px-6 sm:py-3.5 bg-transparent border-2 border-[#2dd4bf] text-[#2dd4bf] rounded hover:bg-[#2dd4bf]/10 transition-all shadow-sm hover:shadow-[0_0_15px_rgba(45,212,191,0.2)]"
            >
              Explore Featured Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="font-mono text-xs sm:text-sm px-5 py-3 sm:px-6 sm:py-3.5 bg-[#111827] border border-[#1f293d] text-[#f1f5f9] rounded hover:border-[#2dd4bf]/50 hover:text-[#2dd4bf] transition-all text-center justify-center flex items-center"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Right Column: Animated ASCII Portrait (Side-by-side on tablet/PC, order-first on mobile) */}
        <div className="md:col-span-5 flex justify-center md:justify-end order-first md:order-last mb-2 md:mb-0">
          <AsciiPortrait />
        </div>

      </div>
    </section>
  );
}

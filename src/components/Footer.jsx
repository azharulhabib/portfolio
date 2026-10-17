import React from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="py-12 text-center text-xs font-mono text-[#94a3b8] border-t border-[#1f293d]/50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 space-y-5">
        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 text-[#94a3b8]">
          <a
            href="https://github.com/azharulhabib"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg hover:text-[#2dd4bf] hover:bg-[#111827] transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
          </a>

          <a
            href="https://www.linkedin.com/in/azharul-habib/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg hover:text-[#2dd4bf] hover:bg-[#111827] transition-colors"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>

          <a
            href="mailto:azharulhabib16@gmail.com"
            aria-label="Send Email"
            className="p-2 rounded-lg hover:text-[#2dd4bf] hover:bg-[#111827] transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Attribution & Rights */}
        <div className="space-y-1">
          <p>
            <a
              href="https://github.com/azharulhabib"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f1f5f9] hover:text-[#2dd4bf] transition-colors font-semibold text-sm"
            >
              Azharul Habib
            </a>
          </p>
          <p className="text-[11px] text-[#94a3b8]/70">
            All rights reserved. &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function SocialSidebar() {
  const leftItems = [
    {
      name: "GitHub",
      tooltip: "github.com/azharulhabib",
      href: "https://github.com/azharulhabib",
      icon: <GithubIcon className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      tooltip: "linkedin.com/in/azharul-habib",
      href: "https://www.linkedin.com/in/azharul-habib/",
      icon: <LinkedinIcon className="w-5 h-5" />,
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Left Symmetrical Rail (Profiles) */}
      <div className="hidden lg:flex fixed bottom-0 left-8 xl:left-12 flex-col items-center gap-6 z-40 text-[#a8b2d1]">
        <ul className="flex flex-col items-center gap-5">
          {leftItems.map((item) => (
            <li key={item.name} className="relative group flex items-center">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="hover:text-[#64ffda] hover:-translate-y-1 transition-all inline-block p-1"
              >
                {item.icon}
              </a>

              {/* Tooltip sliding to the right */}
              <div className="pointer-events-none absolute left-full ml-3 px-3 py-1.5 rounded-md bg-[#112240] border border-[#233554] text-[#ccd6f6] font-mono text-xs whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-xl shadow-[#020c1b]/80 z-50">
                <span className="text-[#64ffda] mr-1.5 font-bold">▹</span>
                {item.tooltip}
              </div>
            </li>
          ))}
        </ul>
        <div className="w-[1px] h-28 bg-[#8892b0]/40 mt-2"></div>
      </div>

      {/* Right Symmetrical Rail (Actions: Email & Scroll-to-Top) */}
      <div className="hidden lg:flex fixed bottom-0 right-8 xl:right-12 flex-col items-center gap-6 z-40 text-[#a8b2d1]">
        <ul className="flex flex-col items-center gap-5">
          {/* Email Action */}
          <li className="relative group flex items-center justify-end">
            {/* Tooltip sliding to the left */}
            <div className="pointer-events-none absolute right-full mr-3 px-3 py-1.5 rounded-md bg-[#112240] border border-[#233554] text-[#ccd6f6] font-mono text-xs whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-xl shadow-[#020c1b]/80 z-50">
              <span className="text-[#64ffda] mr-1.5 font-bold">▹</span>
              azharulhabib16@gmail.com
            </div>

            <a
              href="mailto:azharulhabib16@gmail.com"
              aria-label="Send Email"
              className="hover:text-[#64ffda] hover:-translate-y-1 transition-all inline-block p-1"
            >
              <Mail className="w-5 h-5" />
            </a>
          </li>

          {/* Scroll To Top Action */}
          <li className="relative group flex items-center justify-end">
            {/* Tooltip sliding to the left */}
            <div className="pointer-events-none absolute right-full mr-3 px-3 py-1.5 rounded-md bg-[#112240] border border-[#233554] text-[#ccd6f6] font-mono text-xs whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-xl shadow-[#020c1b]/80 z-50">
              <span className="text-[#64ffda] mr-1.5 font-bold">▲</span>
              Back to top
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to Top"
              className="hover:text-[#64ffda] hover:-translate-y-1 transition-all inline-block p-1 focus:outline-none cursor-pointer"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </li>
        </ul>
        <div className="w-[1px] h-28 bg-[#8892b0]/40 mt-2"></div>
      </div>
    </>
  );
}

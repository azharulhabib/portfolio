import React, { useState, useEffect } from "react";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function FloatingDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show the dock after a tiny scroll or right away
    const handleScroll = () => {
      setVisible(true);
    };
    window.addEventListener("scroll", handleScroll);
    setVisible(true); // default visible
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dockItems = [
    {
      name: "GitHub",
      tooltip: "github.com/azharulhabib",
      href: "https://github.com/azharulhabib",
      icon: <GithubIcon className="w-4 h-4" />,
      external: true,
    },
    {
      name: "LinkedIn",
      tooltip: "LinkedIn Profile",
      href: "https://www.linkedin.com/in/azharul-habib/",
      icon: <LinkedinIcon className="w-4 h-4" />,
      external: true,
    },
    {
      name: "Email",
      tooltip: "azharulhabib16@gmail.com",
      href: "mailto:azharulhabib16@gmail.com",
      icon: <Mail className="w-4 h-4" />,
      external: false,
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300">
      <nav
        aria-label="Quick Actions Dock"
        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#112240]/85 backdrop-blur-xl border border-[#233554] shadow-2xl shadow-[#020c1b]/80 hover:border-[#64ffda]/30 transition-all"
      >
        {dockItems.map((item) => (
          <div key={item.name} className="relative group flex items-center justify-center">
            {/* Upward Floating Tooltip */}
            <div className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#0a192f] border border-[#233554] text-[#ccd6f6] font-mono text-[11px] whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-xl z-50">
              <span className="text-[#64ffda] mr-1">▹</span>
              {item.tooltip}
            </div>

            <a
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={item.name}
              className="p-2 rounded-full text-[#a8b2d1] hover:text-[#64ffda] hover:bg-[#233554]/50 transition-all hover:scale-110"
            >
              {item.icon}
            </a>
          </div>
        ))}

        {/* Subtle Separator */}
        <div className="w-[1px] h-4 bg-[#233554] mx-1"></div>

        {/* Scroll To Top */}
        <div className="relative group flex items-center justify-center">
          <div className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#0a192f] border border-[#233554] text-[#ccd6f6] font-mono text-[11px] whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-xl z-50">
            <span className="text-[#64ffda] mr-1">▲</span>
            Back to top
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="p-2 rounded-full text-[#a8b2d1] hover:text-[#64ffda] hover:bg-[#233554]/50 transition-all hover:scale-110 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </nav>
    </div>
  );
}

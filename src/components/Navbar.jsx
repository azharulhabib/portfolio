import React, { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { num: "01.", label: "About", href: "#about" },
    { num: "02.", label: "Skills", href: "#skills" },
    { num: "03.", label: "Spotlight", href: "#spotlight" },
    { num: "04.", label: "Projects", href: "#projects" },
    { num: "05.", label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "bg-[#090d16]/95 backdrop-blur-md border-b border-[#1f293d]/80 shadow-xl shadow-[#030712]/60 py-3.5"
            : "bg-transparent py-6"
        }`}
      >
        {/* Subtle Bottom Accent Glow Line when scrolled or menu open */}
        {(scrolled || mobileMenuOpen) && (
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#2dd4bf]/25 to-transparent pointer-events-none" />
        )}

        {/* Centered container with max-w-6xl for harmonious alignment on wide screens */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="font-mono text-base font-semibold text-[#f1f5f9] hover:text-[#2dd4bf] tracking-tight transition-colors"
          >
            azharul habib
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-mono text-xs text-[#94a3b8] hover:text-[#2dd4bf] transition-colors relative py-1 group"
                  >
                    <span className="text-[#2dd4bf] mr-1.5 font-normal">{link.num}</span>
                    <span className="group-hover:text-[#f1f5f9] transition-colors">
                      {link.label}
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2dd4bf] transition-all duration-200 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Subtle Vertical Divider */}
            <div className="w-[1px] h-5 bg-[#1f293d]"></div>

            {/* Social Profiles */}
            <div className="flex items-center gap-1 text-[#94a3b8]">
              <a
                href="https://github.com/azharulhabib"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-md hover:text-[#2dd4bf] hover:bg-[#111827] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/azharul-habib/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-md hover:text-[#2dd4bf] hover:bg-[#111827] transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href="mailto:azharulhabib16@gmail.com"
                aria-label="Direct Email"
                className="p-2 rounded-md hover:text-[#2dd4bf] hover:bg-[#111827] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Action CTA */}
            <a
              href="mailto:azharulhabib16@gmail.com"
              className="font-mono text-xs px-4 py-2 border border-[#2dd4bf] text-[#2dd4bf] rounded-md hover:bg-[#2dd4bf]/10 transition-all shadow-sm hover:shadow-[0_0_12px_rgba(45,212,191,0.2)]"
            >
              Say Hello
            </a>
          </nav>

          {/* High-Tech Cyber Toggle Capsule */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden relative flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-all duration-300 group cursor-pointer select-none active:scale-95 ${
              mobileMenuOpen
                ? "bg-[#111827] border-[#2dd4bf] shadow-[0_0_18px_rgba(45,212,191,0.3)] text-[#2dd4bf]"
                : "bg-[#111827]/90 backdrop-blur-md border-[#1f293d] hover:border-[#2dd4bf]/60 text-[#cbd5e1] hover:text-[#2dd4bf] shadow-sm hover:shadow-[0_0_14px_rgba(45,212,191,0.15)]"
            }`}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {/* Pulsing Status Dot Indicator */}
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75 transition-opacity ${
                  mobileMenuOpen ? "animate-ping" : "group-hover:animate-ping"
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2 w-2 transition-colors ${
                  mobileMenuOpen ? "bg-[#2dd4bf]" : "bg-[#2dd4bf]/70 group-hover:bg-[#2dd4bf]"
                }`}
              ></span>
            </span>

            {/* Monospace Micro Label */}
            <span className="font-mono text-[11px] font-semibold tracking-wider uppercase">
              {mobileMenuOpen ? "CLOSE" : "MENU"}
            </span>

            {/* Cybernetic Animated Morphing Bars */}
            <div className="relative w-4 h-3.5 flex flex-col justify-between items-end">
              <span
                className={`h-[1.5px] bg-[#2dd4bf] rounded-full transition-all duration-300 ease-out origin-center ${
                  mobileMenuOpen
                    ? "w-4 translate-y-[6px] rotate-45"
                    : "w-4 group-hover:w-4"
                }`}
              ></span>
              <span
                className={`h-[1.5px] bg-[#2dd4bf] rounded-full transition-all duration-300 ease-out ${
                  mobileMenuOpen
                    ? "opacity-0 scale-0"
                    : "w-2.5 group-hover:w-4"
                }`}
              ></span>
              <span
                className={`h-[1.5px] bg-[#2dd4bf] rounded-full transition-all duration-300 ease-out origin-center ${
                  mobileMenuOpen
                    ? "w-4 -translate-y-[6px] -rotate-45"
                    : "w-3.5 group-hover:w-4"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile/Tablet Drawer - Positioned outside <header> to avoid backdrop-filter containing block clipping */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-[#090d16]/98 backdrop-blur-2xl px-6 sm:px-8 pt-24 pb-7 flex flex-col justify-between overflow-y-auto transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Navigation Links with Clean Hairline Dividers & Touch Feedback */}
        <ul className="flex flex-col divide-y divide-[#1f293d]/50">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-4 px-2 text-[#cbd5e1] hover:text-[#2dd4bf] active:bg-[#111827]/40 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <span className="font-mono text-xs text-[#2dd4bf] font-medium">
                    {link.num}
                  </span>
                  <span className="font-mono text-base font-semibold tracking-tight text-[#f1f5f9] group-hover:text-[#2dd4bf] transition-colors">
                    {link.label}
                  </span>
                </div>
                <span className="font-mono text-sm text-[#2dd4bf] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Footer Section: Socials & Contact CTA */}
        <div className="pt-6 border-t border-[#1f293d]/80 flex flex-col gap-3.5 pb-6">
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/azharulhabib"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 font-mono text-xs py-3 px-4 rounded-lg bg-[#111827] border border-[#1f293d] text-[#f1f5f9] hover:border-[#2dd4bf]/60 hover:text-[#2dd4bf] flex-1 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/azharul-habib/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 font-mono text-xs py-3 px-4 rounded-lg bg-[#111827] border border-[#1f293d] text-[#f1f5f9] hover:border-[#2dd4bf]/60 hover:text-[#2dd4bf] flex-1 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
              LinkedIn
            </a>
          </div>

          <a
            href="mailto:azharulhabib16@gmail.com"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 font-mono text-xs py-3.5 px-4 rounded-lg bg-transparent border-2 border-[#2dd4bf] text-[#2dd4bf] font-semibold hover:bg-[#2dd4bf]/10 hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all"
          >
            <Mail className="w-4 h-4" />
            Say Hello
          </a>
        </div>
      </div>
    </>
  );
}

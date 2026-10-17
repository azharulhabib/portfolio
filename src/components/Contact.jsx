import React, { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "azharulhabib16@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-28 max-w-2xl mx-auto px-5 sm:px-8 text-center scroll-mt-20 sm:scroll-mt-28">
      <p className="font-mono text-xs sm:text-sm text-[#2dd4bf] mb-2 sm:mb-3">
        05. What's Next?
      </p>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f1f5f9] tracking-tight mb-4 sm:mb-6">
        Get In Touch
      </h2>

      <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto">
        I am actively seeking software engineering and machine learning opportunities.
        Whether you have a question about my research, an open role, or just want to connect, I'd love to hear from you!
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8">
        <a
          href={`mailto:${email}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-mono text-xs sm:text-sm px-6 py-3.5 sm:px-8 sm:py-4 bg-transparent border-2 border-[#2dd4bf] text-[#2dd4bf] rounded-lg hover:bg-[#2dd4bf]/10 hover:shadow-[0_0_20px_rgba(45,212,191,0.25)] hover:-translate-y-0.5 transition-all font-semibold"
        >
          <Mail className="w-4 h-4" />
          Say Hello
        </a>

        <button
          onClick={handleCopy}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-mono text-xs sm:text-sm px-5 py-3.5 sm:px-6 sm:py-4 bg-[#111827] border border-[#1f293d] text-[#f1f5f9] rounded-lg hover:border-[#2dd4bf]/60 hover:text-[#2dd4bf] hover:shadow-[0_0_15px_rgba(45,212,191,0.15)] hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#2dd4bf]" />
              <span className="text-[#2dd4bf] font-medium">Email Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Email</span>
            </>
          )}
        </button>
      </div>

      <div className="text-xs font-mono text-[#94a3b8]">
        Direct inbox:{" "}
        <span className="text-[#f1f5f9] select-all underline decoration-[#2dd4bf]/40 break-all sm:break-normal">
          {email}
        </span>
      </div>
    </section>
  );
}

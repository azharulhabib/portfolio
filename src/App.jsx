import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import SpotlightProjects from "./components/SpotlightProjects";
import NoteworthyProjects from "./components/NoteworthyProjects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#090d16] text-[#94a3b8] bg-grid-pattern relative selection:bg-[#2dd4bf]/20 selection:text-[#2dd4bf]">
      {/* Top Fixed Header with Integrated Social Icons */}
      <Navbar />

      {/* Main Content Sections (Clean Full Width Canvas) */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <SpotlightProjects />
        <NoteworthyProjects />
        <Contact />
      </main>

      {/* Footer with Centered Social Icons & Back-to-Top */}
      <Footer />
    </div>
  );
}

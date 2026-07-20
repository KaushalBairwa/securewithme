import Navbar from "@/components/layout/Navbar";
import StorySection from "@/components/layout/StorySection";

import Hero from "@/components/hero/Hero";
import DashboardPreview from "@/components/dashboard/DashboardPreview";

import Metrics from "@/components/sections/Metrics";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Services from "@/components/sections/Services";
import ClientReports from "@/components/sections/ClientReports";
import Lab from "@/components/sections/Lab";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-[#05070b] text-white">
        {/* Screen 1: Introduction + full security dashboard */}
        <StorySection
          id="home"
          left={<Hero embedded />}
          right={<DashboardPreview embedded />}
          leftWidth="narrow"
          align="start"
          background="cyan"
          className="pt-14"
        />

        {/* Screen 2: Client report + practical impact */}
        <StorySection
          id="impact"
          left={
            <ClientReports
              embedded
              compact
            />
          }
          right={
            <Metrics
              embedded
              compact
            />
          }
          leftWidth="equal"
          align="start"
          background="panel"
        />

        {/* About stays full-width for now */}
        <About />

        {/* Screen 3: Skills + professional experience */}
        <StorySection
          id="experience"
          left={
            <div id="skills">
              <Skills
                embedded
                compact
              />
            </div>
          }
          right={
            <Experience
              embedded
              compact
            />
          }
          leftWidth="equal"
          align="start"
          background="purple"
        />

        {/* Screen 4: Projects + research */}
        <StorySection
          id="projects"
          left={
            <Projects
              embedded
              compact
            />
          }
          right={
            <div id="research">
              <Research
                embedded
                compact
              />
            </div>
          }
          leftWidth="equal"
          align="start"
          background="base"
        />

        {/* Remaining sections stay unchanged for now */}
        <Services />
        <Lab />
        <Contact />
      </main>
    </>
  );
}
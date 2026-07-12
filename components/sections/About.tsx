"use client";

import { motion } from "framer-motion";
import { Shield, Brain, Cloud, Briefcase } from "lucide-react";
import StatCard from "../cards/StatCard";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 bg-black"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div 
        
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center mb-16"
        >
<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-20">

</div>
          <p className="text-cyan-400 tracking-[8px] uppercase mb-3">
            About Me
          </p>

          <h2 className="text-5xl font-bold mb-6">
            Professional Cloud &
            <span className="text-cyan-400">
              {" "}AI Security Engineer
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-8">
            I build AI-powered cybersecurity platforms,
            cloud security solutions,
            detection engineering pipelines,
            offensive security tools,
            and conduct research on emerging AI and cloud threats
            to help organizations improve cyber resilience.
          </p>

        </motion.div>

      </div>
    </section>
  );
}
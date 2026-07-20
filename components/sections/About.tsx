"use client";

import { motion } from "framer-motion";
import { Brain, Briefcase, Cloud, Shield } from "lucide-react";
import StatCard from "@/components/cards/StatCard";

const focusAreas = [
  "Cloud Security",
  "AI Security",
  "Detection Engineering",
  "Threat Hunting",
  "Penetration Testing",
  "GRC & Compliance",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-white/5 bg-[#05070b] px-6 py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.4em] text-cyan-400">
            About Me
          </p>

          <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
            Building security for the
            <span className="text-cyan-400"> cloud and AI era</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            I work across cloud security, AI security, detection engineering,
            offensive testing and security research. I help organizations
            identify security gaps, improve their monitoring capabilities and
            strengthen their security posture using practical, GRC-aligned
            frameworks.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Years of Experience"
            number={3}
            icon={Briefcase}
          />

          <StatCard
            title="Security Projects"
            number={10}
            icon={Shield}
          />

          <StatCard
            title="Students Trained"
            number={20}
            icon={Brain}
          />

          <StatCard
            title="Workshops Delivered"
            number={5}
            icon={Cloud}
          />
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-8"
          >
            <p className="font-mono text-sm text-emerald-400">
              &gt; current_focus
            </p>

            <h3 className="mt-4 text-2xl font-bold">
              Security engineering with practical impact
            </h3>

            <p className="mt-5 leading-7 text-slate-400">
              My current work focuses on cloud and identity threats, AI-powered
              security platforms, SIEM detection engineering, threat hunting
              and security consulting for growing organizations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.03] p-8"
          >
            <p className="font-mono text-sm text-cyan-400">
              &gt; capabilities --list
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
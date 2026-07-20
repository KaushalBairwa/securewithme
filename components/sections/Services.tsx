"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import ServiceCard from "@/components/cards/ServiceCard";

export default function Services() {
  const featuredServices = services.filter(
    (service) => service.featured,
  );

  return (
    <section
      id="services"
      className="relative bg-[#05070b] px-6 py-24"
    >
      <div className="pointer-events-none absolute left-0 top-20 h-80 w-80 rounded-full bg-emerald-400/5 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-emerald-400">
            Consulting Services
          </p>

          <h2 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
            Practical cybersecurity support for
            <span className="text-emerald-400">
              {" "}
              modern organisations.
            </span>
          </h2>

          <p className="mt-6 max-w-3xl leading-7 text-slate-400">
            Focused consulting engagements covering cloud security,
            detection engineering, security research and governance.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-7 sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-mono text-sm text-emerald-400">
              &gt; custom_engagement
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              Need a tailored security engagement?
            </h3>

            <p className="mt-3 max-w-2xl text-slate-400">
              Scope can be adapted for startups, security teams,
              training organisations and research-led projects.
            </p>
          </div>

          <a
            href="#contact"
            className="mt-6 inline-flex rounded-lg bg-emerald-400 px-5 py-3 font-semibold text-black transition hover:bg-emerald-300 sm:mt-0"
          >
            Start a conversation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
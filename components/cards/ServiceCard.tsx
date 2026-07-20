"use client";

import { motion } from "framer-motion";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:border-emerald-400/40 hover:shadow-[0_0_45px_rgba(0,255,163,0.08)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent opacity-0 transition group-hover:opacity-100" />

      <p className="font-mono text-sm text-emerald-400">
        &gt; {service.category}
      </p>

      <h3 className="mt-3 text-2xl font-bold text-white">
        {service.title}
      </h3>

      <p className="mt-5 leading-7 text-slate-400">
        {service.description}
      </p>

      <div className="mt-7">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
          Deliverables
        </p>

        <ul className="mt-4 space-y-3">
          {service.deliverables.map((deliverable) => (
            <li
              key={deliverable}
              className="flex items-start gap-3 text-sm text-slate-300"
            >
              <span className="mt-1 text-emerald-400">
                ✓
              </span>

              <span>{deliverable}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-8">
        <a
          href="#contact"
          className="inline-flex items-center text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
        >
          Discuss this service →
        </a>
      </div>
    </motion.article>
  );
}
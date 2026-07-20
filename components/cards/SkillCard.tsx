"use client";

import { motion } from "framer-motion";
import type { SkillCategory } from "@/data/skills";

interface SkillCardProps {
  item: SkillCategory;
  index: number;
}

export default function SkillCard({
  item,
  index,
}: SkillCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/[0.03]"
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
        {String(index + 1).padStart(2, "0")}
      </p>

      <h3 className="mt-3 text-xl font-bold text-white">
        {item.category}
      </h3>

      <div className="mt-6 flex flex-wrap gap-2">
        {item.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
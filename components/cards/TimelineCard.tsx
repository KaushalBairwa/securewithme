"use client";

import { motion } from "framer-motion";
import type { ExperienceEntry } from "@/data/experience";

interface TimelineCardProps {
  item: ExperienceEntry;
  index: number;
}

function formatDate(date: string) {
  if (date === "Present") return "Present";

  const [year, month] = date.split("-");
  const formattedDate = new Date(Number(year), Number(month) - 1);

  return formattedDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function TimelineCard({
  item,
  index,
}: TimelineCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.03]"
    >
      <div className="absolute -left-[39px] top-9 hidden h-4 w-4 rounded-full border-4 border-[#05070b] bg-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.7)] md:block" />

      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div>
          <p className="font-mono text-sm text-cyan-400">
            {item.employmentType}
          </p>

          <h3 className="mt-2 text-xl font-bold text-white">
            {item.role}
          </h3>

          <p className="mt-1 text-slate-300">
            {item.company}
          </p>

          {item.location && (
            <p className="mt-1 text-sm text-slate-500">
              {item.location}
            </p>
          )}
        </div>

        <p className="shrink-0 font-mono text-sm text-emerald-400">
          {formatDate(item.startDate)} — {formatDate(item.endDate)}
        </p>
      </div>

      {item.summary && (
        <p className="mt-5 leading-7 text-slate-400">
          {item.summary}
        </p>
      )}

      <ul className="mt-6 space-y-3">
        {item.highlights.slice(0, 4).map((highlight) => (
          <li
            key={highlight}
            className="flex gap-3 text-sm leading-6 text-slate-400"
          >
            <span className="mt-1 text-cyan-400">›</span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      {item.tools && (
        <div className="mt-6 flex flex-wrap gap-2">
          {item.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-slate-400"
            >
              {tool}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  );
}
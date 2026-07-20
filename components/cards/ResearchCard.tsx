"use client";

import { motion } from "framer-motion";
import type { ResearchItem } from "@/data/research";
import ResearchStatusBadge from "@/components/common/ResearchStatusBadge";

interface ResearchCardProps {
  item: ResearchItem;
}

export default function ResearchCard({
  item,
}: ResearchCardProps) {
  const hasLink = Boolean(item.link) && item.link !== "#";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
      }}
      whileHover={{
        y: -5,
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition duration-300 hover:border-violet-400/40 hover:shadow-[0_0_45px_rgba(139,92,246,0.08)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm text-violet-400">
            &gt; {item.category}
          </p>

          <h3 className="mt-3 text-2xl font-bold text-white">
            {item.title}
          </h3>
        </div>

        <ResearchStatusBadge status={item.status} />
      </div>

      <p className="mt-5 leading-7 text-slate-400">
        {item.summary}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {item.topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-xs text-slate-300"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-8">
        <span className="font-mono text-sm text-slate-500">
          {item.year}
        </span>

        {hasLink ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-violet-400 transition hover:text-violet-300"
          >
            Read Research →
          </a>
        ) : (
          <span className="font-mono text-sm text-slate-500">
            Publishing soon
          </span>
        )}
      </div>
    </motion.article>
  );
}
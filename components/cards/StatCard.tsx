"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  number: number;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  number,
  icon: Icon,
}: StatCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      whileHover={{
        y: -5,
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/[0.035]"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-400/[0.06] blur-[55px] transition group-hover:bg-cyan-400/[0.1]" />

      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-400">
          <Icon
            className="h-6 w-6"
            aria-hidden="true"
          />
        </div>

        <p className="mt-6 text-4xl font-bold text-white">
          {number}+
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {title}
        </p>

        <div className="mt-5 h-px w-full overflow-hidden bg-white/[0.06]">
          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: "55%",
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
              delay: 0.2,
            }}
            className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
          />
        </div>
      </div>
    </motion.article>
  );
}
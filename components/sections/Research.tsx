"use client";

import { motion } from "framer-motion";
import { researchItems } from "@/data/research";
import ResearchCard from "@/components/cards/ResearchCard";

interface ResearchProps {
  embedded?: boolean;
  compact?: boolean;
}

export default function Research({
  embedded = false,
  compact = false,
}: ResearchProps) {
  const featuredResearch = researchItems.filter(
    (item) => item.featured,
  );

  const Wrapper = embedded ? "div" : "section";
  const useCompactLayout = embedded || compact;

  return (
    <Wrapper
      id={embedded ? undefined : "research"}
      className={
        embedded
          ? "relative w-full min-w-0"
          : "relative border-y border-white/5 bg-[#07090d] px-6 py-24"
      }
    >
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-violet-500/5 blur-[130px]" />

      <div
        className={
          embedded
            ? "relative w-full min-w-0"
            : "relative mx-auto max-w-7xl"
        }
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-violet-400">
            Research Laboratory
          </p>

          <h2
            className={
              useCompactLayout
                ? "mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl"
                : "mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl"
            }
          >
            Exploring the future of
            <span className="text-violet-400">
              {" "}
              cybersecurity and AI.
            </span>
          </h2>

          <p
            className={
              useCompactLayout
                ? "mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base"
                : "mt-6 max-w-3xl leading-7 text-slate-400"
            }
          >
            Independent research focused on emerging security
            risks, cloud identity, AI-assisted defence and the
            evolution of modern security operations.
          </p>
        </motion.div>

        <div
          className={
            useCompactLayout
              ? "mt-10 grid min-w-0 gap-5"
              : "mt-14 grid gap-7 lg:grid-cols-3"
          }
        >
          {featuredResearch.map((item) => (
            <ResearchCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
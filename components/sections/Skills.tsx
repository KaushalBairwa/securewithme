"use client";

import { motion } from "framer-motion";
import SkillCard from "@/components/cards/SkillCard";
import { skillCategories } from "@/data/skills";

interface SkillsProps {
  embedded?: boolean;
  compact?: boolean;
}

export default function Skills({
  embedded = false,
  compact = false,
}: SkillsProps) {
  const Wrapper = embedded ? "div" : "section";
  const useCompactLayout = embedded || compact;

  return (
    <Wrapper
      id={embedded ? undefined : "skills"}
      className={
        embedded
          ? "relative w-full min-w-0"
          : "relative border-t border-white/5 bg-[#05070b] px-6 py-28"
      }
    >
      <div
        className={
          embedded
            ? "w-full min-w-0"
            : "mx-auto max-w-7xl"
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={
            useCompactLayout
              ? "max-w-3xl text-left"
              : "mx-auto max-w-3xl text-center"
          }
        >
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-cyan-400">
            Security Capabilities
          </p>

          <h2
            className={
              useCompactLayout
                ? "mt-3 text-3xl font-bold leading-tight sm:text-4xl"
                : "mt-4 text-4xl font-bold sm:text-5xl"
            }
          >
            Practical expertise across
            <span className="text-cyan-400">
              {" "}
              modern security domains
            </span>
          </h2>

          <p
            className={
              useCompactLayout
                ? "mt-4 text-sm leading-7 text-slate-400 sm:text-base"
                : "mt-6 text-lg leading-8 text-slate-400"
            }
          >
            A focused mix of cloud security, AI security,
            detection engineering, offensive testing, governance
            and security research.
          </p>
        </motion.div>

        <div
          className={
            useCompactLayout
              ? "mt-10 grid min-w-0 gap-5 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2"
              : "mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          }
        >
          {skillCategories.map((item, index) => (
            <SkillCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
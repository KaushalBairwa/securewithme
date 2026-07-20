"use client";

import { motion } from "framer-motion";
import TimelineCard from "@/components/cards/TimelineCard";
import { experience } from "@/data/experience";

interface ExperienceProps {
  embedded?: boolean;
  compact?: boolean;
}

export default function Experience({
  embedded = false,
  compact = false,
}: ExperienceProps) {
  const Wrapper = embedded ? "div" : "section";
  const useCompactLayout = embedded || compact;

  return (
    <Wrapper
      id={embedded ? undefined : "experience"}
      className={
        embedded
          ? "relative w-full min-w-0"
          : "relative border-t border-white/5 bg-[#07090d] px-6 py-28"
      }
    >
      <div
        className={
          embedded
            ? "w-full min-w-0"
            : "mx-auto max-w-6xl"
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={useCompactLayout ? "mb-10" : "mb-16"}
        >
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-cyan-400">
            Professional Journey
          </p>

          <h2
            className={
              useCompactLayout
                ? "mt-3 text-3xl font-bold leading-tight sm:text-4xl"
                : "mt-4 text-4xl font-bold sm:text-5xl"
            }
          >
            Experience across
            <span className="text-cyan-400">
              {" "}
              cloud, SOC and security research
            </span>
          </h2>

          <p
            className={
              useCompactLayout
                ? "mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base"
                : "mt-6 max-w-3xl leading-7 text-slate-400"
            }
          >
            Security engineering experience spanning independent
            consulting, cloud infrastructure, detection engineering,
            threat hunting, offensive security and cybersecurity
            training.
          </p>
        </motion.div>

        <div
          className={
            useCompactLayout
              ? "relative space-y-5 border-l border-cyan-400/20 pl-5 sm:pl-7"
              : "relative space-y-7 md:ml-8 md:border-l md:border-cyan-400/20 md:pl-10"
          }
        >
          {experience.map((item, index) => (
            <TimelineCard
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
"use client";

import { motion } from "framer-motion";
import MetricCard from "@/components/dashboard/MetricCard";
import {
  capabilityMetrics,
  securityMetrics,
} from "@/data/metrics";

interface MetricsProps {
  embedded?: boolean;
  compact?: boolean;
}

export default function Metrics({
  embedded = false,
  compact = false,
}: MetricsProps) {
  const Wrapper = embedded ? "div" : "section";
  const useCompactLayout = embedded || compact;

  return (
    <Wrapper
      id={embedded ? undefined : "metrics"}
      className={
        embedded
          ? "w-full"
          : "relative border-y border-white/5 bg-[#07090d] px-6 py-24"
      }
    >
      <div
        className={
          embedded
            ? "w-full"
            : "mx-auto max-w-7xl"
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-cyan-400">
            Active Security Metrics
          </p>

          <h2
            className={
              useCompactLayout
                ? "mt-3 text-3xl font-bold leading-tight sm:text-4xl"
                : "mt-4 text-4xl font-bold sm:text-5xl"
            }
          >
            Work measured through
            <span className="text-cyan-400">
              {" "}
              practical impact
            </span>
          </h2>
        </motion.div>

        <div
          className={
            useCompactLayout
              ? "mt-8 grid gap-4 sm:grid-cols-2"
              : "mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          }
        >
          {securityMetrics.map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
            />
          ))}
        </div>

        <div
          className={`rounded-2xl border border-cyan-400/15 bg-black/30 ${
            useCompactLayout
              ? "mt-6 p-5 sm:p-6"
              : "mt-10 p-7"
          }`}
        >
          <div
            className={`flex gap-4 ${
              useCompactLayout
                ? "mb-6 flex-col sm:flex-row sm:items-center sm:justify-between"
                : "mb-8 items-center justify-between"
            }`}
          >
            <div>
              <p className="font-mono text-sm text-emerald-400">
                &gt; capability_status
              </p>

              <h3
                className={
                  useCompactLayout
                    ? "mt-2 text-xl font-bold sm:text-2xl"
                    : "mt-2 text-2xl font-bold"
                }
              >
                Core security coverage
              </h3>
            </div>

            <span className="w-fit rounded-full border border-emerald-400/30 px-3 py-1 font-mono text-xs text-emerald-400">
              SYSTEM ONLINE
            </span>
          </div>

          <div
            className={
              useCompactLayout
                ? "grid gap-5"
                : "grid gap-7 md:grid-cols-2"
            }
          >
            {capabilityMetrics.map((metric) => (
              <div key={metric.label}>
                <div className="mb-2 flex justify-between gap-4 text-sm">
                  <span className="text-slate-300">
                    {metric.label}
                  </span>

                  <span className="shrink-0 font-mono text-cyan-400">
                    {metric.value}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${metric.value}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
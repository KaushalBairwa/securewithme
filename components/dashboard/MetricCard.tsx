"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import type { SecurityMetric } from "@/data/metrics";

interface MetricCardProps {
  metric: SecurityMetric;
}

export default function MetricCard({ metric }: MetricCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <article
      ref={ref}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(0,229,255,0.08)]"
    >
      <p className="font-mono text-sm text-cyan-400">
        &gt; {metric.id}
      </p>

      <p className="mt-5 text-4xl font-bold text-white">
        {inView && <CountUp end={metric.value} duration={2} />}
        {metric.suffix}
      </p>

      <h3 className="mt-3 text-lg font-semibold">
        {metric.label}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {metric.description}
      </p>
    </article>
  );
}
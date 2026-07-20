"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  clientReports,
  type ClientReport,
} from "@/data/clientReports";

import ClientReportCard from "@/components/cards/ClientReportCard";
import ClientReportViewer from "@/components/reports/ClientReportViewer";

interface ClientReportsProps {
  embedded?: boolean;
  compact?: boolean;
}

export default function ClientReports({
  embedded = false,
  compact = false,
}: ClientReportsProps) {
  const [selectedReport, setSelectedReport] =
    useState<ClientReport | null>(null);

  const useCompactLayout = embedded || compact;

  const visibleReports = useCompactLayout
    ? clientReports.slice(0, 1)
    : clientReports;

  const openReport = (report: ClientReport) => {
    setSelectedReport(report);
  };

  const closeReport = () => {
    setSelectedReport(null);
  };

  const Wrapper = embedded ? "div" : "section";

  return (
    <>
      <Wrapper
        id={embedded ? undefined : "reports"}
        className={
          embedded
            ? "relative w-full min-w-0"
            : "relative border-y border-white/[0.06] bg-[#07090d] px-6 py-24"
        }
      >
        <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-emerald-400/[0.04] blur-[130px]" />

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
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.35em] text-emerald-400">
              Client Reports
            </p>

            <h2
              className={
                useCompactLayout
                  ? "mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl"
                  : "mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl"
              }
            >
              Security findings presented with
              <span className="text-emerald-400">
                {" "}
                clarity and business context.
              </span>
            </h2>

            <p
              className={
                useCompactLayout
                  ? "mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base"
                  : "mt-6 max-w-3xl leading-7 text-slate-400"
              }
            >
              Explore sanitised examples of assessment
              reports, technical findings, business risk
              explanations and prioritised remediation
              roadmaps.
            </p>
          </motion.div>

          <div
            className={
              useCompactLayout
                ? "mt-8 min-w-0 space-y-5"
                : "mt-14 space-y-8"
            }
          >
            {visibleReports.map((report) => (
              <ClientReportCard
                key={report.id}
                report={report}
                onViewReport={openReport}
                compact={useCompactLayout}
              />
            ))}
          </div>

          {useCompactLayout &&
            clientReports.length > 1 && (
              <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
                <p className="text-sm leading-6 text-slate-400">
                  The featured report opens in the complete
                  interactive document viewer. Additional
                  assessment examples remain available in the
                  full reports section.
                </p>
              </div>
            )}
        </div>
      </Wrapper>

      <ClientReportViewer
        report={selectedReport}
        isOpen={Boolean(selectedReport)}
        onClose={closeReport}
      />
    </>
  );
}
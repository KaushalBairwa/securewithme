"use client";

import { motion } from "framer-motion";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { ClientReport } from "@/data/clientReports";

interface ClientReportCardProps {
  report: ClientReport;
  onViewReport: (report: ClientReport) => void;
  compact?: boolean;
}

export default function ClientReportCard({
  report,
  onViewReport,
  compact = false,
}: ClientReportCardProps) {
  const severityData = [
    {
      name: "Critical",
      value: report.severitySummary.critical,
      color: "#ff404d",
    },
    {
      name: "High",
      value: report.severitySummary.high,
      color: "#f97316",
    },
    {
      name: "Medium",
      value: report.severitySummary.medium,
      color: "#facc15",
    },
    {
      name: "Low",
      value: report.severitySummary.low,
      color: "#00ff99",
    },
  ];

  const reportDetails = [
    {
      label: "Industry",
      value: report.industry,
    },
    {
      label: "Assessment",
      value: report.engagementType,
    },
    {
      label: "Environment",
      value: report.environment,
    },
    {
      label: "Report Date",
      value: report.reportDate,
    },
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full min-w-0 overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#0a0d13] shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
    >
      <div
        className={`flex flex-col gap-3 border-b border-white/[0.07] sm:flex-row sm:items-center sm:justify-between ${
          compact ? "px-5 py-4" : "px-6 py-5"
        }`}
      >
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-emerald-400">
            Client Report Snapshot
          </p>

          <h3
            className={`mt-2 font-bold text-white ${
              compact
                ? "text-xl leading-tight sm:text-2xl"
                : "text-2xl"
            }`}
          >
            {report.shortTitle}
          </h3>
        </div>

        <span className="w-fit shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/[0.08] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
          {report.status}
        </span>
      </div>

      <div
        className={
          compact
            ? "grid min-w-0"
            : "grid min-w-0 lg:grid-cols-[0.9fr_1.4fr]"
        }
      >
        {/* Report cover preview */}
        <div
          className={`border-b border-white/[0.07] bg-[#070a0f] ${
            compact
              ? "p-5"
              : "p-6 lg:border-b-0 lg:border-r"
          }`}
        >
          <button
            type="button"
            onClick={() => onViewReport(report)}
            className={`group mx-auto block w-full text-left ${
              compact ? "max-w-[250px]" : "max-w-[310px]"
            }`}
            aria-label={`Open ${report.title}`}
          >
            <div
              className={`relative rounded-xl border border-white/[0.1] bg-[#f8fafc] shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_28px_70px_rgba(0,229,255,0.15)] ${
                compact
                  ? "min-h-[360px] p-5"
                  : "min-h-[420px] p-6"
              }`}
            >
              <div className="border-b border-slate-200 pb-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
                  Secureandcode
                </p>

                <h4
                  className={`mt-5 font-bold leading-tight text-slate-900 ${
                    compact ? "text-xl" : "text-2xl"
                  }`}
                >
                  Vulnerability Assessment & Penetration Test
                  Report
                </h4>

                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Client Identity Redacted
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-red-50 p-3">
                  <p className="text-[9px] uppercase tracking-wider text-red-500">
                    Critical
                  </p>

                  <p className="mt-1 text-2xl font-bold text-red-600">
                    {String(
                      report.severitySummary.critical,
                    ).padStart(2, "0")}
                  </p>
                </div>

                <div className="rounded-lg bg-orange-50 p-3">
                  <p className="text-[9px] uppercase tracking-wider text-orange-600">
                    High
                  </p>

                  <p className="mt-1 text-2xl font-bold text-orange-600">
                    {String(
                      report.severitySummary.high,
                    ).padStart(2, "0")}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-semibold text-slate-700">
                  Engagement Scope
                </p>

                <p className="mt-2 text-[9px] leading-5 text-slate-500">
                  Web Application VAPT, AWS Infrastructure,
                  API Security, Attack Surface Analysis and
                  Blockchain RPC Review.
                </p>
              </div>

              <div
                className={`absolute inset-x-5 bottom-5 flex items-center justify-between border-t border-slate-200 pt-4 ${
                  compact ? "" : "sm:inset-x-6 sm:bottom-6"
                }`}
              >
                <span className="text-[9px] uppercase tracking-wider text-slate-500">
                  Interactive report
                </span>

                <span className="text-sm font-semibold text-[#223d68]">
                  Open →
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Report information */}
        <div
          className={`min-w-0 ${
            compact ? "p-5 sm:p-6" : "p-6 sm:p-8"
          }`}
        >
          <div
            className={
              compact
                ? "grid min-w-0 gap-6"
                : "grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_280px]"
            }
          >
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                Assessment Details
              </p>

              <dl className="mt-5 overflow-hidden rounded-xl border border-white/[0.07]">
                {reportDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className={`grid border-b border-white/[0.06] last:border-b-0 ${
                      compact
                        ? "grid-cols-[100px_minmax(0,1fr)]"
                        : "grid-cols-[120px_minmax(0,1fr)]"
                    }`}
                  >
                    <dt className="bg-white/[0.02] px-3 py-4 text-xs text-slate-500 sm:px-4">
                      {detail.label}
                    </dt>

                    <dd className="min-w-0 break-words px-3 py-4 text-sm font-medium leading-6 text-slate-200 sm:px-4">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="min-w-0 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3 sm:p-4">
                  <p className="font-mono text-[9px] uppercase text-slate-500">
                    Findings
                  </p>

                  <p className="mt-2 text-xl font-bold text-white sm:text-2xl">
                    {report.totalFindings}
                  </p>
                </div>

                <div className="min-w-0 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3 sm:p-4">
                  <p className="font-mono text-[9px] uppercase text-slate-500">
                    Subdomains
                  </p>

                  <p className="mt-2 text-xl font-bold text-cyan-400 sm:text-2xl">
                    {report.attackSurface.subdomains}
                  </p>
                </div>

                <div className="min-w-0 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3 sm:p-4">
                  <p className="font-mono text-[9px] uppercase text-slate-500">
                    Assets
                  </p>

                  <p className="mt-2 text-xl font-bold text-emerald-400 sm:text-2xl">
                    {report.attackSurface.indexedAssets}
                  </p>
                </div>
              </div>
            </div>

            <div className="min-w-0 overflow-hidden rounded-xl border border-white/[0.07] bg-[#080b11] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
                Findings Distribution
              </p>

              <div
                className={`mt-4 w-full min-w-0 ${
                  compact ? "h-[230px]" : "h-[210px]"
                }`}
              >
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  minWidth={0}
                >
                  <PieChart>
                    <Pie
                      data={severityData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={compact ? 48 : 55}
                      outerRadius={compact ? 76 : 82}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {severityData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={entry.color}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        background: "#070a0f",
                        border:
                          "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                        color: "#ffffff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div
                className={
                  compact
                    ? "grid grid-cols-2 gap-x-5 gap-y-3"
                    : "space-y-3"
                }
              >
                {severityData.map((item) => (
                  <div
                    key={item.name}
                    className="flex min-w-0 items-center justify-between gap-3 text-xs"
                  >
                    <span className="flex min-w-0 items-center gap-2 text-slate-400">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{
                          backgroundColor: item.color,
                        }}
                      />

                      <span className="truncate">
                        {item.name}
                      </span>
                    </span>

                    <span className="shrink-0 font-mono text-white">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-xs leading-5 text-slate-500">
              This interactive report contains sanitised,
              redacted portfolio content. Confidential
              technical evidence remains excluded.
            </p>

            <button
              type="button"
              onClick={() => onViewReport(report)}
              className="w-fit shrink-0 rounded-lg border border-emerald-400/40 px-5 py-3 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-400 hover:text-[#05070b]"
            >
              View Interactive Report
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
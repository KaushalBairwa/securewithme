import type {
  ClientReport,
  ReportSeverity,
} from "@/data/clientReports";

import ReportPage from "@/components/reports/ReportPage";

interface ClientReportDocumentProps {
  report: ClientReport;
}

const severityStyles: Record<
  ReportSeverity,
  {
    badge: string;
    row: string;
  }
> = {
  Critical: {
    badge: "bg-red-100 text-red-700",
    row: "bg-red-50",
  },
  High: {
    badge: "bg-orange-100 text-orange-700",
    row: "bg-orange-50",
  },
  Medium: {
    badge: "bg-amber-100 text-amber-700",
    row: "bg-amber-50",
  },
  Low: {
    badge: "bg-emerald-100 text-emerald-700",
    row: "bg-emerald-50",
  },
};

function ReportHeading({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className="mb-5 mt-8 border-b-2 border-[#223d68] pb-2 text-2xl font-bold text-[#223d68]">
      {number}. {children}
    </h2>
  );
}

export default function ClientReportDocument({
  report,
}: ClientReportDocumentProps) {
  const criticalFindings = report.findings.filter(
    (finding) => finding.severity === "Critical",
  );

  const highFindings = report.findings.filter(
    (finding) => finding.severity === "High",
  );

  const mediumFindings = report.findings.filter(
    (finding) => finding.severity === "Medium",
  );

  const lowFindings = report.findings.filter(
    (finding) => finding.severity === "Low",
  );

  const findingTable = (
    findings: typeof report.findings,
  ) => (
    <div className="overflow-hidden border border-slate-400">
      <div className="grid grid-cols-[180px_1fr_220px] bg-[#223d68] text-sm font-semibold text-white">
        <div className="border-r border-slate-400 p-3">
          Finding
        </div>

        <div className="border-r border-slate-400 p-3">
          Detail
        </div>

        <div className="p-3">Recommendation</div>
      </div>

      {findings.map((finding) => (
        <div
          key={finding.id}
          className={`grid grid-cols-[180px_1fr_220px] border-t border-slate-400 text-[12px] leading-5 ${
            severityStyles[finding.severity].row
          }`}
        >
          <div className="border-r border-slate-400 p-3 font-semibold">
            {finding.title}

            {finding.cvss && (
              <div className="mt-2">
                <span
                  className={`rounded px-2 py-1 text-[10px] ${
                    severityStyles[finding.severity].badge
                  }`}
                >
                  CVSS {finding.cvss}
                </span>
              </div>
            )}
          </div>

          <div className="border-r border-slate-400 p-3">
            {finding.summary}
          </div>

          <div className="p-3">
            {finding.recommendation}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Page 1 */}
      <ReportPage pageNumber={1} totalPages={5}>
        <div className="flex min-h-[850px] flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#223d68]">
            Secureandcode
          </p>

          <h1 className="mt-10 max-w-2xl text-5xl font-bold leading-[1.15] text-[#172a49]">
            Vulnerability Assessment & Penetration Test Report
          </h1>

          <p className="mt-6 text-xl text-slate-600">
            Sample Engagement — Client Identity Redacted
          </p>

          <div className="mt-14 space-y-4 border-l-4 border-[#223d68] pl-6 text-sm">
            <p>
              <strong>Prepared for:</strong>{" "}
              {report.client}
            </p>

            <p>
              <strong>Prepared by:</strong>{" "}
              {report.consultancy}
            </p>

            <p>
              <strong>Engagement Type:</strong>{" "}
              {report.engagementType}
            </p>

            <p>
              <strong>Assessment Window:</strong>{" "}
              {report.assessmentWindow}
            </p>
          </div>

          <div className="mt-16 rounded-lg border border-red-200 bg-red-50 p-6">
            <h2 className="font-bold text-red-800">
              Notice of Redaction
            </h2>

            <p className="mt-3 text-sm leading-7 text-red-700">
              This is a sanitised sample derived from a
              security engagement. Client identities,
              domains, IP addresses, file paths and other
              identifying details have been removed or
              replaced. It is presented only to demonstrate
              methodology, report structure and technical
              depth.
            </p>
          </div>
        </div>
      </ReportPage>

      {/* Page 2 */}
      <ReportPage pageNumber={2} totalPages={5}>
        <ReportHeading number="1">
          Executive Summary
        </ReportHeading>

        <div className="space-y-4 text-sm leading-7 text-slate-700">
          {report.executiveSummary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-4 gap-3">
          {[
            {
              label: "Critical",
              value: report.severitySummary.critical,
              className: "bg-red-50 text-red-700",
            },
            {
              label: "High",
              value: report.severitySummary.high,
              className: "bg-orange-50 text-orange-700",
            },
            {
              label: "Medium",
              value: report.severitySummary.medium,
              className: "bg-amber-50 text-amber-700",
            },
            {
              label: "Low",
              value: report.severitySummary.low,
              className:
                "bg-emerald-50 text-emerald-700",
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-lg p-4 ${item.className}`}
            >
              <p className="text-xs uppercase tracking-wider">
                {item.label}
              </p>

              <p className="mt-2 text-3xl font-bold">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <h3 className="mt-9 text-lg font-bold text-[#223d68]">
          Key Outcomes
        </h3>

        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
          {report.keyOutcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex gap-3"
            >
              <span className="font-bold text-[#223d68]">
                •
              </span>

              <span>{outcome}</span>
            </li>
          ))}
        </ul>

        <ReportHeading number="2">
          Scope & Methodology
        </ReportHeading>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-[#223d68]">
              2.1 Scope
            </h3>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              {report.scope.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#223d68]">
              Attack Surface
            </h3>

            <div className="mt-3 grid gap-3">
              <div className="rounded-lg bg-slate-100 p-4">
                <p className="text-xs text-slate-500">
                  Resolvable subdomains
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {report.attackSurface.subdomains}
                </p>
              </div>

              <div className="rounded-lg bg-slate-100 p-4">
                <p className="text-xs text-slate-500">
                  Indexed URLs and assets
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {report.attackSurface.indexedAssets}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ReportPage>

      {/* Page 3 */}
      <ReportPage pageNumber={3} totalPages={5}>
        <h2 className="text-2xl font-bold text-[#223d68]">
          2.2 Methodology
        </h2>

        <div className="mt-6 space-y-4">
          {report.methodology.map((phase) => (
            <div
              key={phase.title}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <h3 className="text-sm font-bold text-[#223d68]">
                {phase.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {phase.description}
              </p>
            </div>
          ))}
        </div>

        <ReportHeading number="3">
          Detailed Findings
        </ReportHeading>

        <h3 className="mb-4 text-lg font-bold text-[#223d68]">
          3.1 Critical — Web Server Findings
        </h3>

        {findingTable(criticalFindings)}
      </ReportPage>

      {/* Page 4 */}
      <ReportPage pageNumber={4} totalPages={5}>
        <h2 className="mb-5 text-2xl font-bold text-[#223d68]">
          Detailed Findings — Continued
        </h2>

        <h3 className="mb-4 mt-7 text-lg font-bold text-[#223d68]">
          3.2 High — Attack Surface & Exposure
        </h3>

        {findingTable(highFindings)}

        <h3 className="mb-4 mt-8 text-lg font-bold text-[#223d68]">
          3.3 Medium — Configuration & Application Logic
        </h3>

        {findingTable(mediumFindings)}

        <h3 className="mb-4 mt-8 text-lg font-bold text-[#223d68]">
          3.4 Low — Hardening Gaps
        </h3>

        {findingTable(lowFindings)}
      </ReportPage>

      {/* Page 5 */}
      <ReportPage pageNumber={5} totalPages={5}>
        <ReportHeading number="4">
          Phased Remediation Roadmap
        </ReportHeading>

        <p className="text-sm leading-7 text-slate-700">
          Findings were converted into an implementation
          roadmap ordered by risk reduction, cost and
          required engineering effort.
        </p>

        <div className="mt-7 overflow-hidden border border-slate-400">
          <div className="grid grid-cols-[90px_1fr_110px_130px] bg-[#223d68] text-xs font-semibold text-white">
            <div className="border-r border-slate-400 p-3">
              Level
            </div>

            <div className="border-r border-slate-400 p-3">
              Focus
            </div>

            <div className="border-r border-slate-400 p-3">
              Closed
            </div>

            <div className="p-3">Estimated cost</div>
          </div>

          {report.remediationRoadmap.map(
            (level, index) => (
              <div
                key={level.level}
                className={`grid grid-cols-[90px_1fr_110px_130px] border-t border-slate-400 text-xs leading-5 ${
                  index === 0
                    ? "bg-red-50"
                    : index === 1
                      ? "bg-amber-50"
                      : "bg-emerald-50"
                }`}
              >
                <div className="border-r border-slate-400 p-3 font-bold">
                  {level.level}
                </div>

                <div className="border-r border-slate-400 p-3">
                  {level.focus}
                </div>

                <div className="border-r border-slate-400 p-3">
                  {level.findingsClosed}
                </div>

                <div className="p-3">
                  {level.estimatedCost}
                </div>
              </div>
            ),
          )}
        </div>

        <div className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm font-bold text-emerald-800">
            Approximately 70% of findings could be closed
            without additional infrastructure expenditure.
          </p>
        </div>

        <ReportHeading number="5">
          Conclusion
        </ReportHeading>

        <div className="space-y-4 text-sm leading-7 text-slate-700">
          {report.conclusion.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-slate-300 bg-slate-100 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Confidentiality Notice
          </p>

          <p className="mt-3 text-xs leading-6 text-slate-600">
            Proof-of-concept requests, raw scanner results
            and client-specific infrastructure details are
            intentionally excluded from this portfolio
            version.
          </p>
        </div>
      </ReportPage>
    </div>
  );
}
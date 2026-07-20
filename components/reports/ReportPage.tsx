import type { ReactNode } from "react";

interface ReportPageProps {
  pageNumber: number;
  totalPages: number;
  children: ReactNode;
}

export default function ReportPage({
  pageNumber,
  totalPages,
  children,
}: ReportPageProps) {
  return (
    <article className="mx-auto min-h-[1080px] w-[820px] overflow-hidden rounded-sm bg-white px-12 py-10 text-slate-900 shadow-[0_16px_60px_rgba(0,0,0,0.5)]">
      <header className="flex items-center justify-between border-b border-slate-200 pb-4 text-[10px] uppercase tracking-[0.16em] text-slate-500">
        <span>Confidential — Sample / Redacted Report</span>

        <span>
          Page {pageNumber} of {totalPages}
        </span>
      </header>

      <div className="py-8">{children}</div>

      <footer className="mt-10 flex items-center justify-between border-t border-slate-200 pt-4 text-[10px] text-slate-500">
        <span>
          Secureandcode — Independent Security Consultancy
        </span>

        <span>Sanitised portfolio sample</span>
      </footer>
    </article>
  );
}
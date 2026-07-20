"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { AnimatePresence, motion } from "framer-motion";

import type { ClientReport } from "@/data/clientReports";

import ClientReportDocument from "@/components/reports/ClientReportDocument";

interface ClientReportViewerProps {
  report: ClientReport | null;
  isOpen: boolean;
  onClose: () => void;
}

const MIN_ZOOM = 60;
const MAX_ZOOM = 140;
const ZOOM_STEP = 10;

export default function ClientReportViewer({
  report,
  isOpen,
  onClose,
}: ClientReportViewerProps) {
  const [zoom, setZoom] = useState(80);
  const scrollContainerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyboard = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "+"
      ) {
        event.preventDefault();

        setZoom((current) =>
          Math.min(MAX_ZOOM, current + ZOOM_STEP),
        );
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "-"
      ) {
        event.preventDefault();

        setZoom((current) =>
          Math.max(MIN_ZOOM, current - ZOOM_STEP),
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyboard,
    );

    return () => {
      document.body.style.overflow =
        originalOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyboard,
      );
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setZoom(80);

      window.setTimeout(() => {
        scrollContainerRef.current?.scrollTo({
          top: 0,
        });
      }, 50);
    }
  }, [isOpen, report?.id]);

  const zoomIn = () => {
    setZoom((current) =>
      Math.min(MAX_ZOOM, current + ZOOM_STEP),
    );
  };

  const zoomOut = () => {
    setZoom((current) =>
      Math.max(MIN_ZOOM, current - ZOOM_STEP),
    );
  };

  if (!report) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${report.title} report viewer`}
          className="fixed inset-0 z-[100] bg-black/80 p-2 backdrop-blur-md sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="mx-auto flex h-full max-w-[1500px] flex-col overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#080b11] shadow-[0_35px_120px_rgba(0,0,0,0.8)]"
          >
            {/* Viewer toolbar */}
            <header className="flex flex-col gap-4 border-b border-white/[0.08] bg-[#0a0e15] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-400">
                  Interactive Report Viewer
                </p>

                <h2 className="mt-1 truncate text-sm font-semibold text-white sm:text-base">
                  {report.title}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center overflow-hidden rounded-lg border border-white/[0.1] bg-[#05070b]">
                  <button
                    type="button"
                    onClick={zoomOut}
                    disabled={zoom <= MIN_ZOOM}
                    aria-label="Zoom out"
                    className="flex h-9 w-10 items-center justify-center border-r border-white/[0.08] text-lg text-slate-300 transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    −
                  </button>

                  <button
                    type="button"
                    onClick={() => setZoom(80)}
                    className="min-w-[72px] px-3 font-mono text-xs text-cyan-400"
                    title="Reset zoom"
                  >
                    {zoom}%
                  </button>

                  <button
                    type="button"
                    onClick={zoomIn}
                    disabled={zoom >= MAX_ZOOM}
                    aria-label="Zoom in"
                    className="flex h-9 w-10 items-center justify-center border-l border-white/[0.08] text-lg text-slate-300 transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    scrollContainerRef.current?.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="h-9 rounded-lg border border-white/[0.1] px-4 font-mono text-xs text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-400"
                >
                  Top
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-400/20 bg-red-400/[0.05] text-lg text-red-400 transition hover:bg-red-400 hover:text-white"
                  aria-label="Close report"
                >
                  ×
                </button>
              </div>
            </header>

            {/* Report scroll area */}
            <div
              ref={scrollContainerRef}
              className="relative flex-1 overflow-auto bg-[#030508]"
            >
              <div
                className="mx-auto origin-top py-10 transition-transform duration-200"
                style={{
                  width: `${820 * (zoom / 100)}px`,
                }}
              >
                <div
                  style={{
                    width: "820px",
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: "top left",
                  }}
                >
                  <ClientReportDocument
                    report={report}
                  />
                </div>
              </div>
            </div>

            <footer className="flex flex-col gap-2 border-t border-white/[0.08] bg-[#0a0e15] px-4 py-3 text-[10px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p>
                Scroll vertically to read the complete
                report. Use the toolbar to change the report
                size.
              </p>

              <p className="font-mono">
                ESC to close · Ctrl + / Ctrl − to zoom
              </p>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
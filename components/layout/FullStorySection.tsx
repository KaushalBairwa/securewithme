import type {
  ReactNode,
} from "react";

interface FullStorySectionProps {
  id?: string;
  children: ReactNode;
  background?: "base" | "panel" | "cyan" | "purple";
  centered?: boolean;
  className?: string;
}

const backgrounds = {
  base: "bg-[#05070b]",
  panel: "bg-[#070a10]",
  cyan: "bg-[#05090e]",
  purple: "bg-[#08070d]",
};

export default function FullStorySection({
  id,
  children,
  background = "base",
  centered = false,
  className = "",
}: FullStorySectionProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden border-b border-white/[0.06] ${backgrounds[background]} ${className}`}
    >
      {background === "cyan" && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.035] blur-[180px]" />
      )}

      {background === "purple" && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.045] blur-[180px]" />
      )}

      <div
        className={`relative mx-auto min-h-screen max-w-[1600px] px-4 py-24 sm:px-6 lg:px-8 ${
          centered
            ? "flex items-center"
            : ""
        }`}
      >
        <div className="w-full">
          {children}
        </div>
      </div>
    </section>
  );
}
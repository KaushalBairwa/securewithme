import type {
  ReactNode,
} from "react";

interface StorySectionProps {
  id?: string;
  left: ReactNode;
  right: ReactNode;
  leftWidth?: "equal" | "wide" | "narrow";
  reverseOnDesktop?: boolean;
  align?: "start" | "center" | "stretch";
  background?: "base" | "panel" | "cyan" | "purple";
  className?: string;
}

const columnLayouts = {
  equal:
    "xl:grid-cols-2",
  wide:
    "xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]",
  narrow:
    "xl:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]",
};

const alignments = {
  start: "items-start",
  center: "items-center",
  stretch: "items-stretch",
};

const backgrounds = {
  base: "bg-[#05070b]",
  panel: "bg-[#070a10]",
  cyan: "bg-[#05090e]",
  purple: "bg-[#08070d]",
};

export default function StorySection({
  id,
  left,
  right,
  leftWidth = "equal",
  reverseOnDesktop = false,
  align = "center",
  background = "base",
  className = "",
}: StorySectionProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden border-b border-white/[0.06] ${backgrounds[background]} ${className}`}
    >
      {background === "cyan" && (
        <>
          <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.045] blur-[150px]" />

          <div className="pointer-events-none absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-blue-500/[0.035] blur-[140px]" />
        </>
      )}

      {background === "purple" && (
        <>
          <div className="pointer-events-none absolute -right-40 top-1/3 h-[430px] w-[430px] rounded-full bg-purple-500/[0.055] blur-[150px]" />

          <div className="pointer-events-none absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-cyan-400/[0.025] blur-[130px]" />
        </>
      )}

      <div
        className={`relative mx-auto grid min-h-screen max-w-[1600px] gap-8 px-4 py-24 sm:px-6 lg:px-8 xl:gap-10 ${columnLayouts[leftWidth]} ${alignments[align]}`}
      >
        <div
          className={
            reverseOnDesktop
              ? "xl:order-2"
              : ""
          }
        >
          {left}
        </div>

        <div
          className={
            reverseOnDesktop
              ? "xl:order-1"
              : ""
          }
        >
          {right}
        </div>
      </div>
    </section>
  );
}
import type { ResearchStatus } from "@/data/research";

interface ResearchStatusBadgeProps {
  status: ResearchStatus;
}

export default function ResearchStatusBadge({
  status,
}: ResearchStatusBadgeProps) {
  const styles: Record<ResearchStatus, string> = {
    Published:
      "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
    "In Progress":
      "border-amber-400/30 bg-amber-400/10 text-amber-400",
    Concept:
      "border-violet-400/30 bg-violet-400/10 text-violet-400",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  );
}
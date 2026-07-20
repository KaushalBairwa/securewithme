import type { ProjectStatus } from "@/data/projects";

interface StatusBadgeProps {
  status: ProjectStatus;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const styles: Record<ProjectStatus, string> = {
    Live:
      "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
    "In Progress":
      "border-amber-400/30 bg-amber-400/10 text-amber-400",
    Research:
      "border-cyan-400/30 bg-cyan-400/10 text-cyan-400",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  );
}
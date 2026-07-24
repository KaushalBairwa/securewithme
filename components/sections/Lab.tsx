"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  ExternalLink,
  ListChecks,
  Monitor,
  Play,
} from "lucide-react";

import {
  labNodes,
  labScenarios,
  type LabNode,
  type LabNodeStatus,
  type LabScenario,
} from "@/data/lab";

const nodeStatusStyles: Record<LabNodeStatus, string> = {
  Online:
    "border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-400",
  Building:
    "border-amber-400/30 bg-amber-400/[0.08] text-amber-400",
  Planned:
    "border-slate-400/20 bg-slate-400/[0.06] text-slate-400",
};

const scenarioStatusStyles: Record<
  LabScenario["status"],
  string
> = {
  Available:
    "border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-400",
  Building:
    "border-amber-400/30 bg-amber-400/[0.08] text-amber-400",
  Planned:
    "border-slate-400/20 bg-slate-400/[0.06] text-slate-400",
};

const difficultyStyles: Record<
  LabScenario["difficulty"],
  string
> = {
  Beginner: "text-emerald-400",
  Intermediate: "text-amber-400",
  Advanced: "text-red-400",
};

const architectureConnections = [
  {
    id: "attacker-firewall",
    start: [16, 47],
    end: [38, 47],
  },
  {
    id: "firewall-windows",
    start: [42, 43],
    end: [61, 23],
  },
  {
    id: "firewall-ubuntu",
    start: [42, 51],
    end: [61, 70],
  },
  {
    id: "windows-ad",
    start: [66, 23],
    end: [83, 23],
  },
  {
    id: "windows-siem",
    start: [64, 29],
    end: [83, 67],
  },
  {
    id: "ubuntu-siem",
    start: [66, 70],
    end: [83, 70],
  },
  {
    id: "ad-siem",
    start: [87, 29],
    end: [87, 64],
  },
];

function ArchitectureNode({
  node,
  active,
  onSelect,
}: {
  node: LabNode;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{
        scale: 1.03,
      }}
      animate={{
        borderColor: active
          ? "rgba(0,229,255,0.8)"
          : "rgba(255,255,255,0.1)",
      }}
      className="absolute z-20 w-[116px] -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-[#090d14]/95 p-3 text-left shadow-[0_12px_35px_rgba(0,0,0,0.4)] backdrop-blur-md sm:w-[140px]"
      style={{
        left: `${node.position.x}%`,
        top: `${node.position.y}%`,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            node.status === "Online"
              ? "animate-pulse bg-emerald-400"
              : node.status === "Building"
                ? "bg-amber-400"
                : "bg-slate-500"
          }`}
        />

        <span className="font-mono text-[8px] uppercase tracking-wider text-slate-600">
          {node.category}
        </span>
      </div>

      <p className="mt-3 font-mono text-[11px] font-bold text-white sm:text-xs">
        {node.shortName}
      </p>

      <p className="mt-1 hidden text-[10px] leading-4 text-slate-500 sm:block">
        {node.title}
      </p>
    </motion.button>
  );
}

function ScenarioCard({
  scenario,
  index,
}: {
  scenario: LabScenario;
  index: number;
}) {
  const isAvailable =
    scenario.status === "Available" &&
    Boolean(scenario.launchUrl);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 22,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: index * 0.06,
      }}
      className={`group flex min-h-[430px] flex-col rounded-2xl border bg-[#090c12] p-6 transition duration-300 ${
        isAvailable
          ? "border-emerald-400/20 hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-[0_22px_70px_rgba(16,185,129,0.08)]"
          : "border-white/[0.08] hover:border-purple-400/30"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-purple-400">
          {scenario.category}
        </p>

        <span
          className={`rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider ${
            scenarioStatusStyles[scenario.status]
          }`}
        >
          {scenario.status}
        </span>
      </div>

      <h4 className="mt-5 text-xl font-bold leading-7 text-white">
        {scenario.title}
      </h4>

      <p className="mt-4 text-sm leading-6 text-slate-400">
        {scenario.description}
      </p>

      {(scenario.duration ||
        scenario.exercises ||
        scenario.environment) && (
        <div className="mt-5 grid gap-2">
          {scenario.duration && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock3
                className="h-4 w-4 text-cyan-400"
                aria-hidden="true"
              />

              <span>{scenario.duration}</span>
            </div>
          )}

          {typeof scenario.exercises === "number" && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ListChecks
                className="h-4 w-4 text-emerald-400"
                aria-hidden="true"
              />

              <span>
                {scenario.exercises} verified exercises
              </span>
            </div>
          )}

          {scenario.environment && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Monitor
                className="h-4 w-4 text-purple-400"
                aria-hidden="true"
              />

              <span>{scenario.environment}</span>
            </div>
          )}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {scenario.techniques.map((technique) => (
          <span
            key={technique}
            className="rounded-md border border-white/[0.07] px-2.5 py-1 font-mono text-[10px] text-slate-400"
          >
            {technique}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-5">
          <span className="text-xs text-slate-500">
            Difficulty
          </span>

          <span
            className={`font-mono text-xs ${
              difficultyStyles[scenario.difficulty]
            }`}
          >
            {scenario.difficulty}
          </span>
        </div>

        {isAvailable && scenario.launchUrl ? (
          <a
            href={scenario.launchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-400/[0.1] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-emerald-300 transition hover:border-emerald-300 hover:bg-emerald-400/[0.16] hover:text-white"
          >
            <Play
              className="h-4 w-4"
              aria-hidden="true"
            />

            Launch Free Lab

            <ExternalLink
              className="h-4 w-4"
              aria-hidden="true"
            />
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="mt-5 flex w-full cursor-not-allowed items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-slate-600"
          >
            {scenario.status === "Building"
              ? "Lab in Development"
              : "Planned Lab"}
          </button>
        )}

        {scenario.walkthroughUrl && (
          <a
            href={scenario.walkthroughUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-4 py-3 font-mono text-xs text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-300"
          >
            View Walkthrough

            <ExternalLink
              className="h-4 w-4"
              aria-hidden="true"
            />
          </a>
        )}

        {scenario.platform && (
          <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
            Hosted on {scenario.platform}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export default function Lab() {
  const [selectedNodeId, setSelectedNodeId] =
    useState(labNodes[0].id);

  const [scenarioFilter, setScenarioFilter] =
    useState<"All" | LabScenario["status"]>("All");

  const selectedNode =
    labNodes.find(
      (node) => node.id === selectedNodeId,
    ) ?? labNodes[0];

  const visibleScenarios = useMemo(() => {
    if (scenarioFilter === "All") {
      return labScenarios;
    }

    return labScenarios.filter(
      (scenario) =>
        scenario.status === scenarioFilter,
    );
  }, [scenarioFilter]);

  const availableLabs = labScenarios.filter(
    (scenario) => scenario.status === "Available",
  ).length;

  const buildingLabs = labScenarios.filter(
    (scenario) => scenario.status === "Building",
  ).length;

  const verifiedExercises = labScenarios
    .filter(
      (scenario) => scenario.status === "Available",
    )
    .reduce(
      (total, scenario) =>
        total + (scenario.exercises ?? 0),
      0,
    );

  return (
    <section
      id="lab"
      className="relative overflow-hidden border-y border-white/[0.06] bg-[#05070b] px-4 py-24 sm:px-6"
    >
      <div className="pointer-events-none absolute left-0 top-32 h-96 w-96 rounded-full bg-purple-500/[0.05] blur-[150px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/[0.04] blur-[150px]" />

      <div className="relative mx-auto max-w-[1450px]">
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
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-purple-400">
            Interactive Cybersecurity Labs
          </p>

          <h2 className="mt-4 max-w-5xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Practice attack discovery, detection and
            investigation inside
            <span className="text-cyan-400">
              {" "}
              controlled browser environments.
            </span>
          </h2>

          <p className="mt-6 max-w-3xl leading-7 text-slate-400">
            Free hands-on security exercises designed to
            demonstrate practical offensive and defensive
            workflows without targeting production systems.
            Available labs can be launched directly from the
            browser.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Public Labs",
              value: availableLabs,
              description: "Currently available",
            },
            {
              label: "Verified Exercises",
              value: verifiedExercises,
              description: "Automatic completion checks",
            },
            {
              label: "In Development",
              value: buildingLabs,
              description: "Active lab implementation",
            },
            {
              label: "Lab Roadmap",
              value: labScenarios.length,
              description: "Total planned scenarios",
            },
          ].map((metric, index) => (
            <motion.article
              key={metric.label}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.06,
              }}
              className="rounded-xl border border-white/[0.08] bg-[#090c12] p-5"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                {metric.label}
              </p>

              <p className="mt-3 text-3xl font-bold text-white">
                {metric.value}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                {metric.description}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.75fr)_380px]">
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
            className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#070b12]"
          >
            <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">
                  Controlled Lab Architecture
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Select a node to inspect its role
                </p>
              </div>

              <span className="w-fit rounded-md border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                Public lab available
              </span>
            </div>

            <div className="relative h-[570px] overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,229,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.07) 1px, transparent 1px)",
                  backgroundSize: "34px 34px",
                }}
              />

              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <defs>
                  <filter
                    id="lab-line-glow"
                    x="-100%"
                    y="-100%"
                    width="300%"
                    height="300%"
                  >
                    <feGaussianBlur
                      stdDeviation="0.7"
                      result="blur"
                    />

                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {architectureConnections.map(
                  (connection, index) => {
                    const [startX, startY] =
                      connection.start;

                    const [endX, endY] =
                      connection.end;

                    const path = `M ${startX} ${startY} C ${
                      (startX + endX) / 2
                    } ${startY}, ${
                      (startX + endX) / 2
                    } ${endY}, ${endX} ${endY}`;

                    return (
                      <g key={connection.id}>
                        <motion.path
                          id={`lab-path-${connection.id}`}
                          d={path}
                          fill="none"
                          stroke="rgba(0,229,255,0.62)"
                          strokeWidth="0.35"
                          vectorEffect="non-scaling-stroke"
                          strokeDasharray="2 2"
                          initial={{
                            pathLength: 0,
                            opacity: 0,
                          }}
                          whileInView={{
                            pathLength: 1,
                            opacity: 1,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 1.2,
                            delay: index * 0.1,
                          }}
                        />

                        <circle
                          r="0.7"
                          fill="#00e5ff"
                          filter="url(#lab-line-glow)"
                        >
                          <animateMotion
                            dur={`${3 + index * 0.3}s`}
                            repeatCount="indefinite"
                            begin={`${index * 0.25}s`}
                          >
                            <mpath
                              href={`#lab-path-${connection.id}`}
                            />
                          </animateMotion>
                        </circle>
                      </g>
                    );
                  },
                )}
              </svg>

              {labNodes.map((node) => (
                <ArchitectureNode
                  key={node.id}
                  node={node}
                  active={
                    selectedNodeId === node.id
                  }
                  onSelect={() =>
                    setSelectedNodeId(node.id)
                  }
                />
              ))}

              <div className="absolute bottom-5 left-5 rounded-xl border border-white/[0.08] bg-[#05070b]/90 p-4 backdrop-blur-md">
                <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
                  Architecture status
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                  <span className="font-mono text-xs text-emerald-400">
                    Controlled lab online
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.aside
            key={selectedNode.id}
            initial={{
              opacity: 0,
              x: 18,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="flex flex-col rounded-2xl border border-purple-400/20 bg-[#080b12] p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-purple-400">
                  Selected node
                </p>

                <h3 className="mt-3 text-2xl font-bold text-white">
                  {selectedNode.title}
                </h3>
              </div>

              <span
                className={`rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-wider ${
                  nodeStatusStyles[
                    selectedNode.status
                  ]
                }`}
              >
                {selectedNode.status}
              </span>
            </div>

            <p className="mt-5 leading-7 text-slate-400">
              {selectedNode.description}
            </p>

            <div className="mt-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Node category
              </p>

              <p className="mt-2 text-sm font-medium text-cyan-400">
                {selectedNode.category}
              </p>
            </div>

            <div className="mt-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Technology stack
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {selectedNode.technologies.map(
                  (technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 font-mono text-xs text-slate-300"
                    >
                      {technology}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="mt-auto pt-8">
              <div className="rounded-xl border border-cyan-400/15 bg-cyan-400/[0.035] p-4">
                <p className="font-mono text-[9px] uppercase tracking-wider text-cyan-400">
                  Safety boundary
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  All attacks are performed only against
                  authorised, isolated and intentionally
                  configured lab systems.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>

        <div className="mt-20">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-purple-400">
                Lab Scenarios
              </p>

              <h3 className="mt-3 text-3xl font-bold text-white">
                Launch practical cybersecurity exercises
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {(
                [
                  "All",
                  "Available",
                  "Building",
                  "Planned",
                ] as const
              ).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() =>
                    setScenarioFilter(status)
                  }
                  className={`rounded-md border px-3 py-2 font-mono text-xs transition ${
                    scenarioFilter === status
                      ? "border-purple-400 bg-purple-400/[0.08] text-purple-300"
                      : "border-white/[0.08] text-slate-400 hover:border-purple-400/30 hover:text-white"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleScenarios.map(
              (scenario, index) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  index={index}
                />
              ),
            )}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-amber-400/15 bg-amber-400/[0.025] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-400">
            Project transparency
          </p>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
            Only scenarios marked Available are publicly
            usable. Features marked Building or Planned are
            included as part of the development roadmap and
            are not presented as completed capabilities.
          </p>
        </div>
      </div>
    </section>
  );
}
"use client";

import {
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  labNodes,
  labScenarios,
  type LabNode,
  type LabNodeStatus,
  type LabScenario,
} from "@/data/lab";

const nodeStatusStyles: Record<
  LabNodeStatus,
  string
> = {
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

export default function Lab() {
  const [selectedNodeId, setSelectedNodeId] =
    useState(labNodes[0].id);

  const [scenarioFilter, setScenarioFilter] =
    useState<"All" | LabScenario["status"]>(
      "All",
    );

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

  const onlineNodes = labNodes.filter(
    (node) => node.status === "Online",
  ).length;

  const buildingNodes = labNodes.filter(
    (node) => node.status === "Building",
  ).length;

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
            Cyber Range Lab
          </p>

          <h2 className="mt-4 max-w-5xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Building an enterprise-style security lab
            for
            <span className="text-cyan-400">
              {" "}
              attack, detection and investigation.
            </span>
          </h2>

          <p className="mt-6 max-w-3xl leading-7 text-slate-400">
            AegisRange is a controlled cybersecurity
            environment designed to demonstrate offensive
            testing, defensive monitoring, identity attacks
            and detection engineering without targeting
            production systems.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Lab Nodes",
              value: labNodes.length,
              description: "Controlled virtual systems",
            },
            {
              label: "Online",
              value: onlineNodes,
              description: "Currently operational",
            },
            {
              label: "In Development",
              value: buildingNodes,
              description: "Active implementation",
            },
            {
              label: "Scenarios",
              value: labScenarios.length,
              description: "Attack and detection modules",
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
          {/* Architecture */}
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
                  AegisRange Architecture
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Select a node to inspect its role
                </p>
              </div>

              <span className="w-fit rounded-md border border-amber-400/25 bg-amber-400/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-amber-400">
                Development environment
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
                    const [
                      startX,
                      startY,
                    ] = connection.start;

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
                            dur={`${
                              3 + index * 0.3
                            }s`}
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

          {/* Selected node */}
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

        {/* Scenarios */}
        <div className="mt-20">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-purple-400">
                Lab Scenarios
              </p>

              <h3 className="mt-3 text-3xl font-bold text-white">
                Attack and detection modules
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
                <motion.article
                  key={scenario.id}
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
                  className="flex min-h-[300px] flex-col rounded-2xl border border-white/[0.08] bg-[#090c12] p-6 transition hover:border-purple-400/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-purple-400">
                      {scenario.category}
                    </p>

                    <span
                      className={`rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider ${
                        scenarioStatusStyles[
                          scenario.status
                        ]
                      }`}
                    >
                      {scenario.status}
                    </span>
                  </div>

                  <h4 className="mt-5 text-xl font-bold text-white">
                    {scenario.title}
                  </h4>

                  <p className="mt-4 text-sm leading-6 text-slate-400">
                    {scenario.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {scenario.techniques.map(
                      (technique) => (
                        <span
                          key={technique}
                          className="rounded-md border border-white/[0.07] px-2.5 py-1 font-mono text-[10px] text-slate-400"
                        >
                          {technique}
                        </span>
                      ),
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-5">
                    <span className="text-xs text-slate-500">
                      Difficulty
                    </span>

                    <span
                      className={`font-mono text-xs ${
                        difficultyStyles[
                          scenario.difficulty
                        ]
                      }`}
                    >
                      {scenario.difficulty}
                    </span>
                  </div>
                </motion.article>
              ),
            )}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-amber-400/15 bg-amber-400/[0.025] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-400">
            Project transparency
          </p>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
            AegisRange is currently under active
            development. Features marked as building or
            planned are part of the published development
            roadmap and are not presented as completed
            capabilities.
          </p>
        </div>
      </div>
    </section>
  );
}
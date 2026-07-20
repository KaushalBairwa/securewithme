"use client";

// Complete dashboard: embedded mode keeps the map, 5 live CISA KEV CVEs, catalog summary, refresh controls, and all metric cards.

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";

import { useThreatFeed, type LiveThreatSeverity } from "@/hooks/useThreatFeed";

type ThreatSeverity = LiveThreatSeverity;
type MapFilter = "All" | ThreatSeverity;

type City = {
  id: string;
  name: string;
  coordinates: [number, number];
};

type RouteDefinition = {
  id: string;
  from: string;
  to: string;
  severity: ThreatSeverity;
};

interface MetricCard {
  id: string;
  label: string;
  value: string;
  description: string;
  glow: string;
}

const cities: City[] = [
  {
    id: "san-francisco",
    name: "San Francisco",
    coordinates: [-122.4194, 37.7749],
  },
  {
    id: "mexico-city",
    name: "Mexico City",
    coordinates: [-99.1332, 19.4326],
  },
  {
    id: "new-jersey",
    name: "New Jersey",
    coordinates: [-74.4057, 40.0583],
  },
  {
    id: "sao-paulo",
    name: "São Paulo",
    coordinates: [-46.6333, -23.5505],
  },
  {
    id: "london",
    name: "London",
    coordinates: [-0.1276, 51.5072],
  },
  {
    id: "zurich",
    name: "Zurich",
    coordinates: [8.5417, 47.3769],
  },
  {
    id: "moscow",
    name: "Moscow",
    coordinates: [37.6173, 55.7558],
  },
  {
    id: "dubai",
    name: "Dubai",
    coordinates: [55.2708, 25.2048],
  },
  {
    id: "delhi",
    name: "Delhi",
    coordinates: [77.1025, 28.7041],
  },
  {
    id: "mumbai",
    name: "Mumbai",
    coordinates: [72.8777, 19.076],
  },
  {
    id: "singapore",
    name: "Singapore",
    coordinates: [103.8198, 1.3521],
  },
  {
    id: "canberra",
    name: "Canberra",
    coordinates: [149.13, -35.2809],
  },
];

const routeDefinitions: RouteDefinition[] = [
  {
    id: "dubai-delhi",
    from: "dubai",
    to: "delhi",
    severity: "Medium",
  },
  {
    id: "delhi-mumbai",
    from: "delhi",
    to: "mumbai",
    severity: "Critical",
  },
  {
    id: "mumbai-zurich",
    from: "mumbai",
    to: "zurich",
    severity: "High",
  },
  {
    id: "zurich-london",
    from: "zurich",
    to: "london",
    severity: "Medium",
  },
  {
    id: "london-new-jersey",
    from: "london",
    to: "new-jersey",
    severity: "Critical",
  },
  {
    id: "new-jersey-mexico",
    from: "new-jersey",
    to: "mexico-city",
    severity: "High",
  },
  {
    id: "mexico-sao-paulo",
    from: "mexico-city",
    to: "sao-paulo",
    severity: "Medium",
  },
  {
    id: "mumbai-singapore",
    from: "mumbai",
    to: "singapore",
    severity: "High",
  },
  {
    id: "singapore-canberra",
    from: "singapore",
    to: "canberra",
    severity: "Medium",
  },
  {
    id: "moscow-zurich",
    from: "moscow",
    to: "zurich",
    severity: "High",
  },
  {
    id: "san-francisco-new-jersey",
    from: "san-francisco",
    to: "new-jersey",
    severity: "Critical",
  },
  {
    id: "canberra-moscow",
    from: "canberra",
    to: "moscow",
    severity: "Medium",
  },
];

const severityColors: Record<ThreatSeverity, string> = {
  Critical: "#ff404d",
  High: "#f59e0b",
  Medium: "#00e5ff",
};

const severityPillStyles: Record<ThreatSeverity, string> = {
  Critical: "border-red-400/40 bg-red-400/[0.08] text-red-400",
  High: "border-amber-400/40 bg-amber-400/[0.08] text-amber-400",
  Medium: "border-cyan-400/40 bg-cyan-400/[0.08] text-cyan-400",
};

function getCity(id: string) {
  return cities.find((city) => city.id === id);
}

function formatUpdatedDate(value?: string) {
  if (!value) {
    return "Recently";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface DashboardPreviewProps {
  embedded?: boolean;
}

export default function DashboardPreview({
  embedded = false,
}: DashboardPreviewProps) {
  const [filter, setFilter] = useState<MapFilter>("All");
  const [routeOffset, setRouteOffset] = useState(0);
  const [simulatedConnections, setSimulatedConnections] = useState(7842);

  const { data: liveThreatData, isLoading, error, refresh } = useThreatFeed();

  const displayedThreats = liveThreatData?.vulnerabilities.slice(0, 5) ?? [];

  const projection = useMemo(
    () => geoNaturalEarth1().scale(167).translate([480, 250]),
    [],
  );

  const countryPaths = useMemo(() => {
    const topology = worldData as unknown as {
      objects: {
        countries: unknown;
      };
    };

    const countries = feature(
      worldData as never,
      topology.objects.countries as never,
    ) as unknown as {
      features: Array<unknown>;
    };

    const pathGenerator = geoPath(projection);

    return countries.features
      .map((country, index) => ({
        id: index,
        path: pathGenerator(country as never),
      }))
      .filter(
        (
          item,
        ): item is {
          id: number;
          path: string;
        } => Boolean(item.path),
      );
  }, [projection]);

  useEffect(() => {
    const routeTimer = window.setInterval(() => {
      setRouteOffset((current) => (current + 3) % routeDefinitions.length);
    }, 4200);

    const signalTimer = window.setInterval(() => {
      setSimulatedConnections((current) => {
        const change = Math.floor(Math.random() * 35) - 12;

        return Math.max(7600, current + change);
      });
    }, 1800);

    return () => {
      window.clearInterval(routeTimer);
      window.clearInterval(signalTimer);
    };
  }, []);

  const visibleRoutes = useMemo(() => {
    const rotatedRoutes = [
      ...routeDefinitions.slice(routeOffset),
      ...routeDefinitions.slice(0, routeOffset),
    ];

    if (filter === "All") {
      return rotatedRoutes.slice(0, 6);
    }

    return routeDefinitions
      .filter((route) => route.severity === filter)
      .slice(0, 6);
  }, [filter, routeOffset]);

  const metricCards = useMemo<MetricCard[]>(() => {
    const criticalCount = displayedThreats.filter(
      (item) => item.severity === "Critical",
    ).length;

    const highCount = displayedThreats.filter(
      (item) => item.severity === "High",
    ).length;

    const ransomwareCount = displayedThreats.filter(
      (item) => item.ransomwareUse,
    ).length;

    return [
      {
        id: "catalog",
        label: "CISA KEV Catalog",
        value: liveThreatData?.totalCount?.toLocaleString() ?? "—",
        description: "Known exploited vulnerabilities",
        glow: "bg-cyan-400",
      },
      {
        id: "critical",
        label: "Critical in Feed",
        value: criticalCount.toString(),
        description: "Ransomware-associated entries",
        glow: "bg-red-400",
      },
      {
        id: "high",
        label: "High in Feed",
        value: highCount.toString(),
        description: "Recently added exploited CVEs",
        glow: "bg-amber-400",
      },
      {
        id: "ransomware",
        label: "Ransomware Use",
        value: ransomwareCount.toString(),
        description: "Known campaign association",
        glow: "bg-red-400",
      },
      {
        id: "connections",
        label: "Illustrative Routes",
        value: simulatedConnections.toLocaleString(),
        description: "Simulated visualization activity",
        glow: "bg-emerald-400",
      },
    ];
  }, [displayedThreats, liveThreatData?.totalCount, simulatedConnections]);

  const createRoutePath = (route: RouteDefinition) => {
    const from = getCity(route.from);
    const to = getCity(route.to);

    if (!from || !to) {
      return "";
    }

    const start = projection(from.coordinates);
    const end = projection(to.coordinates);

    if (!start || !end) {
      return "";
    }

    const [startX, startY] = start;
    const [endX, endY] = end;

    const middleX = (startX + endX) / 2;
    const middleY =
      Math.min(startY, endY) - Math.max(25, Math.abs(endX - startX) * 0.16);

    return `M ${startX} ${startY} Q ${middleX} ${middleY} ${endX} ${endY}`;
  };

  const Wrapper = embedded ? "div" : "section";

  return (
    <Wrapper
      aria-label="Global security dashboard"
      className={
        embedded
          ? "relative w-full overflow-visible"
          : "relative border-y border-white/[0.06] bg-[#05070b] px-4 py-20 sm:px-6"
      }
    >
      <div className="pointer-events-none absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/[0.04] blur-[150px]" />

      <div
        className={
          embedded ? "relative w-full" : "relative mx-auto max-w-[1500px]"
        }
      >
        <div
          className={
            embedded
              ? "mb-5 flex flex-col justify-between gap-4"
              : "mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"
          }
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-cyan-400">
              Security Intelligence Dashboard
            </p>

            <h2
              className={
                embedded
                  ? "mt-2 text-xl font-bold leading-tight text-white 2xl:text-2xl"
                  : "mt-3 text-3xl font-bold text-white sm:text-4xl"
              }
            >
              Public threat intelligence with global visualization
            </h2>

            <p
              className={
                embedded
                  ? "mt-3 max-w-3xl text-xs leading-5 text-slate-400 2xl:text-sm"
                  : "mt-4 max-w-3xl leading-7 text-slate-400"
              }
            >
              The vulnerability feed uses real public CISA Known Exploited
              Vulnerabilities data. Animated geographic routes are illustrative
              and do not represent verified live attacks.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-lg border border-white/[0.08] bg-[#080b11] px-4 py-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(0,255,153,0.9)]" />

            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Public feed online
            </span>
          </div>
        </div>

        <div
          className={
            embedded
              ? "mb-4 flex flex-col justify-between gap-2 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.035] px-3 py-2 text-[10px] 2xl:flex-row 2xl:items-center"
              : "mb-5 flex flex-col justify-between gap-3 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.035] px-4 py-3 text-xs sm:flex-row sm:items-center"
          }
        >
          <p className="text-slate-400">
            Real vulnerability intelligence is shown in the CISA feed. City
            routes, connection values and geographic origins are portfolio
            visualizations only.
          </p>

          <span className="shrink-0 font-mono uppercase tracking-wider text-cyan-400">
            Transparent demo
          </span>
        </div>

        <div
          className={
            embedded
              ? "grid items-start gap-4 2xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.95fr)]"
              : "grid items-start gap-5 xl:grid-cols-[minmax(0,2.25fr)_minmax(360px,1fr)]"
          }
        >
          <div className={embedded ? "space-y-4" : "contents"}>
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#070b12] shadow-[0_30px_90px_rgba(0,0,0,0.4)]"
            >
              <div className="flex flex-col gap-4 border-b border-white/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">
                    Global Threat Visualization
                  </h3>

                  <span className="flex items-center gap-2 rounded-md border border-cyan-400/20 bg-cyan-400/[0.05] px-2.5 py-1 font-mono text-[10px] uppercase text-cyan-400">
                    Illustrative
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {(["All", "Critical", "High", "Medium"] as MapFilter[]).map(
                    (item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setFilter(item)}
                        className={`rounded-md border px-3 py-1.5 font-mono text-xs transition ${
                          filter === item
                            ? "border-cyan-400 bg-cyan-400/[0.08] text-cyan-300"
                            : "border-transparent text-slate-400 hover:border-white/10 hover:text-white"
                        }`}
                      >
                        {item}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="relative overflow-hidden">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.28]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,229,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "34px 34px",
                  }}
                />

                <svg
                  viewBox="0 0 960 500"
                  className={
                    embedded
                      ? "relative block min-h-[300px] w-full"
                      : "relative block min-h-[430px] w-full"
                  }
                  role="img"
                  aria-label="World map with illustrative animated city connections"
                >
                  <defs>
                    <filter
                      id="map-glow"
                      x="-100%"
                      y="-100%"
                      width="300%"
                      height="300%"
                    >
                      <feGaussianBlur stdDeviation="4" result="blur" />

                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <g>
                    {countryPaths.map((country) => (
                      <path
                        key={country.id}
                        d={country.path}
                        fill="#07192a"
                        stroke="rgba(0,138,224,0.42)"
                        strokeWidth="0.55"
                      />
                    ))}
                  </g>

                  <g>
                    {visibleRoutes.map((route, index) => {
                      const path = createRoutePath(route);

                      const color = severityColors[route.severity];

                      return (
                        <g key={`${route.id}-${routeOffset}`}>
                          <motion.path
                            id={`route-${route.id}`}
                            d={path}
                            fill="none"
                            stroke={color}
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeDasharray="8 8"
                            initial={{
                              pathLength: 0,
                              opacity: 0,
                            }}
                            animate={{
                              pathLength: 1,
                              opacity: 0.9,
                            }}
                            transition={{
                              duration: 1.5,
                              delay: index * 0.12,
                            }}
                          />

                          <circle r="3.3" fill={color} filter="url(#map-glow)">
                            <animateMotion
                              dur={`${2.8 + index * 0.22}s`}
                              repeatCount="indefinite"
                              begin={`${index * 0.35}s`}
                            >
                              <mpath href={`#route-${route.id}`} />
                            </animateMotion>
                          </circle>
                        </g>
                      );
                    })}
                  </g>

                  <g>
                    {cities.map((city) => {
                      const point = projection(city.coordinates);

                      if (!point) {
                        return null;
                      }

                      const [x, y] = point;

                      const isActive = visibleRoutes.some(
                        (route) =>
                          route.from === city.id || route.to === city.id,
                      );

                      return (
                        <g key={city.id} transform={`translate(${x} ${y})`}>
                          {isActive && (
                            <circle
                              r="10"
                              fill="none"
                              stroke="#00e5ff"
                              strokeOpacity="0.45"
                            >
                              <animate
                                attributeName="r"
                                values="5;14;5"
                                dur="2s"
                                repeatCount="indefinite"
                              />

                              <animate
                                attributeName="opacity"
                                values="0.9;0;0.9"
                                dur="2s"
                                repeatCount="indefinite"
                              />
                            </circle>
                          )}

                          <circle
                            r={isActive ? 4 : 2.5}
                            fill={isActive ? "#00e5ff" : "#2d7fa0"}
                            filter={isActive ? "url(#map-glow)" : undefined}
                          />

                          <text
                            x={city.id === "canberra" ? -8 : 8}
                            y={
                              city.id === "london" || city.id === "moscow"
                                ? -8
                                : 15
                            }
                            textAnchor={
                              city.id === "canberra" ? "end" : "start"
                            }
                            fill={isActive ? "#ffffff" : "#7b93aa"}
                            fontSize="10"
                            fontFamily="var(--font-mono)"
                          >
                            {city.name}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                </svg>

                <div className="absolute bottom-5 left-5 rounded-xl border border-white/[0.09] bg-[#05070b]/90 p-4 backdrop-blur-md">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    Simulated activity
                  </p>

                  <p className="mt-3 text-3xl font-bold text-white">
                    {simulatedConnections.toLocaleString()}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Illustrative connections
                  </p>

                  <p className="mt-2 font-mono text-xs text-cyan-400">
                    Visualization only
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/[0.07] px-5 py-4 lg:flex-row lg:items-center">
                <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-slate-500">
                  Illustrative route
                </span>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-300">
                  {[
                    "Dubai",
                    "Delhi",
                    "Mumbai",
                    "Zurich",
                    "London",
                    "New Jersey",
                    "Canberra",
                    "Moscow",
                  ].map((city, index, values) => (
                    <span key={city} className="flex items-center gap-3">
                      <span>{city}</span>

                      {index < values.length - 1 && (
                        <span
                          className={
                            index % 3 === 0
                              ? "text-cyan-400"
                              : index % 3 === 1
                                ? "text-red-400"
                                : "text-amber-400"
                          }
                        >
                          →
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {embedded && (
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
                {metricCards.map((metric, index) => (
                  <motion.article
                    key={metric.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.06,
                    }}
                    className="relative min-h-[150px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#080c13] p-4 last:col-span-2 xl:last:col-span-1"
                  >
                    <div
                      className={`absolute right-5 top-5 h-10 w-10 rounded-full opacity-10 blur-xl ${metric.glow}`}
                    />

                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                      {metric.label}
                    </p>

                    <div className="mt-3">
                      <p className="text-2xl font-bold text-white">
                        {metric.value}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {metric.description}
                      </p>
                    </div>

                    <div className="mt-4 flex h-8 items-end gap-1">
                      {[13, 20, 14, 25, 19, 29].map((height, barIndex) => (
                        <span
                          key={barIndex}
                          className={`w-1 rounded-full opacity-80 ${metric.glow}`}
                          style={{
                            height,
                          }}
                        />
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>

          {/* Real CISA feed */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={
              embedded
                ? "overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#070b12]"
                : "overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#070b12]"
            }
          >
            <div className="flex items-start justify-between border-b border-white/[0.07] px-5 py-5">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-mono text-sm font-bold uppercase tracking-[0.17em] text-cyan-400">
                    Public Threat Intelligence
                  </h3>

                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(0,255,153,0.9)]" />
                </div>

                <p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-slate-600">
                  Source: CISA KEV
                </p>
              </div>

              <a
                href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
              >
                View source ↗
              </a>
            </div>

            <div className="px-5">
              {isLoading && (
                <div className="space-y-4 py-5">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="h-24 animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.025]"
                    />
                  ))}
                </div>
              )}

              {!isLoading && error && (
                <div className="my-5 rounded-xl border border-red-400/20 bg-red-400/[0.05] p-5">
                  <p className="text-sm font-semibold text-red-400">
                    Intelligence feed unavailable
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={() => void refresh()}
                    className="mt-4 rounded-md border border-white/10 px-3 py-2 font-mono text-xs text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
                  >
                    Retry
                  </button>
                </div>
              )}

              {!isLoading && !error && displayedThreats.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-sm text-slate-400">
                    No vulnerability entries are currently available.
                  </p>
                </div>
              )}

              {!isLoading &&
                !error &&
                displayedThreats.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{
                      opacity: 0,
                      x: 14,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className={
                      embedded
                        ? "grid grid-cols-[1fr_auto] gap-2 border-b border-white/[0.06] py-3 last:border-b-0"
                        : "grid grid-cols-[1fr_auto] gap-4 border-b border-white/[0.06] py-5 last:border-b-0"
                    }
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] text-cyan-400">
                          {item.cve}
                        </span>

                        <span className="font-mono text-[9px] uppercase tracking-wider text-slate-600">
                          {item.source}
                        </span>
                      </div>

                      <h4 className="mt-2 text-sm font-semibold leading-5 text-white">
                        {item.title}
                      </h4>

                      <p
                        className={
                          embedded
                            ? "mt-1 line-clamp-1 text-[10px] leading-4 text-slate-400"
                            : "mt-1.5 line-clamp-2 text-xs leading-5 text-slate-400"
                        }
                      >
                        {item.description}
                      </p>

                      <p className="mt-2 font-mono text-[10px] text-slate-600">
                        Added {item.dateAdded}
                      </p>
                    </div>

                    <span
                      className={`h-fit rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider ${
                        severityPillStyles[item.severity]
                      }`}
                    >
                      {item.severity}
                    </span>
                  </motion.article>
                ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-white/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                Catalog updated:{" "}
                <span className="text-emerald-400">
                  {formatUpdatedDate(liveThreatData?.lastUpdated)}
                </span>
              </p>

              <button
                type="button"
                onClick={() => void refresh()}
                disabled={isLoading}
                className="w-fit font-mono text-xs text-cyan-400 transition hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Refreshing..." : "Refresh feed"}
              </button>
            </div>
          </motion.aside>
        </div>

        {!embedded && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {metricCards.map((metric, index) => (
              <motion.article
                key={metric.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.06,
                }}
                className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#080c13] p-5"
              >
                <div
                  className={`absolute right-5 top-5 h-10 w-10 rounded-full opacity-10 blur-xl ${metric.glow}`}
                />

                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  {metric.label}
                </p>

                <div className="mt-3">
                  <p className="text-3xl font-bold text-white">
                    {metric.value}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {metric.description}
                  </p>
                </div>

                <div className="mt-4 flex h-8 items-end gap-1">
                  {[13, 20, 14, 25, 19, 29].map((height, barIndex) => (
                    <span
                      key={barIndex}
                      className={`w-1 rounded-full opacity-80 ${metric.glow}`}
                      style={{
                        height,
                      }}
                    />
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
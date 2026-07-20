"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import StatusBadge from "@/components/common/StatusBadge";

interface ProjectCardProps {
  project: Project;
}

function ProjectPreview({
  project,
}: {
  project: Project;
}) {
  if (project.previewImage) {
    return (
      <div className="relative aspect-video overflow-hidden border-b border-white/[0.07] bg-[#06090f]">
        <img
          src={project.previewImage}
          alt={`${project.title} preview`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080b11]/70 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden border-b border-white/[0.07] bg-[#06090f]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="absolute left-5 right-5 top-5 flex items-center justify-between rounded-lg border border-white/[0.08] bg-[#0a0e16]/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        </div>

        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
          project-console
        </span>
      </div>

      <div className="absolute bottom-5 left-5 right-5 grid grid-cols-[1fr_0.72fr] gap-3">
        <div className="rounded-xl border border-cyan-400/15 bg-[#09111a]/90 p-4 backdrop-blur">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
            Security activity
          </p>

          <div className="mt-4 flex h-20 items-end gap-2">
            {[24, 42, 31, 58, 47, 72, 54, 84].map(
              (height, index) => (
                <motion.span
                  key={index}
                  initial={{ height: 0 }}
                  whileInView={{ height }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.55,
                  }}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-500/20 to-cyan-400"
                />
              ),
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-white/[0.07] bg-[#09111a]/90 p-3 backdrop-blur">
            <p className="font-mono text-[8px] uppercase tracking-wider text-slate-500">
              Risk score
            </p>

            <p className="mt-2 text-xl font-bold text-cyan-400">
              84
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-[#09111a]/90 p-3 backdrop-blur">
            <p className="font-mono text-[8px] uppercase tracking-wider text-slate-500">
              Status
            </p>

            <p className="mt-2 font-mono text-xs text-emerald-400">
              ONLINE
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cyan-400/[0.04] to-transparent" />
    </div>
  );
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  const hasDemo =
    Boolean(project.demo) && project.demo !== "#";

  const hasGithub =
    Boolean(project.github) && project.github !== "#";

  const hasCaseStudy =
    Boolean(project.caseStudy) &&
    project.caseStudy !== "#";

  const hasPublishedLink =
    hasDemo || hasGithub || hasCaseStudy;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
      }}
      whileHover={{
        y: -6,
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0d13] transition duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(0,229,255,0.08)]"
    >
      <ProjectPreview project={project} />

      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-cyan-400">
              &gt; {project.category}
            </p>

            <h3 className="mt-3 text-2xl font-bold text-white">
              {project.title}
            </h3>
          </div>

          <StatusBadge status={project.status} />
        </div>

        <p className="mt-5 leading-7 text-slate-400">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-md border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 font-mono text-xs text-slate-300"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-8">
          {hasPublishedLink ? (
            <div className="flex flex-wrap gap-3">
              {hasDemo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-[#05070b] transition hover:bg-cyan-300"
                >
                  Live Demo ↗
                </a>
              )}

              {hasGithub && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/50 hover:text-cyan-400"
                >
                  GitHub ↗
                </a>
              )}

              {hasCaseStudy && (
                <a
                  href={project.caseStudy}
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/50 hover:text-cyan-400"
                >
                  Case Study →
                </a>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
              <span className="font-mono text-xs text-slate-500">
                Documentation in progress
              </span>

              <span className="text-cyan-400">
                →
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
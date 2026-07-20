"use client";

import { motion } from "framer-motion";

import {
  contactDetails,
} from "@/data/contact";

import ConsultationForm from "@/components/contact/ConsultationForm";

const consultationProcess = [
  {
    number: "01",
    title: "Initial Discussion",
    description:
      "We discuss your environment, objectives, timeline and business concerns.",
  },
  {
    number: "02",
    title: "Scope & Authorisation",
    description:
      "The assessment scope, testing boundaries, deliverables and written permissions are agreed.",
  },
  {
    number: "03",
    title: "Security Engagement",
    description:
      "The authorised work is performed using a documented and risk-controlled methodology.",
  },
  {
    number: "04",
    title: "Report & Remediation",
    description:
      "You receive prioritised findings, technical evidence and an actionable remediation roadmap.",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#05070b] px-4 py-24 sm:px-6"
    >
      <div className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-cyan-400/[0.04] blur-[150px]" />

      <div className="pointer-events-none absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-purple-500/[0.05] blur-[150px]" />

      <div className="relative mx-auto max-w-[1400px]">
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
          className="max-w-4xl"
        >
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-cyan-400">
            Contact & Consultation
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
            Let’s discuss how to improve your
            <span className="text-cyan-400">
              {" "}
              security posture.
            </span>
          </h2>

          <p className="mt-6 max-w-3xl leading-7 text-slate-400">
            Request a security assessment,
            architecture review, threat-detection
            engagement or advisory consultation.
            Every technical assessment begins with
            clear scope and written authorisation.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 xl:grid-cols-[390px_minmax(0,1fr)]">
          <div className="space-y-6">
            <motion.aside
              initial={{
                opacity: 0,
                x: -24,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              className="rounded-2xl border border-white/[0.08] bg-[#080c12] p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-purple-400">
                Contact Details
              </p>

              <div className="mt-5 divide-y divide-white/[0.07]">
                {contactDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="py-4 first:pt-0 last:pb-0"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-wider text-slate-600">
                      {detail.label}
                    </p>

                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="mt-2 block break-all text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {detail.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.aside>

            <motion.aside
              initial={{
                opacity: 0,
                x: -24,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.08,
              }}
              className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.025] p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
                Engagement Process
              </p>

              <div className="mt-6 space-y-6">
                {consultationProcess.map(
                  (step) => (
                    <div
                      key={step.number}
                      className="grid grid-cols-[40px_1fr] gap-4"
                    >
                      <span className="font-mono text-sm font-bold text-emerald-400">
                        {step.number}
                      </span>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          {step.title}
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </motion.aside>

            <div className="rounded-xl border border-amber-400/15 bg-amber-400/[0.025] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-400">
                Responsible Security Notice
              </p>

              <p className="mt-3 text-xs leading-6 text-slate-400">
                Vulnerability testing is performed
                only against systems for which the
                owner has provided explicit
                authorisation. Requests involving
                unauthorised targets will not be
                accepted.
              </p>
            </div>
          </div>

          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  consultationServices,
  projectBudgets,
  projectTimelines,
} from "@/data/contact";

interface ConsultationFormState {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  consent: boolean;
}

interface ConsultationFormErrors {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
  consent?: string;
}

const initialFormState: ConsultationFormState = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "Not decided",
  timeline: "Flexible",
  message: "",
  consent: false,
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ConsultationForm() {
  const [form, setForm] =
    useState<ConsultationFormState>(
      initialFormState,
    );

  const [errors, setErrors] =
    useState<ConsultationFormErrors>({});

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const updateField = (
    event: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >,
  ) => {
    const target = event.target;

    const name =
      target.name as keyof ConsultationFormState;

    const value =
      target instanceof HTMLInputElement &&
      target.type === "checkbox"
        ? target.checked
        : target.value;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  };

  const validateForm = () => {
    const nextErrors: ConsultationFormErrors =
      {};

    if (!form.name.trim()) {
      nextErrors.name =
        "Please enter your name.";
    }

    if (!form.email.trim()) {
      nextErrors.email =
        "Please enter your email address.";
    } else if (!isValidEmail(form.email)) {
      nextErrors.email =
        "Please enter a valid email address.";
    }

    if (!form.service) {
      nextErrors.service =
        "Please select a security service.";
    }

    if (form.message.trim().length < 20) {
      nextErrors.message =
        "Please provide at least 20 characters about your requirement.";
    }

    if (!form.consent) {
      nextErrors.consent =
        "Please confirm that the submitted information is authorised.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Temporary showcase submission.
      // Replace this delay with a request to your API route later.
      await new Promise((resolve) => {
        window.setTimeout(resolve, 900);
      });

      setIsSubmitted(true);
      setForm(initialFormState);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="flex min-h-[620px] flex-col items-center justify-center rounded-2xl border border-emerald-400/20 bg-[#080c12] p-8 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/[0.08] text-3xl text-emerald-400">
          ✓
        </div>

        <p className="mt-7 font-mono text-xs uppercase tracking-[0.24em] text-emerald-400">
          Request prepared
        </p>

        <h3 className="mt-4 text-3xl font-bold text-white">
          Thank you for reaching out.
        </h3>

        <p className="mt-4 max-w-lg leading-7 text-slate-400">
          Your consultation request passed the
          website validation successfully. Email
          delivery will be connected in the next
          backend integration phase.
        </p>

        <button
          type="button"
          onClick={() =>
            setIsSubmitted(false)
          }
          className="mt-8 rounded-lg border border-cyan-400/40 px-5 py-3 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-[#05070b]"
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
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
      noValidate
      className="rounded-2xl border border-cyan-400/20 bg-[#080c12] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-8"
    >
      <div className="flex flex-col gap-3 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-400">
            Consultation Request
          </p>

          <h3 className="mt-2 text-2xl font-bold text-white">
            Tell me about your security requirement
          </h3>
        </div>

        <span className="w-fit rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
          Confidential enquiry
        </span>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="consultation-name"
            className="text-sm font-medium text-slate-300"
          >
            Full name
            <span className="text-red-400">
              {" "}
              *
            </span>
          </label>

          <input
            id="consultation-name"
            name="name"
            type="text"
            value={form.name}
            onChange={updateField}
            placeholder="Your name"
            autoComplete="name"
            className={`mt-2 w-full rounded-lg border bg-[#05070b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 ${
              errors.name
                ? "border-red-400/60 focus:border-red-400"
                : "border-white/[0.09] focus:border-cyan-400/60"
            }`}
          />

          {errors.name && (
            <p className="mt-2 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="consultation-email"
            className="text-sm font-medium text-slate-300"
          >
            Work email
            <span className="text-red-400">
              {" "}
              *
            </span>
          </label>

          <input
            id="consultation-email"
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="name@company.com"
            autoComplete="email"
            className={`mt-2 w-full rounded-lg border bg-[#05070b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 ${
              errors.email
                ? "border-red-400/60 focus:border-red-400"
                : "border-white/[0.09] focus:border-cyan-400/60"
            }`}
          />

          {errors.email && (
            <p className="mt-2 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="consultation-company"
            className="text-sm font-medium text-slate-300"
          >
            Company or organisation
          </label>

          <input
            id="consultation-company"
            name="company"
            type="text"
            value={form.company}
            onChange={updateField}
            placeholder="Optional"
            autoComplete="organization"
            className="mt-2 w-full rounded-lg border border-white/[0.09] bg-[#05070b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60"
          />
        </div>

        <div>
          <label
            htmlFor="consultation-service"
            className="text-sm font-medium text-slate-300"
          >
            Service required
            <span className="text-red-400">
              {" "}
              *
            </span>
          </label>

          <select
            id="consultation-service"
            name="service"
            value={form.service}
            onChange={updateField}
            className={`mt-2 w-full rounded-lg border bg-[#05070b] px-4 py-3 text-sm outline-none transition ${
              form.service
                ? "text-white"
                : "text-slate-600"
            } ${
              errors.service
                ? "border-red-400/60 focus:border-red-400"
                : "border-white/[0.09] focus:border-cyan-400/60"
            }`}
          >
            <option value="">
              Select a service
            </option>

            {consultationServices.map(
              (service) => (
                <option
                  key={service}
                  value={service}
                  className="bg-[#05070b] text-white"
                >
                  {service}
                </option>
              ),
            )}
          </select>

          {errors.service && (
            <p className="mt-2 text-xs text-red-400">
              {errors.service}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="consultation-budget"
            className="text-sm font-medium text-slate-300"
          >
            Approximate budget
          </label>

          <select
            id="consultation-budget"
            name="budget"
            value={form.budget}
            onChange={updateField}
            className="mt-2 w-full rounded-lg border border-white/[0.09] bg-[#05070b] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60"
          >
            {projectBudgets.map((budget) => (
              <option
                key={budget}
                value={budget}
                className="bg-[#05070b]"
              >
                {budget}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="consultation-timeline"
            className="text-sm font-medium text-slate-300"
          >
            Preferred timeline
          </label>

          <select
            id="consultation-timeline"
            name="timeline"
            value={form.timeline}
            onChange={updateField}
            className="mt-2 w-full rounded-lg border border-white/[0.09] bg-[#05070b] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60"
          >
            {projectTimelines.map(
              (timeline) => (
                <option
                  key={timeline}
                  value={timeline}
                  className="bg-[#05070b]"
                >
                  {timeline}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="consultation-message"
          className="text-sm font-medium text-slate-300"
        >
          Project details
          <span className="text-red-400">
            {" "}
            *
          </span>
        </label>

        <textarea
          id="consultation-message"
          name="message"
          value={form.message}
          onChange={updateField}
          rows={7}
          placeholder="Describe the environment, security concern, expected outcome and any important timeline..."
          className={`mt-2 w-full resize-y rounded-lg border bg-[#05070b] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 ${
            errors.message
              ? "border-red-400/60 focus:border-red-400"
              : "border-white/[0.09] focus:border-cyan-400/60"
          }`}
        />

        <div className="mt-2 flex justify-between gap-4">
          {errors.message ? (
            <p className="text-xs text-red-400">
              {errors.message}
            </p>
          ) : (
            <p className="text-xs text-slate-600">
              Avoid including passwords, API keys or
              other secrets.
            </p>
          )}

          <p className="shrink-0 font-mono text-[10px] text-slate-600">
            {form.message.length} characters
          </p>
        </div>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
        <input
          name="consent"
          type="checkbox"
          checked={form.consent}
          onChange={updateField}
          className="mt-1 h-4 w-4 accent-cyan-400"
        />

        <span>
          <span className="text-sm text-slate-300">
            I confirm that I am authorised to
            discuss this environment and that I
            have not included confidential
            credentials or sensitive personal data.
          </span>

          {errors.consent && (
            <span className="mt-2 block text-xs text-red-400">
              {errors.consent}
            </span>
          )}
        </span>
      </label>

      <div className="mt-7 flex flex-col gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-lg text-xs leading-5 text-slate-500">
          Submitting this form does not create a
          contractual engagement. Scope, written
          authorisation and terms must be agreed
          before security testing begins.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-fit min-w-[190px] rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-[#05070b] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Preparing request..."
            : "Request Consultation"}
        </button>
      </div>
    </motion.form>
  );
}
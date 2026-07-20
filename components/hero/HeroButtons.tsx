import { profile } from "@/data/profile";

export default function HeroButtons() {
  return (
    <div className="mt-9 flex flex-wrap gap-4">
      <a
        href="#contact"
        className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]"
      >
        Get in Touch
      </a>

      <a
        href="#projects"
        className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 transition hover:border-cyan-400 hover:text-cyan-400"
      >
        View Projects
      </a>

      <a
        href="/resume.pdf"
        className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 transition hover:border-cyan-400 hover:text-cyan-400"
      >
        {profile.buttons.resume}
      </a>
    </div>
  );
}
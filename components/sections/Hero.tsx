import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 pb-16 pt-36 text-white"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="mb-6 text-sm uppercase tracking-[0.45em] text-cyan-400">
            Professional Cloud & AI Security Engineer
          </p>

          <h1 className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>

          <h2 className="mt-6 text-2xl text-zinc-300 lg:text-3xl">
            {profile.title}
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            {profile.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:scale-105"
            >
              {profile.buttons.primary}
            </a>

            <a
              href="#projects"
              className="rounded-xl border border-white/20 px-6 py-3 transition hover:border-cyan-400"
            >
              {profile.buttons.secondary}
            </a>

            <a
              href="/resume.pdf"
              className="rounded-xl border border-white/20 px-6 py-3 transition hover:border-cyan-400"
            >
              {profile.buttons.resume}
            </a>
          </div>

          <div className="mt-10 flex gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition hover:border-cyan-400 hover:text-cyan-400"
            >
              GH
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition hover:border-cyan-400 hover:text-cyan-400"
            >
              IN
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition hover:border-cyan-400 hover:text-cyan-400"
            >
              @
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-400/20 bg-zinc-950/80 p-8 shadow-[0_0_60px_rgba(0,229,255,0.08)]">
          <p className="mb-8 text-cyan-400">secure@withme:~$</p>

          <div className="space-y-7 font-mono text-sm sm:text-base">
            <div>
              <p className="text-white">&gt; whoami</p>
              <p className="mt-2 text-emerald-400">
                Cloud & AI Security Engineer
              </p>
            </div>

            <div>
              <p className="text-white">&gt; currently_building</p>

              <ul className="mt-3 space-y-2 text-emerald-400">
                <li>✓ AegisRange</li>
                <li>✓ AI Pentest Manager</li>
                <li>✓ Cloud Security Assessment Platform</li>
                <li>✓ AI Threat Detection</li>
              </ul>
            </div>

            <div>
              <p className="text-white">&gt; status</p>
              <p className="mt-2 text-cyan-400">ONLINE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
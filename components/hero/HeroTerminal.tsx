export default function HeroTerminal() {
  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#090d12]/90 shadow-[0_0_80px_rgba(0,229,255,0.08)] backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />

        <p className="ml-3 font-mono text-xs text-slate-500">
          secure@withme:~
        </p>
      </div>

      <div className="space-y-7 p-7 font-mono text-sm sm:p-9 sm:text-base">
        <div>
          <p className="text-white">$ whoami</p>
          <p className="mt-2 text-emerald-400">
            &gt; Cloud & AI Security Engineer
          </p>
        </div>

        <div>
          <p className="text-white">$ current_projects --active</p>
          <p className="mt-2 text-cyan-400">&gt; AegisRange</p>
          <p className="text-cyan-400">&gt; AI Pentest Manager</p>
        </div>

        <div>
          <p className="text-white">$ focus --current</p>
          <p className="mt-2 text-slate-400">&gt; AI Security</p>
          <p className="text-slate-400">&gt; Cloud Security</p>
          <p className="text-slate-400">&gt; Detection Engineering</p>
        </div>

        <div>
          <p className="text-white">$ status</p>
          <p className="mt-2 text-emerald-400">
            &gt; ONLINE ● <span className="text-slate-500">[3+ yrs]</span>
          </p>
        </div>

        <p className="animate-pulse text-cyan-400">$ _</p>
      </div>
    </div>
  );
}
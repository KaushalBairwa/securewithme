import { profile } from "@/data/profile";
import HeroButtons from "./HeroButtons";
import HeroSocial from "./HeroSocial";

export default function HeroContent() {
  return (
    <div>
      <p className="mb-5 font-mono text-sm text-emerald-400">
        &gt; whoami
      </p>

      <h1 className="max-w-3xl text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
        KAUSHAL KUMAR
        <span className="block text-cyan-400">BAIRWA</span>
      </h1>

      <p className="mt-6 text-xl font-semibold text-slate-200">
        Cloud & AI Security Engineer
      </p>

      <p className="mt-2 text-slate-400">
        Researcher • Consultant • Founder @ Secureandcode
      </p>

      <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
        I break cloud environments before attackers do — then build the
        detections that catch them next time.
      </p>

      <p className="mt-4 max-w-2xl leading-7 text-slate-500">
        {profile.description}
      </p>

      <HeroButtons />
      <HeroSocial />
    </div>
  );
}
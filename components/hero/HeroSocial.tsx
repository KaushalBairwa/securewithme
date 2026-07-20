import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { profile } from "@/data/profile";

export default function HeroSocial() {
  const linkClass =
    "flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-400";

  return (
    <div className="mt-9 flex flex-wrap gap-6">
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        className={linkClass}
      >
        <FaGithub />
        GitHub
      </a>

      <a
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer"
        className={linkClass}
      >
        <FaLinkedinIn />
        LinkedIn
      </a>

      <a href={`mailto:${profile.email}`} className={linkClass}>
        <MdEmail />
        Email
      </a>
    </div>
  );
}
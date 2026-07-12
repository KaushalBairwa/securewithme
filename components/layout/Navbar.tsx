"use client";

import { useEffect, useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`mx-auto flex w-[94%] max-w-7xl items-center justify-between rounded-2xl border px-5 py-3 backdrop-blur-xl transition-all duration-300 lg:px-7 ${
          scrolled
            ? "border-cyan-400/20 bg-black/85 shadow-[0_10px_40px_rgba(0,229,255,0.08)]"
            : "border-white/10 bg-black/55"
        }`}
      >
        <a href="#home" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 text-black">
            <ShieldCheck size={24} />
          </div>

          <div>
            <p className="font-bold text-white">SecureWithMe</p>
            <p className="text-xs text-slate-400">
              Cloud & AI Security
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-slate-300 transition hover:text-cyan-400"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-xl border border-cyan-400/70 px-5 py-2.5 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-black lg:block"
        >
          Book Consultation
        </a>

        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-white/10 p-2 text-white lg:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="mx-auto mt-2 w-[94%] rounded-2xl border border-cyan-400/20 bg-black/95 p-5 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/5 pb-3 text-slate-300 transition hover:text-cyan-400"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl bg-cyan-400 px-5 py-3 text-center font-semibold text-black"
            >
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
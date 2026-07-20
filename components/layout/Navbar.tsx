"use client";

import { useEffect, useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Services", href: "#services" },
  { label: "Lab", href: "#lab" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-white/[0.08] bg-[#05070b]/90 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "border-white/[0.06] bg-[#05070b]/75 backdrop-blur-lg"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href="#home"
          onClick={closeMenu}
          className="group flex items-center gap-3"
          aria-label="SecureWithMe homepage"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/[0.07] font-mono text-sm font-bold text-cyan-400 transition duration-300 group-hover:border-cyan-400/60 group-hover:bg-cyan-400/[0.12] group-hover:shadow-[0_0_25px_rgba(0,229,255,0.14)]">
            &lt;/&gt;
          </div>

          <div>
            <p className="text-sm font-bold tracking-wide text-white sm:text-base">
              SecureWithMe
            </p>

            <p className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:block">
              Cloud • AI • Cybersecurity
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition duration-200 hover:bg-white/[0.04] hover:text-cyan-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden rounded-lg border border-cyan-400/50 bg-cyan-400/[0.08] px-4 py-2.5 text-sm font-semibold text-cyan-300 transition duration-300 hover:bg-cyan-400 hover:text-[#05070b] hover:shadow-[0_0_28px_rgba(0,229,255,0.2)] xl:inline-flex"
        >
          Book Consultation
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white transition hover:border-cyan-400/40 hover:text-cyan-400 xl:hidden"
        >
          <span className="relative block h-5 w-5">
            <span
              className={`absolute left-0 top-1 block h-px w-5 bg-current transition duration-300 ${
                isMenuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />

            <span
              className={`absolute left-0 top-[10px] block h-px w-5 bg-current transition duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`absolute bottom-1 left-0 block h-px w-5 bg-current transition duration-300 ${
                isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-white/[0.06] bg-[#07090d]/98 backdrop-blur-xl transition-all duration-300 xl:hidden ${
          isMenuOpen
            ? "max-h-[700px] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6">
          <div className="grid gap-1 sm:grid-cols-2">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="group flex items-center justify-between rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-cyan-400"
              >
                <span>{link.label}</span>

                <span className="font-mono text-xs text-slate-600 transition group-hover:text-cyan-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-[#05070b] transition hover:bg-cyan-300"
          >
            Book Consultation
          </a>
        </div>
      </div>
    </header>
  );
}
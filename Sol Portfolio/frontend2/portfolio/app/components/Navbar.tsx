"use client";
import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#portfolio", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-16 py-6 border-b border-gold/[0.08] bg-ink/85 backdrop-blur-md">
      
      {/* Logo */}
      <Link
        href="#hero"
        className="font-serif text-2xl font-light tracking-[0.15em] text-gold"
      >
        Sol
      </Link>

      {/* Tagline */}
      <span className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-fog-2 hidden md:block">
        Champ to Champ
      </span>

      {/* Navigation Links */}
      <ul className="flex gap-8 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="nav-link font-mono text-[0.65rem] tracking-[0.2em] uppercase text-fog hover:text-gold"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-16 pt-32 pb-16 overflow-hidden"
    >
      {/* Decorative horizontal lines */}
      <div className="absolute left-0 right-0 top-[30%] h-px bg-gold-dim opacity-15 pointer-events-none" />
      <div className="absolute left-0 right-0 top-[70%] h-px bg-gold-dim opacity-15 pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-6xl mx-auto items-center">
        
        {/* Left */}
        <div>
          <div
            className="flex items-center gap-3 font-mono text-[0.6rem] tracking-[0.35em] uppercase text-gold mb-6"
            style={{ animation: "fadeUp 0.8s 0.2s both" }}
          >
            <span className="inline-block w-8 h-px bg-gold" />
            Full Stack Developer
          </div>

          <h1
            className="font-serif text-[clamp(4.5rem,8vw,7rem)] font-light leading-[0.9] tracking-tight text-off mb-4"
            style={{ animation: "fadeUp 0.8s 0.35s both" }}
          >
            Sol
            <br />
            <em className="italic text-gold">Champ.</em>
          </h1>

          <p
            className="font-mono text-[0.75rem] tracking-[0.2em] uppercase text-fog-2 mb-10"
            style={{ animation: "fadeUp 0.8s 0.5s both" }}
          >
            Website Performance · End-to-End Delivery
          </p>

          <div
            className="flex gap-6 items-center"
            style={{ animation: "fadeUp 0.8s 0.65s both" }}
          >
            <Link
              href="#contact"
              className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-ink bg-gold px-8 py-3.5 hover:bg-gold-light transition-colors"
            >
              Let&apos;s connect
            </Link>

            <Link
              href="#about"
              className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-fog hover:text-gold transition-colors"
            >
              Learn more →
            </Link>
          </div>
        </div>

        {/* Right */}
        <div
          className="flex justify-end"
          style={{ animation: "fadeIn 1s 0.6s both" }}
        >
          <blockquote className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light italic leading-snug text-fog text-right border-r-2 border-gold pr-8">
            From{" "}
            <strong className="not-italic font-semibold text-gold">
              champ.
            </strong>
            <br />
            To{" "}
            <strong className="not-italic font-semibold text-gold">
              champ.
            </strong>
            <br />
            Every time.
          </blockquote>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: "fadeIn 1s 1.2s both" }}
      >
        <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-fog-2">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent scroll-line" />
      </div>
    </section>
  );
}
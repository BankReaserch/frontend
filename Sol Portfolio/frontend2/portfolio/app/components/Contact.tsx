"use client";

import { useReveal } from "../hooks/useReveal";

export default function Contact() {
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal<HTMLAnchorElement>();
  const r4 = useReveal();

  return (
    <section
      id="contact"
      className="px-16 py-24 max-w-6xl mx-auto text-center"
    >
      <div className="max-w-xl mx-auto">
        <div ref={r1} className="reveal">
          <p className="flex items-center justify-center gap-3 font-mono text-[0.6rem] tracking-[0.35em] uppercase text-gold mb-3">
            <span className="inline-block w-8 h-px bg-gold" />
            Get in Touch
          </p>

          <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-tight text-off mb-10">
            Let&apos;s build
            <br />
            <em className="italic text-gold">something great.</em>
          </h2>
        </div>

        <p
          ref={r2}
          className="reveal font-serif text-xl italic text-fog leading-relaxed mb-10"
        >
          If you&apos;re looking for a dependable developer who combines
          technical skill, academic rigor, and real-world accountability —
          I&apos;d be glad to connect.
        </p>

        <a
          ref={r3}
          href="mailto:sol@champ.now"
          className="reveal font-serif text-[clamp(1.8rem,3.5vw,2.5rem)] font-light text-gold hover:text-gold-light transition-colors block mb-10"
        >
          sol@champ.now
        </a>

        <p
          ref={r4}
          className="reveal font-mono text-[0.6rem] tracking-[0.2em] uppercase text-fog-2"
        >
          U.S.-based · Available worldwide · Direct communication guaranteed
        </p>
      </div>
    </section>
  );
}
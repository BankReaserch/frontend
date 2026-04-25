"use client";
import { useReveal } from "../hooks/useReveal";

const services = [
  {
    num: "01",
    name: "Web Development",
    desc: "Full-stack websites and web apps built from the ground up — fast, reliable, and production-ready from day one.",
  },
  {
    num: "02",
    name: "Performance Optimization",
    desc: "Audits, speed improvements, and technical fixes that make your existing site dramatically faster and more reliable.",
  },
  {
    num: "03",
    name: "Ongoing Maintenance",
    desc: "Continuous support, updates, and monitoring — so your site stays healthy and you stay focused on your business.",
  },
  {
    num: "04",
    name: "UI / UX Design",
    desc: "Thoughtful, user-centered design in Figma — from wireframes and prototypes to polished, implementation-ready specs.",
  },
  {
    num: "05",
    name: "Automation & ML Integration",
    desc: "Workflow automation and machine learning integrations that save time and unlock new capabilities in your product.",
  },
];

function ServiceItem({ num, name, desc }: { num: string; name: string; desc: string }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal group grid grid-cols-[3rem_1fr_auto] gap-8 items-start py-10 border-b border-gold/10 last:border-none"
    >
      <span className="font-serif text-[2rem] font-light text-gold/20 leading-none group-hover:text-gold transition-colors duration-300">
        {num}
      </span>
      <div>
        <div className="font-serif text-[1.6rem] font-light text-fog group-hover:text-off transition-colors duration-300 mb-1">
          {name}
        </div>
        <div className="text-[0.85rem] text-fog-2 leading-relaxed max-w-md">{desc}</div>
      </div>
      <span className="text-xl text-gold/20 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300 mt-1">
        →
      </span>
    </div>
  );
}

export default function Services() {
  const r1 = useReveal();

  return (
    <section id="portfolio" className="px-16 py-24 max-w-6xl mx-auto">
      <div ref={r1} className="reveal mb-12">
        <p className="flex items-center gap-3 font-mono text-[0.6rem] tracking-[0.35em] uppercase text-gold mb-3">
          <span className="inline-block w-8 h-px bg-gold" />
          What I Do
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-tight text-off">
          Services
          <br />
          <em className="italic text-gold">delivered.</em>
        </h2>
      </div>

      <div>
        {services.map((s) => (
          <ServiceItem key={s.num} {...s} />
        ))}
      </div>
    </section>
  );
}
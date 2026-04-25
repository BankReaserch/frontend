"use client";
import { useReveal } from "../hooks/useReveal";

const categories = [
  {
    name: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap", "CSS3"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Flask", "FastAPI", "Spring Boot", ".NET"],
  },
  {
    name: "Databases",
    items: ["MySQL", "MongoDB", "PostgreSQL"],
  },
  {
    name: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
  },
  {
    name: "ML & Automation",
    items: ["ML Fundamentals", "Data Processing", "Model Integration", "Workflow Automation"],
  },
  {
    name: "Security & Design",
    items: ["OWASP Top 10", "Secure API Design", "Auth Hardening", "Figma (UI/UX)"],
  },
];

export default function Skills() {
  const r1 = useReveal();
  const r2 = useReveal();

  return (
    <section id="skills" className="px-16 py-24 max-w-6xl mx-auto">
      <div ref={r1} className="reveal mb-12">
        <p className="flex items-center gap-3 font-mono text-[0.6rem] tracking-[0.35em] uppercase text-gold mb-3">
          <span className="inline-block w-8 h-px bg-gold" />
          Skills &amp; Technologies
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-tight text-off">
          Built to
          <br />
          <em className="italic text-gold">perform.</em>
        </h2>
      </div>

      <div
        ref={r2}
        className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-gold/[0.12]"
      >
        {categories.map((cat, i) => (
          <div
            key={cat.name}
            className={[
              "skill-card p-10",
              "border-gold/[0.12]",
              i % 3 !== 2 ? "lg:border-r" : "",
              i % 2 !== 1 ? "sm:border-r lg:border-r-0" : "",
              i < categories.length - (categories.length % 3 || 3) ? "border-b" : "",
            ].join(" ")}
          >
            <p className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-gold mb-5">
              {cat.name}
            </p>
            <ul className="space-y-2">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-[0.9rem] text-fog group-hover:text-off transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-gold-dim flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
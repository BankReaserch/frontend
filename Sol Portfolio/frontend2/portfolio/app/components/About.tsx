"use client";
import { useReveal } from "../hooks/useReveal";

const stats = [
  { number: "B.S.", desc: "Bachelor's, with honors" },
  { number: "M.S.", desc: "Master's, with honors" },
  { number: "1:1",  desc: "Direct communication always" },
  { number: "E2E",  desc: "End-to-end project ownership" },
];

export default function About() {
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal();

  return (
    <section
      id="about"
      className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start px-16 py-24 max-w-6xl mx-auto"
    >
      {/* Left meta */}
      <div>
        <div ref={r1} className="reveal">
          <p className="flex items-center gap-3 font-mono text-[0.6rem] tracking-[0.35em] uppercase text-gold mb-3">
            <span className="inline-block w-8 h-px bg-gold" />
            About
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-tight text-off">
            Developer.
            <br />
            <em className="italic text-gold">By design.</em>
          </h2>
        </div>

        <div ref={r2} className="reveal grid grid-cols-2 gap-6 mt-12">
          {stats.map((s) => (
            <div key={s.number} className="border-t border-gold/20 pt-4">
              <div className="font-serif text-4xl font-light text-gold leading-none mb-1">
                {s.number}
              </div>
              <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-fog-2">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right body */}
      <div ref={r3} className="reveal text-[1.05rem] leading-[1.9] text-fog space-y-5">
        <p>
          Hi, I&apos;m <strong className="text-off font-normal">Sol</strong> — a U.S.-based web
          developer focused on building, fixing, and maintaining reliable websites and apps.
        </p>
        <p>
          I personally manage every project end to end, supported by a{" "}
          <strong className="text-off font-normal">small, highly reliable production team</strong>{" "}
          with whom I&apos;ve delivered many successful projects. You&apos;ll always communicate
          directly with me.
        </p>
        <p>
          I hold both a{" "}
          <strong className="text-off font-normal">Bachelor&apos;s and Master&apos;s degree</strong>,
          earned with top honors from leading institutions. My academic background provides a strong
          analytical foundation combined with practical problem-solving.
        </p>
        <p>
          I come from a{" "}
          <strong className="text-off font-normal">globally diverse background</strong> — born to
          immigrant parents from Europe and South America, raised on the U.S. West Coast and Canada,
          and later pursuing advanced studies in the Middle East before settling on the U.S. East
          Coast.
        </p>
        <p>
          Outside of work, I&apos;m a devoted family man — and I bring the same care,
          responsibility, and long-term mindset to every client relationship.
        </p>
      </div>
    </section>
  );
}
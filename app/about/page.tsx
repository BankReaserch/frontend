"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import QuoteCard from "@/components/utils/card/QuoteCard";
import Link from "next/link";

const STATS = [
  { value: "300+", label: "Banks Listed" },
  { value: "1,500+", label: "Hours Researched" },
  { value: "10+", label: "Poskim Guiding" },
  { value: "2,000+", label: "People Served" },
];

const VALUES = [
  {
    title: "Halachic Accuracy",
    description:
      "Every ruling and rating on our platform is grounded in the responsa of leading poskim. We do not speculate — we research, verify, and source.",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
      </svg>
    ),
  },
  {
    title: "Practical Guidance",
    description:
      "Abstract halacha meets real financial life. We translate complex laws into actionable guidance for banks, loans, investments, and everyday transactions.",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Community Access",
    description:
      "Financial halacha should not be a luxury. Our resources are designed to reach every Jew — from the scholar to the layperson — freely and clearly.",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Continuous Research",
    description:
      "Financial products evolve constantly. Our team continuously reviews new instruments, updated bank policies, and emerging halachic questions to keep our directory current.",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
];

// ── Team hierarchy ──
// Ordered top-down: Sponsors → Leadership → Rabbinical Guidance → operating departments.
const SPONSORS = [
  "Harav Yitzchok Zilberstein",
  "Harav Shriel Rosenberg",
  "Harav Menachem Mendel Shafran",
  "Harav Naftali Nusbaum",
  "Harav Shamai Kehas Gross",
  "Harav Shlomo Zafrani",
];

const LEADERSHIP = {
  role: "Founder & Director",
  name: "Rabbi Yaakov Yitzchok Jacob",
};

const RABBINICAL_GUIDANCE = [
  { role: "General Guidance", name: "Harav Pinchos Vind" },
  { role: "Bank Research", name: "Harav Ari Marberger" },
];

const DEPARTMENTS = [
  {
    title: "Bais Hora'ah",
    members: [
      "Rabbi Baruch Moses",
      "Rabbi Shmuel Poltman",
      "Rabbi Yechiel Blum",
      "Rabbi Moskowitz",
      "Rabbi Ginsberg",
      "Rabbi Elenbogen",
      "Rabbi Tzvi Smoke",
      "Rabbi Yaakov Yitzchok Jacob",
      "Rabbi Yehuda Framowitz",
      "Rabbi Lipshitz",
    ],
  },
  {
    title: "Research Team",
    members: ["Rabbi Aharon Pollack", "Rabbi Yerucham Man", "Rabbi Dovid Barasch"],
  },
  {
    title: "Genealogy Department",
    members: ["Rabbi Aharon Hamaoui"],
  },
  {
    title: "Committee Members",
    members: [
      "R’ Yosef Shneur Posen",
      "R’ Shmuel Chaim Fink",
      "R’ Yisroel Dovid Teren",
      "R’ Baruch Dovid Moses",
    ],
  },
  {
    title: "Educational Program",
    members: [
      "Rabbi Bernath",
      "Rabbi Michoel Shmesh",
      "Rabbi Moshe Lenchis",
      "Rabbi Moskat",
      "Rabbi Nison Moses",
      "Rabbi Shmuel Poltman",
      "Rabbi Shabsai Zebrouski",
    ],
  },
];

function getInitials(name: string) {
  const cleaned = name
    .replace(/^R[’']\s*/i, "")
    .replace(/^Rabbi\s+/i, "")
    .replace(/^Harav\s+/i, "")
    .replace(/^Dayan\s+/i, "");
  const parts = cleaned.split(" ").filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const POSKIM = [
  { name: "Harav Y. Feinstein", institution: "Yeshiva of Staten Island" },
  { name: "Harav S. Kamenetsky", institution: "Philadelphia Yeshiva" },
  { name: "Harav A. Weiss", institution: "Yeshivat Chovevei Torah" },
  { name: "Dayan C. Feldman", institution: "Manchester Beis Din" },
];

const MILESTONES = [
  { year: "2011", event: "Opened the first branch in Israel" },
  { year: "2015", event: "Ribis.org founded with an initial directory of 50 banks" },
  { year: "2017", event: "Launched the Sha'alah submission system with 3 resident poskim" },
  { year: "2019", event: "Reached 1,000 registered community members" },
  { year: "2021", event: "Audio shiur library launched — over 120 hours of content" },
  { year: "2023", event: "Bank directory expanded to 3,000+ US financial institutions" },
  { year: "2024", event: "Expanded to 80 branches across Israel" },
  { year: "2025", event: "Kosher Brokers and Investments departments launched" },
  { year: "2026", event: "Launched ribis.com website to widespread acclaim." },
];

export default function page() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-[#0d1b2a] relative overflow-hidden pt-32">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute right-0 top-0 bottom-0 flex items-center pr-16 select-none pointer-events-none">
          <span className="text-[220px] font-serif text-[#c9a84c] opacity-[0.04] leading-none">ר</span>
        </div>
        <div className="relative z-10 px-6 lg:px-16 py-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                About Ribis.org
              </p>

              <h1 className="text-white font-serif text-5xl lg:text-6xl leading-tight mb-6">
                Standing at the
                <br />
                intersection of{" "}
                <span className="text-[#c9a84c]">Torah</span>
                <br />
                and finance.
              </h1>

              <p className="text-[#8a9bb0] text-base leading-relaxed max-w-xl">
                Ribis.org was founded to give every Jew — whether a businessman,
                homeowner, or student — the halachic clarity they need to navigate
                modern financial life with integrity.
              </p>
            </div>

            {/* Right Quote */}
            <div className="hidden lg:flex justify-end">
              <div className="w-full max-w-md">
                <QuoteCard
                  description="ומי האיש החפץ חיים ולקום בתחיית המתים ישאל פי חכם בעשותו הלואה כזו וימלט נפשו הרע."
                  name="Ya'aros Devash"
                  backgroundColor="bg-[#132234]"
                  textColor="text-white"
                  nameColor="text-[#c9a84c]"
                  border="border-[#c9a84c]/20"
                  borderColor="border-l-[#c9a84c]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-white border-y border-[#e5ddd0]">
        <div className="px-6 lg:px-16 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="text-[#c9a84c] text-3xl font-bold mb-1">{s.value}</p>
              <p className="text-[#8a9bb0] text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="px-6 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-semibold mb-4">Our Mission</p>
            <h2 className="text-[#0d1b2a] font-serif text-4xl leading-tight mb-6">
              Bringing halachic integrity to everyday financial dealings.
            </h2>
            <p className="text-[#6b5e4e] text-base leading-relaxed mb-5">
              The prohibition of ribis is one of the most consequential — and misunderstood — areas of halacha in modern life. Banks pay interest. Mortgages accrue interest. Credit cards, investment accounts, and business loans all raise ribis questions that most Jews have never been equipped to answer.
            </p>
            <p className="text-[#6b5e4e] text-base leading-relaxed mb-8">
              Ribis.org exists to close that gap. We combine rigorous Torah scholarship with practical research, so that halachic guidance is never more than a search away.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/bank-directory" className="bg-[#c9a84c] text-[#0d1b2a] font-bold text-sm px-6 py-3 rounded-lg hover:bg-[#d4b567] transition">
                Explore Bank Directory
              </Link>
              <Link href="/ask" className="border border-[#0d1b2a] text-[#0d1b2a] font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#0d1b2a] hover:text-white transition">
                Ask a Sha'alah →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-white border-y border-[#e5ddd0] px-6 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-semibold mb-3">What we stand for</p>
            <h2 className="text-[#0d1b2a] font-serif text-4xl">Our values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="border border-[#e5ddd0] rounded-xl p-6 hover:border-[#c9a84c]/40 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-[#f5f0e8] flex items-center justify-center text-[#c9a84c] mb-5 group-hover:bg-[#0d1b2a] transition-colors">
                  {v.icon}
                </div>
                <h3 className="text-[#0d1b2a] font-serif text-lg mb-3">{v.title}</h3>
                <p className="text-[#6b5e4e] text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="px-6 lg:px-16 py-20 bg-[#0d1b2a] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <p className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-semibold mb-3">Our journey</p>
            <h2 className="text-white font-serif text-4xl">A decade of growth</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[68px] top-0 bottom-0 w-px bg-[#c9a84c]/20" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="flex items-start gap-8 group">
                  <div className="w-[68px] flex-shrink-0 text-right pr-6">
                    <span className="text-[#c9a84c] text-sm font-bold">{m.year}</span>
                  </div>
                  <div className="relative flex-1 pl-6">
                    <div className="absolute -left-[5px] top-[5px] w-2.5 h-2.5 rounded-full bg-[#0d1b2a] border-2 border-[#c9a84c]/50 group-hover:border-[#c9a84c] transition-colors" />
                    <p className="text-[#cbd5e1] text-sm leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="px-6 lg:px-16 py-20 bg-[#f5f0e8]" id="team">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-semibold mb-3">The people behind Ribis.org</p>
            <h2 className="text-[#0d1b2a] font-serif text-4xl mb-4">Our team</h2>
            <p className="text-[#8a9bb0] text-sm max-w-xl leading-relaxed">
              A dedicated hierarchy of Torah scholars, researchers, and administrators — spanning halachic guidance, research, and community education.
              
            </p>
          </div>
          {/* Leadership — top of hierarchy */}
          <div className="mb-8">
            <p className="text-[#8a9bb0] text-xs font-semibold tracking-[0.2em] uppercase mb-3 pl-1">Leadership</p>
            <div className="bg-[#0d1b2a] rounded-2xl px-8 py-7 flex items-center gap-5 relative overflow-hidden shadow-sm">
              <div className="absolute right-0 top-0 bottom-0 flex items-center pr-6 select-none pointer-events-none">
                <span className="text-[100px] font-serif text-[#c9a84c] opacity-[0.06] leading-none">ר</span>
              </div>
              <div className="w-16 h-16 rounded-xl bg-[#c9a84c] flex items-center justify-center flex-shrink-0 font-bold text-xl font-serif text-[#0d1b2a] relative z-10">
                {getInitials(LEADERSHIP.name)}
              </div>
              <div className="relative z-10">
                <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.2em] uppercase mb-1">{LEADERSHIP.role}</p>
                <p className="text-white font-serif text-2xl">{LEADERSHIP.name}</p>
              </div>
            </div>
          </div>
          {/* Rabbinical Guidance */}
          <div className="mb-10">
            <p className="text-[#8a9bb0] text-xs font-semibold tracking-[0.2em] uppercase mb-3 pl-1">Rabbinical Guidance</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RABBINICAL_GUIDANCE.map((r) => (
                <div key={r.name} className="bg-[#0d1b2a] rounded-2xl px-6 py-5 flex items-center gap-4 relative overflow-hidden shadow-sm">
                  <div className="absolute right-0 top-0 bottom-0 flex items-center pr-4 select-none pointer-events-none">
                    <span className="text-[70px] font-serif text-[#c9a84c] opacity-[0.06] leading-none">ר</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#c9a84c] flex items-center justify-center flex-shrink-0 font-bold text-sm font-serif text-[#0d1b2a] relative z-10">
                    {getInitials(r.name)}
                  </div>
                  <div className="relative z-10">
                    <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.2em] uppercase mb-1">{r.role}</p>
                    <p className="text-white font-serif text-base leading-snug">{r.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
      <div className="mb-10">
            <p className="text-[#8a9bb0] text-xs font-semibold tracking-[0.2em] uppercase mb-3 pl-1">Endorsed By</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SPONSORS.map((name) => (
                <div key={name} className="bg-[#0d1b2a] rounded-2xl px-6 py-5 flex items-center gap-4 relative overflow-hidden shadow-sm">
                  <div className="absolute right-0 top-0 bottom-0 flex items-center pr-4 select-none pointer-events-none">
                    <span className="text-[70px] font-serif text-[#c9a84c] opacity-[0.06] leading-none">ר</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#c9a84c] flex items-center justify-center flex-shrink-0 font-bold text-sm font-serif text-[#0d1b2a] relative z-10">
                    {getInitials(name)}
                  </div>
                  <p className="text-white font-serif text-base leading-snug relative z-10">{name}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Departments */}
          <div className="relative">
            <div className="absolute left-[13px] top-2 bottom-2 w-px bg-[#e5ddd0] hidden sm:block" />
            <div className="space-y-6">
              {DEPARTMENTS.map((dept) => (
                <div key={dept.title} className="relative sm:pl-10">
                  <div className="absolute left-0 top-6 w-[27px] h-[27px] rounded-full bg-[#f5f0e8] border-2 border-[#c9a84c]/50 hidden sm:flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />
                  </div>
                  <div className="bg-white border border-[#e5ddd0] rounded-xl p-6 hover:border-[#c9a84c]/40 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[#0d1b2a] font-serif text-lg">{dept.title}</h3>
                      <span className="text-[#8a9bb0] text-[11px] font-semibold uppercase tracking-wide">
                        {dept.members.length} {dept.members.length === 1 ? "member" : "members"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {dept.members.map((name) => (
                        <span
                          key={name}
                          className="inline-flex items-center gap-2 bg-[#f5f0e8] border border-[#e5ddd0] rounded-full pl-1.5 pr-4 py-1.5 text-sm text-[#3c3226] hover:border-[#c9a84c]/50 transition-colors"
                        >
                          <span className="w-6 h-6 rounded-full bg-[#1a2e42] text-[#c9a84c] flex items-center justify-center text-[10px] font-bold font-serif flex-shrink-0">
                            {getInitials(name)}
                          </span>
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer/>
     
    </div>
  );
}
"use client";

import Link from "next/link";

const STATS = [
  { value: "3000+", label: "USA Banks Researched" },
  { value: "2000+", label: "People Serviced" },
  { value: "1000+", label: "Hours of Research" },
  { value: "10", label: "Poskim Available" },
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

const TEAM = [
  {
    initials: "RY",
    name: "Rabbi Yosef Greenfeld",
    title: "Founder & Rosh HaKollel",
    department: "Halachic Authority",
    bio: "Founding posek and visionary behind Ribis.org. Over 20 years of experience in financial halacha, with extensive responsa published in leading Torah journals.",
    color: "bg-[#1a2e42] text-[#c9a84c]",
  },
  {
    initials: "DM",
    name: "Dayan Moshe Eisenstein",
    title: "Senior Posek",
    department: "Halachic Authority",
    bio: "Trained under leading Dayonim in Eretz Yisrael and America. Specializes in corporate and real-estate ribis questions.",
    color: "bg-[#1a2e42] text-[#c9a84c]",
  },
  {
    initials: "AS",
    name: "Avigdor Schwartz",
    title: "Director of Research",
    department: "Research",
    bio: "Leads the bank directory research team. Former compliance officer with deep expertise in US financial regulation and halachic due diligence.",
    color: "bg-[#f5f0e8] text-[#6b3a1a]",
  },
  {
    initials: "CL",
    name: "Chana Lichtenstein",
    title: "Head of Education",
    department: "Education",
    bio: "Develops our shiur curriculum, bulletins, and community outreach programs. Previously taught at Bais Yaakov institutions for over a decade.",
    color: "bg-[#f5f0e8] text-[#6b3a1a]",
  },
  {
    initials: "NB",
    name: "Nachum Berger",
    title: "Technology Lead",
    department: "Technology",
    bio: "Architected the Ribis.org platform from the ground up. Passionate about making halachic resources accessible through thoughtful product design.",
    color: "bg-[#f5f0e8] text-[#6b3a1a]",
  },
  {
    initials: "RK",
    name: "Rabbi Pinchas Kohn",
    title: "Community Liaison",
    department: "Outreach",
    bio: "Bridges Ribis.org with kehillos across North America. Organizes speaking programs, community Q&A sessions, and askan training workshops.",
    color: "bg-[#1a2e42] text-[#c9a84c]",
  },
];

const POSKIM = [
  { name: "Harav Y. Feinstein", institution: "Yeshiva of Staten Island" },
  { name: "Harav S. Kamenetsky", institution: "Philadelphia Yeshiva" },
  { name: "Harav A. Weiss", institution: "Yeshivat Chovevei Torah" },
  { name: "Dayan C. Feldman", institution: "Manchester Beis Din" },
];

const MILESTONES = [
  { year: "2015", event: "Ribis.org founded with an initial directory of 50 banks" },
  { year: "2017", event: "Launched the Sha'alah submission system with 3 resident poskim" },
  { year: "2019", event: "Reached 1,000 registered community members" },
  { year: "2021", event: "Audio shiur library launched — over 120 hours of content" },
  { year: "2023", event: "Bank directory expanded to 3,000+ US financial institutions" },
  { year: "2025", event: "Kosher Brokers and Investments departments launched" },
];

export default function page() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">

      {/* ── Navbar ── */}
      <nav className="bg-[#0d1b2a] px-6 lg:px-16 flex items-center justify-between h-16 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#c9a84c] rounded-md flex items-center justify-center">
            <span className="text-[#0d1b2a] font-bold text-sm font-serif">ר</span>
          </div>
          <span className="text-white font-semibold tracking-wide text-sm">Ribis</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Services", "Education", "Shop", "Departments"].map((item) => (
            <Link key={item} href="#" className="text-[#8a9bb0] hover:text-white transition text-xs tracking-wide">
              {item}
            </Link>
          ))}
        </div>
        <button className="bg-[#c9a84c] text-[#0d1b2a] text-xs font-bold px-4 py-2 rounded-md hover:bg-[#d4b567] transition tracking-wide">
          CONTACT US
        </button>
      </nav>

      {/* ── Hero ── */}
      <section className="bg-[#0d1b2a] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* large decorative Hebrew letter */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center pr-16 select-none pointer-events-none">
          <span className="text-[220px] font-serif text-[#c9a84c] opacity-[0.04] leading-none">ר</span>
        </div>

        <div className="relative z-10 px-6 lg:px-16 py-20 max-w-3xl">
          <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-semibold mb-4">About Ribis.org</p>
          <h1 className="text-white font-serif text-5xl lg:text-6xl leading-tight mb-6">
            Standing at the<br />intersection of{" "}
            <em className="text-[#c9a84c] not-italic">Torah</em><br />and finance.
          </h1>
          <p className="text-[#8a9bb0] text-base leading-relaxed max-w-xl">
            Ribis.org was founded to give every Jew — whether a businessman, homeowner, or student — the halachic clarity they need to navigate modern financial life with integrity.
          </p>
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

          {/* Hebrew quote card */}
          <div className="bg-[#0d1b2a] rounded-2xl p-10 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative z-10">
              <div className="w-10 h-10 border border-[#c9a84c]/40 rounded-md flex items-center justify-center mb-8">
                <span className="text-[#c9a84c] font-serif text-lg">"</span>
              </div>
              <p className="text-white font-serif text-xl leading-relaxed text-right mb-6" dir="rtl">
                "ומי האיש החפץ חיים ולקום בתחיית המתים ישאל פי חכם בעשותו הלואה כזו וימלט נפשו הרע."
              </p>
              <p className="text-[#c9a84c] text-sm text-right">— יערות דבש, חלק ב דרוש ה</p>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-[#8a9bb0] text-sm leading-relaxed">
                  "Whoever desires life and to arise at the revival of the dead — let him ask a Torah scholar when making such a loan, and he will save his soul from evil."
                </p>
              </div>
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
            {/* vertical line */}
            <div className="absolute left-[68px] top-0 bottom-0 w-px bg-[#c9a84c]/20" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="flex items-start gap-8 group">
                  <div className="w-[68px] flex-shrink-0 text-right pr-6">
                    <span className="text-[#c9a84c] text-sm font-bold">{m.year}</span>
                  </div>
                  <div className="relative flex-1 pl-6">
                    {/* dot */}
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
      <section className="px-6 lg:px-16 py-20 bg-[#f5f0e8]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-semibold mb-3">The people behind Ribis.org</p>
            <h2 className="text-[#0d1b2a] font-serif text-4xl mb-4">Our team</h2>
            <p className="text-[#8a9bb0] text-sm max-w-xl leading-relaxed">
              A dedicated group of Torah scholars, researchers, educators, and technologists — united by a shared mission to make halachic financial guidance accessible to all.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-white border border-[#e5ddd0] rounded-xl p-6 hover:border-[#c9a84c]/40 transition-all">
                <div className="flex items-center gap-4 mb-5">
                  {/* Initials avatar — no photo */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-lg font-serif ${member.color}`}>
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-[#0d1b2a] font-serif text-base leading-snug">{member.name}</p>
                    <p className="text-[#c9a84c] text-xs font-semibold mt-0.5">{member.title}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="inline-block bg-[#f5f0e8] text-[#6b5e4e] text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-[#e5ddd0]">
                    {member.department}
                  </span>
                </div>
                <p className="text-[#6b5e4e] text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Poskim Board ── */}
      <section className="bg-white border-y border-[#e5ddd0] px-6 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-semibold mb-4">Halachic oversight</p>
              <h2 className="text-[#0d1b2a] font-serif text-4xl mb-5">Our Rabbinical Board</h2>
              <p className="text-[#6b5e4e] text-sm leading-relaxed">
                All halachic rulings, bank ratings, and educational content on Ribis.org are reviewed and endorsed by our Rabbinical Board — composed of leading poskim from across the Torah world.
              </p>
            </div>
            <div className="space-y-3">
              {POSKIM.map((p) => (
                <div key={p.name} className="flex items-center gap-5 p-4 border border-[#e5ddd0] rounded-xl hover:border-[#c9a84c]/40 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-[#0d1b2a] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#c9a84c] font-serif text-sm">
                      {p.name.split(" ").slice(-1)[0].charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-[#0d1b2a] text-sm font-semibold font-serif">{p.name}</p>
                    <p className="text-[#8a9bb0] text-xs">{p.institution}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-[#f5f0e8] text-[#6b5e4e] text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full">Posek</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0d1b2a] px-6 lg:px-16 py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-semibold mb-4">Join us</p>
          <h2 className="text-white font-serif text-4xl lg:text-5xl mb-5 leading-tight">
            Ready to bring halachic clarity to your finances?
          </h2>
          <p className="text-[#8a9bb0] text-sm mb-8 leading-relaxed">
            Browse our bank directory, submit a sha'alah, or explore our educational library — it's all free.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register" className="bg-[#c9a84c] text-[#0d1b2a] font-bold text-sm px-8 py-3.5 rounded-lg hover:bg-[#d4b567] transition">
              Create Free Account
            </Link>
            <Link href="/bank-directory" className="border border-white/20 text-white font-semibold text-sm px-8 py-3.5 rounded-lg hover:bg-white/10 transition">
              Explore Bank Directory →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0a1520] border-t border-white/8 px-6 lg:px-16 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#c9a84c] rounded-md flex items-center justify-center">
              <span className="text-[#0d1b2a] font-bold text-xs font-serif">ר</span>
            </div>
            <span className="text-white text-sm font-semibold">Ribis.org</span>
          </div>
          <p className="text-[#8a9bb0] text-xs">© 2025 Ribis.org. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <Link key={l} href="#" className="text-[#8a9bb0] hover:text-white text-xs transition">{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
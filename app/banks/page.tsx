"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  Search,
  Users,
  ChevronUp,
  ChevronDown,
  X,
  ExternalLink,
  ArrowRight,
  ZoomIn,
  Send
} from "lucide-react";
import { useState, useMemo } from "react";

/* ── Types ─────────────────────────────────────────── */
type Status = "mehudar" | "compliant" | "conditional" | "questionable" | "noncompliant" | "undetermined";

interface Bank {
  id: number;
  name: string;
  type: string;
  hq: string;
  assets: string;
  founded: string;
  status: Status;
  notes: string;
  summary: string;
  poskim: string[];
  website: string;
}

/* ── Config ─────────────────────────────────────────── */
const STATUS_CFG: Record<Status, { label: string; dot: string; badge: string; text: string }> = {
  mehudar: { label: "Mehudar", dot: "bg-emerald-500", badge: "bg-emerald-500/15 text-emerald-700", text: "text-emerald-700" },
  compliant: { label: "Compliant", dot: "bg-blue-500", badge: "bg-blue-500/15 text-blue-700", text: "text-blue-700" },
  conditional: { label: "Conditional", dot: "bg-amber-500", badge: "bg-amber-500/15 text-amber-700", text: "text-amber-700" },
  questionable: { label: "Questionable", dot: "bg-orange-500", badge: "bg-orange-500/15 text-orange-700", text: "text-orange-700" },
  noncompliant: { label: "Noncompliant", dot: "bg-red-500", badge: "bg-red-500/15 text-red-700", text: "text-red-700" },
  undetermined: { label: "Undetermined", dot: "bg-slate-400", badge: "bg-slate-400/15 text-slate-600", text: "text-slate-600" },
};

const STATUS_DESCRIPTIONS: Record<Status, string> = {
  mehudar: "No known Jewish ownership or leadership involvement.",
  compliant: "No Jewish ownership with material influence.",
  conditional: "Permitted only with a valid heter iska.",
  questionable: "Some information requires clarification.",
  noncompliant: "Halachically problematic.",
  undetermined: "Insufficient data to determine status.",
};

const POSKIM_MAP: Record<string, { name: string; bg: string; text: string }> = {
  YB: { name: 'Harav Yisroel Belsky zt"l', bg: "bg-emerald-500/20", text: "text-emerald-700" },
  MS: { name: 'Harav Moshe Shternbuch shlit"a', bg: "bg-[#c8a21a]/20", text: "text-[#a07d12]" },
  AM: { name: 'Harav Ari Marberger shlit"a', bg: "bg-blue-500/20", text: "text-blue-700" },
  SH: { name: 'Harav Shmuel Honigwachs shlit"a', bg: "bg-rose-500/20", text: "text-rose-700" },
};

const BANKS: Bank[] = [
  { id: 1, name: "MidFirst Bank", type: "Commercial Bank", hq: "Oklahoma City, OK", assets: "$36B", founded: "1911", status: "mehudar", poskim: ["YB", "MS"], website: "midfirstbank.com", notes: "No known Jewish ownership or leadership. Widely considered among the most preferred options in the frum community.", summary: "MidFirst Bank has been thoroughly researched and presents no ribis concerns related to Jewish ownership or control. Suitable for all standard banking needs without any conditions." },
  { id: 2, name: "BAWAG Group", type: "International Bank", hq: "Vienna, Austria", assets: "$60B", founded: "1922", status: "compliant", poskim: ["AM"], website: "bawaggroup.com", notes: "Publicly traded. No Jewish ownership with material halachic influence over interest-bearing decisions.", summary: "BAWAG Group is publicly traded and its ownership structure has been reviewed. No material Jewish ownership influence was identified. May be used without a heter iska for most standard transactions." },
  { id: 3, name: "Lending One", type: "Mortgage Lender", hq: "Boca Raton, FL", assets: "N/A", founded: "2014", status: "conditional", poskim: ["AM", "SH"], website: "lendingone.com", notes: "Requires a valid, properly executed heter iska for all interest-bearing transactions.", summary: "Lending One's ownership structure includes Jewish principals with material influence. All interest-bearing agreements must be conducted under a properly executed heter iska. Contact our office for a template." },
  { id: 4, name: "Flagstar Bank", type: "Commercial Bank", hq: "Hicksville, NY", assets: "$114B", founded: "1987", status: "questionable", poskim: ["MS"], website: "flagstar.com", notes: "Ownership and leadership structure requires further clarification. Consult a posek before transacting.", summary: "Flagstar Bank's ownership situation has elements that remain unclear. Pending further research, we classify this as Questionable. We advise consulting with a posek before entering into interest-bearing agreements." },
  { id: 5, name: "Bankwell Bank", type: "Commercial Bank", hq: "New Canaan, CT", assets: "$2.2B", founded: "2002", status: "noncompliant", poskim: ["YB", "AM"], website: "mybankwell.com", notes: "Jewish ownership with significant decision-making authority identified. Halachically problematic for interest-bearing transactions.", summary: "Bankwell Bank has been identified as having Jewish ownership with significant decision-making authority over interest policies. This makes interest-bearing transactions halachically problematic. A heter iska alone may not be sufficient — consult a posek." },
  { id: 6, name: "Onity Group", type: "Mortgage Servicer", hq: "Coppell, TX", assets: "N/A", founded: "2023", status: "undetermined", poskim: [], website: "onitygroup.com", notes: "Insufficient data currently available. Research is ongoing.", summary: "Onity Group (formerly Ocwen Financial) recently rebranded. Our research team is currently gathering information on the current ownership structure. We will update this listing when our review is complete." },
  { id: 7, name: "Ally Bank", type: "Online Bank", hq: "Sandy, UT", assets: "$196B", founded: "2009", status: "mehudar", poskim: ["AM"], website: "ally.com", notes: "Publicly traded. No known Jewish ownership or material leadership involvement.", summary: "Ally Bank is a publicly traded entity with no identified Jewish ownership or leadership involvement. Widely used in the frum community with no known halachic concerns for standard banking." },
  { id: 8, name: "Marcus by Goldman Sachs", type: "Online Bank", hq: "New York, NY", assets: "$29B", founded: "2016", status: "compliant", poskim: ["YB", "MS", "AM"], website: "marcus.com", notes: "Goldman Sachs is publicly traded. Jewish principals exist but no material halachic influence over retail banking decisions.", summary: "While Goldman Sachs has Jewish founders historically, the current public ownership structure and governance mean that no individual Jewish owner exercises material halachic influence over interest decisions in the retail banking division." },
  { id: 9, name: "Capital One", type: "Commercial Bank", hq: "McLean, VA", assets: "$481B", founded: "1994", status: "conditional", poskim: ["MS"], website: "capitalone.com", notes: "Certain ownership considerations require the use of a heter iska.", summary: "Capital One's ownership and leadership structure includes certain considerations that necessitate use of a heter iska for interest-bearing accounts. Consult with our office to ensure your agreement is properly structured." },
  { id: 10, name: "Chase Bank", type: "Commercial Bank", hq: "New York, NY", assets: "$3.9T", founded: "1799", status: "questionable", poskim: ["AM", "SH"], website: "chase.com", notes: "JPMorgan Chase leadership includes Jewish principals. Status is under ongoing review.", summary: "Chase Bank (JPMorgan Chase) is under ongoing review. Leadership includes Jewish principals with significant institutional authority. We recommend caution and consultation with a posek pending an updated ruling." },
  { id: 11, name: "Bank of America", type: "Commercial Bank", hq: "Charlotte, NC", assets: "$3.3T", founded: "1904", status: "compliant", poskim: ["YB", "AM"], website: "bankofamerica.com", notes: "Publicly traded. Ownership review complete — no material Jewish halachic influence identified.", summary: "Bank of America has been reviewed and classified as Compliant. The publicly traded ownership structure and leadership roster do not indicate Jewish ownership with material halachic influence on interest policy." },
  { id: 12, name: "TD Bank", type: "Commercial Bank", hq: "Cherry Hill, NJ", assets: "$397B", founded: "1852", status: "mehudar", poskim: ["MS"], website: "td.com", notes: "Canadian parent company (Toronto-Dominion Bank). No known Jewish ownership or material leadership involvement.", summary: "TD Bank's parent, Toronto-Dominion Bank, is a Canadian institution with no identified Jewish ownership or leadership with halachic significance. Well regarded in the community for standard banking." },
];

type SortKey = "name" | "type" | "status";

/* ── Status Badge ───────────────────────────────────── */
function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CFG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cfg.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

/* ── Main Page ──────────────────────────────────────── */
export default function BankDirectoryPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [selected, setSelected] = useState<Bank | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState(1);
  const [requestOpen, setRequestOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [requestForm, setRequestForm] = useState({
    bankName: "",
    location: "",
    email: "",
    notes: "",
  });

  const filtered = useMemo(() => {
    let data = BANKS.filter((b) => {
      const ms = filter === "all" || b.status === filter;
      const mq = b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.type.toLowerCase().includes(search.toLowerCase());
      return ms && mq;
    });
    data.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      return av < bv ? -sortDir : av > bv ? sortDir : 0;
    });
    return data;
  }, [search, filter, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => d * -1);
    else { setSortKey(key); setSortDir(1); }
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k ? (sortDir === 1 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />) : <span className="h-3 w-3 text-[10px]">↕</span>;
  const submitRequest = () => {
    if (!requestForm.bankName || !requestForm.email) return;

    // API call can go here later

    setSubmitted(true);
  };
  return (
    <>
      <Navbar />
      {/* ── REQUEST MODAL ───────────────────────────── */}
      {requestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#051933]/70 p-4">
          <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-[#e8e2d6] bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">

            {!submitted ? (
              <>
                {/* Header */}
                <div className="bg-[#051933] px-7 py-5 relative overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(135deg,#fff_1px,transparent_1px)] bg-[size:20px_20px]" />

                  <button
                    onClick={() => setRequestOpen(false)}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70 hover:bg-white/20 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <h3 className="relative font-serif text-2xl text-white mb-1">
                    Request a Bank
                  </h3>

                  <p className="relative text-[13px] leading-6 text-[#7a93ae] max-w-md">
                    Don’t see your bank listed? Submit the details below and our
                    research team will review and add it to the directory.
                  </p>
                </div>

                {/* Body */}
                <div className="px-7 py-6">

                  {/* Bank Name */}
                  <div className="mb-4">
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                      Bank Name
                    </label>

                    <input
                      type="text"
                      value={requestForm.bankName}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          bankName: e.target.value,
                        })
                      }
                      placeholder="e.g. First National Bank"
                      className="h-11 w-full rounded-xl border border-[#e8e2d6] bg-[#f8f5ef] px-4 text-[14px] text-[#0f172a] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#c8a21a] focus:bg-white"
                    />
                  </div>

                  {/* Location */}
                  <div className="mb-4">
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                      Location / Headquarters
                    </label>

                    <input
                      type="text"
                      value={requestForm.location}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          location: e.target.value,
                        })
                      }
                      placeholder="e.g. Chicago, IL"
                      className="h-11 w-full rounded-xl border border-[#e8e2d6] bg-[#f8f5ef] px-4 text-[14px] text-[#0f172a] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#c8a21a] focus:bg-white"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                      Your Email
                    </label>

                    <input
                      type="email"
                      value={requestForm.email}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          email: e.target.value,
                        })
                      }
                      placeholder="your@email.com"
                      className="h-11 w-full rounded-xl border border-[#e8e2d6] bg-[#f8f5ef] px-4 text-[14px] text-[#0f172a] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#c8a21a] focus:bg-white"
                    />
                  </div>

                  {/* Notes */}
                  <div className="mb-6">
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                      Additional Context
                    </label>

                    <textarea
                      rows={4}
                      value={requestForm.notes}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          notes: e.target.value,
                        })
                      }
                      placeholder="Any ownership details, account types, or context that may help our research..."
                      className="w-full rounded-xl border border-[#e8e2d6] bg-[#f8f5ef] px-4 py-3 text-[14px] text-[#0f172a] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#c8a21a] focus:bg-white resize-none"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex w-full items-center gap-3">
                    <button
                      onClick={() => setRequestOpen(false)}
                      className="flex-1 rounded-2xl border border-[#e8e2d6] bg-white px-5 py-4 text-sm font-semibold text-[#64748b] transition-all duration-200 hover:bg-[#faf7f2] hover:border-[#d8cfbf]"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={submitRequest}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#c8a21a] px-5 py-4 text-sm font-semibold text-[#051933] shadow-sm transition-all duration-200 hover:bg-[#d7b52f] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 cursor-pointer"
                    >
                      Submit Request
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="px-8 py-10 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#c8a21a]/15">
                  <ShieldCheck className="h-7 w-7 text-[#c8a21a]" />
                </div>

                <h3 className="font-serif text-2xl text-[#051933] mb-2">
                  Request Submitted
                </h3>

                <p className="mx-auto max-w-md text-[14px] leading-7 text-[#64748b] mb-6">
                  Thank you! Our research team will review{" "}
                  <span className="font-semibold text-[#051933]">
                    {requestForm.bankName}
                  </span>{" "}
                  and update the directory accordingly.
                </p>

                <button
                  onClick={() => {
                    setRequestOpen(false);
                    setSubmitted(false);

                    setRequestForm({
                      bankName: "",
                      location: "",
                      email: "",
                      notes: "",
                    });
                  }}
                  className="w-full rounded-xl bg-[#c8a21a] py-3 text-[13px] font-semibold text-[#051933] transition-all hover:bg-[#d7b52f]"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <main className="min-h-screen bg-[#f5f1ea] overflow-x-hidden">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative bg-[#051933] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[linear-gradient(135deg,#ffffff_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-10 md:pt-32">
            <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a21a] mb-5">
                  Services · Bank Directory
                </p>
                <h1 className="font-serif text-5xl md:text-6xl leading-[1.08] text-white mb-6">
                  Know Your Bank's{" "}
                  <em className="italic text-[#c8a21a]">Kashrus</em> Status
                </h1>
                <p className="text-[15px] leading-8 text-[#94a3b8] max-w-xl mb-4">
                  Ribis.org conducts comprehensive, in-depth research to deliver clear,
                  authoritative guidance on the kashrus status of financial institutions.
                </p>
                <p className="text-[13px] leading-7 text-[#64748b] max-w-xl">
                  The Kosher Bank Directory is based on the rulings of{" "}
                  <span className="text-[#c8a21a]">Harav Yisroel Belsky zt"l</span>,{" "}
                  <span className="text-[#c8a21a]">Harav Moshe Shternbuch shlit"a</span>,{" "}
                  <span className="text-[#c8a21a]">Harav Ari Marberger shlit"a</span>,
                  and other Rabbanim who are experts in this field.
                </p>
              </div>

              {/* Status Legend */}
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                <div className="px-5 py-3.5 border-b border-white/8">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#c8a21a]">Kashrus Status Guide</p>
                </div>
                {(Object.entries(STATUS_CFG) as [Status, typeof STATUS_CFG[Status]][]).map(([key, cfg]) => (
                  <div key={key} className="flex items-start gap-3 px-5 py-3 border-b border-white/5 last:border-none">
                    <span className={`mt-1.5 h-2 w-2 min-w-2 rounded-full ${cfg.dot}`} />
                    <div>
                      <p className="text-[13px] text-white/90 mb-0.5">{cfg.label}</p>
                      <p className="text-[11px] text-[#4e6070] leading-snug">{STATUS_DESCRIPTIONS[key]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="border-t border-white/10 mt-10">
            <div className="mx-auto max-w-6xl px-6 py-5 grid grid-cols-3 md:grid-cols-6 divide-x divide-white/10">
              {[
                { n: "3000+", l: "Banks Listed" },
                { n: "1000+", l: "Hours Researched" },
                { n: "10", l: "Poskim Guiding" },
                { n: "2000+", l: "People Served" },
                { n: "50+", l: "States Covered" },
                { n: "4", l: "Lead Poskim" },
              ].map((s) => (
                <div key={s.l} className="px-4 text-center first:pl-0 last:pr-0">
                  <p className="font-serif text-2xl text-[#d0ab24]">{s.n}</p>
                  <p className="text-[8px] uppercase tracking-widest text-[#4e6070] mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY SECTION ──────────────────────────────────── */}
        <section className="py-16 bg-[#f9f6f0]">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a21a] mb-10">
              Why Choose the Kosher Bank Directory?
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { Icon: ShieldCheck, title: "Reliable Halachic Oversight", desc: "All listings and content are guided by leading Rabbanim and poskim, ensuring accuracy and Torah-based standards." },
                { Icon: Search, title: "In-Depth Financial Research", desc: "We analyze ownership structures, decision-making authority, and ribis implications of banks and financial institutions." },
                { Icon: Users, title: "Community-Driven Insight", desc: "We welcome input from the public, helping build a transparent and continually evolving knowledge base." },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-7 border border-[#e8e2d6]">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#051933]">
                    <Icon className="h-5 w-5 text-[#d0ab24]" />
                  </div>
                  <h3 className="font-serif text-xl text-[#051933] mb-3">{title}</h3>
                  <p className="text-[13px] leading-7 text-[#64748b]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DIRECTORY ──────────────────────────────────────── */}
        <section className="py-14 pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a21a] mb-3">
              Search the Directory
            </p>
            <h2 className="font-serif text-4xl text-[#051933] mb-8">
              Kosher Bank <em className="italic text-[#c8a21a]">Directory</em>
            </h2>

            {/* Search */}
            <div className="relative mb-5 max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
              <input
                type="text"
                placeholder="Search by bank name or type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-2xl border border-[#e8e2d6] bg-white pl-11 pr-4 text-[14px] text-[#0f172a] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#d0ab24] focus:ring-4 focus:ring-[#d0ab24]/10"
              />
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-full px-4 py-2 text-[12px] font-semibold transition-all ${filter === "all" ? "bg-[#051933] text-white" : "bg-white border border-[#e8e2d6] text-[#64748b] hover:border-[#051933]/30"}`}
              >
                All Banks
              </button>
              {(Object.entries(STATUS_CFG) as [Status, typeof STATUS_CFG[Status]][]).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-semibold transition-all ${filter === key ? cfg.badge + " ring-2 ring-current/30" : "bg-white border border-[#e8e2d6] text-[#64748b] hover:border-gray-300"}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </button>
              ))}
            </div>

            {/* Table + Detail panel */}
            <div className={`grid gap-5 items-start transition-all ${selected ? "lg:grid-cols-[1fr_360px]" : "grid-cols-1"}`}>

              {/* Table */}
              <div className="overflow-hidden rounded-2xl border border-[#e8e2d6] bg-white shadow-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#fafaf8] border-b border-[#e8e2d6]">
                      {(["name", "type", "status"] as SortKey[]).map((k) => (
                        <th key={k} className="px-5 py-3.5 text-left">
                          <button onClick={() => handleSort(k)} className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                            {k === "name" ? "Bank Name" : k === "type" ? "Type" : "Kashrus Status"}
                            <SortIcon k={k} />
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="py-16 text-center">
                          <p className="font-serif text-xl text-[#94a3b8]">No banks found</p>
                          <p className="text-[13px] text-[#b0a898] mt-1">Try adjusting your search or filter</p>
                        </td>
                      </tr>
                    ) : filtered.map((b) => (
                      <tr
                        key={b.id}
                        onClick={() => setSelected(selected?.id === b.id ? null : b)}
                        className={`cursor-pointer transition-colors border-b border-[#f1ede6] last:border-none ${selected?.id === b.id ? "bg-[#fffbf0] border-l-2 border-l-[#c8a21a]" : "hover:bg-[#fdfaf4]"}`}
                      >
                        <td className="px-5 py-4">
                          <p className="font-serif text-[16px] text-[#051933]">{b.name}</p>
                          <p className="text-[11px] text-[#94a3b8]">{b.hq}</p>
                        </td>
                        <td className="px-5 py-4 text-[12px] text-[#64748b]">{b.type}</td>
                        <td className="px-5 py-4"><StatusBadge status={b.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Detail panel */}
              {selected && (
                <div className="rounded-2xl overflow-hidden border border-[#e8e2d6] bg-white shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
                  {/* Header */}
                  <div className="relative bg-[#051933] px-6 py-5 overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(135deg,#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <button
                      onClick={() => setSelected(null)}
                      className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-colors hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <h2 className="relative font-serif text-xl text-white mb-1">{selected.name}</h2>
                    <p className="relative text-[12px] text-[#7a93ae]">{selected.type} · {selected.hq}</p>
                  </div>

                  {/* Body */}
                  <div className="px-6 py-5">
                    {/* Status + assets row */}
                    <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#f1ede6] mb-4">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-1.5">Kashrus Status</p>
                        <StatusBadge status={selected.status} />
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-1.5">Total Assets</p>
                        <p className="text-[14px] text-[#0f172a]">{selected.assets}</p>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="rounded-xl bg-[#fffbf0] border-l-[3px] border-[#c8a21a] px-4 py-3.5 mb-4">
                      <p className="text-[12px] leading-[1.75] text-[#64748b]">{selected.summary}</p>
                    </div>

                    {/* Research notes */}
                    <div className="mb-4 pb-4 border-b border-[#f1ede6]">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-2">Research Notes</p>
                      <p className="text-[12px] leading-[1.75] text-[#64748b]">{selected.notes}</p>
                    </div>

                    {/* Reviewed by */}
                    {selected.poskim.length > 0 && (
                      <div className="mb-4 pb-4 border-b border-[#f1ede6]">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-3">Reviewed By</p>
                        <div className="space-y-2.5">
                          {selected.poskim.map((k) => {
                            const p = POSKIM_MAP[k];
                            return (
                              <div key={k} className="flex items-center gap-2.5">
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${p.bg} ${p.text}`}>{k}</div>
                                <span className="text-[12px] text-[#0f172a] leading-snug">{p.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Meta */}
                    <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-[#f1ede6]">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-1">Founded</p>
                        <p className="text-[13px] text-[#0f172a]">{selected.founded}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-1">Website</p>
                        <a href={`https://${selected.website}`} target="_blank" rel="noreferrer"
                          className="text-[13px] text-[#c8a21a] inline-flex items-center gap-1 hover:underline">
                          {selected.website} <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>

                    {/* CTA buttons based on status */}
                    {selected.status === "conditional" && (
                      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#c8a21a] py-3 text-[12px] font-semibold text-[#051933] transition-all hover:bg-[#d7b52f]">
                        Request Heter Iska Template <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                    {selected.status === "noncompliant" && (
                      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-[12px] font-semibold text-white transition-all hover:bg-red-700">
                        Ask a Sha'alah About This Bank <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                    {selected.status === "questionable" && (
                      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-[12px] font-semibold text-white transition-all hover:bg-orange-600">
                        Ask a Sha'alah About This Bank <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── REQUEST CTA ───────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-3xl bg-[#051933] px-8 py-8 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-7">
            <div>
              <h3 className="font-serif text-2xl text-white mb-2">Is Your Bank Not Listed?</h3>
              <p className="text-[14px] text-[#7a93ae] max-w-lg leading-7">
                Request information on an unlisted bank or share updated information with us.
                Our team will research and add it to the directory.
              </p>
            </div>
            <button
              onClick={() => {
                setRequestOpen(true);
                setSubmitted(false);
              }}
              className="shrink-0 inline-flex items-center gap-2.5 rounded-2xl bg-[#c8a21a] px-7 py-4 text-[14px] font-semibold text-[#051933] transition-all hover:bg-[#d7b52f] hover:-translate-y-0.5"
            >
              <ZoomIn /> Submit a Request
            </button>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}

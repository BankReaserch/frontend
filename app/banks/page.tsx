"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useMemo, useEffect, useRef } from "react";
import { BankType, Status } from "../../components/admin/bank/bank.types";
import {
  Search,
  LayoutGrid,
  List,
  ShieldCheck,
  Microscope,
  Users,
  ChevronUp,
  ChevronDown,
  Plus,
} from "lucide-react";
import axios from "axios";
import { STATUS_CFG, STATUS_DESCRIPTIONS } from "./status.config";
import StatusBadge from "./Statusbadge";
import DetailPanel from "./DetailPanel";
import RequestModal from "./Requestmodal";
import BankCard from "./BankCard";

export default function BanksPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<BankType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [sortKey, setSortKey] = useState<"name" | "type" | "status">("name");
  const [sortDir, setSortDir] = useState(1);
  const [banks, setBanks] = useState<BankType[]>([]);
  const [loading, setLoading] = useState(true);

  // Scroll detail panel into view on mobile when opened
  const detailRef = useRef<HTMLDivElement>(null);

  const fetchBanks = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/banks/all`
      );
      const formatted = res.data.data.map((bank: any) => ({
        _id: bank._id,
        name: bank.name,
        type: bank.type,
        hq: bank.location,
        assets: bank.assets || "N/A",
        founded: bank.founded || "-",
        status: (bank.status || "undetermined").toLowerCase(),
        notes: bank.publicInfo || "",
        summary: bank.publicInfo || "",
        website: bank.website || "",
        coverImage: bank.coverImage || "",
        reportUrl: bank.reportUrl
          ? `${process.env.NEXT_PUBLIC_API_URL}api/banks/view-report/${bank._id}`
          : "",
        poskim: [],
      }));
      setBanks(formatted);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  // Scroll detail panel into view on mobile when bank is selected
  useEffect(() => {
    if (selected && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  }, [selected]);

  const filtered = useMemo(() => {
    let data = banks.filter((b) => {
      const matchFilter = filter === "all" || b.status === filter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.type.toLowerCase().includes(q) ||
        (b.hq ?? "").toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });

    data.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      return av < bv ? -sortDir : av > bv ? sortDir : 0;
    });

    return data;
  }, [banks, search, filter, sortKey, sortDir]);

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortDir((d) => d * -1);
    else { setSortKey(key); setSortDir(1); }
  };

  const handleSelect = (bank: BankType) => {
    setSelected((prev) => (prev?._id === bank._id ? null : bank));
  };

  const SortIcon = ({ k }: { k: typeof sortKey }) => {
    if (sortKey !== k)
      return <span className="text-[10px] text-[#94a3b8]">↕</span>;
    return sortDir === 1 ? (
      <ChevronUp className="h-3 w-3 text-[#c8a21a]" />
    ) : (
      <ChevronDown className="h-3 w-3 text-[#c8a21a]" />
    );
  };

  // Skeleton loaders
  const SkeletonCard = () => (
    <div className="rounded-2xl bg-white border border-[#e8e2d6] overflow-hidden animate-pulse">
      <div className="h-40 bg-[#e8e2d6]" />
      <div className="p-5">
        <div className="h-4 bg-[#e8e2d6] rounded-full w-3/4 mb-2" />
        <div className="h-3 bg-[#e8e2d6] rounded-full w-1/2 mb-4" />
        <div className="h-6 bg-[#e8e2d6] rounded-full w-24 mb-3" />
        <div className="h-3 bg-[#e8e2d6] rounded-full w-1/3" />
      </div>
    </div>
  );

  const SkeletonRow = () => (
    <tr className="border-b border-[#f1ede6] animate-pulse">
      <td className="px-5 py-4">
        <div className="h-4 bg-[#e8e2d6] rounded-full w-40 mb-2" />
        <div className="h-3 bg-[#e8e2d6] rounded-full w-28" />
      </td>
      <td className="px-5 py-4">
        <div className="h-3 bg-[#e8e2d6] rounded-full w-24" />
      </td>
      <td className="px-5 py-4">
        <div className="h-6 bg-[#e8e2d6] rounded-full w-20" />
      </td>
    </tr>
  );

  return (
    <>
      {showModal && <RequestModal onClose={() => setShowModal(false)} />}
      <Navbar />

      <main className="min-h-screen bg-[#f5f1ea] overflow-x-hidden">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative bg-[#051933] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:repeating-linear-gradient(135deg,#fff_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="pointer-events-none absolute left-1/4 -top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#c8a21a]/8 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-10 md:pt-32">
            <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">

              {/* Left */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c8a21a] mb-5">
                  Services · Bank Directory
                </p>
                <h1 className="font-serif text-5xl md:text-6xl leading-[1.07] text-white mb-5">
                  Kosher{" "}
                  <em className="italic text-[#c8a21a]">Bank</em>{" "}
                  Directory
                </h1>
                <p className="text-[15px] leading-8 text-[#94a3b8] max-w-lg mb-4">
                  Comprehensive research on the kashrus status of financial
                  institutions across the United States, guided by leading poskim.
                </p>
                <p className="text-[13px] leading-7 text-[#4e6070] max-w-lg">
                  Based on the rulings of{" "}
                  <span className="text-[#c8a21a]">Harav Yisroel Belsky zt"l</span>,{" "}
                  <span className="text-[#c8a21a]">Harav Moshe Shternbuch shlit"a</span>,{" "}
                  <span className="text-[#c8a21a]">Harav Ari Marberger shlit"a</span>,
                  and other Rabbanim who are experts in this field.
                </p>
              </div>

              {/* Status Legend Card */}
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04]">
                <div className="px-5 py-3.5 border-b border-white/8">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#c8a21a]">
                    Kashrus Status Guide
                  </p>
                </div>
                {(Object.entries(STATUS_CFG) as [Status, (typeof STATUS_CFG)[Status]][]).map(
                  ([key, cfg]) => (
                    <div
                      key={key}
                      className="flex items-start gap-3 px-5 py-3 border-b border-white/5 last:border-none hover:bg-white/[0.03] transition-colors"
                    >
                      <span className={`mt-[5px] h-2 w-2 min-w-2 rounded-full ${cfg.dotClass}`} />
                      <div>
                        <p className="text-[13px] text-white/90 leading-snug">{cfg.label}</p>
                        <p className="text-[11px] text-[#4e6070] leading-snug mt-0.5">
                          {STATUS_DESCRIPTIONS[key]}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="border-t border-white/10 mt-10">
            <div className="mx-auto max-w-6xl px-6 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {[
                { n: banks.length > 0 ? String(banks.length) : "3000+", l: "Banks Listed" },
                { n: "1000+", l: "Hours Researched" },
                { n: "10", l: "Poskim Guiding" },
                { n: "2000+", l: "People Served" },
              ].map((s) => (
                <div key={s.l} className="px-6 first:pl-0 last:pr-0 text-center">
                  <p className="font-serif text-2xl text-[#d0ab24]">{s.n}</p>
                  <p className="text-[8px] uppercase tracking-widest text-[#4e6070] mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY SECTION ──────────────────────────────────────── */}
        <section className="bg-[#f0ebe0] py-14">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c8a21a] mb-8">
              Why Choose the Kosher Bank Directory?
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { Icon: ShieldCheck, title: "Reliable Halachic Oversight", desc: "All listings and content are guided by leading Rabbanim and poskim, ensuring accuracy and Torah-based standards." },
                { Icon: Microscope, title: "In-Depth Financial Research", desc: "We analyze ownership structures, decision-making authority, and ribis implications of banks and financial institutions." },
                { Icon: Users, title: "Community-Driven Insight", desc: "We welcome input from the public, helping build a transparent and continually evolving knowledge base." },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="rounded-2xl bg-white p-7 border border-[#e8e2d6]">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#051933]">
                    <Icon className="h-5 w-5 text-[#d0ab24]" />
                  </div>
                  <h3 className="font-serif text-xl text-[#051933] mb-2.5">{title}</h3>
                  <p className="text-[13px] leading-7 text-[#64748b]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DIRECTORY ────────────────────────────────────────── */}
        <section className="py-14 pb-24">
          <div className="mx-auto max-w-6xl px-6">

            {/* Heading row */}
            <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c8a21a] mb-2">
                  Search the Directory
                </p>
                <h2 className="font-serif text-4xl text-[#051933]">
                  All <em className="italic text-[#c8a21a]">Banks</em>
                </h2>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="hidden md:inline-flex items-center gap-2 rounded-xl border border-[#e8e2d6] bg-white px-5 py-2.5 text-[13px] text-[#64748b] hover:border-[#c8a21a]/50 hover:text-[#051933] transition-all"
              >
                <Plus className="h-4 w-4" /> Request a Bank
              </button>
            </div>

            {/* Toolbar: search + view toggle */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  type="text"
                  placeholder="Search by name, type, or location..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setSelected(null); }}
                  className="h-11 w-full rounded-2xl border border-[#e8e2d6] bg-white pl-10 pr-4 text-[14px] text-[#0f172a] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#d0ab24] focus:ring-4 focus:ring-[#d0ab24]/10"
                />
              </div>
              <div className="flex overflow-hidden rounded-xl border border-[#e8e2d6] bg-white">
                <button
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={`flex items-center justify-center p-2.5 transition-colors ${view === "grid" ? "bg-[#051933] text-[#c8a21a]" : "text-[#94a3b8] hover:bg-[#f8f5ef]"}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={`flex items-center justify-center p-2.5 transition-colors ${view === "list" ? "bg-[#051933] text-[#c8a21a]" : "text-[#94a3b8] hover:bg-[#f8f5ef]"}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => { setFilter("all"); setSelected(null); }}
                className={`rounded-full px-4 py-2 text-[12px] font-semibold transition-all ${filter === "all" ? "bg-[#051933] text-white" : "border border-[#e8e2d6] bg-white text-[#64748b] hover:border-[#051933]/30"}`}
              >
                All Banks
              </button>
              {(Object.entries(STATUS_CFG) as [Status, (typeof STATUS_CFG)[Status]][]).map(
                ([key, cfg]) => (
                  <button
                    key={key}
                    onClick={() => { setFilter(key); setSelected(null); }}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-semibold transition-all ${
                      filter === key
                        ? `${cfg.badgeBg} ${cfg.badgeText} ring-2 ring-current/20`
                        : "border border-[#e8e2d6] bg-white text-[#64748b] hover:border-gray-300"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${cfg.dotClass}`} />
                    {cfg.label}
                  </button>
                )
              )}
            </div>

            {/* Count */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-5">
              {loading ? "Loading…" : `${filtered.length} bank${filtered.length !== 1 ? "s" : ""}`}
            </p>
            <div
              className={`grid gap-5 items-start transition-all duration-300 ${
                selected ? "lg:grid-cols-[1fr_360px]" : "grid-cols-1"
              }`}
            >
              <div>
                {/* ── GRID VIEW ── */}
                {view === "grid" && (
                  <>
                    {loading ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <SkeletonCard key={i} />
                        ))}
                      </div>
                    ) : filtered.length === 0 ? (
                      <div className="rounded-2xl bg-white border border-[#e8e2d6] py-20 text-center">
                        <p className="font-serif text-xl text-[#94a3b8] mb-2">No banks found</p>
                        <p className="text-[13px] text-[#b0a898]">Try adjusting your search or filter.</p>
                      </div>
                    ) : (
                      <div
                        className={`grid gap-4 ${
                          selected
                            ? "grid-cols-1 sm:grid-cols-2"
                            : "grid-cols-2 md:grid-cols-3"
                        }`}
                      >
                        {filtered.map((bank) => (
                          <BankCard
                            key={bank._id}
                            bank={bank}
                            selected={selected?._id === bank._id}
                            onClick={() => handleSelect(bank)}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* ── LIST VIEW ── */}
                {view === "list" && (
                  <>
                    {loading ? (
                      <div className="overflow-hidden rounded-2xl border border-[#e8e2d6] bg-white">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-[#e8e2d6] bg-[#fafaf8]">
                              {["Bank Name", "Type", "Kashrus Status"].map((h) => (
                                <th key={h} className="px-5 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({ length: 8 }).map((_, i) => (
                              <SkeletonRow key={i} />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : filtered.length === 0 ? (
                      <div className="rounded-2xl bg-white border border-[#e8e2d6] py-20 text-center">
                        <p className="font-serif text-xl text-[#94a3b8] mb-2">No banks found</p>
                        <p className="text-[13px] text-[#b0a898]">Try adjusting your search or filter.</p>
                      </div>
                    ) : (
                      <div className="overflow-hidden rounded-2xl border border-[#e8e2d6] bg-white shadow-sm">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-[#e8e2d6] bg-[#fafaf8]">
                              {(["name", "type", "status"] as const).map((k) => (
                                <th key={k} className="px-5 py-3 text-left">
                                  <button
                                    onClick={() => handleSort(k)}
                                    className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8] hover:text-[#051933] transition-colors"
                                  >
                                    {k === "name" ? "Bank Name" : k === "type" ? "Type" : "Kashrus Status"}
                                    <SortIcon k={k} />
                                  </button>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {filtered.map((bank) => (
                              <tr
                                key={bank._id}
                                onClick={() => handleSelect(bank)}
                                className={`cursor-pointer border-b border-[#f1ede6] last:border-none transition-colors ${
                                  selected?._id === bank._id
                                    ? "bg-[#fffbf0] border-l-[3px] border-l-[#c8a21a]"
                                    : "hover:bg-[#fdfaf4]"
                                }`}
                              >
                                <td className="px-5 py-4">
                                  <p className="font-serif text-[15px] text-[#051933]">{bank.name}</p>
                                  <p className="text-[11px] text-[#94a3b8] mt-0.5">
                                    {bank.hq}{bank.founded && bank.founded !== "-" ? ` · Est. ${bank.founded}` : ""}
                                  </p>
                                </td>
                                <td className="px-5 py-4">
                                  <p className="text-[12px] text-[#64748b]">{bank.type}</p>
                                  {bank.assets !== "N/A" && (
                                    <p className="text-[11px] text-[#b0a898] mt-0.5">{bank.assets}</p>
                                  )}
                                </td>
                                <td className="px-5 py-4">
                                  <StatusBadge status={bank.status} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Right column: sticky detail panel — inline, NOT an overlay */}
              {selected && (
                <div ref={detailRef} className="lg:sticky lg:top-6">
                  <DetailPanel
                    bank={selected}
                    onClose={() => setSelected(null)}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── REQUEST CTA ──────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-3xl bg-[#051933] px-8 py-9 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-7">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c8a21a] mb-2">
                Don't see your bank?
              </p>
              <h3 className="font-serif text-2xl text-white mb-2">
                Request a Bank Research
              </h3>
              <p className="text-[14px] text-[#7a93ae] max-w-lg leading-7">
                Request information on an unlisted bank or share updated information
                with us. Our team will research and add it to the directory.
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="shrink-0 inline-flex items-center gap-2.5 rounded-2xl bg-[#c8a21a] px-7 py-4 text-[14px] font-semibold text-[#051933] transition-all hover:bg-[#d7b52f] hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4" /> Request a Bank
            </button>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
// app/alerts/page.tsx

"use client";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import axios from "axios";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Bell,
  Search,
  ShieldAlert,
  AlertTriangle,
  TrendingUp,
  Info,
  Mail,
} from "lucide-react";

export type AlertType =
  | "warning"
  | "danger"
  | "success"
  | "info";

export type Alert = {
  _id: string;

  title: string;

  message: string;

  type: AlertType;

  isActive: boolean;

  createdAt: string;
};

const alertStyles = {
  warning: {
    card:
      "border-yellow-200 bg-yellow-50/60",

    icon:
      "bg-yellow-500/10 text-yellow-600 border-yellow-500/10",
  },

  danger: {
    card:
      "border-red-200 bg-red-50/60",

    icon:
      "bg-red-500/10 text-red-600 border-red-500/10",
  },

  success: {
    card:
      "border-green-200 bg-green-50/60",

    icon:
      "bg-green-500/10 text-green-600 border-green-500/10",
  },

  info: {
    card:
      "border-blue-200 bg-blue-50/60",

    icon:
      "bg-blue-500/10 text-blue-600 border-blue-500/10",
  },
};

const alertIcons = {
  warning:
    AlertTriangle,

  danger:
    ShieldAlert,

  success:
    TrendingUp,

  info: Info,
};

export default function AlertsPage() {

  /*
  ========================================
  STATES
  ========================================
  */

  const [alerts, setAlerts] =
    useState<Alert[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  /*
  ========================================
  AXIOS
  ========================================
  */

  const api = axios.create({
    baseURL:
      process.env
        .NEXT_PUBLIC_API_URL,
  });

  /*
  ========================================
  FETCH ALERTS
  ========================================
  */

  useEffect(() => {

    const fetchAlerts =
      async () => {

        try {

          const res =
            await api.get(
              "/api/alerts/active"
            );

          setAlerts(
            res.data.data || []
          );

        } catch (error) {

          console.error(
            error
          );

        } finally {

          setLoading(false);
        }
      };

    fetchAlerts();

  }, []);

  /*
  ========================================
  FILTER
  ========================================
  */

  const filteredAlerts =
    useMemo(() => {

      return alerts.filter(
        (alert) =>
          alert.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          alert.message
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [
      alerts,
      search,
    ]);

  return (
    <>
      {/* NAVBAR */}
      <div className="bg-[#051933]">

        <Navbar />

      </div>

      <main className="min-h-screen bg-gradient-to-br from-[#f5f1ea] via-[#f8f5ef] to-[#f2ece3] overflow-hidden">

        {/* HERO */}
        <section className="relative bg-[#051933] overflow-hidden pt-24 pb-24">

          {/* GRID */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(135deg,#ffffff_1px,transparent_1px)] bg-[size:28px_28px]" />

          {/* GLOW */}
          <div className="absolute top-[-220px] left-1/2 -translate-x-1/2 w-[850px] h-[850px] bg-[#c8a21a]/10 blur-3xl rounded-full" />

          <div className="relative max-w-7xl mx-auto px-6">

            <div className="grid lg:grid-cols-[1fr_420px] gap-20 items-center">

              {/* LEFT */}
              <div>

                {/* LABEL */}
                <p className="text-[#c8a21a] uppercase tracking-[0.35em] text-xs font-semibold mb-6">

                  Timely Updates

                </p>

                {/* TITLE */}
                <h1 className="font-serif text-5xl md:text-6xl leading-[1.02] text-white">

                  Ribis{" "}

                  <span className="italic text-[#c8a21a]">

                    Alerts

                  </span>

                </h1>

                {/* DESCRIPTION */}
                <p className="max-w-2xl mt-8 text-[#94a3b8] leading-8 text-[15px]">

                  Stay informed with timely updates
                  on developments in ribis and
                  financial halacha.

                  <br />
                  <br />

                  Our alerts highlight key changes,
                  emerging issues, and practical
                  considerations—helping you remain
                  aware and navigate an evolving
                  financial landscape with clarity
                  and confidence.

                </p>

                {/* SEARCH */}
                <div className="relative max-w-xl mt-10">

                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />

                  <input
                    type="text"
                    placeholder="Search alerts..."
                    value={
                      search
                    }
                    onChange={(
                      e
                    ) =>
                      setSearch(
                        e.target
                          .value
                      )
                    }
                    className="w-full h-14 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl pl-14 pr-5 text-white placeholder:text-[#64748b] outline-none"
                  />

                </div>

              </div>

              {/* SUBSCRIBE CARD */}
              <div className="relative">

                <div className="absolute inset-0 bg-[#c8a21a]/10 blur-3xl rounded-[40px]" />

                <div className="relative rounded-[36px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">

                  <div className="h-[4px] bg-[#c8a21a]" />

                  <div className="p-10">

                    {/* ICON */}
                    <div className="w-20 h-20 rounded-3xl bg-[#c8a21a]/10 border border-[#c8a21a]/20 flex items-center justify-center">

                      <Bell className="w-10 h-10 text-[#c8a21a]" />

                    </div>

                    {/* TITLE */}
                    <h2 className="font-serif text-4xl text-white leading-tight mt-8">

                      Subscribe
                      to Alerts

                    </h2>

                    {/* TEXT */}
                    <p className="text-[#94a3b8] leading-8 text-[15px] mt-6">

                      Receive important ribis alerts,
                      market developments, and
                      financial halacha updates
                      directly in your inbox.

                    </p>

                    {/* INPUT */}
                    <div className="mt-8 space-y-4">

                      <div className="relative">

                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />

                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full h-14 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl pl-14 pr-5 text-white placeholder:text-[#64748b] outline-none"
                        />

                      </div>

                      <button className="w-full h-14 rounded-2xl bg-[#c8a21a] hover:bg-[#d8b84a] transition-all text-[#051933] font-semibold">

                        Subscribe Now

                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ALERTS */}
{/* ALERTS */}
<section className="py-20">

  <div className="max-w-7xl mx-auto px-6">

    {/* SECTION HEADER */}
    <div className="mb-14">

      {/* LABEL */}
      <p className="text-[#c8a21a] uppercase tracking-[0.32em] text-xs font-semibold mb-5">

        Public Notices

      </p>

      {/* TOP */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

        {/* LEFT */}
        <div>

          {/* TITLE */}
          <h2 className="font-serif text-5xl md:text-6xl leading-[1] tracking-[-0.03em] text-[#051933]">

            Latest{" "}

            <span className="italic text-[#c8a21a]">

              Alerts

            </span>

          </h2>

          {/* DESCRIPTION */}
          <p className="max-w-2xl text-[#64748b] leading-8 text-[15px] mt-6">

            Important financial updates, ribis developments,
            public notices, and halachic guidance curated
            for the frum community and modern financial realities.

          </p>

        </div>

        {/* RIGHT STATS */}
        <div className="flex items-center gap-4">

          {/* ACTIVE ALERTS */}
          <div className="inline-flex items-center gap-3 rounded-2xl border border-[#e8dece] bg-white/70 backdrop-blur-xl px-5 py-4 shadow-sm">

            <div className="w-3 h-3 rounded-full bg-[#c8a21a] animate-pulse" />

            <span className="text-sm font-medium text-[#051933]">

              {filteredAlerts.length} Active Alerts

            </span>

          </div>

        </div>

      </div>

    </div>

    {/* LOADING */}
    {loading ? (

      <div className="text-center py-24">

        <p className="text-[#64748b]">

          Loading alerts...

        </p>

      </div>

    ) : filteredAlerts.length ===
      0 ? (

      <div className="rounded-[36px] border border-dashed border-[#d9cfbf] bg-white/80 backdrop-blur-xl py-28 text-center">

        <Bell className="w-14 h-14 text-[#94a3b8] mx-auto mb-6" />

        <h3 className="font-serif text-4xl text-[#051933]">

          No Alerts Available

        </h3>

        <p className="text-[#64748b] mt-4">

          There are currently no public alerts.

        </p>

      </div>

    ) : (

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {filteredAlerts.map(
          (
            alert
          ) => {

            const Icon =
              alertIcons[
                alert.type
              ];

            const style =
              alertStyles[
                alert.type
              ];

            return (
             <div
  key={alert._id}
  className={`group relative h-[520px] rounded-[36px] border ${style.card} bg-white/75 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col`}
>

  {/* GLOW */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-[#f6efe4]/60 pointer-events-none" />

  {/* CONTENT */}
  <div className="relative p-8 flex flex-col h-full">

    {/* TOP */}
    <div className="flex items-start justify-between gap-4 flex-shrink-0">

      {/* ICON */}
      <div
        className={`w-16 h-16 rounded-[24px] border flex items-center justify-center ${style.icon}`}
      >

        <Icon className="w-7 h-7" />

      </div>

      {/* DATE */}
      <div className="px-4 py-2 rounded-full bg-white/70 border border-white text-xs font-medium text-[#64748b]">

        {new Date(
          alert.createdAt
        ).toLocaleDateString()}

      </div>

    </div>

    {/* BODY */}
    <div className="flex-1 flex flex-col mt-8 min-h-0">

      {/* TITLE */}
      <h2 className="font-serif text-[44px] leading-[0.92] tracking-[-0.03em] text-[#051933] break-words flex-shrink-0">

        {alert.title}

      </h2>

      {/* MESSAGE */}
      <div className="mt-6 flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0">

        <p className="text-[#64748b] text-[15px] leading-8 whitespace-pre-line">

          {alert.message}

        </p>

      </div>

    </div>

  </div>

</div>
            );
          }
        )}

      </div>
    )}

  </div>

</section>

      </main>

      <Footer />

    </>
  );
}
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
  X,
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
  const [alerts, setAlerts] =
    useState<Alert[]>([]);

  const [search, setSearch] =
    useState("");
  const [hiddenAlerts, setHiddenAlerts] =
    useState<string[]>([]);
  const [selectedAlert, setSelectedAlert] =
    useState<Alert | null>(null);
  const hideAlert = (id: string) => {
    setHiddenAlerts((prev) => [
      ...prev,
      id,
    ]);
  };

  const api = axios.create({
    baseURL:
      process.env
        .NEXT_PUBLIC_API_URL,
  });
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

        }
      };

    fetchAlerts();

  }, []);

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
  const visibleAlerts =
    filteredAlerts.filter(
      (alert) =>
        !hiddenAlerts.includes(
          alert._id
        )
    );
  const alertStyles = {
    danger: {
      border: "bg-red-500",
      badge: "text-red-400",
      icon: "text-red-400",
      iconBg: "bg-red-500/15",
    },

    warning: {
      border: "bg-amber-500",
      badge: "text-amber-400",
      icon: "text-amber-400",
      iconBg: "bg-amber-500/15",
    },

    success: {
      border: "bg-emerald-500",
      badge: "text-emerald-400",
      icon: "text-emerald-400",
      iconBg: "bg-emerald-500/15",
    },

    info: {
      border: "bg-[#C8A21A]",
      badge: "text-[#C8A21A]",
      icon: "text-[#C8A21A]",
      iconBg: "bg-[#C8A21A]/15",
    },
  };
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
        <section className="py-24 bg-[#F7F3EB]">

          <div className="max-w-7xl mx-auto px-6">

            {/* HEADER */}

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">

              <div>

                <p className="text-[#C8A21A] uppercase tracking-[0.32em] text-xs font-semibold mb-4">
                  PUBLIC NOTICES
                </p>

                <h2 className="font-serif text-5xl md:text-6xl text-[#051933] leading-none">

                  Latest{" "}

                  <span className="italic text-[#C8A21A]">
                    Alerts
                  </span>

                </h2>

                <p className="mt-6 max-w-2xl text-[#64748B] leading-8">

                  Important financial updates, ribis developments,
                  public notices, and halachic guidance curated for
                  the frum community and modern financial realities.

                </p>

              </div>

              <div className="inline-flex items-center gap-3 rounded-2xl bg-white border border-[#E9E1D2] px-5 py-4 shadow-sm">

                <div className="w-3 h-3 rounded-full bg-[#C8A21A] animate-pulse" />

                <span className="font-medium text-[#051933]">

                  {visibleAlerts.length} Active Alerts

                </span>

              </div>

            </div>

            {/* ALERTS */}
            <div className="space-y-4">

              {visibleAlerts.map((alert) => {

                const type =
                  alert.type?.toLowerCase() as AlertType;

                const Icon =
                  alertIcons[type] ||
                  AlertTriangle;

                const style =
                  alertStyles[type] ||
                  alertStyles.info;

                return (

                  <div
                    key={alert._id}
                    className="
          relative
          overflow-hidden
          rounded-3xl
          bg-[#051933]
          border
          border-[#0E294A]
          shadow-xl
        "
                  >

                    <div
                      className={`absolute left-0 top-0 h-full w-1.5 ${style.border}`}
                    />

                    <div className="flex items-start justify-between gap-6 p-7">

                     <div className="flex gap-5 flex-1">

  <div
    className={`
      flex
      h-16
      w-16
      shrink-0
      items-center
      justify-center
      rounded-3xl
      ${style.iconBg}
    `}
  >
    <Icon
      className={`
        h-8
        w-8
        ${style.icon}
      `}
    />
  </div>

  <div className="flex-1">

    <div className="flex items-center justify-between mb-3">

      <span
        className={`
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.3em]
          ${style.badge}
        `}
      >
        {alert.type}
      </span>

      <span className="rounded-full bg-emerald-500/15 px-4 py-1.5 text-xs font-semibold text-emerald-400">
        Active
      </span>

    </div>

    <h3
      className="
        font-serif
        text-3xl
        text-white
        mb-3
      "
    >
      {alert.title}
    </h3>

    <p
      className="
        text-[#D3DCE8]
        leading-7
        line-clamp-2
      "
    >
      {alert.message}
    </p>

    {alert.message.length > 100 && (
      <button
        onClick={() =>
          setSelectedAlert(alert)
        }
        className="
          mt-3
          text-sm
          font-medium
          text-[#C8A21A]
          hover:underline
        "
      >
        Read More
      </button>
    )}

  </div>

</div>

                      <button
                        onClick={() =>
                          hideAlert(alert._id)
                        }
                        className="
              shrink-0
              h-10
              w-10
              rounded-xl
              bg-[#C8A21A]
              text-[#051933]
              hover:scale-105
              transition
              flex
              items-center
              justify-center
            "
                      >
                        <X size={16} />
                      </button>

                    </div>

                  </div>

                );

              })}

            </div>
          </div>

        </section>

      </main>
      {selectedAlert && (

        <div className="fixed inset-0 z-50">

          <div
            className="absolute inset-0 bg-black/60"
            onClick={() =>
              setSelectedAlert(null)
            }
          />

          <div className="absolute inset-0 flex items-center justify-center p-6">

            <div className="w-full max-w-3xl rounded-3xl bg-[#051933] border border-[#0E294A] p-8 relative">

              <button
                onClick={() =>
                  setSelectedAlert(null)
                }
                className="absolute right-5 top-5 text-white"
              >
                <X />
              </button>

              <p className="text-[#C8A21A] uppercase tracking-[0.25em] text-xs font-semibold mb-4">
                {selectedAlert.type}
              </p>

              <h2 className="font-serif text-4xl text-white mb-6">
                {selectedAlert.title}
              </h2>

              <p className="text-[#D3DCE8] leading-8 whitespace-pre-wrap">
                {selectedAlert.message}
              </p>

            </div>

          </div>

        </div>

      )}
      <Footer />
    </>
  );
}
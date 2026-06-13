"use client";

import { ArrowRight, Download, ExternalLink, FileText, X, Crown, Lock, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BankType } from "../../components/admin/bank/bank.types";
import { STATUS_CFG } from "./status.config";
import StatusBadge from "./Statusbadge";

interface Props {
  bank: BankType;
  onClose: () => void;
}

// ─── Premium Gate Modal ────────────────────────────────────────────────────────

function PremiumGate({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#051933]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Top gold band */}
        <div className="relative bg-[#051933] px-7 pt-8 pb-6 overflow-hidden text-center">
          <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(135deg,#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-[#c8a21a]/20 blur-2xl" />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white/50 hover:bg-white/20 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          {/* Crown icon */}
          <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c8a21a]/15 border border-[#c8a21a]/30">
            <Crown className="h-8 w-8 text-[#c8a21a]" />
          </div>

          <p className="relative text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c8a21a] mb-1">
            Premium Members Only
          </p>
          <h3 className="relative font-serif text-2xl text-white leading-snug">
            Unlock Full<br />
            <em className="italic text-[#c8a21a]">Research Reports</em>
          </h3>
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          <p className="text-[13px] leading-[1.8] text-[#64748b] text-center mb-5">
            View and download detailed halachic research reports, full posek rulings,
            and in-depth kashrus analysis — exclusive to Premium Members.
          </p>

          {/* Feature list */}
          <ul className="space-y-2.5 mb-6">
            {[
              "Full halachic research reports",
              "Posek rulings & source materials",
              "Downloadable PDFs",
              "Priority alerts on status changes",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[12px] text-[#475569]">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#c8a21a]/15">
                  <Sparkles className="h-2.5 w-2.5 text-[#c8a21a]" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={() => router.push("/plan")}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#c8a21a] px-6 py-3.5 text-[13px] font-semibold text-[#051933] hover:bg-[#d7b52f] transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Crown className="h-4 w-4" />
            Upgrade to Premium
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onClose}
            className="mt-2.5 w-full py-2.5 text-[12px] text-[#94a3b8] hover:text-[#64748b] transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Detail Panel ──────────────────────────────────────────────────────────────

export default function DetailPanel({ bank, onClose }: Props) {
  const cfg = STATUS_CFG[bank.status] ?? STATUS_CFG["undetermined"];
  const [showGate, setShowGate] = useState(false);

  const handleProtectedAction = async (
    action: "view" | "download"
  ) => {
    try {
      // Ping the view-report endpoint with a HEAD-like check first.
      // We use a GET but intercept the 403 before the browser navigates.
      if (action === "view") {
        const url = `${process.env.NEXT_PUBLIC_API_URL}api/banks/view-report/${bank._id}`;
        // Try fetching with credentials — if 403, show gate; if ok, open tab
        const res = await axios.get(url, {
          withCredentials: true,
          // Tell axios to resolve even on 4xx so we can inspect the code
          validateStatus: () => true,
        });

        if (res.status === 403 && res.data?.code === "NO_ACTIVE_PLAN") {
          setShowGate(true);
          return;
        }

        window.open(url, "_blank");
      }

      if (action === "download") {
        const url = `${process.env.NEXT_PUBLIC_API_URL}api/banks/download-report/${bank._id}`;
        const res = await axios.get(url, {
          withCredentials: true,
          validateStatus: () => true,
        });

        if (res.status === 403 && res.data?.code === "NO_ACTIVE_PLAN") {
          setShowGate(true);
          return;
        }
        window.open(url, "_blank");
      }
    } catch {
      setShowGate(true);
    }
  };
  return (
    <>
      {showGate && <PremiumGate onClose={() => setShowGate(false)} />}

      <div className="rounded-2xl overflow-hidden border border-[#e8e2d6] bg-white shadow-lg">
        {/* Header */}
        <div className="relative bg-[#051933] px-6 py-5 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:repeating-linear-gradient(135deg,#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white/60 hover:bg-white/20 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <h2 className="relative font-serif text-xl text-white mb-1 pr-10 leading-snug">
            {bank.name}
          </h2>
          <p className="relative text-[11px] text-[#7a93ae]">
            {[bank.type, bank.hq].filter(Boolean).join(" · ")}
          </p>
        </div>

        <div className="px-5 py-5 space-y-4">
          {/* Status + Assets */}
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#f1ede6]">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-1.5">
                Kashrus Status
              </p>
              <StatusBadge status={bank.status} />
            </div>
            {bank.assets && bank.assets !== "N/A" && (
              <div className="text-right">
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-1.5">
                  Total Assets
                </p>
                <p className="font-serif text-[15px] text-[#0f172a]">{bank.assets}</p>
              </div>
            )}
          </div>

          {/* Summary */}
          {bank.summary && (
            <div className="rounded-r-xl border-l-[3px] border-[#c8a21a] bg-[#fffbf0] px-4 py-3">
              <p className="text-[12px] leading-[1.8] text-[#64748b]">{bank.summary}</p>
            </div>
          )}

          {/* Founded + Website */}
          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-[#f1ede6]">
            {bank.founded && bank.founded !== "-" && (
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-1">
                  Founded
                </p>
                <p className="text-[13px] text-[#0f172a]">{bank.founded}</p>
              </div>
            )}
            {bank.website && (
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-1">
                  Website
                </p>
                <a
                  href={bank.website.startsWith("http") ? bank.website : `https://${bank.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[12px] text-[#c8a21a] hover:underline"
                >
                  {bank.website.replace(/^https?:\/\//, "")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>

          {/* Report actions */}
          {bank.reportUrl ? (
            <div className="grid grid-cols-2 gap-3">
              {/* View report */}
              <button
                onClick={() => handleProtectedAction("view")}
                className={`
                  flex items-center justify-center gap-2
                  rounded-xl py-3 text-[12px] font-semibold
                  transition-all hover:opacity-90
                  ${cfg.actionBg ?? "bg-[#c8a21a]"}
                  ${cfg.actionText ?? "text-[#051933]"}
                `}
              >
                <FileText className="h-3.5 w-3.5" />
                View Report
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              {/* Download report */}
              <button
                onClick={() => handleProtectedAction("download")}
                className="
                  flex items-center justify-center gap-2
                  rounded-xl border border-[#c8a21a] bg-white
                  py-3 text-[12px] font-semibold text-[#c8a21a]
                  transition-all hover:bg-[#fffaf0]
                "
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </button>
            </div>
          ) : (
    
            <button
              onClick={() => setShowGate(true)}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#e8e2d6] bg-[#fafaf8] py-3 text-[12px] text-[#94a3b8] hover:border-[#c8a21a]/40 hover:text-[#c8a21a] transition-all"
            >
              <Lock className="h-3.5 w-3.5" />
              Premium report coming soon
            </button>
          )}
        </div>
      </div>
    </>
  );
}
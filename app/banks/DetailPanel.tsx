import { ArrowRight, Download, ExternalLink, FileText, X } from "lucide-react";
import { Bank } from "./bank.types";
import { STATUS_CFG } from "./status.config";
import StatusBadge from "./Statusbadge";

const DetailPanel = ({ bank, onClose }: { bank: Bank; onClose: () => void }) => {
  const cfg = STATUS_CFG[bank.status];
  return (
    <div className="rounded-2xl overflow-hidden border border-[#e8e2d6] bg-white shadow-lg">
      {/* Header */}
      <div className="relative bg-[#051933] px-6 py-5 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(135deg,#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        <button onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white/60 hover:bg-white/20 transition-colors">
          <X className="h-3.5 w-3.5" />
        </button>
        <h2 className="relative font-serif text-xl text-white mb-1 pr-10">{bank.name}</h2>
        <p className="relative text-[11px] text-[#7a93ae]">{bank.type} · {bank.hq}</p>
      </div>

      {/* Body */}
      <div className="px-5 py-5">
        {/* Status + Assets */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#f1ede6] mb-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-1.5">Kashrus Status</p>
            <StatusBadge status={bank.status} />
          </div>
          <div className="text-right">
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-1.5">Total Assets</p>
            <p className="font-serif text-[15px] text-[#0f172a]">{bank.assets}</p>
          </div>
        </div>

        {/* Summary note */}
        <div className="rounded-r-xl border-l-[3px] border-[#c8a21a] bg-[#fffbf0] px-4 py-3 mb-4">
          <p className="text-[12px] leading-[1.8] text-[#64748b]">{bank.summary}</p>
        </div>

        {/* Meta row */}
        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-[#f1ede6]">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-1">Founded</p>
            <p className="text-[13px] text-[#0f172a]">{bank.founded}</p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8] mb-1">Website</p>
            <a href={`https://${bank.website}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1 text-[12px] text-[#c8a21a] hover:underline">
              {bank.website} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
        {bank.reportUrl && (
          <div className="grid grid-cols-2 gap-3">

            <button
              onClick={() =>
                window.open(
                  `${process.env.NEXT_PUBLIC_API_URL}api/banks/view-report/${bank.id}`,
                  "_blank"
                )
              }
              className={`
        flex
        items-center
        justify-center
        gap-2
        rounded-xl
        py-3
        text-[12px]
        font-semibold
        transition-all
        hover:opacity-90
        ${cfg.actionBg}
        ${cfg.actionText}
      `}
            >
              <FileText className="h-4 w-4" />

              View Report

              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            {/* DOWNLOAD REPORT */}

            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}api/banks/download-report/${bank.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
        flex
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-[#c8a21a]
        bg-white
        py-3
        text-[12px]
        font-semibold
        text-[#c8a21a]
        transition-all
        hover:bg-[#fffaf0]
      "
            >
              <Download className="h-4 w-4" />

              Download
            </a>

          </div>
        )}
      </div>
    </div>
  );
}
export default DetailPanel
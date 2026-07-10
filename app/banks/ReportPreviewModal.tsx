"use client";

import { ArrowRight, Crown, FileText, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  bankName: string;
  previewUrl: string;
  onClose: () => void;
}

// Shown when a user without an active plan clicks "View Report".
// Embeds the server-truncated (1-2 page) preview PDF and pins an
// upgrade CTA over the bottom of it. The full report is never sent
// to the browser here — the security boundary lives on the server,
// this is purely presentation.
export default function ReportPreviewModal({
  bankName,
  previewUrl,
  onClose,
}: Props) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#051933]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="relative flex shrink-0 items-center justify-between bg-[#051933] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <FileText className="h-4 w-4 text-[#c8a21a]" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c8a21a]">
                Report Preview
              </p>
              <p className="text-[13px] leading-snug text-white">{bankName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-colors hover:bg-white/20"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Preview */}
        <div className="relative flex-1 overflow-hidden bg-[#f5f1ea]">
          <iframe
            src={`${previewUrl}#toolbar=0&navpanes=0`}
            title="Report preview"
            className="h-full w-full border-none"
          />

          {/* Fade so the cutoff feels intentional, not broken */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/90 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-6 pt-2">
            <p className="max-w-sm text-center text-[12px] text-[#64748b]">
              You&apos;re viewing the first pages for free. Upgrade to Premium
              to read the full halachic research report and posek rulings.
            </p>

            <button
              onClick={() => router.push("/plan")}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-2xl bg-[#c8a21a] px-6 py-3 text-[13px] font-semibold text-[#051933] transition-all hover:-translate-y-0.5 hover:bg-[#d7b52f]"
            >
              <Crown className="h-4 w-4" />
              Unlock Full Report
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
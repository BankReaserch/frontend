"use client";

import { ArrowRight, Crown, FileText, FileWarning, Lock, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  bankName: string;
  previewUrl: string;
  onClose: () => void;
}

type PreviewStatus = "loading" | "ready" | "unavailable";
export default function ReportPreviewModal({
  bankName,
  previewUrl,
  onClose,
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<PreviewStatus>("loading");

  useEffect(() => {
    let cancelled = false;
    const checkPreview = async () => {
      try {
        const res = await fetch(previewUrl, { method: "HEAD" });
        const contentType = res.headers.get("content-type") || "";

        if (!cancelled) {
          setStatus(
            res.ok && contentType.includes("pdf")
              ? "ready"
              : "unavailable"
          );
        }
      } catch {
        if (!cancelled) setStatus("unavailable");
      }
    };

    checkPreview();

    return () => {
      cancelled = true;
    };
  }, [previewUrl]);

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
          {status === "loading" && (
            <div className="flex h-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#c8a21a] border-t-transparent" />
            </div>
          )}

          {status === "unavailable" && (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c8a21a]/20 bg-[#c8a21a]/10">
                <FileWarning className="h-6 w-6 text-[#c8a21a]" />
              </div>

              <div>
                <p className="font-serif text-lg text-[#051933]">
                  Preview not ready yet
                </p>
                <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-[#64748b]">
                  We haven&apos;t generated a free preview for this report
                  yet. Upgrade to Premium for full access, or check back
                  soon.
                </p>
              </div>

              <button
                onClick={() => router.push("/plan")}
                className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-[#c8a21a] px-6 py-3 text-[13px] font-semibold text-[#051933] transition-all hover:-translate-y-0.5 hover:bg-[#d7b52f]"
              >
                <Crown className="h-4 w-4" />
                Upgrade to View Full Report
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {status === "ready" && (
            <div className="relative h-full w-full">
              <iframe
                src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                title="Report preview"
                tabIndex={-1}
                className="pointer-events-none h-full w-full scale-105 select-none border-none blur-lg"
              />
              <div className="absolute inset-0 bg-white/50" />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#051933] shadow-lg">
                  <Lock className="h-6 w-6 text-[#c8a21a]" />
                </div>

                <div>
                  <p className="font-serif text-xl text-[#051933]">
                    This report is locked
                  </p>
                  <p className="mt-2 max-w-sm whitespace-nowrap text-[13px] leading-relaxed text-[#475569]">
                    Upgrade to Premium to read the full research report for {bankName}.
                  </p>
                </div>
                <button
                  onClick={() => router.push("/plan")}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#c8a21a] px-6 py-3 text-[13px] font-semibold text-[#051933] transition-all hover:-translate-y-0.5 hover:bg-[#d7b52f]"
                >
                  <Crown className="h-4 w-4" />
                  Upgrade to View Full Report
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
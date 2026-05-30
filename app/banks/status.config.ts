import { Status } from "./page";

export const STATUS_CFG: Record<
  Status,
  { label: string; dotClass: string; badgeBg: string; badgeText: string; actionBg?: string; actionText?: string }
> = {
  mehudar: {
    label: "Mehudar",
    dotClass: "bg-emerald-500",
    badgeBg: "bg-emerald-500/15",
    badgeText: "text-emerald-700",
  },
  compliant: {
    label: "Compliant",
    dotClass: "bg-blue-500",
    badgeBg: "bg-blue-500/15",
    badgeText: "text-blue-700",
  },
  conditional: {
    label: "Conditional",
    dotClass: "bg-amber-500",
    badgeBg: "bg-amber-500/15",
    badgeText: "text-amber-700",
    actionBg: "bg-[#c8a21a]",
    actionText: "text-[#051933]",
  },
  questionable: {
    label: "Questionable",
    dotClass: "bg-orange-500",
    badgeBg: "bg-orange-500/15",
    badgeText: "text-orange-700",
    actionBg: "bg-orange-500",
    actionText: "text-white",
  },
  noncompliant: {
    label: "Noncompliant",
    dotClass: "bg-red-500",
    badgeBg: "bg-red-500/15",
    badgeText: "text-red-700",
    actionBg: "bg-red-600",
    actionText: "text-white",
  },
  undetermined: {
    label: "Undetermined",
    dotClass: "bg-slate-400",
    badgeBg: "bg-slate-400/15",
    badgeText: "text-slate-600",
  },
};


export const STATUS_DESCRIPTIONS: Record<Status, string> = {
  mehudar: "No known Jewish ownership or leadership involvement.",
  compliant: "No Jewish ownership with material influence.",
  conditional: "Permitted only with a valid heter iska.",
  questionable: "Some information requires clarification.",
  noncompliant: "Halachically problematic.",
  undetermined: "Insufficient data to determine status.",
};
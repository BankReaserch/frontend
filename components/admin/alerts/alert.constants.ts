// components/admin/alerts/alert.constants.ts

import {
  AlertTriangle,
  ShieldAlert,
  TrendingUp,
  Info,
} from "lucide-react";

import {
  AlertType,
} from "@/types/alert";

export const alertStyles: Record<
  AlertType,
  string
> = {
  warning:
    "bg-yellow-500/10 border-yellow-500/20 text-yellow-600",

  danger:
    "bg-red-500/10 border-red-500/20 text-red-600",

  success:
    "bg-green-500/10 border-green-500/20 text-green-600",

  info:
    "bg-blue-500/10 border-blue-500/20 text-blue-600",
};

export const alertIcons: Record<
  AlertType,
  any
> = {
  warning:
    AlertTriangle,

  danger:
    ShieldAlert,

  success:
    TrendingUp,

  info: Info,
};
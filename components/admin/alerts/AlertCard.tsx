"use client";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import {
  alertIcons,
  alertStyles,
} from "./alert.constants";

import type {
  Alert,
} from "../../../app/alert/page";

type Props = {
  alert: Alert;

  onEdit: (
    alert: Alert
  ) => void;

  onDelete: (
    id: string
  ) => void;
};

export default function AlertCard({
  alert,
  onEdit,
  onDelete,
}: Props) {

  const Icon =
    alertIcons[
      alert.type
    ];

  return (
    <div className="group relative h-[430px] overflow-hidden rounded-[36px] border border-white/60 bg-white/75 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col">

      {/* SOFT GLOW */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-[#f6efe4]/60 pointer-events-none" />

      {/* CONTENT */}
      <div className="relative flex flex-col h-full p-7">

        {/* TOP */}
        <div className="flex items-start justify-between">

          {/* ICON */}
          <div
            className={`w-16 h-16 rounded-[24px] border flex items-center justify-center backdrop-blur-md ${alertStyles[alert.type]}`}
          >

            <Icon className="w-7 h-7" />

          </div>

          {/* STATUS */}
          <div
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide ${
              alert.isActive
                ? "bg-green-500/10 text-green-600 border border-green-500/10"
                : "bg-gray-200/70 text-gray-600"
            }`}
          >

            {alert.isActive
              ? "Active"
              : "Inactive"}

          </div>

        </div>

        {/* BODY */}
        <div className="flex-1 flex flex-col mt-8 min-h-0">

          {/* TITLE */}
          <h2 className="font-serif text-[52px] leading-[0.95] tracking-[-0.03em] text-[#051933] break-words">

            {alert.title}

          </h2>

          {/* MESSAGE */}
          <div className="mt-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">

            <p className="text-[#64748b] text-[15px] leading-8">

              {alert.message}

            </p>

          </div>

        </div>

        {/* FOOTER */}
        <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[#efe7db]">

          {/* EDIT */}
          <button
            onClick={() =>
              onEdit(alert)
            }
            className="flex-1 h-14 rounded-2xl bg-[#faf7f2] hover:bg-[#f6f1e8] border border-[#ece2d4] transition-all duration-300 flex items-center justify-center gap-2 group/edit"
          >

            <Pencil className="w-4 h-4 text-[#051933] group-hover/edit:scale-110 transition-transform" />

            <span className="text-sm font-medium text-[#051933]">

              Edit

            </span>

          </button>

          {/* DELETE */}
          <button
            onClick={() =>
              onDelete(
                alert._id
              )
            }
            className="w-14 h-14 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-100 transition-all duration-300 flex items-center justify-center"
          >

            <Trash2 className="w-5 h-5 text-red-500" />

          </button>

        </div>

      </div>

    </div>
  );
}
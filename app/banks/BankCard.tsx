"use client";

import StatusBadge from "./Statusbadge";
import { BankType } from "../../components/admin/bank/bank.types";

type Props = {
  bank: BankType;
  selected: boolean;
  onClick: () => void;
};

export default function BankCard({ bank, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-2xl bg-white border text-left
        transition-all duration-200 hover:shadow-lg focus:outline-none
        focus-visible:ring-2 focus-visible:ring-[#c8a21a]
        ${selected
          ? "border-[#c8a21a] border-2 shadow-[0_0_0_3px_rgba(200,162,26,0.12)]"
          : "border-[#e8e2d6] hover:border-[#c8a21a]/40"
        }
      `}
    >
      {/* Cover image / gradient header */}
      <div className="relative h-40 overflow-hidden bg-[#f5f1ea]">
        {bank.coverImage ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}uploads/bank-images/${bank.coverImage}`}
            alt={bank.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Fallback: navy gradient with bank initial */
          <div className="h-full w-full bg-gradient-to-br from-[#051933] to-[#0c294d] flex items-center justify-center">
            <span className="font-serif text-5xl text-[#c8a21a]/30 select-none">
              {bank.name.trim().charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        {/* Gradient overlay so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>

      {/* Card content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-serif text-[16px] text-[#051933] leading-snug line-clamp-2">
            {bank.name}
          </h3>
          <p className="text-[11px] text-[#94a3b8] mt-1">{bank.type}</p>
        </div>

        <div className="mb-3">
          <StatusBadge status={bank.status} />
        </div>

        {bank.hq && (
          <p className="text-[11px] text-[#64748b] truncate">{bank.hq}</p>
        )}
      </div>

      {/* Selected checkmark badge */}
      {selected && (
        <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#c8a21a] shadow-md">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#051933" strokeWidth="3">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
      )}
    </button>
  );
}
"use client";

import StatusBadge from "./Statusbadge";
import { BankType } from "../../components/admin/bank/bank.types";

type Props = {
  bank: BankType;
  selected: boolean;
  onClick: () => void;
};

export default function BankCard({
  bank,
  selected,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        group
        overflow-hidden
        rounded-2xl
        bg-white
        border
        text-left
        transition-all
        hover:shadow-lg
        ${
          selected
            ? "border-[#c8a21a] border-2"
            : "border-[#e8e2d6]"
        }
      `}
    >
      <div className="relative h-40 overflow-hidden bg-[#f5f1ea]">
        {bank.coverImage ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}uploads/bank-images/${bank.coverImage}`}
            alt={bank.name}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

        ) : (

          <div className="h-full w-full bg-gradient-to-br from-[#051933] to-[#0c294d]" />

        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      </div>

      {/* CONTENT */}

      <div className="p-5">

        <div className="mb-3">

          <h3 className="font-serif text-lg text-[#051933]">

            {bank.name}

          </h3>

          <p className="text-xs text-[#94a3b8] mt-1">

            {bank.type}

          </p>

        </div>

        <div className="mb-4">

          <StatusBadge
            status={bank.status}
          />

        </div>

        <p className="text-xs text-[#64748b]">

          {bank.hq}

        </p>

      </div>
    </button>
  );
}
// "use client";

// import StatusBadge from "./Statusbadge";
// import { Calendar } from "lucide-react";
// import { BankType } from "../../components/admin/bank/bank.types";

// type Props = {
//   bank: BankType;
//   selected: boolean;
//   onClick: () => void;
// };

// export default function BankCard({ bank, selected, onClick }: Props) {
//   return (
//     <button
//       onClick={onClick}
//       className={`
//         group relative overflow-hidden rounded-2xl bg-white border text-left
//         transition-all duration-200 hover:shadow-lg focus:outline-none
//         focus-visible:ring-2 focus-visible:ring-[#c8a21a]
//         ${selected
//           ? "border-[#c8a21a] border-2 shadow-[0_0_0_3px_rgba(200,162,26,0.12)]"
//           : "border-[#e8e2d6] hover:border-[#c8a21a]/40"
//         }
//       `}
//     >
//       {/* Cover image / gradient header */}
//       <div className="relative h-40 overflow-hidden bg-[#f5f1ea]">
//         {bank.coverImage ? (
//           <img
//             src={`${process.env.NEXT_PUBLIC_API_URL}uploads/bank-images/${bank.coverImage}`}
//             alt={bank.name}
//             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//           />
//         ) : (
//           /* Fallback: navy gradient with bank initial */
//           <div className="h-full w-full bg-gradient-to-br from-[#051933] to-[#0c294d] flex items-center justify-center">
//             <span className="font-serif text-5xl text-[#c8a21a]/30 select-none">
//               {bank.name.trim().charAt(0).toUpperCase()}
//             </span>
//           </div>
//         )}
//         {/* Gradient overlay so text is always readable */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
//       </div>

//       {/* Card content */}
//       <div className="p-5">
//         <div className="mb-3">
//           <h3 className="font-serif text-[16px] text-[#051933] leading-snug line-clamp-2">
//             {bank.name}
//           </h3>
//           <p className="text-[11px] text-[#94a3b8] mt-1">{bank.type}</p>
//         </div>

//         <div className="mb-3">
//           <StatusBadge status={bank.status} />
//         </div>

//         <div className="mt-3 border-t border-[#f1ede6] pt-3 space-y-2">
//           {bank.hq && (
//             <p className="text-[11px] text-[#64748b] truncate">
//               {bank.hq}
//             </p>
//           )}

//           {bank.lastReviewed && (
//             <div className="inline-flex items-center gap-1.5 rounded-full bg-[#faf6ea] border border-[#eadfb9] px-2.5 py-1 text-[10px] font-medium text-[#8b6b00]">
//               <Calendar className="h-3 w-3" />
//               Reviewed{" "}
//               {new Date(bank.lastReviewed).toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//                 year: "numeric",
//               })}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Selected checkmark badge */}
//       {selected && (
//         <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#c8a21a] shadow-md">
//           <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#051933" strokeWidth="3">
//             <path d="M20 6 9 17l-5-5" />
//           </svg>
//         </div>
//       )}
//     </button>
//   );
// } 


"use client";

import Link from "next/link";
import StatusBadge from "./Statusbadge";
import { Calendar, ArrowRight, MessageSquarePlus, HelpCircle } from "lucide-react";
import { BankType } from "../../components/admin/bank/bank.types";

type Props = {
  bank: BankType;
  selected: boolean;
  onClick: () => void;
};

export default function BankCard({ bank, selected, onClick }: Props) {
  return (
    <div
      className={`
        group/card relative overflow-hidden rounded-2xl bg-white border
        transition-all duration-200 hover:shadow-lg
        ${selected
          ? "border-[#c8a21a] border-2 shadow-[0_0_0_3px_rgba(200,162,26,0.12)]"
          : "border-[#e8e2d6] hover:border-[#c8a21a]/40"
        }
      `}
    >
      <button
        onClick={onClick}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c8a21a]"
      >
        {/* Cover image / gradient header */}
        <div className="relative h-40 overflow-hidden bg-[#f5f1ea]">
          {bank.coverImage ? (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}uploads/bank-images/${bank.coverImage}`}
              alt={bank.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
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

          <div className="mt-3 border-t border-[#f1ede6] pt-3 space-y-2">
            {bank.hq && (
              <p className="text-[11px] text-[#64748b] truncate">
                {bank.hq}
              </p>
            )}

            {bank.lastReviewed && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#faf6ea] border border-[#eadfb9] px-2.5 py-1 text-[10px] font-medium text-[#8b6b00]">
                <Calendar className="h-3 w-3" />
                Reviewed{" "}
                {new Date(bank.lastReviewed).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            )}
          </div>

          {/* View details hint */}
          <div className="mt-4 flex items-center justify-between text-[11px] font-medium text-[#8b6b00] opacity-80 group-hover/card:opacity-100 transition-opacity">
            <span>View More</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/card:translate-x-0.5" />
          </div>
        </div>
      </button>

      {/* Contact / feedback footer — sits outside the clickable card body
          so these links never trigger card selection */}
      <div className="border-t border-[#f1ede6] bg-[#fbf9f5] px-5 py-3.5 space-y-2">
        <Link
          href="/contact"
          className="group flex items-center gap-2 rounded-md text-[11px] font-medium text-[#64748b] transition-colors hover:text-[#8b6b00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a21a]"
        >
          <MessageSquarePlus className="h-3.5 w-3.5 shrink-0 text-[#c8a21a]/80 transition-colors group-hover:text-[#8b6b00]" />
          <span className="underline decoration-transparent underline-offset-2 transition-colors group-hover:decoration-[#c8a21a]/40">
            Submit info regarding this bank
          </span>
        </Link>

        <Link
          href="/contact"
          className="group flex items-center gap-2 rounded-md text-[11px] text-[#94a3b8] transition-colors hover:text-[#8b6b00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a21a]"
        >
          <HelpCircle className="h-3.5 w-3.5 shrink-0 text-[#94a3b8] transition-colors group-hover:text-[#8b6b00]" />
          <span className="underline decoration-transparent underline-offset-2 transition-colors group-hover:decoration-[#c8a21a]/40">
            Request more info for this bank
          </span>
        </Link>
      </div>

      {/* Selected checkmark badge */}
      {selected && (
        <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#c8a21a] shadow-md">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#051933" strokeWidth="3">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
      )}
    </div>
  );
}


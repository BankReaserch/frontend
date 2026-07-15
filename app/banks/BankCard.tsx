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
import {
  Calendar,
  Globe,
  FileText,
  MapPin,
  MessageSquarePlus,
  HelpCircle,
} from "lucide-react";
import { BankType } from "../../components/admin/bank/bank.types";

type Props = {
  bank: BankType;
  onViewReport?: (bank: BankType) => void;
};

export default function BankCard({ bank, onViewReport }: Props) {
  return (
    <div className="group/card relative overflow-hidden rounded-2xl bg-white border border-[#e8e2d6] transition-all duration-200 hover:shadow-lg hover:border-[#c8a21a]/40">
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
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-[16px] text-[#051933] leading-snug line-clamp-2">
              {bank.name}
            </h3>

            {bank.website && (
              <a
                href={bank.website.startsWith("http") ? bank.website : `https://${bank.website}`}
                target="_blank"
                rel="noopener noreferrer"
                title={bank.website}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#eadfb9] bg-[#faf6ea] text-[#8b6b00] transition-colors hover:bg-[#c8a21a] hover:text-white"
              >
                <Globe className="h-3 w-3" />
              </a>
            )}
          </div>
          <p className="text-[11px] text-[#94a3b8] mt-1">{bank.type}</p>

          {bank.hq && (
            <p className="mt-1.5 flex items-center gap-1 text-[11px] text-[#64748b]">
              <MapPin className="h-3 w-3 shrink-0 text-[#c8a21a]/70" />
              <span className="truncate">{bank.hq}</span>
            </p>
          )}
        </div>

        <div className="mb-3">
          <StatusBadge status={bank.status} />
        </div>

        <div className="mt-3 border-t border-[#f1ede6] pt-3 space-y-2">
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

        {/* Public info is visible to everyone by default */}
        {bank.summary && (
          <div className="mt-3 border-t border-[#f1ede6] pt-3">
            <p className="mb-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
              Public Information
            </p>
            <p className="text-[12px] leading-relaxed text-[#475569] line-clamp-3">
              {bank.summary}
            </p>
          </div>
        )}

        {bank.publicInfo && bank.publicInfo !== bank.summary && (
          <div className="mt-3">
            <p className="mb-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
              Notes
            </p>
            <p className="text-[12px] leading-relaxed text-[#475569] line-clamp-3">
              {bank.publicInfo}
            </p>
          </div>
        )}

        {bank.reportUrl && (
          <button
            onClick={() => onViewReport?.(bank)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#051933] px-4 py-2.5 text-[12px] font-semibold text-[#c8a21a] transition-all hover:-translate-y-0.5 hover:bg-[#0c294d]"
          >
            <FileText className="h-3.5 w-3.5" />
            View Full Report
          </button>
        )}
      </div>

      {/* Contact / feedback footer */}
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
    </div>
  );
}
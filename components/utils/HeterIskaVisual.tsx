import { ShieldCheck, Users, Scale, ScrollText } from "lucide-react";
import Link from "next/link";

export default function HeterIskaVisual() {
  return (
    <div className="relative flex h-full min-h-[460px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#E7E2D9]  p-10">
      {/* BACKGROUND TEXTURE */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle,#1A2B3C0d_1px,transparent_1px)] bg-[length:18px_18px]"
      />

      {/* GLOW ACCENTS */}
      <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#C8A75B]/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#1A2B3C]/5 blur-3xl" />

      {/* DIAGRAM */}
      <div className="relative h-64 w-64">
        {/* CONNECTOR LINES */}
        <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full">
          <line x1="120" y1="120" x2="120" y2="28" stroke="#C8A75B" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.5" />
          <line x1="120" y1="120" x2="46" y2="200" stroke="#C8A75B" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.5" />
          <line x1="120" y1="120" x2="194" y2="200" stroke="#C8A75B" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.5" />
        </svg>

        {/* CENTER HUB */}
        <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1A2B3C] ring-4 ring-[#F1E7D5]">
          <ScrollText className="h-8 w-8 text-[#C8A75B]" strokeWidth={1.5} />
        </div>

        {/* TOP SATELLITE */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#F1E7D5]">
            <ShieldCheck className="h-5 w-5 text-[#C8A75B]" strokeWidth={1.75} />
          </div>
          <p className="text-xs text-gray-500">Protection</p>
        </div>

        {/* BOTTOM LEFT SATELLITE */}
        <div className="absolute bottom-0 left-0 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#F1E7D5]">
            <Users className="h-5 w-5 text-[#C8A75B]" strokeWidth={1.75} />
          </div>
          <p className="text-xs text-gray-500">Clarity</p>
        </div>

        {/* BOTTOM RIGHT SATELLITE */}
        <div className="absolute bottom-0 right-0 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#F1E7D5]">
            <Scale className="h-5 w-5 text-[#C8A75B]" strokeWidth={1.75} />
          </div>
          <p className="text-xs text-gray-500">Oversight</p>
        </div>
      </div>

      <p className="relative mt-10 max-w-[220px] text-center text-sm leading-relaxed text-gray-500">
        Every heter iska we draft is built around these three principles.
      </p>

      <Link
        href="/heter-iska"
        className="relative mt-4 text-sm font-medium text-[#C8A75B] hover:text-[#1A2B3C] transition-colors"
      >
        Browse our resource library →
      </Link>
    </div>
  );
}
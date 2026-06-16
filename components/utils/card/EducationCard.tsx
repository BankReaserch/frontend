import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  description: string;
  label: string;
  icon: LucideIcon;
  gradient: string;
  cta: string;
};

export default function EducationCard({
  title,
  description,
  label,
  icon: Icon,
  gradient,
  cta,
}: Props) {
  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-[#E7E2D9] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#C8A75B]/40 hover:shadow-[0_12px_32px_-8px_rgba(200,167,91,0.25)]">
      {/* ICON BADGE */}
      <div
        className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-sm transition-transform duration-300 group-hover:scale-105`}
      >
        <Icon className="h-6 w-6 text-white" strokeWidth={1.75} />
      </div>

      {/* EYEBROW */}
      <p className="mb-3 text-xs font-medium tracking-[0.2em] text-[#C8A75B]">
        {label}
      </p>

      {/* TITLE */}
      <h3 className="mb-3 font-serif text-xl leading-snug text-[#1A2B3C]">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="mb-8 flex-grow text-sm leading-relaxed text-gray-500">
        {description}
      </p>

      {/* CTA */}
      <span className="inline-flex items-center gap-2 text-sm font-medium text-[#1A2B3C] transition-colors group-hover:text-[#C8A75B] cursor-pointer">
        {cta}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2}
        />
      </span>
    </div>
  );
}
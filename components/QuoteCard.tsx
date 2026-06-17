import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function QuoteCard() {
  return (
    <div className="bg-[#0B1C2C] text-white rounded-2xl p-8 md:p-10 relative shadow-lg">

      {/* Decorative quote mark */}
      <div className="absolute top-6 left-6 text-white/10 text-6xl font-serif">
        “
      </div>

      <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
       Our leadership is supported by a dedicated team of rabbanim, dayanim, and professionals who work tirelessly to provide guidance, 
       education, and support in all areas of ribis. Click below to meet the people behind the organization.
      </p>

     <Link
  href="/about#team"
  className="
    inline-flex items-center gap-2
    rounded-full
    border border-[#C8A75B]/30
    bg-[#C8A75B]/10
    px-5 py-2.5
    text-sm font-medium
    text-[#D6B56A]
    transition-all duration-300
    hover:border-[#C8A75B]
    hover:bg-[#C8A75B]/15
    hover:shadow-[0_0_20px_rgba(200,167,91,0.15)]
    group
  "
>
  Meet Our Poskim and Staff

  <ArrowRight
    size={15}
    className="transition-transform duration-300 group-hover:translate-x-1"
  />
</Link>
    </div>
  );
}
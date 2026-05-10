type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  linkText: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
  linkText,
}: FeatureCardProps) {
  return (
    <div className="relative group bg-[#F8F6F2] border border-[#E7E2D9] rounded-2xl p-8 transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden">
      
      {/* ICON */}
      <div className="w-12 h-12 rounded-xl bg-[#EFE6D6] flex items-center justify-center mb-6 text-xl">
        {icon}
      </div>

      {/* TITLE */}
      <h3 className="text-[#1A2B3C] text-xl font-semibold mb-3">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
        {description}
      </p>

      {/* LINK */}
      <div className="text-[#C8A75B] text-sm font-medium flex items-center gap-1 cursor-pointer">
        {linkText}
        <span className="group-hover:translate-x-1 transition">→</span>
      </div>

      {/* 🔥 PREMIUM HOVER LINE */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#C8A75B] transition-all duration-500 group-hover:w-full" />
    </div>
  );
}
export default function GuidedStrip() {
  const poskim = [
    "Harav Pinchos Vind shlit\"a",
    "Harav Yitzchok Zilberstein shlit\"a",
    "Harav Ari Marberger shlit\"a",
    "Harav Shmuel Honigwachs shlit\"a",
    "Harav Shamai Kehas Gross shlit\"a",
  ];

  return (
    <div className="w-full bg-[#13263A] border-t border-white/5 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-sm">

        {/* LEFT LABEL */}
        <div className="text-[#C8A75B] tracking-wider whitespace-nowrap">
          GUIDED BY LEADING POSKIM
        </div>

        {/* DIVIDER */}
        <div className="hidden md:block w-px h-5 bg-white/20" />

        {/* NAMES */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-300">
          {poskim.map((name, index) => (
            <span key={index} className="whitespace-nowrap">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
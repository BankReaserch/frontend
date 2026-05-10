const rabbis = [
  "Rabbi Baruch Moses",
  "Rabbi Shmuel Poltman",
  "Rabbi Yechiel Blum",
  "Rabbi Tzvi Smoke",
  "Rabbi Yaakov Yitzchok Jacob",
  "Rabbi Yehuda Framowitz",
];

export default function RabbiList() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
      
      <h3 className="text-[#C8A75B] mb-4">Our Rabbanim</h3>

      <div className="space-y-4">
        {rabbis.map((name, i) => {
          const initials = name
            .split(" ")
            .slice(1, 3)
            .map((n) => n[0])
            .join("");

          return (
            <div
              key={i}
              className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-none"
            >
              {/* INITIALS */}
              <div className="w-9 h-9 rounded-full bg-[#C8A75B]/20 text-[#C8A75B] flex items-center justify-center text-xs font-semibold">
                {initials}
              </div>

              <span className="text-white/90 text-sm">{name}</span>
            </div>
          );
        })}
      </div>

      <p className="text-[#C8A75B] text-sm mt-4">
        + 4 more Rabbanim on staff
      </p>
    </div>
  );
}
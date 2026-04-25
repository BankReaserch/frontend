export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#05070B]">

      {/* BASE GRADIENT */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,180,80,0.15),transparent_40%)]" />

      {/* GOLD GLOW (RIGHT SIDE ARC FEEL) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_60%,rgba(255,190,90,0.25),transparent_35%)]" />

      {/* DARK LEFT VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(5,7,11,1),transparent_60%)]" />

      {/* GRID (VERY SUBTLE) */}
      <div className="absolute inset-0 opacity-[0.06] 
        bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),
             linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]
        bg-[size:60px_60px]" 
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">

          <p className="text-yellow-500 text-sm mb-4 tracking-wide">
            • HI, I'M
          </p>

          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-tight">
            Champ
          </h1>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-xl">
            Full-stack developer building and maintaining high-performance, reliable digital products.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-[#F5B301] text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
              View My Work →
            </button>

            <button className="border border-gray-700 text-gray-300 px-6 py-3 rounded-lg hover:bg-white/5 transition">
              Learn More ↓
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0B1C2C] overflow-hidden">
      
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* RADIAL GLOW */}
      <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-[#1b2e44] rounded-full blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center relative z-10">

        {/* LEFT CONTENT */}
        <div>
          <div className="inline-block border border-[#C8A75B] text-[#C8A75B] text-xs px-4 py-1 rounded-full mb-6">
            Welcome To RIBIS
          </div>

          <p className="text-[#C8A75B] tracking-[0.3em] text-xs mb-4">
            AWARENESS · INFORMATION · APPLICATION
          </p>

          <h1 className="text-white text-4xl md:text-6xl font-serif leading-tight mb-6">
            Halachic Clarity <br />
            for <span className="text-[#C8A75B] italic">Modern</span> <br />
            Finance<span className="text-[#C8A75B]">.</span>
          </h1>

          <p className="text-gray-400 max-w-lg mb-8">
            Standing at the intersection of intricate laws of ribis and the
            growing complexity of modern finance, Ribis.org brings halachic
            integrity to your everyday financial dealings.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-[#C8A75B] text-black px-6 py-3 rounded-md font-medium">
              Explore Bank Directory
            </button>

            <button className="border border-gray-500 text-white px-6 py-3 rounded-md">
              Ask a Sha'alah →
            </button>
          </div>
        </div>

        {/* RIGHT CARDS */}
        <div className="space-y-6">

          {/* STATS CARD */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-white">
            <p className="text-xs text-gray-400 mb-4">TRUSTED AT SCALE</p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-semibold text-[#C8A75B]">500+</h3>
                <p className="text-sm text-gray-400">Banks Researched</p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-[#C8A75B]">10+</h3>
                <p className="text-sm text-gray-400">Rabbanim on Call</p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-[#C8A75B]">100s</h3>
                <p className="text-sm text-gray-400">Shiurim Available</p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-[#C8A75B]">24/7</h3>
                <p className="text-sm text-gray-400">Hotline Access</p>
              </div>
            </div>
          </div>

          {/* QUOTE CARD */}
          <div className="bg-white/5 backdrop-blur-lg border border-[#C8A75B]/40 rounded-xl p-6 text-gray-300 italic text-sm">
            <p>
              "The need for a heter iska for shopkeepers and businesspeople is
              extremely great, and it is fitting for Rabbanim to institute in all
              communities that every merchant signs a heter iska..."
            </p>

            <p className="mt-4 text-[#C8A75B] not-italic">
              — Harav Moshe Shternbuch shlit"a
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
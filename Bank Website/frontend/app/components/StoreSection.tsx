export default function StoreSection() {
  return (
    <section className="bg-[#F4F1EC] py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* CONTAINER */}
        <div className="relative rounded-3xl border border-[#E7E2D9] bg-gradient-to-br from-[#F8F6F2] to-[#EFE8DA] p-8 md:p-12 overflow-hidden">

          {/* subtle glow */}
          <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-[#C8A75B]/10 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            {/* LEFT CONTENT */}
            <div className="max-w-xl">

              <p className="text-[#C8A75B] text-xs tracking-[0.3em] mb-4">
                SEFORIM STORE
              </p>

              <h2 className="text-[#1A2B3C] font-serif text-3xl md:text-5xl leading-tight mb-4">
                Browse Our <br className="hidden md:block" />
                Seforim Collection
              </h2>

              <p className="text-gray-500 leading-relaxed">
                A curated selection of seforim on hilchos ribis, authored by
                leading Rabbanim and available for online purchase. Expand your
                knowledge with trusted, authoritative texts.
              </p>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <button className="group flex items-center gap-3 bg-[#0B1C2C] text-white px-6 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">

                {/* SVG ICON */}
                <svg
                  className="w-5 h-5 text-[#C8A75B]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 7h5l2 9h8l2-6H7" />
                  <circle cx="10" cy="20" r="1" />
                  <circle cx="18" cy="20" r="1" />
                </svg>

                <span>Visit the Store</span>

                {/* arrow */}
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
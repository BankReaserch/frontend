import EducationCard from "./utils/card/EducationCard";


export default function EducationSection() {
  return (
    <section className="bg-[#F4F1EC] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-14 gap-6">
          <div>
            <p className="text-[#C8A75B] text-xs tracking-[0.3em] mb-4">
              EDUCATION
            </p>

            <h2 className="text-[#1A2B3C] font-serif text-4xl md:text-5xl leading-tight mb-4">
              Learn Hilchos <span className="text-[#C8A75B] italic">Ribis</span>
            </h2>

            <p className="text-gray-500 max-w-xl">
              Audio shiurim, practical bulletins, FAQs, and community programs —
              all in one place.
            </p>
          </div>

          <button className="bg-[#C8A75B] text-black px-6 py-3 rounded-lg font-medium whitespace-nowrap">
            View All Resources →
          </button>
        </div>

        {/* CONTAINER (IMPORTANT FOR PREMIUM LOOK) */}
        <div className="bg-white/40 border border-white/40 backdrop-blur-md rounded-3xl p-6 shadow-lg">

          <div className="grid lg:grid-cols-3 gap-6">

            {/* LEFT BIG CARD */}
            <div className="lg:col-span-2">
              <EducationCard
                variant="large"
                title="Shiurim on Hilchos Ribis"
                label="AUDIO LIBRARY"
                description="Access a growing library of audio classes presented by experienced Rabbanim — clear, practical, and available anytime."
                button="Explore Shiurim"
                gradient="from-[#0B1C2C] to-[#1E3A5F]"
                icon="🎧"
              />
            </div>

            {/* RIGHT GRID */}
            <div className="grid gap-6">

              <EducationCard
                title="Practical Articles"
                label="BULLETINS"
                description="Real-world ribis scenarios explained, rooted in classic sources."
                link="Read Articles"
                gradient="from-green-800 to-green-600"
                icon="📋"
              />

              <EducationCard
                title="Common Questions"
                label="FAQ"
                description="Clear answers to frequently asked ribis questions and terminology."
                link="View FAQs"
                gradient="from-indigo-900 to-purple-700"
                icon="❓"
              />

              <EducationCard
                variant="wide"
                title="Stay Updated"
                label="RIBIS ALERTS"
                description="Timely alerts on emerging issues and changes in financial halacha."
                button="Get Alerts"
                gradient="from-[#2B1A12] to-[#5A2E1E]"
                icon="🔔"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
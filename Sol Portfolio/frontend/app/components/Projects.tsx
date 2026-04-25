import Link from "next/link";

export default function Projects() {
  const launches = [
    { name: "Domz.com", url: "https://domz.com" },
    { name: "Ribis.org", url: "https://ribis.org" },
    { name: "HearthTend.com", url: "https://hearthtend.com" }
  ];

  return (
    <section className="px-6 pb-24 bg-[#05070B]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

        {/* LEFT - LIST */}
        <div className="bg-[#0B0F14] border border-[#1A1F26] rounded-2xl p-6">
          
          <h3 className="text-[#F5B301] text-sm mb-6">
            Recent Launches
          </h3>

          <div className="space-y-3">
            {launches.map((item) => (
              <Link 
                key={item.name}
                href={item.url}
                className="flex justify-between items-center px-4 py-3 rounded-lg bg-[#0A0E13] border border-[#1F2630] hover:border-[#F5B301]/40 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-gray-300 text-sm">{item.name}</span>
                <span className="text-gray-500">↗</span>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT - QUOTE CARD */}
        <div className="bg-[#0B0F14] border border-[#1A1F26] rounded-2xl p-8 flex items-center">
          <div>
            <p className="text-[#F5B301] text-3xl mb-4">"</p>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Building digital solutions that are reliable, scalable, and made to last.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
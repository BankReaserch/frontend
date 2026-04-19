import PoskimPill from "./PoskimPill";
import QuoteCard from "./QuoteCard";

export default function AboutSection() {
  const poskim = [
    "Harav Yitzchok Zilberstein shlit\"a",
    "Harav Shmuel Rosenberg shlit\"a",
    "Harav Shamai Kehas Gross shlit\"a",
    "Harav Shlomo Zafrani shlit\"a",
    "Harav Naftali Nussbaum shlit\"a",
  ];

  return (
    <section className="bg-[#F4F1EC] py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* LABEL */}
          <p className="text-[#C8A75B] text-xs tracking-[0.3em] mb-4">
            ABOUT US
          </p>

          {/* HEADING */}
          <h2 className="text-[#1A2B3C] font-serif text-4xl md:text-5xl leading-tight mb-6">
            Trusted Leadership <br />
            in <span className="text-[#C8A75B] italic">Ribis</span> Guidance
          </h2>

          {/* TEXT */}
          <p className="text-gray-500 mb-6 max-w-xl">
            Kav Haribis is a trusted leader in guiding individuals and businesses
            through the halachos of ribis, offering practical, day-to-day solutions
            for real-world situations.
          </p>

          <p className="text-gray-500 mb-8 max-w-xl">
            Founded by talmidim of Harav Pinchos Vind shlit"a, inspired by his
            worldwide network of Batei Hora'ah and his dedication to increasing
            awareness in hilchos ribis, Ribis.org is committed to advancing awareness
            and providing accurate, up-to-date guidance.
          </p>

          {/* POSKIM */}
          <p className="text-[#C8A75B] text-xs tracking-[0.3em] mb-4">
            SUPPORTED BY LEADING POSKIM
          </p>

          <div className="flex flex-wrap gap-3">
            {poskim.map((name, i) => (
              <PoskimPill key={i} name={name} />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <QuoteCard />
        </div>

      </div>
    </section>
  );
}
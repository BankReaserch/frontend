import PoskimPill from "./PoskimPill";
import QuoteCard from "./QuoteCard";

export default function AboutSection() {
 const poskim = [
  "Harav Pinchos Vind shlit\"a",
  "Harav Yitzchok Zilberstein shlit\"a",
  "Harav Shriel Rosenberg shlit\"a",
  "Harav Menachem Mendel Shafran shlit\"a",
  "Harav Naftali Nusbaum shlit\"a",
  "Harav Shamai Kehas Gross shlit\"a",
  "Harav Shlomo Zafrani shlit\"a",
  "Harav Ari Marberger shlit\"a",
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
          <h2 className="text-[#1A2B3C] font-serif text-4xl md:text-5xl leading-tight mb-6">
            Trusted Leadership <br />
            in <span className="text-[#C8A75B] italic">Ribis</span> Guidance
          </h2>
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
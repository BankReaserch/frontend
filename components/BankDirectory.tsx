import BankStatusBadge from "./BankStatusBadge";
import BankListCard from "./utils/card/BankListCard";


export default function BankDirectorySection() {
  return (
    <section className="bg-[#0B1C2C] py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* LABEL */}
          <p className="text-[#C8A75B] text-xs tracking-[0.3em] mb-6">
            BANK DIRECTORY
          </p>

          {/* HEADING */}
          <h2 className="text-white font-serif text-4xl md:text-5xl leading-tight mb-6">
            Know Your Bank&apos;s <br />
            <span className="text-[#C8A75B] italic">Kashrus</span> Status
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-400 max-w-lg mb-8 leading-relaxed">
            Our team conducts comprehensive, in-depth research to deliver clear,
            authoritative guidance on the kashrus status of financial institutions—based on rulings of leading Rabbanim and poskim.
          </p>

          {/* BADGES */}
          <div className="flex flex-wrap gap-3 mb-8">
            <BankStatusBadge status="mehudar" label="Mehudar" />
            <BankStatusBadge status="compliant" label="Compliant" />
            <BankStatusBadge status="conditional" label="Conditional" />
            <BankStatusBadge status="questionable" label="Questionable" />
            <BankStatusBadge status="noncompliant" label="Noncompliant" />
            <BankStatusBadge status="undetermined" label="Undetermined" />
          </div>

          {/* BUTTON */}
          <button className="bg-[#C8A75B] text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
            Search the Directory →
          </button>
        </div>

        {/* RIGHT UI */}
        <div>
          <BankListCard />
        </div>

      </div>
    </section>
  );
}
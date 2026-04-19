
import TemplateList from "./TemplateList";
import Step from "./utils/Step";

export default function HeterIskaSection() {
  return (
    <section className="bg-[#F4F1EC] py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">

        {/* LEFT */}
        <div>
          <p className="text-[#C8A75B] text-xs tracking-[0.3em] mb-4">
            HETER ISKA
          </p>

          <h2 className="text-[#1A2B3C] font-serif text-4xl md:text-5xl leading-tight mb-6">
            Structure Your Finances <br />
            with <span className="text-[#C8A75B] italic">Halachic</span> Integrity
          </h2>

          <p className="text-gray-500 mb-10 max-w-xl">
            A heter iska converts standard loans into compliant investment partnerships,
            protecting you from ribis concerns. Not all structures are equal —
            proper implementation matters.
          </p>

          {/* STEPS */}
          <div className="space-y-6 mb-10">
            <Step
              number="1"
              title="Avoid Ribis Issues"
              text="Poorly structured agreements can lead to prohibited ribis without proper intent."
            />
            <Step
              number="2"
              title="Clarity for All Parties"
              text="Ensure all sides clearly understand terms aligned with halachic standards."
            />
            <Step
              number="3"
              title="Rabbinic Oversight"
              text="Guidance ensures compliance not only technically, but in spirit."
            />
          </div>

          <button className="bg-[#C8A75B] text-black px-7 py-3 rounded-lg font-medium shadow hover:opacity-90">
            Request a Custom Heter Iska →
          </button>
        </div>

        {/* RIGHT */}
        <div>
          <TemplateList />
        </div>

      </div>
    </section>
  );
}
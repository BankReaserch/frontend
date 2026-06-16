
// import TemplateList from "./TemplateList";
// import Step from "./utils/Step";

// export default function HeterIskaSection() {
//   return (
//     <section className="bg-[#F4F1EC] py-24">
//       <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">

//         {/* LEFT */}
//         <div>
//           <p className="text-[#C8A75B] text-xs tracking-[0.3em] mb-4">
//             HETER ISKA
//           </p>

//           <h2 className="text-[#1A2B3C] font-serif text-4xl md:text-5xl leading-tight mb-6">
//             Structure Your Finances <br />
//             with <span className="text-[#C8A75B] italic">Halachic</span> Integrity
//           </h2>

//           <p className="text-gray-500 mb-10 max-w-xl">
//             A heter iska converts standard loans into compliant investment partnerships,
//             protecting you from ribis concerns. Not all structures are equal —
//             proper implementation matters.
//           </p>

//           {/* STEPS */}
//           <div className="space-y-6 mb-10">
//             <Step
//               number="1"
//               title="Avoid Ribis Issues"
//               text="Poorly structured agreements can lead to prohibited ribis without proper intent."
//             />
//             <Step
//               number="2"
//               title="Clarity for All Parties"
//               text="Ensure all sides clearly understand terms aligned with halachic standards."
//             />
//             <Step
//               number="3"
//               title="Rabbinic Oversight"
//               text="Guidance ensures compliance not only technically, but in spirit."
//             />
//           </div>

//           <button className="bg-[#C8A75B] text-black px-7 py-3 rounded-lg font-medium shadow hover:opacity-90">
//             Request a Custom Heter Iska →
//           </button>
//         </div>

//         {/* RIGHT */}
//         <div>
//           <TemplateList />
//         </div>

//       </div>
//     </section>
//   );
// }

import Link from "next/link";
import Step from "./utils/Step";
import Image from "next/image";

export default function HeterIskaSection() {
  return (
    <section className="bg-[#F4F1EC] py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT */}
          <div>
            {/* <p className="text-[#C8A75B] text-xs tracking-[0.35em] uppercase mb-5">
              Heter Iska
            </p> */}

            <h2 className="font-serif text-[#C8A75B] text-5xl md:text-6xl leading-tight">
              Heter Iska
              {/* <br />
              with{" "} */}
              {/* {" "} 
              <span className="italic text-[#C8A75B]">
                Iska
              </span> */}
            </h2>

            <p className="mt-2 text-lg text-slate-900 leading-relaxed max-w-xl">
              Ensure your business and personal financial agreements are properly structured in full alignment with halacha. 
              A heter iska converts standard loans into compliant investment partnerships, protecting you from potential ribis concerns.
            </p>

            <div className="space-y-5 mt-12">
              <Step
                number="1"
                title="Avoid Ribis Issues"
                text="Even well-intentioned agreements can result in prohibited ribis without proper structuring."
              />

              <Step
                number="2"
                title="Clarity and Protection"
                text="A well-drafted heter iska ensures both parties understand the terms and operate within halachic guidelines."
              />

              <Step
                number="3"
                title="Peace of Mind"
                text="Proper rabbinic oversight ensures your financial dealings remain fully compliant."
              />
            </div>

            <Link
              href="/heter-iska"
              className="inline-flex items-center gap-3 mt-10 bg-[#C8A75B] hover:opacity-90 transition px-8 py-4 rounded-xl font-medium text-black shadow-lg"
            >
              Learn More About Heter Iska
              <span>→</span>
            </Link>
          </div>

          {/* RIGHT */}
          <div className="relative">
            {/* glow */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#C8A75B]/10 rounded-full blur-3xl" />

            <div className="relative">
              {/* main image */}
              <div className="overflow-hidden rounded-[32px] border border-[#E7E2D9] shadow-2xl bg-white">
                <Image
                  src="/assets/certificate.png"
                  alt="Heter Iska Agreement"
                  width={900}
                  height={1200}
                  className="w-full h-[650px] object-contain"
                />
              </div>

              {/* floating info card */}
              <div className="absolute -bottom-8 -left-8 bg-[#0B1C2C] rounded-2xl p-7 shadow-2xl max-w-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-[#C8A75B] mb-3">
                  TRUSTED GUIDANCE
                </p>

                <h3 className="text-white text-2xl font-semibold leading-snug">
                  Built on Accepted
                  <br />
                  Halachic Standards
                </h3>

                <p className="text-slate-300 mt-4 text-sm leading-relaxed">
                  Properly structured agreements designed to address modern financial
                  arrangements while maintaining halachic compliance.
                </p>

                <Link
                  href="/heter-iska"
                  className="inline-flex items-center gap-2 mt-5 text-[#C8A75B] font-medium"
                >
                  Explore Resources →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Row */}
        <div className="grid md:grid-cols-3 gap-6 mt-24">
          <TrustCard
            title="Halachically Reviewed"
            text="Prepared according to accepted heter iska frameworks."
          />

          <TrustCard
            title="Business & Personal Use"
            text="Applicable to loans, partnerships, guarantors and more."
          />

          <TrustCard
            title="Clear Documentation"
            text="Designed to create transparency and understanding."
          />
        </div>
      </div>
    </section>
  );
}
function TrustCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="group bg-white/90 backdrop-blur border border-[#E7E2D9] rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="w-14 h-14 rounded-2xl bg-[#F3E8D0] flex items-center justify-center text-[#C8A75B] text-xl mb-5">
        ✦
      </div>

      <h3 className="font-semibold text-[#1A2B3C] text-xl mb-3">
        {title}
      </h3>

      <p className="text-slate-500 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
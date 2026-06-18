
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
import {
  FileCheck,
  BadgeCheck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function HeterIskaSection() {
  const items = [
    {
      icon: ShieldCheck,
      color: "bg-[#1D3A5F]",

      title: "Avoid Ribis Issues",
      description:
        "Even well-intentioned agreements can result in prohibited ribis without proper structuring.",
      link: "Get Agreement",
    },
    {
      icon: FileCheck,
      color: "bg-[#0E8A3D]",

      title: "Clarity and Protection",
      description:
        "A well-drafted heter iska ensures both parties understand the terms and operate within halachic guidelines.",
      link: "Review Details",
    },
    {
      icon: BadgeCheck,
      color: "bg-[#6D28D9]",

      title: "Peace of Mind",
      description:
        "Proper rabbinic oversight ensures your financial dealings remain fully compliant.",
      link: "View Process",
    },
  ];

  return (
    <section className="bg-[#F4F1EC] py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 mb-20">
          <div>
            <p className="text-[#C8A75B] uppercase tracking-[0.35em] text-sm mb-6">
              HETER ISKA
            </p>

            <h2 className="font-serif text-[#1A2B3C] text-5xl md:text-6xl leading-none">
              Modern Commerce Through{" "}
              <span className="text-[#C8A75B] italic">
                Heter Iska
              </span>
            </h2>

            <p className="mt-8 text-slate-500 text-xl max-w-3xl leading-relaxed">
              Ensure your business and personal financial agreements are
              structured according to Halacha through a clear and accepted
              Heter Iska framework.
            </p>
          </div>


        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  bg-white
                  border
                  border-[#E5DDD0]
                  rounded-[28px]
                  p-10
                  min-h-[360px]
                  flex
                  flex-col
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >
                <div
                  className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* <p className="mt-8 text-[#C8A75B] text-sm tracking-[0.25em] uppercase">
                  {item.label}
                </p> */}

                <h3 className="mt-4 text-[#1A2B3C] text-3xl font-serif leading-snug">
                  {item.title}
                </h3>

                <p className="mt-5 text-slate-500 leading-relaxed flex-grow">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
        {/* Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/heter-iska"
            className="
      inline-flex
      items-center
      justify-center
      gap-3
      bg-[#C8A75B]
      hover:opacity-90
      transition
      px-8
      py-5
      rounded-2xl
      text-lg
      text-black
      whitespace-nowrap
      min-w-[240px]
    "
          >
            Download a Heter Iska
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/heter-iska/request"
            className="
      inline-flex
      items-center
      justify-center
      gap-3
      border
      border-[#C8A75B]
      text-[#1A2B3C]
      hover:bg-white
      transition
      px-8
      py-5
      rounded-2xl
      text-lg
      whitespace-nowrap
      min-w-[240px]
    "
          >
            Request Custom Agreement
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
// export default function StoreSection() {
//   return (
//     <section className="bg-[#F4F1EC] py-20">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* CONTAINER */}
//         <div className="relative rounded-3xl border border-[#E7E2D9] bg-gradient-to-br from-[#F8F6F2] to-[#EFE8DA] p-8 md:p-12 overflow-hidden">

//           {/* subtle glow */}
//           <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-[#C8A75B]/10 blur-3xl rounded-full" />

//           <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

//             {/* LEFT CONTENT */}
//             <div className="max-w-xl">

//               <p className="text-[#C8A75B] text-xs tracking-[0.3em] mb-4">
//                 SEFORIM STORE
//               </p>

//               <h2 className="text-[#1A2B3C] font-serif text-3xl md:text-5xl leading-tight mb-4">
//                 Browse Our <br className="hidden md:block" />
//                 Seforim Collection
//               </h2>

//               <p className="text-gray-500 leading-relaxed">
//                 A curated selection of seforim on hilchos ribis, authored by
//                 leading Rabbanim and available for online purchase. Expand your
//                 knowledge with trusted, authoritative texts.
//               </p>
//             </div>

//             {/* CTA */}
//             <div className="flex-shrink-0">
//               <button className="group flex items-center gap-3 bg-[#0B1C2C] text-white px-6 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">

//                 {/* SVG ICON */}
//                 <svg
//                   className="w-5 h-5 text-[#C8A75B]"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M3 7h5l2 9h8l2-6H7" />
//                   <circle cx="10" cy="20" r="1" />
//                   <circle cx="18" cy="20" r="1" />
//                 </svg>

//                 <span>Visit the Store</span>

//                 {/* arrow */}
//                 <svg
//                   className="w-4 h-4 group-hover:translate-x-1 transition"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M5 12h14M13 6l6 6-6 6" />
//                 </svg>
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingCart } from "lucide-react";

export default function StoreSection() {
  return (
    <section className="bg-[#F4F1EC] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* OUTER WRAPPER */}
        <div className="relative rounded-[40px] p-[10px]">

          {/* OUTER BORDER */}
          <div className="absolute inset-0 rounded-[40px] border border-[#D8D1C5]" />

          {/* INNER CONTAINER */}
          <div className="relative overflow-hidden rounded-[34px] border border-[#E8E2D8] bg-gradient-to-br from-[#F8F6F2] to-[#EFE8DA] min-h-[430px] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">

            {/* GOLD GLOW */}
            <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C8A75B]/10 blur-[120px] rounded-full" />

            {/* DOT PATTERN */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(#C8A75B 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* CONTENT */}
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center p-10 md:p-16">

              {/* LEFT SIDE */}
              <div>

                {/* LABEL */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-px bg-[#C8A75B]" />
                  <span className="text-[#C8A75B] text-xs tracking-[0.35em] font-medium">
                    SEFORIM STORE
                  </span>
                </div>

                {/* HEADING */}
                <h2 className="font-serif text-[#10253B] text-4xl md:text-6xl leading-[1.05] mb-6">
                  Browse Our
                  <br />
                  Seforim Collection
                </h2>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-lg leading-relaxed max-w-lg mb-10">
                  A curated selection of seforim on hilchos ribis authored by
                  leading Rabbanim. Expand your knowledge with trusted,
                  authoritative texts available for online purchase.
                </p>

                {/* STATS */}
                <div className="flex gap-10 mb-10">

                  <div>
                    <div className="text-[#10253B] text-4xl font-serif">
                      25+
                    </div>
                    <div className="text-gray-500">
                      Seforim
                    </div>
                  </div>

                  <div>
                    <div className="text-[#10253B] text-4xl font-serif">
                      10+
                    </div>
                    <div className="text-gray-500">
                      Rabbanim
                    </div>
                  </div>

                  <div>
                    <div className="text-[#10253B] text-4xl font-serif">
                      100%
                    </div>
                    <div className="text-gray-500">
                      Authentic
                    </div>
                  </div>

                </div>

                {/* CTA */}
                <Link
                  href="/store"
                  className="inline-flex items-center gap-3 bg-[#071D34] text-white px-7 py-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5 text-[#C8A75B]" />

                  <span className="font-medium">
                    Visit the Store
                  </span>

                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* RIGHT SIDE */}
              <div className="hidden lg:flex justify-center items-center relative h-[360px]">

                {/* LEFT BOOK */}
                <div className="absolute left-8 rotate-[-12deg]">
                  <div className="relative w-[190px] h-[280px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-white bg-white">
                    <Image
                      src="/assets/book1.jpg"
                      alt="Book"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* CENTER BOOK */}
                <div className="absolute z-20">
                  <div className="relative w-[220px] h-[320px] rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.25)] border border-white bg-white">
                    <Image
                      src="/assets/book3.jpeg"
                      alt="Book"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* RIGHT BOOK */}
                <div className="absolute right-8 rotate-[12deg]">
                  <div className="relative w-[190px] h-[280px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-white bg-white">
                    <Image
                      src="/assets/book2.webp"
                      alt="Book"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* BADGE */}
                <div className="absolute -bottom-5 right-16 bg-white/95 backdrop-blur border border-[#E7E2D9] rounded-2xl px-5 py-3 shadow-xl">
                  <p className="text-[10px] tracking-[0.3em] text-[#C8A75B] mb-1">
                    FEATURED
                  </p>
                  <p className="text-[#10253B] font-medium">
                    Bestselling Titles
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
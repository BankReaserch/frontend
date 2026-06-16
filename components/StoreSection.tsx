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

        <div className="relative overflow-hidden rounded-[40px] border border-[#E7E2D9] bg-gradient-to-br from-[#F8F6F2] to-[#EFE8DA] min-h-[430px]">

          {/* Background Glow */}
          <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C8A75B]/10 blur-[120px] rounded-full" />

          {/* Pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(#C8A75B 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center p-10 md:p-16">

            {/* LEFT */}
            <div>

              {/* Heading Label */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-px bg-[#C8A75B]" />
                <span className="text-[#C8A75B] text-xs tracking-[0.35em] font-medium">
                  SEFORIM STORE
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-[#10253B] text-4xl md:text-6xl leading-[1.1] mb-6">
                Browse Our
                <br />
                Seforim Collection
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed max-w-lg mb-10">
                A curated selection of seforim on hilchos ribis authored by
                leading Rabbanim. Expand your knowledge with trusted,
                authoritative texts available for online purchase.
              </p>

              {/* Stats */}
              <div className="flex gap-10 mb-10">
                <div>
                  <p className="text-3xl font-serif text-[#10253B]">25+</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Seforim
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-serif text-[#10253B]">10+</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Rabbanim
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-serif text-[#10253B]">100%</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Authentic
                  </p>
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

            {/* RIGHT BOOK SHOWCASE */}
            <div className="hidden lg:flex justify-center items-center relative h-[340px]">

              {/* Back Book */}
              <div className="absolute left-10 rotate-[-10deg] hover:rotate-[-6deg] transition-all duration-500">
                <div className="w-[180px] h-[260px] rounded-2xl overflow-hidden shadow-2xl border border-white/50 bg-white">
                  <Image
                    src="/assets/book1.jpg"
                    alt="Book"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Center Book */}
              <div className="absolute z-20">
                <div className="w-[220px] h-[310px] rounded-2xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.25)] border border-white bg-white">
                  <Image
                    src="/assets/book3.jpeg"
                    alt="Book"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Front Book */}
              <div className="absolute right-10 rotate-[10deg] hover:rotate-[6deg] transition-all duration-500">
                <div className="w-[180px] h-[260px] rounded-2xl overflow-hidden shadow-2xl border border-white/50 bg-white">
                  <Image
                    src="/assets/book2.webp"
                    alt="Book"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 right-20 bg-white border border-[#E7E2D9] rounded-2xl px-5 py-3 shadow-xl">
                <p className="text-xs tracking-[0.25em] text-[#C8A75B] mb-1">
                  FEATURED
                </p>
                <p className="text-[#10253B] font-medium">
                  Bestselling Titles (PlaceHolder)
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
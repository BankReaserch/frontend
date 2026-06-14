// import Link from "next/link";
// import { ArrowUpRight } from "lucide-react";
// export default function Hero() {
//   return (
//     <section className="relative min-h-screen flex items-center bg-[#0B1C2C] overflow-hidden">

//       {/* GRID BACKGROUND */}
//       <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]" />

//       {/* RADIAL GLOW */}
//       <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-[#1b2e44] rounded-full blur-3xl opacity-40" />

//       <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center relative z-10">

//         {/* LEFT CONTENT */}
//         <div>
//           <div className="inline-block border border-[#C8A75B] text-[#C8A75B] text-xs px-4 py-1 rounded-full mb-6">
//             Welcome To RIBIS
//           </div>

//           <p className="text-[#C8A75B] tracking-[0.3em] text-xs mb-4">
//             AWARENESS · INFORMATION · APPLICATION
//           </p>

//           <h1 className="text-white text-4xl md:text-6xl font-serif leading-tight mb-6">
//             RIBIS  <br />
//             <span className="text-[#C8A75B] italic">for Modern</span> <br />
//             Finance<span className="text-[#C8A75B]">.</span>
//           </h1>

//           <p className="text-gray-400 max-w-lg mb-8">
//             Standing at the intersection of intricate laws of ribis and the
//             growing complexity of modern finance, Ribis.org brings halachic
//             integrity to your everyday financial dealings.
//           </p>

//           <div className="flex flex-wrap gap-4">
//             <Link href={'/banks'} className="bg-[#C8A75B] text-black px-6 py-3 rounded-md font-medium">
//               Explore Bank Directory
//             </Link>

//             <Link href={'/contact'} className="group border border-gray-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:border-white hover:bg-white/5 transition-all duration-300">
//               <span>Ask a Sha'alah</span>
//               <ArrowUpRight
//                 size={18}
//                 className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
//               />
//             </Link>
//           </div>
//         </div>

//         {/* RIGHT CARDS */}
//         <div className="space-y-6">

//           {/* STATS CARD */}
//           <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-white">
//             <p className="text-xs text-gray-400 mb-4">TRUSTED AT SCALE</p>

//             <div className="grid grid-cols-2 gap-6">
//               <div>
//                 <h3 className="text-2xl font-semibold text-[#C8A75B]">3000+</h3>
//                 <p className="text-sm text-gray-400">USA Banks</p>
//               </div>
//               <div>
//                 <h3 className="text-2xl font-semibold text-[#C8A75B]">2000+</h3>
//                 <p className="text-sm text-gray-400">People Serviced</p>
//               </div>


//               <div>
//                 <h3 className="text-2xl font-semibold text-[#C8A75B]">1000+</h3>
//                 <p className="text-sm text-gray-400">Hours Researched</p>
//               </div>
//               <div>
//                 <h3 className="text-2xl font-semibold text-[#C8A75B]">10</h3>
//                 <p className="text-sm text-gray-400">Poskim Available</p>
//               </div>

//             </div>
//           </div>

//           {/* QUOTE CARD */}
//           <div className="bg-white/5 backdrop-blur-lg border border-[#C8A75B]/40 rounded-xl p-6 text-gray-300 text-sm" dir="rtl">

//             <p className="italic text-right leading-relaxed">
//               "ומי האיש החפץ חיים ולקום בתחיית המתים ישאל פי חכם בעשותו הלואה כזו וימלט נפשו הרע."
//             </p>

//             <p className="mt-4 text-[#C8A75B] not-italic text-right">
//               — יערות דבש, חלק ב דרוש ה
//             </p>

//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }


import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#0d1b2a" }}
    >
      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
        }}
      />

      {/* RADIAL GLOW */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, #1a2f45 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-10 py-16 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">

        {/* ── LEFT ── */}
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full mb-6"
            style={{
              border: "1px solid #c8a75b",
              color: "#c8a75b",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              padding: "5px 14px",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#c8a75b",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            YOUR RIBIS RESOURCE
          </div>

          {/* Eyebrow */}
          <p
            style={{
              color: "#c8a75b",
              fontSize: "10px",
              letterSpacing: "0.25em",
              marginBottom: "18px",
              fontFamily: "inherit",
            }}
          >
            INFORMATION · AWARENESS · APPLICATION
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#ffffff",
              fontSize: "clamp(42px, 5vw, 62px)",
              lineHeight: 1.08,
              fontWeight: 400,
              marginBottom: "24px",
            }}
          >
            Halachic Guidance
            <br />
            for{" "}
            <em style={{ color: "#c8a75b", fontStyle: "italic" }}>Modern</em>
            <br />
            Finance
            <span style={{ color: "#c8a75b" }}>•</span>
          </h1>

          {/* Body */}
          <p
            style={{
              color: "#7a8fa3",
              fontSize: "14px",
              lineHeight: 1.75,
              maxWidth: "420px",
              marginBottom: "36px",
            }}
          >
            Standing at the intersection of intricate laws of ribis and the
            growing complexity of modern finance, Ribis.org brings halachic
            integrity to your everyday financial dealings.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            {/* Primary */}
            <Link
              href="/banks"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#c8a75b",
                color: "#0d1b2a",
                fontSize: "14px",
                fontWeight: 500,
                padding: "12px 22px",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              {/* Mini grid icon */}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.8 }}
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
              Explore Bank Directory
            </Link>

            {/* Secondary */}
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 400,
                padding: "12px 22px",
                borderRadius: "8px",
                border: "1px solid #3a4f62",
                textDecoration: "none",
              }}
            >
              Bais Horaah →
            </Link>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex flex-col gap-5">

          {/* Stats card */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "14px",
              padding: "24px 28px",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                color: "#7a8fa3",
                letterSpacing: "0.15em",
                marginBottom: "20px",
              }}
            >
              TRUSTED AT SCALE
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px 24px",
              }}
            >
              {[
                { num: "500+", label: "Banks Researched" },
                { num: "10+",  label: "Rabbanim on Call" },
                { num: "100s", label: "Shiurim Available" },
                { num: "24/7", label: "Hotline Access" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "34px",
                      fontWeight: 700,
                      color: "#c8a75b",
                      lineHeight: 1,
                      marginBottom: "5px",
                    }}
                  >
                    {num}
                  </div>
                  <div style={{ fontSize: "12px", color: "#7a8fa3" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote card */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(200,167,91,0.35)",
              borderRadius: "14px",
              padding: "24px 28px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "#b0bec8",
                fontStyle: "italic",
                lineHeight: 1.75,
                marginBottom: "14px",
              }}
            >
              "The need for a heter iska for shopkeepers and businesspeople is
              extremely great, and it is fitting for Rabbanim to institute in
              all communities that every merchant signs a heter iska..."
            </p>
            <p style={{ fontSize: "12px", color: "#c8a75b" }}>
              — Harav Moshe Shternbuch shlit"a
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
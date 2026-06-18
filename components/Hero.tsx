"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { frankRuhl } from "@/app/fonts";
import Counter from "./utils/ui/Counter";

export default function Hero() {
  const stats = [
    { value: 300, suffix: "+", label: "Banks Listed" },
    { value: 1500, suffix: "+", label: "Hours Researched" },
    { value: 10, suffix: "+", label: "Poskim Guiding" },
    { value: 2000, suffix: "+", label: "People Served" },
  ];
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const statItem = {
    hidden: {
      opacity: 0,
      y: 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0d1b2a]">

      {/* Grid Background */}
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

      {/* Radial Glow */}
      <div
        className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #1a2f45 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>

          {/* Badge */}
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-[#c8a75b] text-[#c8a75b] text-[10px] font-medium tracking-[0.1em] px-3.5 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8a75b] shrink-0" />
            Welcome To RIBIS
          </div> */}
          <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="inline-flex items-center gap-2 rounded-full border border-[#c8a75b] text-[#c8a75b] text-[10px] font-medium tracking-[0.1em] px-3.5 py-1.5 mb-6 overflow-hidden"
>
  <span className="w-1.5 h-1.5 rounded-full bg-[#c8a75b]" />

  <motion.span
    initial={{ width: 0 }}
    animate={{ width: "100%" }}
    transition={{
      duration: 1.4,
      delay: 0.3,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="overflow-hidden whitespace-nowrap"
  >
    WELCOME TO RIBIS
  </motion.span>
</motion.div>

          {/* Eyebrow */}
          <p className="text-[#c8a75b] text-[10px] tracking-[0.25em] mb-5 uppercase">
            INFORMATION · AWARENESS · Resources
          </p>

          {/* Heading */}
          <h1
            className="
              text-white
              text-[clamp(42px,5vw,62px)]
              leading-[1.08]
              font-normal
              mb-6
            "
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            Halachic Guidance
            <br />
            for{" "}
            <em className="text-[#c8a75b] italic">
              Modern
            </em>
            <br />
            Finance
            <span className="text-[#c8a75b] ml-1 relative inline-block">
              .
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-[420px] text-[#7a8fa3] text-sm leading-7 mb-9">
            Standing at the intersection of intricate laws of ribis and the
            growing complexity of modern finance, Ribis.org brings halachic
            integrity to your everyday financial dealings.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">

            <Link
              href="/banks"
              className="
                inline-flex
                items-center
                gap-2
                bg-[#c8a75b]
                text-[#0d1b2a]
                text-sm
                font-medium
                px-5
                py-3
                rounded-md
                hover:opacity-90
                transition
              "
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>

              Explore Bank Directory
            </Link>

            <Link
              href="/contact"
              className="
                inline-flex
                items-center
                gap-2
                border
                border-[#3a4f62]
                text-white
                text-sm
                px-5
                py-3
                rounded-lg
                hover:bg-white/5
                transition
              "
            >
              Bais Horaah →
            </Link>

          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-5">

          {/* Stats Card */}
          <div className="bg-white/5 border border-white/10 rounded-[14px] p-7">

            <p className="text-[10px] tracking-[0.15em] text-[#7a8fa3] mb-5">
              TRUSTED AT SCALE
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5">

              {stats.map((item) => (
                <div key={item.label}>
                  <div
                    className="
                      text-[#c8a75b]
                      text-[34px]
                      font-bold
                      leading-none
                      mb-1
                    "
                    style={{
                      fontFamily:
                        "'Playfair Display', Georgia, serif",
                    }}
                  >
                    <Counter
                      value={item.value}
                      suffix={item.suffix}
                    />
                  </div>

                  <div className="text-xs text-[#7a8fa3]">
                    {item.label}
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Quote Card */}
          <div className="bg-white/5 border border-white/10 border-l-[3px] border-l-[#c8a75b] rounded-[14px] p-7">

            <div dir="rtl">

              <p
                className={`${frankRuhl.className} text-[16px] text-white leading-6 text-right mb-4`}
              >
                ״עוד ראיתי לעורר שמאד נצרך לברר ה"באנק" השייכין
                לישראלים ולפרסם הרשימות של ה"באנקים" שיש עליהן
                חשש רבית למנוע הרבים ממכשול הרבית, ומה מאד הי'
                ראוי למנות ע"ז אנשים מוכשרים הידועין לברר ענין זה,
                ושכרם יהי' הרבה מאד ובכלל מזכי רבים יחשבו״
              </p>

              <p
                dir="ltr"
                className="text-xs text-[#c8a75b] text-left"
              >
                — HaRav Yechezkel Roth
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
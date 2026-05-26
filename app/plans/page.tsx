"use client";

import Footer from "@/components/Footer";

import Navbar from "@/components/Navbar";

import {
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Infinity,
} from "lucide-react";

export default function Plan() {

const handleCheckout =
  async () => {

    try {

      const response =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/plan/checkout`,
          {
            method: "POST",

            credentials: "include",

            headers: {
              "Content-Type":
                "application/json",
            },
          }
        );

      const data =
        await response.json();

      if (
        !data.success
      ) {

        throw new Error(
          data.message
        );
      }

      // REDIRECT TO STRIPE
      window.location.href =
        data.url;

    } catch (error: any) {

      console.error(
        "Checkout Error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="bg-[#0B1C2C] text-white">

        <Navbar />

      </div>

      {/* MAIN */}
      <section className="relative overflow-hidden bg-[#f5f1ea] min-h-screen flex items-center py-10">

        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden">

          {/* GRID */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(135deg,#0B1C2C_1px,transparent_1px)] bg-[size:28px_28px]" />

          {/* GLOW */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c8a21a]/10 blur-3xl rounded-full" />

        </div>

        <div className="relative max-w-6xl mx-auto px-6 w-full">

          <div className="grid lg:grid-cols-[1fr_520px] gap-16 items-center">

            {/* LEFT CONTENT */}
            <div>

              {/* LABEL */}
              <p className="text-[#c8a21a] uppercase tracking-[0.35em] text-xs font-semibold mb-6">

                PREMIUM ACCESS

              </p>

              {/* TITLE */}
              <h1 className="font-serif text-5xl xl:text-6xl leading-[1.05] text-[#051933]">

                Unlimited{" "}

                <span className="italic text-[#c8a21a]">

                  Research Reports

                </span>

              </h1>

              {/* DESCRIPTION */}
              <p className="text-[#64748b] leading-8 mt-8 text-[15px] max-w-xl">

                Gain unlimited access to all premium
                banking research reports, rabbinical
                guidance, institutional analysis,
                and future premium content.

              </p>

              {/* FEATURES */}
              <div className="mt-10 grid gap-5 max-w-lg">

                {[
                  "Unlimited bank research reports",
                  "Institutional financial analysis",
                  "Rabbinical research guidance",
                  "Future premium reports included",
                ].map(
                  (feature) => (

                    <div
                      key={feature}
                      className="flex items-start gap-4"
                    >

                      <div className="w-6 h-6 rounded-full bg-[#c8a21a]/10 flex items-center justify-center mt-0.5">

                        <Check className="w-3.5 h-3.5 text-[#c8a21a]" />

                      </div>

                      <p className="text-[#334155] text-[15px] leading-7">

                        {feature}

                      </p>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* PLAN CARD */}
            <div className="relative">

              {/* SHADOW */}
              <div className="absolute inset-0 bg-[#051933] blur-3xl opacity-20 rounded-[40px]" />

              <div className="relative rounded-[36px] overflow-hidden border border-[#c8a21a]/30 bg-[#051933] shadow-[0_30px_80px_rgba(5,25,51,0.20)]">

                {/* TOP GOLD BAR */}
                <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#c8a21a]" />

                {/* BADGE */}
                <div className="absolute top-6 right-6 bg-[#c8a21a] text-[#051933] text-[10px] uppercase tracking-[0.22em] font-bold px-4 py-2 rounded-full flex items-center gap-2">

                  <Sparkles className="w-3.5 h-3.5" />

                  Best Value

                </div>

                <div className="p-10">

                  {/* ICON */}
                  <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/10 flex items-center justify-center">

                    <Infinity className="w-10 h-10 text-[#c8a21a]" />

                  </div>

                  {/* TITLE */}
                  <div className="mt-8">

                    <h2 className="font-serif text-5xl text-white">

                      Unlimited

                    </h2>

                    <p className="text-[#94a3b8] mt-4 text-[15px] leading-7">

                      One-time payment for complete
                      premium access.

                    </p>

                  </div>

                  {/* PRICE */}
                  <div className="mt-10 flex items-end gap-3">

                    <span className="font-serif text-8xl text-white leading-none">

                      $30

                    </span>

                    <span className="text-[#94a3b8] mb-3 text-lg">

                      one-time

                    </span>

                  </div>

                  {/* ACCESS BADGE */}
                  <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/10 border border-white/10 px-5 py-3">

                    <ShieldCheck className="w-5 h-5 text-[#c8a21a]" />

                    <span className="text-[#f8fafc] font-semibold text-sm">

                      Unlimited Premium Reports

                    </span>

                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleCheckout}
                    className="group mt-12 w-full rounded-2xl bg-[#c8a21a] hover:bg-[#d8b84a] transition-all duration-300 py-5 px-6 flex items-center justify-center gap-3 text-[#051933] font-semibold text-[15px]"
                  >

                    Unlock Unlimited Access

                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />

                  </button>

                  {/* NOTE */}
                  <p className="text-center text-[#64748b] text-sm mt-5">

                    Secure payment · Instant activation

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </>
  );
}
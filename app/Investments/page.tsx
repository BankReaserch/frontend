"use client";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import Link from "next/link";

import {
  ArrowRight,
  ShieldCheck,
  Globe,
  Building2,
  BadgeCheck,
  Landmark,
  Sparkles,
} from "lucide-react";

export default function InvestmentsPage() {

  return (
    <>
      {/* NAVBAR */}
      <div className="bg-[#051933] text-white">

        <Navbar />

      </div>

      <main className="min-h-screen bg-[#f5f1ea] overflow-hidden">

        {/* HERO */}
        <section className="relative bg-[#051933] overflow-hidden pt-24 pb-24">

          {/* GRID */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(135deg,#ffffff_1px,transparent_1px)] bg-[size:28px_28px]" />

          {/* GLOW */}
          <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#c8a21a]/10 blur-3xl rounded-full" />

          <div className="relative max-w-7xl mx-auto px-6">

            <div className="grid lg:grid-cols-[1fr_460px] gap-16 items-center">

              {/* LEFT */}
              <div>

                {/* LABEL */}
                <p className="text-[#c8a21a] uppercase tracking-[0.35em] text-xs font-semibold mb-7">

                  Investments

                </p>

                {/* TITLE */}
                <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-white">

                  Kosher{" "}

                  <span className="italic text-[#c8a21a]">

                    Investment

                  </span>{" "}

                  Opportunities

                </h1>

                {/* DESCRIPTION */}
                <p className="max-w-2xl mt-8 text-[#94a3b8] leading-8 text-[15px]">

                  Discover carefully structured
                  investment opportunities aligned
                  with halacha. Our Kashrus Department
                  ensures that each investment is
                  properly designed in full compliance,
                  free of ribis concerns—giving frum
                  investors and entrepreneurs clarity
                  and confidence as their money grows.

                </p>

                {/* FEATURES */}
                <div className="grid sm:grid-cols-2 gap-5 mt-12 max-w-3xl">

                  {[
                    "Halachically structured opportunities",
                    "Reviewed by Rabbanim & Poskim",
                    "Ribis-compliant investment models",
                    "Trusted frum financial guidance",
                  ].map(
                    (
                      item
                    ) => (

                      <div
                        key={item}
                        className="flex items-start gap-4"
                      >

                        <div className="w-6 h-6 rounded-full bg-[#c8a21a]/10 flex items-center justify-center mt-0.5">

                          <ShieldCheck className="w-3.5 h-3.5 text-[#c8a21a]" />

                        </div>

                        <p className="text-[#e2e8f0] text-[15px] leading-7">

                          {item}

                        </p>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* RIGHT CARD */}
              <div className="relative">

                {/* SHADOW */}
                <div className="absolute inset-0 bg-[#c8a21a]/10 blur-3xl rounded-[40px]" />

                <div className="relative rounded-[36px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">

                  {/* TOP BAR */}
                  <div className="h-[4px] bg-[#c8a21a]" />

                  <div className="p-10">

                    {/* ICON */}
                    <div className="w-20 h-20 rounded-3xl bg-[#c8a21a]/10 border border-[#c8a21a]/20 flex items-center justify-center">

                      <Landmark className="w-10 h-10 text-[#c8a21a]" />

                    </div>

                    {/* COMPANY */}
                    <div className="mt-8">

                      <div className="inline-flex items-center gap-2 bg-[#c8a21a]/10 border border-[#c8a21a]/20 rounded-full px-4 py-2 text-[#c8a21a] text-xs uppercase tracking-[0.18em] font-semibold">

                        <Sparkles className="w-3.5 h-3.5" />

                        Verified Opportunity

                      </div>

                      <h2 className="font-serif text-4xl text-white leading-tight mt-6">

                        ISKA MORTGAGES LLC

                      </h2>

                    </div>

                    {/* INFO */}
                    <div className="mt-8 space-y-6">

                      {/* REVIEWED */}
                      <div className="flex items-start gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">

                          <BadgeCheck className="w-6 h-6 text-[#c8a21a]" />

                        </div>

                        <div>

                          <p className="text-[#94a3b8] text-xs uppercase tracking-[0.18em] mb-2">

                            Rabbinical Oversight

                          </p>

                          <p className="text-white text-[15px] leading-7">

                            Works with Bais Horaah of
                            Rav Pinchos Vind Shlita

                          </p>

                        </div>

                      </div>

                      {/* WEBSITE */}
                      <div className="flex items-start gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">

                          <Globe className="w-6 h-6 text-[#c8a21a]" />

                        </div>

                        <div>

                          <p className="text-[#94a3b8] text-xs uppercase tracking-[0.18em] mb-2">

                            Website

                          </p>

                          <a
                            href="https://www.iskamortgage.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#c8a21a] hover:text-[#d8b84a] transition-all text-[15px]"
                          >

                            www.iskamortgage.com

                          </a>

                        </div>

                      </div>

                    </div>

                    {/* CTA */}
                    <Link
                      href="https://www.iskamortgage.com"
                      target="_blank"
                      className="group mt-10 w-full h-14 rounded-2xl bg-[#c8a21a] hover:bg-[#d8b84a] transition-all flex items-center justify-center gap-3 text-[#051933] font-semibold text-[15px]"
                    >

                      Visit Investment Website

                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />

                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* EXTRA INFO */}
        <section className="py-20">

          <div className="max-w-6xl mx-auto px-6">

            <div className="rounded-[36px] border border-[#e7dfd2] bg-white p-10 md:p-14 shadow-sm">

              <div className="grid lg:grid-cols-3 gap-10">

                {/* ITEM */}
                <div>

                  <div className="w-14 h-14 rounded-2xl bg-[#051933] text-[#c8a21a] flex items-center justify-center">

                    <ShieldCheck className="w-7 h-7" />

                  </div>

                  <h3 className="font-serif text-3xl text-[#051933] mt-6">

                    Halachic Compliance

                  </h3>

                  <p className="text-[#64748b] leading-8 text-[15px] mt-5">

                    Every listed investment opportunity
                    undergoes review to help ensure
                    proper ribis compliance and
                    halachic structure.

                  </p>

                </div>

                {/* ITEM */}
                <div>

                  <div className="w-14 h-14 rounded-2xl bg-[#051933] text-[#c8a21a] flex items-center justify-center">

                    <Building2 className="w-7 h-7" />

                  </div>

                  <h3 className="font-serif text-3xl text-[#051933] mt-6">

                    Trusted Institutions

                  </h3>

                  <p className="text-[#64748b] leading-8 text-[15px] mt-5">

                    We highlight institutions and
                    financial opportunities working
                    with recognized Batei Horaah
                    and Rabbanim.

                  </p>

                </div>

                {/* ITEM */}
                <div>

                  <div className="w-14 h-14 rounded-2xl bg-[#051933] text-[#c8a21a] flex items-center justify-center">

                    <Landmark className="w-7 h-7" />

                  </div>

                  <h3 className="font-serif text-3xl text-[#051933] mt-6">

                    Financial Clarity

                  </h3>

                  <p className="text-[#64748b] leading-8 text-[15px] mt-5">

                    Gain confidence knowing that
                    your investments are aligned
                    with both financial goals and
                    Torah values.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />

    </>
  );
}
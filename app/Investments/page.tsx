"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  ShieldCheck,
  Building2,
  Landmark,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Investment } from "@/components/admin/investments/investment.types";
import axios from "axios";

export default function InvestmentsPage() {
  const [investments, setInvestments] =
    useState<Investment[]>([]);

  const [selected, setSelected] =
    useState<Investment | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);
  useEffect(() => {

    const fetchInvestments =
      async () => {

        try {

          const response =
            await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}api/investments`
            );

          if (
            response.data.success
          ) {

            setInvestments(
              response.data.data || []
            );

          }

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }

      };

    fetchInvestments();

  }, []);
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
              <div className="relative">

                {/* Glow */}
                <div className="absolute -inset-6 bg-[#c8a21a]/10 blur-3xl rounded-[40px]" />

                {/* Image Container */}
                <div className="relative overflow-hidden rounded-[36px] border border-white/10 shadow-2xl">

                  <img
                    src="/assets/investment-hero.webp"
                    alt="Investment Opportunities"
                    className="w-full h-[520px] object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051933]/90 via-[#051933]/30 to-transparent" />

                  {/* Bottom Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">

                    <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6">

                      <p className="text-[#c8a21a] uppercase tracking-[0.25em] text-xs font-semibold">
                        Investment Opportunities
                      </p>

                      <h3 className="text-white text-3xl font-serif mt-3">
                        Structured & Compliant
                      </h3>

                      <p className="text-[#cbd5e1] mt-4 leading-7 text-sm">
                        Carefully reviewed opportunities designed
                        with halachic integrity, financial clarity,
                        and long-term growth in mind.
                      </p>

                      <div className="grid grid-cols-3 gap-4 mt-6">

                        <div>
                          <p className="text-[#c8a21a] text-2xl font-serif">
                            {investments.length}
                          </p>
                          <p className="text-[#94a3b8] text-xs uppercase">
                            Listings
                          </p>
                        </div>

                        <div>
                          <p className="text-[#c8a21a] text-2xl font-serif">
                            {
                              investments.filter(
                                i => i.status === "Approved"
                              ).length
                            }
                          </p>
                          <p className="text-[#94a3b8] text-xs uppercase">
                            Approved
                          </p>
                        </div>

                        <div>
                          <p className="text-[#c8a21a] text-2xl font-serif">
                            {
                              investments.filter(
                                i => i.riskLevel === "Low"
                              ).length
                            }
                          </p>
                          <p className="text-[#94a3b8] text-xs uppercase">
                            Low Risk
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>
        <section className="py-20" id="investments_Info">

          <div className="max-w-7xl mx-auto px-6">

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {investments.map((investment) => (
                <div
                  key={investment._id}
                  className="
      bg-white
      rounded-[32px]
      border border-[#e7dfd2]
      shadow-sm
      overflow-hidden
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
                >
                  {/* Header */}
                  <div className="bg-[#051933] p-6">
                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <h3 className="font-serif text-2xl text-white">
                          {investment.name}
                        </h3>

                        <p className="text-[#c8a21a] mt-1">
                          {investment.type}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${investment.status === "Approved"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-yellow-500/20 text-yellow-300"
                          }`}
                      >
                        {investment.status}
                      </span>

                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">

                    <div className="grid grid-cols-2 gap-5">

                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#94a3b8]">
                          Risk Level
                        </p>

                        <p
                          className={`mt-2 font-semibold ${investment.riskLevel === "Low"
                              ? "text-green-600"
                              : investment.riskLevel === "Moderate"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                        >
                          {investment.riskLevel}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#94a3b8]">
                          Provider
                        </p>

                        <p className="mt-2 font-medium text-[#051933]">
                          {investment.provider || "N/A"}
                        </p>
                      </div>

                      <div className="col-span-2">
                        <p className="text-xs uppercase tracking-wider text-[#94a3b8]">
                          Minimum Investment
                        </p>

                        <p className="mt-2 text-2xl font-serif text-[#051933]">
                          $
                          {Number(
                            investment.minimumInvestment || 0
                          ).toLocaleString()}
                        </p>
                      </div>

                    </div>

                    <div className="mt-5 h-[120px]">
                      <p className="text-[#64748b] text-sm leading-7 line-clamp-4">
                        {investment.description}
                      </p>
                    </div>

                    <div className="mt-6 flex gap-3">

                      {investment.website && (
                        <a
                          href={`https://${investment.website.replace(
                            /^https?:\/\//,
                            ""
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
              flex-1
              h-11
              rounded-xl
              border
              border-[#c8a21a]
              text-[#051933]
              font-medium
              flex
              items-center
              justify-center
            "
                        >
                          Website
                        </a>
                      )}

                      {investment.reportAvailable && (
                        <button
                          className="
              flex-1
              h-11
              rounded-xl
              bg-[#c8a21a]
              text-[#051933]
              font-semibold
            "
                        >
                          Report
                        </button>
                      )}

                    </div>

                    <button
                      onClick={() => setSelected(investment)}
                      className="
          mt-4
          w-full
          h-12
          rounded-xl
          bg-[#051933]
          text-white
          font-semibold
          hover:bg-[#0b2440]
          transition-colors
        "
                    >
                      View Full Details
                    </button>

                  </div>
                </div>
              ))}

            </div>

          </div>

        </section>

        {/* EXTRA INFO */}
        {/* <section className="py-20">

          <div className="max-w-6xl mx-auto px-6">

            <div className="rounded-[36px] border border-[#e7dfd2] bg-white p-10 md:p-14 shadow-sm">

              <div className="grid lg:grid-cols-3 gap-10">

               
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

        </section> */}

      </main>

      <Footer />

    </>
  );
}
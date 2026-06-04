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

              <div className="grid gap-6">

                {investments
                  .slice(0, 3)
                  .map(
                    (
                      investment
                    ) => (

                      <div
                        key={
                          investment._id
                        }
                        className="
            rounded-3xl
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            p-6
          "
                      >

                        <div className="flex items-center justify-between">

                          <h3 className="text-white text-xl font-semibold">

                            {
                              investment.name
                            }

                          </h3>

                          <span className="text-[#c8a21a] text-xs uppercase">

                            {
                              investment.riskLevel
                            }

                          </span>

                        </div>

                        <p className="text-[#94a3b8] mt-2">

                          {
                            investment.provider
                          }

                        </p>

                        <button
                          onClick={() =>
                            setSelected(
                              investment
                            )
                          }
                          className="
              mt-5
              w-full
              h-12
              rounded-xl
              bg-[#c8a21a]
              text-[#051933]
              font-semibold
            "
                        >

                          View Details

                        </button>

                      </div>

                    )
                  )}

              </div>

            </div>

          </div>

        </section>
        <section className="py-20">

          <div className="max-w-7xl mx-auto px-6">

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {investments.map(
                (
                  investment
                ) => (

                  <div
                    key={
                      investment._id
                    }
                    className="
              bg-white
              rounded-3xl
              border
              shadow-sm
              p-6
            "
                  >

                    <h3 className="font-serif text-2xl text-[#051933]">

                      {
                        investment.name
                      }

                    </h3>

                    <p className="text-gray-500 mt-2">

                      {
                        investment.provider
                      }

                    </p>

                    <p className="mt-4 text-sm text-gray-600 line-clamp-4">

                      {
                        investment.description
                      }

                    </p>

                    <button
                      onClick={() =>
                        setSelected(
                          investment
                        )
                      }
                      className="
                mt-6
                w-full
                h-11
                rounded-xl
                bg-[#051933]
                text-white
              "
                    >

                      View Opportunity

                    </button>

                  </div>

                )
              )}

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
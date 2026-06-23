"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import axios from "axios";

import {
  Building2,
  Globe,
  MapPin,
  Phone,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

type Broker = {
  _id: string;

  name: string;

  location: string;

  info: string;

  phone: string;

  website: string;
};

export default function BrokersPage() {

  const [brokers, setBrokers] =
    useState<Broker[]>(
      []
    );

  const [loading, setLoading] =
    useState(true);
  useEffect(() => {

    fetchBrokers();

  }, []);

  const fetchBrokers =
    async () => {

      try {

        const res =
          await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}api/brokers/all`
          );

        setBrokers(
          (res.data.data || []).sort(
            (a: Broker, b: Broker) =>
              a.name.localeCompare(b.name, undefined, {
                sensitivity: "base",
              })
          )
        );

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <>
      {/* NAVBAR */}
      <div className="bg-[#0B1C2C] text-white pt-20 pb-10">

        <Navbar />

      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#f8f5ef] py-24">

        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,162,26,0.12),transparent_30%)]" />

        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#c8a21a]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* LEFT */}
            <div>

              <div className="mb-5 inline-flex items-center rounded-full border border-[#e8dfcf] bg-white/70 px-4 py-2 text-sm font-medium text-[#9b7b16] backdrop-blur">

                Trusted Financial Guidance

              </div>

              <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-[#051933] sm:text-6xl">

                Reliable Brokers.

                <br />

                Compliant Structures.

                <br />

                <span className="text-[#c8a21a]">

                  Peace of Mind.

                </span>

              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5f6b7a]">

                We connect you with experienced loan brokers who operate in
                complete alignment with halacha, helping ensure every agreement
                is structured correctly and responsibly.

              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#7b8794]">

                Navigating financial arrangements while maintaining compliance can
                be complex. Our network includes professionals who understand the
                importance of proper documentation, including the use of{" "}

                <span className="font-semibold text-[#051933]">

                  heter iska

                </span>{" "}

                where required.

              </p>

            </div>

            {/* RIGHT */}
            <div className="relative">

              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#c8a21a]/15 blur-3xl" />

              <div className="relative rounded-[32px] border border-[#eadfcb] bg-white/80 p-8 shadow-[0_20px_60px_rgba(5,25,51,0.08)] backdrop-blur-xl">

                <div className="rounded-3xl border border-[#f0e7d9] bg-[#fcfaf6] p-7">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm font-medium text-[#9b7b16]">

                        Featured Service

                      </p>

                      <h3 className="mt-2 text-2xl font-bold text-[#051933]">

                        Kosher Loan Services

                      </h3>

                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c8a21a]/10">

                      <Building2
                        className="text-[#c8a21a]"
                        size={28}
                      />

                    </div>

                  </div>

                  <div className="mt-8 space-y-5">

                    {[
                      "Loan structures reviewed for compliance",
                      "Guidance on heter iska implementation",
                      "Trusted and experienced brokers",
                      "Clear and transparent agreements",
                    ].map((item) => (

                      <div
                        key={item}
                        className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm"
                      >

                        <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#c8a21a]/15">

                          <div className="h-2.5 w-2.5 rounded-full bg-[#c8a21a]" />

                        </div>

                        <p className="text-sm leading-6 text-[#5f6b7a]">

                          {item}

                        </p>

                      </div>
                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* BROKERS */}
      <section className="bg-[#f8f5ef] pb-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* SECTION HEADER */}
          <div className="mb-14">

            <p className="text-sm uppercase tracking-[0.25em] text-[#c8a21a] font-semibold">

              Approved Network

            </p>

            <h2 className="mt-4 font-serif text-5xl text-[#051933]">

              Trusted Brokers

            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#64748b]">

              Explore trusted professionals and organizations who work
              with properly structured financial arrangements in alignment
              with halachic standards.

            </p>

          </div>

          {/* LOADING */}
          {loading ? (

            <div className="bg-white rounded-[32px] border border-[#ece4d8] p-14 text-center text-[#64748b]">

              Loading brokers...

            </div>

          ) : brokers.length === 0 ? (

            <div className="bg-white rounded-[32px] border border-[#ece4d8] p-14 text-center text-[#64748b]">

              No brokers available right now.

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {brokers.map(
                (broker) => (

                  <div
                    key={broker._id}
                    className="group h-[620px] rounded-[32px] border border-[#ece4d8] bg-white p-8 shadow-[0_10px_40px_rgba(5,25,51,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(5,25,51,0.08)] flex flex-col"
                  >

                    {/* TOP */}
                    <div className="flex items-start justify-between mb-7 flex-shrink-0">

                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#c8a21a]/10">

                        <Building2
                          size={30}
                          className="text-[#c8a21a]"
                        />

                      </div>

                      <div className="rounded-full bg-[#f8f5ef] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7b16]">

                        Verified

                      </div>

                    </div>

                    {/* TITLE */}
                    <div className="flex-shrink-0">

                      <h3 className="font-serif text-3xl leading-tight text-[#051933] min-h-[80px]">

                        {broker.name}

                      </h3>

                    </div>

                    {/* SCROLLABLE INFO */}
                    <div className="mt-5 flex-1 overflow-hidden">

                      <div className="h-full overflow-y-auto pr-2 custom-scrollbar">

                        <p className="text-[15px] leading-8 text-[#64748b]">

                          {broker.info}

                        </p>

                      </div>

                    </div>

                    {/* FIXED FOOTER */}
                    <div className="mt-7 border-t border-[#f1eadf] pt-7 space-y-5 flex-shrink-0">

                      {/* LOCATION */}
                      <div className="flex items-start gap-4 min-h-[52px]">

                        <MapPin
                          size={18}
                          className="mt-1 text-[#c8a21a] flex-shrink-0"
                        />

                        <div>

                          <p className="text-xs uppercase tracking-[0.2em] text-[#94a3b8]">

                            Location

                          </p>

                          <p className="mt-1 text-[#051933] font-medium">

                            {broker.location}

                          </p>

                        </div>

                      </div>

                      {/* PHONE */}
                      <div className="flex items-start gap-4 min-h-[52px]">

                        <Phone
                          size={18}
                          className="mt-1 text-[#c8a21a] flex-shrink-0"
                        />

                        <div>

                          <p className="text-xs uppercase tracking-[0.2em] text-[#94a3b8]">

                            Telephone

                          </p>

                          <p className="mt-1 text-[#051933] font-medium">

                            {broker.phone}

                          </p>

                        </div>

                      </div>

                      {/* WEBSITE */}
                      <div className="flex items-start gap-4 min-h-[60px]">

                        <Globe
                          size={18}
                          className="mt-1 text-[#c8a21a] flex-shrink-0"
                        />

                        <div className="min-w-0">

                          <p className="text-xs uppercase tracking-[0.2em] text-[#94a3b8]">

                            Website

                          </p>

                          <a
                            href={`https://${broker.website.replace(
                              /^https?:\/\//,
                              ""
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-block text-[#051933] font-medium underline hover:text-[#c8a21a] transition break-words"
                          >

                            {broker.website}

                          </a>

                        </div>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </section>

      <Footer />

    </>
  );
}
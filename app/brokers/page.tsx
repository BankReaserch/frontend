"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import axios from "axios";

import {
  BadgeCheck,
  Building2,
  Globe,
  Home,
  Mail,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

type MortgageType =
  | "Residential"
  | "Commercial"
  | "Both";

type KosherStatus =
  | "Totally Kosher"
  | "Offers Kosher Line";

type Broker = {
  _id: string;

  name: string;

  location: string;

  info: string;

  phone: string;

  email: string;

  website: string;

  mortgageType: MortgageType;

  kosherStatus: KosherStatus;

  kosherLine?: string;

  logoUrl?: string;
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
                    className="group h-[700px] rounded-[32px] border border-[#ece4d8] bg-white p-8 shadow-[0_10px_40px_rgba(5,25,51,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#e5d9bc] hover:shadow-[0_24px_60px_rgba(5,25,51,0.09)] flex flex-col"
                  >

                    {/* TOP */}
                    <div className="flex items-start justify-between mb-6 flex-shrink-0">

                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#c8a21a]/10 ring-1 ring-[#c8a21a]/15 overflow-hidden">

                        {broker.logoUrl ? (

                          <img
                            src={broker.logoUrl}
                            alt={`${broker.name} logo`}
                            className="h-full w-full object-cover"
                          />

                        ) : (

                          <Building2
                            size={30}
                            className="text-[#c8a21a]"
                          />

                        )}

                      </div>

                      <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#c8a21a]/15 to-[#c8a21a]/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7b16] ring-1 ring-[#c8a21a]/20">

                        <BadgeCheck size={14} />

                        Verified

                      </div>

                    </div>

                    {/* TITLE */}
                    <div className="flex-shrink-0">

                      <h3 className="font-serif text-3xl leading-tight text-[#051933] min-h-[44px]">

                        {broker.name}

                      </h3>

                    </div>

                    {/* BADGES */}
                    <div className="mt-4 flex flex-wrap gap-2 flex-shrink-0">

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#051933] shadow-sm">

                        <Home size={13} className="text-[#c8a21a]" />

                        {broker.mortgageType === "Both"
                          ? "Residential & Commercial"
                          : broker.mortgageType || "Residential"}

                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-sm ${
                          broker.kosherStatus ===
                          "Totally Kosher"
                            ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                            : "border-[#f0e2b3] bg-[#fbf1d9] text-[#9b7b16]"
                        }`}
                      >

                        <ShieldCheck size={13} />

                        {broker.kosherStatus ===
                        "Totally Kosher"
                          ? "Totally Kosher"
                          : broker.kosherLine
                          ? `Kosher Line: ${broker.kosherLine}`
                          : "Offers Kosher Line"}

                      </span>

                    </div>

                    {/* INFO */}
                    <div className="mt-5 flex-1 min-h-0">

                      <div className="relative h-full rounded-2xl border border-[#f1eadf] bg-[#faf8f4]">

                        <Quote
                          size={26}
                          className="absolute left-4 top-4 text-[#c8a21a]/25"
                        />

                        <div className="h-full overflow-y-auto custom-scrollbar px-5 py-4 pl-12">

                          <p className="text-[15px] italic leading-8 text-[#5f6b7a]">

                            {broker.info}

                          </p>

                        </div>

                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 rounded-b-2xl bg-gradient-to-t from-[#faf8f4] to-transparent" />

                      </div>

                    </div>

                    {/* FIXED FOOTER */}
                    <div className="relative mt-7 pt-7 space-y-4 flex-shrink-0">

                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e8dfcf] to-transparent" />

                      {/* LOCATION */}
                      <div className="flex items-center gap-4">

                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#c8a21a]/10">

                          <MapPin
                            size={17}
                            className="text-[#c8a21a]"
                          />

                        </div>

                        <div className="min-w-0">

                          <p className="text-[11px] uppercase tracking-[0.2em] text-[#94a3b8]">

                            Location

                          </p>

                          <p className="mt-0.5 text-[#051933] font-medium">

                            {broker.location}

                          </p>

                        </div>

                      </div>

                      {/* PHONE */}
                      <div className="flex items-center gap-4">

                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#c8a21a]/10">

                          <Phone
                            size={17}
                            className="text-[#c8a21a]"
                          />

                        </div>

                        <div className="min-w-0">

                          <p className="text-[11px] uppercase tracking-[0.2em] text-[#94a3b8]">

                            Telephone

                          </p>

                          <p className="mt-0.5 text-[#051933] font-medium">

                            {broker.phone}

                          </p>

                        </div>

                      </div>

                      {/* EMAIL */}
                      <div className="flex items-center gap-4">

                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#c8a21a]/10">

                          <Mail
                            size={17}
                            className="text-[#c8a21a]"
                          />

                        </div>

                        <div className="min-w-0 flex-1">

                          <p className="text-[11px] uppercase tracking-[0.2em] text-[#94a3b8]">

                            Email

                          </p>

                          <a
                            href={`mailto:${broker.email}`}
                            className="mt-0.5 block truncate font-medium text-[#051933] hover:text-[#c8a21a] transition"
                          >

                            {broker.email || "—"}

                          </a>

                        </div>

                      </div>

                      {/* WEBSITE */}
                      <div className="flex items-center gap-4">

                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#c8a21a]/10">

                          <Globe
                            size={17}
                            className="text-[#c8a21a]"
                          />

                        </div>

                        <div className="min-w-0 flex-1">

                          <p className="text-[11px] uppercase tracking-[0.2em] text-[#94a3b8]">

                            Website

                          </p>

                          <a
                            href={`https://${broker.website.replace(
                              /^https?:\/\//,
                              ""
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-0.5 block truncate font-medium text-[#051933] underline decoration-[#e2e8f0] underline-offset-2 hover:text-[#c8a21a] hover:decoration-[#c8a21a] transition"
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
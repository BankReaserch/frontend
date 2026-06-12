"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

import {
  ArrowRight,
  Phone,
  Mail,
  BookOpen,
} from "lucide-react";

const topics = [
  "Loans & Ribis",
  "Business Partnerships",
  "Investments",
  "Mortgages",
  "Commercial Transactions",
  "Employment Agreements",
  "Vendor Financing",
  "Profit Sharing",
];

export default function AskAShaalahPage() {
  return (
    <>
      <div className="bg-[#051933] text-white">
        <Navbar />
      </div>

      <main className="bg-[#F4F1EC] min-h-screen overflow-hidden">

        {/* HERO */}
        <section className="relative bg-[#051933] overflow-hidden pt-28 pb-28">

          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(135deg,#ffffff_1px,transparent_1px)] bg-[size:28px_28px]" />

          <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#C8A75B]/10 blur-3xl rounded-full" />

          <div className="relative max-w-7xl mx-auto px-6">

            <p className="text-[#C8A75B] uppercase tracking-[0.35em] text-xs font-semibold">
              Bais Hora'ah
            </p>

            <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-[1.05] text-white max-w-5xl">
              Trusted{" "}
              <span className="italic text-[#C8A75B]">
                Halachic Guidance
              </span>{" "}
              for Modern Financial Questions
            </h1>

            <p className="mt-8 max-w-3xl text-[#94A3B8] text-lg leading-9">
              Our Bais Hora'ah provides confidential guidance
              regarding ribis, investments, loans, partnerships,
              mortgages, and commercial transactions. Questions
              are reviewed with care and answered according to
              established halachic principles.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                href="/contact"
                className="
                  h-14 px-8
                  rounded-2xl
                  bg-[#C8A75B]
                  text-[#051933]
                  font-semibold
                  inline-flex
                  items-center
                  gap-3
                "
              >
                Submit a Question
                <ArrowRight size={18} />
              </Link>

              <a
                href="tel:+10000000000"
                className="
                  h-14 px-8
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  text-white
                  inline-flex
                  items-center
                  gap-3
                "
              >
                <Phone size={18} />
                Ribis Hotline
              </a>

            </div>

          </div>
        </section>

        {/* ABOUT */}
        <section className="py-24">

          <div className="max-w-6xl mx-auto px-6">

            <div className="bg-white rounded-[40px] border border-[#E7DFD2] shadow-sm p-10 md:p-16">

              <p className="text-[#C8A75B] uppercase tracking-[0.3em] text-xs font-semibold">
                About The Bais Hora'ah
              </p>

              <h2 className="mt-6 font-serif text-4xl text-[#051933]">
                Clarity for Complex Financial Matters
              </h2>

              <p className="mt-8 text-[#64748B] leading-9 text-lg">
                Financial arrangements often involve questions
                that require careful halachic consideration.
                Whether dealing with loans, investments,
                partnerships, mortgages, or commercial
                agreements, our Bais Hora'ah serves as a
                trusted resource for guidance and direction.
              </p>

              <p className="mt-6 text-[#64748B] leading-9 text-lg">
                Every inquiry is treated with discretion,
                professionalism, and a commitment to helping
                individuals and businesses navigate financial
                matters responsibly and confidently.
              </p>

            </div>

          </div>

        </section>

        {/* AREAS OF GUIDANCE */}
        <section className="pb-24">

          <div className="max-w-6xl mx-auto px-6">

            <div className="text-center">

              <p className="text-[#C8A75B] uppercase tracking-[0.35em] text-xs font-semibold">
                Areas of Guidance
              </p>

              <h2 className="mt-5 font-serif text-5xl text-[#051933]">
                Frequently Addressed Topics
              </h2>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">

              {topics.map((topic) => (
                <div
                  key={topic}
                  className="
                    bg-white
                    rounded-3xl
                    border border-[#E7DFD2]
                    p-6
                    text-center
                    text-[#051933]
                    font-medium
                    hover:border-[#C8A75B]
                    transition-all
                  "
                >
                  {topic}
                </div>
              ))}

            </div>

          </div>

        </section>

        {/* PROCESS */}
        <section className="pb-24">

          <div className="max-w-6xl mx-auto px-6">

            <div className="rounded-[40px] bg-[#051933] overflow-hidden relative p-10 md:p-16">

              <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#C8A75B]/10 rounded-full blur-3xl" />

              <div className="relative">

                <p className="text-[#C8A75B] uppercase tracking-[0.35em] text-xs font-semibold">
                  Process
                </p>

                <h2 className="mt-5 font-serif text-5xl text-white">
                  How It Works
                </h2>

                <div className="grid md:grid-cols-3 gap-10 mt-16">

                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-[#C8A75B] text-[#051933] flex items-center justify-center text-xl font-bold">
                      1
                    </div>

                    <h3 className="text-white text-2xl mt-6">
                      Submit
                    </h3>

                    <p className="text-[#94A3B8] mt-4 leading-8">
                      Submit your question together with
                      any relevant information or documents.
                    </p>
                  </div>

                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-[#C8A75B] text-[#051933] flex items-center justify-center text-xl font-bold">
                      2
                    </div>

                    <h3 className="text-white text-2xl mt-6">
                      Review
                    </h3>

                    <p className="text-[#94A3B8] mt-4 leading-8">
                      The matter is reviewed carefully by
                      the appropriate Rabbinical authority.
                    </p>
                  </div>

                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-[#C8A75B] text-[#051933] flex items-center justify-center text-xl font-bold">
                      3
                    </div>

                    <h3 className="text-white text-2xl mt-6">
                      Guidance
                    </h3>

                    <p className="text-[#94A3B8] mt-4 leading-8">
                      Receive clear and practical halachic
                      direction for your situation.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* CONTACT OPTIONS */}
        <section className="pb-24">

          <div className="max-w-6xl mx-auto px-6">

            <div className="text-center">

              <p className="text-[#C8A75B] uppercase tracking-[0.35em] text-xs font-semibold">
                Contact Options
              </p>

              <h2 className="mt-5 font-serif text-5xl text-[#051933]">
                Ways To Reach Us
              </h2>

            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-14">

              <div className="bg-white rounded-[32px] border border-[#E7DFD2] p-8">

                <BookOpen
                  className="text-[#C8A75B]"
                  size={28}
                />

                <h3 className="mt-6 text-2xl text-[#051933] font-medium">
                  Written Questions
                </h3>

                <p className="mt-4 text-[#64748B] leading-8">
                  Submit questions online at any time
                  and receive a detailed response.
                </p>

              </div>

              <div className="bg-white rounded-[32px] border border-[#E7DFD2] p-8">

                <Phone
                  className="text-[#C8A75B]"
                  size={28}
                />

                <h3 className="mt-6 text-2xl text-[#051933] font-medium">
                  Ribis Hotline
                </h3>

                <p className="mt-4 text-[#64748B] leading-8">
                  Speak directly with our team during
                  designated hotline hours.
                </p>

              </div>

              <div className="bg-white rounded-[32px] border border-[#E7DFD2] p-8">

                <Mail
                  className="text-[#C8A75B]"
                  size={28}
                />

                <h3 className="mt-6 text-2xl text-[#051933] font-medium">
                  Consultation
                </h3>

                <p className="mt-4 text-[#64748B] leading-8">
                  For more complex financial matters
                  requiring additional discussion.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="pb-24">

          <div className="max-w-6xl mx-auto px-6">

            <div className="bg-[#051933] rounded-[40px] p-12 md:p-16 text-center">

              <h2 className="font-serif text-5xl text-white">
                Need Guidance?
              </h2>

              <p className="mt-6 text-[#94A3B8] max-w-2xl mx-auto leading-8">
                Our Bais Hora'ah is available to assist
                with questions involving financial halacha,
                ribis, investments, partnerships, and
                commercial transactions.
              </p>

              <Link
                href="/contact"
                className="
                  mt-10
                  inline-flex
                  items-center
                  gap-3
                  px-8
                  py-4
                  rounded-2xl
                  bg-[#C8A75B]
                  text-[#051933]
                  font-semibold
                "
              >
                Submit a Question
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}
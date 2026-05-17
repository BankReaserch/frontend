import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function BrokersPage() {
  return (
    <>
   <div className="bg-[#0B1C2C] text-white pt-20 pb-10">
  <Navbar/>
   </div>
    <section className="relative overflow-hidden bg-[#f8f5ef] py-24">
       
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,162,26,0.12),transparent_30%)]" />
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#c8a21a]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <div className="mb-5 inline-flex items-center rounded-full border border-[#e8dfcf] bg-white/70 px-4 py-2 text-sm font-medium text-[#9b7b16] backdrop-blur">
              Trusted Financial Guidance
            </div>

            <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-[#051933] sm:text-6xl">
              Reliable Brokers.
              <br />
              Compliant Structures.
              <br />
              <span className="text-[#c8a21a]">Peace of Mind.</span>
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

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="inline-flex items-center justify-center rounded-2xl bg-[#c8a21a] px-7 py-4 text-sm font-semibold text-[#051933] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d7b52f] hover:shadow-lg">
                Connect With a Broker
              </button>

              <button className="inline-flex items-center justify-center rounded-2xl border border-[#e4dccd] bg-white px-7 py-4 text-sm font-semibold text-[#64748b] transition-all duration-200 hover:bg-[#faf7f2]">
                Learn More
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap gap-6 border-t border-[#ece4d7] pt-8">
              <div>
                <div className="text-2xl font-bold text-[#051933]">100%</div>
                <div className="mt-1 text-sm text-[#7b8794]">
                  Halachic Alignment
                </div>
              </div>

              <div>
                <div className="text-2xl font-bold text-[#051933]">Trusted</div>
                <div className="mt-1 text-sm text-[#7b8794]">
                  Professional Network
                </div>
              </div>

              <div>
                <div className="text-2xl font-bold text-[#051933]">
                  Structured
                </div>
                <div className="mt-1 text-sm text-[#7b8794]">
                  Loan Agreements
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE CARD */}
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
                    <svg
                      className="h-7 w-7 text-[#c8a21a]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c-3.866 0-7 1.79-7 4s3.134 4 7 4 7-1.79 7-4-3.134-4-7-4zm0 0V5m0 11v3"
                      />
                    </svg>
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

                <button className="mt-8 w-full rounded-2xl bg-[#051933] px-6 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0a274b]">
                  Request Broker Introduction
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
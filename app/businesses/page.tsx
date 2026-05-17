import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function page() {
  return (
    <>
     <div className="bg-[#0B1C2C] text-white pt-20 pb-10">
      <Navbar/>
       </div>
   
    <section className="relative overflow-hidden bg-[#f8f5ef] py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,162,26,0.10),transparent_30%)]" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#c8a21a]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <div className="mb-5 inline-flex items-center rounded-full border border-[#e8dfcf] bg-white/70 px-4 py-2 text-sm font-medium text-[#9b7b16] backdrop-blur">
              Trusted & Halachically Structured
            </div>

            <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-[#051933] sm:text-6xl">
              Businesses with a
              <br />
              <span className="text-[#c8a21a]">Heter Iska</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5f6b7a]">
              Explore a curated network of vetted businesses that operate under
              a properly structured heter iska, helping provide confidence that
              their financial practices align with halacha.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#7b8794]">
              Ribis.org partners with businesses committed to maintaining
              transparent and compliant financial structures, offering both
              consumers and organizations greater peace of mind in their
              transactions.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="inline-flex items-center justify-center rounded-2xl bg-[#c8a21a] px-7 py-4 text-sm font-semibold text-[#051933] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d7b52f] hover:shadow-lg">
                Browse Businesses
              </button>

              <button className="inline-flex items-center justify-center rounded-2xl border border-[#e4dccd] bg-white px-7 py-4 text-sm font-semibold text-[#64748b] transition-all duration-200 hover:bg-[#faf7f2]">
                Learn About Heter Iska
              </button>
            </div>

            {/* Quote Section */}
            <div className="mt-14 rounded-[28px] border border-[#ece2d3] bg-white/70 p-7 shadow-sm backdrop-blur">
              <p className="text-right text-[15px] leading-8 text-[#3f4854]">
                "והנה הצורך להיתר עיסקא לחנונים ובעלי עסקים נחוץ ביותר,
                וראוי לרבנים לתקן בארץ ובחו״ל שכל סוחר יחתום בשטר עיסקא
                ויתלה בחנות או בית עסק במקום בולט..."
              </p>

              <div className="mt-5 h-px w-full bg-[#eee4d6]" />

              <p className="mt-5 text-sm font-medium text-[#9b7b16]">
                — מרן פוסק הדור הג"ר משה שטרנבוך שליט״א
              </p>

              <p className="mt-1 text-sm text-[#7b8794]">
                הקדמה לספרו קיצור דיני ריבית המצויים
              </p>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="relative">
            <div className="absolute -top-10 right-0 h-44 w-44 rounded-full bg-[#c8a21a]/15 blur-3xl" />

            <div className="relative rounded-[32px] border border-[#eadfcb] bg-white/80 p-8 shadow-[0_20px_60px_rgba(5,25,51,0.08)] backdrop-blur-xl">
              <div className="rounded-3xl border border-[#f0e7d9] bg-[#fcfaf6] p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#9b7b16]">
                      Verified Businesses
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-[#051933]">
                      Ribis.org Network
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
                        d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4m-18 5l9 4 9-4"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mt-8 space-y-5">
                  {[
                    "Properly structured heter iska agreements",
                    "Vetted and trusted participating businesses",
                    "Transparent financial practices",
                    "Alignment with halachic standards",
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
                  View Participating Businesses
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
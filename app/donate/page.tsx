import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function page() {
    return (
        <>
            <div className="bg-[#0B1C2C] text-white pt-20 pb-10">
                <Navbar />
            </div>
            <main className="bg-[#f8f5ef]">
                {/* HERO */}
                <section className="relative overflow-hidden py-28">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,162,26,0.12),transparent_35%)]" />
                    <div className="absolute -top-28 right-0 h-96 w-96 rounded-full bg-[#c8a21a]/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#051933]/5 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
                            {/* LEFT CONTENT */}
                            <div>
                                <div className="mb-5 inline-flex items-center rounded-full border border-[#e8dfcf] bg-white/70 px-4 py-2 text-sm font-medium text-[#9b7b16] backdrop-blur">
                                    Support Torah-Guided Financial Awareness
                                </div>

                                <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-[#051933] sm:text-6xl">
                                    Support
                                    <br />
                                    <span className="text-[#c8a21a]">Our Work</span>
                                </h1>

                                <p className="mt-8 max-w-3xl text-lg leading-8 text-[#5f6b7a]">
                                    Your support enables Ribis.org to expand awareness of hilchos
                                    ribis and provide practical, reliable guidance to individuals,
                                    businesses, and communities.
                                </p>

                                <p className="mt-5 max-w-3xl text-base leading-8 text-[#7b8794]">
                                    Through shiurim, outreach, research, and direct assistance, we
                                    help ensure that financial activity is conducted in full
                                    alignment with halacha. Your contribution sustains and
                                    strengthens these efforts, allowing us to continue serving those
                                    who rely on us.
                                </p>

                                {/* CTA */}
                                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                    <button className="inline-flex items-center justify-center rounded-2xl bg-[#c8a21a] px-8 py-4 text-sm font-semibold text-[#051933] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d7b52f] hover:shadow-lg">
                                        Make a Donation
                                    </button>

                                    <button className="inline-flex items-center justify-center rounded-2xl border border-[#e4dccd] bg-white px-8 py-4 text-sm font-semibold text-[#64748b] transition-all duration-200 hover:bg-[#faf7f2]">
                                        Become a Sponsor
                                    </button>
                                </div>

                                {/* IMPACT STATS */}
                                <div className="mt-14 grid gap-5 sm:grid-cols-3">
                                    {[
                                        {
                                            title: "Shiurim",
                                            text: "Educational programs and outreach initiatives",
                                        },
                                        {
                                            title: "Guidance",
                                            text: "Practical halachic financial assistance",
                                        },
                                        {
                                            title: "Research",
                                            text: "Developing accessible financial awareness",
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.title}
                                            className="rounded-3xl border border-[#eadfcb] bg-white/80 p-6 shadow-sm backdrop-blur"
                                        >
                                            <h3 className="text-lg font-bold text-[#051933]">
                                                {item.title}
                                            </h3>

                                            <p className="mt-3 text-sm leading-7 text-[#7b8794]">
                                                {item.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT SIDE CARD */}
                            <div className="relative">
                                <div className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-[#c8a21a]/15 blur-3xl" />

                                <div className="relative overflow-hidden rounded-[36px] border border-[#eadfcb] bg-white/80 shadow-[0_20px_60px_rgba(5,25,51,0.08)] backdrop-blur">
                                    {/* TOP */}
                                    <div className="border-b border-[#ece3d5] bg-[#fcfaf6] p-10">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-[#9b7b16]">
                                                    Donate Securely
                                                </p>

                                                <h2 className="mt-2 text-3xl font-bold text-[#051933]">
                                                    Support Ribis.org
                                                </h2>
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
                                                "Support shiurim and educational outreach",
                                                "Help provide direct halachic guidance",
                                                "Expand community awareness initiatives",
                                                "Strengthen research and compliance resources",
                                            ].map((item) => (
                                                <div
                                                    key={item}
                                                    className="flex items-start gap-4 rounded-2xl border border-[#ece3d5] bg-white p-5"
                                                >
                                                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#c8a21a]/15">
                                                        <div className="h-2.5 w-2.5 rounded-full bg-[#c8a21a]" />
                                                    </div>

                                                    <p className="text-sm leading-7 text-[#5f6b7a]">
                                                        {item}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* BOTTOM */}
                                    <div className="p-10">
                                        <div className="rounded-3xl border border-[#e8d8b0] bg-[#fff9eb] p-6">
                                            <p className="text-sm leading-8 text-[#5f6b7a]">
                                                Every contribution helps strengthen awareness of hilchos
                                                ribis and supports individuals, businesses, and
                                                communities seeking reliable halachic financial guidance.
                                            </p>
                                        </div>

                                        <button className="mt-8 w-full rounded-2xl bg-[#051933] px-7 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0a274b]">
                                            Donate Now
                                        </button>

                                        <p className="mt-5 text-center text-xs leading-6 text-[#94a3b8]">
                                            Secure donations • Supporting education, outreach, and
                                            halachic guidance
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* IMPACT SECTION */}
                <section className="pb-28">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="rounded-[40px] border border-[#eadfcb] bg-white p-10 shadow-sm lg:p-14">
                            <div className="grid gap-12 lg:grid-cols-3">
                                {[
                                    {
                                        title: "Education & Shiurim",
                                        text: "Supporting programs that bring practical awareness of hilchos ribis to schools, communities, and organizations.",
                                    },
                                    {
                                        title: "Business Guidance",
                                        text: "Helping businesses and individuals structure financial activity in alignment with halacha.",
                                    },
                                    {
                                        title: "Research & Outreach",
                                        text: "Developing reliable resources and expanding access to trusted halachic financial guidance.",
                                    },
                                ].map((item) => (
                                    <div key={item.title}>
                                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c8a21a]/10">
                                            <div className="h-5 w-5 rounded-full bg-[#c8a21a]" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-[#051933]">
                                            {item.title}
                                        </h3>

                                        <p className="mt-5 text-base leading-8 text-[#7b8794]">
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
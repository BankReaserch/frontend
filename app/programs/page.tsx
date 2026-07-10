import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function page() {
    const schools = [
        "Kamenitz",
        "Klausenberg",
        "Lakewood Cheder School",
        "Shaagas Aryeh",
        "Tashbar",
        "Toras Aharon",
        "Toras Menachem",
        "Toras Zev",
        "Yeshiva Nachlei Torah",
        "Yeshiva Yesodei HaTorah",
    ];

    const rabbanim = [
        "Rabbi ? Bernath",
        "Rabbi Michoel Shmesh",
        "Rabbi Moshe Lenchis",
        "Rabbi ? Moskat",
        "Rabbi Nison Moses",
        "Rabbi Shmuel Poltman",
        "Rabbi Shabsai Zebrouski",
    ];

    return (
        <>
            <main className="bg-[#f8f5ef]">
                <div className="bg-[#0B1C2C] text-white pt-20 pb-10">
                    <Navbar />
                </div>
                {/* HERO */}
                <section className="relative overflow-hidden py-24">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,162,26,0.10),transparent_30%)]" />
                    <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-[#c8a21a]/10 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="max-w-4xl">
                            <div className="mb-5 inline-flex items-center rounded-full border border-[#e8dfcf] bg-white/70 px-4 py-2 text-sm font-medium text-[#9b7b16] backdrop-blur">
                                Education • Outreach • Compliance
                            </div>

                            <h1 className="text-5xl font-bold leading-tight tracking-tight text-[#051933] sm:text-6xl">
                                Our <span className="text-[#c8a21a]">Programs</span>
                            </h1>

                            <p className="mt-8 max-w-4xl text-lg leading-8 text-[#5f6b7a]">
                                Ribis.org develops practical awareness of hilchos ribis across
                                all levels—from students and community members to business owners
                                and organizations.
                            </p>

                            <p className="mt-5 max-w-4xl text-base leading-8 text-[#7b8794]">
                                Through shiurim, outreach, and hands-on business guidance, we
                                equip both today’s decision-makers and the next generation to
                                understand and navigate real-world financial situations in full
                                alignment with halacha and Torah values.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SCHOOL & COMMUNITY */}
                <section className="pb-24" id="school-program">
                    <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
                        {/* IMAGE */}
                        <div className="relative">
                            <div className="absolute -left-8 top-10 h-40 w-40 rounded-full bg-[#c8a21a]/15 blur-3xl" />

                            <div className="overflow-hidden rounded-[32px] border border-[#eadfcb] bg-white p-3 shadow-[0_20px_60px_rgba(5,25,51,0.08)]">
                                <img
                                    src="/assets/classroom.webp"
                                    alt="School & Community Shiurim"
                                    className="h-full w-full rounded-[24px] object-cover"
                                />
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div>
                            <div className="mb-4 inline-flex rounded-full border border-[#eadfcb] bg-white px-4 py-2 text-sm font-medium text-[#9b7b16]">
                                Educational Outreach
                            </div>

                            <h2 className="text-4xl font-bold text-[#051933]">
                                School & Community Shiurim
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-[#5f6b7a]">
                                We visit schools and communities to deliver engaging shiurim
                                tailored for both students and adults.
                            </p>

                            <p className="mt-5 text-base leading-8 text-[#7b8794]">
                                Our Rabbanim incorporate real-life scenarios and interactive
                                learning to make complex halachos clear, relevant, and practical.
                            </p>

                            <div className="mt-10 grid gap-4 sm:grid-cols-2">
                                {[
                                    "Interactive Learning",
                                    "Real-Life Case Studies",
                                    "Student Programs",
                                    "Community Shiurim",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="rounded-2xl border border-[#ece3d5] bg-white p-5"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-3 w-3 rounded-full bg-[#c8a21a]" />
                                            <span className="text-sm font-medium text-[#051933]">
                                                {item}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* BUSINESS OUTREACH */}
                <section className="pb-24" id="rabbinical-training">
                    <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
                        {/* CONTENT */}
                        <div className="order-2 lg:order-1" id="investments">
                            <div className="mb-4 inline-flex rounded-full border border-[#eadfcb] bg-white px-4 py-2 text-sm font-medium text-[#9b7b16]">
                                Professional Guidance
                            </div>

                            <h2 className="text-4xl font-bold text-[#051933]">
                                Business & Organizational Outreach
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-[#5f6b7a]">
                                We offer customized workshops and seminars for business owners,
                                shuls, and organizations.
                            </p>

                            <p className="mt-5 text-base leading-8 text-[#7b8794]">
                                Our outreach helps ensure that contracts, partnerships, and
                                investments are structured in full compliance with halacha.
                            </p>

                            <div className="mt-10 rounded-[28px] border border-[#eadfcb] bg-white p-7 shadow-sm">
                                <h3 className="text-xl font-semibold text-[#051933]">
                                    Areas Covered
                                </h3>

                                <div className="mt-6 space-y-4">
                                    {[
                                        "Contracts & Agreements",
                                        "Partnership Structures",
                                        "Investment Compliance",
                                        "Financial Halacha Training",
                                    ].map((item) => (
                                        <div key={item} className="flex items-start gap-4">
                                            <div className="mt-2 h-2.5 w-2.5 rounded-full bg-[#c8a21a]" />

                                            <p className="text-sm leading-7 text-[#5f6b7a]">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* IMAGE */}
                        <div className="relative order-1 lg:order-2">
                            <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-[#c8a21a]/15 blur-3xl" />

                            <div className="overflow-hidden rounded-[32px] border border-[#eadfcb] bg-white p-3 shadow-[0_20px_60px_rgba(5,25,51,0.08)]">
                                <img
                                    src="/assets/businesspersons.jpg"
                                    alt="Business Outreach"
                                    className="h-full w-full rounded-[24px] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* BUSINESS ASSESSMENT */}
                <section className="pb-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="overflow-hidden rounded-[40px] border border-[#eadfcb] bg-white/70 p-10 shadow-[0_20px_60px_rgba(5,25,51,0.06)] backdrop-blur">
                            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
                                <div>
                                    <div className="mb-4 inline-flex rounded-full border border-[#eadfcb] bg-[#faf7f2] px-4 py-2 text-sm font-medium text-[#9b7b16]">
                                        Full Compliance Review
                                    </div>

                                    <h2 className="text-4xl font-bold text-[#051933]">
                                        Business Assessment & Compliance
                                    </h2>

                                    <p className="mt-6 text-lg leading-8 text-[#5f6b7a]">
                                        We provide comprehensive assessments of your business and
                                        financial structures to evaluate alignment with halacha.
                                    </p>

                                    <p className="mt-5 text-base leading-8 text-[#7b8794]">
                                        Our Rabbanim and research team review ownership, governance,
                                        and financial practices to identify potential ribis concerns
                                        and offer clear, practical guidance for achieving full
                                        compliance.
                                    </p>

                                    <button className="mt-10 rounded-2xl bg-[#051933] px-7 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0a274b]">
                                        Request Assessment
                                    </button>
                                </div>

                                <div className="grid gap-5">
                                    {[
                                        "Ownership Review",
                                        "Governance Evaluation",
                                        "Financial Structure Analysis",
                                        "Practical Compliance Guidance",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="rounded-3xl border border-[#ece3d5] bg-[#fcfaf6] p-6"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#c8a21a]/15">
                                                    <div className="h-3 w-3 rounded-full bg-[#c8a21a]" />
                                                </div>

                                                <div>
                                                    <h3 className="font-semibold text-[#051933]">
                                                        {item}
                                                    </h3>

                                                    <p className="mt-2 text-sm leading-7 text-[#7b8794]">
                                                        Practical review and guidance tailored to your
                                                        organization’s financial activities and structures.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SCHOOLS + RABBANIM */}
                <section className="pb-24">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-8">
                        {/* Schools */}
                        <div className="rounded-[32px] border border-[#eadfcb] bg-white p-8 shadow-sm">
                            <h2 className="text-3xl font-bold text-[#051933]">
                                Schools Served
                            </h2>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {schools.map((school) => (
                                    <div
                                        key={school}
                                        className="rounded-2xl border border-[#f0e7d9] bg-[#fcfaf6] px-5 py-4 text-sm font-medium text-[#5f6b7a]"
                                    >
                                        {school}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rabbanim */}
                        <div className="rounded-[32px] border border-[#eadfcb] bg-white p-8 shadow-sm">
                            <h2 className="text-3xl font-bold text-[#051933]">
                                Program Rabbanim
                            </h2>

                            <div className="mt-8 space-y-4">
                                {rabbanim.map((rav) => (
                                    <div
                                        key={rav}
                                        className="flex items-center gap-4 rounded-2xl border border-[#f0e7d9] bg-[#fcfaf6] px-5 py-4"
                                    >
                                        <div className="h-3 w-3 rounded-full bg-[#c8a21a]" />

                                        <span className="text-sm font-medium text-[#5f6b7a]">
                                            {rav}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ALERTS */}
                <section className="pb-28" id="alerts">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="relative overflow-hidden rounded-[40px] bg-[#051933] px-10 py-16">
                            <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#c8a21a]/20 blur-3xl" />

                            <div className="relative max-w-3xl">
                                <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#d7b52f] backdrop-blur">
                                    Timely Updates
                                </div>

                                <h2 className="text-5xl font-bold leading-tight text-white">
                                    Ribis Alerts
                                </h2>

                                <p className="mt-7 text-lg leading-8 text-[#c8d2df]">
                                    Stay informed with timely updates on developments in ribis and
                                    financial halacha.
                                </p>

                                <p className="mt-5 text-base leading-8 text-[#b0bcc9]">
                                    Our alerts highlight key changes, emerging issues, and practical
                                    considerations—helping you remain aware and navigate an evolving
                                    financial landscape with clarity and confidence.
                                </p>

                                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                    <button className="rounded-2xl bg-[#c8a21a] px-7 py-4 text-sm font-semibold text-[#051933] transition-all duration-200 hover:bg-[#d7b52f]">
                                        Subscribe to Alerts
                                    </button>

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
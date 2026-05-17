import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function page() {
    const rabbanim = [
        "Rabbi Baruch Moses",
        "Rabbi Shmuel Poltman",
        "Rabbi Yechiel Blum",
        "Rabbi Moskowitz",
        "Rabbi Ginsberg",
        "Rabbi Elenbogen",
        "Rabbi Tzvi Smoke",
        "Rabbi Yaakov Yitzchok Jacob",
        "Rabbi Yehuda Framowitz",
        "Rabbi ? Lipshitz",
    ];

    const templates = [
        "Heter Iska for Borrowed Credit Card Use",
        "היתר עיסקא ברית פנחס (משולב)",
        "היתר עיסקא ברית פנחס – אנגלית (שני צדדים)",
        "Heter Iska for Co-Signer / Co-Borrower",
        "Standard Heter Iska (פלגא מלוה ופלגא פקדון)",
        "Standard Heter Iska (כולו פקדון)",
    ];

    return (
        <>
        <div className="bg-[#0B1C2C] text-white pt-20 pb-10">
                <Navbar />
            </div>
        <main className="bg-[#f8f5ef]">
            {/* HERO */}
            <section className="relative overflow-hidden py-24">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,162,26,0.10),transparent_35%)]" />
                <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-[#c8a21a]/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="mb-5 inline-flex items-center rounded-full border border-[#e8dfcf] bg-white/70 px-4 py-2 text-sm font-medium text-[#9b7b16] backdrop-blur">
                            Guidance • Compliance • Halachic Oversight
                        </div>

                        <h1 className="text-5xl font-bold leading-tight tracking-tight text-[#051933] sm:text-6xl">
                            Our <span className="text-[#c8a21a]">Departments</span>
                        </h1>

                        <p className="mt-8 max-w-4xl text-lg leading-8 text-[#5f6b7a]">
                            Ribis.org provides practical halachic guidance, structured
                            financial solutions, and ongoing support to help individuals,
                            businesses, and organizations navigate modern financial
                            transactions in full alignment with halacha.
                        </p>
                    </div>
                </div>
            </section>

            {/* BAIS HORA'AH */}
            <section className="pb-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[40px] border border-[#eadfcb] bg-white/80 shadow-[0_20px_60px_rgba(5,25,51,0.06)] backdrop-blur">
                        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                            {/* LEFT */}
                            <div className="p-10 lg:p-14">
                                <div className="mb-5 inline-flex rounded-full border border-[#eadfcb] bg-[#faf7f2] px-4 py-2 text-sm font-medium text-[#9b7b16]">
                                    Bais Horaah
                                </div>

                                <h2 className="text-4xl font-bold leading-tight text-[#051933]">
                                    Ribis Hotline
                                </h2>

                                <p className="mt-7 text-lg leading-8 text-[#5f6b7a]">
                                    At the Bais Horaah of Ribis.org, our Rabbanim are available
                                    to provide clear guidance on all matters of ribis and
                                    financial halacha—from simple questions to complex financial
                                    scenarios.
                                </p>

                                <p className="mt-5 text-base leading-8 text-[#7b8794]">
                                    We help ensure that everything is handled in full compliance
                                    with halacha through practical, reliable, and timely
                                    guidance.
                                </p>

                                {/* CONTACT OPTIONS */}
                                <div className="mt-10 grid gap-5 sm:grid-cols-3">
                                    {[
                                        "Call During Hotline Hours",
                                        "Submit Online Questions",
                                        "Email for Prompt Guidance",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="rounded-3xl border border-[#ece3d5] bg-[#fcfaf6] p-5"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 h-3 w-3 rounded-full bg-[#c8a21a]" />

                                                <p className="text-sm font-medium leading-7 text-[#051933]">
                                                    {item}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                    <button className="rounded-2xl bg-[#051933] px-7 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0a274b]">
                                        Contact Hotline
                                    </button>

                                    <button className="rounded-2xl border border-[#e4dccd] bg-white px-7 py-4 text-sm font-semibold text-[#64748b] transition-all duration-200 hover:bg-[#faf7f2]">
                                        Submit a Question
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="border-t border-[#ece3d5] bg-[#fcfaf6] p-10 lg:border-l lg:border-t-0 lg:p-14">
                                <h3 className="text-2xl font-bold text-[#051933]">
                                    Our Rabbanim
                                </h3>

                                <div className="mt-8 space-y-4">
                                    {rabbanim.map((rav) => (
                                        <div
                                            key={rav}
                                            className="flex items-center gap-4 rounded-2xl border border-[#ece3d5] bg-white px-5 py-4"
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
                    </div>
                </div>
            </section>

            {/* HETER ISKA */}
            <section className="pb-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[40px] bg-[#051933] px-10 py-16">
                        <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-[#c8a21a]/15 blur-3xl" />

                        <div className="relative max-w-5xl">
                            <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#d7b52f] backdrop-blur">
                                Heter Iska Department
                            </div>

                            <h2 className="text-5xl font-bold leading-tight text-white">
                                Heter Iska – Kosher Financing
                            </h2>

                            <p className="mt-8 text-lg leading-8 text-[#c8d2df]">
                                Ensure your business and personal financial agreements are
                                properly structured in full alignment with halacha.
                            </p>

                            <p className="mt-5 text-base leading-8 text-[#b0bcc9]">
                                A heter iska converts standard loans into compliant investment
                                partnerships, protecting you from potential ribis concerns.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPLANATION */}
            <section className="pb-24">
                <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
                    {/* LEFT */}
                    <div>
                        <div className="rounded-[36px] border border-[#eadfcb] bg-white p-10 shadow-sm">
                            <h2 className="text-4xl font-bold leading-tight text-[#051933]">
                                Structuring Financial Agreements in Full Alignment with Halacha
                            </h2>

                            <p className="mt-7 text-lg leading-8 text-[#5f6b7a]">
                                A heter iska is a halachic framework that transforms a standard
                                loan into a permissible investment arrangement, avoiding issues
                                of ribis while allowing for structured profit-sharing.
                            </p>

                            <p className="mt-5 text-base leading-8 text-[#7b8794]">
                                When properly implemented, it enables financial transactions to
                                proceed in full compliance with halacha.
                            </p>

                            {/* QUOTE */}
                            <div className="mt-10 rounded-3xl border border-[#ece3d5] bg-[#fcfaf6] p-7">
                                <p className="text-right text-[15px] leading-8 text-[#3f4854]">
                                    "וכבר מצאו חז״ל נוחי נפש תקנה בעשיית שטר עיסקא, אבל צריך
                                    להזהר בו ולעשות הכל כדינו, כי רבו דיניו...
                                    <br />
                                    ומי האיש החפץ חיים ולקום בתחיית המתים ישאל פי חכם בעשותו
                                    הלואה כזו וימלט נפשו הרע."
                                </p>

                                <div className="mt-5 h-px bg-[#e9dfd0]" />

                                <p className="mt-5 text-sm font-medium text-[#9b7b16]">
                                    — יערות דבש, חלק ב דרוש ה
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">
                        {[
                            {
                                title: "Avoid Ribis Issues",
                                text: "Even well-intentioned agreements can result in prohibited ribis without proper structuring.",
                            },
                            {
                                title: "Clarity and Protection",
                                text: "A well-drafted heter iska ensures both parties understand the terms and operate within halachic guidelines.",
                            },
                            {
                                title: "Peace of Mind",
                                text: "Proper rabbinic oversight helps ensure your financial dealings remain fully compliant.",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-[30px] border border-[#eadfcb] bg-white p-7 shadow-sm"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#c8a21a]/15">
                                        <div className="h-3 w-3 rounded-full bg-[#c8a21a]" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-[#051933]">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-[#7b8794]">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="rounded-[30px] border border-[#e8d8b0] bg-[#fff9eb] p-7">
                            <h3 className="text-xl font-semibold text-[#051933]">
                                Not All Heter Iskas Are Equal
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-[#5f6b7a]">
                                Standard templates often fail to address the specific structure
                                of your business, investment, or financial arrangement.
                            </p>

                            <p className="mt-4 text-sm leading-7 text-[#5f6b7a]">
                                Banks, lending companies, and private parties should ensure
                                their heter iska is properly tailored and implemented.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TEMPLATES */}
            <section className="pb-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="rounded-[40px] border border-[#eadfcb] bg-white p-10 shadow-sm">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <div className="mb-4 inline-flex rounded-full border border-[#eadfcb] bg-[#faf7f2] px-4 py-2 text-sm font-medium text-[#9b7b16]">
                                    Download Templates
                                </div>

                                <h2 className="text-4xl font-bold text-[#051933]">
                                    Heter Iska Templates
                                </h2>

                                <p className="mt-5 max-w-3xl text-base leading-8 text-[#7b8794]">
                                    Templates should always be reviewed and used with proper
                                    halachic guidance.
                                </p>
                            </div>

                            <button className="rounded-2xl bg-[#051933] px-7 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0a274b]">
                                Request Assistance
                            </button>
                        </div>

                        <div className="mt-12 grid gap-5 md:grid-cols-2">
                            {templates.map((item) => (
                                <div
                                    key={item}
                                    className="group flex items-center justify-between rounded-3xl border border-[#ece3d5] bg-[#fcfaf6] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c8a21a]/10">
                                            <svg
                                                className="h-5 w-5 text-[#c8a21a]"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 16V4m0 12l-4-4m4 4l4-4M4 20h16"
                                                />
                                            </svg>
                                        </div>

                                        <span className="text-sm font-medium leading-6 text-[#051933]">
                                            {item}
                                        </span>
                                    </div>

                                    <span className="text-sm font-semibold text-[#9b7b16]">
                                        Download
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CUSTOM SERVICES */}
            <section className="pb-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[40px] border border-[#eadfcb] bg-white shadow-[0_20px_60px_rgba(5,25,51,0.06)]">
                        <div className="grid lg:grid-cols-2">
                            {/* LEFT */}
                            <div className="bg-[#fcfaf6] p-10 lg:p-14">
                                <div className="mb-5 inline-flex rounded-full border border-[#eadfcb] bg-white px-4 py-2 text-sm font-medium text-[#9b7b16]">
                                    Customized Services
                                </div>

                                <h2 className="text-4xl font-bold text-[#051933]">
                                    Customized Heter Iska Services
                                </h2>

                                <p className="mt-7 text-lg leading-8 text-[#5f6b7a]">
                                    We provide professionally structured heter iska agreements
                                    tailored to your specific financial situation.
                                </p>

                                <div className="mt-10 space-y-5">
                                    {[
                                        "Customized to your financial structure",
                                        "Halachically sound and reviewed",
                                        "Clear and relevant for all parties",
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

                            {/* RIGHT */}
                            <div className="p-10 lg:p-14">
                                <h3 className="text-2xl font-bold text-[#051933]">
                                    Contact the Department
                                </h3>

                                <div className="mt-8 space-y-5">
                                    <div className="rounded-3xl border border-[#ece3d5] bg-[#fcfaf6] p-6">
                                        <p className="text-sm font-medium text-[#9b7b16]">
                                            Email
                                        </p>

                                        <p className="mt-2 text-lg font-semibold text-[#051933]">
                                            Iska@Ribis.org
                                        </p>
                                    </div>

                                    <div className="rounded-3xl border border-[#ece3d5] bg-[#fcfaf6] p-6">
                                        <p className="text-sm font-medium text-[#9b7b16]">
                                            Phone
                                        </p>

                                        <p className="mt-2 text-lg font-semibold text-[#051933]">
                                            732.228.8558
                                        </p>
                                    </div>

                                    <div className="rounded-3xl border border-[#ece3d5] bg-[#fcfaf6] p-6">
                                        <p className="text-sm leading-7 text-[#5f6b7a]">
                                            Or submit your details via the contact form for a prompt
                                            response from our team.
                                        </p>
                                    </div>
                                </div>

                                <button className="mt-10 w-full rounded-2xl bg-[#c8a21a] px-7 py-4 text-sm font-semibold text-[#051933] transition-all duration-200 hover:bg-[#d7b52f]">
                                    Request a Customized Heter Iska
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <Footer/>
        </>
    );
}
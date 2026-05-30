import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
    Phone,
    Mail,
    Scale,
    Landmark,
    Briefcase,
    Building2,
    ArrowRight,
} from "lucide-react";

const rabbis = [
    "Rabbi Baruch Moses",
    "Rabbi Shmuel Poltman",
    "Rabbi Yechiel Blum",
    "Rabbi Tzvi Smoke",
    "Rabbi Yaakov Yitzchok Jacob",
    "Rabbi Yehuda Framowitz",
];

export default function AskAShaalahPage() {
    return (
        <>
            <div className="bg-[#0B1C2C] text-white pt-20 pb-10">
                <Navbar />
            </div>
            <main className="bg-[#F4F1EC]">

                <section className="bg-gradient-to-br from-[#071B34] to-[#17345A] py-28">

                    <div className="max-w-7xl mx-auto px-6">

                        <p className="text-[#C8A75B] tracking-[0.35em] uppercase text-xs">
                            Bais Hora'ah
                        </p>

                        <h1 className="mt-6 text-white font-serif text-5xl md:text-7xl leading-tight">

                            Ask a Sha&apos;alah

                        </h1>

                        <p className="mt-8 max-w-3xl text-lg leading-9 text-gray-300">

                            Receive trusted guidance from experienced
                            Rabbanim regarding ribis, heter iska,
                            investments, mortgages, lending arrangements,
                            partnerships and financial halacha.

                        </p>

                    </div>

                </section>

                {/* AREAS OF GUIDANCE */}
                <section className="py-24">

                    <div className="max-w-7xl mx-auto px-6">

                        <div className="text-center max-w-3xl mx-auto">

                            <p className="text-[#C8A75B] uppercase tracking-[0.35em] text-xs">

                                Areas Of Guidance

                            </p>

                            <h2 className="mt-5 font-serif text-5xl text-[#051933]">

                                How We Can Help

                            </h2>

                            <p className="mt-6 text-[#64748b] leading-8">

                                Our Rabbanim provide practical guidance
                                across a wide range of financial matters.

                            </p>

                        </div>

                        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-16">

                            <div className="bg-white rounded-3xl border border-[#ece4d8] p-8">
                                <Scale
                                    size={28}
                                    className="text-[#C8A75B]"
                                />

                                <h3 className="mt-5 text-2xl font-serif text-[#051933]">
                                    Ribis
                                </h3>

                                <p className="mt-3 text-[#64748b] leading-7">
                                    Interest-related questions, loans and
                                    lending arrangements.
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl border border-[#ece4d8] p-8">
                                <Landmark
                                    size={28}
                                    className="text-[#C8A75B]"
                                />

                                <h3 className="mt-5 text-2xl font-serif text-[#051933]">
                                    Heter Iska
                                </h3>

                                <p className="mt-3 text-[#64748b] leading-7">
                                    Structuring and reviewing heter iska
                                    agreements.
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl border border-[#ece4d8] p-8">
                                <Briefcase
                                    size={28}
                                    className="text-[#C8A75B]"
                                />

                                <h3 className="mt-5 text-2xl font-serif text-[#051933]">
                                    Investments
                                </h3>

                                <p className="mt-3 text-[#64748b] leading-7">
                                    Investment opportunities, partnerships
                                    and profit-sharing structures.
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl border border-[#ece4d8] p-8">
                                <Building2
                                    size={28}
                                    className="text-[#C8A75B]"
                                />

                                <h3 className="mt-5 text-2xl font-serif text-[#051933]">
                                    Mortgages
                                </h3>

                                <p className="mt-3 text-[#64748b] leading-7">
                                    Residential and commercial mortgage
                                    guidance.
                                </p>
                            </div>

                        </div>

                    </div>

                </section>

                {/* CONTACT METHODS */}
                <section className="pb-24">

                    <div className="max-w-7xl mx-auto px-6">

                        <div className="grid lg:grid-cols-3 gap-6">

                            <div className="bg-white rounded-3xl border border-[#ece4d8] p-8">

                                <Phone
                                    className="text-[#C8A75B]"
                                    size={30}
                                />

                                <h3 className="mt-5 text-3xl font-serif text-[#051933]">

                                    Ribis Hotline

                                </h3>

                                <p className="mt-4 text-[#64748b] leading-7">

                                    Available during designated hours
                                    for guidance and clarification.

                                </p>

                                <p className="mt-6 text-[#051933] font-semibold text-xl">

                                    (732) 806-5409

                                </p>

                            </div>

                            <div className="bg-white rounded-3xl border border-[#ece4d8] p-8">

                                <Mail
                                    className="text-[#C8A75B]"
                                    size={30}
                                />

                                <h3 className="mt-5 text-3xl font-serif text-[#051933]">

                                    Email

                                </h3>

                                <p className="mt-4 text-[#64748b] leading-7">

                                    For detailed questions and
                                    supporting information.

                                </p>

                                <p className="mt-6 text-[#051933] font-semibold">

                                    office@ribis.org

                                </p>

                            </div>

                            <div className="bg-white rounded-3xl border border-[#ece4d8] p-8">

                                <ArrowRight
                                    className="text-[#C8A75B]"
                                    size={30}
                                />

                                <h3 className="mt-5 text-3xl font-serif text-[#051933]">

                                    Contact Page

                                </h3>

                                <p className="mt-4 text-[#64748b] leading-7">

                                    Visit our contact page for general
                                    inquiries and communication.

                                </p>

                                <a
                                    href="/contact"
                                    className="mt-6 inline-flex items-center gap-2 text-[#C8A75B] font-medium"
                                >
                                    Visit Contact Page
                                </a>

                            </div>

                        </div>

                    </div>

                </section>

                {/* RABBANIM */}
                <section className="bg-white py-24">

                    <div className="max-w-7xl mx-auto px-6">

                        <div className="text-center max-w-3xl mx-auto">

                            <p className="text-[#C8A75B] uppercase tracking-[0.35em] text-xs">

                                Bais Hora'ah

                            </p>

                            <h2 className="mt-5 font-serif text-5xl text-[#051933]">

                                Meet Our Rabbanim

                            </h2>

                            <p className="mt-6 text-[#64748b] leading-8">

                                Experienced Rabbanim dedicated to providing
                                guidance on ribis and financial halacha.

                            </p>

                        </div>

                        <div className="mt-16 bg-[#faf8f4] border border-[#ece4d8] rounded-[36px] p-10">

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                                {rabbis.map((rabbi) => (

                                    <div
                                        key={rabbi}
                                        className="bg-white rounded-2xl border border-[#ece4d8] p-6 hover:shadow-lg transition"
                                    >

                                        <div className="flex items-center gap-4">

                                            <div className="w-12 h-12 rounded-full bg-[#C8A75B]/10 flex items-center justify-center">

                                                <div className="w-3 h-3 rounded-full bg-[#C8A75B]" />

                                            </div>

                                            <div>

                                                <h3 className="text-[#051933] text-lg font-medium">

                                                    {rabbi}

                                                </h3>

                                                <p className="text-[#64748b] text-sm mt-1">

                                                    Bais Hora'ah Member

                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </section>

                {/* CTA */}
                <section className="py-24">

                    <div className="max-w-5xl mx-auto px-6">

                        <div className="rounded-[36px] bg-gradient-to-br from-[#071B34] to-[#17345A] p-12 text-center">

                            <p className="text-[#C8A75B] tracking-[0.35em] uppercase text-xs">

                                Need Guidance?

                            </p>

                            <h2 className="mt-5 text-white font-serif text-5xl">

                                Speak With Our Team

                            </h2>

                            <p className="mt-6 max-w-2xl mx-auto text-gray-300 leading-8">

                                Whether your question concerns ribis,
                                investments, mortgages, lending or
                                financial compliance, our team is
                                available to help.

                            </p>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-2xl bg-[#C8A75B] text-[#071B34] font-semibold hover:opacity-90 transition"
                            >

                                Contact Us

                            </a>

                        </div>

                    </div>

                </section>

            </main>
            <Footer />
        </>
    );
}
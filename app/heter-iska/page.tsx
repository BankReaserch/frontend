import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import TemplateCard from "./TemplateCard";

type Template = {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
};

async function getTemplates(): Promise<Template[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/templates`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data ?? [];
    } catch {
        return [];
    }
}

export default async function HeterIskaPage() {
    const templates = await getTemplates();

    return (
        <>
            <div className="bg-[#0B1C2C] text-white pt-20 pb-10">
                <Navbar />
            </div>

            <main className="bg-[#F4F1EC] min-h-screen">
                <section className="relative overflow-hidden pt-36 pb-24">
                    <div className="absolute inset-0 opacity-[0.03]">
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundImage:
                                    "radial-gradient(#0B1C2C 1px, transparent 1px)",
                                backgroundSize: "32px 32px",
                            }}
                        />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <p className="text-[#C8A75B] uppercase tracking-[0.3em] text-xs mb-5">
                                    Resource Library
                                </p>

                                <h1 className="font-serif text-[#1A2B3C] text-5xl md:text-6xl leading-tight">
                                    Heter Iska
                                    <br />
                                    Templates &
                                    <br />
                                    Resources
                                </h1>

                                <p className="mt-8 text-lg text-slate-500 leading-relaxed max-w-xl">
                                    Download professionally prepared heter iska agreements for
                                    common financial situations and learn how properly structured
                                    arrangements can help avoid ribis concerns.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="overflow-hidden rounded-[32px] shadow-2xl border border-[#E7E2D9]">
                                    <Image
                                        src="/assets/test.jpg"
                                        alt="Heter Iska"
                                        width={900}
                                        height={700}
                                        className="w-full h-[500px] object-cover"
                                    />
                                </div>

                                <div className="absolute -bottom-8 -left-8 bg-[#0B1C2C] text-white rounded-2xl p-6 shadow-2xl">
                                    <div className="text-[#C8A75B] text-3xl font-serif">
                                        {templates.length}+
                                    </div>

                                    <div className="mt-2 font-medium">
                                        Available Templates
                                    </div>

                                    <div className="text-sm text-slate-300 mt-1">
                                        Professionally prepared agreements.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pb-28">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-12">
                            <p className="text-[#C8A75B] uppercase tracking-[0.3em] text-xs mb-3">
                                Downloads
                            </p>

                            <h2 className="font-serif text-[#1A2B3C] text-4xl">
                                Available Templates
                            </h2>
                        </div>

                        {templates.length > 0 ? (
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {templates.map((template) => (
                                    <TemplateCard
                                        key={template._id}
                                        title={template.title}
                                        description={template.description}
                                        imageUrl={template.imageUrl}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-[28px] border border-dashed border-[#E7E2D9] bg-white py-20 text-center">
                                <p className="text-lg font-medium text-[#1A2B3C]">
                                    No templates available yet
                                </p>
                                <p className="mt-2 text-sm text-slate-500">
                                    Check back soon as we add new resources.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="pb-28">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="bg-white border border-[#E7E2D9] rounded-[32px] p-10 md:p-14">
                            <div className="grid md:grid-cols-3 gap-10">
                                <InfoCard
                                    title="Avoid Ribis Concerns"
                                    text="Properly structured agreements help ensure transactions comply with accepted halachic standards."
                                />

                                <InfoCard
                                    title="Clear Documentation"
                                    text="Transparent terms create understanding between all parties involved."
                                />

                                <InfoCard
                                    title="Practical Guidance"
                                    text="Documents designed for real-world financial situations and modern transactions."
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pb-32">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="rounded-[36px] bg-gradient-to-r from-[#0B1C2C] to-[#16304D] p-14 text-center text-white">
                            <p className="uppercase tracking-[0.3em] text-[#C8A75B] text-xs mb-4">
                                Need Something More Specific?
                            </p>

                            <h2 className="font-serif text-4xl mb-5">
                                Request a Custom Heter Iska
                            </h2>

                            <p className="max-w-2xl mx-auto text-slate-300 mb-10">
                                Not every arrangement fits a standard template. Contact us for
                                guidance regarding a custom agreement tailored to your situation.
                            </p>

                            <Link
                                href="/contact"
                                className="inline-flex bg-[#C8A75B] text-black px-8 py-4 rounded-xl font-medium hover:opacity-90 transition"
                            >
                                Request Custom Agreement →
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

function InfoCard({
    title,
    text,
}: {
    title: string;
    text: string;
}) {
    return (
        <div>
            <div className="w-12 h-12 rounded-xl bg-[#F3E8D0] text-[#C8A75B] flex items-center justify-center mb-4">
                ✦
            </div>

            <h3 className="text-[#1A2B3C] font-semibold text-xl mb-3">
                {title}
            </h3>

            <p className="text-slate-500 leading-relaxed">
                {text}
            </p>
        </div>
    );
}
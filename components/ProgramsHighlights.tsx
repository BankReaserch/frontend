import Link from "next/link";

const HIGHLIGHTS = [
  {
    tag: "Educational Outreach",
    title: "School Program",
    description:
      "Interactive shiurim and real-life case studies bringing hilchos ribis to students in a way that's clear and practical.",
    href: "/programs#school-program",
  },
  {
    tag: "Program Rabbanim",
    title: "Rabbinical Training",
    description:
      "Our panel of Rabbanim guide learners through real-world financial scenarios with depth and clarity.",
    href: "/programs#rabbinical-training",
  },
  {
    tag: "Stay Informed",
    title: "Newsletters",
    description:
      "Timely alerts and updates on developments in ribis and financial halacha, delivered straight to you.",
    href: "/programs#alerts",
  },
];

export default function ProgramsHighlights() {
  return (
    <section className="py-24 bg-[#f8f5ef]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <div className="mb-4 inline-flex rounded-full border border-[#eadfcb] bg-white px-4 py-2 text-sm font-medium text-[#9b7b16]">
            What We Offer
          </div>
          <h2 className="text-4xl font-bold text-[#051933]">
            Our Programs
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#5f6b7a]">
            From the classroom to your inbox — practical Torah guidance on
            hilchos ribis at every level.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-[28px] border border-[#eadfcb] bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-[0_20px_60px_rgba(5,25,51,0.08)] hover:-translate-y-1"
            >
              <div className="inline-flex rounded-full bg-[#faf7f2] px-3 py-1 text-xs font-medium text-[#9b7b16]">
                {item.tag}
              </div>

              <h3 className="mt-5 text-2xl font-bold text-[#051933]">
                {item.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#7b8794]">
                {item.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#c8a21a]">
                Learn more
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
import { Headphones, ScrollText, HelpCircle, BellRing } from "lucide-react";
import EducationCard from "./utils/card/EducationCard";

const resources = [
  {
    icon: Headphones,
    label: "AUDIO",
    title: "Shiurim on Hilchos Ribis",
    description:
      "Audio classes presented by experienced Rabbanim - clear, practical, and available anytime.",
    cta: "Explore Shiurim",
    gradient: "from-[#0B1C2C] to-[#1E3A5F]",
  },
  {
    icon: ScrollText,
    label: "BULLETINS",
    title: "Practical Articles",
    description:
      "Real-world ribis scenarios explained, rooted in classic sources.",
    cta: "Read Articles",
    gradient: "from-green-800 to-green-600",
  },
  {
    icon: HelpCircle,
    label: "Q&A",
    title: "Common Questions",
    description:
      "Clear answers to frequently asked ribis questions and terminology.",
    cta: "Find Answers",
    gradient: "from-indigo-900 to-purple-700",
  },
  {
    icon: BellRing,
    label: "ALERTS",
    title: "Stay Updated",
    description:
      "Timely alerts on emerging issues and changes in financial halacha.",
    cta: "View Alerts",
    gradient: "from-[#2B1A12] to-[#5A2E1E]",
  },
];

export default function EducationSection() {
  return (
    <section className="bg-[#F4F1EC] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-4 text-xs tracking-[0.3em] text-[#C8A75B]">
              EDUCATION
            </p>

            <h2 className="mb-4 font-serif text-4xl leading-tight text-[#1A2B3C] md:text-5xl">
              Learn Hilchos <span className="italic text-[#C8A75B]">Ribis</span>
            </h2>

            <p className="max-w-xl text-gray-500">
              Audio shiurim, practical bulletins, common questions, and community alerts, all in one place.
            </p>
          </div>

          <button className="whitespace-nowrap rounded-lg bg-[#C8A75B] px-6 py-3 font-medium text-black transition-colors hover:bg-[#b8964e]">
            View All Resources →
          </button>
        </div>

        {/* CARD GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <EducationCard key={resource.title} {...resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
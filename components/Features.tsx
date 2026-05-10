import FeatureCard from "./utils/card/FeatureCard";

export default function FeaturesSection() {
  const features = [
    {
      icon: "🏦",
      title: "Bank Directory",
      description:
        "In-depth research on hundreds of financial institutions, with clear kashrus status ratings you can rely on.",
      linkText: "Browse directory",
    },
    {
      icon: "🤝",
      title: "Kosher Brokers",
      description:
        "Connect with vetted loan brokers who ensure every agreement is properly structured with halacha in mind.",
      linkText: "Find brokers",
    },
    {
      icon: "📈",
      title: "Investments",
      description:
        "Carefully structured investment opportunities reviewed by our Kashrus Department — free of ribis concerns.",
      linkText: "View opportunities",
    },
    {
      icon: "🏪",
      title: "Kosher Businesses",
      description:
        "A curated list of businesses operating under a properly structured heter iska, verified by our team.",
      linkText: "See businesses",
    },
  ];

  return (
    <section className="bg-[#F4F1EC] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP CONTENT */}
        <div className="max-w-2xl mb-16">
          
          {/* LABEL */}
          <p className="text-[#C8A75B] text-xs tracking-[0.3em] mb-6">
            WHAT WE OFFER
          </p>

          {/* HEADING */}
          <h2 className="text-[#1A2B3C] font-serif text-4xl md:text-5xl leading-tight mb-6">
            One Place for All <br />
            Your <span className="text-[#C8A75B] italic">Ribis</span> Needs
          </h2>

          {/* DESCRIPTION */}
          <p className="text-[#6B7280] text-lg leading-relaxed">
            From researching your bank to structuring a loan, Ribis.org provides
            practical, halacha-based guidance at every step.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <FeatureCard key={index} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
}
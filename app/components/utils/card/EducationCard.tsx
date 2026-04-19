type Props = {
  title: string;
  description: string;
  label: string;
  icon: string;
  gradient: string;
  link?: string;
  button?: string;
  variant?: "default" | "large" | "wide";
};

export default function EducationCard({
  title,
  description,
  label,
  icon,
  gradient,
  link,
  button,
  variant = "default",
}: Props) {
  return (
    <div
      className={`rounded-2xl overflow-hidden bg-[#F8F6F2] border border-[#E7E2D9] flex flex-col ${
        variant === "large" ? "h-full" : ""
      }`}
    >
      {/* TOP VISUAL */}
      <div
        className={`bg-gradient-to-br ${gradient} flex items-center justify-center text-4xl ${
          variant === "large" ? "h-56" : variant === "wide" ? "h-40" : "h-32"
        }`}
      >
        {icon}
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-[#C8A75B] text-xs tracking-[0.25em] mb-2">
          {label}
        </p>

        <h3 className="text-[#1A2B3C] font-serif text-xl mb-2">
          {title}
        </h3>

        <p className="text-gray-500 text-sm mb-6 flex-grow">
          {description}
        </p>

        {/* ACTION */}
        {button ? (
          <button className="bg-[#C8A75B] text-black px-4 py-2 rounded-md w-fit">
            {button} →
          </button>
        ) : (
          <span className="text-[#C8A75B] text-sm font-medium">
            {link} →
          </span>
        )}
      </div>
    </div>
  );
}
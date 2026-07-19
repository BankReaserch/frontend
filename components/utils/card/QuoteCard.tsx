import { frankRuhl } from "@/app/fonts";

interface QuoteCardProps {
  description: string;
  name?: string;
  textColor?: string;
  nameColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  border?: string;
}

const QuoteCard = ({
  description,
  name,
  textColor = "text-white",
  nameColor = "text-[#c9a84c]",
  backgroundColor = "bg-white/5",
  borderColor = "border-l-[#c9a84c]",
  border = "border-white/10",
}: QuoteCardProps) => {
  return (
    <div
      className={`${backgroundColor} border ${border} border-l-[3px] ${borderColor} rounded-[14px] p-7`}
    >
      <div dir="rtl">
        <p
          className={`${frankRuhl.className} text-[16px] leading-6 text-right mb-4 ${textColor}`}
        >
          {description}
        </p>

        {name && (
          <p dir="ltr" className={`text-xs text-left ${nameColor}`}>
            — {name}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;
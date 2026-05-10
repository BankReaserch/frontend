export default function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 items-start bg-white/60 backdrop-blur-md border border-[#E7E2D9] p-5 rounded-xl shadow-sm hover:shadow-md transition">
      
      {/* NUMBER */}
      <div className="w-10 h-10 rounded-lg bg-[#C8A75B] text-black flex items-center justify-center font-semibold">
        {number}
      </div>

      {/* TEXT */}
      <div>
        <h4 className="text-[#1A2B3C] font-semibold mb-1">{title}</h4>
        <p className="text-gray-500 text-sm">{text}</p>
      </div>
    </div>
  );
}
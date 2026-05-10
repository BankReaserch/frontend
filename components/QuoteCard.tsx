export default function QuoteCard() {
  return (
    <div className="bg-[#0B1C2C] text-white rounded-2xl p-8 md:p-10 relative shadow-lg">

      {/* Decorative quote mark */}
      <div className="absolute top-6 left-6 text-white/10 text-6xl font-serif">
        “
      </div>

      <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
        "Our Sages of blessed memory found a remedy in the making of a shtar iska,
        but one must be careful and do everything properly, for its laws are many...
        And whoever desires life and wishes to arise at the resurrection of the dead,
        let him ask a wise man when making such a loan, and he will save his soul from evil."
      </p>

      <p className="text-[#C8A75B] text-sm">
        — יערות דבש, חלק ב דרוש ה
      </p>
    </div>
  );
}
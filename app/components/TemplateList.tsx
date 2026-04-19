const templates = [
  "Heter Iska for Borrowed Credit Card Use",
  "היתר עיסקא ברית כנסת (משולב)",
  "Heter Iska for Co-Signer / Co-Borrower",
  "Standard Heter Iska (פלגא מלוה ופלגא פקדון)",
  "Standard Heter Iska (כולו פקדון)",
];

export default function TemplateList() {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-[#E7E2D9] rounded-2xl p-6 shadow-lg">

      <h3 className="text-[#1A2B3C] font-semibold mb-6 text-lg">
        Download Templates
      </h3>

      {/* LIST */}
      <div className="divide-y">
        {templates.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-4 group cursor-pointer"
          >
            <span className="text-sm text-gray-700 group-hover:text-black transition">
              {item}
            </span>

            <div className="w-8 h-8 rounded-md bg-[#F1E7D5] flex items-center justify-center text-[#C8A75B] group-hover:scale-105 transition">
              ↓
            </div>
          </div>
        ))}
      </div>

      {/* CTA BOX */}
      <div className="mt-6 bg-gradient-to-r from-[#0B1C2C] to-[#1E3A5F] text-white rounded-xl p-5 text-center">
        <p className="text-sm text-gray-300 mb-2">
          Need a customized agreement?
        </p>
        <p className="text-[#C8A75B] font-medium">
          iska@ribis.org
        </p>
        <p className="text-gray-400 text-sm">
          732.228.8558
        </p>
      </div>
    </div>
  );
}
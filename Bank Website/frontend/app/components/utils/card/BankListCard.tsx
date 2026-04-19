import BankStatusBadge from "../../BankStatusBadge";


export default function BankListCard() {
  const banks = [
    { name: "Ally Bank", status: "mehudar", label: "Mehudar" },
    { name: "Marcus by Goldman Sachs", status: "compliant", label: "Compliant" },
    { name: "Capital One", status: "conditional", label: "Conditional" },
    { name: "Chase Bank", status: "questionable", label: "Questionable" },
    { name: "Bank of America", status: "compliant", label: "Compliant" },
    { name: "TD Bank", status: "mehudar", label: "Mehudar" },
  ];

  return (
    <div className="bg-[#13263A] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-lg">
      
      {/* HEADER */}
      <div className="px-5 py-4 border-b border-white/10 text-[#C8A75B] text-sm flex items-center gap-2">
        🔍 KOSHER BANK DIRECTORY
      </div>

      {/* LIST */}
      <div>
        {banks.map((bank, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-5 py-4 border-b border-white/5 last:border-none"
          >
            <span className="text-white/90 text-sm">{bank.name}</span>
            <BankStatusBadge
              status={bank.status as any}
              label={bank.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
type Status =
  | "mehudar"
  | "compliant"
  | "conditional"
  | "questionable"
  | "noncompliant"
  | "undetermined";

const styles: Record<Status, string> = {
  mehudar: "bg-green-500/10 text-green-400 border border-green-500/20",
  compliant: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
  conditional: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  questionable: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  noncompliant: "bg-red-500/10 text-red-400 border border-red-500/20",
  undetermined: "bg-gray-500/10 text-gray-400 border border-gray-500/20",
};

export default function BankStatusBadge({
  status,
  label,
}: {
  status: Status;
  label: string;
}) {
  return (
    <span
      className={`px-3 py-1 text-xs rounded-full ${styles[status]} whitespace-nowrap`}
    >
      {label}
    </span>
  );
}
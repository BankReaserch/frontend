export default function StatCard({
  title,
  value,
  growth,
}: {
  title: string;
  value: string;
  growth: string;
}) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-xl font-semibold mt-1">{value}</h3>
      <p className="text-green-600 text-sm mt-1">{growth}</p>
    </div>
  );
}
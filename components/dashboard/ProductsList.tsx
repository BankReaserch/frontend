export default function ProductsList() {
  return (
    <div className="bg-white p-5 rounded-xl border">
      <h3 className="font-medium mb-4">Top Products</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Hilchos Ribis</span>
          <span>$18,227</span>
        </div>
        <div className="flex justify-between">
          <span>Heter Iska</span>
          <span>$13,016</span>
        </div>
      </div>
    </div>
  );
}
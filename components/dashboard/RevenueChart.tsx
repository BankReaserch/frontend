export default function RevenueChart() {
  return (
    <div className="bg-white p-5 rounded-xl border">
      <h3 className="font-medium mb-4">Revenue Overview</h3>

      <div className="h-40 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg" />

      <div className="flex justify-between text-sm mt-4">
        <div>
          <p className="text-gray-500">Revenue</p>
          <p className="font-semibold">$24,890</p>
        </div>
        <div>
          <p className="text-gray-500">Orders</p>
          <p className="font-semibold">1,248</p>
        </div>
        <div>
          <p className="text-gray-500">AOV</p>
          <p className="font-semibold">$19.96</p>
        </div>
      </div>
    </div>
  );
}
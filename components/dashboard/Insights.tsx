export default function Insights() {
  return (
    <div className="bg-white p-5 rounded-xl border">
      <h3 className="font-medium mb-4">Customer Insights</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Returning Customers</span>
          <span className="text-green-600">85%</span>
        </div>

        <div className="flex justify-between">
          <span>Avg Rating</span>
          <span>4.8</span>
        </div>

        <div className="flex justify-between">
          <span>Subscribers</span>
          <span>2.3K</span>
        </div>
      </div>
    </div>
  );
}
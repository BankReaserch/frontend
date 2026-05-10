export default function OrdersTable() {
  const orders = [
    { id: "#RIB-1250", name: "Moshe L.", price: "$34.99" },
    { id: "#RIB-1249", name: "Yossi B.", price: "$56.00" },
    { id: "#RIB-1248", name: "Chaim T.", price: "$28.00" },
  ];

  return (
    <div className="bg-white p-5 rounded-xl border">
      <h3 className="font-medium mb-4">Recent Orders</h3>

      <div className="space-y-3 text-sm">
        {orders.map((o, i) => (
          <div key={i} className="flex justify-between">
            <div>
              <p>{o.id}</p>
              <p className="text-gray-500">{o.name}</p>
            </div>
            <span>{o.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
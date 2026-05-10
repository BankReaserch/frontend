export default function Sidebar() {
  const menu = [
    "Dashboard",
    "Orders",
    "Products",
    "Downloads",
    "Customers",
    "Coupons",
    "Analytics",
    "Reviews",
    "Settings",
  ];

  return (
    <div className="w-64 bg-[#0b2a45] text-white p-5 flex flex-col">
      <h1 className="text-xl font-semibold mb-6">Ribis</h1>

      <div className="space-y-2">
        {menu.map((item, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              i === 0 ? "bg-yellow-500 text-black" : "hover:bg-[#123a5a]"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}


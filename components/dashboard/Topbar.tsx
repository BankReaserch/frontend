export default function Topbar() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-serif">
          Welcome back, Shimon 👋
        </h2>
        <p className="text-gray-500 text-sm">
          Here’s what’s happening today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <input
          placeholder="Search..."
          className="border rounded-lg px-3 py-2 text-sm"
        />
        <div className="w-8 h-8 rounded-full bg-[#0b2a45] text-white flex items-center justify-center">
          SY
        </div>
      </div>
    </div>
  );
}
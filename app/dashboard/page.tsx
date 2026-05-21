import DashboardHeader
from "./components/DashboardHeader";

export default function DashboardPage() {

  return (
    <div>

      <DashboardHeader
        title="Dashboard"
        subtitle="Welcome back to your learning center."
      />

      <div className="grid grid-cols-3 gap-5">

        <div className="bg-white rounded-2xl border p-6">

          <p className="text-sm text-gray-500">
            Total Orders
          </p>

          <h2 className="text-4xl font-bold mt-2">
            0
          </h2>

        </div>

        <div className="bg-white rounded-2xl border p-6">

          <p className="text-sm text-gray-500">
            Books Owned
          </p>

          <h2 className="text-4xl font-bold mt-2">
            0
          </h2>

        </div>

        <div className="bg-white rounded-2xl border p-6">

          <p className="text-sm text-gray-500">
            Downloads
          </p>

          <h2 className="text-4xl font-bold mt-2">
            0
          </h2>

        </div>

      </div>

    </div>
  );
}
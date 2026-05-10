import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import OrdersTable from "@/components/dashboard/OrdersTable";
import ProductsList from "@/components/dashboard/ProductsList";
import CategoryChart from "@/components/dashboard/CategoryChart";
import Insights from "@/components/dashboard/Insights";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#f4efe7]">
      <Sidebar />

      <div className="flex-1 p-6">
        <Topbar />

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <StatCard title="Total Orders" value="1,248" growth="+18.2%" />
          <StatCard title="Revenue" value="$24,890" growth="+22.5%" />
          <StatCard title="Customers" value="856" growth="+14.7%" />
          <StatCard title="This Month" value="$8,450" growth="+16.3%" />
        </div>

        {/* Middle */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="col-span-2">
            <RevenueChart />
          </div>
          <OrdersTable />
        </div>

        {/* Bottom */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <ProductsList />
          <CategoryChart />
          <Insights />
        </div>
      </div>
    </div>
  );
}
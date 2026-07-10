"use client";

import {
  useEffect,
  useState,
} from "react";
  import axios from "axios";
  import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import OrdersTable from "@/components/dashboard/OrdersTable";
import AudioTable from "@/components/dashboard/AudioTable";
import Books from "./Books";
import QNA from "./Q&A";
import Customers from "./Customers";
import BanksAdmin from "./Bank";
import AdminArticlesPage from "./Article";
import AdminAlertsPage from "./Alert";
import AdminBrokersPage from "./BrokersPage";
import InvestmentsPageAdmim from "./InvestmentsPage";
import AdminSubscriptionsPage from "./subscribers";
import VideoTable from "./VideoTable";

export default function DashboardPage() {


  const [loading, setLoading] =
    useState(true);

  const [authorized, setAuthorized] =
    useState(false);

  const [active, setActive] =
    useState("Dashboard");
  const [stats, setStats] =
    useState<any>(null);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats =
    async () => {

      try {

        const res =
          await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}api/dashboard/stats`,
            {
              withCredentials: true,
            }
          );

        setStats(
          res.data.data
        );

      } catch (error) {

        console.error(
          error
        );
      }
    };
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

    const verifyAdmin = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/auth/me`,
          {
            withCredentials: true,
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!data?.user || data.user.role !== "admin") {
          router.replace("/login");
          return;
        }

        setAuthorized(true);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Admin verify failed:", error);
          router.replace("/login");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    verifyAdmin();

    return () => {
      controller.abort();
    };
  }, [router]);

  // LOADING SCREEN
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4efe7]">

        <div className="text-[#0f172a] text-lg font-semibold">

          Verifying access...

        </div>

      </div>
    );
  }

  // BLOCK RENDER
  if (!authorized) {
    return null;
  }

  const renderContent = () => {

    switch (active) {

      case "Dashboard":

        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

              <StatCard
                title="Total Orders"
                value={
                  stats?.totalOrders?.toLocaleString() ||
                  "0"
                }
                growth={`+${stats?.ordersGrowth || 0}%`}
              />

              <StatCard
                title="Revenue"
                value={`$${stats?.totalRevenue?.toLocaleString() || 0}`}
                growth={`+${stats?.revenueGrowth || 0}%`}
              />

              <StatCard
                title="Customers"
                value={
                  stats?.totalCustomers?.toLocaleString() ||
                  "0"
                }
                growth={`+${stats?.customersGrowth || 0}%`}
              />

              <StatCard
                title="This Month"
                value={`$${stats?.monthlyRevenue?.toLocaleString() || 0}`}
                growth={`+${stats?.monthlyGrowth || 0}%`}
              />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6 items-start">

              {/* CHART */}
              <div className="xl:col-span-6">

                <RevenueChart />

              </div>

              {/* ORDERS */}
              <div className="xl:col-span-6 h-[620px] overflow-hidden rounded-3xl">

                <div className="h-full overflow-y-auto custom-scrollbar pr-1">

                  <OrdersTable dashboardMode />

                </div>

              </div>

            </div>
          </>
        );
      case "Orders":

        return (
          <div className="mt-6">

            <OrdersTable />

          </div>
        );
      case "Brokers":

        return (
          <div className="mt-6">

            <AdminBrokersPage />

          </div>
        );

      case "Audio":

        return (
          <div className="mt-6">

            <AudioTable />

          </div>
        );
        case "Video":

        return (
          <div className="mt-6">
           <VideoTable/>
          </div>
        );
      case "Books":

        return (
          <div className="mt-6">

            <Books />

          </div>
        );
      case "Article":

        return (
          <div className="mt-6">

            <AdminArticlesPage />

          </div>
        );

      case "Alerts":

        return (
          <div className="mt-6">

            <AdminAlertsPage />

          </div>
        );

      case "Q&A":

        return (
          <div className="mt-6">

            <QNA />

          </div>
        );
      case "Subscribers":

        return (
          <div className="mt-6">

            <AdminSubscriptionsPage />

          </div>
        );

      case "Users":

        return (
          <div className="mt-6">

            <Customers />

          </div>
        );
      case "Banks":

        return (
          <div className="mt-6">

            <BanksAdmin />

          </div>
        );

      case "Investments":

        return (
          <div className="mt-6">
            <InvestmentsPageAdmim />
          </div>
        );

      default:

        return (
          <div className="bg-white rounded-2xl p-10 mt-6">

            <h2 className="text-3xl font-semibold">

              {active}

            </h2>

            <p className="text-gray-500 mt-2">

              This section is under
              development.

            </p>

          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f4efe7]">

      {/* SIDEBAR */}
      <Sidebar
        active={active}
        setActive={setActive}
      />

      {/* MAIN */}
      <div className="flex-1 p-6 overflow-x-hidden">

        <Topbar />

        {renderContent()}

      </div>

    </div>
  );
}
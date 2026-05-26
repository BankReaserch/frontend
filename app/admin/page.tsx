"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Sidebar from "./Sidebar";

import Topbar from "@/components/dashboard/Topbar";

import StatCard from "@/components/dashboard/StatCard";

import RevenueChart from "@/components/dashboard/RevenueChart";

import OrdersTable from "@/components/dashboard/OrdersTable";

import ProductsList from "@/components/dashboard/ProductsList";

import CategoryChart from "@/components/dashboard/CategoryChart";

import Insights from "@/components/dashboard/Insights";

import AudioTable from "@/components/dashboard/AudioTable";

import Books from "./Books";

import QNA from "./Q&A";
import Customers from "./Customers";

export default function DashboardPage() {

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  const [authorized, setAuthorized] =
    useState(false);

  const [active, setActive] =
    useState("Dashboard");

  // VERIFY ADMIN
  useEffect(() => {

    let isMounted = true;

    const verifyAdmin =
      async () => {

        try {

          const response =
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}api/auth/me`,
              {
                method: "GET",

                credentials:
                  "include",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                cache: "no-store",
              }
            );

          // UNAUTHORIZED
          if (!response.ok) {

            window.location.href =
              "/login";

            return;
          }

          const data =
            await response.json();

          console.log(
            "AUTH DATA:",
            data
          );

          // NOT ADMIN
          if (
            !data?.user ||
            data.user.role !==
            "admin"
          ) {

            window.location.href =
              "/login";

            return;
          }

          // SUCCESS
          if (isMounted) {
            setAuthorized(true);
          }

        } catch (error) {

          console.error(
            "Admin verify failed:",
            error
          );

          window.location.href =
            "/login";

        } finally {

          if (isMounted) {
            setLoading(false);
          }
        }
      };

    verifyAdmin();

    return () => {
      isMounted = false;
    };

  }, []);

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
                value="1,248"
                growth="+18.2%"
              />

              <StatCard
                title="Revenue"
                value="$24,890"
                growth="+22.5%"
              />

              <StatCard
                title="Customers"
                value="856"
                growth="+14.7%"
              />

              <StatCard
                title="This Month"
                value="$8,450"
                growth="+16.3%"
              />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

              <div className="xl:col-span-2">

                <RevenueChart />

              </div>

              <OrdersTable />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

              <ProductsList />

              <CategoryChart />

              <Insights />

            </div>
          </>
        );

      case "Orders":

        return (
          <div className="mt-6">

            <OrdersTable />

          </div>
        );

      case "Audio":

        return (
          <div className="mt-6">

            <AudioTable />

          </div>
        );

      case "Products":

        return (
          <div className="mt-6">

            <ProductsList />

          </div>
        );

      case "Books":

        return (
          <div className="mt-6">

            <Books />

          </div>
        );

      case "Q&A":

        return (
          <div className="mt-6">

            <QNA />

          </div>
        );

      case "Analytics":

        return (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

            <RevenueChart />

            <CategoryChart />

          </div>
        );
       case "Customers":

        return (
          <div className="mt-6">

           <Customers/>

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
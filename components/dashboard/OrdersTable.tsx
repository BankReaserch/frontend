"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Search,
  Filter,
} from "lucide-react";

import OrderStatusAnalytics from "./OrderStatusAnalytics";

type OrderType = {
  _id: string;

  user?: {
    _id?: string;
    email?: string;
  };

  items: {
    _id?: string;

    title?: string;

    quantity: number;

    price: number;

    book?: {
      _id?: string;

      title?: string;

      coverImage?: string;
    };
  }[];

  totalAmount: number;

  status: string;

  paymentMethod: string;

  paymentStatus: string;

  createdAt: string;

  updatedAt: string;
};

export default function OrdersTable({
  dashboardMode = false,
}: {
  dashboardMode?: boolean;
}) {

  const [orders, setOrders] =
    useState<OrderType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  // FETCH ORDERS
  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders =
    async () => {

      try {

        const response =
          await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}api/order/all`,
            {
              withCredentials: true,
            }
          );

        setOrders(
          response.data.data || []
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  // FILTERED ORDERS
  const filteredOrders =
    orders.filter((o) => {

      const matchesSearch =
        o.user?.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        o._id
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "all" ||
        o.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  if (loading) {

    return (
      <div className="bg-white rounded-2xl p-10 text-center">

        Loading orders...

      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-6">

      {/* ANALYTICS */}
      <OrderStatusAnalytics
        orders={orders}
        dashboardMode={dashboardMode}
      />

      {/* ONLY FOR ORDERS PAGE */}
      {!dashboardMode && (
        <>

          {/* TOP BAR */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">

            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

              <div>

                <h2 className="text-2xl font-semibold text-[#0f172a]">

                  Orders

                </h2>

                <p className="text-gray-500 text-sm mt-1">

                  Manage customer orders and status

                </p>

              </div>

              <div className="flex flex-col sm:flex-row gap-3">

                {/* SEARCH */}
                <div className="relative">

                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    placeholder="Search orders..."
                    className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#c9a84c] w-full"
                  />

                </div>

                {/* FILTER */}
                <div className="relative">

                  <Filter
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(
                        e.target.value
                      )
                    }
                    className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#c9a84c]"
                  >

                    <option value="all">
                      All Status
                    </option>

                    <option value="pending">
                      Pending
                    </option>

                    <option value="processing">
                      Processing
                    </option>

                    <option value="shipped">
                      Shipped
                    </option>

                    <option value="delivered">
                      Delivered
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>

                  </select>

                </div>

              </div>

            </div>

          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

            {/* HEADER */}
            <div className="border-b border-gray-200 bg-[#f8fafc]">

              <table className="w-full">

                <thead>

                  <tr className="text-left text-sm text-gray-500">

                    <th className="px-6 py-4 w-[35%]">

                      Order

                    </th>

                    <th className="px-6 py-4 w-[45%]">

                      Customer

                    </th>

                    <th className="px-6 py-4 w-[20%]">

                      Total

                    </th>

                  </tr>

                </thead>

              </table>

            </div>

            {/* ROWS */}
            <div className="overflow-y-auto custom-scrollbar max-h-[600px]">

              <table className="w-full">

                <tbody>

                  {filteredOrders.map(
                    (order) => (

                      <tr
                        key={order._id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >

                        {/* ORDER */}
                        <td className="px-6 py-5 w-[35%]">

                          <div>

                            <p className="font-semibold text-[#0f172a]">

                              #
                              {order._id
                                .slice(-6)
                                .toUpperCase()}

                            </p>

                            <p className="text-xs text-gray-500 mt-1">

                              {
                                order.items
                                  .length
                              }{" "}
                              items

                            </p>

                          </div>

                        </td>

                        {/* CUSTOMER */}
                        <td className="px-6 py-5 w-[45%]">

                          <p className="text-sm text-[#334155] truncate max-w-[220px]">

                            {
                              order.user
                                ?.email
                            }

                          </p>

                        </td>

                        {/* TOTAL */}
                        <td className="px-6 py-5 w-[20%] font-semibold text-[#0f172a]">

                          $
                          {order.totalAmount?.toFixed(
                            2
                          )}

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </>
      )}

    </div>
  );
}
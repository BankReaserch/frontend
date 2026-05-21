"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Eye,
  CheckCircle2,
  XCircle,
  Clock3,
  Search,
  Filter,
  Truck
} from "lucide-react";

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
const statusColors: Record<
  string,
  string
> = {

  pending:
    "bg-yellow-100 text-yellow-700",

  processing:
    "bg-blue-100 text-blue-700",

  shipped:
    "bg-purple-100 text-purple-700",

  delivered:
    "bg-green-100 text-green-700",

  cancelled:
    "bg-red-100 text-red-700",
};

export default function OrdersTable() {

  const [orders, setOrders] =
    useState<OrderType[]>(
      []
    );

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [selectedOrder, setSelectedOrder] =
    useState<OrderType | null>(
      null
    );

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
              withCredentials:
                true,
            }
          );

        setOrders(
          response.data.data ||
          []
        );

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setLoading(false);

      }
    };

  // UPDATE STATUS
  const updateStatus =
    async (
      orderId: string,
      status: string
    ) => {

      try {

        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}api/order/update-status/${orderId}`,
          {
            status,
          },
          {
            withCredentials:
              true,
          }
        );

        fetchOrders();

      } catch (error) {

        console.error(
          error
        );

        alert(
          "Failed to update order"
        );
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
        statusFilter ===
        "all" ||
        o.status ===
        statusFilter;

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
    <div className="space-y-6">

      {/* TOP BAR */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">

        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

          <div>

            <h2 className="text-2xl font-semibold text-[#0f172a]">

              Orders

            </h2>

            <p className="text-gray-500 text-sm mt-1">

              Manage customer
              orders and status

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
                value={
                  statusFilter
                }
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

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#f8fafc] border-b border-gray-200">

              <tr className="text-left text-sm text-gray-500">

                <th className="px-6 py-4">
                  Order
                </th>

                <th className="px-6 py-4">
                  Customer
                </th>

                <th className="px-6 py-4">
                  Total
                </th>

                <th className="px-6 py-4">
                  Date
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredOrders.map(
                (order) => (

                  <tr
                    key={order._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    {/* ORDER */}
                    <td className="px-6 py-5">

                      <div>

                        <p className="font-semibold text-[#0f172a]">
                          #{order._id.slice(-6).toUpperCase()}
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
                    <td className="px-6 py-5">

                      <div>

                        <p className="font-medium text-[#0f172a]">
                          Customer
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {order.user?.email}
                        </p>

                      </div>

                    </td>

                    {/* TOTAL */}
                    <td className="px-6 py-5 font-semibold text-[#0f172a]">

                      $
                      {order.totalAmount?.toFixed(
                        2
                      )}

                    </td>

                    {/* DATE */}
                    <td className="px-6 py-5 text-sm text-gray-600">

                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}

                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[
                          order
                            .status
                        ]
                          }`}
                      >

                        {
                          order.status
                        }

                      </span>

                    </td>

                   {/* ACTIONS */}
<td className="px-6 py-5">

  <div className="flex items-center gap-2">

    {/* VIEW */}
    <button
      onClick={() =>
        setSelectedOrder(
          order
        )
      }
      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition"
    >
      <Eye size={17} />
    </button>

    {/* DELIVERED */}
    <button
      onClick={() =>
        updateStatus(
          order._id,
          "delivered"
        )
      }
      className="w-9 h-9 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 flex items-center justify-center transition"
    >
      <CheckCircle2 size={17} />
    </button>

    {/* PROCESSING */}
    <button
      onClick={() =>
        updateStatus(
          order._id,
          "processing"
        )
      }
      className="w-9 h-9 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 flex items-center justify-center transition"
    >
      <Clock3 size={17} />
    </button>

    {/* SHIPPED */}
    <button
      onClick={() =>
        updateStatus(
          order._id,
          "shipped"
        )
      }
      className="w-9 h-9 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700 flex items-center justify-center transition"
    >
      <Truck size={17} />
    </button>

    {/* CANCEL */}
    <button
      onClick={() =>
        updateStatus(
          order._id,
          "cancelled"
        )
      }
      className="w-9 h-9 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 flex items-center justify-center transition"
    >
      <XCircle size={17} />
    </button>

  </div>

</td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ORDER MODAL */}
      {selectedOrder && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-3xl w-full max-w-2xl p-7 max-h-[90vh] overflow-y-auto">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-semibold text-[#0f172a]">

                  #{selectedOrder._id
                    .slice(-6)
                    .toUpperCase()}

                </h2>

                <p className="text-sm text-gray-500 mt-1">

                  Order details

                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedOrder(
                    null
                  )
                }
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
              >

                ✕

              </button>

            </div>

            {/* CUSTOMER */}
            <div className="grid grid-cols-2 gap-5 mb-6">

              <div className="bg-gray-50 rounded-2xl p-4">

                <p className="text-xs text-gray-500 uppercase">

                  Customer

                </p>

                <p className="font-semibold mt-2">

                {selectedOrder.user?.email}

                </p>

              </div>

              <div className="bg-gray-50 rounded-2xl p-4">

                <p className="text-xs text-gray-500 uppercase">

                  Contact

                </p>

                <p className="font-semibold mt-2">

                  {selectedOrder.user?.email}

                </p>

              </div>

            </div>

            {/* ADDRESS */}
            {/* <div className="bg-gray-50 rounded-2xl p-4 mb-6">

              <p className="text-xs text-gray-500 uppercase">

                Address

              </p>

              <p className="font-medium mt-2">

                {
                  selectedOrder
                    .contactInfo
                    ?.address
                }

              </p>

            </div> */}

            {/* ITEMS */}
            <div className="space-y-4">

              <h3 className="font-semibold text-lg">

                Ordered Items

              </h3>

              {selectedOrder.items.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-2xl p-4"
                  >

                    <div>

                      <p className="font-medium text-[#0f172a]">

                        {item.title ||
                          item.book?.title}

                      </p>

                      <p className="text-xs text-gray-500 mt-1">

                        Qty:{" "}
                        {
                          item.quantity
                        }

                      </p>

                    </div>

                    <p className="font-semibold">

                      $
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(
                        2
                      )}

                    </p>

                  </div>
                )
              )}

            </div>

            {/* TOTAL */}
            <div className="border-t border-gray-200 mt-6 pt-5 flex justify-between items-center">

              <span className="text-lg font-semibold">

                Total

              </span>

              <span className="text-2xl font-bold text-[#0f172a]">

                $
                {selectedOrder.totalAmount?.toFixed(
                  2
                )}

              </span>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
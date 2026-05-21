"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import DashboardHeader
  from "../components/DashboardHeader";

import { OrderType }
  from "../types/dashboard";
import ConfirmModal from "@/components/utils/modal/ConfirmModal";

export default function OrdersPage() {

  const [orders, setOrders] =
    useState<OrderType[]>([]);

  const [loading, setLoading] =
    useState(true);
  const [cancelOrderId, setCancelOrderId] =
    useState<string | null>(
      null
    );

  const [cancelLoading, setCancelLoading] =
    useState(false);
  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders =
    async () => {

      try {

        const response =
          await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}api/order/my-orders`,
            {
              withCredentials: true,
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
  const statusStyles: Record<
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

  const cancelOrder =
    async () => {

      if (!cancelOrderId)
        return;

      try {

        setCancelLoading(
          true
        );

        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}api/order/cancel/${cancelOrderId}`,
          {},
          {
            withCredentials:
              true,
          }
        );

        fetchOrders();

        setCancelOrderId(
          null
        );

      } catch (error: any) {

        alert(
          error?.response?.data
            ?.message ||
          "Failed to cancel order"
        );

      } finally {

        setCancelLoading(
          false
        );
      }
    };
  if (loading) {

    return (
      <div>
        Loading...
      </div>
    );

  }

  return (
    <div>

      <DashboardHeader
        title="My Orders"
        subtitle="Track your purchases and orders."
      />

      <div className="space-y-5">

        {orders.map(
          (order) => (

            <div
              key={order._id}
              className="bg-white rounded-2xl border p-5"
            >

              <div className="flex items-center justify-between mb-5">

                <div>

                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <h2 className="font-semibold">
                    #
                    {order._id.slice(
                      -6
                    )}
                  </h2>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[
                    order.status
                  ]
                    }`}
                >
                  {order.status}
                </span>

              </div>

              <div className="space-y-4">

                {order.items.map(
                  (item) => (

                    <div
                      key={
                        item.book
                          ._id
                      }
                      className="flex gap-4"
                    >

                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${item.book.coverImage}`}
                        alt={
                          item.book
                            .title
                        }
                        className="w-16 h-20 object-cover rounded-lg border"
                      />

                      <div>

                        <h3 className="font-medium">
                          {
                            item.book
                              .title
                          }
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Qty:
                          {
                            item.quantity
                          }
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

              <div className="border-t mt-5 pt-4 flex items-center justify-between">

                <span className="text-sm text-gray-500">

                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}

                </span>

                <div className="flex items-center gap-3">

                  <span className="font-bold">

                    $
                    {order.totalAmount.toFixed(
                      2
                    )}

                  </span>

                  {(order.status ===
                    "pending" ||
                    order.status ===
                    "processing") && (

                      <button
                        onClick={() =>
                          setCancelOrderId(
                            order._id
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium transition"
                      >
                        Cancel Order
                      </button>

                    )}

                </div>

              </div>
            </div>

          )
        )}

      </div>
      <ConfirmModal
        open={!!cancelOrderId}
        onClose={() =>
          setCancelOrderId(
            null
          )
        }
        onConfirm={cancelOrder}
        loading={cancelLoading}
        title="Cancel Order?"
        description="This order will be cancelled and cannot be restored later."
        confirmText="Yes, Cancel"
      />
    </div>
  );
}
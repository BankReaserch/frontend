"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  BarChart3,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Order = {
  status: string;
  createdAt: string;
};

type Props = {
  orders: Order[];
  dashboardMode?: boolean;
};

const COLORS = {
  Pending: "#facc15",
  Processing: "#3b82f6",
  Shipped: "#a855f7",
  Delivered: "#22c55e",
  Cancelled: "#ef4444",
};

export default function OrderStatusAnalytics({
  orders,
  dashboardMode = false,
}: Props) {

  const [range, setRange] =
    useState("30days");

  /*
  ========================================
  FILTER ORDERS
  ========================================
  */

  const filteredOrders =
    useMemo(() => {

      const now =
        new Date();

      return orders.filter(
        (order) => {

          const orderDate =
            new Date(
              order.createdAt
            );

          const diffDays =
            (
              now.getTime() -
              orderDate.getTime()
            ) /
            (
              1000 *
              60 *
              60 *
              24
            );

          if (
            range ===
            "30days"
          ) {
            return (
              diffDays <=
              30
            );
          }

          if (
            range ===
            "3months"
          ) {
            return (
              diffDays <=
              90
            );
          }

          if (
            range ===
            "6months"
          ) {
            return (
              diffDays <=
              180
            );
          }

          return (
            diffDays <=
            365
          );
        }
      );
    }, [
      orders,
      range,
    ]);

  /*
  ========================================
  DATA
  ========================================
  */

  const chartData = [
    {
      status:
        "Pending",
      value:
        filteredOrders.filter(
          (o) =>
            o.status ===
            "pending"
        ).length,
    },
    {
      status:
        "Processing",
      value:
        filteredOrders.filter(
          (o) =>
            o.status ===
            "processing"
        ).length,
    },
    {
      status:
        "Shipped",
      value:
        filteredOrders.filter(
          (o) =>
            o.status ===
            "shipped"
        ).length,
    },
    {
      status:
        "Delivered",
      value:
        filteredOrders.filter(
          (o) =>
            o.status ===
            "delivered"
        ).length,
    },
    {
      status:
        "Cancelled",
      value:
        filteredOrders.filter(
          (o) =>
            o.status ===
            "cancelled"
        ).length,
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6">

      {/* HEADER */}
{!dashboardMode && (
  <div className="flex items-center justify-between mb-8">

    <div>

      <div className="flex items-center gap-2">

        <BarChart3
          size={18}
          className="text-[#c9a84c]"
        />

        <h3 className="text-xl font-semibold text-[#0f172a]">

          Order Analytics

        </h3>

      </div>

      <p className="text-sm text-gray-500 mt-1">

        Interactive order status overview

      </p>

    </div>

    {/* FILTER */}
    <select
      value={range}
      onChange={(e) =>
        setRange(
          e.target.value
        )
      }
      className="h-11 px-4 rounded-xl border border-gray-200 bg-[#faf8f4] text-sm outline-none focus:ring-2 focus:ring-[#c9a84c]"
    >

      <option value="30days">
        Last 30 Days
      </option>

      <option value="3months">
        Last 3 Months
      </option>

      <option value="6months">
        Last 6 Months
      </option>

      <option value="1year">
        Last 1 Year
      </option>

    </select>

  </div>
)}

      {/* CHART */}
      <div className="h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={chartData}
            barSize={60}
          >

            <XAxis
              dataKey="status"
              tick={{
                fill:
                  "#64748b",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              allowDecimals={
                false
              }
              tick={{
                fill:
                  "#64748b",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                fill:
                  "rgba(0,0,0,0.03)",
              }}
              contentStyle={{
                borderRadius:
                  "16px",
                border:
                  "1px solid #e2e8f0",
                background:
                  "#fff",
              }}
            />

            <Bar
              dataKey="value"
              radius={[
                12,
                12,
                0,
                0,
              ]}
            >

              {chartData.map(
                (
                  entry,
                  index
                ) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        entry.status as keyof typeof COLORS
                      ]
                    }
                  />
                )
              )}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}
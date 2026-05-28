"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

type ChartItem = {
  month: string;

  revenue: number;

  orders: number;
};

type Stats = {
  totalRevenue: number;

  totalOrders: number;
};

export default function RevenueChart() {

  const [data, setData] =
    useState<ChartItem[]>(
      []
    );
    const [range, setRange] =
  useState("6months");

  const [stats, setStats] =
    useState<Stats>({
      totalRevenue: 0,

      totalOrders: 0,
    });

  const [loading, setLoading] =
    useState(true);

  /*
  ========================================
  FETCH DATA
  ========================================
  */

  useEffect(() => {

    fetchChart();

  }, [range]);

  const fetchChart =
    async () => {

      try {

        const res =
          await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}api/dashboard/revenue-chart?range=${range}`,
            {
              withCredentials: true,
            }
          );

        setData(
          res.data.data
        );

        setStats(
          res.data.stats
        );

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setLoading(false);
      }
    };

  /*
  ========================================
  AOV
  ========================================
  */

  const aov =
    stats.totalOrders > 0
      ? (
        stats.totalRevenue /
        stats.totalOrders
      ).toFixed(2)
      : "0";

  return (
    <div className="bg-white rounded-[28px] border border-[#ebe3d6] p-6 shadow-sm h-[620px] flex flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <p className="text-xs uppercase tracking-[0.25em] text-[#c8a21a] font-semibold">

            Analytics

          </p>

          <h2 className="font-serif text-4xl text-[#051933] mt-3">

            Revenue Overview

          </h2>

        </div>

        <select
          value={range}
          onChange={(e) =>
            setRange(
              e.target.value
            )
          }
          className="px-4 h-11 rounded-full bg-[#f8f4ec] border border-[#ece2d4] text-sm text-[#64748b] outline-none"
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

      {/* CHART */}
      <div className="flex-1 min-h-0">

        {loading ? (

          <div className="h-full flex items-center justify-center text-[#64748b]">

            Loading chart...

          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={data}
            >

              <defs>

                <linearGradient
                  id="colorRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#c8a21a"
                    stopOpacity={
                      0.35
                    }
                  />

                  <stop
                    offset="95%"
                    stopColor="#c8a21a"
                    stopOpacity={
                      0
                    }
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={
                  false
                }
                stroke="#f1ebe2"
              />

              <XAxis
                dataKey="month"
                tickLine={
                  false
                }
                axisLine={
                  false
                }
                tick={{
                  fill:
                    "#64748b",
                  fontSize: 12,
                }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius:
                    "16px",
                  border:
                    "1px solid #ebe3d6",
                  background:
                    "#fff",
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#c8a21a"
                strokeWidth={
                  3
                }
                fillOpacity={
                  1
                }
                fill="url(#colorRevenue)"
              />

            </AreaChart>

          </ResponsiveContainer>
        )}

      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#f1ebe2]">

        {/* REVENUE */}
        <div>

          <p className="text-sm text-[#64748b]">

            Revenue

          </p>

          <p className="text-2xl font-semibold text-[#051933] mt-2">

            $
            {stats.totalRevenue.toLocaleString()}

          </p>

        </div>

        {/* ORDERS */}
        <div>

          <p className="text-sm text-[#64748b]">

            Orders

          </p>

          <p className="text-2xl font-semibold text-[#051933] mt-2">

            {stats.totalOrders.toLocaleString()}

          </p>

        </div>

        {/* AOV */}
        <div>

          <p className="text-sm text-[#64748b]">

            AOV

          </p>

          <p className="text-2xl font-semibold text-[#051933] mt-2">

            ${aov}

          </p>

        </div>

      </div>

    </div>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import {
    BellRing,
    Search,
    Users,
    BadgeCheck,
    Clock3,
    TrendingUp,
    Mail,
    Trash2,
    Download,
} from "lucide-react";
import axios from "axios";

type SubscriberType = {
    _id: string;
    email: string;
    isVerified: boolean;
    source: "Guest" | "Registered User";
    createdAt: string;
    updatedAt: string;

    user: {
        _id: string;
        email: string;
    } | null;
};
export default function SubscribersPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<
        "all" | "verified" | "pending"
    >("all");

    const [allSubscribers, setAllSubscribers] = useState<SubscriberType[]>([]);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}api/subscribers`,
                    {
                        withCredentials: true,
                    }
                );
                setAllSubscribers(res.data.data || []);

            } catch (error) {
                console.error(
                    "Failed to fetch subscribers:",
                    error
                );
            }
        };

        fetchSubscribers();
    }, []);

    const filteredSubscribers = useMemo(() => {
        return allSubscribers.filter((subscriber) => {
            const matchesSearch =
                subscriber.email
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesFilter =
                filter === "all"
                    ? true
                    : filter === "verified"
                        ? subscriber.isVerified
                        : !subscriber.isVerified;

            return matchesSearch && matchesFilter;
        });
    }, [search, filter]);

    const totalSubscribers =
        allSubscribers.length;

    const verifiedSubscribers =
        allSubscribers.filter(
            (s) => s.isVerified
        ).length;

    const pendingSubscribers =
        allSubscribers.filter(
            (s) => !s.isVerified
        ).length;

    const growthThisMonth =
        allSubscribers.filter((subscriber) => {
            const created =
                new Date(subscriber.createdAt);

            const now = new Date();

            return (
                created.getMonth() === now.getMonth() &&
                created.getFullYear() ===
                now.getFullYear()
            );
        }).length;
    return (
        <div className="min-h-screen bg-[#051933] p-6">
            <div className="max-w-7xl mx-">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-3">
                            <BellRing className="w-8 h-8 text-[#C8A21A]" />

                            <h1 className="text-4xl font-serif text-white">
                                Subscribers
                            </h1>
                        </div>

                        <p className="text-[#94A3B8] mt-2">
                            Manage and alert.
                        </p>
                    </div>

                    <button
                        className="
              flex items-center gap-2
              bg-[#C8A21A]
              hover:bg-[#D4AF37]
              text-[#051933]
              font-semibold
              px-5 py-3
              rounded-xl
              transition
            "
                    >
                        <Download size={18} />
                        Export CSV
                    </button>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
                    <StatCard
                        icon={<Users />}
                        title="Total Subscribers"
                        value={totalSubscribers}
                    />

                    <StatCard
                        icon={<BadgeCheck />}
                        title="Verified"
                        value={verifiedSubscribers}
                    />

                    <StatCard
                        icon={<Clock3 />}
                        title="Pending"
                        value={pendingSubscribers}
                    />

                    <StatCard
                        icon={<TrendingUp />}
                        title="Growth This Month"
                        value={growthThisMonth}
                    />
                </div>

                {/* SEARCH + FILTERS */}
                <div className="bg-[#0B2340] border border-[#14365E] rounded-3xl p-5 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">

                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] w-5 h-5" />

                            <input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search by email..."
                                className="
                  w-full
                  h-12
                  rounded-xl
                  bg-[#051933]
                  border
                  border-[#14365E]
                  pl-12
                  pr-4
                  text-white
                  outline-none
                "
                            />
                        </div>

                        <div className="flex gap-2">
                            {[
                                "all",
                                "verified",
                                "pending",
                            ].map((item) => (
                                <button
                                    key={item}
                                    onClick={() =>
                                        setFilter(
                                            item as any
                                        )
                                    }
                                    className={`
                    px-4 py-3
                    rounded-xl
                    capitalize
                    font-medium
                    transition
                    ${filter === item
                                            ? "bg-[#C8A21A] text-[#051933]"
                                            : "bg-[#051933] text-white border border-[#14365E]"
                                        }
                  `}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-hidden rounded-3xl border border-[#14365E] bg-[#0B2340]">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#14365E]">
                                    <th className="text-left p-5 text-[#94A3B8]">
                                        Subscriber
                                    </th>

                                    <th className="text-left p-5 text-[#94A3B8]">
                                        Status
                                    </th>

                                    <th className="text-left p-5 text-[#94A3B8]">
                                        Source
                                    </th>

                                    <th className="text-left p-5 text-[#94A3B8]">
                                        Joined
                                    </th>

                                    <th className="text-right p-5 text-[#94A3B8]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredSubscribers.map(
                                    (subscriber) => (
                                        <tr
                                            key={subscriber._id}
                                            className="
                        border-b
                        border-[#14365E]
                        hover:bg-white/[0.02]
                        transition
                      "
                                        >
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-11 h-11 rounded-full bg-[#C8A21A]/15 flex items-center justify-center">
                                                        <Mail className="w-5 h-5 text-[#C8A21A]" />
                                                    </div>

                                                    <div>
                                                        <p className="text-white font-medium">
                                                            {subscriber.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-5">
                                                {subscriber.isVerified ? (
                                                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-sm">
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-sm">
                                                        Pending
                                                    </span>
                                                )}
                                            </td>

                                            <td className="p-5 text-[#D3DCE8]">
                                                {subscriber.source}
                                            </td>

                                            <td className="p-5 text-[#D3DCE8]">
                                                {new Date(
                                                    subscriber.createdAt
                                                ).toLocaleDateString()}
                                            </td>

                                            <td className="p-5">
                                                <div className="flex justify-end gap-2">

                                                    <button className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-400">
                                                        <Trash2 size={16} />
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

            </div>
        </div>
    );
}

function StatCard({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
}) {
    return (
        <div
            className="
        rounded-3xl
        border
        border-[#14365E]
        bg-[#0B2340]
        p-6
      "
        >
            <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#C8A21A]/15 flex items-center justify-center text-[#C8A21A]">
                    {icon}
                </div>

                <span className="text-3xl font-bold text-white">
                    {value}
                </span>
            </div>

            <p className="text-[#94A3B8] mt-4">
                {title}
            </p>
        </div>
    );
}

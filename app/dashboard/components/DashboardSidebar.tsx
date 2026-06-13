"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  BookOpen,
  BadgeCheck,
  LogOut
} from "lucide-react";
import {
  useRouter,
} from "next/navigation";

import axios from "axios";

import {
  useState,
} from "react";
import ConfirmModal from "@/components/utils/modal/ConfirmModal";



const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: Package,
  },
  {
    label: "My Library",
    href: "/dashboard/library",
    icon: BookOpen,
  },
  {
    label: "Plan",
    href: "/dashboard/plan",
    icon: BadgeCheck,
  },
];

export default function DashboardSidebar() {
  const router =useRouter();
  const [logoutOpen, setLogoutOpen] =useState(false);
  const [loading, setLoading] =useState(false);
  const pathname =usePathname();
  const handleLogout =async () => {
      try {
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/auth/logout`,
          {},
          {
            withCredentials:true,
          }
        );
        router.replace(
          "/login"
        );
      } catch (error) {
        console.error(
          error
        );
      } finally {
        setLoading(false);
        setLogoutOpen(false);
      }
    };
  return (
    <>
      <aside className="w-64 bg-[#0d1b2a] flex flex-col">

        {/* LOGO */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">

          <div className="w-9 h-9 bg-[#c9a84c] rounded-md flex items-center justify-center">

            <span className="text-[#0d1b2a] font-bold">
              ר
            </span>

          </div>

          <span className="text-white font-semibold">
            Ribis
          </span>

        </div>

        {/* NAV */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => {

            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${active
                  ? "bg-[#c9a84c]/15 text-[#c9a84c]"
                  : "text-[#8a9bb0] hover:bg-white/5"
                  }`}
              >
                <Icon size={18} />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* USER PROFILE */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c9a84c] text-[#0d1b2a] flex items-center justify-center font-bold">
              SA
            </div>

            <div>
              <p className="text-white text-sm">
                Samir
              </p>

              <p className="text-[#8a9bb0] text-xs">
                Member
              </p>
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => setLogoutOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#8a9bb0] hover:bg-red-500/10 hover:text-red-300 transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <ConfirmModal
        open={logoutOpen}
        onClose={() =>
          setLogoutOpen(false)
        }
        onConfirm={handleLogout}
        loading={loading}
        title="Logout?"
        description="You will be securely logged out from your account."
        confirmText="Logout"
      />
    </>
  );
}
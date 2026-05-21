"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import {
  LogOut,
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
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
  },
  {
    label: "My Library",
    href: "/dashboard/library",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
  },
];

export default function DashboardSidebar() {

  const router =
    useRouter();

  const [logoutOpen, setLogoutOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);
  const pathname =
    usePathname();

  const handleLogout =
    async () => {

      try {

        setLoading(true);

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}api/auth/logout`,
          {},
          {
            withCredentials:
              true,
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

          {NAV_ITEMS.map(
            (item) => {

              const active =
                pathname ===
                item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl text-sm transition ${active
                    ? "bg-[#c9a84c]/15 text-[#c9a84c]"
                    : "text-[#8a9bb0] hover:bg-white/5"
                    }`}
                >
                  {item.label}
                </Link>
              );

            }
          )}

        </nav>
        {/* LOGOUT */}
        <div className="p-3 border-t border-white/10">

          <button
            onClick={() =>
              setLogoutOpen(true)
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-300 hover:bg-red-500/10 hover:text-red-200 transition cursor-pointer"
          >

            <LogOut size={18} />

            Logout

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
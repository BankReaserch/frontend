"use client";

import { LogOut } from "lucide-react";

import { useRouter } from "next/navigation";

export default function Topbar() {

  const router =
    useRouter();

  const handleLogout =
    async () => {

      try {

        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/auth/logout`,
          {
            method: "POST",

            credentials:
              "include",
          }
        );

        router.replace(
          "/login"
        );

      } catch (error) {

        console.error(
          "Logout failed",
          error
        );
      }
    };

  return (
    <div className="w-full bg-white rounded-2xl px-6 py-4 shadow-sm border border-[#ede7dc] flex items-center justify-between">

      {/* LEFT */}
      <div>

        <h1 className="text-2xl font-semibold text-[#0b1d2d]">

          Admin Dashboard

        </h1>

        <p className="text-sm text-[#7d8b99] mt-1">

          Manage books, audio, orders and users

        </p>

      </div>

      {/* RIGHT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-[#0b1d2d] hover:bg-[#13283c] text-white px-5 py-3 rounded-xl transition-all duration-200"
      >

        <LogOut size={18} />

        <span className="text-sm font-medium">

          Logout

        </span>

      </button>

    </div>
  );
}
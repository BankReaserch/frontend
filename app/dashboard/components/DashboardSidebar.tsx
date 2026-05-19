"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

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

  const pathname =
    usePathname();

  return (
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
                className={`block px-4 py-3 rounded-xl text-sm transition ${
                  active
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

    </aside>
  );
}
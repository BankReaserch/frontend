"use client";

import {
  LayoutDashboard,
  ShoppingCart,
  FileVolume,
  Package,
  Download,
  Users,
  TicketPercent,
  BarChart3,
  Star,
  Settings,
  BookUser,
} from "lucide-react";

interface SidebarProps {
  active: string;
  setActive: React.Dispatch<
    React.SetStateAction<string>
  >;
}

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Orders",
    icon: ShoppingCart,
  },
  {
    name: "Audio",
    icon: FileVolume,
  },
  // {
  //   name: "Products",
  //   icon: Package,
  // },
  {
    name: "Books",
    icon: BookUser,
  },
  // {
  //   name: "Downloads",
  //   icon: Download,
  // },
  {
    name: "Customers",
    icon: Users,
  },
  // {
  //   name: "Coupons",
  //   icon: TicketPercent,
  // },
  // {
  //   name: "Analytics",
  //   icon: BarChart3,
  // },
  // {
  //   name: "Reviews",
  //   icon: Star,
  // },
  // {
  //   name: "Settings",
  //   icon: Settings,
  // },
];

export default function Sidebar({
  active,
  setActive,
}: SidebarProps) {
  return (
    <aside className="w-72 bg-[#0b1d2d] text-white min-h-screen border-r border-white/5 p-5">

      {/* LOGO */}
      <div className="mb-10">
        <h1 className="text-2xl font-serif font-semibold text-[#c9a84c]">
          Ribis
        </h1>

        <p className="text-[#8a9bb0] text-sm mt-1">
          Admin Dashboard
        </p>
      </div>

      {/* MENU */}
      <div className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          const isActive =
            active === item.name;

          return (
            <button
              key={item.name}
              onClick={() =>
                setActive(item.name)
              }
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-[#c9a84c] text-[#0b1d2d]"
                    : "text-[#9db0c3] hover:bg-white/[0.05] hover:text-white"
                }
              `}
            >
              <Icon size={18} />

              <span className="text-sm font-medium">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
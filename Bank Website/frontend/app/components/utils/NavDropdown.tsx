"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "../../../types/nav";

type Props = {
  item: NavItem;
};

const NavDropdown=({ item }: Props)=> {
  return (
    <div className="relative group">
      {/* TRIGGER */}
      <button className="flex items-center gap-1 hover:text-white transition">
        {item.name}

        {item.children && (
          <ChevronDown
            size={16}
            className="transition-transform duration-300 group-hover:rotate-180"
          />
        )}
      </button>

      {/* DROPDOWN */}
      {item.children && (
        <div
          className="
          absolute left-1/2 -translate-x-1/2 mt-5 w-56
          opacity-0 invisible group-hover:visible group-hover:opacity-100
          group-hover:translate-y-0 translate-y-2
          transition-all duration-300
        "
        >
          <div className="rounded-2xl border border-white/10 bg-[#0F2538]/90 backdrop-blur-xl shadow-2xl p-2">
            {item.children.map((child) => (
              <Link
                key={child.name}
                href={child.href || "#"}
                className="flex items-center justify-between px-4 py-3 text-sm text-gray-300 
                rounded-lg hover:bg-white/5 hover:text-white transition group/item"
              >
                {child.name}
                <span className="opacity-0 group-hover/item:opacity-100 transition">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavDropdown
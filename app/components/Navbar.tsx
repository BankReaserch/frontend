"use client";

import { useState } from "react";
import { CloseIcon, MenuIcon } from "./utils/icons";
import type { NavItem } from "@/types/nav";
import NavDropdown from "./utils/NavDropdown";

const NAV_ITEMS: NavItem[] = [
  {
    name: "Home",
    children: [
      { name: "About" },
      { name: "Team" },
      { name: "Highlights" },
      { name: "Contact" },
    ],
  },
  {
    name: "Services",
    children: [
      { name: "Banks" },
      { name: "Brokers" },
      { name: "Investments" },
      { name: "Businesses" },
    ],
  },
  {
    name: "Education",
    children: [
      { name: "Shiurim" },
      { name: "Magazine" },
      { name: "Articles" },
      { name: "Programs" },
      { name: "Alerts" },
    ],
  },
  {
    name: "Shop",
    children: [{ name: "Store" }],
  },
  {
    name: "Departments",
    children: [
      { name: "Bais Horaah" },
      { name: "Heter Iska" },
      { name: "Donate" },
      { name: "Contact" },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-md bg-[#C8A75B] flex items-center justify-center text-black font-bold">
            ר
          </div>
          <span className="text-white text-lg font-semibold">
            Ribis
          </span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10 text-sm text-gray-300 uppercase">
          {NAV_ITEMS.map((item) => (
            <NavDropdown key={item.name} item={item} />
          ))}
        </nav>

        {/* CTA */}
        <button className="hidden md:block bg-[#C8A75B] text-black px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition">
          CONTACT US
        </button>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-[#0B1C2C]/95 backdrop-blur-md transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6 text-white"
        >
          <CloseIcon />
        </button>

        <div className="flex flex-col items-center justify-center h-full gap-6 text-white text-lg">

          {NAV_ITEMS.map((item, index) => (
            <div key={item.name} className="text-center">
              <button
                onClick={() =>
                  setActive(active === index ? null : index)
                }
                className="flex items-center gap-2"
              >
                {item.name}
              </button>

              {active === index && item.children && (
                <div className="mt-3 flex flex-col gap-3 text-base text-gray-300">
                  {item.children.map((child) => (
                    <span
                      key={child.name}
                      className="hover:text-[#C8A75B]"
                    >
                      {child.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="mt-6 bg-[#C8A75B] text-black px-6 py-3 rounded-lg font-medium">
            CONTACT US
          </button>
        </div>
      </div>
    </header>
  );
}
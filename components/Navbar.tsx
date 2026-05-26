"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CloseIcon, MenuIcon } from "./utils/icons";
import type { NavItem } from "@/types/nav";
import NavDropdown from "./utils/NavDropdown";
import Link from "next/link";

const NAV_ITEMS: NavItem[] = [
  {
    name: "Home",
    children: [
      { name: "About", href: "/about" },
      { name: "Team", href: "/about/#team" },
      { name: "Highlights", href: "/highlights" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    name: "Services",
    children: [
      { name: "Banks", href: "/banks" },
      { name: "Brokers", href: "/brokers" },
      { name: "Investments", href: "/Investments" },
      { name: "Businesses", href: "/businesses" },
    ],
  },
  {
    name: "Education",
    children: [
      { name: "Shiurim", href: "/shiurim" },
      { name: "Q&A", href: "/Q&A" },
      { name: "Articles", href: "/article" },
      { name: "Programs", href: "/programs" },
      { name: "Alerts", href: "/programs/#alerts" },
    ],
  },
  {
    name: "Shop",
    children: [{ name: "Store", href: "/store" }],
  },
  {
    name: "Departments",
    children: [
      { name: "Bais Horaah", href: "/bais-horaah" },
      { name: "Heter Iska", href: "/heter-iska" },
      { name: "Donate", href: "/donate" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        {/* LOGO */}
        <Link href={'/'} className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-md bg-[#C8A75B] flex items-center justify-center text-black font-bold">
            ר
          </div>
          <span className="text-white text-lg font-semibold">
            Ribis
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10 text-sm text-gray-300 uppercase">
          {NAV_ITEMS.map((item) => (
            <NavDropdown key={item.name} item={item} />
          ))}
        </nav>

        {/* CTA */}
        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">

          {/* CART */}
          {totalItems > 0 && (
            <Link
              href="/cart"
              className="relative flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition"
            >
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.3 6.2a1 1 0 001 .8h12.6"
                />
              </svg>

              <span className="text-white text-sm font-medium">
                Cart
              </span>

              {/* Badge */}
              <div className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 bg-[#C8A75B] text-black text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-[#0B1C2C]">
                {totalItems}
              </div>
            </Link>
          )}

          {/* CONTACT BUTTON */}
          <Link
            href={"/contact"}
            className="bg-[#C8A75B] text-black px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
          >
            CONTACT US
          </Link>
        </div>

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
          {/* RIGHT SIDE */}
<div className="hidden md:flex items-center gap-4">

  {/* CART */}
  {totalItems > 0 && (
    <Link
      href="/cart"
      className="relative flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition"
    >
      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.3 6.2a1 1 0 001 .8h12.6"
        />
      </svg>

      <span className="text-white text-sm font-medium">
        Cart
      </span>

      {/* Badge */}
      <div className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 bg-[#C8A75B] text-black text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-[#0B1C2C]">
        {totalItems}
      </div>
    </Link>
  )}

  {/* CONTACT BUTTON */}
  <Link
    href={"/contact"}
    className="bg-[#C8A75B] text-black px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
  >
    CONTACT US
  </Link>
</div>
        </div>
      </div>
    </header>
  );
}
"use client";

import { useState, useMemo } from "react";

const ORDERS = [
  { id: "RB-10291", book: "Hilchos Ribis: A Practical Guide", author: "Rabbi Y. Blumenkrantz", date: "May 8, 2026", price: 34.99, status: "Delivered", step: 3, address: "123 Main St, Lakewood NJ 08701", qty: 1, shipping: "Standard" },
  { id: "RB-10244", book: "The Heter Iska Handbook", author: "Rabbi M. Tendler", date: "Apr 29, 2026", price: 56.00, status: "Shipped", step: 2, address: "123 Main St, Lakewood NJ 08701", qty: 2, shipping: "Express" },
  { id: "RB-10198", book: "Interest-Free Finance in Halacha", author: "Rabbi A. Weiss", date: "Apr 14, 2026", price: 22.50, status: "Delivered", step: 3, address: "123 Main St, Lakewood NJ 08701", qty: 1, shipping: "Standard" },
  { id: "RB-10155", book: "Audio: Ribis Shiur Series", author: "Rabbi P. Krohn", date: "Mar 30, 2026", price: 54.00, status: "Processing", step: 0, address: "123 Main St, Lakewood NJ 08701", qty: 1, shipping: "Standard" },
  { id: "RB-10102", book: "Hilchos Ribis: A Practical Guide", author: "Rabbi Y. Blumenkrantz", date: "Feb 11, 2026", price: 34.99, status: "Delivered", step: 3, address: "123 Main St, Lakewood NJ 08701", qty: 1, shipping: "Standard" },
  { id: "RB-10048", book: "Responsa on Modern Banking", author: "Rabbi S. Wosner zt\"l", date: "Jan 5, 2026", price: 16.99, status: "Delivered", step: 3, address: "123 Main St, Lakewood NJ 08701", qty: 1, shipping: "Economy" },
];

const RECOMMENDED = [
  { title: "Sha'alos U'Teshuvos: Ribis", author: "Dayan C. Feldman", category: "Responsa", price: 38.00 },
  { title: "Audio: Ribis Shiur Series (12 CDs)", author: "Rabbi P. Krohn", category: "Audio", price: 54.00 },
  { title: "Responsa on Modern Banking", author: "Rabbi S. Wosner zt\"l", category: "Responsa", price: 42.00 },
];

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard" },
  { label: "My orders", href: "/dashboard/orders" },
  { label: "Sha'alah", href: "/dashboard/shaalah" },
  { label: "Education", href: "/dashboard/education" },
  { label: "Bank directory", href: "/bank-directory" },
  { label: "Settings", href: "/dashboard/settings" },
];

const STEPS = ["Confirmed", "Packed", "Shipped", "Delivered"];

const STATUS_STYLES: Record<string, string> = {
  Delivered: "bg-[#e1f5ee] text-[#085041]",
  Shipped: "bg-[#e6f1fb] text-[#0c447c]",
  Processing: "bg-[#faeeda] text-[#633806]",
  Cancelled: "bg-[#fcebeb] text-[#791f1f]",
};

type Order = typeof ORDERS[number];

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold ${STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

function OrderTracking({ step }: { step: number }) {
  return (
    <div className="flex items-start gap-0 mt-1">
      {STEPS.map((s, i) => {
        const isDone = i < step;
        const isActive = i === step;
        return (
          <div key={s} className="flex-1 text-center relative">
            {i < STEPS.length - 1 && (
              <div className={`absolute top-[10px] left-1/2 right-[-50%] h-[1.5px] z-0 ${i < step ? "bg-[#0d1b2a]" : "bg-[#e5ddd0]"}`} />
            )}
            <div className={`w-5 h-5 rounded-full mx-auto mb-1.5 flex items-center justify-center z-10 relative border-[1.5px] ${isDone ? "bg-[#0d1b2a] border-[#0d1b2a]" : isActive ? "bg-[#c9a84c] border-[#c9a84c]" : "bg-[#f5f0e8] border-[#e5ddd0]"}`}>
              {isDone && (
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {isActive && <div className="w-2 h-2 rounded-full bg-[#0d1b2a]" />}
            </div>
            <p className={`text-[9px] leading-tight ${isDone ? "text-[#0d1b2a] font-medium" : isActive ? "text-[#c9a84c] font-medium" : "text-[#8a9bb0]"}`}>{s}</p>
          </div>
        );
      })}
    </div>
  );
}

function OrderDetail({ order, onClose }: { order: Order; onClose: () => void }) {
  return (
    <div className="bg-white border border-[#e5ddd0] rounded-xl p-5 mt-4">
      <div className="flex items-start justify-between mb-4 pb-3 border-b border-[#f0ece4]">
        <div>
          <p className="text-[#0d1b2a] font-serif text-base">{order.id}</p>
          <p className="text-[#8a9bb0] text-xs mt-0.5">Placed {order.date}</p>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-md border border-[#e5ddd0] flex items-center justify-center text-[#8a9bb0] hover:bg-[#f5f0e8] transition text-sm">
          ✕
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: "Book", value: order.book },
          { label: "Author", value: order.author },
          { label: "Amount", value: `$${order.price.toFixed(2)}` },
          { label: "Shipping", value: order.shipping },
        ].map((d) => (
          <div key={d.label} className="bg-[#faf8f5] rounded-lg p-3">
            <p className="text-[#8a9bb0] text-[9px] tracking-widest uppercase mb-1">{d.label}</p>
            <p className="text-[#0d1b2a] text-xs font-medium">{d.value}</p>
          </div>
        ))}
        <div className="col-span-2 bg-[#faf8f5] rounded-lg p-3">
          <p className="text-[#8a9bb0] text-[9px] tracking-widest uppercase mb-1">Delivery address</p>
          <p className="text-[#0d1b2a] text-xs font-medium">{order.address}</p>
        </div>
      </div>
      <p className="text-[#c9a84c] text-[9px] tracking-[0.2em] uppercase font-semibold mb-3">Order tracking</p>
      <OrderTracking step={order.step} />
      <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-[#f0ece4]">
        {order.status === "Delivered" && (
          <button className="px-4 py-1.5 border border-[#e5ddd0] rounded-lg text-xs text-[#0d1b2a] hover:bg-[#f5f0e8] transition">
            Reorder
          </button>
        )}
        <button className="px-4 py-1.5 border border-[#e5ddd0] rounded-lg text-xs text-[#8a9bb0] hover:bg-[#f5f0e8] transition">
          Get help
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return ORDERS.filter((o) => {
      const matchFilter = filter === "All" || o.status === filter;
      const q = search.toLowerCase();
      const matchSearch = !q || o.id.toLowerCase().includes(q) || o.book.toLowerCase().includes(q) || o.status.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [filter, search]);

  const selectedOrder = ORDERS.find((o) => o.id === selectedId) ?? null;
  const totalSpent = ORDERS.reduce((s, o) => s + o.price, 0);
  const inTransit = ORDERS.filter((o) => o.status === "Shipped").length;
  const pending = ORDERS.filter((o) => o.status === "Processing").length;

  return (
    <div className="flex h-screen bg-[#f5f0e8] overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="w-52 flex-shrink-0 bg-[#0d1b2a] flex flex-col">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]">
          <div className="w-8 h-8 bg-[#c9a84c] rounded-md flex items-center justify-center flex-shrink-0">
            <span className="text-[#0d1b2a] font-bold text-sm font-serif">ר</span>
          </div>
          <span className="text-white text-sm font-semibold">Ribis</span>
        </div>

        <nav className="flex-1 p-2 pt-2.5 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${active ? "bg-[#c9a84c]/15" : "hover:bg-white/[0.06]"}`}
              >
                <span className={`text-xs ${active ? "text-[#c9a84c] font-medium" : "text-[#8a9bb0]"}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1a3a52] border-[1.5px] border-[#c9a84c] flex items-center justify-center text-[#c9a84c] text-xs font-semibold flex-shrink-0">
              YC
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">Yosef Cohen</p>
              <p className="text-[#8a9bb0] text-[10px] truncate">yosef@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-[#e5ddd0] h-13 px-5 flex items-center justify-between flex-shrink-0">
          <span className="text-[#0d1b2a] text-sm font-semibold">{activeNav}</span>
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#b0a898]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 border border-[#e5ddd0] rounded-lg text-xs text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5] w-44"
              />
            </div>
            <div className="relative w-8 h-8 rounded-lg border border-[#e5ddd0] flex items-center justify-center cursor-pointer hover:bg-[#f5f0e8] transition">
              <svg className="w-4 h-4 text-[#8a9bb0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Stats */}
          <p className="text-[#c9a84c] text-[9px] tracking-[0.2em] uppercase font-semibold mb-3">Your overview</p>
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { value: ORDERS.length, label: "Total orders", sub: "All time", subClass: "text-[#8a9bb0]" },
              { value: `$${totalSpent.toFixed(0)}`, label: "Total spent", sub: "+$34.99 this month", subClass: "text-[#4caf82]" },
              { value: inTransit, label: "In transit", sub: "Est. 3 days", subClass: "text-[#c9a84c]" },
              { value: pending, label: "Pending", sub: "Processing", subClass: "text-[#c9a84c]" },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-[#e5ddd0] rounded-xl p-3.5">
                <p className="text-[#0d1b2a] text-2xl font-bold leading-none mb-1">{s.value}</p>
                <p className="text-[#8a9bb0] text-[10px]">{s.label}</p>
                <p className={`text-[10px] mt-1.5 font-medium ${s.subClass}`}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Order filters */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[#c9a84c] text-[9px] tracking-[0.2em] uppercase font-semibold">Order history</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                {["All", "Delivered", "Shipped", "Processing"].map((f) => (
                  <button
                    key={f}
                    onClick={() => { setFilter(f); setSelectedId(null); }}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${filter === f ? "bg-[#0d1b2a] text-[#c9a84c] border-[#0d1b2a]" : "bg-white text-[#6b5e4e] border-[#e5ddd0] hover:border-[#c9a84c]/40"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button className="px-3 py-1 rounded-lg bg-[#c9a84c] text-[#0d1b2a] text-[11px] font-bold hover:bg-[#d4b567] transition">
                + New order
              </button>
            </div>
          </div>

          {/* Orders table */}
          <div className="bg-white border border-[#e5ddd0] rounded-xl overflow-hidden mb-4">
            {/* Table head */}
            <div className="grid grid-cols-[1fr_1.8fr_100px_90px_90px] px-4 py-2.5 bg-[#faf8f5] border-b border-[#e5ddd0]">
              {["Order ID", "Book", "Date", "Amount", "Status"].map((h) => (
                <span key={h} className="text-[10px] tracking-widest text-[#8a9bb0] font-semibold uppercase">{h}</span>
              ))}
            </div>
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-[#8a9bb0] text-sm">No orders match your filter.</div>
            ) : (
              filtered.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedId(selectedId === order.id ? null : order.id)}
                  className={`grid grid-cols-[1fr_1.8fr_100px_90px_90px] px-4 py-3 border-b border-[#f0ece4] last:border-0 cursor-pointer transition-colors items-center ${selectedId === order.id ? "bg-[#fdf9f0]" : "hover:bg-[#faf8f5]"}`}
                >
                  <span className="text-[#0d1b2a] text-xs font-semibold font-serif">{order.id}</span>
                  <div className="pr-4 min-w-0">
                    <p className="text-[#0d1b2a] text-xs font-medium truncate">{order.book}</p>
                    <p className="text-[#8a9bb0] text-[10px] truncate">{order.author}</p>
                  </div>
                  <span className="text-[#8a9bb0] text-[11px]">{order.date}</span>
                  <span className="text-[#0d1b2a] text-xs font-semibold">${order.price.toFixed(2)}</span>
                  <div><StatusBadge status={order.status} /></div>
                </div>
              ))
            )}
          </div>

          {/* Order detail panel */}
          {selectedOrder && (
            <OrderDetail order={selectedOrder} onClose={() => setSelectedId(null)} />
          )}

          {/* Recommendations */}
          <div className="mt-5">
            <p className="text-[#c9a84c] text-[9px] tracking-[0.2em] uppercase font-semibold mb-3">Recommended for you</p>
            <div className="bg-white border border-[#e5ddd0] rounded-xl overflow-hidden">
              {RECOMMENDED.map((book, i) => (
                <div key={book.title} className={`flex items-center gap-3 px-4 py-3 ${i < RECOMMENDED.length - 1 ? "border-b border-[#f0ece4]" : ""}`}>
                  <div className="w-8 h-10 bg-[#0d1b2a] rounded-sm border border-[#c9a84c]/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#c9a84c] font-serif text-xs">ר</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#0d1b2a] text-xs font-medium truncate">{book.title}</p>
                    <p className="text-[#8a9bb0] text-[10px]">{book.author} · {book.category}</p>
                  </div>
                  <span className="text-[#0d1b2a] text-xs font-bold flex-shrink-0">${book.price.toFixed(2)}</span>
                  <button className="px-2.5 py-1 rounded-md bg-[#c9a84c] text-[#0d1b2a] text-[10px] font-bold hover:bg-[#d4b567] transition flex-shrink-0">
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

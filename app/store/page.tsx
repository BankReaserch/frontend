"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const CATEGORIES = ["All", "Halacha", "Finance", "Responsa", "Education", "Audio"];

const BOOKS = [
  {
    id: 1,
    title: "Hilchos Ribis: A Practical Guide",
    author: "Rabbi Y. Blumenkrantz",
    price: 34.99,
    originalPrice: 44.99,
    category: "Halacha",
    badge: "Bestseller",
    badgeColor: "#c9a84c",
    pages: 312,
    inStock: true,
    description: "The definitive English guide to the laws of ribis for everyday financial situations.",
  },
  {
    id: 2,
    title: "The Heter Iska Handbook",
    author: "Rabbi M. Tendler",
    price: 28.0,
    originalPrice: null,
    category: "Finance",
    badge: "New",
    badgeColor: "#4caf82",
    pages: 218,
    inStock: true,
    description: "A comprehensive walkthrough of heter iska structures for modern lending arrangements.",
  },
  {
    id: 3,
    title: "Responsa on Modern Banking",
    author: "Rabbi S. Wosner zt\"l",
    price: 42.0,
    originalPrice: null,
    category: "Responsa",
    badge: null,
    badgeColor: null,
    pages: 480,
    inStock: true,
    description: "Collected teshuvos addressing interest, banking, and financial instruments.",
  },
  {
    id: 4,
    title: "Interest-Free Finance in Halacha",
    author: "Rabbi A. Weiss",
    price: 22.5,
    originalPrice: 29.99,
    category: "Education",
    badge: "Sale",
    badgeColor: "#d85a30",
    pages: 176,
    inStock: true,
    description: "An accessible introduction for laypeople to the principles behind ribis law.",
  },
  {
    id: 5,
    title: "Sha'alos U'Teshuvos: Ribis",
    author: "Dayan C. Feldman",
    price: 38.0,
    originalPrice: null,
    category: "Responsa",
    badge: null,
    badgeColor: null,
    pages: 540,
    inStock: false,
    description: "A collection of contemporary responsa on ribis issues in business and real estate.",
  },
  {
    id: 6,
    title: "Audio: Ribis Shiur Series (12 CDs)",
    author: "Rabbi P. Krohn",
    price: 54.0,
    originalPrice: 69.99,
    category: "Audio",
    badge: "Bundle",
    badgeColor: "#534ab7",
    pages: null,
    inStock: true,
    description: "Complete audio series covering all major topics in hilchos ribis, 24+ hours.",
  },
];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  const filtered = BOOKS.filter((b) => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (id: number) => {
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (      
    <div className="min-h-screen bg-[#f5f0e8]">
    <div className="bg-[#0B1C2C] text-white pt-20 pb-10">
            <Navbar/>
             </div>
  
      <div className="bg-[#0d1b2a] px-6 lg:px-12 py-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-2xl">
          <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-semibold mb-3">Ribis · Shop</p>
          <h1 className="text-white font-serif text-4xl lg:text-5xl leading-tight mb-4">
            Seforim & Resources on<br />
            <em className="text-[#c9a84c] not-italic">Hilchos Ribis</em>
          </h1>
          <p className="text-[#8a9bb0] text-sm leading-relaxed max-w-lg">
            Curated books, responsa, and audio resources reviewed by our Kashrus Department — every title vetted for halachic accuracy.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white border-b border-[#e5ddd0] px-6 lg:px-12 py-4 flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9bb0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search titles, authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-[#e5ddd0] rounded-lg text-sm text-[#1a2535] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5]"
          />
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeCategory === cat
                  ? "bg-[#0d1b2a] text-white"
                  : "bg-[#f0ece4] text-[#6b5e4e] hover:bg-[#e5ddd0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="ml-auto text-xs text-[#8a9bb0]">
          {filtered.length} item{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Book grid */}
      <div className="px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl border border-[#e5ddd0] overflow-hidden hover:border-[#c9a84c]/50 transition-all group"
            >
              {/* Book cover placeholder */}
              <div className="h-48 bg-[#0d1b2a] relative overflow-hidden flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}
                />
                {/* Stylized book spine */}
                <div className="relative z-10 w-20 h-32 bg-[#1a2e42] border border-[#c9a84c]/30 rounded-sm flex flex-col items-center justify-between py-3 px-2">
                  <div className="w-10 h-px bg-[#c9a84c]/40" />
                  <div className="text-center">
                    <div className="w-8 h-8 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-sm flex items-center justify-center mx-auto mb-2">
                      <span className="text-[#c9a84c] font-serif text-xs">ר</span>
                    </div>
                    <p className="text-[#c9a84c] text-[8px] font-semibold tracking-widest uppercase">Ribis</p>
                  </div>
                  <div className="w-10 h-px bg-[#c9a84c]/40" />
                </div>
                {/* Badge */}
                {book.badge && (
                  <span
                    className="absolute top-3 left-3 text-white text-[9px] font-bold px-2 py-1 rounded-full tracking-wide"
                    style={{ backgroundColor: book.badgeColor ?? "#c9a84c" }}
                  >
                    {book.badge}
                  </span>
                )}
                {!book.inStock && (
                  <span className="absolute top-3 right-3 bg-black/60 text-white/70 text-[9px] px-2 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-5">
                <p className="text-[#c9a84c] text-[9px] tracking-[0.2em] uppercase font-semibold mb-1">{book.category}</p>
                <h3 className="text-[#0d1b2a] font-serif text-base leading-snug mb-1 group-hover:text-[#1a4a6b] transition">
                  {book.title}
                </h3>
                <p className="text-[#8a9bb0] text-xs mb-2">{book.author}</p>
                <p className="text-[#6b5e4e] text-xs leading-relaxed mb-4 line-clamp-2">{book.description}</p>

                {book.pages && (
                  <p className="text-[#b0a898] text-[10px] mb-3">{book.pages} pages</p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[#0d1b2a] text-lg font-bold">${book.price.toFixed(2)}</span>
                    {book.originalPrice && (
                      <span className="text-[#b0a898] text-xs line-through">${book.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(book.id)}
                    disabled={!book.inStock}
                    className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                      !book.inStock
                        ? "bg-[#f0ece4] text-[#b0a898] cursor-not-allowed"
                        : cart.includes(book.id)
                        ? "bg-[#0d1b2a] text-[#c9a84c]"
                        : "bg-[#c9a84c] text-[#0d1b2a] hover:bg-[#d4b567]"
                    }`}
                  >
                    {!book.inStock ? "Unavailable" : cart.includes(book.id) ? "✓ Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#8a9bb0] text-sm">No items found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

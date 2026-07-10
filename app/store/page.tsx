"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import Link from "next/link";

import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CATEGORIES = [
  "All",
  "Halacha",
  "Finance",
  "Responsa",
  "Education",
  "Audio",
];

type BookType = {
  _id: string;

  title: string;

  author: string;

  price: number;

  originalPrice?: number;

  category: string;

  badge?: string;

  badgeColor?: string;

  pages?: number;

  inStock: boolean;

  description: string;

  coverImage?: string;
};

export default function StorePage() {
  const API =
    (
      process.env
        .NEXT_PUBLIC_API_URL ?? ""
    ).replace(/\/$/, "");

  function coverUrl(
    coverImage?: string
  ) {

    if (!coverImage)
      return "";

    const path =
      coverImage.startsWith("/")
        ? coverImage
        : `/${coverImage}`;

    return `${API}${path}`;
  }

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [books, setBooks] =
    useState<BookType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const {
    cart,
    addToCart,
    updateQuantity,
  } = useCart();

  // FETCH BOOKS
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {

    try {

      setLoading(true);

      const response =
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/book`
        );

      setBooks(
        response.data.data.books || []
      );

    } catch (error) {

      console.error(
        "Fetch books error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  // FILTER
  const filtered = books?.filter((b) => {

    const matchCat =
      activeCategory === "All" ||
      b.category === activeCategory;

    const matchSearch =
      b.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      b.author
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    return (
      matchCat && matchSearch
    );

  });

  return (
    <div className="min-h-screen bg-[#f5f0e8]">

      {/* HERO */}
      <div className="bg-[#0B1C2C] text-white pt-20 pb-10">
        <Navbar />
      </div>

      {/* HERO SECTION */}
      <div className="bg-[#0d1b2a] px-6 lg:px-12 py-12 relative overflow-hidden">

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)",
            backgroundSize:
              "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-2xl">

          <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Ribis · Shop
          </p>

          <h1 className="text-white font-serif text-4xl lg:text-5xl leading-tight mb-4">
            Seforim & Resources on
            <br />
            <em className="text-[#c9a84c] not-italic">
              Hilchos Ribis
            </em>
          </h1>

          <p className="text-[#8a9bb0] text-sm leading-relaxed max-w-lg">
            Curated books,
            responsa, and audio
            resources reviewed by
            our Kashrus Department.
          </p>

        </div>

      </div>

      {/* FILTER BAR */}
      <div className="bg-white border-b border-[#e5ddd0] px-6 lg:px-12 py-4">

        <div className="flex flex-col lg:flex-row lg:items-center gap-4">

          {/* LEFT */}
          <div className="flex flex-1 flex-wrap items-center gap-4">
            {/* SEARCH */}
            <div className="relative flex-1 min-w-[220px] max-w-xs">
              <input
                type="text"
                placeholder="Search titles, authors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 pr-10 py-2.5 border border-[#e5ddd0] rounded-xl text-sm bg-[#faf8f5] focus:outline-none focus:border-[#c9a84c]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                  aria-label="Clear search"
                >
               <X/>
                </button>
              )}
            </div>
            {/* CATEGORIES */}
            <div className="flex items-center gap-2 flex-wrap">

              {CATEGORIES.map(
                (cat) => (

                  <button
                    key={cat}
                    onClick={() =>
                      setActiveCategory(
                        cat
                      )
                    }
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory ===
                      cat
                      ? "bg-[#0d1b2a] text-white"
                      : "bg-[#f0ece4] text-[#6b5e4e] hover:bg-[#e5ddd0]"
                      }`}
                  >
                    {cat}
                  </button>

                )
              )}

            </div>

          </div>

          {/* RIGHT */}
          {cart.length > 0 && (

            <Link
              href="/cart"
              className="relative flex items-center gap-3 bg-[#0d1b2a] hover:bg-[#13263a] text-white px-5 py-2.5 rounded-xl transition-all shadow-sm"
            >

              <div className="flex flex-col leading-none">

                <span className="text-[10px] uppercase tracking-wider text-white/60">
                  Cart
                </span>

                <span className="text-sm font-semibold">
                  {cart.reduce(
                    (
                      acc,
                      item
                    ) =>
                      acc +
                      item.qty,
                    0
                  )}{" "}
                  Items
                </span>

              </div>

              {/* BADGE */}
              <div className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 bg-[#c9a84c] text-[#0d1b2a] text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white">

                {cart.reduce(
                  (
                    acc,
                    item
                  ) =>
                    acc +
                    item.qty,
                  0
                )}

              </div>

            </Link>

          )}

        </div>

      </div>

      {/* PRODUCTS */}
      <div className="px-6 lg:px-12 py-10">

        {/* LOADING */}
        {loading && (

          <div className="flex justify-center py-20">

            <p className="text-[#8a9bb0] text-sm">
              Loading books...
            </p>

          </div>

        )}

        {/* GRID */}
        {!loading && (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filtered.map((book) => {

              const cartItem =
                cart.find(
                  (item) =>
                    item.id ===
                    book._id
                );

              return (

                <div
                  key={book._id}
                  className="bg-white rounded-xl border border-[#e5ddd0] overflow-hidden hover:border-[#c9a84c]/50 transition-all group"
                >

                  {/* IMAGE */}
                  <Link
                    href={`/product/${book._id}`}
                    className="block h-56 overflow-hidden bg-[#f8f5ef] relative"
                  >

                    <img
                      src={coverUrl(
                        book.coverImage
                      )}
                      alt={book.title}
                      className="w-full h-full  object-contain transition duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />
                    {book.badge && (

                      <span
                        className="absolute top-3 left-3 text-white text-[9px] font-bold px-2 py-1 rounded-full"
                        style={{
                          backgroundColor:
                            book.badgeColor ||
                            "#c9a84c",
                        }}
                      >
                        {book.badge}
                      </span>

                    )}

                    {!book.inStock && (

                      <span className="absolute top-3 right-3 bg-black/70 text-white text-[9px] px-2 py-1 rounded-full">
                        Out of Stock
                      </span>

                    )}

                  </Link>

                  {/* CONTENT */}
                  <div className="p-5">

                    <p className="text-[#c9a84c] text-[9px] tracking-[0.2em] uppercase font-semibold mb-1">
                      {book.category}
                    </p>

                    <Link
                      href={`/product/${book._id}`}
                    >

                      <h3 className="text-[#0d1b2a] font-serif text-base leading-snug mb-1 hover:text-[#1a4a6b] transition">
                        {book.title}
                      </h3>

                    </Link>

                    <p className="text-[#8a9bb0] text-xs mb-2">
                      {book.author}
                    </p>

                    <p className="text-[#6b5e4e] text-xs leading-relaxed mb-4 line-clamp-2">
                      {
                        book.description
                      }
                    </p>

                    {/* PRICE + CART */}
                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <span className="text-[#0d1b2a] text-lg font-bold">
                          $
                          {Number(
                            book.price
                          ).toFixed(
                            2
                          )}
                        </span>

                        {book.originalPrice && (

                          <span className="text-xs text-[#b0a898] line-through">
                            $
                            {Number(
                              book.originalPrice
                            ).toFixed(
                              2
                            )}
                          </span>

                        )}

                      </div>

                      {/* CART */}
                      {!book.inStock ? (

                        <button
                          disabled
                          className="px-4 py-2 rounded-lg text-xs font-bold bg-[#f0ece4] text-[#b0a898] cursor-not-allowed"
                        >
                          Unavailable
                        </button>

                      ) : cartItem ? (

                        <div className="flex items-center border border-[#e5ddd0] rounded-lg overflow-hidden">

                          <button
                            onClick={() =>
                              updateQuantity(
                                book._id,
                                cartItem.qty -
                                1
                              )
                            }
                            className="px-3 py-2 text-sm bg-[#f5f0e8] hover:bg-[#e5ddd0] transition"
                          >
                            −
                          </button>

                          <span className="px-4 text-sm font-bold text-[#0d1b2a]">
                            {
                              cartItem.qty
                            }
                          </span>

                          <button
                            onClick={() =>
                              addToCart(
                                {
                                  id: book._id,
                                  title:
                                    book.title,
                                  author:
                                    book.author,
                                  price:
                                    Number(
                                      book.price
                                    ),
                                  qty: 1,
                                  category:
                                    book.category,
                                }
                              )
                            }
                            className="px-3 py-2 text-sm bg-[#c9a84c] text-[#0d1b2a] hover:bg-[#d4b567] transition"
                          >
                            +
                          </button>

                        </div>

                      ) : (

                        <button
                          onClick={() =>
                            addToCart(
                              {
                                id: book._id,
                                title:
                                  book.title,
                                author:
                                  book.author,
                                price:
                                  Number(
                                    book.price
                                  ),
                                qty: 1,
                                category:
                                  book.category,
                              }
                            )
                          }
                          className="px-4 py-2 rounded-lg text-xs font-bold tracking-wide bg-[#c9a84c] text-[#0d1b2a] hover:bg-[#d4b567] transition-all"
                        >
                          Add to Cart
                        </button>

                      )}

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        )}

        {/* EMPTY */}
        {!loading &&
          filtered.length ===
          0 && (

            <div className="text-center py-20">

              <p className="text-[#8a9bb0] text-sm">
                No books found.
              </p>

            </div>

          )}
      </div>

      <Footer />

    </div>
  );
}
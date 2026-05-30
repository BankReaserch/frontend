"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

import Addbook from "./Addbook";

const CATEGORIES = [
  "All",
  "Halacha",
  "Finance",
  "Responsa",
  "Education",
  "Audio",
];

type BookType = {
  _id?: string;
  
  title: string;
  author: string;

  price: number | string;
  originalPrice?: number | string;

  category: string;

  badge?: string;

  pages?: number | string;

  inStock: boolean;

  description: string;

  coverImage?: string;
};

export default function Books() {
  const [activeCategory, setActiveCategory] =
    useState("All");
  const [selectedBook, setSelectedBook] =
    useState<BookType | null>(null);

  const [cart, setCart] = useState<string[]>([]);

  const [books, setBooks] = useState<BookType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [showaddForm, setShowaddForm] =
    useState(false);

  // FETCH BOOKS
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/book`
      );
       setBooks(
  response.data.data.books || []);

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
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      b.author
        ?.toLowerCase()
        .includes(search.toLowerCase());

    return matchCat && matchSearch;
  });

  // CART
  const addToCart = (id: string) => {
    setCart((prev) =>
      prev.includes(id)
        ? prev
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8]">

      <Addbook
        open={showaddForm}
        editData={selectedBook}
        onClose={(value) => {

          setShowaddForm(value);

          if (!value) {
            setSelectedBook(null);
            fetchBooks();
          }
        }}
      />

      {/* TOP BAR */}
      <div className="flex flex-wrap items-center gap-4 border-b border-[#e5ddd0] bg-white px-6 py-4 lg:px-12">

        {/* SEARCH */}
        <div className="relative max-w-xs min-w-[220px] flex-1">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a9bb0]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search titles, authors..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-lg border border-[#e5ddd0] bg-[#faf8f5] py-2 pl-9 pr-4 text-sm text-[#1a2535] placeholder-[#b0a898] transition focus:border-[#c9a84c] focus:outline-none"
          />
        </div>

        {/* CATEGORIES */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory(cat)
              }
              className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all ${activeCategory === cat
                ? "bg-[#0d1b2a] text-white"
                : "bg-[#f0ece4] text-[#6b5e4e] hover:bg-[#e5ddd0]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* RIGHT */}
        <div className="ml-auto flex items-center gap-4">

          <div className="text-xs text-[#8a9bb0]">
            {filtered.length} item
            {filtered.length !== 1
              ? "s"
              : ""}
          </div>

          <button
            onClick={() =>
              setShowaddForm(true)
            }
            className="inline-flex items-center gap-2 rounded-lg bg-[#c9a84c] px-4 py-2 text-sm font-bold tracking-wide text-[#0d1b2a] shadow-sm transition-all hover:bg-[#d4b567]"
          >
            <Plus className="h-4 w-4" />

            Add Book
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 py-10 lg:px-12">

        {/* LOADING */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-[#8a9bb0]">
              Loading books...
            </p>
          </div>
        )}

        {/* GRID */}
        {!loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filtered.map((book) => (
              <div
                key={book._id}
                className="group overflow-hidden rounded-xl border border-[#e5ddd0] bg-white transition-all hover:border-[#c9a84c]/50"
              >

                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden bg-[#f8f5ef]">

                  <img
                   src={`${process.env.NEXT_PUBLIC_API_URL}${book.coverImage}`}
                    alt={book.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  {book.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#c9a84c] px-2 py-1 text-[10px] font-bold tracking-wide text-white">
                      {book.badge}
                    </span>
                  )}
                  {!book.inStock && (
                    <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 text-[9px] text-white/70">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* DETAILS */}
                <div className="p-5">

                  <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#c9a84c]">
                    {book.category}
                  </p>

                  <h3 className="mb-1 font-serif text-base leading-snug text-[#0d1b2a] transition group-hover:text-[#1a4a6b]">
                    {book.title}
                  </h3>

                  <p className="mb-2 text-xs text-[#8a9bb0]">
                    {book.author}
                  </p>

                  <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-[#6b5e4e]">
                    {book.description}
                  </p>

                  {book.pages && (
                    <p className="mb-3 text-[10px] text-[#b0a898]">
                      {book.pages} pages
                    </p>
                  )}

                  {/* PRICE */}
                  <div className="flex items-center justify-between">

                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#0d1b2a]">
                        $
                        {Number(book.price).toFixed(2)}
                      </span>

                      {book.originalPrice && (
                        <span className="text-xs text-[#b0a898] line-through">
                          $
                          {Number(book.originalPrice).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedBook(book);
                        setShowaddForm(true);
                      }}
                      disabled={
                        !book.inStock
                      }
                      className={`rounded-lg px-4 py-2 text-xs font-bold tracking-wide transition-all ${!book.inStock
                        ? "cursor-not-allowed bg-[#f0ece4] text-[#b0a898]"
                        : cart.includes(book._id || "")
                          ? "bg-[#0d1b2a] text-[#c9a84c]"
                          : "bg-[#c9a84c] text-[#0d1b2a] hover:bg-[#d4b567]"
                        }`}
                    >
                      {!book.inStock
                        ? "Unavailable"
                        : cart.includes(book._id || "")
                          ? "✓ Added"
                          : "Edit"}
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-sm text-[#8a9bb0]">
                No books found.
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
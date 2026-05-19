// "use client";

// import { useState } from "react";
// import Link from "next/link";

// const BOOK = {
//   title: "Hilchos Ribis: A Practical Guide",
//   author: "Rabbi Y. Blumenkrantz",
//   publisher: "Ribis Publications",
//   year: 2022,
//   pages: 312,
//   isbn: "978-1-234567-89-0",
//   category: "Halacha",
//   price: 34.99,
//   originalPrice: 44.99,
//   badge: "Bestseller",
//   inStock: true,
//   description: `The definitive English-language guide to the laws of ribis for everyday financial situations. Written with the busy professional in mind, this sefer covers bank accounts, mortgages, credit cards, and business partnerships with clarity and depth. Each chapter includes practical summaries and sample heter iska forms.

//   Approved and endorsed by leading poskim, this work bridges the gap between the complexity of halachic literature and the practical needs of the modern Jewish community.`,
//   tableOfContents: [
//     "Introduction to Ribis",
//     "The Prohibition — D'Oraisa and D'Rabbanan",
//     "Savings Accounts and CDs",
//     "Mortgages and Home Loans",
//     "Credit Cards and Installment Plans",
//     "Business Partnerships",
//     "Heter Iska — Theory and Practice",
//     "Practical Heter Iska Forms",
//   ],
//   endorsements: [
//     { name: "Rabbi Y. Feinstein", title: "Rosh Yeshiva, Yeshiva of Staten Island" },
//     { name: "Rabbi S. Kamenetsky", title: "Rosh Yeshiva, Philadelphia Yeshiva" },
//   ],
// };

// const RELATED = [
//   { id: 2, title: "The Heter Iska Handbook", author: "Rabbi M. Tendler", price: 28.0, category: "Finance" },
//   { id: 4, title: "Interest-Free Finance in Halacha", author: "Rabbi A. Weiss", price: 22.5, category: "Education" },
//   { id: 3, title: "Responsa on Modern Banking", author: "Rabbi S. Wosner zt\"l", price: 42.0, category: "Responsa" },
// ];

// export default function ProductPage() {
//   const [qty, setQty] = useState(1);
//   const [added, setAdded] = useState(false);
//   const [activeTab, setActiveTab] = useState<"description" | "toc" | "endorsements">("description");

//   const handleAddToCart = () => {
//     setAdded(true);
//     setTimeout(() => setAdded(false), 2500);
//   };

//   return (
//     <div className="min-h-screen bg-[#f5f0e8]">
//       {/* Navbar */}
//       <nav className="bg-[#0d1b2a] border-b border-white/8 px-6 lg:px-12 py-0 flex items-center justify-between h-16">
//         <Link href="/" className="flex items-center gap-3">
//           <div className="w-8 h-8 bg-[#c9a84c] rounded-md flex items-center justify-center">
//             <span className="text-[#0d1b2a] font-bold text-sm font-serif">ר</span>
//           </div>
//           <span className="text-white font-semibold tracking-wide text-sm">Ribis</span>
//         </Link>
//         <div className="flex items-center gap-4">
//           <Link href="/store" className="text-[#8a9bb0] hover:text-white text-xs tracking-wide transition">
//             ← Back to Shop
//           </Link>
//           <button className="bg-[#c9a84c] text-[#0d1b2a] text-xs font-bold px-4 py-2 rounded-md hover:bg-[#d4b567] transition tracking-wide">
//             CONTACT US
//           </button>
//         </div>
//       </nav>

//       {/* Breadcrumb */}
//       <div className="px-6 lg:px-12 py-4 bg-white border-b border-[#e5ddd0]">
//         <div className="flex items-center gap-2 text-xs text-[#8a9bb0]">
//           <Link href="/" className="hover:text-[#c9a84c] transition">Home</Link>
//           <span>/</span>
//           <Link href="/store" className="hover:text-[#c9a84c] transition">Shop</Link>
//           <span>/</span>
//           <span className="text-[#1a2535]">{BOOK.title}</span>
//         </div>
//       </div>

//       {/* Main product section */}
//       <div className="px-6 lg:px-12 py-10 max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//           {/* Book visual */}
//           <div className="sticky top-8">
//             <div className="bg-[#0d1b2a] rounded-2xl h-96 relative overflow-hidden flex items-center justify-center">
//               <div
//                 className="absolute inset-0 opacity-[0.04]"
//                 style={{
//                   backgroundImage: `linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)`,
//                   backgroundSize: "32px 32px",
//                 }}
//               />
//               {/* Stylized book */}
//               <div className="relative z-10 flex gap-2 items-end">
//                 {/* Shadow */}
//                 <div className="w-36 h-52 bg-[#0a1520] rounded-sm absolute translate-x-2 translate-y-2 opacity-60" />
//                 {/* Book body */}
//                 <div className="w-36 h-52 bg-gradient-to-br from-[#1a2e42] to-[#0f1e2d] border border-[#c9a84c]/40 rounded-sm relative z-10 flex flex-col p-4">
//                   <div className="w-full h-px bg-[#c9a84c]/30 mb-3" />
//                   <div className="flex-1 flex flex-col items-center justify-center gap-3">
//                     <div className="w-12 h-12 border border-[#c9a84c]/50 rounded-sm flex items-center justify-center">
//                       <span className="text-[#c9a84c] font-serif text-xl">ר</span>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-[#c9a84c] text-[9px] tracking-widest uppercase font-semibold">Ribis</p>
//                       <p className="text-white/40 text-[8px] mt-1">Publications</p>
//                     </div>
//                   </div>
//                   <div className="w-full h-px bg-[#c9a84c]/30 mt-3" />
//                 </div>
//                 {/* Spine */}
//                 <div className="w-5 h-52 bg-[#0f2035] border border-[#c9a84c]/20 rounded-r-sm relative z-10 flex items-center justify-center">
//                   <p className="text-[#c9a84c]/50 text-[7px] tracking-wider" style={{ writingMode: "vertical-lr" }}>
//                     RIBIS
//                   </p>
//                 </div>
//               </div>

//               {/* Badge */}
//               <span className="absolute top-4 left-4 bg-[#c9a84c] text-[#0d1b2a] text-[9px] font-bold px-3 py-1 rounded-full tracking-wide">
//                 {BOOK.badge}
//               </span>
//             </div>

//             {/* Trust badges */}
//             <div className="grid grid-cols-3 gap-3 mt-4">
//               {[
//                 { icon: "✓", label: "Posek Approved" },
//                 { icon: "⚡", label: "Fast Shipping" },
//                 { icon: "↩", label: "Easy Returns" },
//               ].map((b) => (
//                 <div key={b.label} className="bg-white border border-[#e5ddd0] rounded-lg p-3 text-center">
//                   <p className="text-[#c9a84c] text-sm mb-1">{b.icon}</p>
//                   <p className="text-[#6b5e4e] text-[10px]">{b.label}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Product info */}
//           <div>
//             <p className="text-[#c9a84c] text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">{BOOK.category}</p>
//             <h1 className="text-[#0d1b2a] font-serif text-3xl lg:text-4xl leading-tight mb-2">{BOOK.title}</h1>
//             <p className="text-[#8a9bb0] text-sm mb-1">by {BOOK.author}</p>
//             <p className="text-[#b0a898] text-xs mb-6">
//               {BOOK.publisher} · {BOOK.year} · {BOOK.pages} pages
//             </p>

//             {/* Price */}
//             <div className="flex items-baseline gap-3 mb-6">
//               <span className="text-[#0d1b2a] text-3xl font-bold">${BOOK.price.toFixed(2)}</span>
//               {BOOK.originalPrice && (
//                 <>
//                   <span className="text-[#b0a898] text-lg line-through">${BOOK.originalPrice.toFixed(2)}</span>
//                   <span className="bg-[#d85a30]/10 text-[#d85a30] text-xs font-bold px-2 py-0.5 rounded-full">
//                     Save ${(BOOK.originalPrice - BOOK.price).toFixed(2)}
//                   </span>
//                 </>
//               )}
//             </div>

//             {/* Quantity & Add */}
//             <div className="flex items-center gap-4 mb-6">
//               <div className="flex items-center border border-[#e5ddd0] rounded-lg overflow-hidden bg-white">
//                 <button
//                   onClick={() => setQty((q) => Math.max(1, q - 1))}
//                   className="px-4 py-2.5 text-[#6b5e4e] hover:bg-[#f5f0e8] transition text-lg"
//                 >
//                   −
//                 </button>
//                 <span className="px-4 py-2.5 text-[#0d1b2a] font-semibold text-sm min-w-[48px] text-center border-x border-[#e5ddd0]">
//                   {qty}
//                 </span>
//                 <button
//                   onClick={() => setQty((q) => q + 1)}
//                   className="px-4 py-2.5 text-[#6b5e4e] hover:bg-[#f5f0e8] transition text-lg"
//                 >
//                   +
//                 </button>
//               </div>

//               <button
//                 onClick={handleAddToCart}
//                 className={`flex-1 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
//                   added
//                     ? "bg-[#0d1b2a] text-[#c9a84c]"
//                     : "bg-[#c9a84c] text-[#0d1b2a] hover:bg-[#d4b567]"
//                 }`}
//               >
//                 {added ? "✓ Added to Cart" : "Add to Cart"}
//               </button>
//             </div>

//             <button className="w-full py-3 border border-[#0d1b2a] text-[#0d1b2a] rounded-xl text-sm font-semibold hover:bg-[#0d1b2a] hover:text-white transition-all mb-8">
//               Buy Now
//             </button>

//             {/* Book details row */}
//             <div className="grid grid-cols-2 gap-3 mb-8">
//               {[
//                 { label: "ISBN", value: BOOK.isbn },
//                 { label: "Language", value: "English" },
//                 { label: "Format", value: "Hardcover" },
//                 { label: "Availability", value: BOOK.inStock ? "In Stock" : "Out of Stock" },
//               ].map((d) => (
//                 <div key={d.label} className="bg-white border border-[#e5ddd0] rounded-lg px-4 py-3">
//                   <p className="text-[#b0a898] text-[10px] tracking-widest uppercase mb-0.5">{d.label}</p>
//                   <p className={`text-sm font-medium ${d.label === "Availability" && BOOK.inStock ? "text-[#4caf82]" : "text-[#0d1b2a]"}`}>
//                     {d.value}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Tabs */}
//             <div className="border border-[#e5ddd0] rounded-xl overflow-hidden bg-white">
//               <div className="flex border-b border-[#e5ddd0]">
//                 {(["description", "toc", "endorsements"] as const).map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`flex-1 py-3 text-xs font-semibold tracking-wide transition-all capitalize ${
//                       activeTab === tab
//                         ? "bg-[#0d1b2a] text-[#c9a84c]"
//                         : "text-[#8a9bb0] hover:text-[#0d1b2a] hover:bg-[#f5f0e8]"
//                     }`}
//                   >
//                     {tab === "toc" ? "Contents" : tab}
//                   </button>
//                 ))}
//               </div>
//               <div className="p-5">
//                 {activeTab === "description" && (
//                   <p className="text-[#6b5e4e] text-sm leading-relaxed whitespace-pre-line">{BOOK.description}</p>
//                 )}
//                 {activeTab === "toc" && (
//                   <ol className="space-y-2">
//                     {BOOK.tableOfContents.map((ch, i) => (
//                       <li key={ch} className="flex items-center gap-3">
//                         <span className="w-6 h-6 rounded-full bg-[#f5f0e8] text-[#c9a84c] text-[10px] font-bold flex items-center justify-center flex-shrink-0">
//                           {i + 1}
//                         </span>
//                         <span className="text-[#0d1b2a] text-sm">{ch}</span>
//                       </li>
//                     ))}
//                   </ol>
//                 )}
//                 {activeTab === "endorsements" && (
//                   <div className="space-y-4">
//                     {BOOK.endorsements.map((e) => (
//                       <div key={e.name} className="flex items-center gap-4 p-4 bg-[#f5f0e8] rounded-lg">
//                         <div className="w-10 h-10 rounded-full bg-[#0d1b2a] flex items-center justify-center flex-shrink-0">
//                           <span className="text-[#c9a84c] font-serif text-xs">
//                             {e.name.split(" ").pop()?.charAt(0)}
//                           </span>
//                         </div>
//                         <div>
//                           <p className="text-[#0d1b2a] font-semibold text-sm">{e.name}</p>
//                           <p className="text-[#8a9bb0] text-xs">{e.title}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Related */}
//         <div className="mt-16">
//           <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-semibold mb-2">You May Also Like</p>
//           <h2 className="text-[#0d1b2a] font-serif text-2xl mb-6">Related Seforim</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//             {RELATED.map((b) => (
//               <div key={b.id} className="bg-white border border-[#e5ddd0] rounded-xl p-5 hover:border-[#c9a84c]/50 transition-all">
//                 <p className="text-[#c9a84c] text-[9px] tracking-widest uppercase font-semibold mb-2">{b.category}</p>
//                 <h3 className="text-[#0d1b2a] font-serif text-sm leading-snug mb-1">{b.title}</h3>
//                 <p className="text-[#8a9bb0] text-xs mb-3">{b.author}</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-[#0d1b2a] font-bold">${b.price.toFixed(2)}</span>
//                   <button className="text-xs text-[#c9a84c] hover:underline">View →</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import axios from "axios";

import { useParams } from "next/navigation";

import { useCart } from "@/context/CartContext";

type BookType = {
  _id: string;

  title: string;

  author: string;

  publisher?: string;

  year?: number;

  pages?: number;

  isbn?: string;

  category: string;

  price: number;

  originalPrice?: number;

  badge?: string;

  inStock: boolean;

  description: string;

  coverImage?: string;
};

export default function ProductPage() {

  const params = useParams();

  const id = params.id as string;

  const [book, setBook] =
    useState<BookType | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [qty, setQty] =
    useState(1);

  const [activeTab, setActiveTab] =
    useState<
      "description" | "details"
    >("description");

  const { addToCart } = useCart();

  // FETCH BOOK
 useEffect(() => {
  if (id) {
    fetchBook();
  }
}, [id]);

  const fetchBook = async () => {

    try {

      setLoading(true);

      const response =
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/book/${id}`
        );

      setBook(response.data.data);

    } catch (error) {

      console.error(
        "Fetch book error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
        <p className="text-[#8a9bb0]">
          Loading book...
        </p>
      </div>
    );
  }

  // NOT FOUND
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
        <p className="text-red-500">
          Book not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">

      {/* NAVBAR */}
      <nav className="bg-[#0d1b2a] border-b border-white/8 px-6 lg:px-12 h-16 flex items-center justify-between">

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-[#c9a84c] rounded-md flex items-center justify-center">
            <span className="text-[#0d1b2a] font-bold text-sm font-serif">
              ר
            </span>
          </div>

          <span className="text-white font-semibold tracking-wide text-sm">
            Ribis
          </span>
        </Link>

        <Link
          href="/store"
          className="text-[#8a9bb0] hover:text-white text-xs transition"
        >
          ← Back to Shop
        </Link>

      </nav>

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-[#e5ddd0] px-6 lg:px-12 py-4">

        <div className="flex items-center gap-2 text-xs text-[#8a9bb0]">

          <Link
            href="/"
            className="hover:text-[#c9a84c]"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/store"
            className="hover:text-[#c9a84c]"
          >
            Store
          </Link>

          <span>/</span>

          <span className="text-[#0d1b2a]">
            {book.title}
          </span>

        </div>

      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* IMAGE */}
          <div className="sticky top-8">

            <div className="overflow-hidden rounded-2xl border border-[#e5ddd0] bg-white">

              <img
               src={`${process.env.NEXT_PUBLIC_API_URL}${book.coverImage}`}
                alt={book.title}
                className="w-full h-[650px] object-cover"
              />

            </div>

          </div>

          {/* DETAILS */}
          <div>

            <p className="text-[#c9a84c] text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">
              {book.category}
            </p>

            <h1 className="text-[#0d1b2a] font-serif text-4xl leading-tight mb-2">
              {book.title}
            </h1>

            <p className="text-[#8a9bb0] text-sm mb-6">
              by {book.author}
            </p>

            {/* PRICE */}
            <div className="flex items-center gap-3 mb-8">

              <span className="text-4xl font-bold text-[#0d1b2a]">
                $
                {Number(book.price).toFixed(
                  2
                )}
              </span>

              {book.originalPrice && (
                <span className="text-lg line-through text-[#b0a898]">
                  $
                  {Number(
                    book.originalPrice
                  ).toFixed(2)}
                </span>
              )}

            </div>

            {/* DESCRIPTION */}
            <p className="text-[#6b5e4e] leading-relaxed mb-8 whitespace-pre-line">
              {book.description}
            </p>

            {/* QUANTITY */}
            <div className="flex items-center gap-4 mb-8">

              <div className="flex items-center border border-[#e5ddd0] rounded-xl overflow-hidden bg-white">

                <button
                  onClick={() =>
                    setQty((q) =>
                      Math.max(1, q - 1)
                    )
                  }
                  className="px-4 py-3 hover:bg-[#f5f0e8]"
                >
                  −
                </button>

                <span className="px-5 font-semibold">
                  {qty}
                </span>

                <button
                  onClick={() =>
                    setQty((q) => q + 1)
                  }
                  className="px-4 py-3 hover:bg-[#f5f0e8]"
                >
                  +
                </button>

              </div>

              {/* ADD TO CART */}
              <button
                disabled={!book.inStock}
                onClick={() => {

                  for (
                    let i = 0;
                    i < qty;
                    i++
                  ) {

                    addToCart({
                      id: book._id,
                      title:
                        book.title,
                      author:
                        book.author,
                      price:
                        book.price,
                      qty: 1,
                      category:
                        book.category,
                    });

                  }

                }}
                className={`flex-1 py-4 rounded-xl font-bold transition-all ${
                  !book.inStock
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#c9a84c] hover:bg-[#d4b567] text-[#0d1b2a]"
                }`}
              >
                {!book.inStock
                  ? "Out of Stock"
                  : `Add ${qty} to Cart`}
              </button>

            </div>

            {/* BUY NOW */}
            <button className="w-full border border-[#0d1b2a] py-4 rounded-xl font-semibold hover:bg-[#0d1b2a] hover:text-white transition-all mb-8">
              Buy Now
            </button>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-2 gap-4 mb-8">

              <div className="bg-white border border-[#e5ddd0] rounded-xl p-4">
                <p className="text-xs text-[#8a9bb0] uppercase mb-1">
                  Pages
                </p>

                <p className="font-semibold text-[#0d1b2a]">
                  {book.pages || "—"}
                </p>
              </div>

              <div className="bg-white border border-[#e5ddd0] rounded-xl p-4">
                <p className="text-xs text-[#8a9bb0] uppercase mb-1">
                  Availability
                </p>

                <p
                  className={`font-semibold ${
                    book.inStock
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {book.inStock
                    ? "In Stock"
                    : "Out of Stock"}
                </p>
              </div>

            </div>

            {/* TABS */}
            <div className="border border-[#e5ddd0] rounded-xl overflow-hidden bg-white">

              <div className="flex border-b border-[#e5ddd0]">

                {[
                  "description",
                  "details",
                ].map((tab) => (

                  <button
                    key={tab}
                    onClick={() =>
                      setActiveTab(
                        tab as
                          | "description"
                          | "details"
                      )
                    }
                    className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wide ${
                      activeTab === tab
                        ? "bg-[#0d1b2a] text-[#c9a84c]"
                        : "text-[#8a9bb0] hover:bg-[#f5f0e8]"
                    }`}
                  >
                    {tab}
                  </button>

                ))}

              </div>

              <div className="p-5">

                {activeTab ===
                  "description" && (
                  <p className="text-sm leading-relaxed text-[#6b5e4e] whitespace-pre-line">
                    {book.description}
                  </p>
                )}

                {activeTab ===
                  "details" && (
                  <div className="space-y-3 text-sm">

                    <div className="flex justify-between">
                      <span className="text-[#8a9bb0]">
                        Author
                      </span>

                      <span className="font-medium">
                        {book.author}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#8a9bb0]">
                        Category
                      </span>

                      <span className="font-medium">
                        {book.category}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#8a9bb0]">
                        Pages
                      </span>

                      <span className="font-medium">
                        {book.pages ||
                          "—"}
                      </span>
                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
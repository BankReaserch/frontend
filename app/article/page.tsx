"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "@/components/article/ArticleCard";
import { Article } from "@/components/article/article.types";

// ── Defined outside component so they're never recreated on render ────────────
const API = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

const api = axios.create({ baseURL: API });

export const getFileUrl = (filePath: string) => {
  const normalized = filePath.startsWith("/") ? filePath : `/${filePath}`;
  return `${API}${normalized}`;
};


export default function ArticlesPage() {
  const [articles, setArticles] =
    useState<Article[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    const fetchArticles =
      async () => {

        try {

          const response =
            await api.get(
              "/api/articles/all"
            );

          if (
            response.data
              .success
          ) {

            setArticles(
              response.data
                .data || []
            );
          }

        } catch (error) {

          console.error(
            error
          );

        } finally {

          setLoading(false);
        }
      };

    fetchArticles();

  }, []);
  /* FILTERED ARTICLES */
  const filteredArticles =
    articles.filter(
      (article) =>
        article.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        article.category
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        article.author
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );
  return (
    <>
      <div className="bg-[#051933]">

        <Navbar />

      </div>

      <main className="min-h-screen bg-[#f5f1ea] overflow-hidden">

        {/* HERO */}
        <section className="relative bg-[#051933] pt-24 pb-20 overflow-hidden">

          {/* GRID */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(135deg,#ffffff_1px,transparent_1px)] bg-[size:28px_28px]" />

          {/* GLOW */}
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#c8a21a]/10 blur-3xl rounded-full" />

          <div className="relative max-w-7xl mx-auto px-6 text-center">

            <p className="text-[#c8a21a] uppercase tracking-[0.35em] text-xs font-semibold mb-6">

              ARTICLES & RESEARCH

            </p>

            <h1 className="font-serif text-5xl md:text-6xl text-white leading-tight">

              Public{" "}

              <span className="italic text-[#c8a21a]">

                Research Articles

              </span>

            </h1>

            <p className="max-w-2xl mx-auto mt-8 text-[#94a3b8] leading-8 text-[15px]">

              Access publicly available
              financial and halachic
              research articles, educational
              resources, and downloadable
              PDF publications.

            </p>

            {/* SEARCH */}
            <div className="relative max-w-xl mx-auto mt-12">

              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />

              <input
                type="text"
                placeholder="Search articles..."
                value={
                  search
                }
                onChange={(
                  e
                ) =>
                  setSearch(
                    e.target
                      .value
                  )
                }
                className="w-full h-14 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl pl-14 pr-5 text-white placeholder:text-[#64748b] outline-none"
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

          </div>

        </section>

        {/* ARTICLES */}
        <section className="py-20">

          <div className="max-w-7xl mx-auto px-6">

            {loading ? (

              <div className="text-center py-24">

                <div className="w-10 h-10 border-4 border-[#c8a21a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />

                <p className="text-[#64748b]">
                  Loading articles...
                </p>

              </div>

            ) : filteredArticles.length === 0 ? (

              <div className="text-center py-24">

                <h3 className="font-serif text-3xl text-[#051933]">
                  No Articles Found
                </h3>

                <p className="mt-3 text-[#64748b]">
                  Try adjusting your search.
                </p>

              </div>

            ) : (

              <>
                {/* COUNT */}

                <div className="flex justify-between items-center mb-10">

                  <h2 className="font-serif text-4xl text-[#051933]">

                    Articles

                  </h2>

                  <div className="rounded-2xl bg-white border border-[#e7dfd2] px-4 py-2 text-sm text-[#64748b]">

                    {filteredArticles.length} Articles

                  </div>

                </div>

                {/* GRID */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                  {filteredArticles.map(
                    (article) => (

                      <ArticleCard
                        key={article._id}
                        article={article}
                        variant="public"
                        getFileUrl={getFileUrl}
                      />

                    )
                  )}

                </div>

              </>

            )}

          </div>

        </section>
      </main>
      <Footer />

    </>
  );
}
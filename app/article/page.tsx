"use client";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import Image from "next/image";

import {
  Search,
  Download,
  ArrowRight,
  CalendarDays,
  Clock3,
  FileText,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

type Article = {
  _id: string;

  title: string;

  excerpt: string;

  category: string;

  author: string;

  coverImage: string;

  pdfUrl: string;

  createdAt: string;

  readTime: string;
};

/*
========================================
FIX URLS
========================================
*/

const getFileUrl = (
  path: string
) => {

  return `${process.env.NEXT_PUBLIC_API_URL}${path}`.replace(
    /([^:]\/)\/+/g,
    "$1"
  );
};

export default function ArticlesPage() {

  /*
  ========================================
  STATES
  ========================================
  */

  const [articles, setArticles] =
    useState<Article[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  /*
  ========================================
  AXIOS
  ========================================
  */

  const api = axios.create({
    baseURL:
      process.env
        .NEXT_PUBLIC_API_URL,
  });

  /*
  ========================================
  FETCH ARTICLES
  ========================================
  */

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

  /*
  ========================================
  FILTER
  ========================================
  */

  const filtered =
    useMemo(() => {

      return articles.filter(
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
            )
      );

    }, [
      articles,
      search,
    ]);

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

            </div>

          </div>

        </section>

        {/* ARTICLES */}
        <section className="py-20">

          <div className="max-w-7xl mx-auto px-6">

            {/* LOADING */}
            {loading ? (

              <div className="text-center py-24">

                <p className="text-[#64748b]">

                  Loading articles...

                </p>

              </div>

            ) : filtered.length ===
              0 ? (

              <div className="text-center py-24">

                <h3 className="font-serif text-3xl text-[#051933]">

                  No Articles Found

                </h3>

              </div>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {filtered.map(
                  (
                    article
                  ) => (

                    <div
                      key={
                        article._id
                      }
                      className="group rounded-[28px] overflow-hidden border border-[#e7dfd2] bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >

                      {/* IMAGE */}
                      <div className="relative h-[240px] overflow-hidden bg-[#051933]">

                        {article.coverImage ? (

                          <Image
                            src={getFileUrl(
                              article.coverImage
                            )}
                            alt={
                              article.title
                            }
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                        ) : (

                          <div className="w-full h-full flex items-center justify-center">

                            <FileText className="w-16 h-16 text-[#c8a21a]" />

                          </div>
                        )}

                        {/* CATEGORY */}
                        <div className="absolute top-5 left-5 bg-[#c8a21a] text-[#051933] text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full">

                          {
                            article.category
                          }

                        </div>

                      </div>

                      {/* CONTENT */}
                      <div className="p-8">

                        {/* META */}
                        <div className="flex items-center gap-5 text-[#94a3b8] text-xs mb-5">

                          <div className="flex items-center gap-2">

                            <CalendarDays className="w-4 h-4" />

                            {new Date(
                              article.createdAt
                            ).toLocaleDateString()}

                          </div>

                          <div className="flex items-center gap-2">

                            <Clock3 className="w-4 h-4" />

                            {
                              article.readTime
                            }

                          </div>

                        </div>

                        {/* TITLE */}
                        <h2 className="font-serif text-3xl leading-snug text-[#051933]">

                          {
                            article.title
                          }

                        </h2>

                        {/* EXCERPT */}
                        <p className="text-[#64748b] leading-8 text-[15px] mt-5 line-clamp-3">

                          {
                            article.excerpt
                          }

                        </p>

                        {/* AUTHOR */}
                        <div className="mt-6">

                          <p className="text-sm text-[#94a3b8]">

                            By{" "}

                            <span className="text-[#051933] font-medium">

                              {
                                article.author
                              }

                            </span>

                          </p>

                        </div>

                        {/* ACTIONS */}
                        <div className="mt-8 flex items-center gap-4">

                          {/* VIEW */}
                          <a
                            href={getFileUrl(
                              article.pdfUrl
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 h-12 rounded-2xl bg-[#051933] hover:bg-[#0d2748] transition-all text-white text-sm font-semibold flex items-center justify-center gap-2"
                          >

                            Read Article

                            <ArrowRight className="w-4 h-4" />

                          </a>

                          {/* DOWNLOAD */}
                          <a
                            href={getFileUrl(
                              article.pdfUrl
                            )}
                            download
                            className="w-12 h-12 rounded-2xl border border-[#e7dfd2] hover:border-[#c8a21a] bg-[#faf7f2] flex items-center justify-center transition-all"
                          >

                            <Download className="w-5 h-5 text-[#051933]" />

                          </a>

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

        </section>

      </main>

      <Footer />

    </>
  );
}
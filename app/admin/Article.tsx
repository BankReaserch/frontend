"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import Image from "next/image";

import {
  Search,
  Plus,
  Trash2,
  Pencil,
  Upload,
  FileText,
  Loader2,
  X,
  Eye,
  Download,
} from "lucide-react";

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

export default function AdminArticlesPage() {

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

  const [openModal, setOpenModal] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(
      null
    );

  const [formData, setFormData] =
    useState({
      title: "",

      excerpt: "",

      category: "",

      author: "",

      readTime: "",
    });

  const [coverImage, setCoverImage] =
    useState<File | null>(
      null
    );

  const [pdfFile, setPdfFile] =
    useState<File | null>(
      null
    );

  /*
  ========================================
  AXIOS
  ========================================
  */

  const api = axios.create({
    baseURL:
      process.env
        .NEXT_PUBLIC_API_URL,

    withCredentials: true,
  });

  /*
  ========================================
  FETCH ARTICLES
  ========================================
  */

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

  useEffect(() => {

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

  /*
  ========================================
  CREATE / UPDATE
  ========================================
  */

  const handleSubmit =
    async (
      e: any
    ) => {

      e.preventDefault();

      try {

        setSubmitting(
          true
        );

        const body =
          new FormData();

        body.append(
          "title",
          formData.title
        );

        body.append(
          "excerpt",
          formData.excerpt
        );

        body.append(
          "category",
          formData.category
        );

        body.append(
          "author",
          formData.author
        );

        body.append(
          "readTime",
          formData.readTime
        );

        if (
          coverImage
        ) {

          body.append(
            "coverImage",
            coverImage
          );
        }

        if (
          pdfFile
        ) {

          body.append(
            "pdf",
            pdfFile
          );
        }

        if (
          editingId
        ) {

          await api.put(
            `/api/articles/update/${editingId}`,
            body
          );

        } else {

          await api.post(
            "/api/articles/create",
            body
          );
        }

        setOpenModal(
          false
        );

        setEditingId(
          null
        );

        setFormData({
          title: "",
          excerpt: "",
          category: "",
          author: "",
          readTime: "",
        });

        setCoverImage(
          null
        );

        setPdfFile(
          null
        );

        fetchArticles();

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setSubmitting(
          false
        );
      }
    };

  /*
  ========================================
  DELETE
  ========================================
  */

  const handleDelete =
    async (
      id: string
    ) => {

      const confirmDelete =
        confirm(
          "Delete article?"
        );

      if (
        !confirmDelete
      ) {
        return;
      }

      try {

        await api.delete(
          `/api/articles/delete/${id}`
        );

        fetchArticles();

      } catch (error) {

        console.error(
          error
        );
      }
    };

  /*
  ========================================
  EDIT
  ========================================
  */

  const handleEdit =
    (
      article: Article
    ) => {

      setEditingId(
        article._id
      );

      setFormData({
        title:
          article.title,

        excerpt:
          article.excerpt,

        category:
          article.category,

        author:
          article.author,

        readTime:
          article.readTime,
      });

      setOpenModal(
        true
      );
    };

  return (
    <main className="min-h-screen bg-[#f5f1ea]">

      {/* TOP */}
      <section className="border-b border-[#e7dfd2] bg-white sticky top-0 z-20 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-5">

          <div>

            <p className="text-[#c8a21a] uppercase tracking-[0.3em] text-xs font-semibold">

              Admin Panel

            </p>

            <h1 className="font-serif text-4xl text-[#051933] mt-2">

              Articles Management

            </h1>

          </div>

          {/* BUTTON */}
          <button
            onClick={() =>
              setOpenModal(
                true
              )
            }
            className="h-12 px-6 rounded-2xl bg-[#051933] hover:bg-[#0d2748] transition-all text-white text-sm font-semibold flex items-center gap-2"
          >

            <Plus className="w-4 h-4" />

            Add Article

          </button>

        </div>

      </section>

      {/* CONTENT */}
      <section className="py-10">

        <div className="max-w-7xl mx-auto px-6">

          {/* SEARCH */}
          <div className="relative max-w-md mb-8">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />

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
              className="w-full h-12 rounded-2xl border border-[#e7dfd2] bg-white pl-12 pr-4 outline-none"
            />

          </div>

          {/* LOADING */}
          {loading ? (

            <div className="flex items-center justify-center py-24">

              <Loader2 className="w-7 h-7 animate-spin text-[#051933]" />

            </div>

          ) : filtered.length ===
            0 ? (

            <div className="text-center py-24">

              <FileText className="w-14 h-14 text-[#94a3b8] mx-auto mb-5" />

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
                    className="rounded-[28px] overflow-hidden border border-[#e7dfd2] bg-white shadow-sm hover:shadow-2xl transition-all duration-300"
                  >

                    {/* IMAGE */}
                    <div className="relative h-[220px] bg-[#051933]">

                      {article.coverImage ? (

                        <Image
                          src={getFileUrl(
                            article.coverImage
                          )}
                          alt={
                            article.title
                          }
                          fill
                          className="object-cover"
                        />

                      ) : (

                        <div className="w-full h-full flex items-center justify-center">

                          <FileText className="w-16 h-16 text-[#c8a21a]" />

                        </div>
                      )}

                    </div>

                    {/* CONTENT */}
                    <div className="p-7">

                      <div className="flex items-center justify-between gap-3 mb-4">

                        <span className="text-[10px] uppercase tracking-[0.2em] bg-[#c8a21a]/10 text-[#c8a21a] px-3 py-2 rounded-full font-semibold">

                          {
                            article.category
                          }

                        </span>

                        <p className="text-xs text-[#94a3b8]">

                          {
                            article.readTime
                          }

                        </p>

                      </div>

                      <h2 className="font-serif text-3xl leading-snug text-[#051933]">

                        {
                          article.title
                        }

                      </h2>

                      <p className="text-[#64748b] leading-7 text-sm mt-4 line-clamp-3">

                        {
                          article.excerpt
                        }

                      </p>

                      {/* ACTIONS */}
                      <div className="mt-8 flex items-center gap-3">

                        {/* VIEW */}
                        <a
                          href={getFileUrl(
                            article.pdfUrl
                          )}
                          target="_blank"
                          className="flex-1 h-11 rounded-2xl border border-[#e7dfd2] hover:border-[#c8a21a] bg-[#faf7f2] flex items-center justify-center gap-2 text-sm font-semibold text-[#051933] transition-all"
                        >

                          <Eye className="w-4 h-4" />

                          View

                        </a>

                        {/* DOWNLOAD */}
                        <a
                          href={getFileUrl(
                            article.pdfUrl
                          )}
                          download
                          className="w-11 h-11 rounded-2xl border border-[#e7dfd2] hover:border-[#c8a21a] bg-[#faf7f2] flex items-center justify-center transition-all"
                        >

                          <Download className="w-4 h-4 text-[#051933]" />

                        </a>

                        {/* EDIT */}
                        <button
                          onClick={() =>
                            handleEdit(
                              article
                            )
                          }
                          className="w-11 h-11 rounded-2xl border border-[#e7dfd2] hover:border-[#c8a21a] bg-[#faf7f2] flex items-center justify-center transition-all"
                        >

                          <Pencil className="w-4 h-4 text-[#051933]" />

                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            handleDelete(
                              article._id
                            )
                          }
                          className="w-11 h-11 rounded-2xl border border-red-200 hover:border-red-400 bg-red-50 flex items-center justify-center transition-all"
                        >

                          <Trash2 className="w-4 h-4 text-red-600" />

                        </button>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </section>

      {/* MODAL */}
      {openModal && (

        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">

          <div className="w-full max-w-2xl rounded-[32px] bg-white overflow-hidden shadow-2xl">

            {/* HEADER */}
            <div className="px-8 py-6 border-b border-[#ece4d7] flex items-center justify-between">

              <div>

                <p className="text-[#c8a21a] uppercase tracking-[0.25em] text-xs font-semibold">

                  Admin

                </p>

                <h2 className="font-serif text-3xl text-[#051933] mt-2">

                  {editingId
                    ? "Edit Article"
                    : "Create Article"}

                </h2>

              </div>

              <button
                onClick={() =>
                  setOpenModal(
                    false
                  )
                }
                className="w-10 h-10 rounded-full bg-[#f5f1ea] flex items-center justify-center"
              >

                <X className="w-5 h-5" />

              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={
                handleSubmit
              }
              className="p-8 space-y-6"
            >

              <input
                type="text"
                placeholder="Article title"
                value={
                  formData.title
                }
                onChange={(
                  e
                ) =>
                  setFormData({
                    ...formData,
                    title:
                      e.target
                        .value,
                  })
                }
                className="w-full h-12 rounded-2xl border border-[#e7dfd2] px-5 outline-none"
                required
              />

              <textarea
                placeholder="Article excerpt"
                value={
                  formData.excerpt
                }
                onChange={(
                  e
                ) =>
                  setFormData({
                    ...formData,
                    excerpt:
                      e.target
                        .value,
                  })
                }
                className="w-full h-32 rounded-2xl border border-[#e7dfd2] px-5 py-4 outline-none resize-none"
                required
              />

              <div className="grid grid-cols-2 gap-5">

                <input
                  type="text"
                  placeholder="Category"
                  value={
                    formData.category
                  }
                  onChange={(
                    e
                  ) =>
                    setFormData({
                      ...formData,
                      category:
                        e.target
                          .value,
                    })
                  }
                  className="w-full h-12 rounded-2xl border border-[#e7dfd2] px-5 outline-none"
                  required
                />

                <input
                  type="text"
                  placeholder="Author"
                  value={
                    formData.author
                  }
                  onChange={(
                    e
                  ) =>
                    setFormData({
                      ...formData,
                      author:
                        e.target
                          .value,
                    })
                  }
                  className="w-full h-12 rounded-2xl border border-[#e7dfd2] px-5 outline-none"
                  required
                />

              </div>

              <input
                type="text"
                placeholder="Read time (e.g. 5 min read)"
                value={
                  formData.readTime
                }
                onChange={(
                  e
                ) =>
                  setFormData({
                    ...formData,
                    readTime:
                      e.target
                        .value,
                  })
                }
                className="w-full h-12 rounded-2xl border border-[#e7dfd2] px-5 outline-none"
                required
              />

              {/* FILES */}
              <div className="grid grid-cols-2 gap-5">

                {/* COVER */}
                <label className="h-36 rounded-3xl border-2 border-dashed border-[#e7dfd2] hover:border-[#c8a21a] transition-all flex flex-col items-center justify-center cursor-pointer bg-[#faf7f2]">

                  <Upload className="w-6 h-6 text-[#051933]" />

                  <p className="text-sm mt-3 text-[#64748b]">

                    Upload Cover Image

                  </p>

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(
                      e
                    ) =>
                      setCoverImage(
                        e.target
                          .files?.[0] ||
                          null
                      )
                    }
                  />

                </label>

                {/* PDF */}
                <label className="h-36 rounded-3xl border-2 border-dashed border-[#e7dfd2] hover:border-[#c8a21a] transition-all flex flex-col items-center justify-center cursor-pointer bg-[#faf7f2]">

                  <FileText className="w-6 h-6 text-[#051933]" />

                  <p className="text-sm mt-3 text-[#64748b]">

                    Upload PDF

                  </p>

                  <input
                    type="file"
                    hidden
                    accept=".pdf"
                    onChange={(
                      e
                    ) =>
                      setPdfFile(
                        e.target
                          .files?.[0] ||
                          null
                      )
                    }
                  />

                </label>

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={
                  submitting
                }
                className="w-full h-14 rounded-2xl bg-[#051933] hover:bg-[#0d2748] transition-all text-white font-semibold flex items-center justify-center gap-3"
              >

                {submitting ? (

                  <Loader2 className="w-5 h-5 animate-spin" />

                ) : (

                  <>
                    {editingId
                      ? "Update Article"
                      : "Create Article"}
                  </>
                )}

              </button>

            </form>

          </div>

        </div>
      )}

    </main>
  );
}
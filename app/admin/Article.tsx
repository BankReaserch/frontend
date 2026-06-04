"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";


import {
  Search,
  Plus,
  Upload,
  FileText,
  Loader2,
  X,
} from "lucide-react";
import ArticleCard from "@/components/article/ArticleCard";

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
  const api = axios.create({
    baseURL:
      process.env
        .NEXT_PUBLIC_API_URL,

    withCredentials: true,
  });
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
  const handleSubmit =async (e: any) => {
      e.preventDefault();
      try {
        setSubmitting(true);
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

  {filtered.map((article) => (

    <ArticleCard
      key={article._id}
      article={article}
      variant="admin"
      getFileUrl={getFileUrl}
      onEdit={() =>
        handleEdit(article)
      }
      onDelete={() =>
        handleDelete(article._id)
      }
    />

  ))}

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
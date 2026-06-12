"use client";

import Modal from "@/components/utils/modal/FormModel";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type QuestionType = {
  _id: string;
  category: string;
  categoryPriority: number;
  priority: number;
  question: string;
  answer: string;
  isPublished: boolean;
};

type FormType = {
  category: string;
  categoryPriority: number;
  priority: number;
  question: string;
  answer: string;
  isPublished: boolean;
};

// ─── Component ────────────────────────────────────────────────────────────────

const QNA = () => {
  const [qna, setQna] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<QuestionType | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] =
    useState<FormType>({
      category: "",
      categoryPriority: 1,
      priority: 1,
      question: "",
      answer: "",
      isPublished: true,
    });

  const fetchQNA = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/qna`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setQna(data.data || []);
    } catch (err) {
      console.error("Fetch QNA Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQNA();
  }, []);
  const handleAdd = () => {
    setEditing(null);
    setError(null);
    setFormData({
      category: "",
      categoryPriority: 1,
      priority: 1,
      question: "",
      answer: "",
      isPublished: true,
    });
    setOpen(true);
  };

  const handleEdit = (item: QuestionType) => {
    setEditing(item);
    setError(null);
    setFormData({
      category:
        item.category,
      categoryPriority:
        item.categoryPriority,
      priority:
        item.priority,
      question:
        item.question,
      answer:
        item.answer,
      isPublished:
        item.isPublished,
    });
    setOpen(true);
  };

  const handleSave = async () => {
    setError(null);

    if (
      !formData.category.trim() ||
      !formData.question.trim() ||
      !formData.answer.trim() ||
      !formData.categoryPriority
    ) {
      setError("Category, question, and answer are all required.");
      return;
    }

    try {
      setSaving(true);

      const url = editing
        ? `${process.env.NEXT_PUBLIC_API_URL}api/qna/${editing._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}api/qna/add`;

      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await fetchQNA();
      setOpen(false);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
      console.error("Save QNA Error:", err);
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────────

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this Q&A?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/qna/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      await fetchQNA();
    } catch (err) {
      console.error("Delete QNA Error:", err);
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0f172a]">Q&A Management</h1>
          <p className="text-gray-500 mt-1">Manage Ribis FAQ questions and answers.</p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#0f172a] hover:bg-[#111827] text-white px-5 py-3 rounded-xl font-medium transition"
        >
          <Plus size={18} />
          Add New
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-13 gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50 text-sm font-semibold text-gray-500">
          <div className="col-span-2">Category</div>
          <div className="col-span-1">Priority</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-3">Question</div>
          <div className="col-span-4">Answer</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* TABLE BODY */}
        <div className="divide-y divide-gray-100">
          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading...</div>
          ) : qna.length === 0 ? (
            <div className="p-10 text-center text-gray-400">No Q&A entries yet. Add one to get started.</div>
          ) : (
            [...qna]
              .sort((a, b) => {
                const catSort =
                  a.categoryPriority -
                  b.categoryPriority;
                return catSort !== 0 ? catSort : a.priority - b.priority;
              })
              .map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-13 gap-4 px-6 py-5 items-start hover:bg-gray-50 transition"
                >
                  <div>

                    <div className="inline-block bg-[#0f172a]/5 text-[#0f172a] px-3 py-1 rounded-full text-xs font-medium">
                      {item.category}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1">
                      Category Priority:
                      {" "}
                      {item.categoryPriority}
                    </div>
                  </div>

                  {/* PRIORITY */}
                  <div className="col-span-1">
                    <div className="w-9 h-9 rounded-xl bg-[#0f172a] text-white flex items-center justify-center text-sm font-semibold">
                      {item.priority}
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="col-span-1">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${item.isPublished
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>

                  {/* QUESTION */}
                  <div className="col-span-3 font-medium text-[#0f172a] leading-relaxed">
                    {item.question}
                  </div>

                  {/* ANSWER */}
                  <div className="col-span-4 text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {item.answer}
                  </div>

                  {/* ACTIONS */}
                  <div className="col-span-2 flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-[#0f172a] hover:text-white transition"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="w-10 h-10 rounded-xl border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* MODAL */}
      <Modal
        open={open}
        onClose={setOpen}
        size="lg"
        title={editing ? "Edit Q&A" : "Add New Q&A"}
        description="Manage FAQ content for the Ribis website."
        footer={
          <>
            <button
              onClick={() => setOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-[#0f172a] text-white hover:opacity-90 transition disabled:opacity-50"
            >
              {saving ? "Saving…" : editing ? "Update Q&A" : "Create Q&A"}
            </button>
          </>
        }
      >
        <div className="space-y-5">

          {/* INLINE ERROR */}
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* CATEGORY — dropdown populated from backend */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">

              Category

            </label>

            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category:
                    e.target.value,
                })
              }
              placeholder="General Ribis"
              className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-[#0f172a]"
            />

          </div>
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">

              Category Priority

            </label>

            <input
              type="number"
              min={1}
              value={
                formData.categoryPriority
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  categoryPriority:
                    Number(
                      e.target.value
                    ),
                })
              }
              className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-[#0f172a]"
            />

          </div>

          {/* PRIORITY */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
              <span className="ml-1 text-xs text-gray-400 font-normal">
                (unique per category)
              </span>
            </label>
            <input
              type="number"
              min={1}
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: Number(e.target.value) })
              }
              className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-[#0f172a]"
            />
          </div>

          {/* QUESTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="What is Ribis?"
              className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-[#0f172a]"
            />
          </div>

          {/* ANSWER */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer
            </label>
            <textarea
              rows={6}
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f172a] resize-none"
            />
          </div>

          {/* PUBLISHED TOGGLE */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Published</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Unpublished entries are hidden from the public FAQ.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, isPublished: !formData.isPublished })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.isPublished ? "bg-[#0f172a]" : "bg-gray-200"
                }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${formData.isPublished ? "translate-x-6" : "translate-x-1"
                  }`}
              />
            </button>
          </div>

        </div>
      </Modal>
    </div>
  );
};

export default QNA;
"use client";

import Modal from "@/components/utils/modal/FormModel";

import {
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

type QuestionType = {
  _id: string;

  category: string;

  priority: number;

  question: string;

  answer: string;
};

const QNA = () => {

  const [qna, setQna] =
    useState<QuestionType[]>(
      []
    );

  const [loading, setLoading] =
    useState(true);

  const [open, setOpen] =
    useState(false);

  const [editing, setEditing] =
    useState<QuestionType | null>(
      null
    );

  const [formData, setFormData] =
    useState({
      category: "",

      priority: 1,

      question: "",

      answer: "",
    });

  // =========================
  // FETCH QNA
  // =========================
  const fetchQNA =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/qna`,
            {
              credentials:
                "include",
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.message
          );
        }

        setQna(
          data.data || []
        );

      } catch (error) {

        console.error(
          "Fetch QNA Error:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    fetchQNA();

  }, []);

  // =========================
  // ADD
  // =========================
  const handleAdd = () => {

    setEditing(null);

    setFormData({
      category: "",

      priority: 1,

      question: "",

      answer: "",
    });

    setOpen(true);
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (
    item: QuestionType
  ) => {

    setEditing(item);

    setFormData({
      category:
        item.category,

      priority:
        item.priority,

      question:
        item.question,

      answer:
        item.answer,
    });

    setOpen(true);
  };

  // =========================
  // SAVE
  // =========================
  const handleSave =
    async () => {

      try {

        if (
          !formData.category ||
          !formData.question ||
          !formData.answer
        ) {
          return;
        }

        let response;

        // UPDATE
        if (editing) {

          response =
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}api/qna/${editing._id}`,
              {
                method:
                  "PUT",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                credentials:
                  "include",

                body: JSON.stringify(
                  formData
                ),
              }
            );

        } else {

          // CREATE
          response =
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}api/qna/add`,
              {
                method:
                  "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                credentials:
                  "include",

                body: JSON.stringify(
                  formData
                ),
              }
            );
        }

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.message
          );
        }

        await fetchQNA();

        setOpen(false);

      } catch (error) {

        console.error(
          "Save QNA Error:",
          error
        );
      }
    };

  // =========================
  // DELETE
  // =========================
  const handleDelete =
    async (
      id: string
    ) => {

      const confirmDelete =
        window.confirm(
          "Delete this Q&A?"
        );

      if (!confirmDelete)
        return;

      try {

        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/qna/${id}`,
            {
              method:
                "DELETE",

              credentials:
                "include",
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.message
          );
        }

        await fetchQNA();

      } catch (error) {

        console.error(
          "Delete QNA Error:",
          error
        );
      }
    };

  return (
    <div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>

          <h1 className="text-3xl font-bold text-[#0f172a]">

            Q&A Management

          </h1>

          <p className="text-gray-500 mt-1">

            Manage Ribis FAQ
            questions and
            answers.

          </p>

        </div>

        {/* ADD */}
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

        {/* HEADER */}
        <div className="grid grid-cols-13 gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50 text-sm font-semibold text-gray-500">

          <div className="col-span-2">
            Category
          </div>

          <div className="col-span-1">
            Priority
          </div>

          <div className="col-span-4">
            Question
          </div>

          <div className="col-span-4">
            Answer
          </div>

          <div className="col-span-2 text-right">
            Actions
          </div>

        </div>

        {/* BODY */}
        <div className="divide-y divide-gray-100">

          {loading ? (

            <div className="p-10 text-center text-gray-500">

              Loading...

            </div>

          ) : [...qna]
              .sort(
                (a, b) =>
                  a.priority -
                  b.priority
              )
              .map((item) => (

                <div
                  key={
                    item._id
                  }
                  className="grid grid-cols-13 gap-4 px-6 py-5 items-start hover:bg-gray-50 transition"
                >

                  {/* CATEGORY */}
                  <div className="col-span-2">

                    <span className="inline-block bg-[#0f172a]/5 text-[#0f172a] px-3 py-1 rounded-full text-xs font-medium">

                      {
                        item.category
                      }

                    </span>

                  </div>

                  {/* PRIORITY */}
                  <div className="col-span-1">

                    <div className="w-9 h-9 rounded-xl bg-[#0f172a] text-white flex items-center justify-center text-sm font-semibold">

                      {
                        item.priority
                      }

                    </div>

                  </div>

                  {/* QUESTION */}
                  <div className="col-span-4 font-medium text-[#0f172a] leading-relaxed">

                    {
                      item.question
                    }

                  </div>

                  {/* ANSWER */}
                  <div className="col-span-4 text-gray-600 text-sm leading-relaxed line-clamp-2">

                    {
                      item.answer
                    }

                  </div>

                  {/* ACTIONS */}
                  <div className="col-span-2 flex items-center justify-end gap-3">

                    {/* EDIT */}
                    <button
                      onClick={() =>
                        handleEdit(
                          item
                        )
                      }
                      className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-[#0f172a] hover:text-white transition"
                    >

                      <Pencil
                        size={16}
                      />

                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        handleDelete(
                          item._id
                        )
                      }
                      className="w-10 h-10 rounded-xl border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                    >

                      <Trash2
                        size={16}
                      />

                    </button>

                  </div>

                </div>
              ))}

        </div>

      </div>

      {/* MODAL */}
      <Modal
        open={open}
        onClose={setOpen}
        size="lg"
        title={
          editing
            ? "Edit Q&A"
            : "Add New Q&A"
        }
        description="Manage FAQ content for the Ribis website."
        footer={
          <>
            <button
              onClick={() =>
                setOpen(false)
              }
              className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 transition"
            >

              Cancel

            </button>

            <button
              onClick={
                handleSave
              }
              className="px-5 py-2.5 rounded-xl bg-[#0f172a] text-white hover:opacity-90 transition"
            >

              {editing
                ? "Update Q&A"
                : "Create Q&A"}

            </button>
          </>
        }
      >

        <div className="space-y-5">

          {/* CATEGORY */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">

              Category

            </label>

            <input
              type="text"
              value={
                formData.category
              }
              onChange={(e) =>
                setFormData({
                  ...formData,

                  category:
                    e.target
                      .value,
                })
              }
              placeholder="General Ribis"
              className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-[#0f172a]"
            />

          </div>

          {/* PRIORITY */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">

              Priority

            </label>

            <input
              type="number"
              min={1}
              value={
                formData.priority
              }
              onChange={(e) =>
                setFormData({
                  ...formData,

                  priority:
                    Number(
                      e.target.value
                    ),
                })
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
              value={
                formData.question
              }
              onChange={(e) =>
                setFormData({
                  ...formData,

                  question:
                    e.target
                      .value,
                })
              }
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
              value={
                formData.answer
              }
              onChange={(e) =>
                setFormData({
                  ...formData,

                  answer:
                    e.target
                      .value,
                })
              }
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f172a] resize-none"
            />

          </div>

        </div>

      </Modal>

    </div>
  );
};

export default QNA;
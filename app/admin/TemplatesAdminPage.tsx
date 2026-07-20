"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Search, Plus, Pencil, Trash2, Upload, FileText, X } from "lucide-react";
import ConfirmModal from "@/components/utils/modal/ConfirmModal";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
});

interface Template {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
}

interface TemplateFormState {
    title: string;
    description: string;
    imageFile: File | null;
    imagePreview: string | null;
}

const EMPTY_FORM: TemplateFormState = {
    title: "",
    description: "",
    imageFile: null,
    imagePreview: null,
};

function errorMessage(err: unknown, fallback: string) {
    if (axios.isAxiosError(err)) return err.response?.data?.message || fallback;
    return fallback;
}

function resolveImageUrl(url: string | null | undefined) {
    if (!url) return "";
    if (/^(https?:|data:|blob:)/i.test(url)) return url;
    const base = API_BASE.replace(/\/+$/, "");
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${base}${path}`;
}

export default function TemplatesAdminPage() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    const [form, setForm] = useState<TemplateFormState>(EMPTY_FORM);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState<Template | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const formCardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        fetchTemplates();
    }, []);

    async function fetchTemplates() {
        setLoading(true);
        try {
            const { data } = await api.get("api/templates");
            setTemplates(data.data ?? []);
        } catch (err) {
            toast.error(errorMessage(err, "Could not load templates."));
        } finally {
            setLoading(false);
        }
    }

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return templates;
        return templates.filter(
            (t) =>
                t.title?.toLowerCase().includes(q) ||
                t.description?.toLowerCase().includes(q)
        );
    }, [templates, query]);

    function updateField<K extends keyof TemplateFormState>(key: K, value: TemplateFormState[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function handleImageChange(file: File | null) {
        if (!file) {
            updateField("imageFile", null);
            updateField("imagePreview", null);
            return;
        }
        updateField("imageFile", file);
        const reader = new FileReader();
        reader.onload = () => updateField("imagePreview", reader.result as string);
        reader.readAsDataURL(file);
    }

    function resetForm() {
        setForm(EMPTY_FORM);
        setEditingId(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    function startEdit(t: Template) {
        setEditingId(t._id);
        setForm({
            title: t.title ?? "",
            description: t.description ?? "",
            imageFile: null,
            imagePreview: t.imageUrl ?? null,
        });
        formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.title.trim()) {
            toast.error("Title is required.");
            return;
        }

        const fd = new FormData();
        fd.append("title", form.title.trim());
        fd.append("description", form.description.trim());
        if (form.imageFile) fd.append("image", form.imageFile);

        setSubmitting(true);
        try {
            const url = editingId ? `api/templates/${editingId}` : "api/templates";
            const { data } = editingId ? await api.patch(url, fd) : await api.post(url, fd);
            toast.success(data.message || (editingId ? "Template updated." : "Template added."));
            resetForm();
            fetchTemplates();
        } catch (err) {
            toast.error(errorMessage(err, "Something went wrong. Please try again."));
        } finally {
            setSubmitting(false);
        }
    }

    async function confirmDelete() {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            const { data } = await api.delete(`api/templates/${deleteTarget._id}`);
            setTemplates((prev) => prev.filter((t) => t._id !== deleteTarget._id));
            toast.success(data.message || "Template removed.");
            if (editingId === deleteTarget._id) resetForm();
            setDeleteTarget(null);
        } catch (err) {
            toast.error(errorMessage(err, "Could not remove this template."));
        } finally {
            setDeleting(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#f5f0e8] px-6 py-8 lg:px-10">
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="flex flex-col gap-6 rounded-[28px] border border-[#e5ddd0] bg-white p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a84c]">
                            Templates
                        </p>
                        <h1 className="mt-2 font-serif text-4xl font-bold text-[#0d1b2a]">
                            Manage Templates
                        </h1>
                    </div>

                    <div className="relative w-full sm:w-80">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a9bb0]">
                            <Search size={18} />
                        </span>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            type="text"
                            placeholder="Search templates..."
                            className="w-full rounded-full border border-[#e5ddd0] bg-[#f5f0e8]/60 py-3 pl-11 pr-4 text-sm text-[#0d1b2a] placeholder:text-[#8a9bb0] focus:border-[#c9a84c]/50 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
                    <div className="overflow-hidden rounded-[28px] border border-[#e5ddd0] bg-white shadow-sm">
                        <div className="border-b border-[#e5ddd0] bg-gradient-to-b from-[#faf7f2] to-white p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a84c]">
                                Directory
                            </p>
                            <h2 className="mt-2 font-serif text-2xl font-bold text-[#0d1b2a]">
                                Templates Directory
                            </h2>
                            <p className="mt-1 text-sm text-[#8a9bb0]">
                                {loading ? "Loading templates…" : `${filtered.length} ${filtered.length === 1 ? "template" : "templates"} listed`}
                            </p>
                        </div>

                        <div className="max-h-[720px] space-y-4 overflow-y-auto p-6">
                            {loading && (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-28 animate-pulse rounded-2xl bg-[#f5f0e8]" />
                                    ))}
                                </div>
                            )}

                            {!loading && filtered.length === 0 && (
                                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5f0e8] text-[#c9a84c]">
                                        <FileText size={22} />
                                    </div>
                                    <p className="font-serif text-lg text-[#0d1b2a]">No templates yet</p>
                                    <p className="max-w-xs text-sm text-[#8a9bb0]">
                                        {query ? "No results match your search." : "Add your first template using the form on the right."}
                                    </p>
                                </div>
                            )}

                            {!loading &&
                                filtered.map((t) => {
                                    const isEditing = editingId === t._id;
                                    return (
                                        <div
                                            key={t._id}
                                            className={`group relative rounded-2xl border p-6 transition-all duration-200 ${
                                                isEditing
                                                    ? "border-[#c9a84c] bg-[#faf7f2] shadow-sm"
                                                    : "border-[#e5ddd0] bg-white hover:border-[#c9a84c]/40 hover:shadow-md"
                                            }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#e5ddd0] bg-[#f5f0e8]">
                                                    {t.imageUrl ? (
                                                        <img
                                                            src={resolveImageUrl(t.imageUrl)}
                                                            alt={t.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-[#c9a84c]">
                                                            <FileText size={22} />
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <h3 className="truncate font-serif text-lg font-bold text-[#0d1b2a]">
                                                            {t.title}
                                                        </h3>

                                                        <div className="flex flex-shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                                            <button
                                                                type="button"
                                                                onClick={() => startEdit(t)}
                                                                aria-label="Edit template"
                                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8a9bb0] transition-colors hover:bg-[#f5f0e8] hover:text-[#0d1b2a]"
                                                            >
                                                                <Pencil size={15} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setDeleteTarget(t)}
                                                                aria-label="Delete template"
                                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8a9bb0] transition-colors hover:bg-red-50 hover:text-red-600"
                                                            >
                                                                <Trash2 size={15} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {t.description && (
                                                        <p className="mt-3 text-sm leading-relaxed text-[#6b5e4e]">
                                                            {t.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    <div
                        ref={formCardRef}
                        className="rounded-[28px] border border-[#e5ddd0] bg-white p-7 shadow-sm lg:sticky lg:top-8"
                    >
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#0d1b2a] text-[#c9a84c]">
                                <Plus size={20} />
                            </div>
                            <div>
                                <h2 className="font-serif text-xl font-bold text-[#0d1b2a]">
                                    {editingId ? "Edit Template" : "Add Template"}
                                </h2>
                                <p className="text-xs text-[#8a9bb0]">Title, description & image</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8a9bb0]">
                                    Image
                                </label>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
                                />

                                {form.imagePreview ? (
                                    <div className="flex items-center gap-4 rounded-2xl border border-[#e5ddd0] bg-[#faf7f2] p-4">
                                        <img
                                            src={resolveImageUrl(form.imagePreview)}
                                            alt="Template preview"
                                            className="h-16 w-16 flex-shrink-0 rounded-xl border border-[#e5ddd0] object-cover"
                                        />
                                        <div className="flex-1">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="text-sm font-semibold text-[#0d1b2a] hover:text-[#c9a84c]"
                                            >
                                                Change image
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleImageChange(null)}
                                            aria-label="Remove image"
                                            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[#8a9bb0] hover:bg-white hover:text-red-500"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#e5ddd0] bg-[#faf7f2] px-4 py-8 text-center transition-colors hover:border-[#c9a84c]/50 hover:bg-[#f5f0e8]"
                                    >
                                        <span className="text-[#c9a84c]">
                                            <Upload size={22} />
                                        </span>
                                        <span className="text-sm font-semibold text-[#0d1b2a]">
                                            Click to upload image
                                        </span>
                                        <span className="text-xs text-[#8a9bb0]">PNG, JPG up to 5MB</span>
                                    </button>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8a9bb0]">
                                    Title
                                </label>
                                <input
                                    value={form.title}
                                    onChange={(e) => updateField("title", e.target.value)}
                                    type="text"
                                    placeholder="e.g. Standard Heter Iska"
                                    className="w-full rounded-xl border border-[#e5ddd0] bg-[#faf7f2] px-4 py-3 text-sm text-[#0d1b2a] placeholder:text-[#8a9bb0] focus:border-[#c9a84c]/50 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8a9bb0]">
                                    Description
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => updateField("description", e.target.value)}
                                    rows={4}
                                    placeholder="A short description shown on the card..."
                                    className="w-full resize-none rounded-xl border border-[#e5ddd0] bg-[#faf7f2] px-4 py-3 text-sm text-[#0d1b2a] placeholder:text-[#8a9bb0] focus:border-[#c9a84c]/50 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20"
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 rounded-xl bg-[#0d1b2a] px-6 py-3.5 text-sm font-bold text-[#c9a84c] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#132234] hover:shadow-md disabled:opacity-60"
                                >
                                    {submitting
                                        ? editingId
                                            ? "Saving…"
                                            : "Adding…"
                                        : editingId
                                        ? "Save Changes"
                                        : "Add Template"}
                                </button>

                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded-xl border border-[#e5ddd0] px-5 py-3.5 text-sm font-semibold text-[#6b5e4e] transition-colors hover:bg-[#f5f0e8]"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ConfirmModal
                open={!!deleteTarget}
                title="Remove template?"
                description={`This will permanently remove "${deleteTarget?.title}" from the directory.`}
                confirmText="Delete"
                cancelText="Cancel"
                loading={deleting}
                danger
                onConfirm={confirmDelete}
                onClose={() => setDeleteTarget(null)}
            />
        </div>
    );
}
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Search, Plus, Globe, Calendar, Pencil, Trash2, Upload, Building2, X } from "lucide-react";
import ConfirmModal from "@/components/utils/modal/ConfirmModal";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
});

interface Business {
    _id: string;
    name: string;
    logoUrl: string;
    website: string;
    date: string;
    notes: string;
}

interface BusinessFormState {
    name: string;
    website: string;
    date: string;
    notes: string;
    logoFile: File | null;
    logoPreview: string | null;
}

const EMPTY_FORM: BusinessFormState = {
    name: "",
    website: "",
    date: "",
    notes: "",
    logoFile: null,
    logoPreview: null,
};

function formatDate(iso: string) {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function cleanUrl(url: string) {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function errorMessage(err: unknown, fallback: string) {
    if (axios.isAxiosError(err)) return err.response?.data?.message || fallback;
    return fallback;
}

function resolveLogoUrl(url: string | null | undefined) {
    if (!url) return "";
    if (/^(https?:|data:|blob:)/i.test(url)) return url;
    const base = API_BASE.replace(/\/+$/, "");
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${base}${path}`;
}

export default function BusinessesAdminPage() {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    const [form, setForm] = useState<BusinessFormState>(EMPTY_FORM);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState<Business | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const formCardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        fetchBusinesses();
    }, []);

    async function fetchBusinesses() {
        setLoading(true);
        try {
            const { data } = await api.get("api/businesses");
            setBusinesses(data.data ?? []);
        } catch (err) {
            toast.error(errorMessage(err, "Could not load businesses."));
        } finally {
            setLoading(false);
        }
    }

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return businesses;
        return businesses.filter(
            (b) =>
                b.name?.toLowerCase().includes(q) ||
                b.website?.toLowerCase().includes(q) ||
                b.notes?.toLowerCase().includes(q)
        );
    }, [businesses, query]);

    function updateField<K extends keyof BusinessFormState>(key: K, value: BusinessFormState[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function handleLogoChange(file: File | null) {
        if (!file) {
            updateField("logoFile", null);
            updateField("logoPreview", null);
            return;
        }
        updateField("logoFile", file);
        const reader = new FileReader();
        reader.onload = () => updateField("logoPreview", reader.result as string);
        reader.readAsDataURL(file);
    }

    function resetForm() {
        setForm(EMPTY_FORM);
        setEditingId(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    function startEdit(b: Business) {
        setEditingId(b._id);
        setForm({
            name: b.name ?? "",
            website: b.website ?? "",
            date: b.date ? b.date.slice(0, 10) : "",
            notes: b.notes ?? "",
            logoFile: null,
            logoPreview: b.logoUrl ?? null,
        });
        formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.name.trim()) {
            toast.error("Business name is required.");
            return;
        }

        const fd = new FormData();
        fd.append("name", form.name.trim());
        fd.append("website", form.website.trim());
        fd.append("date", form.date);
        fd.append("notes", form.notes.trim());
        if (form.logoFile) fd.append("logo", form.logoFile);

        setSubmitting(true);
        try {
            const url = editingId ? `api/businesses/${editingId}` : "api/businesses";
            const { data } = editingId ? await api.patch(url, fd) : await api.post(url, fd);
            toast.success(data.message || (editingId ? "Business updated." : "Business added."));
            resetForm();
            fetchBusinesses();
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
            const { data } = await api.delete(`api/businesses/${deleteTarget._id}`);
            setBusinesses((prev) => prev.filter((b) => b._id !== deleteTarget._id));
            toast.success(data.message || "Business removed.");
            if (editingId === deleteTarget._id) resetForm();
            setDeleteTarget(null);
        } catch (err) {
            toast.error(errorMessage(err, "Could not remove this business."));
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
                            Business Directory
                        </p>
                        <h1 className="mt-2 font-serif text-4xl font-bold text-[#0d1b2a]">
                            Manage Businesses
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
                            placeholder="Search business..."
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
                                Businesses Directory
                            </h2>
                            <p className="mt-1 text-sm text-[#8a9bb0]">
                                {loading ? "Loading businesses…" : `${filtered.length} ${filtered.length === 1 ? "business" : "businesses"} listed`}
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
                                        <Building2 size={22} />
                                    </div>
                                    <p className="font-serif text-lg text-[#0d1b2a]">No businesses yet</p>
                                    <p className="max-w-xs text-sm text-[#8a9bb0]">
                                        {query ? "No results match your search." : "Add your first business using the form on the right."}
                                    </p>
                                </div>
                            )}

                            {!loading &&
                                filtered.map((b) => {
                                    const isEditing = editingId === b._id;
                                    return (
                                        <div
                                            key={b._id}
                                            className={`group relative rounded-2xl border p-6 transition-all duration-200 ${
                                                isEditing
                                                    ? "border-[#c9a84c] bg-[#faf7f2] shadow-sm"
                                                    : "border-[#e5ddd0] bg-white hover:border-[#c9a84c]/40 hover:shadow-md"
                                            }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#e5ddd0] bg-[#f5f0e8]">
                                                    {b.logoUrl ? (
                                                        <img
                                                            src={resolveLogoUrl(b.logoUrl)}
                                                            alt={b.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-[#c9a84c]">
                                                            <Building2 size={22} />
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <h3 className="truncate font-serif text-lg font-bold text-[#0d1b2a]">
                                                            {b.name}
                                                        </h3>

                                                        <div className="flex flex-shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                                            <button
                                                                type="button"
                                                                onClick={() => startEdit(b)}
                                                                aria-label="Edit business"
                                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8a9bb0] transition-colors hover:bg-[#f5f0e8] hover:text-[#0d1b2a]"
                                                            >
                                                                <Pencil size={15} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setDeleteTarget(b)}
                                                                aria-label="Delete business"
                                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8a9bb0] transition-colors hover:bg-red-50 hover:text-red-600"
                                                            >
                                                                <Trash2 size={15} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#6b5e4e]">
                                                        {b.website && (
                                                            <a
                                                                href={b.website.startsWith("http") ? b.website : `https://${b.website}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1.5 text-[#0d1b2a] underline decoration-[#e5ddd0] underline-offset-2 hover:text-[#c9a84c]"
                                                            >
                                                                <Globe size={15} />
                                                                {cleanUrl(b.website)}
                                                            </a>
                                                        )}
                                                        {b.date && (
                                                            <span className="flex items-center gap-1.5">
                                                                <Calendar size={15} />
                                                                {formatDate(b.date)}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {b.notes && (
                                                        <p className="mt-3 text-sm leading-relaxed text-[#6b5e4e]">
                                                            {b.notes}
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
                                    {editingId ? "Edit Business" : "Add Business"}
                                </h2>
                                <p className="text-xs text-[#8a9bb0]">Name, logo, website & notes</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8a9bb0]">
                                    Logo
                                </label>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleLogoChange(e.target.files?.[0] ?? null)}
                                />

                                {form.logoPreview ? (
                                    <div className="flex items-center gap-4 rounded-2xl border border-[#e5ddd0] bg-[#faf7f2] p-4">
                                        <img
                                            src={resolveLogoUrl(form.logoPreview)}
                                            alt="Logo preview"
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
                                            onClick={() => handleLogoChange(null)}
                                            aria-label="Remove logo"
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
                                            Click to upload logo
                                        </span>
                                        <span className="text-xs text-[#8a9bb0]">PNG, JPG up to 5MB</span>
                                    </button>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8a9bb0]">
                                    Business Name
                                </label>
                                <input
                                    value={form.name}
                                    onChange={(e) => updateField("name", e.target.value)}
                                    type="text"
                                    placeholder="e.g. Amex"
                                    className="w-full rounded-xl border border-[#e5ddd0] bg-[#faf7f2] px-4 py-3 text-sm text-[#0d1b2a] placeholder:text-[#8a9bb0] focus:border-[#c9a84c]/50 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8a9bb0]">
                                    Website
                                </label>
                                <input
                                    value={form.website}
                                    onChange={(e) => updateField("website", e.target.value)}
                                    type="text"
                                    placeholder="www.example.com"
                                    className="w-full rounded-xl border border-[#e5ddd0] bg-[#faf7f2] px-4 py-3 text-sm text-[#0d1b2a] placeholder:text-[#8a9bb0] focus:border-[#c9a84c]/50 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8a9bb0]">
                                    Date
                                </label>
                                <input
                                    value={form.date}
                                    onChange={(e) => updateField("date", e.target.value)}
                                    type="date"
                                    className="w-full rounded-xl border border-[#e5ddd0] bg-[#faf7f2] px-4 py-3 text-sm text-[#0d1b2a] focus:border-[#c9a84c]/50 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8a9bb0]">
                                    Notes
                                </label>
                                <textarea
                                    value={form.notes}
                                    onChange={(e) => updateField("notes", e.target.value)}
                                    rows={4}
                                    placeholder="Any relevant notes about this business..."
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
                                        : "Add Business"}
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
                title="Remove business?"
                description={`This will permanently remove "${deleteTarget?.name}" from the directory.`}
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
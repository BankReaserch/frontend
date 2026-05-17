'use client'

import { useEffect, useState } from "react";
import Modal from "@/components/utils/modal/FormModel";
import {
    BookOpen,
    User,
    DollarSign,
    Layers3,
    FileText,
    Image as ImageIcon,
    Save,
    X,
    ShieldCheck,
} from "lucide-react";

type BookType = {
    _id?: string;
    title: string;
    author: string;
    category: string;
    description: string;
    pages: number | string;
    price: number | string;
    originalPrice?: number | string;
    badge?: string;
    inStock: boolean;
};

type AddBookProps = {
    open: boolean;
    onClose: (value: boolean) => void;

    editData?: BookType | null;
};

const categories = [
    "Halacha",
    "Finance",
    "Responsa",
    "Education",
    "Audio",
];

const Addbook = ({
    open,
    onClose,
    editData,
}: AddBookProps) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        description: "",
        pages: "",
        price: "",
        originalPrice: "",
        badge: "",
        inStock: true,
    });

    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [bookFile, setBookFile] = useState<File | null>(null);

    useEffect(() => {

        if (editData) {

            setFormData({
                title: editData.title || "",
                author: editData.author || "",
                category: editData.category || "",
                description: editData.description || "",
                pages: String(editData.pages || ""),
                price: String(editData.price || ""),
                originalPrice: String(
                    editData.originalPrice || ""
                ),
                badge: editData.badge || "",
                inStock:
                    editData.inStock ?? true,
            });
        }

    }, [editData]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : value,
        }));
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            // validation
            if (!formData.title.trim()) {
                alert("Book title is required");
                return;
            }

            if (!formData.author.trim()) {
                alert("Author name is required");
                return;
            }

            if (!formData.category) {
                alert("Please select category");
                return;
            }

            if (!editData?._id) {

                if (!coverImage) {
                    alert(
                        "Please upload cover image"
                    );
                    return;
                }

                if (!bookFile) {
                    alert(
                        "Please upload book file"
                    );
                    return;
                }
            }
            // create formdata
            const payload = new FormData();

            // text fields
            Object.entries(formData).forEach(([key, value]) => {
                payload.append(key, String(value));
            });

            // files
            if (coverImage) {
                payload.append(
                    "coverImage",
                    coverImage
                );
            }

            if (bookFile) {
                payload.append(
                    "bookFile",
                    bookFile
                );
            }
            const response = await fetch(
                editData?._id
                    ? `${process.env.NEXT_PUBLIC_API_URL}api/book/${editData._id}`
                    : `${process.env.NEXT_PUBLIC_API_URL}api/book/add`,
                {
                    method:
                        editData?._id
                            ? "PUT"
                            : "POST",
                    body: payload,
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Upload failed"
                );
            }

            console.log("BOOK CREATED:", data);

            alert("Book uploaded successfully");
            setFormData({
                title: "",
                author: "",
                category: "",
                description: "",
                pages: "",
                price: "",
                originalPrice: "",
                badge: "",
                inStock: true,
            });

            setCoverImage(null);

            setBookFile(null);

            // close modal
            onClose(false);

        } catch (error: any) {
            console.error(error);

            alert(
                error.message || "Something went wrong"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            size="xl"
            title={
                editData
                    ? "Edit Book"
                    : "Add New Book"
            }
            description="Create and publish a new book to your Ribis library."
        >
            <form onSubmit={handleSubmit} className="space-y-7">
                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* TITLE */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Book Title
                        </label>

                        <div className="relative">
                            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter book title"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#c9a84c] focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* AUTHOR */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Author Name
                        </label>

                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Rabbi name"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#c9a84c] focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Category
                        </label>

                        <div className="relative">
                            <Layers3 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#c9a84c] focus:bg-white"
                            >
                                <option value="">Select category</option>

                                {categories.map((cat) => (
                                    <option key={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* PAGES */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Total Pages
                        </label>

                        <input
                            type="number"
                            name="pages"
                            value={formData.pages}
                            onChange={handleChange}
                            placeholder="e.g. 320"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none transition focus:border-[#c9a84c] focus:bg-white"
                        />
                    </div>

                    {/* PRICE */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Price
                        </label>

                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="29.99"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#c9a84c] focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* ORIGINAL PRICE */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Original Price
                        </label>

                        <input
                            type="number"
                            name="originalPrice"
                            value={formData.originalPrice}
                            onChange={handleChange}
                            placeholder="Optional"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none transition focus:border-[#c9a84c] focus:bg-white"
                        />
                    </div>

                    {/* BADGE */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Badge
                        </label>

                        <input
                            type="text"
                            name="badge"
                            value={formData.badge}
                            onChange={handleChange}
                            placeholder="Bestseller / New / Sale"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none transition focus:border-[#c9a84c] focus:bg-white"
                        />
                    </div>

                    {/* STOCK */}
                    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800">
                                In Stock
                            </h4>

                            <p className="text-xs text-gray-500">
                                Toggle availability
                            </p>
                        </div>

                        <label className="relative inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                checked={formData.inStock}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        inStock: e.target.checked,
                                    }))
                                }
                                className="peer sr-only"
                            />

                            <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#c9a84c] peer-checked:after:translate-x-full" />
                        </label>
                    </div>
                </div>

                {/* DESCRIPTION */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Description
                    </label>

                    <div className="relative">
                        <FileText className="absolute left-3 top-4 h-4 w-4 text-gray-400" />

                        <textarea
                            rows={5}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Write a short description..."
                            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#c9a84c] focus:bg-white"
                        />
                    </div>
                </div>

                {/* FILE UPLOADS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* COVER IMAGE */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Public Cover Image
                        </label>

                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition hover:border-[#c9a84c] hover:bg-[#faf7f0]">
                            <ImageIcon className="mb-3 h-10 w-10 text-gray-400" />

                            <span className="text-sm font-semibold text-gray-800">
                                Upload Cover Image
                            </span>

                            <span className="mt-1 text-xs text-gray-500">
                                PNG, JPG, WEBP
                            </span>

                            {coverImage && (
                                <span className="mt-3 text-xs text-[#c9a84c] font-medium">
                                    {coverImage.name}
                                </span>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        setCoverImage(e.target.files[0]);
                                    }
                                }}
                            />
                        </label>
                    </div>

                    {/* PROTECTED BOOK */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Protected Book File
                        </label>

                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#c9a84c]/40 bg-[#faf7f0] px-6 py-10 text-center transition hover:border-[#c9a84c] hover:bg-[#f8f3e7]">
                            <ShieldCheck className="mb-3 h-10 w-10 text-[#c9a84c]" />

                            <span className="text-sm font-semibold text-gray-800">
                                Upload Full Book
                            </span>

                            <span className="mt-1 text-xs text-gray-500">
                                PDF, EPUB, ZIP
                            </span>

                            <span className="mt-2 text-[11px] text-[#8a9bb0]">
                                Accessible only after payment/admin approval
                            </span>

                            {bookFile && (
                                <span className="mt-3 text-xs text-[#c9a84c] font-medium">
                                    {bookFile.name}
                                </span>
                            )}

                            <input
                                type="file"
                                accept=".pdf,.epub,.zip"
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        setBookFile(e.target.files[0]);
                                    }
                                }}
                            />
                        </label>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
                    <button
                        type="button"
                        onClick={() => onClose(false)}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                    >
                        <X className="h-4 w-4" />
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#c9a84c] px-5 py-2.5 text-sm font-semibold text-[#0d1b2a] transition hover:bg-[#d4b567] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Save className="h-4 w-4" />

                        {loading ? "Uploading..." : "Save Book"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default Addbook;
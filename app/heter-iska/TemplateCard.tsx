"use client";

import { useState } from "react";
import { ArrowRight, Download, Expand, FileText } from "lucide-react";
import Modal from "@/components/utils/modal/FormModel";

type TemplateCardProps = {
    title: string;
    description?: string;
    imageUrl?: string;
};

function resolveImageUrl(url?: string) {
    if (!url) return "";
    if (/^(https?:|data:|blob:)/i.test(url)) return url;
    const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
    return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}

function slugify(title: string) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "template";
}

export default function TemplateCard({ title, description, imageUrl }: TemplateCardProps) {
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [thumbnailFailed, setThumbnailFailed] = useState(false);
    const [previewFailed, setPreviewFailed] = useState(false);

    const image = resolveImageUrl(imageUrl);
    const hasImage = Boolean(image) && !thumbnailFailed;

    function closeModal() {
        setOpen(false);
        setExpanded(false);
    }

    async function handleDownload() {
        if (!image) return;
        setDownloading(true);
        try {
            const res = await fetch(image);
            const blob = await res.blob();
            const extension = blob.type.split("/")[1] || "jpg";
            const objectUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = objectUrl;
            link.download = `${slugify(title)}.${extension}`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(objectUrl);
        } catch {
            /* download failed silently — user can still view the image in the modal */
        } finally {
            setDownloading(false);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="group flex h-full flex-col rounded-[28px] border border-[#E7E2D9] bg-white p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
                {hasImage ? (
                    <div className="-mx-8 -mt-8 mb-6 h-40 overflow-hidden rounded-t-[28px] border-b border-[#E7E2D9] bg-[#F4F1EC]">
                        <img
                            src={image}
                            alt={title}
                            onError={() => setThumbnailFailed(true)}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C8A75B]">
                        <FileText className="h-4 w-4" />
                        Template
                    </div>
                )}

                <div className="mt-6 flex-1">
                    <h3 className="text-xl font-semibold leading-snug text-[#1A2B3C]">{title}</h3>
                    {description && (
                        <p className="mt-3 line-clamp-3 text-sm text-slate-500">{description}</p>
                    )}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-[#F0ECE4] pt-6">
                    <span className="text-sm text-slate-500">View details</span>
                    <ArrowRight className="h-5 w-5 text-[#C8A75B] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
            </button>

            <Modal
                open={open}
                onClose={closeModal}
                title={title}
                size={expanded ? "xl" : "md"}
                footer={
                    <>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Close
                        </button>

                        {image && !previewFailed && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setExpanded((v) => !v)}
                                    className="inline-flex items-center gap-2 rounded-xl border border-[#E7E2D9] px-5 py-2.5 text-sm font-semibold text-[#1A2B3C] transition hover:bg-[#F4F1EC]"
                                >
                                    <Expand size={16} />
                                    {expanded ? "Shrink View" : "View Full Size"}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDownload}
                                    disabled={downloading}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#0B1C2C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16304D] disabled:opacity-60"
                                >
                                    <Download size={16} />
                                    {downloading ? "Preparing…" : "Download"}
                                </button>
                            </>
                        )}
                    </>
                }
            >
                {image && !previewFailed ? (
                    <img
                        src={image}
                        alt={title}
                        onError={() => setPreviewFailed(true)}
                        className={`w-full rounded-2xl border border-[#E7E2D9] object-contain transition-all duration-300 ${
                            expanded ? "max-h-[70vh]" : "max-h-[320px]"
                        }`}
                    />
                ) : (
                    <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-[#E7E2D9] text-slate-400">
                        {image ? "Couldn't load this image" : "No preview available"}
                    </div>
                )}

                {description ? (
                    <p className="mt-6 text-sm leading-7 text-slate-500">{description}</p>
                ) : (
                    <p className="mt-6 text-sm text-slate-400">No description provided.</p>
                )}
            </Modal>
        </>
    );
}
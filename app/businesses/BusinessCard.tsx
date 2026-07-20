"use client";

import { useState } from "react";
import Modal from "@/components/utils/modal/FormModel";

type BusinessCardProps = {
    name: string;
    logoUrl?: string;
    website?: string;
    date?: string;
    notes?: string;
};

function resolveLogoUrl(url?: string) {
    if (!url) return "";
    if (/^(https?:|data:|blob:)/i.test(url)) return url;
    const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
    return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}

function formatDate(iso?: string) {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function cleanUrl(url: string) {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default function BusinessCard({ name, logoUrl, website, date, notes }: BusinessCardProps) {
    const [open, setOpen] = useState(false);
    const logo = resolveLogoUrl(logoUrl);
    const websiteHref = website ? (website.startsWith("http") ? website : `https://${website}`) : undefined;

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="group flex h-full flex-col rounded-[28px] border border-[#eadfcb] bg-white p-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c8a21a]/40 hover:shadow-[0_20px_60px_rgba(5,25,51,0.08)]"
            >
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#eadfcb] bg-[#faf7f2]">
                        {logo ? (
                            <img src={logo} alt={name} className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-lg font-bold text-[#c8a21a]">
                                {name.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>

                    <div className="min-w-0">
                        <h3 className="truncate text-lg font-bold text-[#051933]">{name}</h3>
                        {date && (
                            <p className="mt-1 text-xs font-medium text-[#9b7b16]">
                                Partnered since {formatDate(date)}
                            </p>
                        )}
                    </div>
                </div>

                {notes && (
                    <p className="mt-5 line-clamp-4 flex-1 text-sm leading-6 text-[#5f6b7a]">
                        {notes}
                    </p>
                )}

                {website && (
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#051933] transition-colors group-hover:text-[#c8a21a]">
                        {cleanUrl(website)}
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </span>
                )}
            </button>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title={name}
                description={date ? `Partnered since ${formatDate(date)}` : undefined}
                footer={
                    <>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Close
                        </button>
                        {websiteHref && (
                            <a
                                href={websiteHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-xl bg-[#051933] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a274b]"
                            >
                                Visit Website
                            </a>
                        )}
                    </>
                }
            >
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#eadfcb] bg-[#faf7f2]">
                        {logo ? (
                            <img src={logo} alt={name} className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-xl font-bold text-[#c8a21a]">
                                {name.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>

                    {websiteHref && (
                        <a
                            href={websiteHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-[#051933] underline decoration-[#eadfcb] underline-offset-2 hover:text-[#c8a21a]"
                        >
                            {cleanUrl(website!)}
                        </a>
                    )}
                </div>

                {notes ? (
                    <p className="mt-6 text-sm leading-7 text-[#5f6b7a]">{notes}</p>
                ) : (
                    <p className="mt-6 text-sm text-[#9aa5b1]">No additional notes provided.</p>
                )}
            </Modal>
        </>
    );
}
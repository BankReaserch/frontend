"use client";

import Image from "next/image";
import { FileText } from "lucide-react";

type Props = {
  title: string;
  coverImage?: string;
  category: string;
  getFileUrl: (path: string) => string;
};

export default function ArticleImage({
  title,
  coverImage,
  category,
  getFileUrl,
}: Props) {
  
  return (
    <div className="relative h-[220px] overflow-hidden bg-[#051933]">

      {coverImage ? (
        <Image
          src={getFileUrl(coverImage)}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <FileText className="w-16 h-16 text-[#c8a21a]" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      <div className="absolute top-5 left-5">
        <span className="bg-[#c8a21a] text-[#051933] text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full">
          {category}
        </span>
      </div>
    </div>
  );
}
"use client";

import {
  ArrowRight,
  Download,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

type Props = {
  pdfUrl: string;
  variant: "public" | "admin";
  getFileUrl: (path: string) => string;

  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ArticleActions({
  pdfUrl,
  variant,
  getFileUrl,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="mt-6 pt-5 border-t border-[#f1ebe2] flex items-center gap-3">

      <a
        href={getFileUrl(pdfUrl)}
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex-1
          h-12
          rounded-2xl
          bg-[#051933]
          hover:bg-[#0d2748]
          transition
          text-white
          flex
          items-center
          justify-center
          gap-2
          text-sm
          font-semibold
        "
      >
        {variant === "public" ? (
          <>
            Read Article
            <ArrowRight className="w-4 h-4" />
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" />
            View
          </>
        )}
      </a>

      <a
        href={getFileUrl(pdfUrl)}
        download
        className="
          w-12
          h-12
          rounded-2xl
          border
          border-[#e7dfd2]
          hover:border-[#c8a21a]
          bg-[#faf7f2]
          flex
          items-center
          justify-center
        "
      >
        <Download className="w-4 h-4 text-[#051933]" />
      </a>

      {variant === "admin" && (
        <>
          <button
            onClick={onEdit}
            className="
              w-12
              h-12
              rounded-2xl
              border
              border-[#e7dfd2]
              bg-[#faf7f2]
              flex
              items-center
              justify-center
            "
          >
            <Pencil className="w-4 h-4 text-[#051933]" />
          </button>

          <button
            onClick={onDelete}
            className="
              w-12
              h-12
              rounded-2xl
              border
              border-red-200
              bg-red-50
              flex
              items-center
              justify-center
            "
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </>
      )}

    </div>
  );
}
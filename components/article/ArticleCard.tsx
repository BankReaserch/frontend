"use client";

import { Article } from "./article.types";

import ArticleImage from "./ArticleImage";
import ArticleMeta from "./ArticleMeta";
import ArticleActions from "./ArticleActions";

type Props = {
  article: Article;

  variant?: "public" | "admin";

  getFileUrl: (
    path: string
  ) => string;

  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ArticleCard({
  article,
  variant = "public",
  getFileUrl,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className="
        group
        h-full
        rounded-[32px]
        overflow-hidden
        border
        border-[#ebe3d6]
        bg-white
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-500
        flex
        flex-col
      "
    >
      <ArticleImage
        title={article.title}
        coverImage={article.coverImage}
        category={article.category}
        getFileUrl={getFileUrl}
      />

      <div className="p-7 flex flex-col flex-1">

        <ArticleMeta
          createdAt={article.createdAt}
          readTime={article.readTime}
        />

        <h2
          className="
            font-serif
            text-3xl
            leading-tight
            text-[#051933]
            line-clamp-2
            min-h-[76px]
          "
        >
          {article.title}
        </h2>

        <p className="text-sm text-[#94a3b8] mt-2">
          By {article.author}
        </p>

        <p
          className="
            mt-5
            text-[#64748b]
            leading-7
            text-[15px]
            line-clamp-4
            min-h-[120px]
          "
        >
          {article.excerpt}
        </p>

        <div className="mt-auto">
          <ArticleActions
            pdfUrl={article.pdfUrl}
            variant={variant}
            getFileUrl={getFileUrl}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>

      </div>
    </div>
  );
}
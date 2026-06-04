"use client";

import {
  CalendarDays,
  Clock3,
} from "lucide-react";

type Props = {
  createdAt: string;
  readTime: string;
};

export default function ArticleMeta({
  createdAt,
  readTime,
}: Props) {
  return (
    <div className="flex items-center gap-5 text-[#94a3b8] text-xs mb-5">

      <div className="flex items-center gap-2">
        <CalendarDays className="w-4 h-4" />
        {new Date(createdAt).toLocaleDateString()}
      </div>

      <div className="flex items-center gap-2">
        <Clock3 className="w-4 h-4" />
        {readTime}
      </div>

    </div>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function PlanCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f1ea] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl text-center">
        <XCircle className="w-20 h-20 text-red-500 mx-auto" />

        <h1 className="mt-6 text-4xl font-serif text-[#051933]">
          Payment Cancelled
        </h1>

        <p className="mt-4 text-slate-600">
          No charges were made. You can return anytime and complete your purchase.
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => router.push("/plans")}
            className="flex-1 rounded-2xl bg-[#051933] text-white py-4 font-medium"
          >
            Back to Plans
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex-1 rounded-2xl border border-[#051933] text-[#051933] py-4 font-medium"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
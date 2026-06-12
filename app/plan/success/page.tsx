"use client";

import { Suspense } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
          throw new Error("Missing session id");
        }

        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/plan/verify?session_id=${sessionId}`,
          {
            withCredentials: true,
          }
        );
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Payment verification failed."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f1ea] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#c8a21a] mx-auto" />
          <p className="mt-4 text-[#051933] font-medium">
            Verifying payment...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f1ea] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl text-center">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto" />

          <h1 className="mt-6 text-3xl font-serif text-[#051933]">
            Verification Failed
          </h1>

          <p className="mt-4 text-slate-600">{error}</p>

          <button
            onClick={() => router.push("/plans")}
            className="mt-8 w-full rounded-2xl bg-[#051933] text-white py-4"
          >
            Back to Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1ea] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />

        <h1 className="mt-6 text-4xl font-serif text-[#051933]">
          Payment Successful
        </h1>

        <p className="mt-4 text-slate-600">
          Your Premium Membership has been activated successfully.
        </p>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-8 w-full rounded-2xl bg-[#c8a21a] hover:bg-[#d8b84a] text-[#051933] py-4 font-semibold"
        >
          Go To Dashboard
        </button>
      </div>
    </div>
  );
}

export default function PlanSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
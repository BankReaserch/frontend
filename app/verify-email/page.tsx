"use client";

import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setStatus("error");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/auth/verify-email?token=${token}`
        );

        if (!res.ok) throw new Error();

        setStatus("success");
      } catch {
        setStatus("error");
      }
    };

    verify();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur">
        
        {/* Loading */}
        {status === "loading" && (
          <>
            <div className="w-14 h-14 mx-auto mb-6 border-4 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin" />
            <h2 className="text-white text-xl font-semibold mb-2">
              Verifying your email...
            </h2>
            <p className="text-[#8a9bb0] text-sm">
              Please wait while we confirm your account.
            </p>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30">
              <svg
                className="w-8 h-8 text-[#c9a84c]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-white text-2xl font-serif mb-2">
              Email Verified 🎉
            </h2>

            <p className="text-[#8a9bb0] text-sm mb-6">
              Your account has been successfully verified.
              You can now log in.
            </p>

            <a
              href="/login"
              className="block w-full bg-[#c9a84c] hover:bg-[#d4b567] text-[#0d1b2a] font-semibold py-3 rounded-lg text-sm transition"
            >
              Go to Login
            </a>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-500/10 border border-red-500/30">
              <svg
                className="w-8 h-8 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <h2 className="text-white text-2xl font-serif mb-2">
              Verification Failed
            </h2>

            <p className="text-[#8a9bb0] text-sm mb-6">
              This link is invalid or has expired.
            </p>

            <a
              href="/signup"
              className="block w-full border border-white/10 hover:border-white/20 text-white py-3 rounded-lg text-sm transition"
            >
              Try Again
            </a>
          </>
        )}
      </div>
    </div>
  );
}
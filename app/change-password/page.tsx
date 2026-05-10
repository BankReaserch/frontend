"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Page() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "Password must be at least 8 characters"
      );
      return;
    }

    try {
      setIsLoading(true);

      const userId = sessionStorage.getItem(
        "passwordChangeUserId"
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userId,
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Password change failed"
        );
      }

      sessionStorage.removeItem(
        "passwordChangeUserId"
      );

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] flex flex-col">
      <Navbar />

      <div className="flex flex-1 flex-col lg:flex-row mt-40 mb-16">

        {/* LEFT SECTION */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">

          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(#c9a84c 1px, transparent 1px),
                linear-gradient(90deg, #c9a84c 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-[#c9a84c] opacity-5 blur-[80px]" />

          <div />

          <div className="relative z-10 space-y-8">

            <div>
              <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-medium mb-4">
                Security · Protection · Trust
              </p>

              <h2 className="text-white font-serif text-4xl leading-tight">
                Secure Your <br />

                <span className="text-[#c9a84c]">
                  Account Access
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  value: "256-bit",
                  label: "Encryption",
                },
                {
                  value: "24/7",
                  label: "Monitoring",
                },
                {
                  value: "100%",
                  label: "Protected",
                },
                {
                  value: "Secure",
                  label: "Authentication",
                },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[#c9a84c] text-2xl font-bold">
                    {item.value}
                  </p>

                  <p className="text-[#8a9bb0] text-sm">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="border border-[#c9a84c]/20 rounded-lg p-5 bg-white/[0.02]">
              <p className="text-[#cbd5e1] text-sm leading-relaxed">
                Strong passwords protect your
                account, financial information,
                and sensitive activity from
                unauthorized access.
              </p>
            </div>

          </div>

          <div className="relative z-10">
            <p className="text-[#8a9bb0] text-xs">
              © 2026 Ribis.org. All rights
              reserved.
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16">

          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}
            <div className="flex lg:hidden items-center gap-3 mb-10">
              <div className="w-9 h-9 bg-[#c9a84c] rounded-md flex items-center justify-center">
                <span className="text-[#0d1b2a] font-bold font-serif">
                  ר
                </span>
              </div>

              <span className="text-white text-lg font-semibold">
                Ribis
              </span>
            </div>

            {/* HEADER */}
            <div className="mb-10">
              <p className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-medium mb-2">
                Account Security
              </p>

              <h1 className="text-white text-3xl font-serif leading-snug">
                Change Your Password
              </h1>

              <p className="text-[#8a9bb0] text-sm mt-2 leading-relaxed">
                Update your password to continue
                securely accessing your account.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-5 border border-red-500/20 bg-red-500/10 text-red-300 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* CURRENT PASSWORD */}
              <div>
                <label className="block text-[#8a9bb0] text-xs tracking-widest uppercase mb-2">
                  Current Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showCurrent
                        ? "text"
                        : "password"
                    }
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(
                        e.target.value
                      )
                    }
                    required
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white pr-11 text-sm focus:outline-none focus:border-[#c9a84c]/60"
                    placeholder="••••••••"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrent(
                        !showCurrent
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568]"
                  >
                    {showCurrent
                      ? "🙈"
                      : "👁️"}
                  </button>
                </div>
              </div>

              {/* NEW PASSWORD */}
              <div>
                <label className="block text-[#8a9bb0] text-xs tracking-widest uppercase mb-2">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showNew
                        ? "text"
                        : "password"
                    }
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    required
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white pr-11 text-sm focus:outline-none focus:border-[#c9a84c]/60"
                    placeholder="Minimum 8 characters"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNew(!showNew)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568]"
                  >
                    {showNew
                      ? "🙈"
                      : "👁️"}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-[#8a9bb0] text-xs tracking-widest uppercase mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showConfirm
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    required
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white pr-11 text-sm focus:outline-none focus:border-[#c9a84c]/60"
                    placeholder="Re-enter password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm(
                        !showConfirm
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568]"
                  >
                    {showConfirm
                      ? "🙈"
                      : "👁️"}
                  </button>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#c9a84c] hover:bg-[#d4b567] transition text-[#0d1b2a] font-semibold py-3 rounded-lg"
              >
                {isLoading
                  ? "Updating Password..."
                  : "Change Password"}
              </button>

              <Link
                href="/login"
                className="block text-center text-[#8a9bb0] text-sm hover:text-[#c9a84c] transition"
              >
                Back to Login
              </Link>

            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
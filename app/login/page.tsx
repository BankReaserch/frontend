"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [step, setStep] = useState<"login" | "otp">("login");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const [userId, setUserId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    try {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Authentication failed"
        );
      }

      // ADMIN OTP FIRST
      if (data.requiresOtp) {
        setUserId(data.userId);
        setStep("otp");
        return;
      }

      // THEN PASSWORD CHANGE
      if (data.requirePasswordChange) {
        sessionStorage.setItem("passwordChangeUserId", data.userId);
        router.push("/change-password");
        return;
      }
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userId,
            otp,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "OTP failed");
      }

      // 🔐 force password change
      if (data.requirePasswordChange) {
        sessionStorage.setItem("passwordChangeUserId", data.userId);
        router.push("/change-password");
        return;
      }

      router.push("/admin");

    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#0d1b2a] flex flex-col">
      <Navbar />

      {/* Main content — two-column row */}
      <div className="flex flex-1 flex-col lg:flex-row mt-64 mb-16">

        {/* Left decorative panel */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Glow orb */}
          <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-[#c9a84c] opacity-5 blur-[80px]" />

          {/* Spacer for top */}
          <div />

          {/* Center content */}
          <div className="relative z-10 space-y-8">
            <div>
              <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-medium mb-4">
                Awareness · Information · Application
              </p>
              <h2 className="text-white font-serif text-4xl leading-tight">
                Halachic Integrity <br />
                for <em className="text-[#c9a84c] not-italic">Modern Finance</em>
              </h2>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "3000+", label: "USA Banks" },
                { value: "2000+", label: "People Serviced" },
                { value: "1000+", label: "Hours Researched" },
                { value: "10", label: "Poskim Available" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-[#c9a84c] text-2xl font-bold">{stat.value}</p>
                  <p className="text-[#8a9bb0] text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Hebrew quote */}
            <div className="border border-[#c9a84c]/20 rounded-lg p-5 bg-white/[0.02]">
              <p className="text-[#cbd5e1] text-sm leading-relaxed text-right font-serif" dir="rtl">
                "ומי האיש החפץ חיים ולקום בתחיית המתים ישאל פי חכם בעשותו הלואה כזו וימלט נפשו הרע."
              </p>
              <p className="text-[#c9a84c] text-xs mt-3 text-right">— יערות דבש, חלק ב דרוש ה</p>
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-[#8a9bb0] text-xs">© 2025 Ribis.org. All rights reserved.</p>
          </div>
        </div>

        {/* Right — Login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-3 mb-10">
              <div className="w-9 h-9 bg-[#c9a84c] rounded-md flex items-center justify-center">
                <span className="text-[#0d1b2a] font-bold font-serif">ר</span>
              </div>
              <span className="text-white text-lg font-semibold">Ribis</span>
            </div>

            {/* Header */}
            <div className="mb-10">
              <p className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-medium mb-2">
                Welcome Back
              </p>
              <h1 className="text-white text-3xl font-serif leading-snug">
                Sign in to your account
              </h1>
              <p className="text-[#8a9bb0] text-sm mt-2">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-[#c9a84c] hover:underline transition">
                  Create one
                </Link>
              </p>
            </div>
            {step === "login" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-[#8a9bb0] text-xs tracking-widest uppercase mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#4a5568] text-sm focus:outline-none focus:border-[#c9a84c]/60 focus:bg-white/[0.06] transition-all duration-200"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[#8a9bb0] text-xs tracking-widest uppercase">
                      Password
                    </label>
                    {/* <Link
                      href="/forgot-password"
                      className="text-[#c9a84c] text-xs hover:underline"
                    >
                      Forgot password?
                    </Link> */}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#4a5568] text-sm focus:outline-none focus:border-[#c9a84c]/60 focus:bg-white/[0.06] transition-all duration-200 pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568] hover:text-[#8a9bb0] transition"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 accent-[#c9a84c] rounded border-white/20 bg-white/5"
                  />
                  <label htmlFor="remember" className="text-[#8a9bb0] text-sm cursor-pointer">
                    Keep me signed in
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#c9a84c] hover:bg-[#d4b567] text-[#0d1b2a] font-semibold py-3 rounded-lg text-sm tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-2">
                  <div className="flex-1 h-px bg-white/[0.08]" />
                  <span className="text-[#4a5568] text-xs">or continue with</span>
                  <div className="flex-1 h-px bg-white/[0.08]" />
                </div>

                {/* Google SSO */}
                <button
                  type="button"
                  className="w-full bg-transparent border border-white/10 hover:border-white/20 text-white py-3 rounded-lg text-sm flex items-center justify-center gap-3 transition-all duration-200 hover:bg-white/[0.03]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>
              </form>
            )}
            {step === "otp" && (
              <form onSubmit={handleOtpSubmit} className="space-y-5">
                <div className="text-center">
                  <h2 className="text-white text-xl font-semibold">
                    Verify OTP
                  </h2>
                  <p className="text-[#8a9bb0] text-sm mt-1">
                    Enter the code sent to your email
                  </p>
                </div>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  required
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white text-center tracking-widest text-lg focus:outline-none focus:border-[#c9a84c]/60"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#c9a84c] text-[#0d1b2a] py-3 rounded-lg font-semibold"
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep("login")}
                  className="w-full text-sm text-[#8a9bb0] hover:text-white"
                >
                  Back to login
                </button>
              </form>
            )}
            {error && (
              <p className="text-red-400 text-sm mb-3">
                {error}
              </p>
            )}
          </div>
        </div>

      </div>{/* end main content row */}

      <Footer />
    </div>
  );
}
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
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [step, setStep] = useState<
    "login" |
    "otp" |
    "forgot-email" |
    "forgot-otp" |
    "reset-password"
  >("login");

  const [userId, setUserId] = useState("");

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (isLoading) return;

  //   try {
  //     setIsLoading(true);

  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}api/auth/login`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //         body: JSON.stringify({
  //           email: email.trim().toLowerCase(),
  //           password,
  //         }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(
  //         data.message || "Authentication failed"
  //       );
  //     }

  //     // ADMIN OTP FIRST
  //     if (data.requiresOtp) {
  //       setUserId(data.userId);
  //       setStep("otp");
  //       return;
  //     }

  //     // THEN PASSWORD CHANGE
  //     if (data.requirePasswordChange) {
  //       sessionStorage.setItem("passwordChangeUserId", data.userId);
  //       router.push("/change-password");
  //       return;
  //     }
  //     router.push("/dashboard");
  //   } catch (error: any) {
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
 
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

    // Password change flow
    if (data.requirePasswordChange) {
      sessionStorage.setItem(
        "passwordChangeUserId",
        data.userId
      );

      router.push("/change-password");
      return;
    }

    // Redirect based on role
    if (data.user?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }

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
  const handleForgotPassword =
  async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const res =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/auth/forgot-password`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email:
                forgotEmail,
            }),
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.message
        );
      }

      setStep(
        "forgot-otp"
      );

    } catch (error: any) {

      setError(
        error.message
      );

    }
  };
  const handleVerifyResetOtp =
  async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const res =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/auth/verify-reset-otp`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email:
                forgotEmail,
              otp:
                forgotOtp,
            }),
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.message
        );
      }

      setResetToken(
        data.token
      );

      setStep(
        "reset-password"
      );

    } catch (error: any) {

      setError(
        error.message
      );

    }
  };
  const handleResetPassword =
  async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const res =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/auth/reset-password`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              token:
                resetToken,
              password:
                newPassword,
            }),
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.message
        );
      }

      alert(
        "Password updated successfully"
      );

      setStep(
        "login"
      );

    } catch (error: any) {

      setError(
        error.message
      );

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
                    <button
                      type="button"
                      onClick={() =>
                        setStep("forgot-email")
                      }
                      className="text-[#c9a84c] text-xs hover:underline"
                    >
                      Forgot password?
                    </button>
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
              </form>
            )}
            {step === "forgot-email" && (
              <form
                onSubmit={handleForgotPassword}
                className="space-y-5"
              >
                <div className="text-center">
                  <h2 className="text-white text-xl font-semibold">
                    Forgot Password
                  </h2>

                  <p className="text-[#8a9bb0] text-sm mt-1">
                    Enter your email to receive OTP
                  </p>
                </div>

                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) =>
                    setForgotEmail(
                      e.target.value
                    )
                  }
                  placeholder="Email"
                  required
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white"
                />

                <button
                  type="submit"
                  className="w-full bg-[#c9a84c] text-[#0d1b2a] py-3 rounded-lg font-semibold"
                >
                  Send OTP
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setStep("login")
                  }
                  className="w-full text-sm text-[#8a9bb0]"
                >
                  Back
                </button>
              </form>
            )}
            {step === "forgot-otp" && (
              <form
                onSubmit={handleVerifyResetOtp}
                className="space-y-5"
              >
                <div className="text-center">
                  <h2 className="text-white text-xl font-semibold">
                    Verify OTP
                  </h2>
                </div>

                <input
                  value={forgotOtp}
                  onChange={(e) =>
                    setForgotOtp(
                      e.target.value
                    )
                  }
                  placeholder="6-digit OTP"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white text-center"
                />

                <button
                  type="submit"
                  className="w-full bg-[#c9a84c] text-[#0d1b2a] py-3 rounded-lg font-semibold"
                >
                  Verify OTP
                </button>
              </form>
            )}
            {step === "reset-password" && (
              <form
                onSubmit={handleResetPassword}
                className="space-y-5"
              >
                <div className="text-center">
                  <h2 className="text-white text-xl font-semibold">
                    Set New Password
                  </h2>
                </div>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  placeholder="New Password"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white"
                />

                <button
                  type="submit"
                  className="w-full bg-[#c9a84c] text-[#0d1b2a] py-3 rounded-lg font-semibold"
                >
                  Reset Password
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
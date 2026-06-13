"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const steps = ["Account", "Done"];

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // success → show step 2
      setStep(1);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const getPasswordStrength = (password: string) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const passwordStrength = getPasswordStrength(form.password);
  return (
    <div className="min-h-screen bg-[#0d1b2a] flex">
      <Navbar /> <Navbar /> <Navbar /> <Navbar />

      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#c9a84c] opacity-5 blur-[80px]" />

        <div></div>

        <div className="relative z-10 space-y-8">
          <div>
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-medium mb-4">
              Join the Community
            </p>

            <h2 className="text-white font-serif text-4xl leading-tight">
              Your Gateway to <br />
              <em className="text-[#c9a84c] not-italic">
                Halachic Finance
              </em>
            </h2>

            <p className="text-[#8a9bb0] text-sm mt-4 leading-relaxed max-w-sm">
              Get access to our full bank directory, ask a sha&apos;alah,
              and stay informed with the latest rulings from leading
              poskim.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            {[
              { icon: "🏦", label: "Full access to 3,000+ bank ratings" },
              {
                icon: "✉️",
                label: "Ask a sha'alah directly from your dashboard",
              },
              {
                icon: "📚",
                label: "Audio shiurim and educational bulletins",
              },
              {
                icon: "🔔",
                label: "Kashrus status change alerts",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-md bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center text-sm">
                  {item.icon}
                </div>

                <span className="text-[#cbd5e1] text-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-[#8a9bb0] text-xs">
            © 2025 Ribis.org. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right — Form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div></div>

          {/* Step indicator */}
          {step < 1 && (
            <div className="flex items-center gap-2 mb-8">
              {steps.slice(0, 1).map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${i <= step
                        ? "bg-[#c9a84c] text-[#0d1b2a]"
                        : "bg-white/10 text-[#4a5568]"
                        }`}
                    >
                      {i + 1}
                    </div>

                    <span
                      className={`text-xs tracking-wide ${i <= step
                        ? "text-[#c9a84c]"
                        : "text-[#4a5568]"
                        }`}
                    >
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 0: Account */}
          {step === 0 && (
            <>
              <div className="mb-8">
                <p className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-medium mb-2">
                  Get Started
                </p>

                <h1 className="text-white text-3xl font-serif">
                  Create your account
                </h1>

                <p className="text-[#8a9bb0] text-sm mt-2">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[#c9a84c] hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <form onSubmit={handleNext} className="space-y-5">
                <div>
                  <label className="block text-[#8a9bb0] text-xs tracking-widest uppercase mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      update("email", e.target.value)
                    }
                    placeholder="you@example.com"
                    required
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#4a5568] text-sm focus:outline-none focus:border-[#c9a84c]/60 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[#8a9bb0] text-xs tracking-widest uppercase mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) =>
                        update("password", e.target.value)
                      }
                      placeholder="Min. 8 characters"
                      required
                      minLength={8}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#4a5568] text-sm focus:outline-none focus:border-[#c9a84c]/60 focus:bg-white/[0.06] transition-all pr-11"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568] hover:text-[#8a9bb0]"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  {form.password && (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`flex-1 h-1 rounded-full transition-all ${passwordStrength >= i
                                ? passwordStrength <= 2
                                  ? "bg-red-500"
                                  : passwordStrength <= 4
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                : "bg-white/10"
                              }`}
                          />
                        ))}
                      </div>

                      <p className="mt-1 text-xs">
                        {passwordStrength <= 2 && (
                          <span className="text-red-400">Weak password</span>
                        )}

                        {passwordStrength > 2 && passwordStrength <= 4 && (
                          <span className="text-yellow-400">Medium password</span>
                        )}

                        {passwordStrength > 4 && (
                          <span className="text-green-400">Strong password</span>
                        )}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[#8a9bb0] text-xs tracking-widest uppercase mb-2">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      update(
                        "confirmPassword",
                        e.target.value
                      )
                    }
                    placeholder="••••••••"
                    required
                    className={`w-full bg-white/[0.04] border rounded-lg px-4 py-3 text-white placeholder-[#4a5568] text-sm focus:outline-none transition-all ${form.confirmPassword &&
                      form.confirmPassword !== form.password
                      ? "border-red-500/60"
                      : "border-white/10 focus:border-[#c9a84c]/60 focus:bg-white/[0.06]"
                      }`}
                  />

                  {form.confirmPassword &&
                    form.confirmPassword !== form.password && (
                      <p className="text-red-400 text-xs mt-1">
                        Passwords do not match
                      </p>
                    )}
                </div>

                <button
                  type="submit"
                  disabled={
                    !form.email ||
                    !form.password ||
                    form.password !== form.confirmPassword ||
                    isLoading
                  }
                  className="w-full bg-[#c9a84c] hover:bg-[#d4b567] text-[#0d1b2a] font-semibold py-3 rounded-lg text-sm tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-1 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />

                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>

                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="text-[#4a5568] text-xs">
                    or
                  </span>
                  <div className="flex-1 h-px bg-white/8" />
                </div>

                <button
                  type="button"
                  className="w-full bg-transparent border border-white/10 hover:border-white/20 text-white py-3 rounded-lg text-sm flex items-center justify-center gap-3 transition-all hover:bg-white/[0.03]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>

                  Sign up with Google
                </button>
              </form>
            </>
          )}
          {step === 1 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-7 h-7 text-[#c9a84c]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <p className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-medium mb-3">
                Welcome to Ribis
              </p>

              <h1 className="text-white text-3xl font-serif mb-3">
                Account Created!
              </h1>

              <p className="text-[#8a9bb0] text-sm leading-relaxed mb-8 max-w-xs mx-auto">
                We&apos;ve sent a confirmation email to{" "}
                <span className="text-white">
                  {form.email}
                </span>
                . Please verify your address to activate your
                account.
              </p>

              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  className="block w-full bg-[#c9a84c] hover:bg-[#d4b567] text-[#0d1b2a] font-semibold py-3 rounded-lg text-sm tracking-wide transition-all text-center"
                >
                  Go to Dashboard
                </Link>

                <Link
                  href="/bank-directory"
                  className="block w-full border border-white/10 hover:border-white/20 text-[#8a9bb0] hover:text-white py-3 rounded-lg text-sm transition-all text-center"
                >
                  Explore Bank Directory
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
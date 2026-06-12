"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Infinity,
  RefreshCw,
  AlertCircle
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type BillingType = "one-time" | "subscription";

// ─── Component ────────────────────────────────────────────────────────────────

export default function Plan() {
  const router = useRouter();

  const [billingType, setBillingType] =
    useState<BillingType>("subscription");
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/plan/status`,
          { withCredentials: true }
        );
        setIsLoggedIn(true);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          // Preserve the intended destination so the login page can redirect back
          router.replace(
            `/login?redirect=${encodeURIComponent("/plan")}`
          );
          return;
        }
        // Any other error (network etc.) — still let the page render;
        // the server will reject the checkout attempt if truly unauthed.
        setIsLoggedIn(true);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [router]);

  // ── Checkout ────────────────────────────────────────────────────────────────

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent("/plan")}`);
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/plan/checkout`,
        { billingType },
        { withCredentials: true }
      );

      const { success, url } = response.data;

      if (!success || !url) {
        throw new Error("Invalid checkout response.");
      }

      setMessage({
        type: "success",
        text: "Redirecting to secure Stripe checkout...",
      });

      window.location.assign(url);
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 401) {
        router.push(`/login?redirect=${encodeURIComponent("/plan")}`);
        return;
      }

      setMessage({
        type: "error",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Unable to start checkout. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  // ── Loading / auth gate ─────────────────────────────────────────────────────

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#f5f1ea] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#c8a21a] border-t-transparent animate-spin" />
      </div>
    );
  }

  // ─── Render ──────────────────────────────────────────────────────────────────

  const isSubscription = billingType === "subscription";

  return (
    <>
      <div className="bg-[#0B1C2C] text-white pt-20 pb-10">
        <Navbar />
      </div>

      {/* MAIN */}
      <section className="relative overflow-hidden bg-[#f5f1ea] min-h-screen flex items-center py-10">

        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(135deg,#0B1C2C_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c8a21a]/10 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-[1fr_520px] gap-16 items-center">

            {/* LEFT CONTENT */}
            <div>

              {/* LABEL */}
              <p className="text-[#c8a21a] uppercase tracking-[0.35em] text-xs font-semibold mb-6">
                PREMIUM ACCESS
              </p>

              {/* TITLE */}
              <h1 className="font-serif text-5xl xl:text-6xl leading-[1.05] text-[#051933]">
                Unlimited{" "}
                <span className="italic text-[#c8a21a]">Research Reports</span>
              </h1>

              {/* DESCRIPTION */}
              <p className="text-[#64748b] leading-8 mt-8 text-[15px] max-w-xl">
                Gain unlimited access to all premium banking research reports,
                rabbinical guidance, institutional analysis, and future premium
                content.
              </p>

              {/* FEATURES */}
              <div className="mt-10 grid gap-5 max-w-lg">
                {[
                  "Unlimited bank research reports",
                  "Institutional financial analysis",
                  "Rabbinical research guidance",
                  "Future premium reports included",
                  isSubscription
                    ? "Auto-renews monthly — cancel any time"
                    : "30-day access per payment",
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#c8a21a]/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#c8a21a]" />
                    </div>
                    <p className="text-[#334155] text-[15px] leading-7">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            {/* PLAN CARD */}
            <div className="relative">

              {/* SHADOW */}
              <div className="absolute inset-0 bg-[#051933] blur-3xl opacity-20 rounded-[40px]" />

              <div className="relative rounded-[36px] overflow-hidden border border-[#c8a21a]/30 bg-[#051933] shadow-[0_30px_80px_rgba(5,25,51,0.20)]">

                {/* TOP GOLD BAR */}
                <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#c8a21a]" />

                {/* BADGE */}
                <div className="absolute top-6 right-6 bg-[#c8a21a] text-[#051933] text-[10px] uppercase tracking-[0.22em] font-bold px-4 py-2 rounded-full flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Best Value
                </div>

                <div className="p-10">

                  {/* ICON */}
                  <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/10 flex items-center justify-center">
                    {isSubscription ? (
                      <RefreshCw className="w-10 h-10 text-[#c8a21a]" />
                    ) : (
                      <Infinity className="w-10 h-10 text-[#c8a21a]" />
                    )}
                  </div>

                  {/* BILLING TOGGLE */}
                  <div className="mt-8 flex items-center bg-white/5 border border-white/10 rounded-2xl p-1 gap-1">
                    <button
                      onClick={() => setBillingType("subscription")}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${isSubscription
                          ? "bg-[#c8a21a] text-[#051933]"
                          : "text-[#94a3b8] hover:text-white"
                        }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingType("one-time")}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${!isSubscription
                          ? "bg-[#c8a21a] text-[#051933]"
                          : "text-[#94a3b8] hover:text-white"
                        }`}
                    >
                      One-time
                    </button>
                  </div>

                  {/* TITLE + DESCRIPTION */}
                  <div className="mt-6">
                    <h2 className="font-serif text-4xl text-white">
                      {isSubscription ? "Monthly Plan" : "Lifetime Access"}
                    </h2>
                    <p className="text-[#94a3b8] mt-3 text-[15px] leading-7">
                      {isSubscription
                        ? "Auto-renews each month. Cancel at any time from your account."
                        : "One-time payment for 30 days of full premium access."}
                    </p>
                  </div>

                  {/* PRICE */}
                  <div className="mt-8 flex items-end gap-3">
                    <span className="font-serif text-8xl text-white leading-none">
                      $50
                    </span>
                    <span className="text-[#94a3b8] mb-3 text-lg">
                      {isSubscription ? "/ month" : "one-time"}
                    </span>
                  </div>

                  {/* ACCESS BADGE */}
                  <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/10 border border-white/10 px-5 py-3">
                    <ShieldCheck className="w-5 h-5 text-[#c8a21a]" />
                    <span className="text-[#f8fafc] font-semibold text-sm">
                      {isSubscription
                        ? "Auto-renews · Cancel anytime"
                        : "30 days full access"}
                    </span>
                  </div>
                  {message && (
                    <div
                      className={`mb-6 rounded-2xl border px-5 py-4 flex items-start gap-3 ${message.type === "success"
                          ? "bg-green-500/10 border-green-500/20"
                          : "bg-red-500/10 border-red-500/20"
                        }`}
                    >
                      {message.type === "success" ? (
                        <Check className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                      )}

                      <div>
                        <p
                          className={`font-medium ${message.type === "success"
                              ? "text-green-300"
                              : "text-red-300"
                            }`}
                        >
                          {message.type === "success"
                            ? "Success"
                            : "Payment Error"}
                        </p>

                        <p className="text-sm text-[#cbd5e1] mt-1">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="group mt-10 w-full rounded-2xl bg-[#c8a21a] hover:bg-[#d8b84a] transition-all duration-300 py-5 px-6 flex items-center justify-center gap-3 text-[#051933] font-semibold text-[15px] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-[#051933] border-t-transparent animate-spin" />
                        Redirecting to Stripe…
                      </>
                    ) : (
                      <>
                        {isSubscription
                          ? "Start Monthly Plan"
                          : "Unlock 30-Day Access"}
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  {/* NOTE */}
                  <p className="text-center text-[#64748b] text-sm mt-5">
                    Secure payment via Stripe · Instant activation
                  </p>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
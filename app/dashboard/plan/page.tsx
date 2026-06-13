"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardHeader from "../components/DashboardHeader";

import {
  Crown,
  BadgeCheck,
  Calendar,
  CreditCard,
  Receipt,
  CheckCircle,
  XCircle,
  Loader2,
  AlertTriangle,
  RotateCcw,
  Clock,
  ShieldCheck,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Plan = {
  active: boolean;
  billingType: "subscription" | "one-time";
  amount: number;
  status: string;
  createdAt: string;
  expiresAt?: string;
  cancelAtPeriodEnd?: boolean;
  currentPeriodEnd?: string;
};

type Invoice = {
  _id: string;
  amount: number;
  createdAt: string;
  status: string;
  billingType: string;
};

// ─── Confirmation Modal ───────────────────────────────────────────────────────

function ConfirmModal({
  open,
  onConfirm,
  onCancel,
  loading,
  periodEnd,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
  periodEnd?: string;
}) {
  if (!open) return null;

  const formattedDate = periodEnd
    ? new Date(periodEnd).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "the end of your billing period";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
            <AlertTriangle size={30} className="text-amber-500" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#0d1b2a]">
              Cancel your subscription?
            </h3>
            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
              Your membership stays fully active until{" "}
              <span className="font-medium text-[#0d1b2a]">{formattedDate}</span>.
              After that, you'll lose access to all premium features.
            </p>
          </div>

          <ul className="w-full bg-gray-50 rounded-xl p-4 space-y-2 text-sm text-left text-gray-600">
            <li className="flex items-center gap-2">
              <XCircle size={14} className="text-red-400 shrink-0" />
              Bank Directory access will be revoked
            </li>
            <li className="flex items-center gap-2">
              <XCircle size={14} className="text-red-400 shrink-0" />
              Premium downloads will be disabled
            </li>
            <li className="flex items-center gap-2">
              <XCircle size={14} className="text-red-400 shrink-0" />
              Priority alerts will stop
            </li>
          </ul>

          <p className="text-xs text-gray-400">
            You can re-activate anytime before {formattedDate} and nothing changes.
          </p>

          <div className="flex gap-3 w-full mt-1">
            <button
              onClick={onCancel}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
            >
              Keep Membership
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Cancelling…
                </>
              ) : (
                "Yes, Cancel"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Cancellation Notice Banner ───────────────────────────────────────────────

function CancellationBanner({
  currentPeriodEnd,
}: {
  currentPeriodEnd?: string;
}) {
  const formattedDate = currentPeriodEnd
    ? new Date(currentPeriodEnd).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "the end of your billing period";

  return (
    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 mt-4">
      <Clock size={18} className="text-amber-500 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-amber-800">
          Cancellation scheduled
        </p>
        <p className="text-sm text-amber-700 mt-0.5">
          Your membership remains active until{" "}
          <span className="font-semibold">{formattedDate}</span>. You can
          resume anytime before then and nothing will change.
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PlanPage() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [history, setHistory] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    fetchPlanData();
  }, []);

  const fetchPlanData = async () => {
    try {
      const [planRes, historyRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/plan/current`, {
          withCredentials: true,
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/plan/history`, {
          withCredentials: true,
        }),
      ]);

      setPlan(planRes.data.data);
      setHistory(historyRes.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load membership data.");
    } finally {
      setLoading(false);
    }
  };

  const confirmCancel = async () => {
    try {
      setActionLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/plan/cancel`,
        {},
        { withCredentials: true }
      );
      toast.success(
        response.data?.message ||
          "Cancellation scheduled. You retain full access until period end."
      );
      setShowCancelModal(false);
      await fetchPlanData();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to cancel subscription."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const resumePlan = async () => {
    try {
      setActionLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/plan/resume`,
        {},
        { withCredentials: true }
      );
      toast.success(
        response.data?.message || "Your subscription has been resumed."
      );
      await fetchPlanData();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to resume subscription."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ─── Loading State ──────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-500 p-8">
        <Loader2 className="animate-spin" size={18} />
        <span>Loading membership…</span>
      </div>
    );
  }

  const isPendingCancel =
    plan?.billingType === "subscription" && plan?.cancelAtPeriodEnd === true;

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <ConfirmModal
        open={showCancelModal}
        onConfirm={confirmCancel}
        onCancel={() => setShowCancelModal(false)}
        loading={actionLoading}
        periodEnd={plan?.currentPeriodEnd}
      />

      <div>
        <DashboardHeader
          title="Membership"
          subtitle="Manage your membership and billing."
        />

        {/* ── MEMBERSHIP CARD ───────────────────────────────────────────────── */}
        <div className="bg-white rounded-3xl border p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

            {/* Left: plan info */}
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
                  <Crown size={28} className="text-[#c9a84c]" />
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-[#0d1b2a]">
                    Premium Membership
                  </h2>

                  <div className="flex items-center gap-2 mt-1">
                    {plan?.active ? (
                      <>
                        <BadgeCheck size={16} className="text-green-600" />
                        <span className="text-green-600 text-sm font-medium">
                          {isPendingCancel ? "Active — cancels at period end" : "Active"}
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle size={16} className="text-red-500" />
                        <span className="text-red-500 text-sm font-medium">
                          Inactive
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <CreditCard size={15} />
                  <span>
                    {plan?.billingType === "subscription"
                      ? "Monthly Subscription"
                      : "One-Time Membership"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar size={15} />
                  <span>
                    Member since{" "}
                    {plan?.createdAt
                      ? new Date(plan.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "—"}
                  </span>
                </div>

                {plan?.billingType === "subscription" && plan?.currentPeriodEnd && (
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar size={15} />
                    <span>
                      {isPendingCancel ? "Expires on " : "Renews on "}
                      {new Date(plan.currentPeriodEnd).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                )}

                {plan?.billingType === "one-time" && plan?.expiresAt && (
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar size={15} />
                    <span>
                      Expires on{" "}
                      {new Date(plan.expiresAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Cancellation banner — shown below details */}
              {isPendingCancel && (
                <CancellationBanner currentPeriodEnd={plan?.currentPeriodEnd} />
              )}
            </div>

            {/* Right: price + action */}
            <div className="flex flex-col items-start lg:items-end gap-4">
              <div className="lg:text-right">
                <p className="text-sm text-gray-500">Current Price</p>
                <h3 className="text-4xl font-bold text-[#0d1b2a]">
                  ${plan?.amount ?? 50}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {plan?.billingType === "subscription" ? "/ month" : "one-time"}
                </p>
              </div>

              {/* Action buttons — subscriptions only */}
              {plan?.billingType === "subscription" && plan?.active && (
                <div className="flex flex-col gap-2 w-full lg:items-end">
                  {isPendingCancel ? (
                    <button
                      onClick={resumePlan}
                      disabled={actionLoading}
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#c9a84c] text-white font-medium hover:bg-[#b8952e] transition disabled:opacity-50 w-full lg:w-auto"
                    >
                      {actionLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <RotateCcw size={16} />
                      )}
                      Resume Subscription
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowCancelModal(true)}
                      disabled={actionLoading}
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50 transition disabled:opacity-50 w-full lg:w-auto"
                    >
                      Cancel Subscription
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── BENEFITS + BILLING ────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          {/* Benefits */}
          <div className="bg-white rounded-3xl border p-6">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck size={18} className="text-[#c9a84c]" />
              <h2 className="font-semibold text-lg">Membership Benefits</h2>
            </div>

            <div className="space-y-3">
              {[
                "Unlimited Bank Directory Access",
                "Ask a Sha'alah",
                "Premium Downloads",
                "Priority Alerts",
                "Member Resources",
                "Future Premium Features",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-green-600 shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Billing info */}
          <div className="bg-white rounded-3xl border p-6">
            <div className="flex items-center gap-2 mb-5">
              <CreditCard size={18} className="text-[#c9a84c]" />
              <h2 className="font-semibold text-lg">Billing Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">
                  Status
                </p>
                <p className="font-medium text-sm capitalize">
                  {isPendingCancel
                    ? "Cancels at period end"
                    : plan?.status || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">
                  Membership Type
                </p>
                <p className="font-medium text-sm capitalize">
                  {plan?.billingType === "subscription"
                    ? "Monthly Subscription"
                    : "One-Time"}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">
                  Membership Price
                </p>
                <p className="font-medium text-sm">${plan?.amount}</p>
              </div>

              {isPendingCancel && plan?.currentPeriodEnd && (
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">
                    Access Until
                  </p>
                  <p className="font-medium text-sm text-amber-600">
                    {new Date(plan.currentPeriodEnd).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── BILLING HISTORY ───────────────────────────────────────────────── */}
        <div className="mt-8 bg-white rounded-3xl border overflow-hidden">
          <div className="p-6 border-b flex items-center gap-3">
            <Receipt size={18} className="text-[#c9a84c]" />
            <h2 className="font-semibold text-lg">Billing History</h2>
          </div>

          {!history.length ? (
            <div className="p-12 text-center text-gray-400 text-sm">
              No billing history yet.
            </div>
          ) : (
            <div className="divide-y">
              {history.map((invoice) => (
                <div
                  key={invoice._id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div>
                    <p className="font-medium text-sm text-[#0d1b2a]">
                      {new Date(invoice.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 capitalize">
                      {invoice.billingType === "subscription"
                        ? "Monthly Subscription"
                        : "One-Time Payment"}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="font-semibold text-[#0d1b2a]">
                      ${invoice.amount}
                    </span>
                    <div className="flex items-center gap-1.5 text-green-600">
                      <CheckCircle size={14} />
                      <span className="text-xs font-medium">Paid</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
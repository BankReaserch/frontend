"use client";

import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const RequestModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [form, setForm] = useState({
    name: "",
    location: "",
    email: "",
    notes: "",
  });

  const [errors, setErrors] = useState<
    Record<string, boolean>
  >({});

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const errs: Record<string, boolean> = {};

    if (!form.name.trim()) errs.name = true;
    if (!form.location.trim()) errs.location = true;
    if (!form.email.trim()) errs.email = true;

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/bank-request`,
        {
          bankName: form.name,
          location: form.location,
          email: form.email,
          additionalContext: form.notes,
        }
      );

      if (response.data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(
          response.data.message ||
            "Unable to submit your request."
        );
      }
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message ||
          "Unable to submit your request. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        {submitted ? (
          <div className="flex flex-col items-center justify-center px-8 py-14 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#c8a21a]/15">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c8a21a"
                strokeWidth="2.5"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>

            <h3 className="mb-2 font-serif text-2xl text-[#051933]">
              Request Submitted
            </h3>

            <p className="mb-6 max-w-xs text-[13px] leading-7 text-[#64748b]">
              Thank you! Our research team will review{" "}
              <strong>{form.name}</strong> and update
              the directory.
            </p>

            <button
              onClick={onClose}
              className="rounded-xl bg-[#051933] px-8 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#0d2a4e]"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between bg-[#051933] px-6 py-5">
              <div>
                <h3 className="font-serif text-xl text-white">
                  Request a Bank
                </h3>

                <p className="mt-0.5 text-[12px] text-[#7a93ae]">
                  We'll research and add it to the
                  directory
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 px-6 py-6"
            >
              {[
                {
                  id: "name",
                  label: "Bank Name",
                  type: "text",
                  placeholder:
                    "e.g. First National Bank",
                },
                {
                  id: "location",
                  label:
                    "Location / Headquarters",
                  type: "text",
                  placeholder: "e.g. Chicago, IL",
                },
                {
                  id: "email",
                  label: "Your Email",
                  type: "email",
                  placeholder: "your@email.com",
                },
              ].map((field) => (
                <div key={field.id}>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                    {field.label}
                  </label>

                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={
                      form[
                        field.id as keyof typeof form
                      ]
                    }
                    onChange={(e) => {
                      setForm({
                        ...form,
                        [field.id]:
                          e.target.value,
                      });

                      setErrors({
                        ...errors,
                        [field.id]: false,
                      });
                    }}
                    className={`h-11 w-full rounded-xl border bg-[#f8f5ef] px-4 text-[14px] outline-none transition-all ${
                      errors[field.id]
                        ? "border-red-500"
                        : "border-[#e7e1d6]"
                    }`}
                  />

                  {errors[field.id] && (
                    <p className="mt-1 text-[11px] text-red-500">
                      This field is required.
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                  Additional Context
                  (optional)
                </label>

                <textarea
                  rows={3}
                  placeholder="Ownership details, account types, or any context that may help our research..."
                  value={form.notes}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      notes: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-xl border border-[#e7e1d6] bg-[#f8f5ef] px-4 py-3 text-[14px]"
                />
              </div>

              {errorMessage && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {errorMessage}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 rounded-xl border border-[#e7e1d6] py-3 text-[13px] font-semibold text-[#64748b]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] rounded-xl bg-[#c8a21a] py-3 text-[13px] font-semibold text-[#051933] hover:bg-[#d7b52f] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading
                    ? "Submitting..."
                    : "Submit Request →"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestModal;
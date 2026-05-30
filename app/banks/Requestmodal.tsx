'use client'

import { useState } from "react";
import { X } from "lucide-react";

const RequestModal=({ onClose }: { onClose: () => void }) =>{
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", location: "", email: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.email.trim()) errs.email = true;
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">
        {submitted ? (
          <div className="flex flex-col items-center justify-center px-8 py-14 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#c8a21a]/15">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8a21a" strokeWidth="2.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-[#051933] mb-2">Request Submitted</h3>
            <p className="text-[13px] text-[#64748b] leading-7 max-w-xs mb-6">
              Thank you! Our research team will review <strong>{form.name}</strong> and update the directory.
            </p>
            <button onClick={onClose}
              className="rounded-xl bg-[#051933] px-8 py-3 text-[13px] font-semibold text-white hover:bg-[#0d2a4e] transition-colors">
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between bg-[#051933] px-6 py-5">
              <div>
                <h3 className="font-serif text-xl text-white">Request a Bank</h3>
                <p className="text-[12px] text-[#7a93ae] mt-0.5">We'll research and add it to the directory</p>
              </div>
              <button onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 hover:bg-white/20 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
              {[
                { id: "name", label: "Bank Name", type: "text", placeholder: "e.g. First National Bank" },
                { id: "location", label: "Location / Headquarters", type: "text", placeholder: "e.g. Chicago, IL" },
                { id: "email", label: "Your Email", type: "email", placeholder: "your@email.com" },
              ].map((f) => (
                <div key={f.id}>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.id as keyof typeof form]}
                    onChange={(e) => { setForm({ ...form, [f.id]: e.target.value }); setErrors({ ...errors, [f.id]: false }); }}
                    className={`h-11 w-full rounded-xl border bg-[#f8f5ef] px-4 text-[14px] text-[#0f172a] outline-none transition-all placeholder:text-[#94a3b8] focus:bg-white focus:ring-4 focus:ring-[#d0ab24]/10 ${errors[f.id] ? "border-red-400 focus:border-red-400" : "border-[#e7e1d6] focus:border-[#d0ab24]"}`}
                  />
                  {errors[f.id] && <p className="mt-1 text-[11px] text-red-500">This field is required</p>}
                </div>
              ))}
              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                  Additional Context (optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ownership details, account types, or any context that may help our research..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full rounded-xl border border-[#e7e1d6] bg-[#f8f5ef] px-4 py-3 text-[14px] text-[#0f172a] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#d0ab24] focus:bg-white focus:ring-4 focus:ring-[#d0ab24]/10 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={onClose}
                  className="flex-1 rounded-xl border border-[#e7e1d6] py-3 text-[13px] font-semibold text-[#64748b] hover:bg-[#f8f5ef] transition-colors">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-[2] rounded-xl bg-[#c8a21a] py-3 text-[13px] font-semibold text-[#051933] hover:bg-[#d7b52f] transition-colors">
                  Submit Request →
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
export default RequestModal
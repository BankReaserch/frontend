"use client";

import {
  AlertTriangle,
  Loader2,
} from "lucide-react";

type ConfirmModalProps = {
  open: boolean;

  title?: string;

  description?: string;

  confirmText?: string;

  cancelText?: string;

  loading?: boolean;

  onConfirm: () => void;

  onClose: () => void;

  danger?: boolean;
};

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onClose,
  danger = true,
}: ConfirmModalProps) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* HEADER */}
        <div className="p-6">

          <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mb-5">

            <AlertTriangle
              className="text-red-600"
              size={28}
            />

          </div>

          <h2 className="text-2xl font-semibold text-[#0f172a]">

            {title}

          </h2>

          <p className="text-gray-500 mt-2 leading-relaxed">

            {description}

          </p>

        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4 bg-gray-50">

          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
          >

            {cancelText}

          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-5 py-2.5 rounded-xl text-white transition flex items-center gap-2 ${
              danger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#0f172a] hover:bg-[#1e293b]"
            }`}
          >

            {loading && (
              <Loader2
                size={16}
                className="animate-spin"
              />
            )}

            {confirmText}

          </button>

        </div>

      </div>

    </div>
  );
}
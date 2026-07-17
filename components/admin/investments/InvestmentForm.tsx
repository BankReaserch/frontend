"use client";

import {
  Save,
  Upload,
  Loader2,
  Plus,
  FileText,
} from "lucide-react";

import { Investment } from "./investment.types";

type Props = {
  formData: Investment;

  setFormData: React.Dispatch<
    React.SetStateAction<Investment>
  >;

  reportFile: File | null;

  setReportFile: (
    file: File | null
  ) => void;

  isEditing: boolean;

  saving: boolean;

  onSubmit: () => void;

  onCancel: () => void;
};

export default function InvestmentForm({
  formData,
  setFormData,
  reportFile,
  setReportFile,
  isEditing,
  saving,
  onSubmit,
  onCancel,
}: Props) {

  const onChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-3xl border border-[#e8e2d6] shadow-sm p-6">

      {/* HEADER */}

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-2xl bg-[#051933] text-white flex items-center justify-center">

          <Plus size={18} />

        </div>

        <div className="flex-1">

          <h2 className="text-2xl font-bold text-[#051933]">

            {isEditing
              ? "Edit Investment"
              : "Add Investment"}

          </h2>

          <p className="text-sm text-gray-500">

            Investment opportunities & research reports

          </p>

        </div>

        {isEditing && (

          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium text-[#c8a21a] hover:underline"
          >
            Cancel
          </button>

        )}

      </div>

      <div className="space-y-4">

        <input
          required
          name="name"
          value={formData.name ?? ""}
          onChange={onChangeHandler}
          placeholder="Investment Name"
          className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none focus:border-[#c8a21a]"
        />

        <input
          required
          name="provider"
          value={formData.provider ?? ""}
          onChange={onChangeHandler}
          placeholder="Provider"
          className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none focus:border-[#c8a21a]"
        />

        <div>

          <label className="block text-xs font-medium text-gray-500 mb-1.5 px-1">

            Investment Category

          </label>

          <select
            required
            name="type"
            value={formData.type || "All Investments"}
            onChange={onChangeHandler}
            className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none focus:border-[#c8a21a]"
          >

            <option value="All Investments">

              All Investments

            </option>

            <option value="High Yield Savings">

              High Yield Savings

            </option>

          </select>

        </div>

        <input
          name="minimumInvestment"
          value={formData.minimumInvestment ?? ""}
          onChange={onChangeHandler}
          placeholder="Minimum Investment"
          className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none focus:border-[#c8a21a]"
        />

        <input
          name="website"
          value={formData.website ?? ""}
          onChange={onChangeHandler}
          placeholder="Website"
          className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none focus:border-[#c8a21a]"
        />

        <div className="grid grid-cols-2 gap-4">

          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber ?? ""}
            onChange={onChangeHandler}
            placeholder="Phone Number"
            className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none focus:border-[#c8a21a]"
          />

          <input
            type="email"
            name="email"
            value={formData.email ?? ""}
            onChange={onChangeHandler}
            placeholder="Email Address"
            className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none focus:border-[#c8a21a]"
          />

        </div>

        <select
          name="riskLevel"
          value={formData.riskLevel ?? "Low"}
          onChange={onChangeHandler}
          className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none focus:border-[#c8a21a]"
        >
          <option value="Low">
            Low Risk
          </option>

          <option value="Moderate">
            Moderate Risk
          </option>

          <option value="High">
            High Risk
          </option>
        </select>

        <select
          name="status"
          value={formData.status ?? "Approved"}
          onChange={onChangeHandler}
          className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none focus:border-[#c8a21a]"
        >
          <option value="Approved">
            Approved
          </option>

          <option value="Under Review">
            Under Review
          </option>

          <option value="Restricted">
            Restricted
          </option>
        </select>

        <textarea
          rows={5}
          name="description"
          value={formData.description ?? ""}
          onChange={onChangeHandler}
          placeholder="Investment Summary..."
          className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 resize-none outline-none focus:border-[#c8a21a]"
        />

        {/* FILE UPLOAD */}

        <label
          className="
            flex
            items-center
            gap-4
            border-2
            border-dashed
            border-[#e8e2d6]
            rounded-2xl
            p-4
            cursor-pointer
            bg-[#faf7f1]
            hover:border-[#c8a21a]
            transition
          "
        >

          <div className="w-12 h-12 rounded-xl bg-white border flex items-center justify-center">

            <Upload
              size={18}
              className="text-[#051933]"
            />

          </div>

          <div className="flex-1">

            <p className="font-medium text-[#051933]">

              Upload Research Report

            </p>

            <p className="text-xs text-gray-500">

              PDF only
            </p>

            {reportFile && (

              <div className="flex items-center gap-2 mt-2 text-sm text-[#c8a21a]">

                <FileText size={14} />

                {reportFile.name}

              </div>

            )}

          </div>

          <input
            hidden
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setReportFile(
                e.target.files?.[0] ||
                null
              )
            }
          />

        </label>

        {/* SUBMIT */}

        <div className="flex gap-3">

          <button
            type="button"
            onClick={onSubmit}
            disabled={saving}
            className="
              flex-1
              h-12
              rounded-2xl
              bg-[#051933]
              hover:bg-[#0b2447]
              text-white
              font-medium
              flex
              items-center
              justify-center
              gap-2
              transition
              disabled:opacity-60
            "
          >

            {saving ? (

              <Loader2 className="w-5 h-5 animate-spin" />

            ) : (

              <Save size={18} />

            )}

            {isEditing
              ? "Update Investment"
              : "Save Investment"}

          </button>

          {isEditing && (

            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="
                h-12
                px-6
                rounded-2xl
                border
                border-[#e8e2d6]
                text-[#051933]
                font-medium
                hover:bg-[#f7f3eb]
                transition
                disabled:opacity-60
              "
            >
              Cancel
            </button>

          )}

        </div>

      </div>

    </div>
  );
}
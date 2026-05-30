"use client";

import {
  Loader2,
  Plus,
  Save,
  Upload,
} from "lucide-react";

type Props = {
  formData: any;

  setFormData: React.Dispatch<
    React.SetStateAction<any>
  >;

  reportFile: File | null;

  setReportFile: (
    file: File | null
  ) => void;

  saving: boolean;

  isEditing: boolean;

  onSubmit: () => void;
};

export default function BankForm({
  formData,
  setFormData,
  reportFile,
  setReportFile,
  saving,
  isEditing,
  onSubmit,
}: Props) {

  const onChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    const {
      name,
      value,
    } = e.target;

    setFormData(
      (prev: any) => ({
        ...prev,

        [name]: value,
      })
    );
  };

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-2xl bg-[#0B1D34] text-white flex items-center justify-center">

          <Plus className="w-5 h-5" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-[#0B1D34]">

            {isEditing
              ? "Edit Bank"
              : "Add Bank"}

          </h2>

          <p className="text-gray-500 text-sm">

            Public info + premium report

          </p>

        </div>

      </div>

      <div className="space-y-4">

        <input
          name="name"
          placeholder="Bank Name"
          value={formData.name}
          onChange={onChangeHandler}
          className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3"
        />

        <input
          name="type"
          placeholder="Bank Type"
          value={formData.type}
          onChange={onChangeHandler}
          className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3"
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={onChangeHandler}
          className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3"
        />

        <select
          name="status"
          value={formData.status}
          onChange={onChangeHandler}
          className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3"
        >
          <option value="Mehudar">Mehudar</option>
          <option value="Compliant">Compliant</option>
          <option value="Conditional">Conditional</option>
          <option value="Questionable">Questionable</option>
          <option value="Noncompliant">Noncompliant</option>
        </select>

        <input
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={onChangeHandler}
          className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3"
        />

        <div className="grid grid-cols-2 gap-4">

          <input
            name="founded"
            placeholder="Founded"
            value={formData.founded}
            onChange={onChangeHandler}
            className="rounded-2xl border bg-[#f7f3eb] px-4 py-3"
          />

          <input
            name="assets"
            placeholder="Assets"
            value={formData.assets}
            onChange={onChangeHandler}
            className="rounded-2xl border bg-[#f7f3eb] px-4 py-3"
          />

        </div>

        <input
          type="date"
          name="lastReviewed"
          value={formData.lastReviewed}
          onChange={onChangeHandler}
          className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3"
        />

        <textarea
          rows={5}
          name="publicInfo"
          placeholder="Public Information"
          value={formData.publicInfo}
          onChange={onChangeHandler}
          className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 resize-none"
        />

        <label className="flex items-center gap-3 border-2 border-dashed rounded-2xl p-4 cursor-pointer">

          <Upload className="w-5 h-5" />

          <div>

            <p className="font-medium">

              Upload Premium Report

            </p>

            {reportFile && (

              <p className="text-xs text-green-600">

                {reportFile.name}

              </p>

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

        <button
          onClick={onSubmit}
          disabled={saving}
          className="w-full bg-[#0B1D34] text-white rounded-2xl py-3 flex items-center justify-center gap-2"
        >

          {saving ? (

            <Loader2 className="w-5 h-5 animate-spin" />

          ) : (

            <Save className="w-5 h-5" />

          )}

          {isEditing
            ? "Update Bank"
            : "Save Bank"}

        </button>

      </div>

    </div>
  );
}
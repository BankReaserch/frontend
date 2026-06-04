"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Modal from "../../components/utils/modal/FormModel";

import InvestmentForm from "@/components/admin/investments/InvestmentForm";
import InvestmentTable from "@/components/admin/investments/InvestmentTable";

import { Investment } from "@/components/admin/investments/investment.types";

export default function InvestmentsPageAdmin() {
  const [investments, setInvestments] =
    useState<Investment[]>([]);

  const [selected, setSelected] =
    useState<Investment | null>(
      null
    );

  const [editingId, setEditingId] =
    useState("");

  const [open, setOpen] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [reportFile, setReportFile] =
    useState<File | null>(
      null
    );

  const [isEditing, setIsEditing] =
    useState(false);

  const [formData, setFormData] =
    useState<Investment>({
      name: "",
      provider: "",
      type: "",
      minimumInvestment: "",
      riskLevel: "Low",
      status: "Approved",
      website: "",
      description: "",
    });

  /*
  ========================================
  API
  ========================================
  */

  const api = axios.create({
    baseURL:
      process.env
        .NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  /*
  ========================================
  FETCH
  ========================================
  */

  const fetchInvestments =
    async () => {
      try {
        setLoading(true);

        const response =
          await api.get(
            "/api/investments"
          );

        if (
          response.data.success
        ) {
          setInvestments(
            response.data.data ||
              []
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchInvestments();
  }, []);

  /*
  ========================================
  RESET
  ========================================
  */

  const resetForm = () => {
    setEditingId("");
    setIsEditing(false);
    setReportFile(null);

    setFormData({
      name: "",
      provider: "",
      type: "",
      minimumInvestment: "",
      riskLevel: "Low",
      status: "Approved",
      website: "",
      description: "",
    });
  };

  /*
  ========================================
  CREATE
  ========================================
  */

  const createInvestment =
    async () => {
      try {
        setSaving(true);

        const form =
          new FormData();

        form.append(
          "name",
          formData.name
        );

        form.append(
          "provider",
          formData.provider
        );

        form.append(
          "type",
          formData.type
        );

        form.append(
          "minimumInvestment",
          formData.minimumInvestment
        );

        form.append(
          "riskLevel",
          formData.riskLevel
        );

        form.append(
          "status",
          formData.status
        );

        form.append(
          "website",
          formData.website
        );

        form.append(
          "description",
          formData.description
        );

        if (reportFile) {
          form.append(
            "report",
            reportFile
          );
        }

        await api.post(
          "/api/investments",
          form
        );

        await fetchInvestments();

        resetForm();
      } catch (error) {
        console.error(error);
      } finally {
        setSaving(false);
      }
    };

  /*
  ========================================
  UPDATE
  ========================================
  */

  const updateInvestment =
    async () => {
      try {
        setSaving(true);

        const form =
          new FormData();

        form.append(
          "name",
          formData.name
        );

        form.append(
          "provider",
          formData.provider
        );

        form.append(
          "type",
          formData.type
        );

        form.append(
          "minimumInvestment",
          formData.minimumInvestment
        );

        form.append(
          "riskLevel",
          formData.riskLevel
        );

        form.append(
          "status",
          formData.status
        );

        form.append(
          "website",
          formData.website
        );

        form.append(
          "description",
          formData.description
        );

        if (reportFile) {
          form.append(
            "report",
            reportFile
          );
        }

        await api.put(
          `/api/investments/${editingId}`,
          form
        );

        await fetchInvestments();

        resetForm();
      } catch (error) {
        console.error(error);
      } finally {
        setSaving(false);
      }
    };

  /*
  ========================================
  EDIT
  ========================================
  */

  const handleEdit = (
    investment: Investment
  ) => {
    setEditingId(
      investment._id || ""
    );

    setIsEditing(true);

    setFormData({
      ...investment,
    });
  };

  /*
  ========================================
  DELETE
  ========================================
  */

  const handleDelete =
    async (id: string) => {
      const confirmed =
        window.confirm(
          "Delete this investment?"
        );

      if (!confirmed) return;

      try {
        await api.delete(
          `/api/investments/${id}`
        );

        fetchInvestments();
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="min-h-screen bg-[#f5f1ea] p-8">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-[#051933]">

          Investments

        </h1>

        <p className="text-gray-500 mt-2">

          Manage investment opportunities
          and research reports

        </p>

      </div>

      {/* CONTENT */}

      <div className="grid xl:grid-cols-[420px_1fr] gap-8">

        <InvestmentForm
          formData={formData}
          setFormData={setFormData}
          reportFile={reportFile}
          setReportFile={setReportFile}
          isEditing={isEditing}
          saving={saving}
          onSubmit={
            isEditing
              ? updateInvestment
              : createInvestment
          }
        />

        <InvestmentTable
          investments={investments}
          onView={(investment) => {
            setSelected(
              investment
            );

            setOpen(true);
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </div>

      {/* DETAILS MODAL */}

      <Modal
        open={open}
        onClose={setOpen}
        title={selected?.name}
        description="Investment Details"
        size="lg"
      >
        {selected && (

          <div className="space-y-5">

            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="text-xs text-gray-500">
                  Provider
                </p>

                <p className="font-medium">
                  {
                    selected.provider
                  }
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Type
                </p>

                <p className="font-medium">
                  {selected.type}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Risk Level
                </p>

                <p className="font-medium">
                  {
                    selected.riskLevel
                  }
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Status
                </p>

                <p className="font-medium">
                  {
                    selected.status
                  }
                </p>
              </div>

            </div>

            <div>

              <p className="text-xs text-gray-500 mb-2">

                Website

              </p>

              <a
                href={
                  selected.website.startsWith(
                    "http"
                  )
                    ? selected.website
                    : `https://${selected.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c8a21a] hover:underline"
              >
                {selected.website}
              </a>

            </div>

            <div>

              <p className="text-xs text-gray-500 mb-2">

                Description

              </p>

              <p className="leading-7 text-gray-700">

                {
                  selected.description
                }

              </p>

            </div>
            {selected.reportUrl && (

  <div className="border-t pt-5">

    <p className="text-xs text-gray-500 mb-3">

      Research Report

    </p>

    <div className="flex gap-3">

      <button
        onClick={() =>
          window.open(
            `${process.env.NEXT_PUBLIC_API_URL}uploads/reports/${selected.reportUrl}`,
            "_blank"
          )
        }
        className="
          flex-1
          h-11
          rounded-xl
          bg-[#051933]
          text-white
          font-medium
        "
      >
        View Report
      </button>

      <a
        href={`${process.env.NEXT_PUBLIC_API_URL}api/investments/download-report/${selected._id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex-1
          h-11
          rounded-xl
          border
          border-[#c8a21a]
          text-[#c8a21a]
          font-medium
          flex
          items-center
          justify-center
        "
      >
        Download Report
      </a>

    </div>

  </div>

)}

          </div>

        )}
      </Modal>

    </div>
  );
}
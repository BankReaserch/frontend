"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  Loader2,
  Search,
} from "lucide-react";
import { BankType } from "@/components/admin/bank/bank.types";
import BankDetailsModal from "@/components/admin/bank/BankDetailsModal";
import BankForm from "@/components/admin/bank/BankForm";
import BankTable from "@/components/admin/bank/BankTable";

export default function BanksAdmin() {

  const api = axios.create({
    baseURL:
      process.env
        .NEXT_PUBLIC_API_URL,

    withCredentials: true,
  });

  const initialForm = {
    name: "",
    type: "",
    location: "",
    status: "Compliant",

    website: "",

    assets: "",

    founded: "",

    lastReviewed: "",

    publicInfo: "",
  };
  const [banks, setBanks] =
    useState<BankType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [selectedBank, setSelectedBank] =
    useState<BankType | null>(
      null
    );

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);
  const [reportFile, setReportFile] =
    useState<File | null>(null);

  const [coverImage, setCoverImage] =
    useState<File | null>(null);
  const [formData, setFormData] =
    useState(initialForm);
  const fetchBanks =
    async () => {

      try {

        const response =
          await api.get(
            "/api/banks/all"
          );

        setBanks(
          response.data
            ?.data || []
        );

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchBanks();

  }, []);

  const filteredBanks =
    useMemo(() => {

      return banks.filter(
        (bank) =>
          bank.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          bank.type
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [banks, search]);

  const createBank =
    async () => {

      try {

        setSaving(true);

        const data =
          new FormData();

        Object.entries(
          formData
        ).forEach(
          ([key, value]) => {

            data.append(
              key,
              value as string
            );

          }
        );

        if (
          reportFile
        ) {

          data.append(
            "report",
            reportFile
          );
        }
        if (coverImage) {

          data.append(
            "coverImage",
            coverImage
          );

        }
        const response =
          await api.post(
            "/api/banks/create",
            data,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        if (
          response.data
            .success
        ) {

          fetchBanks();

          setFormData(
            initialForm
          );

          setReportFile(null);
          setCoverImage(null);
        }

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setSaving(false);

      }
    };
  const startEdit = (
    bank: BankType
  ) => {

    setSelectedBank(
      bank
    );

    setFormData({
      name:
        bank.name || "",

      type:
        bank.type || "",

      location:
        bank.location || "",

      status:
        bank.status ||
        "Compliant",

      website:
        bank.website || "",

      assets:
        bank.assets || "",

      founded:
        bank.founded || "",

      lastReviewed:
        bank.lastReviewed || "",

      publicInfo:
        bank.publicInfo || "",
    });

    setIsEditing(
      true
    );
  };

  const updateBank =
    async () => {

      if (
        !selectedBank
      ) return;

      try {

        setSaving(true);

        const data =
          new FormData();

        Object.entries(
          formData
        ).forEach(
          ([key, value]) => {

            data.append(
              key,
              value as string
            );

          }
        );

        if (
          reportFile
        ) {

          data.append(
            "report",
            reportFile
          );
        }

        const response =
          await api.put(
            `/api/banks/update/${selectedBank._id}`,
            data,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        if (
          response.data
            .success
        ) {

          fetchBanks();

          setFormData(
            initialForm
          );

          setReportFile(null);
          setCoverImage(null);

          setSelectedBank(
            null
          );

          setIsEditing(
            false
          );

        }

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setSaving(false);

      }
    };

  const deleteBank =
    async (
      bankId: string
    ) => {

      const confirmed =
        window.confirm(
          "Delete this bank?"
        );

      if (
        !confirmed
      ) return;

      try {

        await api.delete(
          `/api/banks/delete/${bankId}`
        );

        fetchBanks();

        setSelectedBank(
          null
        );

        setDetailsOpen(
          false
        );

      } catch (error) {

        console.error(
          error
        );
      }
    };

  /*
  ========================================
  LOADING
  ========================================
  */

  if (loading) {

    return (
      <div className="bg-white rounded-3xl border p-10 min-h-[450px] flex items-center justify-center">

        <div className="flex items-center gap-3 text-[#0B1D34] font-semibold">

          <Loader2 className="w-5 h-5 animate-spin" />

          Loading Banks...

        </div>

      </div>
    );
  }

  /*
  ========================================
  UI
  ========================================
  */

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="bg-white rounded-3xl border p-6 shadow-sm">

        <div className="flex items-center justify-between gap-4 flex-wrap">

          <div>

            <p className="uppercase tracking-[4px] text-[#c7a43a] text-xs font-bold">

              Bank Directory

            </p>

            <h1 className="text-4xl font-bold text-[#0B1D34] mt-2">

              Manage Banks

            </h1>

          </div>

          <div className="relative w-full md:w-[320px]">

            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              placeholder="Search bank..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full rounded-2xl border bg-[#f7f3eb] py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#d4af37]"
            />

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_.65fr] gap-6">

        <BankTable
          banks={
            filteredBanks
          }
          onSelect={(
            bank
          ) => {

            setSelectedBank(
              bank
            );

            setDetailsOpen(
              true
            );

          }}
        />

        <BankForm
          formData={formData}
          setFormData={setFormData}
          reportFile={reportFile}
          setReportFile={setReportFile}
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          saving={saving}
          isEditing={isEditing}
          onSubmit={
            isEditing
              ? updateBank
              : createBank
          }
        />
      </div>

      <BankDetailsModal
        bank={
          selectedBank
        }
        open={
          detailsOpen
        }
        onClose={
          setDetailsOpen
        }
        onEdit={
          startEdit
        }
        onDelete={
          deleteBank
        }
      />

    </div>
  );
}
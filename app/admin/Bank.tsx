"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  Building2,
  Search,
  ShieldCheck,
  FileText,
  Lock,
  Upload,
  Plus,
  Loader2,
  Globe,
  BadgeDollarSign,
  Save,
} from "lucide-react";

type BankType = {
  _id: string;

  name: string;

  type: string;

  location: string;

  status: string;

  website?: string;

  assets?: string;

  founded?: string;

  publicInfo?: string;

  reportAvailable?: boolean;

  reportUrl?: string;
};

export default function BanksAdmin() {

  /*
  ========================================
  STATES
  ========================================
  */

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

  const [formData, setFormData] =
    useState({
      name: "",

      type: "",

      location: "",

      status: "Compliant",

      website: "",

      assets: "",

      founded: "",

      publicInfo: "",
    });

  const [reportFile, setReportFile] =
    useState<File | null>(null);

  /*
  ========================================
  AXIOS
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
  FETCH BANKS
  ========================================
  */

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

  /*
  ========================================
  FILTERED BANKS
  ========================================
  */

  const filteredBanks =
    useMemo(() => {

      return banks.filter(
        (bank) =>
          bank.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          bank.type
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [banks, search]);

  /*
  ========================================
  CREATE BANK
  ========================================
  */

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
              value
            );
          }
        );

        if (reportFile) {

          data.append(
            "report",
            reportFile
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

          setFormData({
            name: "",

            type: "",

            location: "",

            status:
              "Compliant",

            website: "",

            assets: "",

            founded: "",

            publicInfo: "",
          });

          setReportFile(
            null
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

  /*
  ========================================
  STATUS COLOR
  ========================================
  */

  const getStatusClass =
    (
      status: string
    ) => {

      switch (status) {

        case "Mehudar":

          return "bg-green-100 text-green-700";

        case "Compliant":

          return "bg-blue-100 text-blue-700";

        case "Conditional":

          return "bg-yellow-100 text-yellow-700";

        case "Questionable":

          return "bg-orange-100 text-orange-700";

        case "Noncompliant":

          return "bg-red-100 text-red-700";

        default:

          return "bg-gray-100 text-gray-700";
      }
    };

  /*
  ========================================
  LOADING
  ========================================
  */

  if (loading) {

    return (
      <div className="bg-white rounded-3xl p-10 border shadow-sm min-h-[400px] flex items-center justify-center">

        <div className="flex items-center gap-3 text-[#0B1D34] font-semibold">

          <Loader2 className="w-5 h-5 animate-spin" />

          Loading banks...

        </div>

      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_.7fr] gap-6">

      {/* LEFT */}
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

        {/* TABLE */}
        <div className="bg-white rounded-3xl border overflow-hidden shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-[#0B1D34] text-white">

                <tr>

                  <th className="px-6 py-4 text-left">

                    Bank

                  </th>

                  <th className="px-6 py-4 text-left">

                    Type

                  </th>

                  <th className="px-6 py-4 text-left">

                    Status

                  </th>

                  <th className="px-6 py-4 text-left">

                    Report

                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredBanks.map(
                  (bank) => (

                    <tr
                      key={
                        bank._id
                      }
                      onClick={() =>
                        setSelectedBank(
                          bank
                        )
                      }
                      className="border-b cursor-pointer hover:bg-[#faf7f1] transition"
                    >

                      <td className="px-6 py-5">

                        <div>

                          <h3 className="font-semibold text-[#0B1D34]">

                            {
                              bank.name
                            }

                          </h3>

                          <p className="text-sm text-gray-500 mt-1">

                            {
                              bank.location
                            }

                          </p>

                        </div>

                      </td>

                      <td className="px-6 py-5 text-gray-600">

                        {
                          bank.type
                        }

                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                            bank.status
                          )}`}
                        >

                          {
                            bank.status
                          }

                        </span>

                      </td>

                      <td className="px-6 py-5">

                        {bank.reportAvailable ? (

                          <div className="flex items-center gap-2 text-green-600 font-medium text-sm">

                            <ShieldCheck className="w-4 h-4" />

                            Premium

                          </div>

                        ) : (

                          <div className="flex items-center gap-2 text-gray-400 text-sm">

                            <Lock className="w-4 h-4" />

                            None

                          </div>

                        )}

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="space-y-6">

        {/* CREATE BANK */}
        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-12 h-12 rounded-2xl bg-[#0B1D34] text-white flex items-center justify-center">

              <Plus className="w-5 h-5" />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-[#0B1D34]">

                Add Bank

              </h2>

              <p className="text-gray-500 text-sm mt-1">

                Public info +
                premium research report

              </p>

            </div>

          </div>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Bank name"
              value={
                formData.name
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name:
                    e.target.value,
                })
              }
              className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none"
            />

            <input
              type="text"
              placeholder="Bank type"
              value={
                formData.type
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type:
                    e.target.value,
                })
              }
              className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none"
            />

            <input
              type="text"
              placeholder="Location"
              value={
                formData.location
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location:
                    e.target.value,
                })
              }
              className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none"
            />

            <textarea
              rows={4}
              placeholder="Publicly available information..."
              value={
                formData.publicInfo
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  publicInfo:
                    e.target.value,
                })
              }
              className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none resize-none"
            />

            {/* REPORT */}
            <label className="flex items-center gap-3 border-2 border-dashed rounded-2xl p-4 cursor-pointer bg-[#faf7f1] hover:border-[#d4af37] transition">

              <Upload className="w-5 h-5 text-[#0B1D34]" />

              <div>

                <p className="font-medium text-[#0B1D34]">

                  Upload Premium Report

                </p>

                <p className="text-sm text-gray-500">

                  Accessible only to subscribed users

                </p>

              </div>

              <input
                type="file"
                hidden
                accept=".pdf"
                onChange={(e) =>
                  setReportFile(
                    e.target
                      .files?.[0] ||
                      null
                  )
                }
              />

            </label>

            <button
              onClick={
                createBank
              }
              disabled={
                saving
              }
              className="w-full bg-[#0B1D34] hover:bg-[#132b4d] text-white rounded-2xl py-3 font-semibold transition flex items-center justify-center gap-2"
            >

              {saving ? (

                <Loader2 className="w-5 h-5 animate-spin" />

              ) : (

                <Save className="w-5 h-5" />

              )}

              Save Bank

            </button>

          </div>

        </div>

        {/* PREVIEW */}
        {selectedBank && (

          <div className="bg-white rounded-3xl border overflow-hidden shadow-sm">

            <div className="bg-[#0B1D34] text-white p-6">

              <h2 className="text-3xl font-bold">

                {
                  selectedBank.name
                }

              </h2>

              <p className="text-gray-300 mt-2">

                {
                  selectedBank.type
                } •{" "}
                {
                  selectedBank.location
                }

              </p>

            </div>

            <div className="p-6 space-y-6">

              <div className="flex items-center justify-between">

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                    selectedBank.status
                  )}`}
                >

                  {
                    selectedBank.status
                  }

                </span>

                <div className="text-right">

                  <p className="text-xs uppercase tracking-[3px] text-gray-400">

                    Assets

                  </p>

                  <p className="font-semibold text-[#0B1D34] mt-1">

                    {
                      selectedBank.assets ||
                      "-"
                    }

                  </p>

                </div>

              </div>

              <div className="bg-[#faf7f1] rounded-2xl border-l-4 border-[#d4af37] p-5">

                <p className="text-sm leading-7 text-gray-700">

                  {
                    selectedBank.publicInfo
                  }

                </p>

              </div>

              {/* PREMIUM */}
              <div className="rounded-2xl bg-[#0B1D34] text-white p-5">

                <div className="flex items-center gap-3">

                  <FileText className="w-5 h-5" />

                  <div>

                    <h3 className="font-semibold">

                      Premium Research Report

                    </h3>

                    <p className="text-sm text-gray-300 mt-1">

                      Accessible only to subscribed users

                    </p>

                  </div>

                </div>

              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 gap-6 text-sm">

                <div>

                  <p className="uppercase tracking-[3px] text-gray-400 text-xs">

                    Founded

                  </p>

                  <p className="font-medium text-[#0B1D34] mt-2">

                    {
                      selectedBank.founded ||
                      "-"
                    }

                  </p>

                </div>

                <div>

                  <p className="uppercase tracking-[3px] text-gray-400 text-xs">

                    Website

                  </p>

                  <a
                    href={
                      selectedBank.website
                    }
                    target="_blank"
                    className="font-medium text-[#c7a43a] mt-2 flex items-center gap-2"
                  >

                    <Globe className="w-4 h-4" />

                    Visit

                  </a>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
// app/admin/alerts/page.tsx

"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import AlertCard from "@/components/admin/alerts/AlertCard";

import Modal from "@/components/utils/modal/FormModel";

import PageHeader from "@/components/utils/ui/PageHeader";

import SearchInput from "@/components/utils/ui/SearchInput";

import {
  Loader2,
} from "lucide-react";

type AlertType =
  | "warning"
  | "danger"
  | "success"
  | "info";

type Alert = {
  _id: string;

  title: string;

  message: string;

  type: AlertType;

  isActive: boolean;

  createdAt: string;
};

export default function AdminAlertsPage() {

  /*
  ========================================
  STATES
  ========================================
  */

  const [alerts, setAlerts] =
    useState<Alert[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [open, setOpen] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(
      null
    );

  const [formData, setFormData] =
    useState({
      title: "",

      message: "",

      type: "warning",

      isActive: true,
    });

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
  FETCH ALERTS
  ========================================
  */

  const fetchAlerts =
    async () => {

      try {

        const res =
          await api.get(
            "/api/alerts/all"
          );

        setAlerts(
          res.data.data || []
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

    fetchAlerts();

  }, []);

  /*
  ========================================
  FILTERED ALERTS
  ========================================
  */

  const filteredAlerts =
    useMemo(() => {

      return alerts.filter(
        (alert) =>
          alert.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          alert.message
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [
      alerts,
      search,
    ]);

  /*
  ========================================
  OPEN CREATE MODAL
  ========================================
  */

  const openCreateModal =
    () => {

      setEditingId(
        null
      );

      setFormData({
        title: "",
        message: "",
        type: "warning",
        isActive: true,
      });

      setOpen(true);
    };

  /*
  ========================================
  OPEN EDIT MODAL
  ========================================
  */

  const handleEdit =
    (
      alert: Alert
    ) => {

      setEditingId(
        alert._id
      );

      setFormData({
        title:
          alert.title,

        message:
          alert.message,

        type:
          alert.type,

        isActive:
          alert.isActive,
      });

      setOpen(true);
    };

  /*
  ========================================
  CREATE / UPDATE ALERT
  ========================================
  */

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setSubmitting(
          true
        );

        if (
          editingId
        ) {

          await api.put(
            `/api/alerts/update/${editingId}`,
            formData
          );

        } else {

          await api.post(
            "/api/alerts/create",
            formData
          );
        }

        setOpen(false);

        fetchAlerts();

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setSubmitting(
          false
        );
      }
    };

  /*
  ========================================
  DELETE ALERT
  ========================================
  */

  const handleDelete =
    async (
      id: string
    ) => {

      const confirmed =
        confirm(
          "Delete this alert?"
        );

      if (
        !confirmed
      ) {
        return;
      }

      try {

        await api.delete(
          `/api/alerts/delete/${id}`
        );

        fetchAlerts();

      } catch (error) {

        console.error(
          error
        );
      }
    };

  return (
    <main className="min-h-screen bg-[#f5f1ea]">

      {/* HEADER */}
      <PageHeader
        label="Admin Panel"
        title="Market Alerts"
        buttonText="Add Alert"
        onClick={
          openCreateModal
        }
      />

      {/* CONTENT */}
      <section className="py-10">

        <div className="max-w-7xl mx-auto px-6">

          {/* SEARCH */}
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search alerts..."
          />

          {/* LOADING */}
          {loading ? (

            <div className="flex items-center justify-center py-24">

              <Loader2 className="w-8 h-8 animate-spin text-[#051933]" />

            </div>

          ) : filteredAlerts.length ===
            0 ? (

            <div className="rounded-[32px] border border-dashed border-[#d9cfbf] bg-white py-24 text-center mt-8">

              <h3 className="font-serif text-3xl text-[#051933]">

                No Alerts Found

              </h3>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-8">

              {filteredAlerts.map(
                (
                  alert
                ) => (

                  <AlertCard
                    key={
                      alert._id
                    }
                    alert={
                      alert
                    }
                    onEdit={
                      handleEdit
                    }
                    onDelete={
                      handleDelete
                    }
                  />
                )
              )}

            </div>
          )}

        </div>

      </section>

      {/* MODAL */}
      <Modal
        open={open}
        onClose={setOpen}
        title={
          editingId
            ? "Update Alert"
            : "Create Alert"
        }
        description="Create important market alerts and public notices."
        size="lg"
      >

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6"
        >

          {/* TITLE */}
          <div>

            <label className="block text-sm font-medium text-[#051933] mb-2">

              Alert Title

            </label>

            <input
              type="text"
              value={
                formData.title
              }
              onChange={(
                e
              ) =>
                setFormData({
                  ...formData,
                  title:
                    e.target
                      .value,
                })
              }
              placeholder="Enter alert title"
              className="w-full h-12 rounded-2xl border border-[#e7dfd2] px-5 outline-none bg-white"
              required
            />

          </div>

          {/* MESSAGE */}
          <div>

            <label className="block text-sm font-medium text-[#051933] mb-2">

              Alert Message

            </label>

            <textarea
              value={
                formData.message
              }
              onChange={(
                e
              ) =>
                setFormData({
                  ...formData,
                  message:
                    e.target
                      .value,
                })
              }
              placeholder="Write alert message..."
              className="w-full h-36 rounded-2xl border border-[#e7dfd2] px-5 py-4 outline-none resize-none bg-white"
              required
            />

          </div>

          {/* TYPE */}
          <div>

            <label className="block text-sm font-medium text-[#051933] mb-2">

              Alert Type

            </label>

            <select
              value={
                formData.type
              }
              onChange={(
                e
              ) =>
                setFormData({
                  ...formData,
                  type:
                    e.target
                      .value as AlertType,
                })
              }
              className="w-full h-12 rounded-2xl border border-[#e7dfd2] px-5 outline-none bg-white"
            >

              <option value="warning">

                Warning

              </option>

              <option value="danger">

                Danger

              </option>

              <option value="success">

                Success

              </option>

              <option value="info">

                Information

              </option>

            </select>

          </div>

          {/* ACTIVE */}
          <div className="flex items-center justify-between rounded-2xl border border-[#e7dfd2] px-5 py-4 bg-white">

            <div>

              <h4 className="font-medium text-[#051933]">

                Active Alert

              </h4>

              <p className="text-sm text-[#64748b] mt-1">

                Display this alert publicly

              </p>

            </div>

            <input
              type="checkbox"
              checked={
                formData.isActive
              }
              onChange={(
                e
              ) =>
                setFormData({
                  ...formData,
                  isActive:
                    e.target
                      .checked,
                })
              }
              className="w-5 h-5"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={
              submitting
            }
            className="w-full h-14 rounded-2xl bg-[#051933] hover:bg-[#0d2748] transition-all text-white font-semibold flex items-center justify-center gap-3"
          >

            {submitting ? (

              <Loader2 className="w-5 h-5 animate-spin" />

            ) : editingId ? (

              "Update Alert"

            ) : (

              "Create Alert"
            )}

          </button>

        </form>

      </Modal>

    </main>
  );
}
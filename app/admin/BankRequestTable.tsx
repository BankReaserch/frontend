"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Search,
  Trash2,
  Mail,
  MapPin,
  CalendarDays,
  Loader2,
  Inbox,
  Eye,
  X,
} from "lucide-react";

import Modal from "@/components/utils/modal/FormModel";
type RequestStatus =
  | "pending"
  | "in_review"
  | "completed"
  | "rejected";

interface BankRequestItem {
  _id: string;
  name: string;
  location: string;
  email: string;
  notes: string;
  status: RequestStatus;
  adminNotes?: string;
  createdAt: string;
}

const STATUS_CFG: Record<
  RequestStatus,
  { label: string; badge: string; dot: string }
> = {
  pending: {
    label: "Pending",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
  },
  in_review: {
    label: "In Review",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dot: "bg-blue-400",
  },
  completed: {
    label: "Completed",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  rejected: {
    label: "Rejected",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
    dot: "bg-red-400",
  },
};

export default function BankRequestsTable() {

  const [requests, setRequests] =
    useState<BankRequestItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<RequestStatus | "all">("all");
  const [selected, setSelected] =
    useState<BankRequestItem | null>(null);

  const [detailStatus, setDetailStatus] =
    useState<RequestStatus>("pending");

  const [detailAdminNotes, setDetailAdminNotes] =
    useState("");

  const [saving, setSaving] =
    useState(false);
  const fetchRequests = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/bank-requests`,
        {
          withCredentials: true,
        }
      );

      setRequests(data.data || data.requests || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const openDetail = (request: BankRequestItem) => {
    setSelected(request);
    setDetailStatus(request.status || "pending");
    setDetailAdminNotes(request.adminNotes || "");
  };

  const closeDetail = () => {
    setSelected(null);
    setDetailAdminNotes("");
  };

  const quickUpdateStatus = async (
    id: string,
    status: RequestStatus
  ) => {
    // optimistic update
    setRequests((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status } : r
      )
    );

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}api/bank-requests/${id}`,
        { status },
        { withCredentials: true }
      );
    } catch (error: any) {
      alert(error.response?.data?.message || "Update failed");
      // revert on failure
      await fetchRequests();
    }
  };
  const handleSaveDetail = async () => {
    if (!selected) return;

    try {
      setSaving(true);

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}api/bank-requests/${selected._id}`,
        {
          status: detailStatus,
          adminNotes: detailAdminNotes,
        },
        { withCredentials: true }
      );
      await fetchRequests();
      closeDetail();
    } catch (error: any) {
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id: string) => {
    const confirmed = confirm(
      "Delete this bank request?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}api/bank-requests/${id}`,
        { withCredentials: true }
      );

      setRequests((prev) =>
        prev.filter((r) => r._id !== id)
      );

      if (selected?._id === id) {
        closeDetail();
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  // =========================
  // FILTER
  // =========================
  const filtered = requests.filter((r) => {
    const q = search.toLowerCase();

    const matchesSearch =
      !q ||
      r.name?.toLowerCase().includes(q) ||
      r.email?.toLowerCase().includes(q) ||
      r.location?.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" || r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-[#0f2234] border border-white/5 rounded-3xl p-6 shadow-2xl">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-white text-2xl font-semibold">
            Bank Requests
          </h2>

          <p className="text-[#8a9bb0] text-sm mt-1">
            Review and triage submitted bank research requests
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">

          {/* SEARCH */}
          <div className="relative flex-1 lg:w-72">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f8296]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, location..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-[#6f8296] focus:outline-none focus:border-[#c9a84c]/50"
            />
          </div>

          {/* STATUS FILTER */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as RequestStatus | "all"
              )
            }
            className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_review">In Review</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>

        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead>
            <tr className="border-b border-white/5 text-left">
              <th className="pb-4 text-[#8a9bb0] text-sm">Requester</th>
              <th className="pb-4 text-[#8a9bb0] text-sm">Location</th>
              <th className="pb-4 text-[#8a9bb0] text-sm">Notes</th>
              <th className="pb-4 text-[#8a9bb0] text-sm">Submitted</th>
              <th className="pb-4 text-[#8a9bb0] text-sm">Status</th>
              <th className="pb-4 text-right text-[#8a9bb0] text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan={6} className="py-14 text-center text-[#8a9bb0]">
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-14 text-center text-[#8a9bb0]">
                  <div className="flex flex-col items-center gap-2">
                    <Inbox size={22} className="text-[#3d5573]" />
                    No bank requests found
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((request) => {
                const cfg =
                  STATUS_CFG[request.status] ?? STATUS_CFG.pending;

                return (
                  <tr
                    key={request._id}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition"
                  >

                    {/* REQUESTER */}
                    <td className="py-5">
                      <p className="text-white font-medium">
                        {request.name}
                      </p>
                      <p className="text-[#7f92a6] text-sm flex items-center gap-1.5 mt-1">
                        <Mail size={13} />
                        {request.email}
                      </p>
                    </td>

                    {/* LOCATION */}
                    <td className="py-5 text-white text-sm">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#7f92a6]" />
                        {request.location || "—"}
                      </div>
                    </td>

                    {/* NOTES */}
                    <td className="py-5 text-[#9db0c3] text-sm max-w-[220px]">
                      <p className="truncate">
                        {request.notes || "—"}
                      </p>
                    </td>

                    {/* DATE */}
                    <td className="py-5 text-[#9db0c3] text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={15} />
                        {new Date(request.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* STATUS (inline quick-update) */}
                    <td className="py-5">
                      <div className="relative inline-block">
                        <select
                          value={request.status || "pending"}
                          onChange={(e) =>
                            quickUpdateStatus(
                              request._id,
                              e.target.value as RequestStatus
                            )
                          }
                          className={`appearance-none pl-3 pr-7 py-1.5 rounded-full text-xs font-medium border cursor-pointer focus:outline-none ${cfg.badge}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="in_review">In Review</option>
                          <option value="completed">Completed</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <span
                          className={`pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${cfg.dot}`}
                        />
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td className="py-5">
                      <div className="flex items-center justify-end gap-3">

                        {/* VIEW / DETAIL */}
                        <button
                          onClick={() => openDetail(request)}
                          className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/5 hover:bg-[#c9a84c]/10 flex items-center justify-center transition"
                        >
                          <Eye size={18} className="text-[#c9a84c]" />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => handleDelete(request._id)}
                          className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 flex items-center justify-center transition"
                        >
                          <Trash2 size={18} className="text-red-400" />
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })
            )}

          </tbody>
        </table>
      </div>

      {/* DETAIL / TRIAGE MODAL */}
      <Modal
        open={!!selected}
        onClose={closeDetail}
        title={selected?.name}
        description="Bank research request"
        size="md"
        footer={
          <>
            <button
              onClick={closeDetail}
              disabled={saving}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
            >
              Close
            </button>

            <button
              onClick={handleSaveDetail}
              disabled={saving}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#c9a84c] hover:bg-[#d4b567] text-[#0b1d2d] transition disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </>
        }
      >
        {selected && (
          <div className="space-y-5">

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">
                  Email
                </p>
                <p className="text-sm text-gray-900">{selected.email}</p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">
                  Location
                </p>
                <p className="text-sm text-gray-900">
                  {selected.location || "—"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">
                Requester Notes
              </p>
              <p className="text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 whitespace-pre-wrap">
                {selected.notes || "No additional notes provided."}
              </p>
            </div>

            {/* STATUS */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-2">
                Status
              </p>
              <select
                value={detailStatus}
                onChange={(e) =>
                  setDetailStatus(e.target.value as RequestStatus)
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#c9a84c]/60"
              >
                <option value="pending">Pending</option>
                <option value="in_review">In Review</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* ADMIN NOTES */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-2">
                Admin Notes (internal)
              </p>
              <textarea
                rows={3}
                value={detailAdminNotes}
                onChange={(e) => setDetailAdminNotes(e.target.value)}
                placeholder="Internal notes about research progress, decisions, etc."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#c9a84c]/60 resize-none"
              />
            </div>

          </div>
        )}
      </Modal>

    </div>
  );
}
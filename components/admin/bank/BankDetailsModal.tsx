"use client";

import Modal from "@/components/utils/modal/FormModel";

import {
  Globe,
  Download,
  FileText,
  Calendar,
  Landmark,
} from "lucide-react";

import { BankType } from "./bank.types";

type Props = {
  bank: BankType | null;

  open: boolean;

  onClose: (
    value: boolean
  ) => void;

  onEdit: (
    bank: BankType
  ) => void;

  onDelete: (
    id: string
  ) => void;
};

export default function BankDetailsModal({
  bank,
  open,
  onClose,
  onEdit,
  onDelete,
}: Props) {

  if (!bank) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={bank.name}
      size="xl"
    >

      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <span className="px-4 py-2 rounded-full bg-[#0B1D34] text-white text-sm">

            {bank.status}

          </span>

          {bank.lastReviewed && (

            <div className="flex items-center gap-2 text-sm text-gray-500">

              <Calendar size={15} />

              Reviewed:
              {" "}
              {new Date(
                bank.lastReviewed
              ).toLocaleDateString()}

            </div>

          )}

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <p className="text-xs uppercase text-gray-400">

              Type

            </p>

            <p className="font-medium mt-2">

              {bank.type || "-"}

            </p>

          </div>

          <div>

            <p className="text-xs uppercase text-gray-400">

              Location

            </p>

            <p className="font-medium mt-2">

              {bank.location || "-"}

            </p>

          </div>

          <div>

            <p className="text-xs uppercase text-gray-400">

              Founded

            </p>

            <p className="font-medium mt-2">

              {bank.founded || "-"}

            </p>

          </div>

        </div>

        {bank.website && (

          <a
            href={bank.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#c7a43a] font-medium"
          >

            <Globe size={16} />

            Visit Website

          </a>

        )}

        <div className="rounded-2xl bg-[#faf7f1] p-5 border-l-4 border-[#d4af37]">

          <p className="leading-7 text-gray-700 whitespace-pre-wrap">

            {bank.publicInfo}

          </p>

        </div>

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={() => {

              onClose(false);

              onEdit(bank);

            }}
            className="h-11 rounded-xl bg-amber-500 text-white font-medium"
          >

            Edit Bank

          </button>

          <button
            onClick={() =>
              onDelete(bank._id)
            }
            className="h-11 rounded-xl bg-red-500 text-white font-medium"
          >

            Delete Bank

          </button>

          <button
            onClick={() =>
              window.open(
                `${process.env.NEXT_PUBLIC_API_URL}api/banks/view-report/${bank._id}`,
                "_blank"
              )
            }
            className="h-11 rounded-xl border flex items-center justify-center gap-2"
          >

            <FileText size={16} />

            View Report

          </button>

          <button
            onClick={() =>
              window.open(
                `${process.env.NEXT_PUBLIC_API_URL}api/banks/download-report/${bank._id}`,
                "_blank"
              )
            }
            className="h-11 rounded-xl bg-[#0B1D34] text-white flex items-center justify-center gap-2"
          >

            <Download size={16} />

            Download

          </button>

        </div>

      </div>

    </Modal>
  );
}
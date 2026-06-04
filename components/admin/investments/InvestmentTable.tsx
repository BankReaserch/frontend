"use client";

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { Investment } from "./investment.types";

type Props = {
  investments: Investment[];

  onView: (
    investment: Investment
  ) => void;

  onEdit: (
    investment: Investment
  ) => void;

  onDelete: (
    id: string
  ) => void;
};

export default function InvestmentTable({
  investments,
  onView,
  onEdit,
  onDelete,
}: Props) {

  return (
    <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

      <div className="p-6 border-b">

        <h2 className="text-2xl font-bold text-[#051933]">
          Investments
        </h2>

      </div>

      <div className="divide-y">

        {investments.map(
          (investment) => (

            <div
              key={investment._id}
              className="p-5 flex items-center justify-between"
            >

              <div>

                <h3 className="font-semibold text-[#051933]">
                  {investment.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {investment.provider}
                </p>

              </div>

              <div className="flex items-center gap-2">

                <button
                  onClick={() =>
                    onView(
                      investment
                    )
                  }
                  className="w-10 h-10 rounded-xl border flex items-center justify-center"
                >
                  <Eye size={16} />
                </button>

                <button
                  onClick={() =>
                    onEdit(
                      investment
                    )
                  }
                  className="w-10 h-10 rounded-xl border flex items-center justify-center"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() =>
                    onDelete(
                      investment._id!
                    )
                  }
                  className="w-10 h-10 rounded-xl border border-red-200 text-red-500 flex items-center justify-center"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}
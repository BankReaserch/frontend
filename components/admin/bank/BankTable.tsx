"use client";

import {
  Building2,
  Globe,
  MapPin,
  Calendar,
  Landmark,
  ChevronRight,
} from "lucide-react";

import { BankType } from "./bank.types";

type Props = {
  banks: BankType[];

  onSelect: (
    bank: BankType
  ) => void;
};

export default function BankTable({
  banks,
  onSelect,
}: Props) {

  const getStatusClass = (
    status: string
  ) => {

    switch (status) {

      case "Mehudar":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";

      case "Compliant":
        return "bg-blue-50 text-blue-700 border border-blue-200";

      case "Conditional":
        return "bg-amber-50 text-amber-700 border border-amber-200";

      case "Questionable":
        return "bg-orange-50 text-orange-700 border border-orange-200";

      case "Noncompliant":
        return "bg-red-50 text-red-700 border border-red-200";

      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

      {/* HEADER */}

      <div className="px-8 py-6 border-b bg-gradient-to-r from-[#faf7f1] to-white">

        <p className="text-xs tracking-[3px] uppercase text-[#c7a43a] font-semibold">

          Directory

        </p>

        <h2 className="text-3xl font-bold text-[#0B1D34] mt-2">

          Banks Directory

        </h2>

        <p className="text-gray-500 mt-1">

          Click any bank to view detailed information and reports

        </p>

      </div>

      {/* CONTENT */}

      <div className="max-h-[850px] overflow-y-auto custom-scrollbar p-5 space-y-4">

        {banks.length === 0 && (

          <div className="text-center py-20">

            <Building2
              className="mx-auto text-gray-300"
              size={50}
            />

            <p className="text-gray-500 mt-4">

              No banks found

            </p>

          </div>

        )}

        {banks.map(
          (bank) => (

            <button
              key={bank._id}
              onClick={() =>
                onSelect(bank)
              }
              className="
                group
                w-full
                text-left
                bg-white
                border
                rounded-3xl
                p-6
                hover:border-[#c7a43a]
                hover:shadow-xl
                transition-all
                duration-300
              "
            >

              <div className="flex justify-between gap-6">

                {/* LEFT */}

                <div className="flex gap-4 flex-1">

                  {/* ICON */}

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-[#f5f1e7]
                      flex
                      items-center
                      justify-center
                      text-[#c7a43a]
                      shrink-0
                    "
                  >

                    <Building2 size={24} />

                  </div>

                  {/* CONTENT */}

                  <div className="flex-1">

                    <div className="flex items-center gap-3 flex-wrap">

                      <h3 className="text-xl font-bold text-[#0B1D34]">

                        {bank.name}

                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                          bank.status
                        )}`}
                      >

                        {bank.status}

                      </span>

                    </div>

                    <p className="text-gray-600 mt-1">

                      {bank.type}

                    </p>

                    {/* DETAILS */}

                    <div className="flex flex-wrap gap-5 mt-4 text-sm text-gray-500">

                      <div className="flex items-center gap-2">

                        <MapPin size={15} />

                        {bank.location}

                      </div>

                      {bank.founded && (

                        <div className="flex items-center gap-2">

                          <Calendar size={15} />

                          Founded {bank.founded}

                        </div>

                      )}

                      {bank.assets && (

                        <div className="flex items-center gap-2">

                          <Landmark size={15} />

                          {bank.assets}

                        </div>

                      )}

                    </div>

                    {/* WEBSITE */}

                    {bank.website && (

                      <div className="mt-4">

                        <a
                          href={
                            bank.website.startsWith(
                              "http"
                            )
                              ? bank.website
                              : `https://${bank.website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                          className="
                            inline-flex
                            items-center
                            gap-2
                            text-[#0B1D34]
                            hover:text-[#c7a43a]
                            transition
                            underline
                            text-sm
                          "
                        >

                          <Globe size={15} />

                          {bank.website}

                        </a>

                      </div>

                    )}

                    {/* INFO */}

                    {bank.publicInfo && (

                      <p className="mt-4 text-sm text-gray-500 line-clamp-2">

                        {bank.publicInfo}

                      </p>

                    )}

                  </div>

                </div>

                {/* RIGHT */}

                <div
                  className="
                    hidden
                    md:flex
                    items-center
                    text-[#c7a43a]
                    group-hover:translate-x-1
                    transition
                  "
                >

                  <ChevronRight
                    size={24}
                  />

                </div>

              </div>

            </button>
          )
        )}

      </div>

    </div>
  );
}
// BankListCard.tsx

"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Loader2,
} from "lucide-react";

import BankStatusBadge
from "../../BankStatusBadge";

type Bank = {
  _id: string;

  name: string;

  status:
    | "mehudar"
    | "compliant"
    | "conditional"
    | "questionable"
    | "noncompliant"
    | "undetermined";

  type: string;
};

export default function BankListCard() {

  const [banks, setBanks] =
    useState<Bank[]>([]);

  const [loading, setLoading] =
    useState(true);

  /*
  ========================================
  AXIOS
  ========================================
  */

  const api = axios.create({
    baseURL:
      process.env
        .NEXT_PUBLIC_API_URL,
  });

  /*
  ========================================
  FETCH BANKS
  ========================================
  */

  useEffect(() => {

    const fetchBanks =
      async () => {

        try {

          const response =
            await api.get(
              "/api/banks/all"
            );

          if (
            response.data
              .success
          ) {

            const formatted =
              (
                response
                  .data
                  .data || []
              ).map(
                (
                  bank: any
                ) => ({
                  ...bank,

                  status:
                    bank.status
                      ?.toLowerCase(),
                })
              );

            setBanks(
              formatted
            );
          }

        } catch (error) {

          console.error(
            "Failed to fetch banks:",
            error
          );

        } finally {

          setLoading(false);
        }
      };

    fetchBanks();

  }, []);

  return (
    <div className="bg-[#13263A] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-lg">

      {/* HEADER */}
      <div className="px-5 py-4 border-b border-white/10 text-[#C8A75B] text-sm flex items-center gap-2">

        🔍 KOSHER BANK DIRECTORY

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="flex items-center justify-center py-16">

          <div className="flex items-center gap-3 text-white/70">

            <Loader2 className="w-5 h-5 animate-spin" />

            Loading banks...

          </div>

        </div>

      ) : banks.length ===
        0 ? (

        <div className="text-center py-16 text-white/50">

          No banks available

        </div>

      ) : (

        /* LIST */
        <div>

          {banks
            .slice(0, 6)
            .map(
              (
                bank
              ) => (

                <div
                  key={
                    bank._id
                  }
                  className="flex items-center justify-between px-5 py-4 border-b border-white/5 last:border-none"
                >

                  <div>

                    <span className="text-white/90 text-sm block">

                      {
                        bank.name
                      }

                    </span>

                    <span className="text-white/40 text-xs mt-1 block">

                      {
                        bank.type
                      }

                    </span>

                  </div>

                  <BankStatusBadge
                    status={
                      bank.status
                    }
                    label={
                      bank.status.charAt(
                        0
                      ).toUpperCase() +
                      bank.status.slice(
                        1
                      )
                    }
                  />

                </div>
              )
            )}

        </div>
      )}

    </div>
  );
}
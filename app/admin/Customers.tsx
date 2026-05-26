"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  Search,
  UserX,
  UserCheck,
  Loader2,
  Mail,
  Shield,
} from "lucide-react";

type UserType = {
  _id: string;

  name?: string;

  email: string;

  role: string;

  isActive: boolean;

  createdAt: string;
};

export default function Customers() {

  const [users, setUsers] =
    useState<UserType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [actionLoading, setActionLoading] =
    useState("");

  /*
  ========================================
  AXIOS INSTANCE
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
  FETCH USERS
  ========================================
  */

  const fetchUsers =
    async () => {

      try {

        const response =
          await api.get(
            "/api/users/allusers"
          );

        if (
          response.data
            .success
        ) {

          setUsers(
            response.data
              .data || []
          );
        }

      } catch (error) {

        console.error(
          "Fetch users failed:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchUsers();

  }, []);

  /*
  ========================================
  SEARCH FILTER
  ========================================
  */

  const filteredUsers =
    useMemo(() => {

      return users.filter(
        (user) =>
          user.email
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          user?.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [users, search]);

  /*
  ========================================
  TOGGLE STATUS
  ========================================
  */

  const toggleUserStatus =
    async (
      userId: string,
      currentStatus: boolean
    ) => {

      try {

        setActionLoading(
          userId
        );

        const response =
          await api.patch(
            `/api/users/toggle-status/${userId}`,
            {
              isActive:
                !currentStatus,
            }
          );

        if (
          response.data
            .success
        ) {

          setUsers(
            (prev) =>
              prev.map(
                (user) =>
                  user._id ===
                  userId
                    ? {
                        ...user,
                        isActive:
                          !currentStatus,
                      }
                    : user
              )
          );
        }

      } catch (error) {

        console.error(
          "Toggle status failed:",
          error
        );

      } finally {

        setActionLoading(
          ""
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
      <div className="bg-white rounded-3xl p-10 border shadow-sm min-h-[300px] flex items-center justify-center">

        <div className="flex items-center gap-3 text-[#0B1D34] font-semibold">

          <Loader2 className="animate-spin w-5 h-5" />

          Loading customers...

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-3xl border shadow-sm p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <h1 className="text-4xl font-bold text-[#0B1D34]">

            Customers

          </h1>

          <p className="text-gray-500 mt-2">

            Manage customers,
            monitor accounts and
            control user access.

          </p>

        </div>

        {/* SEARCH */}
        <div className="relative w-full lg:w-[340px]">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full pl-11 pr-4 py-3 rounded-2xl border bg-[#f7f3eb] outline-none focus:ring-2 focus:ring-[#d4af37]"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#0B1D34] text-white">

              <tr>

                <th className="text-left px-6 py-4 font-medium">

                  Customer

                </th>

                <th className="text-left px-6 py-4 font-medium">

                  Role

                </th>

                <th className="text-left px-6 py-4 font-medium">

                  Joined

                </th>

                <th className="text-left px-6 py-4 font-medium">

                  Status

                </th>

                <th className="text-right px-6 py-4 font-medium">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.length ===
              0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="text-center py-16 text-gray-500"
                  >

                    No customers found

                  </td>

                </tr>

              ) : (

                filteredUsers.map(
                  (user) => (

                    <tr
                      key={
                        user._id
                      }
                      className="border-b last:border-none hover:bg-[#faf7f1] transition"
                    >

                      {/* USER */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-4">

                          <div className="w-12 h-12 rounded-full bg-[#d4af37] text-[#0B1D34] font-bold flex items-center justify-center text-lg">

                            {(
                              user.name ||
                              user.email
                            )
                              .charAt(
                                0
                              )
                              .toUpperCase()}

                          </div>

                          <div>

                            <h3 className="font-semibold text-[#0B1D34]">

                              {user.name ||
                                "Unnamed User"}

                            </h3>

                            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">

                              <Mail className="w-4 h-4" />

                              {
                                user.email
                              }

                            </div>

                          </div>

                        </div>

                      </td>

                      {/* ROLE */}
                      <td className="px-6 py-5">

                        <div className="inline-flex items-center gap-2 bg-[#f5f0e8] text-[#0B1D34] px-3 py-1 rounded-full text-sm font-medium">

                          <Shield className="w-4 h-4" />

                          {
                            user.role
                          }

                        </div>

                      </td>

                      {/* DATE */}
                      <td className="px-6 py-5 text-gray-600">

                        {new Date(
                          user.createdAt
                        ).toLocaleDateString()}

                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">

                        <span
                          className={`px-4 py-1 rounded-full text-sm font-medium ${
                            user.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >

                          {user.isActive
                            ? "Active"
                            : "Inactive"}

                        </span>

                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-5 text-right">

                        <button
                          onClick={() =>
                            toggleUserStatus(
                              user._id,
                              user.isActive
                            )
                          }
                          disabled={
                            actionLoading ===
                            user._id
                          }
                          className={`inline-flex items-center gap-2 px-5 py-2 rounded-2xl font-medium transition ${
                            user.isActive
                              ? "bg-red-500 hover:bg-red-600 text-white"
                              : "bg-green-600 hover:bg-green-700 text-white"
                          }`}
                        >

                          {actionLoading ===
                          user._id ? (

                            <Loader2 className="w-4 h-4 animate-spin" />

                          ) : user.isActive ? (

                            <UserX className="w-4 h-4" />

                          ) : (

                            <UserCheck className="w-4 h-4" />

                          )}

                          {user.isActive
                            ? "Deactivate"
                            : "Activate"}

                        </button>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardHeader from "./components/DashboardHeader";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter()

  const [loading, setLoading] =
    useState(true);

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {

    let isMounted = true;

    const verifyUser =
      async () => {

        try {

          const response =
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}api/auth/me`,
              {
                method: "GET",

                credentials:
                  "include",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                cache: "no-store",
              }
            );

          if (!response.ok) {
            router.push("/login")
            return;
          }

          const data =
            await response.json();
          if (
            !data?.user ||
            data.user.role !==
            "user"
          ) {
            router.push('/login');
            return;
          }

          if (isMounted) {
            setAuthorized(true);
          }

        } catch (error) {
          console.error(error);
          router.push('/login');
        } finally {

          if (isMounted) {
            setLoading(false);
          }
        }
      };

    verifyUser();

    return () => {
      isMounted = false;
    };

  }, []);

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        Verifying access...

      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div>

      <DashboardHeader
        title="Dashboard"
        subtitle="Welcome back to your learning center."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white rounded-2xl border p-6">

          <p className="text-sm text-gray-500">
            Total Orders
          </p>

          <h2 className="text-4xl font-bold mt-2">
            0
          </h2>

        </div>

        <div className="bg-white rounded-2xl border p-6">

          <p className="text-sm text-gray-500">
            Books Owned
          </p>

          <h2 className="text-4xl font-bold mt-2">
            0
          </h2>

        </div>

        <div className="bg-white rounded-2xl border p-6">

          <p className="text-sm text-gray-500">
            Downloads
          </p>

          <h2 className="text-4xl font-bold mt-2">
            0
          </h2>

        </div>

      </div>

    </div>
  );
}
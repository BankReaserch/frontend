import { cookies } from "next/headers";

import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";

import DashboardSidebar
from "./components/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieStore =
    cookies();

  const token =
    (
      await cookieStore
    ).get("token")
      ?.value;

  // ❌ No token
  if (!token) {
    redirect("/login");
  }

  try {

    const decoded: any =
      jwt.verify(
        token,
        process.env
          .JWT_SECRET!
      );

    // ❌ Block admin
    if (
      decoded.role !==
      "user"
    ) {
      redirect("/");
    }

  } catch {

    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex">

      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto p-8">

        {children}

      </main>

    </div>
  );
}
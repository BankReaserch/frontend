import DashboardSidebar from "./components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex">

      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto p-8">

        {children}

      </main>

    </div>
  );
}
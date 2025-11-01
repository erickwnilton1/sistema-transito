import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SidebarAdminApp from "./_components/layout/sidebar-admin-app";
import LogoutButton from "../_components/logout-button-app";
import { DashboardCards } from "./_components/dashboard/dashboardCards";
import { DashboardTable } from "./_components/dashboard/dashboardTable";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await (await import("next/headers")).headers(),
  });

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/acesso-negado");
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <Sidebar className="border-r shadow-sm">
          <SidebarAdminApp />
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b p-4 bg-blue-950 shadow-sm">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-white" />
              <h1 className="text-xl font-bold text-white">
                Painel Administrativo
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-200">
                Administrador: {session.user.name} | Matrícula:{" "}
                {session.user.registration}
              </p>
              <LogoutButton />
            </div>
          </header>

          <main className="p-5">
            <h1 className="text-2xl font-semibold mb-5">Dashboard</h1>
            <DashboardCards />
            <DashboardTable />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

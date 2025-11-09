import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SidebarAdminApp from "./_components/layout/sidebar-admin-app";
import LogoutButton from "../../_components/logout-button-app";
import { DashboardCards } from "./_components/dashboard/dashboardCards";
import { DashboardTable } from "./_components/dashboard/dashboardTable";
import { AgentesTable } from "../admin-agentes-sistema/_components/table";
import { DashboardCharts } from "./_components/dashboard/dashboardCharts";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await (await import("next/headers")).headers(),
  });

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/acesso-negado");
  }

  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
        <Sidebar className="border-r shadow-sm max-md:hidden">
          <SidebarAdminApp />
        </Sidebar>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex items-center justify-between border-b p-4 bg-blue-950 shadow-sm">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-white" />
              <h1 className="text-xl font-bold text-white">
                Painel Administrativo
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">
                Administrador: {session.user.name} | Matrícula:{" "}
                {session.user.registration}
              </p>
              <LogoutButton />
            </div>
          </header>

          <main className="p-4 sm:p-5 flex-1 overflow-y-auto bg-gray-50">
            <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-5">
              Dashboard
            </h1>

            <div className="flex flex-col gap-5">
              <div className="w-full">
                <DashboardCards />
              </div>

              <div className="hidden md:block">
                <DashboardCharts />
              </div>
              <div className="md:hidden">
                <div className="flex items-center justify-center p-6 bg-gray-100 rounded-lg shadow-sm text-gray-500 text-center text-sm">
                  📊{" "}
                  <strong>
                    A visualização de gráficos é otimizada para telas maiores.{" "}
                    <br /> Acesse pelo computador para ver as análises
                    completas.
                  </strong>
                </div>
              </div>

              <DashboardTable />

              <div className="overflow-x-auto rounded-lg shadow-sm bg-white">
                <AgentesTable />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

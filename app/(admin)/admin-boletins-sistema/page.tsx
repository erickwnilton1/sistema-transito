import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SidebarMenuApp from "../admin-sistema/_components/layout/sidebar-admin-app";
import LogoutButton from "../../_components/logout-button-app";
import { BoletinsTable } from "./_components/boletins-table";

export default async function AdminBoletinsPage() {
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
          <SidebarMenuApp />
        </Sidebar>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex items-center justify-between border-b p-4 bg-blue-950 shadow-sm">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-white" />
              <h1 className="text-xl font-bold text-white">
                Painel Administrativo
              </h1>
            </div>

            <LogoutButton />
          </header>

          <main className="p-4 sm:p-5 flex-1 overflow-y-auto bg-gray-50">
            <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-5">
              Boletins Cadastrados
            </h1>

            <div className="overflow-x-auto rounded-lg shadow-sm bg-white">
              <BoletinsTable />
            </div>

            <p className="text-xs text-gray-500 mt-2 text-center sm:hidden">
              🔍 Deslize para o lado para ver todas as colunas.
            </p>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

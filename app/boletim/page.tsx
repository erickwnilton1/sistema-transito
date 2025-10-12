import { auth } from "@/lib/auth";
import LogoutButton from "../_components/logout-button-app";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarMenuApp from "@/app/_components/sidebar-menu-app";
import BoletimForm from "../_components/bulletin-form-app";
import { redirect } from "next/navigation";

export default async function BoletimPage() {
  const session = await auth.api.getSession({
    headers: await (await import("next/headers")).headers(),
  });

  if (!session?.user) {
    redirect("/acesso-negado");
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <Sidebar className="border-r shadow-sm">
          <SidebarMenuApp />
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b p-4 bg-blue-950 shadow-sm">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-white" />
              <h1 className="text-xl font-bold text-white">
                Boletim de Sinistro de Trânsito
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-500">
                Agente: {session.user.name} | Matrícula:{" "}
                {session.user.registration}
              </p>
              <LogoutButton />
            </div>
          </header>

          <main className="flex flex-1 items-center justify-center bg-gray-100">
            <BoletimForm />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

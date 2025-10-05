import { auth } from "@/lib/auth";
import LogoutButton from "../_components/logout-button-app";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, FileText, Settings, ThumbsUp } from "lucide-react";
import BoletimForm from "../_components/bulletin-form-app";

export default async function BoletimPage() {
  const session = await auth.api.getSession({
    headers: await (await import("next/headers")).headers(),
  });

  if (!session?.user) {
    return <p className="p-8 text-red-500">Acesso negado. Faça login.</p>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <Sidebar className="border-r shadow-sm">
          <SidebarContent className="p-4 bg-blue-950">
            <SidebarGroup>
              <SidebarGroupLabel className="text-2xl font-semibold text-white mb-5">
                Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="mt-2 space-y-2">
                  <SidebarMenuItem className="flex items-center text-white gap-2 cursor-pointer hover:text-yellow-500">
                    <Home className="h-4 w-4" /> Boletim
                  </SidebarMenuItem>
                  <SidebarMenuItem className="flex items-center text-white gap-2 cursor-pointer hover:text-yellow-500">
                    <FileText className="h-4 w-4" /> Histórico
                  </SidebarMenuItem>
                  <SidebarMenuItem className="flex items-center text-white gap-2 cursor-pointer hover:text-yellow-500">
                    <ThumbsUp className="h-4 w-4" /> Orientações
                  </SidebarMenuItem>
                  <SidebarMenuItem className="flex items-center text-white gap-2 cursor-pointer hover:text-yellow-500">
                    <Settings className="h-4 w-4" /> Suporte
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b p-4 bg-blue-950 shadow-sm">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
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

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Home, FileText, Settings, ThumbsUp } from "lucide-react";

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
        <Sidebar className="border-rshadow-sm">
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
                  <SidebarMenuItem className="flex items-center text-white gap-2 cursor-pointer  hover:text-yellow-500">
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
                Boletim de Ocorrência
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-500">
                Usuário: {session.user.name} | Matrícula:{" "}
                {session.user.registration}
              </p>
              <LogoutButton />
            </div>
          </header>

          <main className="flex flex-1 items-center justify-center bg-gray-100">
            <Card className="w-full max-w-2xl shadow-lg border border-gray-200 m-5">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Preencha o Boletim
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="step1" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-200 rounded-md">
                    <TabsTrigger value="step1">Passo 1</TabsTrigger>
                    <TabsTrigger value="step2">Passo 2</TabsTrigger>
                    <TabsTrigger value="step3">Finalizar</TabsTrigger>
                  </TabsList>

                  {/* Passo 1 */}
                  <TabsContent value="step1" className="mt-2">
                    <form className="space-y-4">
                      <Input placeholder="Nome do denunciante" />
                      <Input placeholder="Contato" />
                      <div className="flex justify-end">
                        <Button type="button">Próximo</Button>
                      </div>
                    </form>
                  </TabsContent>

                  {/* Passo 2 */}
                  <TabsContent value="step2" className="mt-2">
                    <form className="space-y-4">
                      <Input placeholder="Local da ocorrência" />
                      <Textarea placeholder="Descrição do ocorrido" />
                      <div className="flex justify-between">
                        <Button variant="outline" type="button">
                          Voltar
                        </Button>
                        <Button type="button">Próximo</Button>
                      </div>
                    </form>
                  </TabsContent>

                  {/* Passo 3 */}
                  <TabsContent value="step3" className="mt-2">
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        Revise os dados e confirme o envio do boletim.
                      </p>
                      <div className="flex justify-between">
                        <Button variant="outline" type="button">
                          Voltar
                        </Button>
                        <Button type="submit" className="w-40">
                          Enviar Boletim
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

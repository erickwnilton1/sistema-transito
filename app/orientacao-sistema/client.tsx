"use client";

import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarMenuApp from "../_components/sidebar-menu-app";
import LogoutButton from "../_components/logout-button-app";

export default function OrientacaoClient() {
  const topicos = [
    {
      titulo: "Acesso ao Sistema",
      conteudo:
        "Os agentes da GCM Ipojuca devem acessar o sistema utilizando seu Login e senha. Em caso de esquecimento de senha, contate o Suporte Técnico.",
    },
    {
      titulo: "Registro de Boletins",
      conteudo:
        "Preencha todos os campos obrigatórios do boletim. Utilize os campos de seleção (Select) para classificações e condições da via. Adicione veículos e condutores conforme a ocorrência.",
    },
    {
      titulo: "Fluxo de Preenchimento",
      conteudo: (
        <ol className="list-decimal pl-5 space-y-1">
          <li>Acesse o sistema com Login e senha.</li>
          <li>Você acessará direto o formulário.</li>
          <li>Preencha as informações solicitadas.</li>
          <li>Adicione os veículos e condutores envolvidos.</li>
          <li>Revise e clique em “Salvar Boletim”.</li>
        </ol>
      ),
    },
    {
      titulo: "Boas Práticas",
      conteudo:
        "Sempre confirme os dados antes de salvar. Utilize descrições objetivas para pontos de referência. Em caso de dúvidas, consulte o manual do usuário fornecido pelo setor de suporte.",
    },
  ];

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
                Central de Suporte - Orientações para Agentes
              </h1>
            </div>
            <LogoutButton />
          </header>

          <main className="flex-1 overflow-auto bg-gray-100 p-12">
            <div className="space-y-10">
              {topicos.map((topico, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md border border-gray-200"
                >
                  <h2 className="text-2xl font-semibold text-blue-950 mb-4">
                    {topico.titulo}
                  </h2>
                  <div className="text-gray-700 text-base">
                    {topico.conteudo}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-blue-950 mb-6">
                Fluxo de Atendimento
              </h2>
              <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between space-y-6 md:space-y-0 md:space-x-6">
                {["Cadastro", "Login", "Novo Boletim", "Revisão", "Salvar"].map(
                  (etapa, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center bg-white shadow p-6 rounded-xl w-full md:w-1/5"
                    >
                      <div className="font-semibold mb-2 text-center">
                        {etapa}
                      </div>
                      <div className="text-sm text-gray-600 text-center">
                        {etapa === "Cadastro" &&
                          "Insira seu Nome, E-mail, Matricula e Senha."}
                        {etapa === "Login" && "Acesse com E-mail e Senha."}
                        {etapa === "Novo Boletim" &&
                          "Preencha todos os dados solicitados e clique em Salvar Boletim."}
                        {etapa === "Revisão" &&
                          "Verifique todos os dados antes de salvar."}
                        {etapa === "Salvar" && "Confirme e registre o boletim."}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

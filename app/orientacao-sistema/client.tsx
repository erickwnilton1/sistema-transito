"use client";

import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarMenuApp from "../_components/sidebar-menu-app";
import LogoutButton from "../_components/logout-button-app";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  UserPlus,
  ClipboardList,
  FileText,
  Mail,
  HelpCircle,
} from "lucide-react";

export default function OrientacaoClient() {
  const secoes = [
    {
      titulo: "1. Cadastro do Agente",
      icone: <UserPlus className="w-6 h-6 md:w-7 md:h-7 text-blue-900" />,
      conteudo: (
        <>
          <p>
            O acesso ao sistema é exclusivo para agentes da AMTTRANS. Cada
            matrícula já foi previamente cadastrada no banco de dados.
          </p>
          <p className="mt-2">
            No primeiro acesso, o agente deve realizar seu <b>cadastro</b>,
            informando:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Nome completo</li>
            <li>E-mail institucional</li>
            <li>Matrícula funcional</li>
            <li>Senha de acesso</li>
          </ul>
          <p className="mt-2">
            Após o cadastro, o sistema validará sua matrícula e o redirecionará
            automaticamente para a tela principal.
          </p>
        </>
      ),
    },
    {
      titulo: "2. Preenchimento do Boletim de Trânsito",
      icone: <ClipboardList className="w-6 h-6 md:w-7 md:h-7 text-blue-900" />,
      conteudo: (
        <>
          <p>
            Ao acessar a tela principal, o agente deverá preencher todas as
            informações solicitadas no formulário do boletim. O botão{" "}
            <b>“Salvar Boletim”</b> só será habilitado após o preenchimento de
            todos os campos obrigatórios e a adição de pelo menos{" "}
            <b>1 veículo</b>.
          </p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Preencha os dados gerais da ocorrência.</li>
            <li>Informe o local, data e hora do sinistro.</li>
            <li>Descreva as condições da via e do tempo.</li>
            <li>Adicione os veículos e condutores envolvidos.</li>
            <li>Revise todos os campos e clique em “Salvar Boletim”.</li>
          </ol>
        </>
      ),
    },
    {
      titulo: "3. Histórico e Consulta de Boletins",
      icone: <FileText className="w-6 h-6 md:w-7 md:h-7 text-blue-900" />,
      conteudo: (
        <>
          <p>
            Após salvar o boletim, ele ficará disponível na página{" "}
            <b>Histórico</b>. Cada boletim será exibido em um card contendo as
            informações principais.
          </p>
          <p className="mt-2">
            No card do boletim, estarão disponíveis duas ações:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <b>Visualizar Detalhes:</b> abre um modal com informações
              completas do boletim, veículos e condutores.
            </li>
            <li>
              <b>Gerar Declaração:</b> permite inserir o e-mail do cidadão
              envolvido para o envio automático da <b>Declaração do Condutor</b>
              .
            </li>
          </ul>
        </>
      ),
    },
    {
      titulo: "4. Envio da Declaração por E-mail",
      icone: <Mail className="w-6 h-6 md:w-7 md:h-7 text-blue-900" />,
      conteudo: (
        <>
          <p>
            O cidadão que se envolveu no sinistro receberá um e-mail contendo:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Um comprovante de registro do boletim.</li>
            <li>
              Um arquivo PDF da <b>Declaração do Condutor</b>, que deverá ser
              preenchida à mão e assinada.
            </li>
          </ul>
          <p className="mt-2">Após preencher, o cidadão poderá:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Responder ao e-mail anexando a declaração preenchida, ou</li>
            <li>Entregar presencialmente na sede da secretaria.</li>
          </ul>
        </>
      ),
    },
    {
      titulo: "5. Suporte e Orientações Gerais",
      icone: <HelpCircle className="w-6 h-6 md:w-7 md:h-7 text-blue-900" />,
      conteudo: (
        <>
          <p>
            Caso o agente encontre dificuldades ou tenha dúvidas sobre o uso do
            sistema, poderá acessar a tela de <b>Suporte</b> no menu lateral.
          </p>
          <p className="mt-2">
            Lá, será possível entrar em contato com a equipe técnica responsável
            para relatar problemas, obter ajuda ou enviar sugestões de melhoria.
          </p>
          <p className="mt-2">
            Recomendamos manter sempre os dados atualizados e evitar o uso
            compartilhado de logins.
          </p>
        </>
      ),
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar className="border-r shadow-sm">
          <SidebarMenuApp />
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b p-3 md:p-4 bg-blue-950 shadow-sm">
            <div className="flex items-center gap-2 md:gap-3">
              <SidebarTrigger className="text-white" />
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">
                Central de Orientação — Agentes de Trânsito
              </h1>
            </div>
            <LogoutButton />
          </header>

          <main className="flex-1 overflow-auto bg-gray-100 p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 sm:space-y-8"
            >
              {secoes.map((secao, i) => (
                <Card
                  key={i}
                  className="p-4 sm:p-6 md:p-8 border border-gray-200 shadow-md rounded-xl bg-white"
                >
                  <CardHeader className="flex flex-row items-center gap-3 pb-3 md:pb-4">
                    {secao.icone}
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-950">
                      {secao.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {secao.conteudo}
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

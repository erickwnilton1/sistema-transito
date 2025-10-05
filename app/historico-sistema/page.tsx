"use client";

import { useState, useEffect } from "react";
import SidebarMenuApp from "../_components/sidebar-menu-app";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import LogoutButton from "../_components/logout-button-app";

type Boletim = {
  id: string;
  protocolo: string;
  rua: string;
  bairro: string;
  pontoReferencia: string;
  dataOcorrencia: string;
  horaOcorrencia: string;
  tipoClassificacao: string;
  fatais: number;
  naoFatais: number;
  createdAt: string;
};

export default function HistoricoPage() {
  const [boletins, setBoletins] = useState<Boletim[]>([]);

  useEffect(() => {
    setBoletins([
      {
        id: "1",
        protocolo: "PROT-20251005-001",
        rua: "Rua A",
        bairro: "Centro",
        pontoReferencia: "Casa de José",
        dataOcorrencia: "2025-10-05",
        horaOcorrencia: "14:30",
        tipoClassificacao: "COM VÍTIMA",
        fatais: 0,
        naoFatais: 2,
        createdAt: "2025-10-05 14:40",
      },
      {
        id: "2",
        protocolo: "PROT-20251004-002",
        rua: "Av. B",
        bairro: "Jardim",
        pontoReferencia: "Esquina da padaria",
        dataOcorrencia: "2025-10-04",
        horaOcorrencia: "10:15",
        tipoClassificacao: "SEM VÍTIMA",
        fatais: 0,
        naoFatais: 1,
        createdAt: "2025-10-04 10:20",
      },
    ]);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <Sidebar className="w-64 border-r shadow-sm">
          <SidebarMenuApp />
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="flex items-center justify-between border-b p-4 bg-blue-950 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-white" />
              <h1 className="text-xl font-bold text-white">
                Histórico de Boletins
              </h1>
            </div>
            <LogoutButton />
          </header>

          <main className="flex-1 overflow-auto bg-gray-100 p-6">
            <ScrollArea className="flex-1 space-y-6">
              {" "}
              {boletins.map((b) => (
                <Card key={b.id} className="bg-white shadow-md border">
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-lg font-bold">
                      Protocolo: {b.protocolo}
                    </CardTitle>
                    <span className="text-sm text-gray-500">{b.createdAt}</span>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p>
                      <strong>Rua:</strong> {b.rua}
                    </p>
                    <p>
                      <strong>Bairro:</strong> {b.bairro}
                    </p>
                    <p>
                      <strong>Ponto de Referência:</strong> {b.pontoReferencia}
                    </p>
                    <p>
                      <strong>Data da Ocorrência:</strong> {b.dataOcorrencia}
                    </p>
                    <p>
                      <strong>Hora:</strong> {b.horaOcorrencia}
                    </p>
                    <p>
                      <strong>Classificação:</strong> {b.tipoClassificacao}
                    </p>
                    <p>
                      <strong>Fatais:</strong> {b.fatais}
                    </p>
                    <p>
                      <strong>Não Fatais:</strong> {b.naoFatais}
                    </p>
                  </CardContent>
                  <div className="flex justify-end p-4">
                    <Button size="sm" variant="outline">
                      Visualizar Detalhes
                    </Button>
                  </div>
                </Card>
              ))}
            </ScrollArea>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

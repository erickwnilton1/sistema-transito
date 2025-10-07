"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import SidebarMenuApp from "../_components/sidebar-menu-app";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LogoutButton from "../_components/logout-button-app";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ModalBoletim from "@/app/_components/bulletin-modal-app";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function HistoricoPage() {
  const [boletins, setBoletins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBoletim, setSelectedBoletim] = useState<any | null>(null);

  useEffect(() => {
    const fetchBoletins = async () => {
      try {
        const res = await axios.get("/api/boletim");
        setBoletins(res.data);
      } catch (err) {
        console.error("Erro ao buscar boletins:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBoletins();
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
            {loading ? (
              <p>Carregando boletins...</p>
            ) : boletins.length === 0 ? (
              <p>Nenhum boletim encontrado.</p>
            ) : (
              <ScrollArea className="flex-1 space-y-6">
                {boletins.map((b) => (
                  <Card
                    key={b.id}
                    className="bg-white shadow-md border rounded-xl"
                  >
                    <CardHeader className="flex justify-between items-center">
                      <CardTitle className="text-lg font-bold">
                        Protocolo:{" "}
                        <span className="bg-blue-950 text-white px-2 py-1 rounded">
                          {b.protocolo}
                        </span>
                      </CardTitle>
                      <span className="text-sm text-gray-500">
                        {new Date(b.createdAt).toLocaleString()}
                      </span>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <p>
                        <strong>Rua:</strong> {b.rua}
                      </p>
                      <p>
                        <strong>Bairro:</strong> {b.bairro}
                      </p>
                      <p>
                        <strong>Ponto de Referência:</strong>{" "}
                        {b.pontoReferencia}
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
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedBoletim(b)}
                      >
                        Visualizar Detalhes
                      </Button>
                    </div>
                  </Card>
                ))}
              </ScrollArea>
            )}
          </main>
        </div>

        {selectedBoletim && (
          <ModalBoletim
            boletim={selectedBoletim}
            onClose={() => setSelectedBoletim(null)}
          />
        )}
      </div>
    </SidebarProvider>
  );
}

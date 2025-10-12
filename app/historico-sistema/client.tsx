"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import SidebarMenuApp from "../_components/sidebar-menu-app";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LogoutButton from "../_components/logout-button-app";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/hooks/format-date-time";
import ModalBoletim from "@/app/_components/bulletin-modal-app";
import ModalSendEmail from "../_components/modal-send-email-app";
import { MapPin, Calendar, Clock, AlertCircle, User, Map } from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function HistoricoClient() {
  const [boletins, setBoletins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBoletim, setSelectedBoletim] = useState<any | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [boletimEmail, setBoletimEmail] = useState<any | null>(null);

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
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                  >
                    <CardHeader className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2">
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

                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-b-2xl">
                      <Info
                        icon={<Map className="w-4 h-4 text-gray-500" />}
                        label="Rua"
                        value={b.rua}
                      />
                      <Info
                        icon={<MapPin className="w-4 h-4 text-gray-500" />}
                        label="Bairro"
                        value={b.bairro}
                      />
                      <Info
                        icon={<MapPin className="w-4 h-4 text-gray-500" />}
                        label="Ponto de Referência"
                        value={b.pontoReferencia}
                      />
                      <Info
                        icon={<Calendar className="w-4 h-4 text-gray-500" />}
                        label="Data da Ocorrência"
                        value={formatDateTime(b.dataOcorrencia, false)}
                      />
                      <Info
                        icon={<Clock className="w-4 h-4 text-gray-500" />}
                        label="Hora"
                        value={b.horaOcorrencia}
                      />
                      <Info
                        icon={<AlertCircle className="w-4 h-4 text-gray-500" />}
                        label="Classificação"
                        value={b.tipoClassificacao}
                      />
                      <Info
                        icon={<User className="w-4 h-4 text-gray-500" />}
                        label="Fatais"
                        value={b.vitimasFatais}
                      />
                      <Info
                        icon={<User className="w-4 h-4 text-gray-500" />}
                        label="Não Fatais"
                        value={b.vitimasNaoFatais}
                      />
                    </CardContent>

                    <div className="flex flex-col lg:flex-row justify-end p-4 gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedBoletim(b)}
                        className="rounded-lg cursor-pointer"
                      >
                        Visualizar Detalhes
                      </Button>

                      <Button
                        size="sm"
                        className="bg-blue-900 text-white hover:bg-blue-800 rounded-lg cursor-pointer"
                        onClick={() => {
                          setBoletimEmail(b);
                          setShowEmailModal(true);
                        }}
                      >
                        Gerar Declaração do Condutor
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

        {showEmailModal && boletimEmail && (
          <ModalSendEmail
            open={showEmailModal}
            onClose={() => {
              setShowEmailModal(false);
              setBoletimEmail(null);
            }}
            boletim={boletimEmail}
          />
        )}
      </div>
    </SidebarProvider>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number | null;
}) {
  return (
    <p className="flex items-center gap-2 text-gray-700">
      {icon}
      <strong className="text-gray-900">{label}:</strong>
      <span className="text-gray-600">{value ?? "-"}</span>
    </p>
  );
}

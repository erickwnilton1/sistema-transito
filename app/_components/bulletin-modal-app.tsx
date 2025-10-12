"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { formatDateTime } from "@/hooks/format-date-time";

interface Condutor {
  nomeCondutor?: string;
}

interface Proprietario {
  nomeProprietario?: string;
}

interface Infracao {
  codigoInfracao: string;
  descricaoInfracao?: string;
}

interface Veiculo {
  tipoVeiculo: string;
  placaVeiculo: string;
  marca?: string;
  modelo?: string;
  cor?: string;
  ano?: string | number;
  condutor?: Condutor;
  proprietario?: Proprietario;
  infracoes?: Infracao[];
}

interface Boletim {
  protocol?: string;
  protocolo?: string;
  rua?: string;
  bairro?: string;
  pontoReferencia?: string;
  dataOcorrencia?: string;
  horaOcorrencia?: string;
  tipoClassificacao?: string;
  fatais?: number;
  naoFatais?: number;
  veiculos?: Veiculo[];
  vitimasNaoFatais: number;
  vitimasFatais: number;
}

interface ModalBoletimProps {
  boletim: Boletim;
  onClose: () => void;
}

export default function ModalBoletim({ boletim, onClose }: ModalBoletimProps) {
  const veiculos = boletim.veiculos ?? [];

  return (
    <AnimatePresence>
      {boletim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-5xl mx-[5px] bg-white rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] border border-gray-100 p-8"
          >
            <Button
              variant="ghost"
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-lg"
            >
              ✕
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">Protocolo do Boletim</p>
              <p className="text-3xl font-bold text-blue-900 bg-blue-50 inline-block px-4 py-2 rounded-xl mt-2 shadow-sm tracking-wide">
                {boletim.protocolo}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm mt-6">
              <Info label="Rua" value={boletim.rua} />
              <Info label="Bairro" value={boletim.bairro} />
              <Info
                label="Ponto de Referência"
                value={boletim.pontoReferencia}
              />
              <Info
                label="Data da Ocorrência"
                value={formatDateTime(boletim.dataOcorrencia, false)}
              />
              <Info label="Hora" value={boletim.horaOcorrencia} />
              <Info label="Classificação" value={boletim.tipoClassificacao} />
              <Info
                label="Vítimas Fatais"
                value={boletim.vitimasFatais?.toString() ?? "0"}
              />
              <Info
                label="Vítimas Não Fatais"
                value={boletim.vitimasNaoFatais?.toString() ?? "0"}
              />
            </div>

            {veiculos.length > 0 && (
              <div className="space-y-5 mt-8">
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
                  Veículos Envolvidos
                </h3>

                <div className="space-y-4">
                  {veiculos.map((v, idx) => {
                    const infracoes = v.infracoes ?? [];
                    return (
                      <Card
                        key={idx}
                        className="p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 bg-white"
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg font-bold text-blue-900">
                            {v.tipoVeiculo} —{" "}
                            <span className="bg-blue-950 text-white px-2 py-1 rounded">
                              {v.placaVeiculo}
                            </span>
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <Info label="Marca" value={v.marca} />
                          <Info label="Modelo" value={v.modelo} />
                          <Info label="Cor" value={v.cor} />
                          <Info label="Ano" value={v.ano?.toString()} />
                          <Info
                            label="Condutor"
                            value={v.condutor?.nomeCondutor}
                          />
                          <Info
                            label="Proprietário"
                            value={v.proprietario?.nomeProprietario}
                          />

                          {infracoes.length > 0 && (
                            <div className="col-span-full mt-2">
                              <strong className="text-gray-800">
                                Infrações:
                              </strong>
                              <ul className="list-disc list-inside mt-1 text-gray-700">
                                {infracoes.map((i, index) => (
                                  <li key={index} className="ml-2">
                                    {i.codigoInfracao} —{" "}
                                    {i.descricaoInfracao || "-"}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Subcomponente reutilizável para exibir campos
function Info({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <p className="text-gray-700">
      <strong className="text-gray-900">{label}:</strong>{" "}
      <span className="text-gray-600">{value || "-"}</span>
    </p>
  );
}

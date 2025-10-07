"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
}

interface ModalBoletimProps {
  boletim: Boletim;
  onClose: () => void;
}

export default function ModalBoletim({ boletim, onClose }: ModalBoletimProps) {
  const veiculos = boletim.veiculos ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]">
        <Button
          variant="ghost"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
        >
          ✕
        </Button>

        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">
            Protocolo:{" "}
            <span className="bg-blue-950 text-white px-2 py-1 rounded">
              {boletim.protocolo}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p>
              <strong>Rua:</strong> {boletim.rua || "-"}
            </p>
            <p>
              <strong>Bairro:</strong> {boletim.bairro || "-"}
            </p>
            <p>
              <strong>Ponto de Referência:</strong>{" "}
              {boletim.pontoReferencia || "-"}
            </p>
            <p>
              <strong>Data da Ocorrência:</strong>{" "}
              {boletim.dataOcorrencia || "-"}
            </p>
            <p>
              <strong>Hora:</strong> {boletim.horaOcorrencia || "-"}
            </p>
            <p>
              <strong>Classificação:</strong> {boletim.tipoClassificacao || "-"}
            </p>
            <p>
              <strong>Fatais:</strong> {boletim.fatais ?? 0}
            </p>
            <p>
              <strong>Não Fatais:</strong> {boletim.naoFatais ?? 0}
            </p>
          </div>

          {veiculos.length > 0 && (
            <div className="space-y-4 mt-4">
              <h3 className="text-xl font-semibold">Veículos Envolvidos</h3>
              {veiculos.map((v, idx) => {
                const infracoes = v.infracoes ?? [];
                return (
                  <Card
                    key={idx}
                    className="p-4 border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 space-y-2"
                  >
                    <CardHeader className="flex justify-between items-center">
                      <CardTitle className="text-lg font-bold">
                        {v.tipoVeiculo} - {v.placaVeiculo}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <p>
                        <strong>Marca:</strong> {v.marca || "-"}
                      </p>
                      <p>
                        <strong>Modelo:</strong> {v.modelo || "-"}
                      </p>
                      <p>
                        <strong>Cor:</strong> {v.cor || "-"}
                      </p>
                      <p>
                        <strong>Ano:</strong> {v.ano || "-"}
                      </p>
                      <p>
                        <strong>Condutor:</strong>{" "}
                        {v.condutor?.nomeCondutor || "-"}
                      </p>
                      <p>
                        <strong>Proprietário:</strong>{" "}
                        {v.proprietario?.nomeProprietario || "-"}
                      </p>

                      {infracoes.length > 0 && (
                        <div className="col-span-full">
                          <strong>Infrações:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {infracoes.map((i, index) => (
                              <li key={index}>
                                {i.codigoInfracao} -{" "}
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
          )}
        </div>
      </div>
    </div>
  );
}

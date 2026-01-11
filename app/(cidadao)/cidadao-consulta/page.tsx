"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Eye } from "lucide-react";
import ViewBoletimModal from "@/app/(admin)/admin-cidadao-sistema/_components/modal-boletin-app";

interface ApprovedBulletin {
  id: string;
  protocol: string;
  nome: string;
  placa: string;
  createdAt: string;
}

export default function BoletinsAprovadosPage() {
  const [data, setData] = useState<ApprovedBulletin[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedBoletim, setSelectedBoletim] =
    useState<ApprovedBulletin | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/public/approved-bulletins");
        const json = await res.json();
        setData(json || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function handleOpenModal(boletim: ApprovedBulletin) {
    setSelectedBoletim(boletim);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
    setSelectedBoletim(null);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="relative h-72 shadow-md">
        <Image
          src="/guarda-transito-cidadao.jpg"
          alt="Guarda de Trânsito"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
          <img
            src="/logo-amttrans.png"
            alt="Logo"
            className="w-28 mb-4 drop-shadow-lg"
          />

          <h1 className="text-3xl md:text-4xl font-bold">
            Boletins de Trânsito
          </h1>

          <p className="mt-2 text-sm md:text-lg max-w-2xl">
            Consulte abaixo os registros de sinistros que já foram analisados e
            aprovados pela autoridade de trânsito.
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-10">
        <div className="bg-white border rounded-2xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-blue-950">
              Registros de Boletins
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Total de registros: {data.length}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin mr-2 text-blue-900" />
              <span className="text-gray-600">
                Carregando boletins aprovados...
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Protocolo</TableHead>
                    <TableHead>Condutor</TableHead>
                    <TableHead>Placa</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ver detalhes</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-10 text-gray-400"
                      >
                        Nenhum boletim aprovado encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((b) => (
                      <TableRow
                        key={b.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="font-mono font-semibold text-blue-900">
                          {b.protocol}
                        </TableCell>

                        <TableCell className="text-gray-800">
                          {b.nome}
                        </TableCell>

                        <TableCell className="font-mono uppercase">
                          {b.placa}
                        </TableCell>

                        <TableCell>
                          {new Date(b.createdAt).toLocaleDateString("pt-BR")}
                        </TableCell>

                        <TableCell>
                          <Badge className="bg-green-600 text-white">
                            Aprovado
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenModal(b)}
                            className="gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Ver detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center text-gray-500 text-sm py-6">
        <p>Autarquia de Trânsito - Atendimento 24h</p>
        <p>(81) 3559-1326</p>
      </footer>

      <ViewBoletimModal
        open={openModal}
        onClose={handleCloseModal}
        boletim={selectedBoletim}
      />
    </div>
  );
}

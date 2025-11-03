"use client";

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
import { Pencil } from "lucide-react";
import { EditBoletimModal } from "./edit-boletim-modal";

interface Boletim {
  id: number;
  protocolo: string;
  agente: string;
  data: string;
  local: string;
  tipo: string;
  gravidade: string;
  status: string;
}

export function BoletinsTable() {
  const [boletins, setBoletins] = useState<Boletim[]>([]);
  const [selected, setSelected] = useState<Boletim | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/dashboard-boletim");
      const data = await res.json();
      setBoletins(data);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Boletins de Sinistro
        </h3>
        <span className="text-sm text-gray-400">Todos os registros</span>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Protocolo</TableHead>
              <TableHead>Agente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {boletins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-400">
                  Nenhum boletim encontrado.
                </TableCell>
              </TableRow>
            ) : (
              boletins.map((b) => (
                <TableRow key={b.protocolo} className="hover:bg-gray-100">
                  <TableCell className="font-medium">{b.protocolo}</TableCell>
                  <TableCell>{b.agente || "—"}</TableCell>
                  <TableCell>{b.data}</TableCell>
                  <TableCell>{b.local}</TableCell>
                  <TableCell>{b.tipo}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500 text-white">
                      {b.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelected(b)}
                    >
                      <Pencil size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selected && (
        <EditBoletimModal
          boletim={selected}
          onClose={() => setSelected(null)}
          onUpdated={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </div>
  );
}

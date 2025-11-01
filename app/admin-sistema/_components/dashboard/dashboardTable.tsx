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

export function DashboardTable() {
  const [boletins, setBoletins] = useState<Boletim[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/dashboard-boletim");
      const data = await res.json();
      setBoletins(data);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm mt-10">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Boletins Recentes
        </h3>
        <span className="text-sm text-gray-400">Últimos registros</span>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-500">Protocolo</TableHead>
              <TableHead className="text-gray-500">Agente</TableHead>
              <TableHead className="text-gray-500">Data</TableHead>
              <TableHead className="text-gray-500">Local</TableHead>
              <TableHead className="text-gray-500">Tipo</TableHead>
              <TableHead className="text-gray-500">Status</TableHead>
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
                <TableRow
                  key={b.protocolo}
                  className="hover:bg-gray-100 transition"
                >
                  <TableCell className="font-medium">{b.protocolo}</TableCell>
                  <TableCell>{b.agente}</TableCell>
                  <TableCell>{b.data}</TableCell>
                  <TableCell>{b.local}</TableCell>
                  <TableCell>{b.tipo}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">{b.status}</Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

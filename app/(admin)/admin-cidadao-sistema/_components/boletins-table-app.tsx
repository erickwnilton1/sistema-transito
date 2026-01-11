"use client";

import { useEffect, useState, useCallback } from "react";
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
import { Pencil, Loader2, AlertCircle, Eye } from "lucide-react";
import { CitizenBulletin } from "@/types/boletim";
import ViewBoletimModal from "./modal-boletin-app";
import EditBoletimStatusModal from "./edit-boletin-status-app";

interface CitizenBulletinsTableProps {
  initialData?: CitizenBulletin[];
}

export function CitizenBulletinsTable({
  initialData = [],
}: CitizenBulletinsTableProps) {
  const [bulletins, setBulletins] = useState<CitizenBulletin[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedBoletim, setSelectedBoletim] =
    useState<CitizenBulletin | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const fetchData = useCallback(
    async (pageNum: number = 1, status?: string) => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.append("page", pageNum.toString());
        params.append("limit", "10");
        if (status) params.append("status", status);

        const res = await fetch(`/api/citizenBulletin?${params.toString()}`);

        if (!res.ok) {
          throw new Error("Falha ao carregar boletins");
        }

        const data = await res.json();
        setBulletins(data.bulletins || []);
        setTotalPages(data.totalPages || 1);
        setPage(pageNum);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar dados");
        setBulletins([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!initialData.length) {
      fetchData(1, statusFilter);
    }
  }, []);

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    fetchData(1, status);
  };

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: "bg-yellow-500",
      APPROVED: "bg-green-500",
      REJECTED: "bg-red-500",
    };
    return statusMap[status] || "bg-gray-500";
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: "Pendente",
      APPROVED: "Aprovado",
      REJECTED: "Rejeitado",
    };
    return statusMap[status] || status;
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatPlaca = (placa: string) => {
    return placa.toUpperCase();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Boletins de Cidadão
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Total de registros: {bulletins.length}
          </p>
        </div>
        <span className="text-sm text-gray-400">
          Página {page} de {totalPages}
        </span>
      </div>
      <div className="p-4 border-b border-gray-100 flex gap-2 flex-wrap">
        <Button
          variant={statusFilter === "" ? "default" : "outline"}
          size="sm"
          onClick={() => handleStatusFilter("")}
          className="bg-blue-900"
        >
          Todos
        </Button>
        <Button
          variant={statusFilter === "PENDING" ? "default" : "outline"}
          size="sm"
          onClick={() => handleStatusFilter("PENDING")}
          className={
            statusFilter === "PENDING"
              ? "bg-yellow-500 hover:bg-yellow-600"
              : ""
          }
        >
          Pendentes
        </Button>
        <Button
          variant={statusFilter === "APPROVED" ? "default" : "outline"}
          size="sm"
          onClick={() => handleStatusFilter("APPROVED")}
          className={
            statusFilter === "APPROVED" ? "bg-green-500 hover:bg-green-600" : ""
          }
        >
          Aprovados
        </Button>
        <Button
          variant={statusFilter === "REJECTED" ? "default" : "outline"}
          size="sm"
          onClick={() => handleStatusFilter("REJECTED")}
          className={
            statusFilter === "REJECTED" ? "bg-red-500 hover:bg-red-600" : ""
          }
        >
          Rejeitados
        </Button>
      </div>
      {error && (
        <div className="p-4 bg-red-50 border-b border-red-200 flex items-center gap-2 text-red-700">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
      {loading && (
        <div className="p-8 flex items-center justify-center">
          <Loader2 className="animate-spin mr-2" size={20} />
          <span className="text-gray-600">Carregando boletins...</span>
        </div>
      )}
      {!loading && (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Protocolo</TableHead>
                  <TableHead className="font-semibold">Nome</TableHead>
                  <TableHead className="font-semibold">CPF</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Placa</TableHead>
                  <TableHead className="font-semibold">Data</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-center">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bulletins.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-gray-400"
                    >
                      Nenhum boletim encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  bulletins.map((b) => (
                    <TableRow
                      key={b.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="font-medium text-gray-900">
                        {b.protocol}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {b.nome}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {formatCPF(b.cpf)}
                      </TableCell>
                      <TableCell className="text-gray-700 text-sm">
                        {b.email}
                      </TableCell>
                      <TableCell className="text-gray-700 font-mono">
                        {formatPlaca(b.placa)}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {formatDate(b.data)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusColor(b.status)} text-white`}
                        >
                          {getStatusLabel(b.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center flex gap-2 justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          title="Visualizar detalhes"
                          className="hover:bg-blue-50"
                          onClick={() => {
                            setSelectedBoletim(b);
                            setViewOpen(true);
                          }}
                        >
                          <Eye size={16} />
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          title="Editar status"
                          className="hover:bg-blue-50"
                          onClick={() => {
                            setSelectedBoletim(b);
                            setEditOpen(true);
                          }}
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

          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => fetchData(page - 1, statusFilter)}
                disabled={page === 1}
              >
                Anterior
              </Button>
              <span className="text-sm text-gray-600">
                Página {page} de {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => fetchData(page + 1, statusFilter)}
                disabled={page === totalPages}
              >
                Próxima
              </Button>
            </div>
          )}
        </>
      )}
      <ViewBoletimModal
        open={viewOpen}
        boletim={selectedBoletim}
        onClose={() => {
          setViewOpen(false);
          setSelectedBoletim(null);
        }}
      />

      <EditBoletimStatusModal
        open={editOpen}
        boletim={selectedBoletim}
        onClose={() => {
          setEditOpen(false);
          setSelectedBoletim(null);
        }}
        onUpdated={() => fetchData(page, statusFilter)}
      />
    </div>
  );
}

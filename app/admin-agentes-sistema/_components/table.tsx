"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Agente {
  id: string;
  name: string;
  email: string;
  registration: string;
  role: string;
}

export function AgentesTable() {
  const [agentes, setAgentes] = useState<Agente[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchAgentes();
  }, []);

  const fetchAgentes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/agentes");
      setAgentes(data);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar agentes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);
    try {
      await axios.delete(`/api/agentes/${deleteId}`);
      toast.success("Agente removido com sucesso!");
      setAgentes(agentes.filter((a) => a.id !== deleteId));
      setModalOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao remover agente");
    } finally {
      setDeleting(false);
    }
  };

  const formatRole = (role: string) => {
    if (role === "AGENT") return "Agente";
    return role;
  };

  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm  p-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Agentes de trânsito
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Matrícula</TableHead>
            <TableHead>Função</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-400">
                Carregando agentes...
              </TableCell>
            </TableRow>
          ) : agentes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-400">
                Nenhum agente encontrado.
              </TableCell>
            </TableRow>
          ) : (
            agentes.map((agente) => (
              <TableRow
                key={agente.id}
                className="hover:bg-gray-100 transition"
              >
                <TableCell className="font-medium uppercase">
                  {agente.name}
                </TableCell>
                <TableCell>{agente.email}</TableCell>
                <TableCell>{agente.registration}</TableCell>
                <TableCell>
                  <Badge className="bg-green-500 text-white uppercase">
                    {formatRole(agente.role)}
                  </Badge>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Dialog
                    open={modalOpen && deleteId === agente.id}
                    onOpenChange={setModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="cursor-pointer"
                        size="sm"
                        onClick={() => setDeleteId(agente.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Confirmar Exclusão</DialogTitle>
                        <DialogDescription>
                          Tem certeza que deseja remover o agente{" "}
                          <strong>{agente.name}</strong>? Esta ação não poderá
                          ser desfeita.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setModalOpen(false)}
                          className="cursor-pointer"
                          disabled={deleting}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="destructive"
                          className="cursor-pointer"
                          onClick={handleDelete}
                          disabled={deleting}
                        >
                          {deleting ? "Excluindo..." : "Excluir"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

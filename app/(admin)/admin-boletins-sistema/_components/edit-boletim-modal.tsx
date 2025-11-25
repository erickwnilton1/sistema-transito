"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface EditBoletimModalProps {
  open: boolean;
  onClose: () => void;
  boletim?: any;
}

export default function EditBoletimModal({
  open,
  onClose,
  boletim,
}: EditBoletimModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open || !boletim) return;

    const fetchBoletim = async () => {
      try {
        const res = await axios.get(`/api/boletins/${boletim.id}`);
        setFormData(res.data);
      } catch (error) {
        console.error("Erro ao carregar boletim:", error);
        toast.error("Erro ao carregar boletim.");
      }
    };

    fetchBoletim();
  }, [open, boletim]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.put(`/api/boletins/${boletim?.id}`, formData);
      toast.success("Boletim atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao salvar boletim:", error);
      toast.error("Erro ao salvar alterações.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!boletim) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-3xl mx-[5px] bg-white rounded-2xl shadow-xl p-6 overflow-auto"
          >
            <Button
              variant="ghost"
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-lg"
            >
              ✕
            </Button>

            <h2 className="mt-5 text-lg font-semibold text-gray-900 text-center">
              Editar Boletim
            </h2>

            <div className="p-4 border border-blue-100 rounded-xl bg-blue-50 text-center shadow-sm mt-4">
              <p className="text-sm text-gray-600">Protocolo do Boletim</p>
              <p className="text-2xl font-bold text-blue-900 mt-1 tracking-wide">
                {boletim.protocol}
              </p>
            </div>

            <form
              onSubmit={handleSave}
              className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label>Rua</Label>
                <Input
                  value={formData.rua || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, rua: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Bairro</Label>
                <Input
                  value={formData.bairro || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, bairro: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de Acidente</Label>
                <Input
                  value={formData.tipoAcidente || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, tipoAcidente: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Ponto de Referência</Label>
                <Input
                  value={formData.pontoReferencia || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pontoReferencia: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Data da Ocorrência</Label>
                <Input
                  type="date"
                  value={formData.dataOcorrencia || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, dataOcorrencia: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Hora da Ocorrência</Label>
                <Input
                  type="time"
                  value={formData.horaOcorrencia || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, horaOcorrencia: e.target.value })
                  }
                />
              </div>
            </form>

            <div className="flex justify-end gap-3 pt-4 border-t mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                onClick={handleSave}
                disabled={isLoading}
                className="bg-blue-900 hover:bg-blue-800 text-white flex items-center gap-2"
              >
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

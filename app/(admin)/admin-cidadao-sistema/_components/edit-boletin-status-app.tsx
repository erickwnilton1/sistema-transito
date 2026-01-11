"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface EditBoletimStatusModalProps {
  open: boolean;
  onClose: () => void;
  boletim: any | null;
  onUpdated: () => void;
}

type StatusOption = {
  value: "PENDING" | "APPROVED" | "REJECTED";
  label: string;
  description: string;
  icon: any;
  className: string;
};

const STATUS_OPTIONS: StatusOption[] = [
  {
    value: "PENDING",
    label: "Pendente",
    description: "Boletim aguardando análise",
    icon: Clock,
    className: "border-yellow-300 bg-yellow-50 text-yellow-800",
  },
  {
    value: "APPROVED",
    label: "Aprovado",
    description: "Boletim validado e aprovado",
    icon: CheckCircle,
    className: "border-green-300 bg-green-50 text-green-800",
  },
  {
    value: "REJECTED",
    label: "Rejeitado",
    description: "Boletim não atende aos critérios",
    icon: XCircle,
    className: "border-red-300 bg-red-50 text-red-800",
  },
];

export default function EditBoletimStatusModal({
  open,
  onClose,
  boletim,
  onUpdated,
}: EditBoletimStatusModalProps) {
  const [status, setStatus] = useState<"PENDING" | "APPROVED" | "REJECTED">(
    "PENDING"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (boletim?.status) {
      setStatus(boletim.status);
    }
  }, [boletim]);

  if (!boletim) return null;

  const handleSave = async () => {
    try {
      setLoading(true);

      await axios.put(`/api/citizenBulletin/${boletim.id}/status`, {
        status,
      });

      toast.success("Status atualizado com sucesso");
      onUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]"
          >
            <div className="relative flex items-center justify-center px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Editar Status do Boletim
              </h2>

              <Button
                variant="ghost"
                onClick={onClose}
                className="absolute right-4 top-4"
              >
                ✕
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Protocolo */}
              <div className="p-4 border border-blue-100 rounded-xl bg-blue-50 text-center shadow-sm">
                <p className="text-sm text-gray-600">Protocolo</p>
                <p className="text-2xl font-bold text-blue-900 tracking-wide">
                  {boletim.protocol}
                </p>
              </div>

              <div className="space-y-3">
                <Label>Status do boletim</Label>

                <div className="space-y-2">
                  {STATUS_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const isActive = status === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setStatus(option.value)}
                        className={`
                          w-full flex items-center gap-3 rounded-xl border p-4 text-left transition
                          ${option.className}
                          ${
                            isActive
                              ? "ring-2 ring-offset-2 ring-blue-600"
                              : "opacity-80 hover:opacity-100"
                          }
                        `}
                      >
                        <Icon className="h-5 w-5" />
                        <div className="flex-1">
                          <p className="font-semibold">{option.label}</p>
                          <p className="text-xs opacity-80">
                            {option.description}
                          </p>
                        </div>

                        {isActive && (
                          <span className="text-xs font-semibold">
                            Selecionado
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-900 hover:bg-blue-800 text-white"
              >
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

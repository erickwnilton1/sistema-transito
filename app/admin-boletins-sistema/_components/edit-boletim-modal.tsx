"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

interface Boletim {
  id: number;
  protocolo: string;
  agente: string;
  data: string;
  local: string;
  tipo: string;
  status: string;
}

interface EditBoletimModalProps {
  boletim: Boletim;
  onClose: () => void;
  onUpdated: () => void;
}

export function EditBoletimModal({
  boletim,
  onClose,
  onUpdated,
}: EditBoletimModalProps) {
  const [formData, setFormData] = useState(boletim);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/boletins/${boletim.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Erro ao atualizar boletim");
      toast.success("Boletim atualizado com sucesso!");
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar alterações");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AnimatePresence>
      {boletim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <Button
              variant="ghost"
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-lg"
            >
              ✕
            </Button>

            <div className="text-center mb-6">
              <p className="text-sm text-gray-500">Editando Boletim</p>
              <p className="text-2xl font-bold text-blue-900 bg-blue-50 inline-block px-4 py-2 rounded-xl mt-2 shadow-sm">
                {boletim.protocolo}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
              <div>
                <Label className="text-gray-700 font-semibold">Agente</Label>
                <Input
                  className="mt-1"
                  value={formData.agente}
                  onChange={(e) =>
                    setFormData({ ...formData, agente: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold">Local</Label>
                <Input
                  className="mt-1"
                  value={formData.local}
                  onChange={(e) =>
                    setFormData({ ...formData, local: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold">Tipo</Label>
                <Input
                  className="mt-1"
                  value={formData.tipo}
                  onChange={(e) =>
                    setFormData({ ...formData, tipo: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={onClose}
                className="hover:bg-gray-100"
              >
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

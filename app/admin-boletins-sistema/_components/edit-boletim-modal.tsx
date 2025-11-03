"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Boletim #{boletim.protocolo}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label>Agente</Label>
            <Input
              value={formData.agente}
              onChange={(e) =>
                setFormData({ ...formData, agente: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Local</Label>
            <Input
              value={formData.local}
              onChange={(e) =>
                setFormData({ ...formData, local: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Tipo</Label>
            <Input
              value={formData.tipo}
              onChange={(e) =>
                setFormData({ ...formData, tipo: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Status</Label>
            <Input
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

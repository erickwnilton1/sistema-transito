"use client";

import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface ModalSendEmailProps {
  open: boolean;
  onClose: () => void;
  boletim?: any;
}

export default function ModalSendEmail({
  open,
  onClose,
  boletim,
}: ModalSendEmailProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/send-registration", {
        email,
        protocolo: boletim?.protocolo,
      });

      if (response.status === 200) {
        toast.success("E-mail enviado com sucesso.");
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      toast.error("Erro ao enviar e-mail. Tente novamente.");
    } finally {
      setEmail("");
      onClose();
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
            className="relative w-full max-w-md mx-[5px] bg-white rounded-2xl shadow-xl p-6 overflow-hidden"
          >
            <Button
              variant="ghost"
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-lg"
            >
              ✕
            </Button>

            <h2 className="mt-5 text-lg font-semibold text-gray-900 text-center">
              Enviar informações para o Cidadão
            </h2>

            {boletim && (
              <div className="p-4 border border-blue-100 rounded-xl bg-blue-50 text-center shadow-sm mt-4">
                <p className="text-sm text-gray-600">Protocolo do Boletim</p>
                <p className="text-2xl font-bold text-blue-900 mt-1 tracking-wide">
                  {boletim.protocolo}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  E-mail do Cidadão
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo.cidadao@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-300 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="rounded-lg cursor-pointer"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-800 text-white rounded-lg cursor-pointer"
                >
                  Confirmar
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

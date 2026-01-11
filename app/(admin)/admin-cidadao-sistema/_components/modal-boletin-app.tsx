"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface ViewBoletimModalProps {
  open: boolean;
  onClose: () => void;
  boletim?: any;
}

export default function ViewBoletimModal({
  open,
  onClose,
  boletim,
}: ViewBoletimModalProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !boletim) return;

    const fetchBoletim = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/citizenBulletinId/${boletim.id}`);
        setData(res.data);
      } catch (error) {
        console.error("Erro ao carregar boletim:", error);
        toast.error("Erro ao carregar boletim.");
      } finally {
        setLoading(false);
      }
    };

    fetchBoletim();
  }, [open, boletim]);

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
            className="relative w-full max-w-5xl bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]"
          >
            <div className="relative flex items-center justify-center px-6 py-4 border-b bg-white">
              <h2 className="text-lg font-semibold text-gray-900">
                Detalhes do Boletim
              </h2>

              <Button
                variant="ghost"
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-600 hover:text-gray-900"
              >
                ✕
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="p-4 border border-blue-100 rounded-xl bg-blue-50 text-center shadow-sm">
                <p className="text-sm text-gray-600">Protocolo</p>
                <p className="text-2xl font-bold text-blue-900 tracking-wide">
                  {boletim.protocol}
                </p>
              </div>

              {loading ? (
                <p className="text-center text-gray-500">
                  Carregando informações...
                </p>
              ) : (
                data && (
                  <>
                    <Section title="Dados do Cidadão">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ReadOnlyField label="Nome" value={data.nome} />
                        <ReadOnlyField label="Email" value={data.email} />
                        <ReadOnlyField label="CPF" value={data.cpf} />
                        <ReadOnlyField label="Telefone" value={data.telefone} />
                      </div>
                    </Section>

                    <Section title="Dados do Veículo">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ReadOnlyField label="Placa" value={data.placa} />
                        <ReadOnlyField label="Renavam" value={data.renavam} />
                      </div>
                    </Section>

                    <Section title="Dados da Ocorrência">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ReadOnlyField
                          label="Data"
                          value={new Date(data.data).toLocaleDateString(
                            "pt-BR"
                          )}
                        />
                        <ReadOnlyField label="Hora" value={data.hora} />
                        <ReadOnlyField label="Endereço" value={data.endereco} />
                      </div>

                      <div className="space-y-1 mt-4">
                        <Label className="text-xs text-gray-600">Relato</Label>
                        <div className="rounded-lg border bg-gray-50 p-4 text-sm text-gray-800 whitespace-pre-wrap">
                          {data.relato}
                        </div>
                      </div>
                    </Section>

                    {data.imageUrl && (
                      <Section title="Imagem da Ocorrência">
                        <div className="flex justify-center">
                          <div className="rounded-xl border bg-white p-3 shadow-sm">
                            <img
                              src={data.imageUrl}
                              alt="Imagem da ocorrência"
                              className="max-h-[420px] rounded-lg object-contain"
                            />
                          </div>
                        </div>
                      </Section>
                    )}
                  </>
                )
              )}
            </div>

            <div className="flex justify-end px-6 py-4 border-t bg-white">
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 uppercase">{title}</h3>
      {children}
    </section>
  );
}

function ReadOnlyField({ label, value }: { label: string; value?: string }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-gray-600">{label}</Label>
      <div className="h-10 flex items-center rounded-md border bg-gray-50 px-3 text-sm font-medium text-gray-800">
        {value || "-"}
      </div>
    </div>
  );
}

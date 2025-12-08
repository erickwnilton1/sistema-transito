import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalComponent({
  open,
  onClose,
  onConfirm,
}: ModalComponentProps) {
  useEffect(() => {
    interface KeyboardEventWithKey extends KeyboardEvent {
      key: string;
    }

    const handleEsc = (e: KeyboardEventWithKey) =>
      e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 bg-black/70 flex items-start md:items-center justify-center z-50 p-4 pt-5">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto md:max-h-none md:overflow-visible"
          >
            <Card className="shadow-2xl">
              <CardContent className="p-6 space-y-5">
                <h2 className="text-2xl font-bold text-center text-red-700">
                  Atenção. Declaração de Responsabilidade
                </h2>

                <p className="text-base text-justify">
                  Este serviço é destinado <strong>exclusivamente</strong> ao
                  registro de
                  <strong> acidentes de trânsito sem vítima</strong>. Antes de
                  continuar, leia com atenção:
                  <br />
                  <br />• Fornecer informações falsas, incompletas ou
                  manipuladas configura conduta irregular e pode gerar{" "}
                  <strong>
                    responsabilidade administrativa, civil e criminal
                  </strong>
                  .<br />• Em qualquer ocorrência com{" "}
                  <strong>feridos — mesmo que pareçam leves</strong>, o registro
                  deve ser feito obrigatoriamente de forma{" "}
                  <strong>presencial</strong> na Autarquia Municipal de Trânsito
                  e Transportes (AMTTRANS), localizada na Rodovia PE-60.
                  <br />
                  <br />
                  Ao clicar em <strong>Prosseguir</strong>, você declara que
                  leu, compreendeu e está de pleno acordo, assumindo total
                  responsabilidade pela veracidade das informações prestadas.
                </p>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    className="rounded-xl px-6 cursor-pointer"
                    onClick={onClose}
                  >
                    Voltar
                  </Button>
                  <Button
                    className="rounded-xl px-6 bg-red-700 hover:bg-red-800 cursor-pointer"
                    onClick={onConfirm}
                  >
                    Prosseguir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

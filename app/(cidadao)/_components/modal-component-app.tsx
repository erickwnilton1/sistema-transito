import { useEffect, useState } from "react";
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
  const [agree, setAgree] = useState(false);

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
        <motion.div className="fixed inset-0 flex items-start md:items-center justify-center z-50 p-4 pt-5">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto md:max-h-none md:overflow-visible"
          >
            <Card className="shadow-2xl">
              <CardContent className="p-6 space-y-5">
                <h2 className="text-2xl font-bold text-center text-black">
                  Atenção. Declaração de Responsabilidade
                </h2>

                <p className="text-base text-justify">
                  Este serviço é destinado exclusivamente ao registro de
                  <strong> acidentes de trânsito sem vítima</strong>. Antes de
                  continuar, leia com atenção:
                  <br />
                  <br />• Fornecer informações falsas, incompletas ou
                  manipuladas configura conduta irregular e pode gerar
                  responsabilidade administrativa, civil e criminal .
                  <br />• Em qualquer ocorrência com feridos — mesmo que pareçam
                  leves, o registro deve ser feito obrigatoriamente de forma
                  presencial na Autarquia Municipal de Trânsito e Transportes
                  (AMTTRANS), localizada na Rodovia PE-60.
                  <br />
                  <br />
                  Ao clicar em <strong>Prosseguir</strong>, você declara que
                  leu, compreendeu e está de pleno acordo, assumindo total
                  responsabilidade pela veracidade das informações prestadas.
                </p>

                <div className="flex items-start gap-3 p-4 border rounded-lg bg-gray-50">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                    className="mt-1 h-4 w-4 cursor-pointer"
                  />
                  <label
                    htmlFor="agree"
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    Declaro que autorizo uso das informações fornecidas para
                    fins de registro, conferência e validação deste Boletim de
                    Acidente de Trânsito (BOAT), estando ciente das
                    responsabilidades legais.
                  </label>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    className="rounded-xl px-6 cursor-pointer"
                    onClick={onClose}
                  >
                    Voltar
                  </Button>
                  <Button
                    className="rounded-xl px-6 bg-blue-800 hover:bg-blue-700 cursor-pointer"
                    onClick={onConfirm}
                    disabled={!agree}
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

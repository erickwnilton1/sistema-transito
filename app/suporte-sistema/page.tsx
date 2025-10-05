"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Headphones, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SuportePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-[100%] max-w-xl bg-slate-800/60 border border-slate-700 shadow-2xl backdrop-blur-md">
          <CardHeader className="flex flex-col items-center">
            <Headphones className="w-12 h-12 text-blue-400 mb-2" />
            <CardTitle className="text-2xl font-bold text-center text-white">
              Suporte do Sistema
            </CardTitle>
            <p className="text-sm text-slate-400 mt-2 text-center max-w-md">
              Estou aqui para ajudar. Entre em contato com nosso suporte para
              resolver dúvidas, problemas técnicos ou solicitações relacionadas
              ao sistema.
            </p>
          </CardHeader>

          <Separator className="my-4 bg-slate-700" />

          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-30 w-30">
              <AvatarImage
                src="/imagem-suporte.jpg"
                alt="suporte técnico"
                className="object-cover"
              />
              <AvatarFallback>SP</AvatarFallback>
            </Avatar>

            <div className="text-center">
              <h3 className="text-lg font-semibold">Suporte Técnico</h3>
              <Badge
                variant="outline"
                className="mt-1 border-slate-600 text-slate-300"
              >
                Atendimento corporativo
              </Badge>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-slate-300 text-sm">(81) 98554-0420</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-slate-300 text-sm">
                  suporte@sistema.gov.br
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full sm:w-auto justify-center">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-slate-600 hover:bg-slate-700 text-blue-950"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>

              <Button
                onClick={() =>
                  (window.location.href = "mailto:suporte@sistema.gov.br")
                }
                className="bg-blue-500 hover:bg-blue-600"
              >
                Entrar em Contato
              </Button>
            </div>
          </CardContent>
        </Card>

        <footer className="mt-8 text-slate-500 text-sm text-center">
          © {new Date().getFullYear()} — Definir nome para empresa
        </footer>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AcessoNegadoPage() {
  const router = useRouter();

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-between bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-1 items-center justify-center w-full px-4"
      >
        <Card className="bg-slate-800/60 border border-slate-700 shadow-2xl backdrop-blur-md text-center p-6 w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-3">
              <ShieldAlert className="h-14 w-14 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Acesso Negado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-6 text-sm sm:text-base">
              Você não tem permissão para acessar esta página.
              <br />
              Entre em contato com o administrador do sistema.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-slate-600 hover:bg-slate-700"
              >
                Voltar
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="bg-red-500 hover:bg-red-600"
              >
                Ir para o início
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <footer className="pb-4 text-slate-500 text-sm text-center">
        © {new Date().getFullYear()} — Nuxt
      </footer>
    </div>
  );
}

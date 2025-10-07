"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { User, Mail, CreditCard, Lock } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    registration: "",
    password: "",
  });

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await authClient.signUp.email({
          email: form.email,
          password: form.password,
          name: form.name,
          registration: form.registration,
          callbackURL: "/boletim",
        });

        if (error) {
          console.error("Erro no signup:", error);
          toast.error(
            (error as any)?.message ||
              JSON.stringify(error) ||
              "Erro ao cadastrar o usuário."
          );
          return;
        }

        toast.success("Cadastro realizado com sucesso!");
        router.push("/boletim");
      } else {
        const { data, error } = await authClient.signIn.email({
          email: form.email,
          password: form.password,
        });

        if (error) {
          console.error("Erro no signin:", error);
          toast.error(
            (error as any)?.message ||
              JSON.stringify(error) ||
              "Erro ao autenticar o usuário."
          );

          return;
        }

        toast.success("Login realizado com sucesso!");
        router.push("/boletim");
      }
    } catch (err: any) {
      console.error("Erro inesperado no auth:", err);
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 mb-5 relative shadow-md">
        <Image
          src="/guarda-transito.jpg"
          alt="Guarda-Trânsito"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30">
          <img src="/logo-amttrans.png" alt="Logo" className="w-32 mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Central Operacional de Sinistros
          </h1>
          <p className="mt-2 mb-2 text-sm md:text-lg max-w-2xl">
            Registro e monitoramento rápido de ocorrências de trânsito
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white shadow-md">
        <div className="flex w-full max-w-6xl lg:space-x-10 px-4">
          <div className="hidden lg:flex flex-col justify-between w-1/2 p-8 bg-white border rounded-2xl shadow-lg">
            <div className="flex items-center mb-6">
              <Image
                src="/logo-amttrans.png"
                alt="Logo"
                width={80}
                height={80}
                className="object-cover mr-4"
              />
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-blue-950">
                  Central Operacional
                </h3>
                <p className="text-1xl text-gray-500 font-semibold">
                  Registro e monitoramento rápido de ocorrências de trânsito.
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-gray-700 mb-6 list-disc list-inside">
              <li>Registro Ágil de Boletins</li>
              <li>Acesso Restrito para Agentes</li>
            </ul>

            <p className="text-sm text-gray-500">
              Atendimento e registro conforme normas internas da AMTTRANS.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-4 p-6 border rounded-2xl mx-auto bg-white shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-blue-950 mb-6 text-center">
              {mode === "signup" ? "Cadastro" : "Login"}
            </h2>

            {mode === "signup" && (
              <div className="relative w-full">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  placeholder="Nome"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border p-2 pl-10 rounded"
                  required
                />
              </div>
            )}

            <div className="relative w-full">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border p-2 pl-10 rounded"
                required
              />
            </div>

            {mode === "signup" && (
              <div className="relative w-full">
                <CreditCard
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  placeholder="Matrícula"
                  value={form.registration}
                  onChange={(e) =>
                    setForm({ ...form, registration: e.target.value })
                  }
                  className="w-full border p-2 pl-10 rounded"
                  required
                />
              </div>
            )}

            <div className="relative w-full">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                placeholder="Senha"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border p-2 pl-10 rounded"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-900 text-white p-2 rounded cursor-pointer hover:bg-blue-950 transition ${
                loading ? "opacity-20 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? "Processando..."
                : mode === "signup"
                  ? "Cadastrar"
                  : "Entrar"}
            </button>

            <p className="text-sm text-center">
              {mode === "signup" ? "Já tem conta?" : "Ainda não tem?"}
              <button
                type="button"
                onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                className="ml-2 underline text-blue-900"
              >
                {mode === "signup" ? "Entrar" : "Criar conta"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ModalComponent from "../_components/modal-component-app";
import { useRouter } from "next/navigation";

export default function CidadaoHomeClient() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 mb-5 relative shadow-md">
        <Image
          src="/guarda-transito-cidadao.jpg"
          alt="Guarda-Trânsito"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/40 p-4">
          <img
            src="/logo-amttrans.png"
            alt="Logo"
            className="w-32 mb-4 drop-shadow-lg"
          />

          <h1 className="text-3xl md:text-4xl font-bold">
            Registro de Acidente de Trânsito
          </h1>

          <p className="mt-2 text-sm md:text-lg max-w-2xl">
            Registre um sinistro de forma rápida e simples. Em casos graves,
            você será orientado imediatamente.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="flex w-full max-w-3xl px-4 mb-5">
          <form className="w-full max-w-md space-y-4 p-6 border rounded-2xl mx-auto bg-white shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-950 mb-4 text-center">
              Acesso Cidadão
            </h2>

            <p className="text-gray-600 text-center text-sm mb-6">
              Escolha abaixo o serviço que deseja acessar:
            </p>

            <Button
              className="w-full py-6 text-lg bg-blue-950 hover:bg-blue-900 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
            >
              Registrar Boletim
            </Button>

            <Button
              variant="outline"
              className="w-full py-6 text-lg bg-yellow-500 hover:bg-yellow-400 cursor-pointer"
              asChild
            >
              <a href="/cidadao-consulta">Consultar Boletim</a>
            </Button>
          </form>
        </div>
      </div>

      <footer className="text-center text-gray-500 text-sm py-6 border-none">
        <p>Autarquia de Trânsito - Atendimento 24h</p>
        <p>(81) 3559-1326</p>
      </footer>

      <ModalComponent
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => {
          setOpenModal(false);
          router.push("/cidadao-form");
        }}
      />
    </div>
  );
}

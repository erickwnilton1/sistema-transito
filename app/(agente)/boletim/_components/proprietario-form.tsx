"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
  index: number;
}

export default function ProprietarioForm({ register, index }: Props) {
  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Proprietário</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label>Nome</label>
          <Input
            {...register(`veiculos.${index}.proprietario.nomeProprietario`)}
          />
        </div>
        <div>
          <label>CPF/CNPJ</label>
          <Input {...register(`veiculos.${index}.proprietario.cpfCnpj`)} />
        </div>
        <div className="md:col-span-2">
          <label>Endereço</label>
          <Input
            {...register(`veiculos.${index}.proprietario.enderecoProprietario`)}
          />
        </div>
      </div>
    </div>
  );
}

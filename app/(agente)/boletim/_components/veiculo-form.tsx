"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, UseFormRegister } from "react-hook-form";
import type { BoletimFormData } from "@/types/types";
import CondutorForm from "./condutor-form";
import ProprietarioForm from "./proprietario-form";
import InfracaoForm from "./infracao-form";

interface Props {
  field: any;
  index: number;
  control: any;
  register: UseFormRegister<BoletimFormData>;
  remove: (index: number) => void;
}

export default function VeiculoForm({
  field,
  index,
  control,
  register,
  remove,
}: Props) {
  const tiposVeiculo = [
    "AUTOMOVEL",
    "BICICLETA",
    "CAMINHAO",
    "CAMINHONETE",
    "CARROCA",
    "CICLOMOTOR",
    "MICROONIBUS",
    "MOTOCICLETA",
    "MOTONETA",
    "ONIBUS",
    "REBOQUE",
    "SEMI_REBOQUE",
    "TRATOR",
    "QUADRICICLO",
    "UTILITARIO",
    "MOTOR_CASA",
    "TRICICLO",
    "OUTROS",
  ];

  return (
    <Card key={field.id} className="p-4 border mt-2 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Veículo {index + 1}</h3>
        <Button
          type="button"
          variant="destructive"
          onClick={() => remove(index)}
        >
          Remover
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <div>
          <label className="block mb-1">Tipo do Veículo</label>
          <Controller
            name={`veiculos.${index}.tipoVeiculo`}
            control={control}
            render={({ field }) => (
              <select
                className="w-full border rounded px-2 py-1"
                onChange={(e) => field.onChange(e.target.value)}
                value={field.value || ""}
              >
                <option value="">Tipo de Veículo</option>
                {tiposVeiculo.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <div>
          <label className="block mb-1">Marca</label>
          <Input {...register(`veiculos.${index}.marca`)} />
        </div>

        <div>
          <label className="block mb-1">Modelo</label>
          <Input {...register(`veiculos.${index}.modelo`)} />
        </div>

        <div>
          <label className="block mb-1">Cor</label>
          <Input {...register(`veiculos.${index}.cor`)} />
        </div>

        <div>
          <label className="block mb-1">Ano</label>
          <Input {...register(`veiculos.${index}.ano`)} />
        </div>

        <div>
          <label className="block mb-1">Placa</label>
          <Input {...register(`veiculos.${index}.placaVeiculo`)} />
        </div>

        <div>
          <label className="block mb-1">Município</label>
          <Input {...register(`veiculos.${index}.municipio`)} />
        </div>

        <div>
          <label className="block mb-1">UF</label>
          <Input {...register(`veiculos.${index}.uf`)} />
        </div>

        <div>
          <label className="block mb-1">Chassi</label>
          <Input {...register(`veiculos.${index}.chassi`)} />
        </div>

        <div>
          <label className="block mb-1">Renavam</label>
          <Input {...register(`veiculos.${index}.renavam`)} />
        </div>

        <div>
          <label className="block mb-1">Velocidade Estimada</label>
          <Input
            type="number"
            {...register(`veiculos.${index}.velocidadeEstimada`)}
          />
        </div>
      </div>

      <CondutorForm register={register} control={control} index={index} />
      <ProprietarioForm register={register} index={index} />
      <InfracaoForm control={control} index={index} />
    </Card>
  );
}

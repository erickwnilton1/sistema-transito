"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";
import type { BoletimFormData } from "../../../types/types";

interface Props {
  register: UseFormRegister<BoletimFormData>;
  errors: any;
}

export default function HorarioForm({ register, errors }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Horário</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label className="block mb-1">Data da Ocorrência</label>
          <Input
            type="date"
            {...register("dataOcorrencia", {
              required: "Campo obrigatório",
            })}
            className={errors.dataOcorrencia ? "border-red-500" : ""}
          />
          {errors.dataOcorrencia && (
            <p className="text-red-500 text-sm">
              {errors.dataOcorrencia.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Hora da Ocorrência</label>
          <Input
            type="time"
            {...register("horaOcorrencia", {
              required: "Campo obrigatório",
            })}
            className={errors.horaOcorrencia ? "border-red-500" : ""}
          />
          {errors.horaOcorrencia && (
            <p className="text-red-500 text-sm">
              {errors.horaOcorrencia.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import type { BoletimFormData } from "../../../types/types";

interface Props {
  register: UseFormRegister<BoletimFormData>;
  errors: any;
}

export default function VitimasForm({ register, errors }: Props) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-lg border-2 border-amber-200 space-y-4">
      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
        <Users className="w-5 h-5 text-amber-600" />
        Informações sobre Vítimas
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label>Vítimas Fatais</label>
          <Input
            type="number"
            min={0}
            {...register("vitimasFatais", {
              valueAsNumber: true,
              min: { value: 0, message: "Não pode ser menor que 0" },
              required: "Campo obrigatório",
            })}
          />
          {errors.vitimasFatais && (
            <p className="text-red-500 text-sm">
              {errors.vitimasFatais.message}
            </p>
          )}
        </div>
        <div>
          <label>Vítimas Não Fatais</label>
          <Input
            type="number"
            min={0}
            {...register("vitimasNaoFatais", {
              valueAsNumber: true,
              min: { value: 0, message: "Não pode ser menor que 0" },
              required: "Campo obrigatório",
            })}
          />
          {errors.vitimasNaoFatais && (
            <p className="text-red-500 text-sm">
              {errors.vitimasNaoFatais.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

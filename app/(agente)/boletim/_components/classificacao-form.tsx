"use client";

import React from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  control: any;
  errors: any;
}

export default function ClassificacaoForm({ control, errors }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block mb-1">Tipo de Classificação</label>
        <Controller
          name="tipoClassificacao"
          control={control}
          rules={{ required: "Campo obrigatório" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SEM_VITIMA">SEM VÍTIMA</SelectItem>
                <SelectItem value="COM_VITIMA">COM VÍTIMA</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.tipoClassificacao && (
          <p className="text-red-500 text-sm">
            {errors.tipoClassificacao.message}
          </p>
        )}
      </div>
      <div>
        <label className="block mb-1">Tipo de Acidente</label>
        <Controller
          name="tipoAcidente"
          control={control}
          rules={{ required: "Campo obrigatório" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar tipo de acidente" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "COLISAO",
                  "ATROPELAMENTO",
                  "ABALROAMENTO",
                  "CHOQUE",
                  "CAPOTAMENTO",
                  "QUEDA",
                  "INCENDIO",
                  "DERRAPAGEM",
                  "OUTRO",
                ].map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.tipoAcidente && (
          <p className="text-red-500 text-sm">{errors.tipoAcidente.message}</p>
        )}
      </div>
    </div>
  );
}

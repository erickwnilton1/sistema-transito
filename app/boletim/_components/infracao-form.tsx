"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  index: number;
}

export default function InfracaoForm({ control, index }: Props) {
  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Infrações</h4>
      <Controller
        name={`veiculos.${index}.infracoes`}
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            {field.value?.map((_: any, infIndex: number) => (
              <div key={infIndex} className="flex gap-2 items-center">
                <Input
                  placeholder="Código da infração"
                  value={field.value[infIndex]?.codigoInfracao || ""}
                  onChange={(e) => {
                    const updated = [...field.value];
                    updated[infIndex].codigoInfracao = e.target.value;
                    field.onChange(updated);
                  }}
                />
                <Input
                  placeholder="Descrição da infração"
                  value={field.value[infIndex]?.descricaoInfracao || ""}
                  onChange={(e) => {
                    const updated = [...field.value];
                    updated[infIndex].descricaoInfracao = e.target.value;
                    field.onChange(updated);
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => {
                    const updated = [...field.value];
                    updated.splice(infIndex, 1);
                    field.onChange(updated);
                  }}
                >
                  Remover
                </Button>
              </div>
            ))}

            <Button
              type="button"
              className="cursor-pointer"
              onClick={() =>
                field.onChange([
                  ...(field.value || []),
                  { codigoInfracao: "", descricaoInfracao: "" },
                ])
              }
            >
              + Adicionar Infração
            </Button>
          </div>
        )}
      />
    </div>
  );
}

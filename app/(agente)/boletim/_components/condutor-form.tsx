"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Condutor } from "@/types/types";

interface Props {
  register: any;
  control: any;
  index: number;
}

export default function CondutorForm({ register, control, index }: Props) {
  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Condutor</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label>Nome</label>
          <Input {...register(`veiculos.${index}.condutor.nomeCondutor`)} />
        </div>
        <div>
          <label>Sexo</label>
          <Input {...register(`veiculos.${index}.condutor.sexo`)} />
        </div>
        <div>
          <label>Idade</label>
          <Input {...register(`veiculos.${index}.condutor.idade`)} />
        </div>
        <div>
          <label>RG</label>
          <Input {...register(`veiculos.${index}.condutor.rg`)} />
        </div>
        <div>
          <label>CNH</label>
          <Input {...register(`veiculos.${index}.condutor.cnh`)} />
        </div>
        <div>
          <label>Categoria CNH</label>
          <Controller
            name={`veiculos.${index}.condutor.categoriaCNH`}
            control={control}
            rules={{ required: "Campo obrigatório" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar categoria" />
                </SelectTrigger>
                <SelectContent>
                  {["A", "B", "C", "D", "E", "AB", "AC", "AD", "AE"].map(
                    (cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <label>Registro CNH</label>
          <Input {...register(`veiculos.${index}.condutor.registroCNH`)} />
        </div>
        <div>
          <label>Validade CNH</label>
          <Input
            type="date"
            {...register(`veiculos.${index}.condutor.validadeCNH`)}
          />
        </div>
        <div>
          <label>Usava Cinto/Capacete</label>
          <Controller
            name={`veiculos.${index}.condutor.usavaCapaceteCinto`}
            control={control}
            rules={{ required: "Campo obrigatório" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="SIM / NÃO" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SIM">SIM</SelectItem>
                  <SelectItem value="NAO">NÃO</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <label>Comportamento</label>
          <Controller
            name={`veiculos.${index}.condutor.comportamento`}
            control={control}
            rules={{ required: "Campo obrigatório" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar comportamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CALMO">Calmo</SelectItem>
                  <SelectItem value="MODERADO">Moderado</SelectItem>
                  <SelectItem value="ALTERADO">Alterado</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <label>Teste Etilômetro</label>
          <Controller
            name={`veiculos.${index}.condutor.testeEtilometro`}
            control={control}
            rules={{ required: "Campo obrigatório" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="SIM / NÃO" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SIM">SIM</SelectItem>
                  <SelectItem value="NAO">NÃO</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  );
}

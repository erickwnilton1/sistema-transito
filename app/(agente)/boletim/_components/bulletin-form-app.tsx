"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import type { BoletimFormData } from "@/types/types";
import LocalizacaoForm from "./localizacao-form";
import HorarioForm from "./horario-form";
import ClassificacaoForm from "./classificacao-form";
import VitimasForm from "./vitimas-form";
import VeiculoForm from "./veiculo-form";

interface BoletimFormProps {
  initialData?: BoletimFormData;
}

export default function BoletimForm({ initialData }: BoletimFormProps) {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<BoletimFormData>({
    mode: "onChange",
    defaultValues: initialData || {
      rua: "",
      bairro: "",
      pontoReferencia: "",
      dataOcorrencia: "",
      horaOcorrencia: "",
      tipoClassificacao: "",
      tipoAcidente: "",
      natureza: "",
      condicaoVia: "",
      vitimasFatais: 0,
      vitimasNaoFatais: 0,
      latitude: undefined,
      longitude: undefined,
      veiculos: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "veiculos",
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocalização não é suportada pelo seu dispositivo.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        setCoords({ latitude, longitude });
        setValue("latitude", latitude);
        setValue("longitude", longitude);

        try {
          const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`;

          const response = await axios.get(url, {
            headers: {
              "User-Agent": "Mozilla/5.0",
            },
          });

          const data = response.data;

          const rua =
            data.localityInfo?.administrative?.find((a: any) =>
              ["road", "street", "residential"].includes(
                a.description?.toLowerCase()
              )
            )?.name ||
            data.principalSubdivision ||
            "";

          const bairro =
            data.localityInfo?.administrative?.find((a: any) =>
              ["suburb", "neighbourhood"].includes(a.description?.toLowerCase())
            )?.name || "";

          if (!getValues("rua") && rua) setValue("rua", rua);
          if (!getValues("bairro") && bairro) setValue("bairro", bairro);

          toast.success("Endereço identificado automaticamente.");
        } catch (error) {
          console.error(error);
          toast.error("Falha ao identificar endereço automaticamente.");
        }
      },

      (error) => {
        setLocationError(
          error.code === error.PERMISSION_DENIED
            ? "Permissão negada."
            : error.code === error.POSITION_UNAVAILABLE
              ? "Localização indisponível."
              : "Não foi possível obter localização."
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, [setValue, getValues]);

  const onSubmit = async (data: BoletimFormData) => {
    if (!data.veiculos || data.veiculos.length === 0) {
      toast.error("Adicione pelo menos um veículo antes de salvar.");
      return;
    }

    for (const [i, veiculo] of data.veiculos.entries()) {
      if (
        !veiculo.tipoVeiculo ||
        !veiculo.marca ||
        !veiculo.modelo ||
        !veiculo.cor ||
        !veiculo.ano ||
        !veiculo.placaVeiculo ||
        !veiculo.municipio ||
        !veiculo.uf ||
        !veiculo.chassi ||
        !veiculo.renavam ||
        !veiculo.velocidadeEstimada
      ) {
        toast.error(`Preencha todos os campos do veículo ${i + 1}`);
        return;
      }
      const c = veiculo.condutor;
      if (
        !c.nomeCondutor ||
        !c.sexo ||
        !c.idade ||
        !c.rg ||
        !c.cnh ||
        !c.categoriaCNH ||
        !c.registroCNH ||
        !c.validadeCNH ||
        !c.usavaCapaceteCinto ||
        !c.comportamento ||
        !c.testeEtilometro
      ) {
        toast.error(`Preencha todos os campos do condutor do veículo ${i + 1}`);
        return;
      }
      const p = veiculo.proprietario;
      if (!p.nomeProprietario || !p.cpfCnpj || !p.enderecoProprietario) {
        toast.error(
          `Preencha todos os campos do proprietário do veículo ${i + 1}`
        );
        return;
      }
      for (const [j, inf] of (veiculo.infracoes || []).entries()) {
        if (!inf.codigoInfracao || !inf.descricaoInfracao) {
          toast.error(
            `Preencha todos os campos da infração ${j + 1} do veículo ${i + 1}`
          );
          return;
        }
      }
    }

    try {
      setIsSubmitting(true);
      const sessionResponse = await axios.get("/api/session");
      const agentId = sessionResponse.data.user?.id;
      if (!agentId) {
        toast.error("Usuário não autenticado.");
        setIsSubmitting(false);
        return;
      }

      const payload = { data: { ...data, agentId } };
      const response = await axios.post("/api/boletim", payload);

      toast.success(
        `Boletim salvo com sucesso! Protocolo: ${response.data.protocol}`
      );

      reset({
        rua: "",
        bairro: "",
        pontoReferencia: "",
        dataOcorrencia: "",
        horaOcorrencia: "",
        tipoClassificacao: "",
        tipoAcidente: "",
        natureza: "",
        condicaoVia: "",
        vitimasFatais: 0,
        vitimasNaoFatais: 0,
        veiculos: [],
      });
    } catch (err: any) {
      console.error("Erro ao salvar boletim:", err);
      toast.error("Erro ao salvar boletim. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center py-8 px-4 w-full">
      <Card className="w-full max-w-[90%] shadow-lg">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row items-center bg-blue-950 p-5 rounded-2xl gap-2 text-white">
            <p className="text-lg sm:text-xl font-semibold">
              Boletim de Sinistro
            </p>
            <p className="p-2 rounded-2xl bg-yellow-500 text-white uppercase">
              Amttrans
            </p>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <LocalizacaoForm coords={coords} locationError={locationError} />

            {/* LOCALIZAÇÃO */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Localização</h2>
              {["rua", "bairro", "pontoReferencia"].map((field) => (
                <div key={field}>
                  <label className="block mb-1 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <Input
                    {...register(field as any, {
                      required: "Campo obrigatório",
                    })}
                    className={
                      errors[field as keyof typeof errors]
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {errors[field as keyof typeof errors] && (
                    <p className="text-red-500 text-sm">
                      {errors[field as keyof typeof errors]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <HorarioForm register={register} errors={errors} />

            <ClassificacaoForm control={control} errors={errors} />

            <VitimasForm register={register} errors={errors} />

            {/* VEÍCULOS */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Veículos Envolvidos</h2>
              <Button
                type="button"
                className="bg-yellow-500 w-full cursor-pointer"
                onClick={() =>
                  append({
                    tipoVeiculo: "",
                    marca: "",
                    modelo: "",
                    cor: "",
                    ano: "",
                    placaVeiculo: "",
                    municipio: "",
                    uf: "",
                    chassi: "",
                    renavam: "",
                    velocidadeEstimada: "",
                    condutor: {
                      nomeCondutor: "",
                      sexo: "",
                      idade: "",
                      rg: "",
                      cnh: "",
                      categoriaCNH: "",
                      registroCNH: "",
                      validadeCNH: "",
                      usavaCapaceteCinto: "",
                      comportamento: "",
                      testeEtilometro: "",
                    },
                    proprietario: {
                      nomeProprietario: "",
                      enderecoProprietario: "",
                      cpfCnpj: "",
                    },
                    infracoes: [],
                  })
                }
              >
                + Adicionar Veículo
              </Button>

              {fields.map((field, index) => (
                <VeiculoForm
                  key={field.id}
                  field={field}
                  index={index}
                  control={control}
                  register={register}
                  remove={remove}
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={!isValid || fields.length === 0 || isSubmitting}
              className="w-full bg-blue-900 hover:bg-blue-950 cursor-pointer"
            >
              {isSubmitting ? "Salvando..." : "Salvar Boletim"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

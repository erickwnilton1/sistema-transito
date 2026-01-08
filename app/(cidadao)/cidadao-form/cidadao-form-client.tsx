"use client";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "../_components/image-upload-app";

interface CidadaoFormData {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  placa: string;
  renavam: string;
  endereco: string;
  data: string;
  hora: string;
  outroCondutor?: { nome: string; telefone: string };
  outroVeiculo?: { placa: string; modelo: string };
  testemunhas: { nome: string; telefone: string }[];
  relato: string;
  imagemUrl: string;
}

const steps = [
  "Dados do Cidadão",
  "Veículo",
  "Ocorrência",
  "Envolvidos",
  "Relato",
  "Fotos da Ocorrência",
];

const stepFields: Record<number, (keyof CidadaoFormData)[]> = {
  0: ["nome", "email", "cpf", "telefone"],
  1: ["placa", "renavam"],
  2: ["endereco", "data", "hora"],
  3: [],
  4: ["relato"],
  5: ["imagemUrl"],
};

export default function CidadaoFormClient() {
  const [step, setStep] = useState(0);
  const [imagemUrl, setImagemUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<CidadaoFormData>({
    defaultValues: { testemunhas: [] },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "testemunhas",
  });

  const nextStep = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data: CidadaoFormData) => {
    const payload = {
      ...data,
      imagemUrl,
    };

    console.log(payload);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="relative h-[40vh] shadow-md">
        <Image
          src="/guarda-transito-cidadao.jpg"
          alt="Guarda-Trânsito"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 px-4">
          <img
            src="/logo-amttrans.png"
            alt="Logo"
            className="w-24 sm:w-32 mb-4"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Registro de Acidente de Trânsito
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg max-w-2xl">
            Registre um sinistro de forma rápida e simples. Em casos graves,
            você será orientado imediatamente.
          </p>
        </div>
      </div>

      <main className="flex-1 flex justify-center px-3 sm:px-6 py-8">
        <Card className="w-full max-w-3xl shadow-xl rounded-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-lg sm:text-xl">
              Registro de Ocorrência
            </CardTitle>
            <p className="text-center text-xs sm:text-sm text-gray-500">
              Etapa {step + 1} de {steps.length} — {steps[step]}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {step === 0 && (
                <section className="space-y-4">
                  <div className="space-y-1">
                    <Label>Nome completo *</Label>
                    <Input
                      placeholder="Nome completo"
                      {...register("nome", { required: "Nome é obrigatório" })}
                    />

                    {errors.nome && (
                      <div className="text-xs text-red-500">
                        {errors.nome.message}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label>E-mail *</Label>
                    <Input
                      placeholder="E-mail"
                      {...register("email", {
                        required: "E-mail é obrigatório",
                      })}
                    />

                    {errors.email && (
                      <div className="text-xs text-red-500">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label>CPF *</Label>
                    <Input
                      placeholder="CPF"
                      {...register("cpf", { required: "CPF é obrigatório" })}
                    />

                    {errors.cpf && (
                      <div className="text-xs text-red-500">
                        {errors.cpf.message}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label>Telefone *</Label>
                    <Input
                      placeholder="Telefone"
                      {...register("telefone", {
                        required: "Telefone é obrigatório",
                      })}
                    />

                    {errors.telefone && (
                      <div className="text-xs text-red-500">
                        {errors.telefone.message}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {step === 1 && (
                <section className="space-y-4">
                  <div className="space-y-1">
                    <Label>Placa do veículo *</Label>
                    <Input
                      placeholder="Placa do veículo"
                      {...register("placa", {
                        required: "Placa é obrigatória",
                      })}
                    />

                    {errors.placa && (
                      <div className="text-xs text-red-500">
                        {errors.placa.message}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label>Renavam *</Label>
                    <Input
                      placeholder="Renavam"
                      {...register("renavam", {
                        required: "Renavam é obrigatório",
                      })}
                    />

                    {errors.renavam && (
                      <div className="text-xs text-red-500">
                        {errors.renavam.message}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {step === 2 && (
                <section className="space-y-4">
                  <div className="space-y-1">
                    <Label>Endereço do ocorrido *</Label>
                    <Input
                      placeholder="Endereço do ocorrido"
                      {...register("endereco", {
                        required: "Endereço é obrigatório",
                      })}
                    />

                    {errors.endereco && (
                      <div className="text-xs text-red-500">
                        {errors.endereco.message}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label>Data *</Label>
                      <Input
                        type="date"
                        placeholder="Data"
                        {...register("data", {
                          required: "Data é obrigatória",
                        })}
                      />

                      {errors.data && (
                        <div className="text-xs text-red-500">
                          {errors.data.message}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label>Hora *</Label>
                      <Input
                        type="time"
                        placeholder="Hora"
                        {...register("hora", {
                          required: "Hora é obrigatória",
                        })}
                      />

                      {errors.hora && (
                        <div className="text-xs text-red-500">
                          {errors.hora.message}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {step === 3 && (
                <section className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">
                      Outro Condutor (opcional)
                    </h3>
                    <div className="space-y-1">
                      <Label>Nome</Label>
                      <Input
                        placeholder="Nome"
                        {...register("outroCondutor.nome")}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Telefone</Label>
                      <Input
                        placeholder="Telefone"
                        {...register("outroCondutor.telefone")}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">
                      Outro Veículo (opcional)
                    </h3>
                    <div className="space-y-1">
                      <Label>Placa</Label>
                      <Input
                        placeholder="Placa"
                        {...register("outroVeiculo.placa")}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Modelo</Label>
                      <Input
                        placeholder="Modelo"
                        {...register("outroVeiculo.modelo")}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Testemunhas</h3>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => append({ nome: "", telefone: "" })}
                    >
                      + Adicionar testemunha
                    </Button>
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                      >
                        <Input
                          placeholder="Nome"
                          {...register(`testemunhas.${index}.nome` as const)}
                        />
                        <Input
                          placeholder="Telefone"
                          {...register(
                            `testemunhas.${index}.telefone` as const
                          )}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)}
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {step === 4 && (
                <section className="space-y-2">
                  <Label>Relato do ocorrido *</Label>
                  <Textarea
                    rows={5}
                    placeholder="Relate todo ocorrido abaixo..."
                    {...register("relato", {
                      required: "Relato é obrigatório",
                    })}
                  />

                  {errors.relato && (
                    <div className="text-xs text-red-500">
                      {errors.relato.message}
                    </div>
                  )}
                </section>
              )}

              {step === 5 && (
                <section className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm">
                      Anexar fotos da ocorrência *
                    </h3>
                    <p className="text-xs text-gray-500">
                      Envie imagens que ajudem a identificar o ocorrido.
                    </p>
                  </div>

                  <input
                    type="hidden"
                    {...register("imagemUrl", {
                      required: "É obrigatório enviar ao menos uma imagem",
                    })}
                  />

                  {errors.imagemUrl && (
                    <p className="text-xs text-red-500">
                      {errors.imagemUrl.message}
                    </p>
                  )}

                  <ImageUpload
                    onUploadingChange={setUploadingImage}
                    onUploaded={(url) => {
                      setImagemUrl(url);
                      setValue("imagemUrl", url, { shouldValidate: true });
                      clearErrors("imagemUrl");
                    }}
                  />

                  {imagemUrl && (
                    <p className="text-xs text-green-600 break-all">
                      Imagem vinculada ao registro
                    </p>
                  )}
                </section>
              )}

              <div className="flex flex-col gap-3 justify-between">
                {step > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={uploadingImage}
                    className="w-full cursor-pointer text-white bg-blue-950 hover:bg-blue-900 hover:text-white"
                  >
                    Voltar
                  </Button>
                )}

                {step < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={uploadingImage}
                    className="w-full cursor-pointer bg-yellow-500 hover:bg-yellow-400"
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={uploadingImage}
                    className="w-full cursor-pointer bg-yellow-500 hover:bg-yellow-400"
                  >
                    {uploadingImage ? "Enviando imagem…" : "Enviar Registro"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="text-center text-gray-500 text-xs sm:text-sm py-6">
        <p>Autarquia de Trânsito - Atendimento 24h</p>
        <p>(81) 3559-1326</p>
      </footer>
    </div>
  );
}

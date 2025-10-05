"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";

interface Infracao {
  codigoInfracao: string;
  descricaoInfracao: string;
}

interface Condutor {
  nomeCondutor: string;
  sexo: string;
  idade: string;
  rg: string;
  cnh: string;
  categoriaCNH: string;
  registroCNH: string;
  validadeCNH: string;
  usavaCapaceteCinto: string;
  aparencia: string;
  comportamento: string;
  testeEtilometro: string;
}

interface Proprietario {
  nomeProprietario: string;
  enderecoProprietario: string;
  cpfCnpj: string;
}

interface Veiculo {
  tipoVeiculo: string;
  marca: string;
  modelo: string;
  cor: string;
  ano: string;
  placaVeiculo: string;
  municipio: string;
  uf: string;
  chassi: string;
  renavam: string;
  velocidadeEstimada: string;
  condutor: Condutor;
  proprietario: Proprietario;
  infracoes: Infracao[];
}

interface BoletimFormData {
  rua: string;
  bairro: string;
  pontoReferencia: string;
  dataOcorrencia: string;
  horaOcorrencia: string;
  horaChegadaAgente: string;
  horaLiberacaoVia: string;
  terminoOcorrencia: string;
  tipoClassificacao: string;
  naoFatais: string;
  fatais: string;
  natureza: string;
  sinistroVerificado: string;
  condicaoVia: string;
  conservacaoVia: string;
  condicaoTempo: string;
  semaforo: string;
  sinalizacao: string;
  pontoControle: string;
  placa: string;
  maoDirecao: string;
  divisaoVia: string;
  veiculos: Veiculo[];
}

export default function BoletimForm() {
  const { register, control, handleSubmit } = useForm<BoletimFormData>({
    defaultValues: { veiculos: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "veiculos",
  });

  const onSubmit = (data: BoletimFormData) => {
    console.log("Dados do formulário:", data);
    toast.success("Boletim registrado com sucesso!");
  };

  const tiposVeiculo = [
    "AUTOMOVEL",
    "BICICLETA",
    "CAMINHAO",
    "CAMINHONETE",
    "CAMIONETA",
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
    <div className="flex justify-center py-8 px-4 w-full">
      <Card className="w-full max-w-[90%]">
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
            {/* Localização */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Localização</h2>
              <div>
                <label className="block mb-1">Rua/Av</label>
                <Input
                  placeholder="Digite a rua ou avenida"
                  {...register("rua")}
                />
              </div>
              <div>
                <label className="block mb-1">Bairro</label>
                <Input placeholder="Digite o bairro" {...register("bairro")} />
              </div>
              <div>
                <label className="block mb-1">Ponto de Referência</label>
                <Input
                  placeholder="Ex.: Próximo ao supermercado"
                  {...register("pontoReferencia")}
                />
              </div>
            </div>

            {/* Horário */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Horário</h2>
              <div>
                <label className="block mb-1">Data da Ocorrência</label>
                <Input type="date" {...register("dataOcorrencia")} />
              </div>
              <div>
                <label className="block mb-1">Hora da Ocorrência</label>
                <Input
                  type="time"
                  placeholder="HH:MM"
                  {...register("horaOcorrencia")}
                />
              </div>
              <div>
                <label className="block mb-1">Chegada do Agente</label>
                <Input
                  type="time"
                  placeholder="HH:MM"
                  {...register("horaChegadaAgente")}
                />
              </div>
              <div>
                <label className="block mb-1">Liberação da Via</label>
                <Input
                  type="time"
                  placeholder="HH:MM"
                  {...register("horaLiberacaoVia")}
                />
              </div>
              <div>
                <label className="block mb-1">Término da Ocorrência</label>
                <Input
                  type="time"
                  placeholder="HH:MM"
                  {...register("terminoOcorrencia")}
                />
              </div>
            </div>

            {/* Classificação e Condições */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Classificação</h2>
              <div>
                <label className="block mb-1">Tipo de Classificação</label>
                <Controller
                  name="tipoClassificacao"
                  control={control}
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
              </div>
              <div>
                <label className="block mb-1">Número de Não Fatais</label>
                <Input
                  type="number"
                  placeholder="Ex.: 1"
                  {...register("naoFatais")}
                />
              </div>
              <div>
                <label className="block mb-1">Número de Fatais</label>
                <Input
                  type="number"
                  placeholder="Ex.: 2"
                  {...register("fatais")}
                />
              </div>

              <h2 className="font-semibold text-lg mt-4">Condições</h2>
              <div>
                <label className="block mb-1">Natureza do Acidente</label>
                <Controller
                  name="natureza"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Natureza" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ATROPELAMENTO">
                          ATROPELAMENTO
                        </SelectItem>
                        <SelectItem value="COLISAO">COLISÃO</SelectItem>
                        <SelectItem value="ENGAVETAMENTO">
                          ENGAVETAMENTO
                        </SelectItem>
                        <SelectItem value="CHOQUE">CHOQUE</SelectItem>
                        <SelectItem value="CAPOTAMENTO">CAPOTAMENTO</SelectItem>
                        <SelectItem value="PEDESTRE">PEDESTRE</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <label className="block mb-1">Condição da Via</label>
                <Controller
                  name="condicaoVia"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Condição da Via" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SECA">SECA</SelectItem>
                        <SelectItem value="MOLHADA">MOLHADA</SelectItem>
                        <SelectItem value="LAMEADA">LAMEADA</SelectItem>
                        <SelectItem value="OLEOSA">OLEOSA</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Veículos */}
            <div className="space-y-4 mt-6">
              <h2 className="font-semibold text-lg">Veículos Envolvidos</h2>
              <Button
                type="button"
                className="bg-yellow-500 w-full"
                onClick={() =>
                  append({
                    tipoVeiculo: "AUTOMOVEL",
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
                      aparencia: "NORMAL",
                      comportamento: "",
                      testeEtilometro: "REALIZADO",
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
                <Card key={field.id} className="p-4 border mt-2">
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

                  <Controller
                    name={`veiculos.${index}.tipoVeiculo`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo de Veículo" />
                        </SelectTrigger>
                        <SelectContent>
                          {tiposVeiculo.map((tipo) => (
                            <SelectItem key={tipo} value={tipo}>
                              {tipo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
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
                  </div>

                  {/* Condutor */}
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Condutor</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <label className="block mb-1">Nome</label>
                        <Input
                          {...register(
                            `veiculos.${index}.condutor.nomeCondutor`
                          )}
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Sexo</label>
                        <Input
                          {...register(`veiculos.${index}.condutor.sexo`)}
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Idade</label>
                        <Input
                          {...register(`veiculos.${index}.condutor.idade`)}
                        />
                      </div>
                      <div>
                        <label className="block mb-1">RG</label>
                        <Input {...register(`veiculos.${index}.condutor.rg`)} />
                      </div>
                      <div>
                        <label className="block mb-1">CNH</label>
                        <Input
                          {...register(`veiculos.${index}.condutor.cnh`)}
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Categoria CNH</label>
                        <Input
                          {...register(
                            `veiculos.${index}.condutor.categoriaCNH`
                          )}
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Registro CNH</label>
                        <Input
                          {...register(
                            `veiculos.${index}.condutor.registroCNH`
                          )}
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Validade CNH</label>
                        <Input
                          type="date"
                          {...register(
                            `veiculos.${index}.condutor.validadeCNH`
                          )}
                        />
                      </div>
                      <div>
                        <label className="block mb-1">
                          Usava capacete/cinto
                        </label>
                        <Input
                          {...register(
                            `veiculos.${index}.condutor.usavaCapaceteCinto`
                          )}
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Aparência</label>
                        <Select
                          {...register(`veiculos.${index}.condutor.aparencia`)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "NORMAL",
                              "SOB_ESTAFA",
                              "SOB_TOXICO",
                              "ALCOOLIZADO",
                            ].map((n) => (
                              <SelectItem key={n} value={n}>
                                {n}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block mb-1">Comportamento</label>
                        <Input
                          {...register(
                            `veiculos.${index}.condutor.comportamento`
                          )}
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Teste Etilômetro</label>
                        <Select
                          {...register(
                            `veiculos.${index}.condutor.testeEtilometro`
                          )}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "REALIZADO",
                              "ENCAMINHADO_PARA_EXAME",
                              "NAO_REALIZADO",
                            ].map((n) => (
                              <SelectItem key={n} value={n}>
                                {n}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Proprietário */}
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Proprietário</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <label className="block mb-1">Nome</label>
                        <Input
                          {...register(
                            `veiculos.${index}.proprietario.nomeProprietario`
                          )}
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Endereço</label>
                        <Input
                          {...register(
                            `veiculos.${index}.proprietario.enderecoProprietario`
                          )}
                        />
                      </div>
                      <div>
                        <label className="block mb-1">CPF/CNPJ</label>
                        <Input
                          {...register(
                            `veiculos.${index}.proprietario.cpfCnpj`
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Infrações */}
                  <div className="mt-4 space-y-2">
                    <h4 className="font-semibold mb-2">Infrações</h4>
                    <Input
                      placeholder="Código da Infração"
                      {...register(
                        `veiculos.${index}.infracoes.0.codigoInfracao`
                      )}
                    />
                    <Input
                      placeholder="Descrição da Infração"
                      {...register(
                        `veiculos.${index}.infracoes.0.descricaoInfracao`
                      )}
                    />
                  </div>
                </Card>
              ))}
            </div>

            <div className="pt-6 flex justify-end">
              <Button type="submit">Salvar Boletim</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

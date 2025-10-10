"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  tipoClassificacao: string;
  natureza: string;
  condicaoVia: string;
  veiculos: Veiculo[];
}

export default function BoletimForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BoletimFormData>({
    defaultValues: { veiculos: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "veiculos",
  });

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

  const onSubmit = async (data: BoletimFormData) => {
    if (!data.veiculos || data.veiculos.length === 0) {
      toast.error("Adicione pelo menos um veículo antes de salvar.");
      return;
    }

    try {
      const sessionResponse = await axios.get("/api/session");
      const agentId = sessionResponse.data.user?.id;

      if (!agentId) {
        toast.error("Usuário não autenticado.");
        return;
      }

      const payload = { data: { ...data, agentId } };
      const response = await axios.post("/api/boletim", payload);

      toast.success(
        `Boletim salvo com sucesso! Protocolo: ${response.data.protocol}`
      );
      reset({ veiculos: [] });
    } catch (err: any) {
      console.error("Erro ao salvar boletim:", err);
      toast.error("Erro ao salvar boletim. Tente novamente.");
    }
  };

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
            {/* LOCALIZAÇÃO */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Localização</h2>
              <div>
                <label className="block mb-1">Rua/Av</label>
                <Input
                  placeholder="Digite a rua ou avenida"
                  {...register("rua", { required: "Campo obrigatório" })}
                />
                {errors.rua && (
                  <p className="text-red-500 text-sm">{errors.rua.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1">Bairro</label>
                <Input
                  placeholder="Digite o bairro"
                  {...register("bairro", { required: "Campo obrigatório" })}
                />
                {errors.bairro && (
                  <p className="text-red-500 text-sm">
                    {errors.bairro.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1">Ponto de Referência</label>
                <Input
                  placeholder="Ex.: Próximo ao supermercado"
                  {...register("pontoReferencia", {
                    required: "Campo obrigatório",
                  })}
                />
                {errors.pontoReferencia && (
                  <p className="text-red-500 text-sm">
                    {errors.pontoReferencia.message}
                  </p>
                )}
              </div>
            </div>

            {/* HORÁRIO */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Horário</h2>
              <div>
                <label className="block mb-1">Data da Ocorrência</label>
                <Input
                  type="date"
                  {...register("dataOcorrencia", {
                    required: "Campo obrigatório",
                  })}
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
                />
                {errors.horaOcorrencia && (
                  <p className="text-red-500 text-sm">
                    {errors.horaOcorrencia.message}
                  </p>
                )}
              </div>
            </div>

            {/* CLASSIFICAÇÃO */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Classificação</h2>
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
            </div>

            {/* CONDIÇÕES */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Condições</h2>
              <div>
                <label className="block mb-1">Natureza do Acidente</label>
                <Controller
                  name="natureza"
                  control={control}
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
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
                {errors.natureza && (
                  <p className="text-red-500 text-sm">
                    {errors.natureza.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1">Condição da Via</label>
                <Controller
                  name="condicaoVia"
                  control={control}
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
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
                {errors.condicaoVia && (
                  <p className="text-red-500 text-sm">
                    {errors.condicaoVia.message}
                  </p>
                )}
              </div>
            </div>

            {/* VEÍCULOS */}
            <div className="space-y-4 mt-6">
              <h2 className="font-semibold text-lg">Veículos Envolvidos</h2>
              <Button
                type="button"
                className="bg-yellow-500 w-full"
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
                      aparencia: "",
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

                  {/* Campos do veículo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    <div>
                      <label className="block mb-1">Tipo do Veículo</label>
                      <Controller
                        name={`veiculos.${index}.tipoVeiculo`}
                        control={control}
                        render={({ field }) => (
                          <Select
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

                  {/* CONDUTOR */}
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Condutor</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <label>Nome</label>
                        <Input
                          {...register(
                            `veiculos.${index}.condutor.nomeCondutor`
                          )}
                        />
                      </div>
                      <div>
                        <label>Sexo</label>
                        <Input
                          {...register(`veiculos.${index}.condutor.sexo`)}
                        />
                      </div>
                      <div>
                        <label>Idade</label>
                        <Input
                          {...register(`veiculos.${index}.condutor.idade`)}
                        />
                      </div>
                      <div>
                        <label>RG</label>
                        <Input {...register(`veiculos.${index}.condutor.rg`)} />
                      </div>
                      <div>
                        <label>CNH</label>
                        <Input
                          {...register(`veiculos.${index}.condutor.cnh`)}
                        />
                      </div>
                      <div>
                        <label>Categoria CNH</label>
                        <Input
                          {...register(
                            `veiculos.${index}.condutor.categoriaCNH`
                          )}
                        />
                      </div>
                      <div>
                        <label>Registro CNH</label>
                        <Input
                          {...register(
                            `veiculos.${index}.condutor.registroCNH`
                          )}
                        />
                      </div>
                      <div>
                        <label>Validade CNH</label>
                        <Input
                          type="date"
                          {...register(
                            `veiculos.${index}.condutor.validadeCNH`
                          )}
                        />
                      </div>
                      <div>
                        <label>Usava Cinto/Capacete</label>
                        <Input
                          {...register(
                            `veiculos.${index}.condutor.usavaCapaceteCinto`
                          )}
                        />
                      </div>
                      <div>
                        <label>Aparência</label>
                        <Input
                          {...register(`veiculos.${index}.condutor.aparencia`)}
                        />
                      </div>
                      <div>
                        <label>Comportamento</label>
                        <Input
                          {...register(
                            `veiculos.${index}.condutor.comportamento`
                          )}
                        />
                      </div>
                      <div>
                        <label>Teste Etilômetro</label>
                        <Input
                          {...register(
                            `veiculos.${index}.condutor.testeEtilometro`
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* PROPRIETÁRIO */}
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Proprietário</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <label>Nome</label>
                        <Input
                          {...register(
                            `veiculos.${index}.proprietario.nomeProprietario`
                          )}
                        />
                      </div>
                      <div>
                        <label>CPF/CNPJ</label>
                        <Input
                          {...register(
                            `veiculos.${index}.proprietario.cpfCnpj`
                          )}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label>Endereço</label>
                        <Input
                          {...register(
                            `veiculos.${index}.proprietario.enderecoProprietario`
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* INFRAÇÕES */}
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Infrações</h4>
                    <Controller
                      name={`veiculos.${index}.infracoes`}
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          {field.value?.map((_, infIndex) => (
                            <div
                              key={infIndex}
                              className="flex gap-2 items-center"
                            >
                              <Input
                                placeholder="Código da infração"
                                value={
                                  field.value[infIndex]?.codigoInfracao || ""
                                }
                                onChange={(e) => {
                                  const updated = [...field.value];
                                  updated[infIndex].codigoInfracao =
                                    e.target.value;
                                  field.onChange(updated);
                                }}
                              />
                              <Input
                                placeholder="Descrição da infração"
                                value={
                                  field.value[infIndex]?.descricaoInfracao || ""
                                }
                                onChange={(e) => {
                                  const updated = [...field.value];
                                  updated[infIndex].descricaoInfracao =
                                    e.target.value;
                                  field.onChange(updated);
                                }}
                              />
                              <Button
                                type="button"
                                variant="destructive"
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
                </Card>
              ))}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-950"
            >
              Salvar Boletim
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

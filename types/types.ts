export interface Infracao {
  codigoInfracao: string;
  descricaoInfracao: string;
}

export interface Condutor {
  nomeCondutor: string;
  sexo: string;
  idade: string;
  rg: string;
  cnh: string;
  categoriaCNH: string;
  registroCNH: string;
  validadeCNH: string;
  usavaCapaceteCinto: string;
  comportamento: string;
  testeEtilometro: string;
}

export interface Proprietario {
  nomeProprietario: string;
  enderecoProprietario: string;
  cpfCnpj: string;
}

export interface Veiculo {
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

export interface BoletimFormData {
  rua: string;
  bairro: string;
  pontoReferencia: string;
  dataOcorrencia: string;
  horaOcorrencia: string;
  tipoClassificacao: string;
  tipoAcidente: string;
  natureza: string;
  condicaoVia: string;
  vitimasFatais: number;
  vitimasNaoFatais: number;
  latitude?: number;
  longitude?: number;
  veiculos: Veiculo[];
}

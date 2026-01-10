/**
 * Types para o Sistema de Boletim de Cidadão
 * Arquivo: @/types/boletim.ts
 */

/**
 * Status possíveis de um boletim
 */
export type BulletinStatus = "PENDING" | "APPROVED" | "REJECTED";

/**
 * Informações de outro condutor envolvido no incidente
 */
export interface OutroCondutor {
  nome: string;
  cpf: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  cnh?: string;
  categoriaCNH?: string;
}

/**
 * Informações de outro veículo envolvido no incidente
 */
export interface OutroVeiculo {
  placa: string;
  marca: string;
  modelo?: string;
  cor?: string;
  ano?: number;
  renavam?: string;
  proprietario?: string;
}

/**
 * Informações de testemunha
 */
export interface Testemunha {
  nome: string;
  cpf?: string;
  telefone: string;
  email?: string;
  endereco?: string;
}

/**
 * Dados completos de um boletim de cidadão
 */
export interface CitizenBulletin {
  id: string;
  protocol: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  placa: string;
  renavam: string;
  endereco: string;
  data: Date | string;
  hora: string;
  outroCondutor?: OutroCondutor | null;
  outroVeiculo?: OutroVeiculo | null;
  testemunhas?: Testemunha[] | null;
  relato: string;
  imageUrl: string;
  status: BulletinStatus;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

/**
 * Payload para criar um novo boletim
 */
export interface CreateBulletinPayload {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  placa: string;
  renavam: string;
  endereco: string;
  data: string | Date;
  hora: string;
  outroCondutor?: OutroCondutor | null;
  outroVeiculo?: OutroVeiculo | null;
  testemunhas?: Testemunha[] | null;
  relato: string;
  imagemUrl: string;
}

/**
 * Resposta ao criar um boletim
 */
export interface CreateBulletinResponse {
  message: string;
  id: string;
  protocol: string;
}

/**
 * Resposta ao buscar boletins com paginação
 */
export interface GetBulletinsResponse {
  bulletins: CitizenBulletin[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

/**
 * Resposta de erro da API
 */
export interface ApiErrorResponse {
  error: string;
  existingProtocol?: string;
}

/**
 * Parâmetros de query para buscar boletins
 */
export interface GetBulletinsParams {
  page?: number;
  limit?: number;
  status?: BulletinStatus;
}

/**
 * Payload para atualizar um boletim
 */
export interface UpdateBulletinPayload {
  nome?: string;
  email?: string;
  cpf?: string;
  telefone?: string;
  placa?: string;
  renavam?: string;
  endereco?: string;
  data?: string | Date;
  hora?: string;
  outroCondutor?: OutroCondutor | null;
  outroVeiculo?: OutroVeiculo | null;
  testemunhas?: Testemunha[] | null;
  relato?: string;
  imageUrl?: string;
  status?: BulletinStatus;
}

/**
 * Resposta ao atualizar um boletim
 */
export interface UpdateBulletinResponse {
  message: string;
  id: string;
  protocol: string;
}

/**
 * Informações de protocolo gerado
 */
export interface ProtocolInfo {
  protocol: string;
  bulletinId: string;
  createdAt: Date;
  status: BulletinStatus;
}

/**
 * Filtros para buscar boletins
 */
export interface BulletinFilters {
  status?: BulletinStatus;
  cpf?: string;
  placa?: string;
  email?: string;
  dataInicio?: Date;
  dataFim?: Date;
  protocol?: string;
}

/**
 * Dados para exportação de boletim
 */
export interface BulletinExportData {
  id: string;
  protocol: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  placa: string;
  renavam: string;
  endereco: string;
  data: string;
  hora: string;
  relato: string;
  status: BulletinStatus;
  criadoEm: string;
}

/**
 * Estatísticas de boletins
 */
export interface BulletinStatistics {
  total: number;
  pendentes: number;
  aprovados: number;
  rejeitados: number;
  percentualAprovacao: number;
  percentualRejeicao: number;
  percentualPendente: number;
}

/**
 * Validação de campos de boletim
 */
export interface BulletinValidationErrors {
  nome?: string;
  email?: string;
  cpf?: string;
  telefone?: string;
  placa?: string;
  renavam?: string;
  endereco?: string;
  data?: string;
  hora?: string;
  relato?: string;
  imagemUrl?: string;
}

/**
 * Contexto de boletim para componentes React
 */
export interface BulletinContextType {
  bulletins: CitizenBulletin[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  statusFilter: BulletinStatus | "";
  fetchBulletins: (page: number, status?: BulletinStatus | "") => Promise<void>;
  createBulletin: (
    data: CreateBulletinPayload
  ) => Promise<CreateBulletinResponse>;
  updateBulletin: (
    id: string,
    data: UpdateBulletinPayload
  ) => Promise<UpdateBulletinResponse>;
  deleteBulletin: (id: string) => Promise<void>;
  setStatusFilter: (status: BulletinStatus | "") => void;
}

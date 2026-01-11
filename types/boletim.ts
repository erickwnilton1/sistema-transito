export type BulletinStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface OutroCondutor {
  nome: string;
  cpf: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  cnh?: string;
  categoriaCNH?: string;
}

export interface OutroVeiculo {
  placa: string;
  marca: string;
  modelo?: string;
  cor?: string;
  ano?: number;
  renavam?: string;
  proprietario?: string;
}

export interface Testemunha {
  nome: string;
  cpf?: string;
  telefone: string;
  email?: string;
  endereco?: string;
}

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

export interface CreateBulletinResponse {
  message: string;
  id: string;
  protocol: string;
}

export interface GetBulletinsResponse {
  bulletins: CitizenBulletin[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface ApiErrorResponse {
  error: string;
  existingProtocol?: string;
}

export interface GetBulletinsParams {
  page?: number;
  limit?: number;
  status?: BulletinStatus;
}
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
export interface UpdateBulletinResponse {
  message: string;
  id: string;
  protocol: string;
}

export interface ProtocolInfo {
  protocol: string;
  bulletinId: string;
  createdAt: Date;
  status: BulletinStatus;
}

export interface BulletinFilters {
  status?: BulletinStatus;
  cpf?: string;
  placa?: string;
  email?: string;
  dataInicio?: Date;
  dataFim?: Date;
  protocol?: string;
}

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

export interface BulletinStatistics {
  total: number;
  pendentes: number;
  aprovados: number;
  rejeitados: number;
  percentualAprovacao: number;
  percentualRejeicao: number;
  percentualPendente: number;
}

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

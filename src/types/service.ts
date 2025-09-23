export interface Service {
  id: string;
  nome: string;
  duracao_minutos: number;
  preco: number;
  descricao?: string;
}

export interface ScheduledService {
  id: string;
  service: Service;
  slot: string;
  status: 'agendado' | 'realizado' | 'cancelado';
}

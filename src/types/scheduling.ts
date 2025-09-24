export interface Horario {
  id: string;
  configuracao_id: string;
  dia_semana: number; // 0 = domingo, 6 = sábado
  aberto: boolean;
  horario_abertura: string; // 'HH:MM:SS'
  horario_fechamento: string; // 'HH:MM:SS'
}

export interface Excecao {
  id: string;
  configuracao_id: string;
  data: string; // 'YYYY-MM-DD'
  aberto: boolean;
}

export interface ConfiguracaoOficina {
  id: string;
  quantidade_funcionarios: number;
}

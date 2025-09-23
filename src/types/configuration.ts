export type Configuration = {
  id: string;
  admin_id: string | null;
  quantidade_funcionarios: number;
  criado_em: string;
};

export type Horario = {
  id: string;
  configuracao_id: string;
  dia_semana: number; // 0=Dom, 6=Sáb
  aberto: boolean;
  horario_abertura: string;
  horario_fechamento: string;
};

export type Excecao = {
  id: string;
  configuracao_id: string;
  data: string;
  aberto: boolean;
};

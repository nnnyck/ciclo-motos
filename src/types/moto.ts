// Arquivo: src/types/moto.ts

export enum MotoCor {
  Preto = 'Preto',
  Branco = 'Branco',
  Prata = 'Prata',
  Cinza = 'Cinza',
  Vermelho = 'Vermelho',
  Azul = 'Azul',
  Amarelo = 'Amarelo',
  Laranja = 'Laranja',
  Verde = 'Verde',
  Roxo = 'Roxo',
}

export type MotoImagem = {
  id: string;
  url: string;
  destaque: boolean;
  ordem: number | null;
};

export type Moto = {
  id?: string;
  marca: string;
  nome: string;
  cilindrada: number;
  cor: MotoCor;
  ano: number;
  preco: number;
  descricao?: string;
  quilometragem?: number;
  categoria?: string;
  
  // Usado na página de admin
  motos_imagens?: MotoImagem[];

  // Fornecido pela nossa nova VIEW na página pública
  imagem_url?: string | null;
};

export type MotoWithId = Moto & { id: string };
export type Moto = {
  id?: string;
  nome: string;
  marca: string;
  ano: number;
  preco: string;
  descricao?: string;
  quilometragem?: number;
  categoria?: string;
  motos_imagens?: { id: string; url: string }[];
};

export type MotoWithId = Moto & { id: string };
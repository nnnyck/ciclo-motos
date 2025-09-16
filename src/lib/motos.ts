import { supabase } from "@/lib/supabaseClient";

export async function getMarcasComContagem() {
  const { data, error } = await supabase.rpc("contar_marcas");

  if (error) throw error;

  return data;
}

type CategoriaRow = { categoria: string };
export async function getCategorias(): Promise<string[]> {
  const { data, error } = await supabase.rpc("get_categorias");

  if (error) {
    console.error("Erro ao buscar categorias:", error.message ?? error);
    throw error;
  }

  // Garantimos que `data` é um array de objetos { categoria: string }
  const rows = (data ?? []) as CategoriaRow[];

  console.log("Categorias obtidas:", rows);
  return rows.map((r) => r.categoria);
}

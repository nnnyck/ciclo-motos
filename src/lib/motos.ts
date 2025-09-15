import { supabase } from "@/lib/supabaseClient";

export async function getMarcasComContagem() {
  const { data, error } = await supabase.rpc("contar_marcas");

  if (error) throw error;

  return data;
}

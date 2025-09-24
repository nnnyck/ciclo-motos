// src/app/api/appointments/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { service_id, configuracao_id, data, hora } = body; // 'hora' já vem como "HH:MM"

    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Usuário não logado" }, { status: 401 });
    }

    const supabaseServer = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        global: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        },
    }
    );

    const { data: userData, error: userError } = await supabaseServer.auth.getUser();
    if (!userData.user || userError) {
      return NextResponse.json({ error: "Usuário não logado" }, { status: 401 });
    }
    const userId = userData.user.id;
    
    // NÃO PRECISA MAIS DAQUELA LINHA DE CONVERSÃO

    // 6️⃣ Inserir no Supabase
    const { data: agendamento, error } = await supabaseServer
      .from("agendamentos")
      .insert([
        {
          user_id: userId,
          configuracao_id,
          servico_id: service_id,
          data,
          hora: hora, // Use a variável 'hora' diretamente
          status: "pendente",
        },
      ])
      .select()
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json(agendamento);
  } catch (err: unknown) {
  console.error(err);
  // Se err for um Error, use err.message; senão, transforme em string
  const message = err instanceof Error ? err.message : String(err);
  return NextResponse.json({ error: message }, { status: 500 });
}
}
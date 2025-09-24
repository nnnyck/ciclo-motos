import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Horario, Excecao } from '@/types/scheduling';

interface Props {
  configuracaoId: string;
  daysAhead?: number;
  onSelectDay?: (date: string) => void;
}

export default function AvailableDays({ configuracaoId, daysAhead = 14, onSelectDay }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  useEffect(() => {
    fetchAvailableDays();
  }, [configuracaoId]);

  const formatDateKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  async function fetchAvailableDays() {
    setLoading(true);
    setError(null);
    setAvailableDates([]);

    try {
      // 1) Buscar horários semanais
      const horariosResponse = await supabase
        .from('horarios_funcionamento')
        .select('*')
        .eq('configuracao_id', configuracaoId);

      if (horariosResponse.error) throw horariosResponse.error;

      const horariosData = horariosResponse.data as Horario[];

      // 2) Buscar exceções
      const today = new Date();
      const endDate = addDays(today, daysAhead);
      const startISO = formatDateKey(today);
      const endISO = formatDateKey(endDate);

      const excecoesResponse = await supabase
        .from('excecoes_oficina')
        .select('*')
        .eq('configuracao_id', configuracaoId)
        .gte('data', startISO)
        .lte('data', endISO);

      if (excecoesResponse.error) throw excecoesResponse.error;

      const excecoesData = excecoesResponse.data as Excecao[];

      const horarioMap = new Map<number, Horario>();
      horariosData.forEach(h => horarioMap.set(h.dia_semana, h));

      const excecoesMap = new Map<string, Excecao>();
      excecoesData.forEach(e => excecoesMap.set(e.data, e));

      const dates: string[] = [];
      for (let i = 0; i <= daysAhead; i++) {
        const d = addDays(today, i);
        const dateKey = formatDateKey(d);

        const excecao = excecoesMap.get(dateKey);
        let horarioDoDia = horarioMap.get(d.getDay());
        let abertoDia = horarioDoDia?.aberto ?? false;

        if (excecao) {
          abertoDia = excecao.aberto;
          if (abertoDia) horarioDoDia = horarioMap.get(d.getDay());
        }

        if (abertoDia) dates.push(dateKey);
      }

      setAvailableDates(dates);
    } catch (err: unknown) {
      setError((err as Error)?.message ?? 'Erro ao buscar dias disponíveis');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <h4 className="font-semibold text-gray-800 mb-2">Dias disponíveis</h4>
      {loading && <p className="text-gray-600">Carregando dias...</p>}
      {error && <p className="text-red-600">Erro: {error}</p>}
      {!loading && !error && availableDates.length === 0 && (
        <p className="text-gray-500">Nenhum dia disponível nos próximos {daysAhead} dias.</p>
      )}
      <div className="flex flex-wrap gap-2">
        {availableDates.map(date => {
          const d = new Date(date + 'T00:00:00');
          const label = d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' });
          return (
            <button
              key={date}
              className="px-3 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
              onClick={() => onSelectDay?.(date)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

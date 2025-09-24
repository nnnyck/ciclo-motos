'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Horario, Excecao } from '@/types/scheduling';
import { Service } from '@/types/service';

interface Props {
  configuracaoId: string;
  selectedDate: string; // 'YYYY-MM-DD'
  service: Service;
  intervalMinutes?: number; // default 30
  onSelectHour?: (isoString: string) => void;
}

interface AgendamentoDb {
  id: string;
  servico_id: string;
  data: string;
  hora: string;
  status: string;
}

export default function AvailableHours({
  configuracaoId,
  selectedDate,
  service,
  intervalMinutes = 30,
  onSelectHour,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableHours, setAvailableHours] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedDate) return;
    fetchAvailableHours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, service]);

  const parseTimeToDate = (dateISO: string, timeStr: string) => {
    const [y, m, d] = dateISO.split('-').map(Number);
    const [h, min, sec] = timeStr.split(':').map(Number);
    return new Date(y, m - 1, d, h, min, sec ?? 0);
  };

  const addMinutes = (d: Date, mins: number) => {
    return new Date(d.getTime() + mins * 60000);
  };

  const overlaps = (aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) => {
    return aStart < bEnd && bStart < aEnd;
  };

  async function fetchAvailableHours() {
    setLoading(true);
    setError(null);
    setAvailableHours([]);

    try {
      // 1) Buscar horários do dia da semana
      const horariosResponse = await supabase
        .from('horarios_funcionamento')
        .select('*')
        .eq('configuracao_id', configuracaoId);
      if (horariosResponse.error) throw horariosResponse.error;
      const horariosData = horariosResponse.data as Horario[];

      // 2) Buscar exceções
      const excecoesResponse = await supabase
        .from('excecoes_oficina')
        .select('*')
        .eq('configuracao_id', configuracaoId)
        .eq('data', selectedDate);
      if (excecoesResponse.error) throw excecoesResponse.error;
      const excecoesData = excecoesResponse.data as Excecao[];

      const d = new Date(selectedDate + 'T00:00:00');
      const dayOfWeek = d.getDay(); // 0=domingo, 6=sábado

      // Checar exceções
      const excecao = excecoesData[0];
      let horarioDoDia = horariosData.find(h => h.dia_semana === dayOfWeek);
      let abertoDia = horarioDoDia?.aberto ?? false;

      if (excecao) {
        abertoDia = excecao.aberto;
        if (abertoDia) horarioDoDia = horariosData.find(h => h.dia_semana === dayOfWeek);
      }

      if (!abertoDia || !horarioDoDia) {
        setAvailableHours([]);
        return;
      }

      // 3) Buscar agendamentos
      const agendamentosResponse = await supabase
        .from('agendamentos')
        .select('*')
        .eq('data', selectedDate)
        .neq('status', 'cancelado');
      if (agendamentosResponse.error) throw agendamentosResponse.error;
      const agendamentos = agendamentosResponse.data as AgendamentoDb[];

      // 4) Gerar slots de horários
      const abertura = parseTimeToDate(selectedDate, horarioDoDia.horario_abertura);
      const fechamento = parseTimeToDate(selectedDate, horarioDoDia.horario_fechamento);

      const slots: string[] = [];
      let cursor = new Date(abertura);

      while (addMinutes(cursor, service.duracao_minutos) <= fechamento) {
        const slotEnd = addMinutes(cursor, service.duracao_minutos);

        const overlapping = agendamentos.some(a => {
          const agStart = parseTimeToDate(a.data, a.hora);
          const agEnd = addMinutes(agStart, service.duracao_minutos); // assume duração do serviço selecionado
          return overlaps(cursor, slotEnd, agStart, agEnd);
        });

        if (!overlapping && cursor > new Date()) {
          slots.push(cursor.toISOString());
        }

        cursor = addMinutes(cursor, intervalMinutes);
      }

      setAvailableHours(slots);
    } catch (err: unknown) {
      setError((err as Error)?.message ?? 'Erro ao carregar horários');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <h4 className="font-semibold text-gray-800 mb-2">Horários disponíveis</h4>
      {loading && <p className="text-gray-600">Carregando horários...</p>}
      {error && <p className="text-red-600">Erro: {error}</p>}
      {!loading && !error && availableHours.length === 0 && (
        <p className="text-gray-500">Nenhum horário disponível neste dia.</p>
      )}
      <div className="flex flex-wrap gap-2">
        {availableHours.map(iso => {
          const dt = new Date(iso);
          const label = dt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
          return (
            <button
              key={iso}
              className="px-3 py-1 rounded bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
              onClick={() => onSelectHour?.(iso)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

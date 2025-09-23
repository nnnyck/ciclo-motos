'use client';

import { useState, useEffect } from 'react';
import { Horario } from '@/types/configuration';
import { supabase } from '@/lib/supabaseClient';

interface Props {
  configuracao_id: string;
}

export default function HorariosForm({ configuracao_id }: Props) {
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const [horarios, setHorarios] = useState<Horario[]>([]);

  useEffect(() => {
    async function fetchHorarios() {
      const { data, error } = await supabase
        .from('horarios_funcionamento')
        .select('*')
        .eq('configuracao_id', configuracao_id);

      if (error) {
        console.error('Erro ao buscar horários:', error);
        return;
      }

      const fullWeek: Horario[] = Array.from({ length: 7 }, (_, i) => {
        const h = data?.find((hor) => hor.dia_semana === i);
        return h || {
          id: null,
          configuracao_id,
          dia_semana: i,
          aberto: true,
          horario_abertura: '08:00',
          horario_fechamento: '18:00',
        };
      });

      setHorarios(fullWeek);
    }

    fetchHorarios();
  }, [configuracao_id]);

  const handleChange = (index: number, field: keyof Horario, value: any) => {
    const updated = [...horarios];
    updated[index] = { ...updated[index], [field]: value };
    setHorarios(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    for (const h of horarios) {
      if (h.id) {
        const { error } = await supabase
          .from('horarios_funcionamento')
          .update({
            aberto: h.aberto,
            horario_abertura: h.horario_abertura,
            horario_fechamento: h.horario_fechamento,
          })
          .eq('id', h.id);
        if (error) console.error('Erro ao atualizar horário:', error);
      } else {
        const { error } = await supabase
          .from('horarios_funcionamento')
          .insert([{
            configuracao_id,
            dia_semana: h.dia_semana,
            aberto: h.aberto,
            horario_abertura: h.horario_abertura,
            horario_fechamento: h.horario_fechamento,
          }]);
        if (error) console.error('Erro ao inserir horário:', error);
      }
    }

    alert('Horários salvos!');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-2">
      {diasSemana.map((dia, i) => {
        const h = horarios[i];

        const abertura = h?.horario_abertura ?? '08:00';
        const fechamento = h?.horario_fechamento ?? '18:00';

        return (
          <div key={i} className="flex gap-2 items-center">
            <span className="w-16 text-gray-800">{dia}</span>
            <input
              type="time"
              value={abertura}
              onChange={(e) => handleChange(i, 'horario_abertura', e.target.value)}
              className="border p-1 rounded text-gray-800"
            />
            <input
              type="time"
              value={fechamento}
              onChange={(e) => handleChange(i, 'horario_fechamento', e.target.value)}
              className="border p-1 rounded text-gray-800"
            />
            <label className="ml-2 text-gray-800">
              <input
                type="checkbox"
                checked={h?.aberto ?? true}
                onChange={(e) => handleChange(i, 'aberto', e.target.checked)}
              />{' '}
              Aberto
            </label>
          </div>
        );
      })}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
        Salvar horários
      </button>
    </form>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { Excecao } from '@/types/configuration';
import { supabase } from '@/lib/supabaseClient';

interface Props {
  configuracao_id: string;
}

export default function ExcecoesForm({ configuracao_id }: Props) {
  const [excecoes, setExcecoes] = useState<Excecao[]>([]);
  const [novaData, setNovaData] = useState('');

  useEffect(() => {
    async function fetchExcecoes() {
      const { data } = await supabase.from('excecoes_oficina').select('*').eq('configuracao_id', configuracao_id);
      if (data) setExcecoes(data);
    }
    fetchExcecoes();
  }, [configuracao_id]);

  const addExcecao = async () => {
    if (!novaData) return;
    const { data } = await supabase.from('excecoes_oficina').insert([{ configuracao_id, data: novaData, aberto: false }]);
    if (data) setExcecoes((prev) => [...prev, ...data]);
    setNovaData('');
  };

  const toggleAberto = async (id: string, aberto: boolean) => {
    await supabase.from('excecoes_oficina').update({ aberto }).eq('id', id);
    setExcecoes((prev) => prev.map((e) => (e.id === id ? { ...e, aberto } : e)));
  };

  return (
    <div className="p-4 border rounded space-y-2">
      <div className="flex gap-2">
        <input type="date" value={novaData} onChange={(e) => setNovaData(e.target.value)} className="border p-1 rounded text-gray-800"/>
        <button onClick={addExcecao} className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer">Adicionar exceção</button>
      </div>
      {excecoes.map((e) => (
        <div key={e.id} className="flex items-center gap-2">
          <span className='text-gray-500'>{e.data}</span>
          <label className='text-gray-800'>
            <input type="checkbox" checked={e.aberto} onChange={(ev) => toggleAberto(e.id, ev.target.checked)} className='cursor-pointer' /> Aberto
          </label>
        </div>
      ))}
    </div>
  );
}

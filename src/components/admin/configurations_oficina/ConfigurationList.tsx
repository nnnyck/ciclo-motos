'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Configuration } from '@/types/configuration';

interface Props {
  onEdit: (config: Configuration) => void;
}

export default function ConfigurationList({ onEdit }: Props) {
  const [configurations, setConfigurations] = useState<Configuration[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConfigurations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('configuracoes_oficina')
      .select('*')
      .order('criado_em', { ascending: false });

    if (error) {
      console.error('Erro ao buscar configurações:', error);
    } else {
      setConfigurations(data as Configuration[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchConfigurations();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta configuração?')) return;

    const { error } = await supabase.from('configuracoes_oficina').delete().eq('id', id);
    if (error) {
      console.error('Erro ao excluir configuração:', error);
    } else {
      fetchConfigurations();
    }
  };

  if (loading) return <p>Carregando configurações...</p>;

  if (configurations.length === 0) return <p className='text-gray-800'>Nenhuma configuração encontrada.</p>;

  return (
    <div className="space-y-2">
      {configurations.map((config) => (
        <div key={config.id} className="p-3 border rounded flex justify-between items-center">
          <div>
            <p className='text-gray-600'><strong>ID:</strong> {config.id}</p>
            <p className='text-gray-600'><strong>Funcionários:</strong> {config.quantidade_funcionarios}</p>
            <p className='text-gray-600'><strong>Criado em:</strong> {new Date(config.criado_em).toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(config)}
              className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 transition cursor-pointer"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(config.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

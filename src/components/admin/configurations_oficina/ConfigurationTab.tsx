'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ConfigurationForm, { ConfigurationFormData } from './ConfigurationForm';
import { Configuration } from '@/types/configuration';
import ConfigurationList from './ConfigurationList';
import HorariosForm from './HorarioForm';
import ExcecoesForm from './ExcecaoForm';

export default function ConfigurationTab() {
  const [editingConfig, setEditingConfig] = useState<Configuration | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSubmit = async (data: ConfigurationFormData) => {
    if (editingConfig) {
      // Atualiza configuração existente
      const { error } = await supabase
        .from('configuracoes_oficina')
        .update({ quantidade_funcionarios: data.quantidade_funcionarios })
        .eq('id', editingConfig.id);

      if (error) return console.error('Erro ao atualizar configuração:', error);
    } else {
      // Cria nova configuração
      const { error } = await supabase.from('configuracoes_oficina').insert([data]);
      if (error) return console.error('Erro ao criar configuração:', error);
    }

    setEditingConfig(null);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="p-4 space-y-6 bg-white rounded shadow">

      <ConfigurationForm
        initialData={editingConfig ? { quantidade_funcionarios: editingConfig.quantidade_funcionarios } : undefined}
        onSubmit={handleSubmit}
        onCancel={() => setEditingConfig(null)}
      />

      <hr />

      <ConfigurationList
        key={refreshKey}
        onEdit={(config) => setEditingConfig(config)}
      />

      {editingConfig && (
        <>
          <h3 className="font-extrabold text-gray-800 mb-3">Horários da oficina</h3>
          <HorariosForm configuracao_id={editingConfig.id} />

          <h3 className="font-extrabold text-gray-800 mb-3">Exceções / feriados</h3>
          <ExcecoesForm configuracao_id={editingConfig.id} />
        </>
      )}
    </div>
  );
}

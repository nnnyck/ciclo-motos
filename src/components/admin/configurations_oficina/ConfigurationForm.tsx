'use client';

import { useState } from 'react';

export type ConfigurationFormData = {
  quantidade_funcionarios: number;
};

interface Props {
  initialData?: ConfigurationFormData;
  onSubmit: (data: ConfigurationFormData) => void;
  onCancel?: () => void;
}

export default function ConfigurationForm({ initialData, onSubmit, onCancel }: Props) {
  const [quantidadeFuncionarios, setQuantidadeFuncionarios] = useState(initialData?.quantidade_funcionarios || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ quantidade_funcionarios: Number(quantidadeFuncionarios) });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-4">
      <div>
        <label className="font-extrabold text-gray-800 mb-3">Quantidade de Funcionários</label>
        <input
          type="number"
          min={1}
          value={quantidadeFuncionarios}
          onChange={(e) => setQuantidadeFuncionarios(Number(e.target.value))}
          className="border rounded p-2 w-full text-gray-500"
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Salvar
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

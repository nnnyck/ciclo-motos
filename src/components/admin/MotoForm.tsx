'use client'

import { useState } from 'react';
import { Moto } from '@/types/moto';

interface Props {
  editingMoto?: Moto | null;
  onSubmit: (moto: Moto, files?: FileList | null) => void;
  onCancel?: () => void;
}

export default function MotoForm({ editingMoto, onSubmit, onCancel }: Props) {
  const [nome, setNome] = useState(editingMoto?.nome || '');
  const [marca, setMarca] = useState(editingMoto?.marca || '');
  const [ano, setAno] = useState<number | undefined>(editingMoto?.ano);
  const [preco, setPreco] = useState(editingMoto?.preco || '');
  const [descricao, setDescricao] = useState(editingMoto?.descricao || '');
  const [quilometragem, setQuilometragem] = useState<number | undefined>(editingMoto?.quilometragem);
  const [categoria, setCategoria] = useState(editingMoto?.categoria || '');
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: editingMoto?.id,
      nome,
      marca,
      ano: ano ?? 0,
      preco,
      descricao,
      quilometragem,
      categoria,
    }, files);
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="font-semibold mb-3">{editingMoto ? 'Editar moto' : 'Criar nova moto'}</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input className="w-full p-2 border" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input className="w-full p-2 border" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} />
        <input
          className="w-full p-2 border"
          placeholder="Ano"
          type="number"
          value={ano ?? ''}
          onChange={(e) => setAno(e.target.value ? Number(e.target.value) : undefined)}
        />
        <input className="w-full p-2 border" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
        <input
          className="w-full p-2 border"
          placeholder="Quilometragem"
          type="number"
          value={quilometragem ?? ''}
          onChange={(e) => setQuilometragem(e.target.value ? Number(e.target.value) : undefined)}
        />
        <input className="w-full p-2 border" placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
        <textarea className="w-full p-2 border" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        <div>
          <label className="block text-sm mb-1">Imagens (múltiplas permitidas)</label>
          <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">{editingMoto ? 'Salvar' : 'Criar'}</button>
          {editingMoto && onCancel && (
            <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>Cancelar</button>
          )}
        </div>
      </form>
    </div>
  );
}

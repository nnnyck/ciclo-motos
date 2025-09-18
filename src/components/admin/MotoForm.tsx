'use client'

import { useState } from 'react';
import { Moto, MotoCor } from '@/types/moto';

interface Props {
  editingMoto?: Moto | null;
  onSubmit: (moto: Moto, files?: FileList | null) => void;
  onCancel?: () => void;
}

export default function MotoForm({ editingMoto, onSubmit, onCancel }: Props) {
  const [marca, setMarca] = useState(editingMoto?.marca || '');
  const [nome, setNome] = useState(editingMoto?.nome || '');
  const [cilindrada, setCilindrada] = useState<number | undefined>(editingMoto?.cilindrada);
  const [cor, setCor] = useState<Moto['cor'] | undefined>(editingMoto?.cor);
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
      marca,
      nome,
      cilindrada: cilindrada ?? 0, // garante number
      cor: cor ?? MotoCor.Preto,   // garante valor válido
      ano: ano ?? 0,
      preco,
      descricao,
      quilometragem,
      categoria,
    }, files);
  };

  return (
    <div className="p-4 rounded">
      <h2 className="font-extrabold text-gray-800 mb-3">{editingMoto ? 'Editar moto' : 'Criar nova moto'}</h2>
      <form onSubmit={handleSubmit} className="space-y-2">

        <input
          className="w-full p-2 border rounded text-gray-800"
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded text-gray-800"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="number"
          className="w-full p-2 border rounded text-gray-800"
          placeholder="Cilindrada"
          value={cilindrada ?? ''}
          onChange={(e) =>
            setCilindrada(e.target.value !== '' ? Number(e.target.value) : undefined)
          }
        />

        <select
          className="w-full p-2 border rounded text-gray-800"
          value={cor || ''}
          onChange={(e) => setCor(e.target.value as Moto['cor'] || undefined)}
        >
          <option value="">Selecione a cor</option>
          {Object.values(MotoCor).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          type="number"
          className="w-full p-2 border rounded text-gray-800"
          placeholder="Ano"
          value={ano ?? ''}
          onChange={(e) =>
            setAno(e.target.value !== '' ? Number(e.target.value) : undefined)
          }
        />

        <input
          className="w-full p-2 border rounded text-gray-800"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <input
          type="number"
          className="w-full p-2 border rounded text-gray-800"
          placeholder="Quilometragem"
          value={quilometragem ?? ''}
          onChange={(e) =>
            setQuilometragem(e.target.value !== '' ? Number(e.target.value) : undefined)
          }
        />

        <input
          className="w-full p-2 border rounded text-gray-800"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />

        <textarea
          className="w-full p-2 border rounded text-gray-800"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <div>
          <label className="block text-sm mb-1"></label>
          <input
            id="fileInput"
            type="file"
            multiple
            className="hidden"
            onChange={(e) => setFiles(e.target.files)}
          />

          <button
            type="button"
            onClick={() => document.getElementById("fileInput")?.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
          >
            Selecionar imagens
          </button>

          {files && (
            <p className="text-sm text-gray-600 mt-1">{files.length} arquivo(s) selecionado(s)</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
          >
            {editingMoto ? 'Salvar' : 'Criar'}
          </button>
          {editingMoto && onCancel && (
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
              onClick={onCancel}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

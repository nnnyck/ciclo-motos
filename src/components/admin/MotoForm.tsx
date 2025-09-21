'use client'

import { useState, useEffect } from 'react';
import { Moto, MotoCor } from '@/types/moto';

interface Props {
  editingMoto?: Moto | null;
  onSubmit: (moto: Moto, files?: FileList | null) => void;
  onCancel?: () => void;
}

export default function MotoForm({ editingMoto, onSubmit, onCancel }: Props) {
  const [marca, setMarca] = useState('');
  const [nome, setNome] = useState('');
  const [cilindrada, setCilindrada] = useState<number | undefined>(undefined);
  const [cor, setCor] = useState<Moto['cor'] | undefined>(undefined);
  const [ano, setAno] = useState<number | undefined>(undefined);
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quilometragem, setQuilometragem] = useState<number | undefined>(undefined);
  const [categoria, setCategoria] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);

  // 🔑 Atualiza os campos sempre que editingMoto mudar
  useEffect(() => {
    if (editingMoto) {
      setMarca(editingMoto.marca || '');
      setNome(editingMoto.nome || '');
      setCilindrada(editingMoto.cilindrada ?? undefined);
      setCor(editingMoto.cor ?? undefined);
      setAno(editingMoto.ano ?? undefined);
      setPreco(editingMoto.preco?.toString() || '');
      setDescricao(editingMoto.descricao || '');
      setQuilometragem(editingMoto.quilometragem ?? undefined);
      setCategoria(editingMoto.categoria || '');
      setFiles(null); // limpa arquivos antigos
    } else {
      // se for criação, limpa os campos
      setMarca('');
      setNome('');
      setCilindrada(undefined);
      setCor(undefined);
      setAno(undefined);
      setPreco('');
      setDescricao('');
      setQuilometragem(undefined);
      setCategoria('');
      setFiles(null);
    }
  }, [editingMoto]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (descricao.length > 150) {
    alert("A descrição não pode ter mais de 150 caracteres.");
    return; // Interrompe o envio
  }
    onSubmit(
      {
        id: editingMoto?.id,
        marca,
        nome,
        cilindrada: cilindrada ?? 0,
        cor: cor ?? MotoCor.Preto,
        ano: ano ?? 0,
        preco: Number(preco) || 0,
        descricao,
        quilometragem,
        categoria,
      },
      files
    );
  };

  return (
    <div className="p-4 rounded">
      <h2 className="font-extrabold text-gray-800 mb-3">
        {editingMoto ? 'Editar moto' : 'Criar nova moto'}
      </h2>

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
          type="number"
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

        {/* Upload de imagens */}
        <div>
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

'use client'

import { MotoWithId } from '@/types/moto';

interface Props {
  motos: MotoWithId[];
  onEdit: (m: MotoWithId) => void;
  onDelete: (id: string) => void;
  onDeleteImage: (imgId: string, motoId: string, url?: string) => void;
}

export default function MotoList({ motos, onEdit, onDelete, onDeleteImage }: Props) {
  return (
    <div className="p-4 border rounded">
      <h2 className="font-semibold mb-3">Lista de motos</h2>

      {motos.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhuma moto cadastrada.</p>
      ) : (
        <div className="space-y-4">
          {motos.map((m) => (
            <div key={m.id} className="flex gap-4 items-start border-b pb-3">
              <div className="w-28 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                {m.motos_imagens && m.motos_imagens[0] ? (
                  <img src={m.motos_imagens[0].url} alt={m.nome} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-xs text-gray-500">sem imagem</span>
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">
                      {m.nome} <span className="text-sm text-gray-500">({m.marca} - {m.ano})</span>
                    </div>
                    <div className="text-sm text-gray-600">R$ {m.preco}</div>
                    <div className="text-sm text-gray-500">{m.descricao}</div>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm" onClick={() => onEdit(m)}>Editar</button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded text-sm" onClick={() => onDelete(m.id)}>Excluir</button>
                  </div>
                </div>

                <div className="mt-2 flex gap-2 overflow-x-auto">
                  {m.motos_imagens?.map((img) => (
                    <div key={img.id} className="relative w-20 h-16 bg-gray-50 rounded overflow-hidden">
                      <img src={img.url} alt="img" className="w-full h-full object-cover" />
                      <button
                        onClick={() => onDeleteImage(img.id, m.id, img.url)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded px-1 text-xs"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

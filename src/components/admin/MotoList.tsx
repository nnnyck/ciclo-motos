'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { MotoWithId } from '@/types/moto'

interface Props {
  motos: MotoWithId[]
  onEdit: (m: MotoWithId) => void
  onDelete: (id: string) => void
  onDeleteImage?: (imgId: string, motoId: string, url?: string) => void
}

export default function MotoList({ motos, onEdit, onDelete, onDeleteImage }: Props) {
  const [selectedMoto, setSelectedMoto] = useState<MotoWithId | null>(null)

  // Deleta imagem do storage e banco e atualiza modal
  const handleDeleteImage = async (imgId: string, motoId: string, url?: string) => {
    if (!url) return

    try {
      // Extrai caminho relativo
      const urlObj = new URL(url)
      const parts = urlObj.pathname.split('/')
      const fileIndex = parts.findIndex(p => p === motoId)
      if (fileIndex === -1) throw new Error('Caminho inválido da imagem')
      const filePath = parts.slice(fileIndex).join('/')

      const { error: storageError } = await supabase.storage.from('motos').remove([filePath])
      if (storageError) throw storageError

      const { error: dbError } = await supabase.from('motos_imagens').delete().eq('id', imgId)
      if (dbError) throw dbError

      // Atualiza o modal
      setSelectedMoto(prev => {
        if (!prev) return null
        return {
          ...prev,
          motos_imagens: prev.motos_imagens?.filter(img => img.id !== imgId) || []
        }
      })
    } catch (err) {
      console.error('Erro ao deletar imagem:', err)
    }
  }

  return (
    <div className="p-4 rounded">
      <h2 className="font-extrabold text-gray-800 mb-3">Lista de motos</h2>

      {motos.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhuma moto cadastrada.</p>
      ) : (
        <div className="space-y-4">
          {motos.map(m => (
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
                    <div className="font-semibold text-gray-800">
                      {m.nome} <span className="text-sm text-gray-500">({m.marca} - {m.ano})</span>
                    </div>
                    <div className="text-sm text-gray-600">R$ {m.preco}</div>
                    <div className="text-sm text-gray-600">{m.cor}</div>
                    <div className="text-sm text-gray-600">{m.quilometragem} km</div>
                    <div className="text-sm text-gray-500 truncate max-w-[100px] overflow-hidden whitespace-nowrap">
                      {m.descricao}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm" onClick={() => onEdit(m)}>Editar</button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded text-sm" onClick={() => onDelete(m.id)}>Excluir</button>
                    <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm" onClick={() => setSelectedMoto(m)}>Gerenciar imagens</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Imagens de {selectedMoto.nome} {selectedMoto.cilindrada}
            </h3>

            {selectedMoto.motos_imagens?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {selectedMoto.motos_imagens.map(img => (
                  <div key={img.id} className="relative w-full h-28 bg-gray-100 rounded overflow-hidden">
                    <img src={img.url} alt="img" className="w-full h-full object-cover" />
                    <button
                      className="absolute top-1 right-1 bg-red-500 text-white rounded px-2 text-xs hover:bg-red-600 cursor-pointer"
                      onClick={() => handleDeleteImage(img.id, selectedMoto.id, img.url)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Nenhuma imagem cadastrada.</p>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedMoto(null)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

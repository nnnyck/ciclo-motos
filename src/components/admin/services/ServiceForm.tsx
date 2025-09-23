'use client'

import { useState, useEffect } from 'react'
import { Service } from '@/types/service'

interface Props {
  editingService: Service | null
  onSubmit: (service: Omit<Service, 'id'> | Service) => void | Promise<void>
  onCancel: () => void
}

export default function ServiceForm({ editingService, onSubmit, onCancel }: Props) {
  const [nome, setNome] = useState('')
  const [duracao, setDuracao] = useState<number | undefined>(undefined)
  const [preco, setPreco] = useState<number | undefined>(undefined)
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (editingService) {
      setNome(editingService.nome)
      setDuracao(editingService.duracao_minutos)
      setPreco(editingService.preco)
      setDescricao(editingService.descricao || '')
    } else {
      setNome('')
      setDuracao(undefined)
      setPreco(undefined)
      setDescricao('')
    }
  }, [editingService])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome || duracao === undefined || preco === undefined) return

    if (editingService) {
      onSubmit({
        id: editingService.id,
        nome,
        duracao_minutos: duracao,
        preco,
        descricao,
      })
    } else {
      onSubmit({
        nome,
        duracao_minutos: duracao,
        preco,
        descricao,
      })
    }
  }

  return (
    <div className="p-4 rounded">
      <h2 className="font-extrabold text-gray-800 mb-3">
        {editingService ? 'Editar Serviço' : 'Criar Serviço'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 border rounded text-gray-800"
          required
        />

        <input
          type="number"
          placeholder="Duração (minutos)"
          value={duracao ?? ''}
          onChange={(e) =>
            setDuracao(e.target.value !== '' ? Number(e.target.value) : undefined)
          }
          className="w-full p-2 border rounded text-gray-800"
          required
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco ?? ''}
          onChange={(e) =>
            setPreco(e.target.value !== '' ? Number(e.target.value) : undefined)
          }
          className="w-full p-2 border rounded text-gray-800"
          required
          step="0.01"
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full p-2 border rounded text-gray-800"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
          >
            {editingService ? 'Atualizar' : 'Criar'}
          </button>
          {editingService && (
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
  )
}

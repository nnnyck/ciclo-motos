'use client'

import { Service } from '@/types/service'

interface Props {
  services: Service[]
  onEdit: (service: Service) => void
  onDelete: (id: string) => void
  loading: boolean
}

export default function ServiceList({ services, onEdit, onDelete, loading }: Props) {
  if (loading) return <p className="text-gray-600">Carregando serviços...</p>
  if (!services.length) return <p className="text-gray-600">Nenhum Serviço Encontrado.</p>

  return (
    <div className="p-4 bg-white rounded">
      <h2 className="font-extrabold text-gray-800 mb-3">Lista de Serviços</h2>
      <table className="w-full text-left border-collapse">
        <thead className="bg-blue-100">
          <tr>
            <th className="border border-gray-300 p-2 text-gray-800">Nome</th>
            <th className="border border-gray-300 p-2 text-gray-800">Duração</th>
            <th className="border border-gray-300 p-2 text-gray-800">Preço</th>
            <th className="border border-gray-300 p-2 text-gray-800">Ações</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr
              key={service.id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              <td className="border border-gray-300 p-2 text-gray-900">{service.nome}</td>
              <td className="border border-gray-300 p-2 text-gray-900">{service.duracao_minutos} min</td>
              <td className="border border-gray-300 p-2 text-gray-900">R$ {service.preco.toFixed(2)}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                <button
                  className="bg-blue-600 hover:bg-yellow-600 text-white px-3 py-1 rounded transition-colors cursor-pointer"
                  onClick={() => onEdit(service)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors cursor-pointer"
                  onClick={() => onDelete(service.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
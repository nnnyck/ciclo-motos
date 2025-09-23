'use client';

import { Service } from '@/types/service';

interface Props {
  services: Service[];
  selectedService: Service | null;
  onSelect: (service: Service) => void;
}

export default function ServiceList({ services, selectedService, onSelect }: Props) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-4">Escolha o serviço:</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-4 border rounded-xl cursor-pointer transition hover:shadow-md ${
              selectedService?.id === service.id
                ? 'border-[#f36a21] bg-orange-50'
                : 'border-gray-200 bg-white'
            }`}
            onClick={() => onSelect(service)}
          >
            <h3 className="font-semibold text-gray-800">{service.nome}</h3>
            <p className="text-sm text-gray-500">Duração: {service.duracao_minutos}</p>
            <p className="text-sm font-bold text-green-600">R$ {service.preco}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

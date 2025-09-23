'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Service } from '@/types/service';
import ServiceHeroSection from '@/components/services/ServiceHeroSection';
import ServiceList from '@/components/services/ServiceList';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from('servicos').select('*');
      if (error) {
        console.error('Erro ao buscar serviços:', error);
        return;
      }

      // Forçar tipagem para Service
      const mappedServices: Service[] = (data as Service[]).map((d) => ({
        id: d.id,
        nome: d.nome,
        duracao_minutos: d.duracao_minutos,
        preco: d.preco,
        descricao: d.descricao,
      }));

      setServices(mappedServices);
    };

    fetchServices();
  }, []);

  return (
    <div className="bg-gray-100 py-8">
      <ServiceHeroSection />
      <div className="max-w-3xl mx-auto px-4 bg-white p-6 rounded-lg shadow">
        <ServiceList
          services={services}
          selectedService={selectedService}
          onSelect={setSelectedService}
        />
      </div>
    </div>
  );
}

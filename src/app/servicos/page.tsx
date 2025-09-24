'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Service } from '@/types/service';
import ServiceHeroSection from '@/components/services/ServiceHeroSection';
import ServiceList from '@/components/services/ServiceList';
import AvailableDays from '@/components/services/AvailableDays';
import AvailableHours from '@/components/services/AvailableHours';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from('servicos').select('*');
      if (error) {
        console.error('Erro ao buscar serviços:', error);
        return;
      }

      const mappedServices: Service[] = (data as Service[]).map(d => ({
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

const handleConfirmAppointment = async () => {
  if (!selectedService || !selectedDay || !selectedHour) return;
  setLoading(true);

  try {
    const session = await supabase.auth.getSession();
    const token = session?.data.session?.access_token;
    if (!token) throw new Error('Usuário não logado');

    // Converte selectedHour (ISO string) para "HH:MM"
    const horaFormatada = new Date(selectedHour).toTimeString().slice(0, 5);

    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        service_id: selectedService.id,
        configuracao_id: 'ab1fb2cf-8496-4477-9895-8cebfd4da235',
        data: selectedDay,      // "YYYY-MM-DD"
        hora: horaFormatada,    // "HH:MM"
      }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error ?? 'Erro ao criar agendamento');

    alert('Agendamento confirmado!');

    setSelectedService(null);
    setSelectedDay(null);
    setSelectedHour(null);

  } catch (err: unknown) {
    console.error(err);
    alert((err as Error).message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ServiceHeroSection />

      <div className="max-w-3xl mx-auto px-4 bg-white p-6 rounded-lg shadow">
        {/* Lista de serviços */}
        <ServiceList
          services={services}
          selectedService={selectedService}
          onSelect={(service) => {
            setSelectedService(service);
            setSelectedDay(null);
            setSelectedHour(null);
          }}
        />

        {/* Dias disponíveis */}
        {selectedService && (
          <AvailableDays
            configuracaoId="ab1fb2cf-8496-4477-9895-8cebfd4da235"
            daysAhead={14}
            onSelectDay={(date) => {
              setSelectedDay(date);
              setSelectedHour(null);
            }}
          />
        )}

        {/* Horários disponíveis */}
        {selectedService && selectedDay && (
          <AvailableHours
            configuracaoId="ab1fb2cf-8496-4477-9895-8cebfd4da235"
            selectedDate={selectedDay}
            service={selectedService}
            intervalMinutes={30}
            onSelectHour={(iso) => setSelectedHour(iso)}
          />
        )}

        {/* Slot selecionado e botão de confirmação */}
        {selectedHour && (
          <div className="mt-4 p-3 bg-green-50 text-green-800 rounded">
            <p>Horário selecionado: {new Date(selectedHour).toLocaleString('pt-BR')}</p>
            <button
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleConfirmAppointment}
              disabled={loading}
            >
              {loading ? 'Confirmando...' : 'Confirmar agendamento'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

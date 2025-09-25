'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Appointment {
  id: string;
  data: string;
  hora: string;
  status: string;
  profile: { id: string; name: string; phone: string | null };
  servico: { id: string; nome: string; preco: number };
}

export default function AppointmentTab() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

const fetchAppointments = async () => {
  setLoading(true);

  const { data, error } = await supabase
    .from("agendamentos")
    .select(`
      id,
      data,
      hora,
      status,
      profile:profiles (
        id,
        name,
        phone
      ),
      servico:servicos (
        id,
        nome,
        preco
      )
    `)
    .order("data", { ascending: true })
    .order("hora", { ascending: true });

  if (error) {
    console.error(error);
  } else if (data) {
    // mapear os arrays para objetos únicos
    const mapped = data.map((item: any) => ({
      ...item,
      profile: item.profile[0] ?? null,  // pega o primeiro item do array ou null
      servico: item.servico[0] ?? null,
    }));
    setAppointments(mapped as Appointment[]);
  }

  setLoading(false);
};


  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('agendamentos')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error(error);
    } else {
      fetchAppointments(); // refaz a listagem
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-700">Carregando agendamentos...</div>;
  }

  return (
    <div className="p-6">
      {appointments.length === 0 ? (
        <p className="text-gray-600">Nenhum agendamento encontrado.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((a) => (
            <div key={a.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className='text-gray-700'><strong>Cliente:</strong> {a.profile?.name}</p>
                <p className='text-gray-700'><strong>Telefone:</strong> {a.profile?.phone}</p>
                <p className='text-gray-700'><strong>Serviço:</strong> {a.servico?.nome}</p>
                <p className='text-gray-700'><strong>Data:</strong> {new Date(a.data).toLocaleDateString('pt-BR')} às {a.hora}</p>
                <p className='text-gray-700'>
                  <strong>Status:</strong>{' '}
                  <span
                    className={`font-bold ${
                      a.status === 'pendente'
                        ? 'text-yellow-600'
                        : a.status === 'confirmado'
                        ? 'text-blue-600'
                        : a.status === 'concluido'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {a.status}
                  </span>
                </p>
              </div>

              <div className="flex gap-2">
                {a.status !== 'confirmado' && (
                  <button
                    onClick={() => updateStatus(a.id, 'confirmado')}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                  >
                    Confirmar
                  </button>
                )}
                {a.status !== 'concluido' && (
                  <button
                    onClick={() => updateStatus(a.id, 'concluido')}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
                  >
                    Concluir
                  </button>
                )}
                {a.status !== 'cancelado' && (
                  <button
                    onClick={() => updateStatus(a.id, 'cancelado')}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

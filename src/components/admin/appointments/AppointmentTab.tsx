'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Profile {
  id: string;
  name: string;
  phone: string | null;
}

interface Servico {
  id: string;
  nome: string;
  preco: number;
}

interface Appointment {
  id: string;
  data: string;
  hora: string;
  status: string;
  profile: Profile | null;
  servico: Servico | null;
}

/* ---------- Type guards / parsers ---------- */
const isObject = (x: unknown): x is Record<string, unknown> =>
  typeof x === 'object' && x !== null;

const isString = (x: unknown): x is string => typeof x === 'string';
const isNumber = (x: unknown): x is number => typeof x === 'number';

function parseProfile(x: unknown): Profile | null {
  if (!isObject(x)) return null;
  const id = x['id'];
  const name = x['name'];
  const phone = x['phone'] ?? null;
  if (isString(id) && isString(name) && (isString(phone) || phone === null)) {
    return { id, name, phone: phone as string | null };
  }
  return null;
}

function parseServico(x: unknown): Servico | null {
  if (!isObject(x)) return null;
  const id = x['id'];
  const nome = x['nome'];
  const preco = x['preco'];

  if (isString(id) && isString(nome) && (isNumber(preco) || isString(preco))) {
    const precoNum = isNumber(preco) ? preco : Number(preco);
    if (!Number.isFinite(precoNum)) return null;
    return { id, nome, preco: precoNum };
  }
  return null;
}

/* ---------- Component ---------- */
export default function AppointmentTab() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('agendamentos')
        .select(`
          id,
          data,
          hora,
          status,
          profile:profiles!agendamentos_user_id_fkey (
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
        .order('data', { ascending: true })
        .order('hora', { ascending: true });

      if (error) {
        console.error('Supabase error fetching agendamentos:', error);
        setAppointments([]);
        return;
      }

      // 'data' vem do supabase com tipo desconhecido; tratamos como unknown e validamos
      if (!Array.isArray(data)) {
        setAppointments([]);
        return;
      }

      const mapped: Appointment[] = data
        .map((rawItem) => {
          if (!isObject(rawItem)) return null;

          const id = rawItem['id'] !== undefined ? String(rawItem['id']) : null;
          const dataField =
            rawItem['data'] !== undefined ? String(rawItem['data']) : null;
          const hora = rawItem['hora'] !== undefined ? String(rawItem['hora']) : null;
          const status =
            rawItem['status'] !== undefined ? String(rawItem['status']) : null;

          if (!id || !dataField || !hora || !status) return null;

          const profile = parseProfile(rawItem['profile']);
          const servico = parseServico(rawItem['servico']);

          return {
            id,
            data: dataField,
            hora,
            status,
            profile,
            servico,
          } as Appointment;
        })
        .filter((x): x is Appointment => x !== null);

      setAppointments(mapped);
    } catch (err) {
      console.error('Unexpected error fetching appointments:', err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('agendamentos')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error('Erro ao atualizar status:', error);
    } else {
      // Recarrega a lista
      fetchAppointments();
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div
              key={a.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="text-gray-700">
                  <strong>Cliente:</strong> {a.profile?.name ?? 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Telefone:</strong> {a.profile?.phone ?? 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Serviço:</strong> {a.servico?.nome ?? 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Data:</strong>{' '}
                  {(() => {
                    try {
                      return new Date(a.data).toLocaleDateString('pt-BR');
                    } catch {
                      return a.data;
                    }
                  })()}{' '}
                  às {a.hora}
                </p>
                <p className="text-gray-700">
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

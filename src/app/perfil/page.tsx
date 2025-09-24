'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Profile {
  id: string;
  name: string;
  phone?: string;
  created_at: string;
}

interface User {
  id: string;
  email: string;
}

interface Service {
  id: string;
  nome: string;
  duracao_minutos: number;
  preco: number;
}

interface Appointment {
  id: string;
  data: string;
  hora: string;
  status: string;
  servico: Service;
}

interface RawAppointment {
  id: string;
  data: string;
  hora: string;
  status: string;
  servico?: Service[]; // porque vem como array
}


export default function PerfilPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndAppointments = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserData({ id: user.id, email: user.email || '' });

      // profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (profileError) {
        console.error(profileError);
        return;
      }
      setProfile(profileData);

      // appointments
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('agendamentos')
        .select(`
          id,
          data,
          hora,
          status,
          servico: servico_id (
            id,
            nome,
            duracao_minutos,
            preco
          )
        `)
        .eq('user_id', user.id)
        .order('data', { ascending: true })
        .order('hora', { ascending: true });

      if (appointmentsError) {
        console.error(appointmentsError);
        return;
      }

        const mappedAppointments: Appointment[] = (appointmentsData as RawAppointment[] || []).map(a => ({
        id: a.id,
        data: a.data,
        hora: a.hora,
        status: a.status,
        servico: a.servico?.[0] || { id: '', nome: '', duracao_minutos: 0, preco: 0 }
        }));

      setAppointments(mappedAppointments);
      setLoading(false);
    };

    fetchProfileAndAppointments();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">Carregando...</div>;
  if (!profile || !userData) return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">Usuário não encontrado.</div>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#1E1E1E]">Meu Perfil</h1>

        <div className="bg-white p-6 rounded shadow mb-8">
          <p className="mb-2"><strong>Nome:</strong> {profile.name}</p>
          <p className="mb-2"><strong>Email:</strong> {userData.email}</p>
          <p className="mb-2"><strong>Telefone:</strong> {profile.phone || '-'}</p>
          <p><strong>Cadastrado em:</strong> {new Date(profile.created_at).toLocaleDateString('pt-BR')}</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-center text-[#1E1E1E]">Meus Agendamentos</h2>

        {appointments.length === 0 ? (
          <p className="text-gray-700 text-center">Você não possui agendamentos.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((a) => (
              <div key={a.id} className="bg-white p-4 rounded shadow">
                <p><strong>Serviço:</strong> {a.servico.nome}</p>
                <p><strong>Data:</strong> {new Date(a.data).toLocaleDateString('pt-BR')}</p>
                <p><strong>Hora:</strong> {a.hora}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`font-bold ${a.status === 'pendente' ? 'text-yellow-600' : 'text-green-600'}`}>
                    {a.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

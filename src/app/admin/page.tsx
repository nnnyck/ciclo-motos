'use client'

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import MotoTab from '@/components/admin/MotoTab';
import ServiceTab from '@/components/admin/services/ServiceTab';
import ConfigurationTab from '@/components/admin/configurations_oficina/ConfigurationTab';
import AppointmentTab from '@/components/admin/appointments/AppointmentTab';


export default function AdminMenu() {
  const [activeTab, setActiveTab] = useState<'motos' | 'agendamentos' | 'servicos' | 'configuracoes'>('motos');

  return (
    <AdminLayout>
      {/* Menu de Tabs */}
      <div className="mb-4 flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'motos' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'} cursor-pointer`}
          onClick={() => setActiveTab('motos')}
        >
          Motos
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'agendamentos' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'} cursor-pointer`}
          onClick={() => setActiveTab('agendamentos')}
        >
          Agendamentos
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'servicos' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'} cursor-pointer`}
          onClick={() => setActiveTab('servicos')}
        >
          Serviços
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'configuracoes' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'} cursor-pointer`}
          onClick={() => setActiveTab('configuracoes')}
        >
          Configurações
        </button>
      </div>

      {/* Conteúdo das Tabs */}
      <div>
        {activeTab === 'motos' && <MotoTab />}
        {activeTab === 'agendamentos' && <AppointmentTab />}
        {activeTab === 'servicos' && <ServiceTab />}
        {activeTab === 'configuracoes' && <ConfigurationTab />}
      </div>
    </AdminLayout>
  );
}

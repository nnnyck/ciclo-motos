'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { ServiceWithId, Service } from '@/types/service'
import ServiceForm from './ServiceForm'
import ServiceList from './ServiceList'

export default function ServiceTab() {
  const [services, setServices] = useState<ServiceWithId[]>([])
  const [editingService, setEditingService] = useState<ServiceWithId | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    setLoading(true)
    const { data, error } = await supabase
      .from('servicos')
      .select('*')
      .order('nome', { ascending: true }) // coluna correta
    if (error) {
      console.error(error)
      setServices([])
    } else {
      setServices((data as ServiceWithId[]) || [])
    }
    setLoading(false)
  }

  async function handleSubmit(service: Omit<Service, 'id'> | ServiceWithId) {
    if ('id' in service) {
      // Update
      const { error } = await supabase.from('servicos').update(service).eq('id', service.id)
      if (error) console.error(error)
    } else {
      // Insert
      const { error } = await supabase.from('servicos').insert([service])
      if (error) console.error(error)
    }
    setEditingService(null)
    fetchServices()
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from('servicos').delete().eq('id', id)
    if (error) console.error(error)
    fetchServices()
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceForm
          key={editingService?.id || 'new'}
          editingService={editingService}
          onSubmit={handleSubmit}
          onCancel={() => setEditingService(null)}
        />
        <ServiceList
          services={services}
          onEdit={setEditingService}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  )
}

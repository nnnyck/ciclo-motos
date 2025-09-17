'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAdmin } from '@/hooks/useAdmin';
import AdminLayout from '@/components/admin/AdminLayout';
import Loading from '@/components/admin/Loading';
import AccessDenied from '@/components/admin/AccessDenied';
import MotoForm from '@/components/admin/MotoForm';
import MotoList from '@/components/admin/MotoList';
import { Moto, MotoWithId } from '@/types/moto';
import { useRouter } from 'next/navigation';


export default function AdminPage() {
  const { isAdmin } = useAdmin();
  const [motos, setMotos] = useState<MotoWithId[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingMoto, setEditingMoto] = useState<Moto | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isAdmin) fetchMotos();
  }, [isAdmin]);

  async function fetchMotos() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('motos')
        .select('*, motos_imagens(id, url)')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Garante que todas motos têm id
      const motosWithId: MotoWithId[] = (data || []).filter((m): m is MotoWithId => !!m.id);
      setMotos(motosWithId);

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Erro ao buscar motos:', err.message);
      } else {
        console.error('Erro desconhecido ao buscar motos:', err);
      }
    }

  async function uploadFiles(motoId: string, files: FileList) {
    for (const f of Array.from(files)) {
      const safeName = f.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const path = `${motoId}/${safeName}`;
      await supabase.storage.from('motos').upload(path, f, { upsert: true });
    }
  }

  async function handleSubmit(moto: Moto, files?: FileList | null) {
  const motoToInsert = {
    nome: moto.nome,
    marca: moto.marca,
    ano: moto.ano,
    preco: moto.preco,
    descricao: moto.descricao,
    quilometragem: moto.quilometragem,
    categoria: moto.categoria,
  };

  if (moto.id) {
    // edição
    await supabase.from('motos').update(motoToInsert).eq('id', moto.id);
    if (files && files.length > 0) await uploadFiles(moto.id, files);
  } else {
    // inserção
    const { data, error } = await supabase.from('motos').insert([motoToInsert]).select().single();
    if (error) {
      console.error('Erro ao inserir moto:', error);
      return;
    }
    if (data && files) await uploadFiles(data.id!, files);
  }

  setEditingMoto(null);
  fetchMotos();
}

  async function handleDelete(id: string) {
    if (!confirm('Deseja realmente excluir?')) return;

    // Deleta imagens do storage
    const { data: imgs } = await supabase.from('motos_imagens').select('id, url').eq('moto_id', id);
    if (imgs) {
      for (const img of imgs) {
        try {
          const parts = img.url.split('/object/public/')[1]?.split('/').slice(1).join('/');
          if (parts) await supabase.storage.from('motos').remove([`${id}/${parts.split('/').pop()}`]);
        } catch {}
      }
      await supabase.from('motos_imagens').delete().eq('moto_id', id);
    }

    await supabase.from('motos').delete().eq('id', id);
    fetchMotos();
  }

  async function handleDeleteImage(imgId: string, motoId: string, url?: string) {
    if (!confirm('Remover imagem?')) return;
    if (url) {
      try {
        const parts = url.split('/object/public/')[1]?.split('/').slice(1).join('/');
        if (parts) await supabase.storage.from('motos').remove([`${motoId}/${parts.split('/').pop()}`]);
      } catch {}
    }
    await supabase.from('motos_imagens').delete().eq('id', imgId);
    fetchMotos();
  }

  if (isAdmin === null) return <Loading />;
  if (isAdmin === false) return <AccessDenied />;

  return (
    <AdminLayout>
       {/* Botão de voltar */}
      <div className="mb-4">
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
        >
          ← Voltar para a página inicial
        </button>
      </div>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <MotoForm
          editingMoto={editingMoto}
          onSubmit={handleSubmit}
          onCancel={() => setEditingMoto(null)}
        />
        <MotoList
          motos={motos}
          onEdit={setEditingMoto}
          onDelete={handleDelete}
          onDeleteImage={handleDeleteImage}
        />
      </div>
      {loading && <p className="text-sm text-gray-500">Carregando motos...</p>}
    </AdminLayout>
  );
}

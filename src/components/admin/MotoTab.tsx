'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import MotoForm from '@/components/admin/MotoForm';
import MotoList from '@/components/admin/MotoList';
import { Moto, MotoWithId } from '@/types/moto';

export default function CadastroMotos() {
  const [motos, setMotos] = useState<MotoWithId[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingMoto, setEditingMoto] = useState<Moto | null>(null);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    fetchMotos();
  }, []);

  async function fetchMotos() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('motos')
        .select('*, motos_imagens(*)')
        .order('created_at', { ascending: false })
        .order('ordem', { foreignTable: 'motos_imagens', ascending: true });

      if (error) throw error;

      const motosWithId: MotoWithId[] = (data || []).filter((m): m is MotoWithId => !!m.id);
      setMotos(motosWithId);
    } catch (err: unknown) {
      console.error('Erro ao buscar motos:', err);
    } finally {
      setLoading(false);
    }
  }

  async function uploadFiles(motoId: string, files: FileList) {
    const uploadedUrls: string[] = [];
    for (const f of Array.from(files)) {
      const safeName = f.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const path = `${motoId}/${safeName}`;
      const { error } = await supabase.storage.from('motos').upload(path, f, { upsert: true });
      if (error) {
        console.error('Erro ao enviar arquivo:', error.message);
        continue;
      }
      const { data } = supabase.storage.from('motos').getPublicUrl(path);
      if (!data?.publicUrl) continue;
      uploadedUrls.push(data.publicUrl);
    }
    return uploadedUrls;
  }

  async function handleSubmit(moto: Moto, files?: FileList | null) {
    const motoToInsert = {
      marca: moto.marca,
      nome: moto.nome,
      cilindrada: moto.cilindrada,
      cor: moto.cor,
      ano: moto.ano,
      preco: moto.preco,
      descricao: moto.descricao,
      quilometragem: moto.quilometragem,
      categoria: moto.categoria,
    };

    let motoId = moto.id;

    if (motoId) {
      await supabase.from('motos').update(motoToInsert).eq('id', motoId);
    } else {
      const { data, error } = await supabase.from('motos').insert([motoToInsert]).select().single();
      if (error) {
        console.error('Erro ao inserir moto:', error);
        return;
      }
      motoId = data.id;
    }

    if (files && files.length > 0) {
      if (!motoId) return;
      const urls = await uploadFiles(motoId, files);
      const validUrls = urls.filter((url): url is string => !!url);
      const imagesToInsert = validUrls.map((url, idx) => ({
        moto_id: motoId,
        url,
        destaque: idx === 0,
        ordem: idx,
      }));
      const { error: imgError } = await supabase.from('motos_imagens').insert(imagesToInsert);
      if (imgError) console.error('Erro ao inserir imagens:', imgError);
    }

    setEditingMoto(null);
    fetchMotos();
    setFormKey(prev => prev + 1);
  }

  async function handleDelete(id: string) {
    if (!confirm('Deseja realmente excluir?')) return;

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
    if (url) {
      try {
        const urlObj = new URL(url);
        const parts = urlObj.pathname.split('/');
        const fileIndex = parts.findIndex(p => p === motoId);
        if (fileIndex === -1) throw new Error('Caminho inválido da imagem');
        const filePath = parts.slice(fileIndex).join('/');
        const { error: storageError } = await supabase.storage.from('motos').remove([filePath]);
        if (storageError) throw storageError;
      } catch (err) {
        console.error('Erro ao remover arquivo do storage:', err);
        return;
      }
    }

    const { error: dbError } = await supabase.from('motos_imagens').delete().eq('id', imgId);
    if (dbError) console.error('Erro ao deletar do banco:', dbError);

    fetchMotos();
  }

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded shadow">
      <MotoForm
        key={formKey}
        editingMoto={editingMoto}
        onSubmit={handleSubmit}
        onCancel={() => {
          setEditingMoto(null);
          setFormKey(prev => prev + 1);
        }}
      />
      <MotoList
        motos={motos}
        onEdit={setEditingMoto}
        onDelete={handleDelete}
        onDeleteImage={handleDeleteImage}
      />
      {loading && <p className="text-sm text-gray-900">Carregando motos...</p>}
    </div>
  );
}

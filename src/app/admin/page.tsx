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
  const [formKey, setFormKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (isAdmin) fetchMotos();
  }, [isAdmin]);

async function fetchMotos() {
  setLoading(true);
  try {
    const { data, error } = await supabase
      .from('motos')
      // 1. Peça TODAS as colunas da tabela de imagens
      .select('*, motos_imagens(*)') 
      // 2. Ordena a lista de motos pela data de criação
      .order('created_at', { ascending: false })
      // 3. (Bônus) Ordena as IMAGENS de cada moto pela coluna 'ordem'
      .order('ordem', { foreignTable: 'motos_imagens', ascending: true });

    if (error) throw error;

    const motosWithId: MotoWithId[] = (data || []).filter((m): m is MotoWithId => !!m.id);
    setMotos(motosWithId);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Erro ao buscar motos:', err.message);
    } else {
      console.error('Erro desconhecido ao buscar motos:', err);
    }
  } finally {
    setLoading(false);
  }
}

// Função para upload das imagens e retornar URLs públicas
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
    if (!data?.publicUrl) {
      console.error('Erro ao obter URL pública da imagem:', f.name);
      continue;
    }

    uploadedUrls.push(data.publicUrl);
  }

  return uploadedUrls;
}

async function handleSubmit(moto: Moto, files?: FileList | null) {
  // O objeto com os dados da moto permanece o mesmo
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
    // Edição
    await supabase.from('motos').update(motoToInsert).eq('id', motoId);
  } else {
    // Inserção
    const { data, error } = await supabase
      .from('motos')
      .insert([motoToInsert])
      .select()
      .single();

    if (error) {
      console.error('Erro ao inserir moto:', error);
      return;
    }

    motoId = data.id; // O '!' não é estritamente necessário aqui, mas não prejudica
  }

  // Se houver arquivos para upload, executa este bloco
  if (files && files.length > 0) {
    // --- CORREÇÃO APLICADA AQUI ---
    // 1. Adicionamos a verificação de segurança (Type Guard)
    // Isso garante que `motoId` não é nulo ou indefinido antes de continuar.
    if (!motoId) {
      console.error("ID da moto é inválido, não é possível fazer o upload dos arquivos.");
      return; // Interrompe a execução se não houver um ID
    }

    // 2. A chamada agora é segura. O TypeScript entende que `motoId` é uma string.
    const urls = await uploadFiles(motoId, files);

    // Filtrar somente URLs definidas
    const validUrls = urls.filter((url): url is string => !!url);

    const imagesToInsert = validUrls.map((url, idx) => ({
      // Agora que a verificação foi feita, o '!' aqui também se torna opcional,
      // pois o TypeScript já sabe que motoId é uma string.
      moto_id: motoId,
      url,
      destaque: idx === 0,
      ordem: idx,
    }));

    const { error: imgError } = await supabase.from('motos_imagens').insert(imagesToInsert);
    if (imgError) console.error('Erro ao inserir imagens no banco:', imgError);
  }

  setEditingMoto(null);
  fetchMotos();
  setFormKey(prevKey => prevKey + 1);
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
      const fileName = parts?.split('/').pop();
      if (fileName) {
        await supabase.storage.from('motos').remove([`${motoId}/${fileName}`]);
      }
    } catch (err) {
      console.error('Erro ao remover arquivo do storage:', err);
    }
  }
  await supabase.from('motos_imagens').delete().eq('id', imgId);
  fetchMotos();
}

// async function handleDeleteImage(imgId: string, motoId: string, url?: string) {
  //   if (!confirm('Remover imagem?')) return;
  //   if (url) {
  //     try {
  //       const parts = url.split('/object/public/')[1]?.split('/').slice(1).join('/');
  //       if (parts) await supabase.storage.from('motos').remove([`${motoId}/${parts.split('/').pop()}`]);
  //     } catch {}
  //   }
  //   await supabase.from('motos_imagens').delete().eq('id', imgId);
  //   fetchMotos();
  // }

  if (isAdmin === null) return <Loading />;
  if (isAdmin === false) return <AccessDenied />;

  return (
    <AdminLayout>
       {/* Botão de voltar */}
      <div className="mb-4">
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer"
        >
          Voltar para a página inicial
        </button>
      </div>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded shadow">
        <MotoForm
          key={formKey}
          editingMoto={editingMoto}
          onSubmit={handleSubmit}
          onCancel={() => {
            setEditingMoto(null);
            setFormKey(prevKey => prevKey + 1);
          }}
        />
        <MotoList
          motos={motos}
          onEdit={setEditingMoto}
          onDelete={handleDelete}
          onDeleteImage={handleDeleteImage}
        />
      </div>
      {loading && <p className="text-sm text-gray-900">Carregando motos...</p>}
    </AdminLayout>
  );
}

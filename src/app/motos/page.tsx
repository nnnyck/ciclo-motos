"use client";

import Header from "@/components/Header";
import SidebarFilters, { Filters } from "@/components/SidebarFilters";
import MotosControls, { SortOptions, ViewOptions } from "@/components/MotosControls";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";

type Moto = {
  id: string;
  nome: string;
  marca: string;
  categoria: string;
  modelo: string;
  ano: number;
  preco: number;
  quilometragem: number;
  imagem_url: string;
};

// Componente separado para cada card de moto
function MotoCard({ moto }: { moto: Moto }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img src={moto.imagem_url} alt={moto.nome} className="w-full h-56 object-cover" />
      <div className="p-6 space-y-2">
        <h2 className="text-xl font-bold text-[#F36A21] font-montserrat">{moto.nome}</h2>

        <div className="flex flex-wrap gap-2 text-gray-600 text-sm font-montserrat">
          <span className="font-semibold">{moto.marca}</span>
          <span>• {moto.categoria}</span>
          <span>• {moto.ano}</span>
        </div>

        <p className="text-gray-500 text-sm font-montserrat">
          {moto.quilometragem.toLocaleString("pt-BR")} km
        </p>

        <p className="text-2xl font-extrabold text-[#1E1E1E] font-montserrat">
          R$ {moto.preco.toLocaleString("pt-BR")}
        </p>
      </div>
    </div>
  );
}

export default function MotosPage() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [filters, setFilters] = useState<Filters>({ marcas: [], tipos: [] });
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOptions>("price-low");
  const [view, setView] = useState<ViewOptions>("grid");

  // Fetch motos
  useEffect(() => {
    const fetchMotos = async () => {
      const { data, error } = await supabase.from("motos").select("*");
      if (!error) setMotos(data || []);
      setLoading(false);
    };
    fetchMotos();
  }, []);

  // Filtra e ordena motos usando useMemo
  const filteredMotos = useMemo(() => {
    let temp = [...motos];

    if (filters.marcas.length) temp = temp.filter((m) => filters.marcas.includes(m.marca));
    if (filters.tipos.length) temp = temp.filter((m) => filters.tipos.includes(m.categoria));

    switch (sortBy) {
      case "price-low":
        temp.sort((a, b) => a.preco - b.preco);
        break;
      case "price-high":
        temp.sort((a, b) => b.preco - a.preco);
        break;
      case "year-new":
        temp.sort((a, b) => b.ano - a.ano);
        break;
      case "year-old":
        temp.sort((a, b) => a.ano - b.ano);
        break;
      case "mileage-low":
        temp.sort((a, b) => a.quilometragem - b.quilometragem);
        break;
    }

    return temp;
  }, [motos, filters, sortBy]);

  return (
    <>
      <main className="bg-gray-100 min-h-screen py-12 px-4 md:px-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 flex justify-center md:justify-start">
          <SidebarFilters onFilterChange={setFilters} className="self-start" />
        </div>
        <div className="flex-1">
          <MotosControls
            totalCount={motos.length}
            showingCount={filteredMotos.length}
            sortBy={sortBy}
            setSortBy={setSortBy}
            view={view}
            setView={setView}
          />

          {loading ? (
            <p className="text-center text-[#F36A21] font-montserrat">Carregando motos...</p>
          ) : filteredMotos.length === 0 ? (
            <p className="text-center text-gray-600 font-montserrat">
              Nenhuma moto disponível com os filtros aplicados.
            </p>
          ) : (
            <div className={`grid gap-8 ${view === "grid" ? "sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}>
              {filteredMotos.map((moto) => (
                <MotoCard key={moto.id} moto={moto} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

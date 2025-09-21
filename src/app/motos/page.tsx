"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Moto } from "@/types/moto"; // 1. Importando o tipo unificado
import SidebarFilters, { Filters } from "@/components/SidebarFilters";
import MotosControls, { SortOptions, ViewOptions } from "@/components/MotosControls";
import MotoCard from "@/components/MotoCard";


export default function MotosPage() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [filters, setFilters] = useState<Filters>({ marcas: [], tipos: [] });
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOptions>("price-low");
  const [view, setView] = useState<ViewOptions>("grid");

  useEffect(() => {
    const fetchMotos = async () => {
      // 2. Buscando da nossa VIEW otimizada!
      const { data, error } = await supabase
        .from("motos_com_imagem_destaque")
        .select("*");
      
      if (error) {
        console.error("Erro ao buscar motos:", error);
      } else {
        setMotos(data as Moto[] || []);
      }
      setLoading(false);
    };
    fetchMotos();
  }, []);

  const filteredMotos = useMemo(() => {
    let temp = [...motos];

    if (filters.marcas.length) temp = temp.filter((m) => filters.marcas.includes(m.marca));
    if (filters.tipos.length) temp = temp.filter((m) => m.categoria && filters.tipos.includes(m.categoria));

    // A lógica de ordenação e filtro continua a mesma
    switch (sortBy) {
        case "price-low": temp.sort((a, b) => a.preco - b.preco); break;
        case "price-high": temp.sort((a, b) => b.preco - a.preco); break;
        case "year-new": temp.sort((a, b) => b.ano - a.ano); break;
        case "year-old": temp.sort((a, b) => a.ano - b.ano); break;
        case "mileage-low": temp.sort((a, b) => (a.quilometragem ?? 0) - (b.quilometragem ?? 0)); break;
    }

    return temp;
  }, [motos, filters, sortBy]);

  return (
    <>
      <main className="bg-gray-100 min-h-screen py-12 px-4 md:px-12 flex flex-col md:flex-row gap-8">
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
            <div className={`grid gap-8 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
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
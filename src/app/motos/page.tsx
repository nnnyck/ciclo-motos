"use client";

import Header from "@/components/Header";
import SidebarFilters, { Filters } from "@/components/SidebarFilters";
import MotosControls from "@/components/MotosControls";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

type Moto = {
  id: string;
  nome: string;
  marca: string;
  tipo: string;
  modelo: string;
  ano: number;
  preco: number;
  quilometragem: number;
  imagem_url: string;
};

export default function MotosPage() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [filteredMotos, setFilteredMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({ marcas: [], tipos: [] });

  const [sortBy, setSortBy] = useState("price-low");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const fetchMotos = async () => {
      const { data, error } = await supabase.from("motos").select("*");
      if (!error) {
        setMotos(data || []);
        setFilteredMotos(data || []);
      }
      setLoading(false);
    };
    fetchMotos();
  }, []);

  useEffect(() => {
    let temp = [...motos];

    if (filters.marcas.length) temp = temp.filter((m) => filters.marcas.includes(m.marca));
    if (filters.tipos.length) temp = temp.filter((m) => filters.tipos.includes(m.tipo));

    if (sortBy === "price-low") temp.sort((a, b) => a.preco - b.preco);
    if (sortBy === "price-high") temp.sort((a, b) => b.preco - a.preco);
    if (sortBy === "year-new") temp.sort((a, b) => b.ano - a.ano);
    if (sortBy === "year-old") temp.sort((a, b) => a.ano - b.ano);
    if (sortBy === "mileage-low") temp.sort((a, b) => a.quilometragem - b.quilometragem);

    setFilteredMotos(temp);
  }, [filters, motos, sortBy]);

  return (
    <>
      <Header />
      <main className="bg-gray-100 min-h-screen py-12 px-6 md:px-12 flex gap-8 items-start">
        <SidebarFilters onFilterChange={setFilters} />

        <div className="flex-1">
          <MotosControls
            totalCount={filteredMotos.length}
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
            <div className={`grid gap-8 ${view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {filteredMotos.map((moto) => (
                <div
                  key={moto.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img src={moto.imagem_url} alt={moto.nome} className="w-full h-56 object-cover" />
                  <div className="p-6 space-y-3">
                    <h2 className="text-xl font-bold text-[#F36A21] font-montserrat">{moto.nome}</h2>
                    <p className="text-gray-700 font-montserrat">
                      {moto.marca} • {moto.modelo} • {moto.ano}
                    </p>
                    <p className="text-gray-500 text-sm font-montserrat">
                      {moto.quilometragem.toLocaleString("pt-BR")} km
                    </p>
                    <p className="text-2xl font-extrabold text-[#1E1E1E] font-montserrat">
                      R$ {moto.preco.toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

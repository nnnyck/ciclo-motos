"use client";

import { useState, useEffect } from "react";
import { getMarcasComContagem } from "@/lib/motos";

export interface Filters {
  marcas: string[];
  tipos: string[];
}

interface MarcaComContagem {
  marca: string;
  quantidade: number;
}

interface SidebarFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

export default function SidebarFilters({ onFilterChange }: SidebarFiltersProps) {
  const [availableMarcas, setAvailableMarcas] = useState<MarcaComContagem[]>([]);
  const [selectedMarcas, setSelectedMarcas] = useState<string[]>([]);
  const [selectedTipos, setSelectedTipos] = useState<string[]>([]);
  const tiposDisponiveis = ["Street", "Trail", "Sport"];

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const marcas = await getMarcasComContagem();
        setAvailableMarcas(marcas);
      } catch (err) {
        console.error("Erro ao buscar marcas:", err);
      }
    };
    fetchMarcas();
  }, []);

  const toggleMarca = (marca: string) => {
    const updated = selectedMarcas.includes(marca)
      ? selectedMarcas.filter((m) => m !== marca)
      : [...selectedMarcas, marca];
    setSelectedMarcas(updated);
    onFilterChange({ marcas: updated, tipos: selectedTipos });
  };

  const toggleTipo = (tipo: string) => {
    const updated = selectedTipos.includes(tipo)
      ? selectedTipos.filter((t) => t !== tipo)
      : [...selectedTipos, tipo];
    setSelectedTipos(updated);
    onFilterChange({ marcas: selectedMarcas, tipos: updated });
  };

  const limparFiltros = () => {
    setSelectedMarcas([]);
    setSelectedTipos([]);
    onFilterChange({ marcas: [], tipos: [] });
  };

  return (
    <aside className="w-64 bg-white rounded-2xl shadow-md p-6 space-y-6">
      {/* Marcas */}
      <div>
        <h3 className="font-bold text-lg mb-2">Marcas</h3>
        <div className="flex flex-col gap-2">
          {availableMarcas.map((m) => (
            <label key={m.marca} className="flex items-center justify-between gap-2 cursor-pointer">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedMarcas.includes(m.marca)}
                  onChange={() => toggleMarca(m.marca)}
                  className="accent-[#F36A21]"
                />
                <span className="text-gray-700 font-montserrat">{m.marca}</span>
              </div>
              <span className="text-gray-400 text-sm">{m.quantidade}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tipos */}
      <div>
        <h3 className="font-bold text-lg mb-2">Tipo de Moto</h3>
        <div className="flex flex-col gap-2">
          {tiposDisponiveis.map((tipo) => (
            <label key={tipo} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTipos.includes(tipo)}
                onChange={() => toggleTipo(tipo)}
                className="accent-[#F36A21]"
              />
              <span className="text-gray-700 font-montserrat">{tipo}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Botão limpar */}
      <button
        onClick={limparFiltros}
        className="w-full py-2 px-4 bg-[#F36A21] text-white rounded-lg font-bold hover:bg-[#E55A1A] transition"
      >
        Limpar Filtros
      </button>
    </aside>
  );
}

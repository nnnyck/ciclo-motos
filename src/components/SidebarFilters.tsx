"use client";

import { useState, useEffect } from "react";
import { getMarcasComContagem, getCategorias } from "@/lib/motos";

export interface Filters {
  marcas: string[];
  tipos: string[];
}

export interface MarcaComContagem {
  marca: string;
  quantidade: number;
}

interface SidebarFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

export default function SidebarFilters({ onFilterChange, className }: SidebarFiltersProps & { className?: string }) {
  const [availableMarcas, setAvailableMarcas] = useState<MarcaComContagem[]>([]);
  const [availableCategorias, setAvailableCategorias] = useState<string[]>([]);
  const [selectedMarcas, setSelectedMarcas] = useState<string[]>([]);
  const [selectedTipos, setSelectedTipos] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marcas, categorias] = await Promise.all([
          getMarcasComContagem(),
          getCategorias(),
        ]);

        setAvailableMarcas(marcas);
        setAvailableCategorias(categorias);
      } catch (err) {
        console.error("Erro ao buscar filtros:", err);
      }
    };

    fetchData();
  }, []);

    useEffect(() => {
      onFilterChange({ marcas: selectedMarcas, tipos: selectedTipos });
    }, [selectedMarcas, selectedTipos, onFilterChange]);

    const toggleMarca = (marca: string) => {
      setSelectedMarcas((prev) =>
        prev.includes(marca) ? prev.filter((m) => m !== marca) : [...prev, marca]
      );
    };

    const toggleTipo = (tipo: string) => {
      setSelectedTipos((prev) =>
        prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
      );
    };

  const limparFiltros = () => {
    setSelectedMarcas([]);
    setSelectedTipos([]);
    onFilterChange({ marcas: [], tipos: [] });
  };

  return (
    <aside className={`w-64 bg-white rounded-2xl shadow-md p-6 space-y-6 ${className}`}>
      {/* Marcas */}
      <div>
        <h3 className="font-bold text-lg text-gray-800 mb-2">Marcas</h3>
        <div className="flex flex-col gap-2">
          {availableMarcas.map((m) => (
            <label
              key={m.marca}
              className="flex items-center justify-between gap-2 cursor-pointer"
            >
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

      {/* Categorias (Tipos) */}
      <div>
        <h3 className="font-bold text-lg text-gray-800 mb-2">Categorias</h3>
        <div className="flex flex-col gap-2">
          {availableCategorias.map((tipo) => (
            <label
              key={tipo}
              className="flex items-center gap-2 cursor-pointer"
            >
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

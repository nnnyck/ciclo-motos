"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Moto } from "@/types/moto";
import MotoCard from "./MotoCard";

export default function FeaturedMotorcycles() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [filter, setFilter] = useState<string>("todas");
  const [loading, setLoading] = useState(true);

  // normaliza string
  const normalize = (s?: string) =>
    (s ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  useEffect(() => {
    const fetchMotos = async () => {
      const { data, error } = await supabase
        .from("motos_com_imagem_destaque")
        .select("*");

      if (error) {
        console.error("Erro ao carregar motos:", error);
      } else {
        setMotos((data as Moto[]) || []);
      }
      setLoading(false);
    };

    fetchMotos();
  }, []);

  // categorias dinâmicas
  const categories = useMemo(() => {
    const setCats = new Set<string>();
    motos.forEach((m) => {
      const n = normalize(m.categoria);
      if (n) setCats.add(n);
    });
    return ["todas", ...Array.from(setCats)];
  }, [motos]);

  const prettyLabel = (cat: string) => {
    if (cat === "todas") return "Todas";
    return cat
      .replace(/[-_]/g, " ")
      .split(" ")
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
      .join(" ");
  };

  const filtered = useMemo(() => {
    if (filter === "todas") return motos;
    return motos.filter((m) => normalize(m.categoria) === filter);
  }, [motos, filter]);

  // limitar a 6 motos
  const limited = filtered.slice(0, 6);

  return (
    <section id="motorcycles" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-montserrat font-bold text-gray-800 mb-6">
            Nossas Motos
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Descubra nossa seleção cuidadosamente escolhida de motocicletas de
            qualidade.
          </p>

          {/* Botões de filtro */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-montserrat font-bold transition cursor-pointer
                  ${
                    filter === cat
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-600 border border-gray-300 hover:bg-orange-500 hover:text-white"
                  }`}
              >
                {prettyLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading / Lista */}
        {loading ? (
          <p className="text-center text-gray-600">Carregando motos...</p>
        ) : limited.length === 0 ? (
          <p className="text-center text-gray-600">Nenhuma moto encontrada.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {limited.map((moto) => (
              <MotoCard key={moto.id} moto={moto} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

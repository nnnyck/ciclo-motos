"use client";

import { Moto } from "@/types/moto";

export default function MotoCard({ moto }: { moto: Moto }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      <div className="relative">
        <img
          src={moto.imagem_url || "/placeholder.png"}
          alt={`${moto.marca} ${moto.nome}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            {moto.ano}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            R$ {moto.preco.toLocaleString("pt-BR")}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-montserrat font-bold text-gray-800 mb-2">
          {moto.marca} {moto.nome}
        </h3>
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <span className="mr-4">{moto.quilometragem?.toLocaleString("pt-BR") ?? 0} km</span>
          <span className="mr-4">{moto.cilindrada} cc</span>
          <span className="capitalize">{moto.categoria ?? "sem categoria"}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{moto.descricao}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-green-600 font-bold">Disponível</span>
         <a
          href={`https://wa.me/5511999999999?text=${encodeURIComponent(
            `Olá! Tenho interesse na moto ${moto.marca} ${moto.nome}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 text-white text-sm px-4 py-2 rounded-md font-bold hover:bg-orange-600 transition"
        >
          Ver detalhes
        </a>
        </div>
      </div>
    </div>
  );
}

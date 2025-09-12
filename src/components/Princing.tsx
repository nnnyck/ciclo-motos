"use client";

import { useState } from "react";

// Mock services
export const services = [
  { id: 1, name: "Troca de Óleo", price: "R$45 - R$85", description: "Incluido Filtro e Óleo Premium" },
  { id: 2, name: "Serviço de Freio", price: "R$150 - R$350", description: "Incluido Pastilhas, Fluido e Inspeção" },
  { id: 3, name: "Diagnóstico", price: "GRÁTIS", description: "Incluido com qualquer serviço de reparo" },
];

// Estimates logic como no puro
const serviceEstimates = {
  "oil-change": { min: 45, max: 85, desc: "Incluido Filtro e Óleo Premium" },
  "brake-service": { min: 150, max: 350, desc: "Incluido Pastilhas, Fluido e Inspeção" },
  "tire-replacement": { min: 200, max: 500, desc: "Incluido Mão de Obra e Montagem (pneus vendidos separadamente)" },
  "tune-up": { min: 300, max: 600, desc: "Incluido Serviço Completo de Manutenção e Inspeção" },
  diagnostic: { min: 0, max: 0, desc: "GRÁTIS com qualquer serviço de reparo" },
  "chain-service": { min: 80, max: 200, desc: "Incluido Limpeza, Lubrificação e Ajuste da Corrente" },
};

export default function PricingTransparency() {
  const [serviceType, setServiceType] = useState("");
  const [motorcycleType, setMotorcycleType] = useState("");
  const [estimate, setEstimate] = useState<{ price: string; desc: string } | null>(null);

  const updateEstimate = (service?: string, moto?: string) => {
    const s = service ?? serviceType;
    const m = moto ?? motorcycleType;

    if (s && m) {
      const e = serviceEstimates[s as keyof typeof serviceEstimates];
      if (e) {
        setEstimate({
          price: e.min === 0 ? "GRÁTIS" : `R$${e.min} - R$${e.max}`,
          desc: e.desc,
        });
      }
    } else {
      setEstimate(null);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-6 font-montserrat">Preço Transparente</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Obtenha estimativas instantâneas para serviços comuns - sem surpresas, sem taxas ocultas
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center font-montserrat">Calculadora de Estimativa de Preços</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2 font-montserrat">Tipo de Serviço</label>
                <select
                  className="w-full p-3 border border-gray-300 text-gray-700 text-extrabold rounded-lg"
                  value={serviceType}
                  onChange={(e) => { setServiceType(e.target.value); updateEstimate(e.target.value, motorcycleType); }}
                >
                  <option value="">Selecione Um Serviço</option>
                  <option value="oil-change">Troca de Óleo</option>
                  <option value="brake-service">Serviço de Freio</option>
                  <option value="tire-replacement">Substituição de Pneus</option>
                  <option value="tune-up">Ajuste Completo</option>
                  <option value="diagnostic">Diagnóstico</option>
                  <option value="chain-service">Serviço de Corrente e Pinhão</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2 font-montserrat">Tipo de Moto</label>
                <select
                  className="w-full p-3 border border-gray-300 text-gray-700 text-extrabold rounded-lg"
                  value={motorcycleType}
                  onChange={(e) => { setMotorcycleType(e.target.value); updateEstimate(serviceType, e.target.value); }}
                >
                  <option value="">Selecione Um Tipo De Moto</option>
                  <option value="sport">Sport</option>
                  <option value="cruiser">Cruiser</option>
                  <option value="touring">Touring</option>
                  <option value="adventure">Adventure</option>
                  <option value="standard">Standard</option>
                </select>
              </div>
            </div>

            {estimate && (
              <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
                <h4 className="text-lg font-bold text-gray-800 mb-2 font-montserrat">Preço Estimado</h4>
                <div className="text-3xl font-bold text-orange-500 mb-4">{estimate.price}</div>
                <p className="text-gray-600 text-sm mb-6">{estimate.desc}</p>
                <a href="tel:+1-555-MOTO-PRO" className="bg-orange-500 text-white px-4 py-2 rounded-md font-bold hover:bg-orange-600 transition">
                  Obter Cotação
                </a>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {services.map((s) => (
              <div key={s.id} className="bg-white p-6 rounded-lg shadow text-center">
                <h4 className="font-bold text-gray-800 mb-2 font-montserrat">{s.name}</h4>
                <div className="text-2xl font-bold text-orange-500 mb-2">{s.price}</div>
                <p className="text-gray-600 text-sm">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

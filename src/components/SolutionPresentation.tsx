// components/SolutionPresentation.tsx
"use client";

import React, { useState } from "react";

const tabs = [
  {
    id: "sales",
    label: "Venda de Motos",
    content: (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Lista / Texto */}
          <div>
            <h3 className="text-3xl text-gray-900 font-semibold font-montserrat mb-6">
              Motos de Qualidade, Preços Justos
            </h3>
            <ul className="space-y-4 mb-8 text-green-600">
              {[
                "Inspeções pré-venda completas",
                "Histórico transparente do veículo",
                "Opções de financiamento competitivas",
                "Garantia de 30 dias em todas as vendas",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    />
                  </svg>
                  <span className="text-gray-500">{item}</span>
                </li>
              ))}
            </ul>
                <a
                href="#motorcycles"
                className="inline-block px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-primary-hover transition"
                >
                Ver Inventário
                </a>
          </div>

          {/* Imagem */}
          <div className="relative">
            <img
              src="https://images.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_1280.jpg"
              alt="Motos de qualidade à venda"
              className="w-full h-80 object-cover rounded-lg shadow-card"
              onError={(e) =>
                ((e.currentTarget as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2940&auto=format&fit=crop")
              }
            />
          </div>
        </div>
      </>
    ),
  },
{
  id: "repairs",
  label: "Manutenção",
  content: (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Imagem */}
      <div className="relative">
        <img
          src="https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Serviço profissional de manutenção de motos"
          className="w-full h-80 object-cover rounded-lg shadow-card"
          onError={(e) =>
            ((e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2940&auto=format&fit=crop")
          }
        />
      </div>

      {/* Texto e lista */}
      <div>
        <h3 className="text-3xl text-gray-900 font-semibold font-montserrat mb-6">
          Serviços de Manutenção
        </h3>
        <ul className="space-y-4 mb-8">
          {[
            "Mecânicos certificados ASE",
            "Orçamentos de diagnóstico gratuitos",
            "Garantia de 90 dias em peças e mão de obra",
            "Serviço disponível no mesmo dia",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start">
              <svg
                className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                />
              </svg>
              <span className="text-gray-500">{item}</span>
            </li>
          ))}
        </ul>
        <a
          href="tel:+1-555-MOTO-PRO"
          className="inline-block px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition cursor-pointer"
        >
          Agendar Serviço
        </a>
      </div>
    </div>
  ),
},

  {
  id: "purchasing",
  label: "Compramos Motos",
  content: (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Texto */}
      <div>
        <h3 className="text-3xl text-gray-900 font-semibold font-montserrat mb-6">
          Nós Compramos Sua Moto
        </h3>
        <ul className="space-y-4 mb-8">
          {[
            "Avaliação pelo valor de mercado justo",
            "Ofertas rápidas em dinheiro",
            "Serviço de coleta gratuita",
            "Toda a papelada resolvida",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start">
              <svg
                className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                />
              </svg>
              <span className="text-gray-500">{item}</span>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="inline-block px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition cursor-pointer"
        >
          Solicitar Cotação
        </a>
      </div>

      {/* Imagem */}
      <div className="relative">
        <img
          src="https://images.pixabay.com/photo/2016/11/29/05/45/motorcycle-1867431_1280.jpg"
          alt="Nós compramos motos"
          className="w-full h-80 object-cover rounded-lg shadow-card"
          onError={(e) =>
            ((e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2940&auto=format&fit=crop")
          }
        />
      </div>
    </div>
  ),
},
];

export default function SolutionPresentation() {
  const [activeTab, setActiveTab] = useState("sales");

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] leading-[1.2] font-extrabold font-montserrat mb-6 text-gray-900">
            Sua Solução Completa para Motos
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Da venda à manutenção, somos seu destino único para todas as
            necessidades de motocicletas
          </p>
        </div>

        {/* Tabs de Serviço */}
        <div className="flex flex-wrap justify-center mb-12 border-b border-border">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-3 font-montserrat font-bold transition-[250ms] cursor-pointer
                  ${isActive ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500 border-b-2 border-transparent"}
                  hover:text-orange-500
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Conteúdo do Tab ativo */}
        <div className="service-content">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "Vocês oferecem financiamento na compra da moto?",
    answer:
      "Sim! Trabalhamos com parceiros para facilitar o pagamento da sua moto, oferecendo opções de parcelamento acessíveis e rápidas de aprovar.",
  },
  {
    id: 2,
    question: "Quanto tempo leva para consertar minha moto?",
    answer:
      "Serviços simples, como troca de óleo e revisão básica, geralmente ficam prontos no mesmo dia. Reparos maiores costumam levar de 2 a 5 dias, dependendo da peça. Sempre avisamos o prazo certo antes de começar.",
  },
  {
    id: 3,
    question: "Vocês dão garantia nos serviços?",
    answer:
      "Sim! Todo serviço tem garantia de 90 dias em peças e mão de obra. Na compra de motos, oferecemos garantia de 30 dias nos principais itens mecânicos. Também temos opções de garantia estendida.",
  },
  {
    id: 4,
    question: "Vocês compram motos usadas? Como funciona?",
    answer:
      "Compramos sim! Avaliamos sua moto na hora e fazemos uma proposta justa em dinheiro. Cuidamos de toda a documentação e, se precisar, buscamos a moto na sua casa.",
  },
  {
    id: 5,
    question: "Posso agendar serviços pela internet?",
    answer:
      "Claro! Você pode marcar pelo nosso site, WhatsApp ou ligando direto na oficina. Temos horários flexíveis, inclusive cedo e aos finais de semana, para facilitar sua vida.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6 font-montserrat">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600">
            Obtenha respostas para perguntas comuns sobre nossos serviços e processos
          </p>
        </div>

        {/* Lista de FAQs */}
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow">
              <button
                className="w-full p-6 text-left flex justify-between items-center"
                onClick={() => toggleFAQ(faq.id)}
              >
                <h3 className="font-montserrat font-bold text-gray-800">
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-orange-500 transform transition-transform ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openId === faq.id && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

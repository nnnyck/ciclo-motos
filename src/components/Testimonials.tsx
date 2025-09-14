"use client";

const testimonials = [
  {
    id: 1,
    name: "Michael Silva",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop&ixlib=rb-4.0.3",
    fallback:
      "https://images.pexels.com/photo-220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    text: `"Comprei minha moto aqui ano passado e fui muito bem atendido. Eles realmente entendem de moto e tratam a gente com respeito. Recomendo demais!"`,
  },
  {
    id: 2,
    name: "Sarah Martinez",
    img: "",
    fallback:
      "",
    text: `"Serviço rápido, honesto e com preço justo. Consertaram o problema elétrico da minha moto que em outras oficinas ninguém resolveu. Aqui é confiança de verdade!"`,
  },
  {
    id: 3,
    name: "João Pereira",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop&ixlib=rb-4.0.3",
    fallback:
      "https://images.pexels.com/photo-91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    text: `"Comprei minha moto aqui ano passado e fui muito bem atendido. Eles realmente entendem de moto e tratam a gente com respeito. Recomendo demais!"`,
  },
];

const trustIndicators = [
  { id: 1, value: "4.5/5", label: "Reviews do Google" },
  { id: 2, value: "500+", label: "Clientes Satisfeitos" },
  { id: 3, value: "10+", label: "Anos de Experiência" },
];

function Stars() {
  return (
    <div className="flex text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6 font-montserrat">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Não confie apenas em nossa palavra - ouça de outros motociclistas que confiam
            na Ciclo Motos
          </p>
        </div>

        {/* Testemunhos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-gray-50 p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  onError={(e) =>
                    (e.currentTarget.src = t.fallback)
                  }
                />
                <div>
                  <h4 className="font-montserrat font-bold text-gray-800">
                    {t.name}
                  </h4>
                  <Stars />
                </div>
              </div>
              <p className="text-gray-600 text-sm italic">{t.text}</p>
            </div>
          ))}
        </div>

        {/* Indicadores de confiança */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {trustIndicators.map((ti) => (
              <div key={ti.id}>
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  {ti.value}
                </div>
                <div className="text-gray-600 text-sm">{ti.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

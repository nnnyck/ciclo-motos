// components/FeaturedMotorcycles.tsx
"use client";

import { useState } from "react";

type Motorcycle = {
  id: string;
  title: string;
  image: string;
  condition: string;
  conditionColor: string;
  price: string;
  miles: string;
  engine: string;
  category: "street" | "trail" | "sport"; 
  description: string;
  financing: boolean;
};

const motorcycles: Motorcycle[] = [
  {
  id: "1",
  title: "2022 Yamaha R6",
  image: "https://images.pexels.com/photos/15146893/pexels-photo-15146893.jpeg",
  condition: "Excellent",
  conditionColor: "bg-green-600",
  price: "$12,999",
  miles: "8,500 miles",
  engine: "600cc",
  category: "street",
  description:
    "Pristine condition sport bike with full service history. Perfect for track days and weekend rides.",
  financing: true,
},
  {
    id: "2",
    title: "2021 Harley Davidson Street Glide",
    image: "https://images.pexels.com/photos/17394013/pexels-photo-17394013.jpeg",
    condition: "Excellent",
    conditionColor: "bg-green-600",
    price: "$24,999",
    miles: "12,000 miles",
    engine: "1,868cc",
    category: "street",
    description:
      "Loaded with premium features and custom upgrades. Perfect for long-distance touring.",
    financing: true,
  },
  {
    id: "3",
    title: "2023 BMW R1250GS",
    image: "https://images.pexels.com/photos/18024800/pexels-photo-18024800.jpeg",
    condition: "Like New",
    conditionColor: "bg-green-500",
    price: "$18,999",
    miles: "3,200 miles",
    engine: "1,254cc",
    category: "trail",
    description:
      "Ultimate adventure touring machine with premium electronics and comfort features.",
    financing: true,
  },
  {
    id: "4",
    title: "2020 Kawasaki Ninja ZX-10R",
    image: "https://images.pexels.com/photos/30180723/pexels-photo-30180723.jpeg",
    condition: "Excellent",
    conditionColor: "bg-green-600",
    price: "$14,999",
    miles: "15,000 miles",
    engine: "998cc",
    category: "trail",
    description:
      "High-performance superbike with track-proven technology and aggressive styling.",
    financing: true,
  },
  {
    id: "5",
    title: "2019 Indian Scout",
    image: "https://images.pexels.com/photos/13708343/pexels-photo-13708343.jpeg",
    condition: "Excellent",
    conditionColor: "bg-green-600",
    price: "$16,999",
    miles: "9,800 miles",
    engine: "1,133cc",
    category: "sport",
    description:
      "Classic American cruiser with modern performance and timeless styling.",
    financing: true,
  },
  {
    id: "6",
    title: "2022 Honda Gold Wing",
    image: "https://images.pexels.com/photos/10392249/pexels-photo-10392249.jpeg",
    condition: "Like New",
    conditionColor: "bg-green-500",
    price: "$26,999",
    miles: "5,500 miles",
    engine: "1,833cc",
    category: "sport",
    description:
      "Ultimate luxury touring motorcycle with premium comfort and advanced technology.",
    financing: true,
  },
];

const categories = ["all", "street", "trail", "sport"] as const;

export default function FeaturedMotorcycles() {
  const [filter, setFilter] = useState<"all" | "street" | "trail" | "sport">("all");

  const filtered = filter === "all" ? motorcycles : motorcycles.filter((m) => m.category === filter);

  return (  
    <section id="motorcycles" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-montserrat font-bold text-gray-800 mb-6">
            Nossas Motos
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Descubra nossa seleção cuidadosamente escolhida de motocicletas de qualidade, cada uma minuciosamente inspecionada e pronta para andar
          </p>

          {/* Botões de filtro */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`
                  px-6 py-2 rounded-full font-montserrat font-bold transition
                  ${filter === cat
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-orange-500 hover:text-white"}
                `}
              >
                {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de motos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((moto) => (
            <div
              key={moto.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative">
                <img
                  src={moto.image}
                  alt={moto.title}
                  className="w-full h-48 object-cover"
                  onError={(e) =>
                    ((e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop")
                  }
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`${moto.conditionColor} text-white px-3 py-1 rounded-full text-sm font-bold`}
                  >
                    {moto.condition}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {moto.price}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-montserrat font-bold text-gray-800 mb-2">
                  {moto.title}
                </h3>
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <span className="mr-4">{moto.miles}</span>
                  <span className="mr-4">{moto.engine}</span>
                  <span className="capitalize">{moto.category}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{moto.description}</p>
                <div className="flex justify-between items-center">
                  {moto.financing && (
                    <span className="text-sm text-green-600 font-bold">
                      Financing Available
                    </span>
                  )}
                  <a
                    href="#"
                    className="bg-orange-500 text-white text-sm px-4 py-2 rounded-md font-bold hover:bg-orange-600 transition"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão final */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="
              font-montserrat
              rounded-lg border-2 border-[#f36a21]
              bg-white px-6 py-3
              font-extrabold text-[#f36a21]
              transition duration-250 ease-in-out
              hover:bg-[#f36a21] hover:text-white
            "
          >
            Ver Todas as Motos
          </a>
        </div>
      </div>
    </section>
  );
}

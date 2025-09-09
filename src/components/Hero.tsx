"use client";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Professional motorcycle shop"
          className="w-full h-full object-cover"
          onError={(e) =>
            ((e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2940&auto=format&fit=crop")
          }
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-montserrat font-extrabold mb-6 animate-fade-in">
          Sua Loja de Motos Confiável & Centro de Reparos
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-slide-up">
          Mecânicos especializados, preços justos, qualidade garantida – atendendo motociclistas há mais de 10 anos
        </p>


        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {/* Botão laranja */}
            <a
                href="#motos"
                className="bg-[#F36A21] text-white font-montserrat font-bold text-lg px-8 py-4 rounded-lg shadow-md 
                transition-all duration-250 ease-in-out transform hover:-translate-y-0.5 hover:bg-[#E55A1A]"
            >
            Confira Nossas Motos
            </a>

            {/* Botão branco */}
               <a
  href="#serviços"
  className="bg-white text-[#F36A21] border border-white font-montserrat font-bold text-lg px-8 py-4 rounded-lg shadow-md
             transition-all duration-250 ease-in-out hover:bg-[#F36A21] hover:text-white hover:border-white"
>
  Agende um Serviço
</a>
        </div>


        {/* Trust Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-white">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-primary mb-2" id="motorcyclesSold">
              500+
            </div>
            <div className="text-sm text-gray-300">Motos Vendidas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-primary mb-2">10+</div>
            <div className="text-sm text-gray-300">Anos de Atuação</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-primary mb-2">5</div>
            <div className="text-sm text-gray-300">Mecânicos Certificados</div>
          </div>
        </div>
      </div>
    </section>
  );
}

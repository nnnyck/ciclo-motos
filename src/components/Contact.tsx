import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black font-montserrat text-gray-800 mb-6">
            Entre em Contato
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Fale com a gente pelo WhatsApp ou Instagram e tire suas dúvidas agora mesmo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contatos diretos */}
          <div className="bg-background-surface p-8 rounded-lg shadow-card space-y-6">
            <h3 className="text-xl font-montserrat font-bold text-gray-800 mb-6">
              Nossos Contatos
            </h3>

            {/* WhatsApp */}
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition"
            >
              <FaWhatsapp className="text-2xl" />
              <span className="font-montserrat font-bold">WhatsApp</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/sualoja"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white p-4 rounded-lg hover:opacity-90 transition"
            >
              <FaInstagram className="text-2xl" />
              <span className="font-montserrat font-bold">Instagram</span>
            </a>
          </div>

          {/* Endereço e horários */}
          <div className="space-y-8">
            
            {/* Localização */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-card">
              <h3 className="text-xl font-montserrat font-bold text-gray-800 mb-4">
                Onde Estamos
              </h3>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-orange-500 text-xl mt-1" />
                <p className="text-gray-600">R. Monsenhor João Batista Martins Ladeira, 50 - Jardim do Trevo<br />13041-313 - Campinas/SP</p>
              </div>
            </div>

            {/* Horário de funcionamento */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-card">
              <h3 className="text-xl font-montserrat font-bold text-gray-800 mb-4">
                Horário de Atendimento
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Segunda - Sexta</span>
                  <span className="font-montserrat font-bold text-gray-800">8h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sábado</span>
                  <span className="font-montserrat font-bold text-gray-800">8h - 14h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Domingo</span>
                  <span className="font-montserrat font-bold text-gray-800">Fechado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

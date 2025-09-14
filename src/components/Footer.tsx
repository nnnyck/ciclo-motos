"use client";

import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black-500 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <svg className="h-10 w-10 text-orange-500" viewBox="0 0 40 40" fill="currentColor">
                <path d="M20 2L35 10v20L20 38L5 30V10L20 2z" />
                <path d="M20 8L30 14v12L20 32L10 26V14L20 8z" fill="white" />
                <text x="20" y="24" textAnchor="middle" className="text-xs font-bold fill-current">
                  MH
                </text>
              </svg>
              <span className="ml-3 text-xl font-montserrat font-bold">MotoHub Pro</span>
            </div>
            <p className="text-gray-300 mb-4">
              Sua loja de motos de confiança, com mais de 15 anos de experiência, serviço especializado e preços honestos.
            </p>
            <div className="flex space-x-4 text-gray-300">
              <a href="#" className="hover:text-orange-500 transition">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-500 transition">
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-500 transition">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-montserrat font-bold mb-6">Serviços</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#motorcycles" className="hover:text-orange-500 transition">Venda de Motos</a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-500 transition">Conserto & Serviço</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-500 transition">Compramos sua Moto</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">Peças & Acessórios</a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-montserrat font-bold mb-6">Links Rápidos</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#about" className="hover:text-orange-500 transition">Sobre Nós</a></li>
              <li><a href="#contact" className="hover:text-orange-500 transition">Contato</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Carreiras</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Depoimentos</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Blog</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-montserrat font-bold mb-6">Informações</h3>
            <div className="space-y-3 text-gray-300">
              <div>
                <div className="font-montserrat font-bold text-white">Endereço</div>
                <div>R. Monsenhor João Batista Martins Ladeira, 50<br />Campinas/SP</div>
              </div>
              <div>
                <div className="font-montserrat font-bold text-white">Telefone</div>
                <a href="tel:+5511999999999" className="hover:text-orange-500 transition">(19) 99999-9999</a>
              </div>
              <div>
                <div className="font-montserrat font-bold text-white">WhatsApp</div>
                <a href="https://wa.me/5511999999999" className="hover:text-orange-500 transition">Chamar no WhatsApp</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Ciclo Motos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

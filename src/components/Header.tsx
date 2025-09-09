"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <svg
              className="h-10 w-10 text-[#F36A21]"
              viewBox="0 0 40 40"
              fill="currentColor"
            >
              <path d="M20 2L35 10v20L20 38L5 30V10L20 2z" />
              <path d="M20 8L30 14v12L20 32L10 26V14L20 8z" fill="white" />
              <text
                x="20"
                y="24"
                textAnchor="middle"
                className="text-xs font-bold fill-[#F36A21]"
              >
                CM
              </text>
            </svg>
            <span className="ml-3 text-xl font-montserrat font-black text-[#1E1E1E]">
              Ciclo Motos
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#motos"
              className="text-[#6C757D] hover:text-[#F36A21] transition duration-250"
            >
              Motos
            </a>
            <a
              href="#serviços"
              className="text-[#6C757D] hover:text-[#F36A21] transition duration-250"
            >
              Serviços
            </a>
            <a
              href="#sobre"
              className="text-[#6C757D] hover:text-[#F36A21] transition duration-250"
            >
              Sobre
            </a>
            <a
              href="#contato"
              className="text-[#6C757D] hover:text-[#F36A21] transition duration-250"
            >
              Contato
            </a>
            <a
              href="tel:+1-555-MOTO-PRO"
              className="bg-[#F36A21] hover:bg-[#E55A1A] text-white font-montserrat font-bold text-lg px-6 py-3 rounded-lg shadow-md transition-all duration-250 ease-in-out"
            >
              Login
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={toggleMobileMenu}>
            <svg
              className="h-6 w-6 text-[#1E1E1E]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <a
                href="#motorcycles"
                className="text-[#6C757D] hover:text-[#F36A21] transition duration-250"
              >
                Motorcycles
              </a>
              <a
                href="#services"
                className="text-[#6C757D] hover:text-[#F36A21] transition duration-250"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-[#6C757D] hover:text-[#F36A21] transition duration-250"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-[#6C757D] hover:text-[#F36A21] transition duration-250"
              >
                Contact
              </a>
              <a
                href="tel:+1-555-MOTO-PRO"
                className="bg-[#F36A21] hover:bg-[#E55A1A] text-white font-montserrat font-bold px-6 py-3 rounded-lg shadow-md text-center transition-all duration-250 ease-in-out"
              >
                Call Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

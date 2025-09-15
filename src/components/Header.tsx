"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  const toggleMobileMenu = () => setMenuOpen(!menuOpen);

   useEffect(() => {
    const getUserAndProfile = async () => {
      // pega usuário do supabase auth
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // busca o perfil na tabela profiles
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", user.id)
          .single();

        if (!error && profileData) {
          setProfile(profileData);
        }
      }
    };

    getUserAndProfile();

    // Escuta mudanças de auth (login/logout)
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/auth");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer"
          onClick={() => window.location.href = "/"}>
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
           <Link
              href="/motos"
              className="text-[#6C757D] hover:text-[#F36A21] transition"
            >
              Motos
            </Link>
            <a href="#serviços" className="text-[#6C757D] hover:text-[#F36A21] transition">
              Serviços
            </a>
            <a href="#testimonials" className="text-[#6C757D] hover:text-[#F36A21] transition">
              Sobre
            </a>
            <a href="#contact" className="text-[#6C757D] hover:text-[#F36A21] transition">
              Contato
            </a>

            {user ? (
              <>
                <span className="text-[#6C757D]">Olá, {profile?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-2 rounded-lg transition"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="bg-[#F36A21] hover:bg-[#E55A1A] text-white font-bold text-lg px-6 py-3 rounded-lg shadow-md transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={toggleMobileMenu}>
            <svg
              className="h-6 w-6 text-[#1E1E1E]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col space-y-3">
            <a href="#motos" className="text-[#6C757D] hover:text-[#F36A21] transition">
              Motos
            </a>
            <a href="#serviços" className="text-[#6C757D] hover:text-[#F36A21] transition">
              Serviços
            </a>
            <a href="#testimonials" className="text-[#6C757D] hover:text-[#F36A21] transition">
              Sobre
            </a>
            <a href="#contact" className="text-[#6C757D] hover:text-[#F36A21] transition">
              Contato
            </a>

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-lg transition"
              >
                Sair
              </button>
            ) : (
              <Link
                href="/auth"
                className="bg-[#F36A21] hover:bg-[#E55A1A] text-white font-bold px-6 py-3 rounded-lg shadow-md text-center transition"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AuthPage() {
  const [view, setView] = useState<'login' | 'signup' | 'forgotPassword'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    setMessage('');
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) return setMessage(authError.message);

    const userId = authData.user?.id;
    const { error: profileError } = await supabase.from('profiles').insert([
      { id: userId, name, phone },
    ]);

    if (profileError) return setMessage(profileError.message);

    setMessage('Cadastro realizado! Verifique seu email para confirmação.');
  };

  const handleLogin = async () => {
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else setMessage('Login realizado com sucesso!');
  };

  const handleResetPassword = async () => {
    setMessage('');
    if (!email) return setMessage('Digite seu email para redefinir a senha.');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth`,
    });

    if (error) setMessage(error.message);
    else setMessage('Email de redefinição enviado! Verifique sua caixa de entrada.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-3xl font-extrabold text-center text-[#F36A21] font-montserrat">
          {view === 'signup'
            ? 'Crie sua conta'
            : view === 'login'
            ? 'Bem-vindo de volta!'
            : 'Redefinir senha'}
        </h2>

        {view === 'signup' && (
          <>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-800"
            />
            <input
              type="text"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-800"
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-800"
        />

        {(view === 'login' || view === 'signup') && (
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 text-gray-800"
          />
        )}

        <button
          onClick={
            view === 'signup'
              ? handleSignUp
              : view === 'login'
              ? handleLogin
              : handleResetPassword
          }
          className="w-full py-3 px-6 bg-[#F36A21] text-white font-bold rounded-lg hover:bg-[#E55A1A] transition"
        >
          {view === 'signup'
            ? 'Cadastrar'
            : view === 'login'
            ? 'Login'
            : 'Enviar email'}
        </button>

        {message && <p className="text-center text-red-500">{message}</p>}

        {view === 'login' && (
          <p
            className="text-center text-sm text-blue-500 cursor-pointer hover:underline"
            onClick={() => setView('forgotPassword')}
          >
            Esqueceu a senha?
          </p>
        )}

        <p className="text-center text-gray-600">
          {view === 'signup'
            ? 'Já possui conta?'
            : view === 'forgotPassword'
            ? 'Lembrou da senha?'
            : 'Não possui conta?'}{' '}
          <span
            className="text-[#F36A21] cursor-pointer font-bold"
            onClick={() =>
              setView(view === 'signup' ? 'login' : view === 'forgotPassword' ? 'login' : 'signup')
            }
          >
            {view === 'signup' ? 'Login' : view === 'forgotPassword' ? 'Login' : 'Cadastre-se'}
          </span>
        </p>
      </div>
    </div>
  );
}

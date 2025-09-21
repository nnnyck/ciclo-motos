'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const checkAdmin = async (session: Session | null) => {
    setSession(session);

    if (!session) {
      setIsAdmin(false);
      return;
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();

    if (error || !profile?.is_admin) {
      setIsAdmin(false);
      return;
    }

    setIsAdmin(true);
  };

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      await checkAdmin(data.session);
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, _session) => {
      checkAdmin(_session);
    });

    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  return { isAdmin, session };
}

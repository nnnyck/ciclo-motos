'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
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

    checkAdmin();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, _session) => {
      setSession(_session);
      if (!_session) setIsAdmin(false);
    });

    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  return { isAdmin, session };
}

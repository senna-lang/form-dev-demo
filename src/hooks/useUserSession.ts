'use client';
import { useStore } from '@/store/store';
import { supabase } from '../lib/supabaseClient';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useUserSession = () => {
  const router = useRouter();
  const updateSession = useStore(state => state.updateSession);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          updateSession(session);
        } else if (event === 'SIGNED_OUT') {
          updateSession(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return {
    logout,
  };
};

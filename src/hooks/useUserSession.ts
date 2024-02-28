'use client';
import { useStore } from '@/store/store';
import { supabase } from '../lib/supabaseClient';
import { useEffect } from 'react';
import { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export const useUserSession = () => {
  const router = useRouter();
  const updateEmail = useStore(state => state.updateEmail);
  const updateUserName = useStore(state => state.updateUserName);

  const [session, setSession] = useState<Session | null>();
  console.log(session);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (event === 'SIGNED_IN') {
          updateEmail(session?.user.email!);
          updateUserName(session?.user.id!);
        } else if (event === 'SIGNED_OUT') {
          updateEmail('');
          updateUserName('');
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
    session,
    logout,
  };
};

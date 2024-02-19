'use client'

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupFormSchema } from '@/lib/formSchema';
import { useCallback } from 'react';
import { z } from 'zod';
import { supabase } from '@/lib/supabaseClient';

export const useLogoutForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof signupFormSchema>> = useCallback(
    async data => {
      const { username, email, password } = data;

      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) {
          throw error;
        }
        router.push('/login');
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    },
    []
  );

  return { form, onSubmit };
};

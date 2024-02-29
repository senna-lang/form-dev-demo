'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupFormSchema } from '@/lib/formSchema';
import { useCallback } from 'react';
import { z } from 'zod';
import { supabase } from '@/lib/supabaseClient';

export const useLogoutForm = () => {
  const [error, setError] = useState<string>('');
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
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) {
          throw signUpError;
        }

        const { error: userError } = await supabase
          .from('form-demo-auth')
          .insert([{ id: data.user?.id, username, email }]);

        if (userError) {
          if (
            userError.message.includes(
              'duplicate key value violates unique constraint'
            )
          ) {
            setError('このユーザーネームはすでに使用されています。');
          }
          return;
        }

        router.push('/email-confirm');
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    },
    []
  );

  return { form, onSubmit, error };
};

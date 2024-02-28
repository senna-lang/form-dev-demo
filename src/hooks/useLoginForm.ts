import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/lib/formSchema';
import { useCallback, useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export const useLoginForm = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = useCallback(
    async data => {
      const { email, password } = data;
      try {
        const { data, error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });
        if (signInError) {
          if (signInError.message.includes('Email not confirmed')) {
            setError('emailの認証が完了していません。');
          }
          if (signInError.message.includes('Invalid login credentials')) {
            setError('メールアドレスが間違っています。');
          }
          return;
        }
        router.push('/');
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

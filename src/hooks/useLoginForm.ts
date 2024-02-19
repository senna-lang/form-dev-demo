import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/lib/formSchema';
import { useCallback } from 'react';
import { z } from 'zod';

export const useLoginForm = () => {
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
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send`, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  return { form, onSubmit };
};

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/lib/formSchema';
import { useCallback } from 'react';

export const useMailForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      subject: '',
      email: '',
      content: '',
    },
  });

  const onSubmit = useCallback((values: any) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }, []);

  return { form, onSubmit };
};

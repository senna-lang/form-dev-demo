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
      file: undefined,
    },
  });

  const onSubmit = useCallback(async (values: any) => {
    const { username, subject, email, content,file } = values;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send`, {
        method: 'POST',
        body: JSON.stringify({ username, subject, email, content }),
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return { form, onSubmit };
};

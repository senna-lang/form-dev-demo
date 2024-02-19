import { Form, useForm } from 'react-hook-form';
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
    const { username, subject, email, content, file } = values;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('content', content);
    formData.append('file', file[0]);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send`, {
        method: 'POST',
        body: formData,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return { form, onSubmit };
};

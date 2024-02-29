import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/lib/formSchema';
import { useCallback } from 'react';
import { z } from 'zod';
import { sendMailForm } from '@/actions/actions';

export const useMailForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      subject: '',
      email: '',
      content: '',
      file: undefined,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback(
    async values => {
      const { username, subject, email, content, file } = values;
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('subject', subject);
      formData.append('content', content);
      formData.append('file', file[0]);

      sendMailForm(formData);
    },
    []
  );

  return { form, onSubmit };
};

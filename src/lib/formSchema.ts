import { z } from 'zod';

export const formSchema = z.object({
  username: z.string().min(2, { message: '２文字以上で入力してください。' }),
  subject: z.string().min(2, { message: '２文字以上で入力しててください。' }),
  email: z.string().email({ message: '無効なメールアドレスです。' }),
  content: z
    .string()
    .min(10, { message: '10文字以上で入力してください。' })
    .max(200, { message: '200文字以内で入力してください。' }),
});

import { z } from 'zod';

const MAX_MB = 10;
const MAX_FILE_SIZE = MAX_MB * 1024 * 1024;
const ACCEPTED_IMAGE_TYPE = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const formSchema = z.object({
  username: z.string().min(2, { message: '２文字以上で入力してください。' }),
  subject: z.string().min(2, { message: '２文字以上で入力しててください。' }),
  email: z.string().email({ message: '無効なメールアドレスです。' }),
  content: z
    .string()
    .min(10, { message: '10文字以上で入力してください。' })
    .max(200, { message: '200文字以内で入力してください。' }),
  file: z
    .custom<FileList>()
    .refine(files => files?.length > 0, 'ファイル画像が必要です。')
    .refine(
      files => files?.[0].size <= MAX_FILE_SIZE,
      `画像サイズは${MAX_MB}MBまでです。`
    )
    .refine(
      files => ACCEPTED_IMAGE_TYPE.includes(files?.[0]?.type),
      '.jpeg,.jpg,.png.,webpのファイルのみ利用できます。'
    ),
});

export const signupFormSchema = z.object({
  username: z.string().min(2, { message: '２文字以上で入力してください。' }),
  email: z.string().email({ message: '無効なメールアドレスです。' }),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .regex(
      /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
      'パスワードは半角英数字混合で入力してください'
    ),
});
export const loginFormSchema = z.object({
  email: z.string().email({ message: '無効なメールアドレスです。' }),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .regex(
      /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
      'パスワードは半角英数字混合で入力してください'
    ),
});

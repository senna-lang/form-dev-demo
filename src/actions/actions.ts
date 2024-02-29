'use server';
import EmailTemplate from '@/components/EmailTemplate';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMailForm = async (formDataProps: any) => {
  const formData = formDataProps;
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const content = formData.get('content') as string;
  const file = formData.get('file') as File;

  const buffer = Buffer.from(await file.arrayBuffer());
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['asrsena3302@gmail.com'],
      subject,
      react: EmailTemplate({
        username,
        email,
        content,
      }) as React.ReactElement,
      attachments: [{ filename: file.name, content: buffer }],
    });
    if (error instanceof Error) {
      return console.error(error);
    }
  } catch (err) {
    return console.error(err);
  }
};

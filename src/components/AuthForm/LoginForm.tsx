'use client';
import { useLoginForm } from '@/hooks/useLoginForm';
import { Button } from '../ui/button';
import Link from 'next/link';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const { form, onSubmit } = useLoginForm();

  return (
    <div className="rounded-md bg-slate-300 p-12 w-1/3 ">
      <Form {...form}>
        <ToastContainer />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? '送信中' : '送信'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;

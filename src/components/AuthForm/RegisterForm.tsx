'use client';
import { useLogoutForm } from '@/lib/useSignupForm';
import { Button } from '../ui/button';
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

const LogoutForm = () => {
  const { form, onSubmit, error } = useLogoutForm();

  return (
    <div className="rounded-md bg-slate-300 p-12 w-1/3 ">
      <p className=" text-red-500 text-center">{error}</p>
      <Form {...form}>
        <ToastContainer />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ユーザーネーム</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

export default LogoutForm;

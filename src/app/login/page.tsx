import Link from 'next/link';
import LoginForm from '@/components/AuthForm/LoginForm';

const Login = () => {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24">
      <h1 className=" font-semibold text-2xl mb-4">ログイン</h1>
      <LoginForm />
      <div className=" mt-4 block">
        <Link href="/register">アカウントをお持ちでない方</Link>
      </div>
    </main>
  );
};

export default Login;

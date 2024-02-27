import Link from 'next/link';
import LogoutForm from '@/components/AuthForm/RegisterForm';

const Register = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className=" font-semibold text-2xl mb-4">新規登録</h1>
      <LogoutForm />
      <div className=' mt-4 block'>
        <Link href="/login">すでにアカウントをお持ちの方</Link>
      </div>
    </main>
  );
};

export default Register;

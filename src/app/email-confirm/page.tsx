'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

const emailConfirm = () => {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const session = async () => {
      const { data } = await supabase.auth.getSession();
      setEmail(data.session?.user.email!);
    };
    session();
  }, []);
  return (
    <div className="w-full h-screen flex flex-col justify-center">
      <div className=" bg-slate-400 w-1/3 mx-auto p-9 rounded-lg text-center">
        <h2>Emailアドレスの確認をしてください。</h2>
        <p>下記アドレスに確認メールを送信しました。</p>
        <p className=' text-blue-700 mb-6'>{email}</p>
        <Link href='/login'>ログインページへ</Link>
      </div>
    </div>
  );
};

export default emailConfirm;

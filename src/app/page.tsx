import MailForm from '@/components/MailForm/MailForm';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className=' font-semibold text-2xl mb-2'>お問い合わせフォーム</h1>
      <h2 className='text-xl '>RHF & ZOD</h2>
      <MailForm/>
      <div className='mt-3'>
        <Link href='/auth'>ログインページへ</Link>
      </div>
    </main>
  );
}

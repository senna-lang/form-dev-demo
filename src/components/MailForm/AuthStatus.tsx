'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useUserSession } from '@/hooks/useUserSession';

const AuthStatus = () => {
  const { session, logout } = useUserSession();
  return (
    <div>
      {session !== null ? (
        <Button type="button" onClick={() => logout()}>
          ログアウト
        </Button>
      ) : (
        <Link href="/login">ログインページへ</Link>
      )}
    </div>
  );
};

export default AuthStatus;

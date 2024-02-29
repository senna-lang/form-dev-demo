'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useUserSession } from '@/hooks/useUserSession';
import { useStore } from '@/store/store';

const AuthStatus = () => {
  const { logout } = useUserSession();
  const session = useStore(state => state.session);
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

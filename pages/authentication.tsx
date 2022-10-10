import { withSessionSsr } from '@/lib/withSession';
import Link from 'next/link';
import React from 'react';

type Props = {
  isLoggedIn: boolean;
};

export default function Authentication({ isLoggedIn }: Props) {
  return (
    <div>
      {isLoggedIn ? (
        <Link href="/api/logout?redirectTo=/authentication">Logout</Link>
      ) : (
        <>
          <Link href="/api/custom_login">Custom Login</Link>
          <br />
          <Link href="/api/google_login">Google Login</Link>
        </>
      )}
    </div>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  console.log(req.session.user);
  return {
    props: { isLoggedIn: req.session.user?.isLoggedIn ?? false },
  };
});

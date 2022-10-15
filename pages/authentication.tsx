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
          <Link
            href={`/api/openid/login/custom?redirect_uri=${process.env.CUSTOM_OPENID_REDIRECT_URI}`}
          >
            Custom Login
          </Link>
          <br />
          <Link
            href={`/api/openid/login/google?redirect_uri=${process.env.GOOGLE_OPENID_REDIRECT_URI}`}
          >
            Google Login
          </Link>
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

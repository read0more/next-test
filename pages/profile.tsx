import useUser from '@/lib/useUser';
import { withSessionSsr } from '@/lib/withSession';
import React from 'react';
import { User } from './api/user';

type Props = {
  userBySSR?: User;
};

export default function Profile({ userBySSR }: Props) {
  // 1. client측에서 받아오는 방법
  const { user } = useUser();
  return (
    <>
      <div>
        <b>From CLIENT: </b>Hello, {user?.id}
      </div>
      <div>
        <b>From Server: </b>Hello, {userBySSR?.id}
      </div>
    </>
  );
}

// 2. server쪽에서 받아오는 방법
export const getServerSideProps = withSessionSsr(async ({ req }) => {
  return {
    props: { userBySSR: req.session.user ?? null },
  };
});

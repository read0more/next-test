import { withSessionRoute } from 'lib/withSession';

export type User = {
  id: string;
  admin: boolean;
  isLoggedIn: boolean;
};

declare module 'iron-session' {
  // eslint-disable-next-line no-unused-vars
  interface IronSessionData {
    user?: User;
  }
}

export default withSessionRoute(async (req, res) => {
  // get user from database then:
  req.session.user = {
    id: '230',
    admin: true,
    isLoggedIn: true,
  };
  await req.session.save();
  res.send('Logged in');
});

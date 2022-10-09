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
  req.session.destroy();
  res.send({ ok: true });
});

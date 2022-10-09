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
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      id: '',
      admin: false,
      isLoggedIn: false,
    });
  }
});

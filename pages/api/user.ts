import { NextApiResponse } from 'next';
import { withSessionRoute } from 'lib/withSession';

export type User = {
  id: string;
  isLoggedIn: boolean;
};

export default withSessionRoute(async (req, res: NextApiResponse<User>) => {
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
      isLoggedIn: false,
    });
  }
});

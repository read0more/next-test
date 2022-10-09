import { withSessionRoute } from 'lib/withSession';
import { deserializeAuthState, getAuthStateCookie } from '@/lib/state';
import { google } from '@/lib/openId';

export default withSessionRoute(async (req, res) => {
  const { googleClient } = await google();

  const state = getAuthStateCookie(req);
  const { backToPath } = deserializeAuthState(state);
  const params = googleClient.callbackParams(req);
  const tokenSet = await googleClient.callback(
    `${process.env.CLIENT_URL}/api/google_callback`,
    params,
    { state }
  );
  const user = await googleClient!.userinfo(tokenSet);

  req.session.user = {
    id: user.name!,
    isLoggedIn: true,
  };
  await req.session.save();
  res.redirect(`${process.env.CLIENT_URL}/${backToPath}`);
});

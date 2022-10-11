import GoogleOpenId from '@/lib/openId/GoogleOpenId';
import { withSessionRoute } from 'lib/withSession';
import { deserializeAuthState, getAuthStateCookie } from '@/lib/state';

export default withSessionRoute(async (req, res) => {
  const googleOpenId = await GoogleOpenId.getInstance();

  const state = getAuthStateCookie(req);
  const { backToPath } = deserializeAuthState(state);
  const params = googleOpenId.client.callbackParams(req);
  const tokenSet = await googleOpenId.client.callback(
    process.env.GOOGLE_OPENID_REDIRECT_URI!,
    params,
    { state }
  );
  const user = await googleOpenId.client.userinfo(tokenSet);

  req.session.user = {
    id: user.name!,
    isLoggedIn: true,
  };
  await req.session.save();
  res.redirect(`${process.env.CLIENT_URL}/${backToPath}`);
});

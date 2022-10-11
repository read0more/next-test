import GoogleOpenId from '@/lib/openId/GoogleOpenId';
import { serializeAuthState, setAuthStateCookie } from '@/lib/state';
import { withSessionRoute } from 'lib/withSession';

export default withSessionRoute(async (req, res) => {
  const googleOpenId = await GoogleOpenId.getInstance();
  const backToPath = (req.query.backTo as string) || '/profile';
  const state = serializeAuthState({ backToPath });

  const authUrl = googleOpenId.client.authorizationUrl({
    scope: 'openid email profile',
    state,
  });

  setAuthStateCookie(res, state);
  res.redirect(authUrl);
});

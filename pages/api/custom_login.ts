import { serializeAuthState, setAuthStateCookie } from '@/lib/state';
import { withSessionRoute } from 'lib/withSession';
import CustomOpenId from '@/lib/openId/CustomOpenId';

export default withSessionRoute(async (req, res) => {
  const customOpenId = await CustomOpenId.getInstance();
  const backToPath = (req.query.backTo as string) || '/profile';
  const state = serializeAuthState({ backToPath });

  const authUrl = customOpenId.client.authorizationUrl({
    scope: 'openid email profile',
    state,
  });

  setAuthStateCookie(res, state);
  res.redirect(authUrl);
});

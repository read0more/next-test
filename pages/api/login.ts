import { google } from '@/lib/openId';
import { serializeAuthState, setAuthStateCookie } from '@/lib/state';
import { withSessionRoute } from 'lib/withSession';

export default withSessionRoute(async (req, res) => {
  const { googleClient } = await google();
  const backToPath = (req.query.backTo as string) || '/profile';
  const state = serializeAuthState({ backToPath });

  const authUrl = googleClient.authorizationUrl({
    scope: 'openid email profile',
    state,
  });

  setAuthStateCookie(res, state);
  res.redirect(authUrl);
});

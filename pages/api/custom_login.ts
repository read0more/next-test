import { custom } from '@/lib/openId';
import { serializeAuthState, setAuthStateCookie } from '@/lib/state';
import { withSessionRoute } from 'lib/withSession';

export default withSessionRoute(async (req, res) => {
  const { customClient } = await custom();
  const backToPath = (req.query.backTo as string) || '/profile';
  const state = serializeAuthState({ backToPath });

  const authUrl = customClient.authorizationUrl({
    scope: 'openid email profile',
    state,
  });

  setAuthStateCookie(res, state);
  res.redirect(authUrl);
});

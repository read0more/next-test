import { withSessionRoute } from 'lib/withSession';
import { deserializeAuthState, getAuthStateCookie } from '@/lib/state';
import OpenIdFactory from '@/lib/openId/OpenIdFactory';

export default withSessionRoute(async (req, res) => {
  let { platform } = req.query;
  platform = (Array.isArray(platform) ? platform[0] : platform) ?? '';
  const openId = await OpenIdFactory.getInstance(platform);

  const redirectUris = openId.client?.metadata.redirect_uris ?? [];
  const state = getAuthStateCookie(req);
  const { backToPath } = deserializeAuthState(state);
  const params = openId.client.callbackParams(req);
  const tokenSet = await openId.client.callback(redirectUris[0], params, {
    state,
  });
  const user = await openId.client.userinfo(tokenSet);

  req.session.user = {
    id: user.name!,
    isLoggedIn: true,
  };
  await req.session.save();

  res.redirect(`${process.env.CLIENT_URL}/${backToPath}`);
});

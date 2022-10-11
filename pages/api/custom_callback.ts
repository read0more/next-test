import { withSessionRoute } from 'lib/withSession';
import { deserializeAuthState, getAuthStateCookie } from '@/lib/state';
import CustomOpenId from '@/lib/openId/CustomOpenId';

export default withSessionRoute(async (req, res) => {
  const customOpenId = await CustomOpenId.getInstance();

  const state = getAuthStateCookie(req);
  const { backToPath } = deserializeAuthState(state);
  const params = customOpenId.client.callbackParams(req);
  const tokenSet = await customOpenId.client.callback(
    `${process.env.CLIENT_URL}/api/custom_callback`,
    params,
    { state }
  );

  console.log(backToPath);

  // process.env.GOOGLE_OPENID_REDIRECT_URI!

  const user = await customOpenId.client.userinfo(tokenSet);
  res.send(user);
});

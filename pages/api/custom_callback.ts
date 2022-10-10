import { withSessionRoute } from 'lib/withSession';
import { deserializeAuthState, getAuthStateCookie } from '@/lib/state';
import { custom } from '@/lib/openId';

export default withSessionRoute(async (req, res) => {
  const { customClient } = await custom();
  const state = getAuthStateCookie(req);
  const { backToPath } = deserializeAuthState(state);
  const params = customClient.callbackParams(req);
  const tokenSet = await customClient.callback(
    `${process.env.CLIENT_URL}/api/custom_callback`,
    params,
    { state }
  );

  console.log(backToPath);

  const user = await customClient!.userinfo(tokenSet);
  res.send(user);
});

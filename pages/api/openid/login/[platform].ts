import OpenIdFactory from '@/lib/openId/OpenIdFactory';
import { serializeAuthState, setAuthStateCookie } from '@/lib/state';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  let { platform } = req.query;
  platform = (Array.isArray(platform) ? platform[0] : platform) ?? '';
  const openId = await OpenIdFactory.getInstance(platform);

  const backToPath = (req.query.backTo as string) || '/profile';
  const state = serializeAuthState({ backToPath });

  const authUrl = openId.client.authorizationUrl({
    scope: 'openid email profile',
    state,
  });

  setAuthStateCookie(res, state);
  res.redirect(authUrl);
}

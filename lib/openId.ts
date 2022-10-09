import { User } from '@/pages/api/user';
import { BaseClient, Issuer } from 'openid-client';

declare module 'iron-session' {
  // eslint-disable-next-line no-unused-vars
  interface IronSessionData {
    googleClient: BaseClient;
    user?: User;
  }
}

export const google = async () => {
  const googleIssuer = await Issuer.discover('https://accounts.google.com');
  const googleClient = new googleIssuer.Client({
    client_id: process.env.OAUTH_CLIENT_ID!,
    client_secret: process.env.OAUTH_CLIENT_SECRET!,
    redirect_uris: [`${process.env.CLIENT_URL}/api/google_callback`],
    response_types: ['code'],
  });

  return { googleIssuer, googleClient };
};

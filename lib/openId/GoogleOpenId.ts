import { Issuer } from 'openid-client';
import OpenId from './OpenId';

export default class GoogleOpenId extends OpenId {
  // eslint-disable-next-line no-use-before-define
  private static instance: GoogleOpenId;

  static async getInstance() {
    if (!GoogleOpenId.instance) {
      const issuer = await Issuer.discover('https://accounts.google.com');
      const client = new issuer.Client({
        client_id: process.env.GOOGLE_OPENID_CLIENT_ID!,
        client_secret: process.env.GOOGLE_OPENID_SECRET!,
        redirect_uris: [process.env.GOOGLE_OPENID_REDIRECT_URI!],
        response_types: ['code'],
      });

      GoogleOpenId.instance = new GoogleOpenId(issuer, client);
    }

    return GoogleOpenId.instance;
  }
}

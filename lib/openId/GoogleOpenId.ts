import { BaseClient, Issuer } from 'openid-client';
import OpenId from './OpenId';

export default class GoogleOpenId implements OpenId {
  // eslint-disable-next-line no-use-before-define
  private static instance: GoogleOpenId;

  // eslint-disable-next-line no-useless-constructor
  private constructor(
    public issuer: Issuer<BaseClient>,
    public client: BaseClient
  ) {}

  static async getInstance() {
    if (!GoogleOpenId.instance) {
      const issuer = await Issuer.discover('https://accounts.google.com');
      const client = new issuer.Client({
        client_id: process.env.OAUTH_CLIENT_ID!,
        client_secret: process.env.OAUTH_CLIENT_SECRET!,
        redirect_uris: [process.env.GOOGLE_OPENID_REDIRECT_URI!],
        response_types: ['code'],
      });

      GoogleOpenId.instance = new GoogleOpenId(issuer, client);
    }

    return GoogleOpenId.instance;
  }
}

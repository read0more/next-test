import { BaseClient, Issuer } from 'openid-client';
import OpenId from './OpenId';

export default class CustomOpenId implements OpenId {
  // eslint-disable-next-line no-use-before-define
  private static instance: CustomOpenId;

  // eslint-disable-next-line no-useless-constructor
  private constructor(
    public issuer: Issuer<BaseClient>,
    public client: BaseClient
  ) {}

  static async getInstance() {
    if (!CustomOpenId.instance) {
      const issuer = await Issuer.discover(
        `http://localhost:${process.env.OIDC_SERVER_PORT}`
      );

      const client = new issuer.Client({
        client_id: 'oidcCLIENT',
        client_secret: 'Some_super_secret',
        redirect_uris: ['http://localhost:3000/api/custom_callback'],
        response_types: ['code'],
      });

      CustomOpenId.instance = new CustomOpenId(issuer, client);
    }

    return CustomOpenId.instance;
  }
}

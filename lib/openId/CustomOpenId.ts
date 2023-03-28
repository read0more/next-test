import { Issuer } from 'openid-client';
import OpenId from './OpenId';

export default class CustomOpenId extends OpenId {
  // eslint-disable-next-line no-use-before-define
  private static instance: CustomOpenId;

  static async getInstance() {
    if (!CustomOpenId.instance) {
      const issuer = await Issuer.discover(
        `${process.env.CUSTOM_OPENID_SERVER_URI!}/oidc`
      );
      const client = new issuer.Client({
        client_id: process.env.CUSTOM_OPENID_CLIENT!,
        client_secret: process.env.CUSTOM_OPENID_SECRET!,
        redirect_uris: [process.env.CUSTOM_OPENID_REDIRECT_URI!], // redirect_uris가 2개 이상이라면 OIDC 서버로 넘어갈 때 redirect_uri를 query string에 넣어줘야한다.
        response_types: ['code'],
      });

      CustomOpenId.instance = new CustomOpenId(issuer, client);
    }

    return CustomOpenId.instance;
  }
}

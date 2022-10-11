import { User } from '@/pages/api/user';
import { BaseClient, Issuer } from 'openid-client';

declare module 'iron-session' {
  // eslint-disable-next-line no-unused-vars
  interface IronSessionData {
    googleClient: BaseClient;
    user?: User;
  }
}

export default interface OpenId {
  issuer: Issuer<BaseClient>;
  client: BaseClient;
}

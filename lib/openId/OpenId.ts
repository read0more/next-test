import { User } from '@/pages/api/user';
import { BaseClient, Issuer } from 'openid-client';

declare module 'iron-session' {
  // eslint-disable-next-line no-unused-vars
  interface IronSessionData {
    user?: User;
  }
}

export default abstract class OpenId {
  // eslint-disable-next-line no-useless-constructor
  constructor(public issuer: Issuer<BaseClient>, public client: BaseClient) {}
}

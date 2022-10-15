import CustomOpenId from './CustomOpenId';
import GoogleOpenId from './GoogleOpenId';
import OpenId from './OpenId';

export default class OpenIdFactory {
  static async getInstance(type: string): Promise<OpenId> {
    switch (type) {
      case 'google':
        return await GoogleOpenId.getInstance();

      case 'custom':
        return await CustomOpenId.getInstance();

      default:
        throw new Error('check OpenID type');
    }
  }
}

export default interface iProvider {
  clientId: string;
  clientSecret: string;
  scope: string;
  profileNotImplemented?: boolean;
  params?: Object;
  accessTokenUrl?: string;
  requestTokenUrl?: string;
  authorizationUrl?: string;
  callbackUrl?: string;
}

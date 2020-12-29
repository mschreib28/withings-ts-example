import iProvider from "./provider";

const Withings = (options: iProvider) => {
  return {
    ...options,
    id: "withings",
    name: "Withings",
    type: "oauth",
    version: "2.0",
    profileNotImplemented: true,
    scope: "",
    params: {
      grant_type: "authorization_code",
      action: "requesttoken",
      redirect_uri: "http://localhost:3000/api/auth/callback/withings",
    },
    accessTokenUrl: "https://wbsapi.withings.net/v2/oauth2",
    requestTokenUrl: "https://account.withings.com/oauth2_user/authorize2",
    authorizationUrl: "https://account.withings.com/oauth2_user/authorize2?response_type=code",
    callbackUrl: "http://localhost:3000/api/auth/callback/withings",
  };
};

export default Withings;

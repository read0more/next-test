require('dotenv').config();
const { Provider } = require('oidc-provider');
const configuration = {
  clients: [
    {
      client_id: process.env.CUSTOM_OPENID_CLIENT,
      client_secret: process.env.CUSTOM_OPENID_SECRET,
      grant_types: ['authorization_code'],
      redirect_uris: [process.env.CUSTOM_OPENID_REDIRECT_URI],
      response_types: ['code'],
    },
  ],
  pkce: {
    required: () => false,
  },
};

// todo: refresh token도 발급하게, login시 보내는 callback uri로 들어가게, client에 따라 권한 나누게
const oidc = new Provider(process.env.CUSTOM_OPENID_SERVER_URI, {
  ...configuration,
  claims: {
    openid: ['name'],
  },
  findAccount: async (ctx, id) => {
    console.log(ctx, id);
    return {
      accountId: id,
      async claims(use, scope) {
        console.log(use, scope);
        return { sub: id, name: id };
      },
    };
  },
});

oidc.callback();

oidc.listen(3002, () => {
  console.log(
    'oidc-provider listening on port 3002, check http://localhost:3002/.well-known/openid-configuration'
  );
});

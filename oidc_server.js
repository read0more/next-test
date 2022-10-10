const { Provider } = require('oidc-provider');
const configuration = {
  clients: [
    {
      client_id: 'oidcCLIENT',
      client_secret: 'Some_super_secret',
      grant_types: ['authorization_code'],
      redirect_uris: ['http://localhost:3000/api/custom_callback'],
      response_types: ['code'],
    },
  ],
  pkce: {
    required: () => false,
  },
};

// todo: refresh token도 발급하게, openId, login, callback 부분 추상화
const oidc = new Provider('http://localhost:3002', {
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

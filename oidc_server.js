require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Provider } = require('oidc-provider');
const Account = require('./AccountOIDC');

const app = express();
app.set('view engine', 'ejs');

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

// oidc server with express
const oidc = new Provider(process.env.CUSTOM_OPENID_SERVER_URI, {
  ...configuration,

  claims: {
    openid: ['name'],
  },
  findAccount: async (ctx, id) => {
    return {
      accountId: id,
      async claims(use, scope) {
        return { sub: id, name: id };
      },
    };
  },
  interactions: {
    url(ctx, interaction) {
      return `/interaction/${interaction.uid}`;
    },
  },
  features: {
    devInteractions: { enabled: false },
  },
});

app.use('/oidc', oidc.callback());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/interaction/:uid', async (req, res) => {
  const { uid, prompt, params, session } = await oidc.interactionDetails(
    req,
    res
  );

  const client = await oidc.Client.find(params.client_id);

  switch (prompt.name) {
    case 'login': {
      return res.render('oidc_login', {
        client,
        uid,
        details: prompt.details,
        params,
        title: 'Sign-in',
        session: session || undefined,
        dbg: {
          params,
          prompt,
        },
      });
    }
    case 'consent': {
      return res.render('oidc_consent_interactioin', {
        client,
        uid,
        details: prompt.details,
        params,
        title: 'Authorize',
        session: session || undefined,
        dbg: {
          params,
          prompt,
        },
      });
    }
  }
});

app.post('/interaction/:uid/login', async (req, res, next) => {
  try {
    const {
      prompt: { name },
    } = await oidc.interactionDetails(req, res);
    const account = await Account.findByLogin(req.body.login);

    const result = {
      login: {
        accountId: account.accountId,
      },
    };

    await oidc.interactionFinished(req, res, result, {
      mergeWithLastSubmission: false,
    });
  } catch (err) {
    next(err);
  }
});

app.post('/interaction/:uid/confirm', async (req, res, next) => {
  try {
    const interactionDetails = await oidc.interactionDetails(req, res);
    const {
      prompt: { name, details },
      params,
      session: { accountId },
    } = interactionDetails;

    let { grantId } = interactionDetails;
    let grant;

    if (grantId) {
      // we'll be modifying existing grant in existing session
      grant = await oidc.Grant.find(grantId);
    } else {
      // we're establishing a new grant
      grant = new oidc.Grant({
        accountId,
        clientId: params.client_id,
      });
    }

    if (details.missingOIDCScope) {
      grant.addOIDCScope(details.missingOIDCScope.join(' '));
    }
    if (details.missingOIDCClaims) {
      grant.addOIDCClaims(details.missingOIDCClaims);
    }
    if (details.missingResourceScopes) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [indicator, scopes] of Object.entries(
        details.missingResourceScopes
      )) {
        grant.addResourceScope(indicator, scopes.join(' '));
      }
    }

    grantId = await grant.save();

    const consent = {};
    if (!interactionDetails.grantId) {
      // we don't have to pass grantId to consent, we're just modifying existing one
      consent.grantId = grantId;
    }

    const result = { consent };
    await oidc.interactionFinished(req, res, result, {
      mergeWithLastSubmission: true,
    });
  } catch (err) {
    next(err);
  }
});

app.listen(3002, () => {
  console.log(
    'oidc-provider listening on port 3002, check http://localhost:3002/oidc/.well-known/openid-configuration'
  );
});

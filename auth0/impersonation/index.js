const http = require("http");
const { ManagementClient } = require("auth0");
const fetch = require("node-fetch");
const { parse } = require("url");
const request = require("request");
const https = require("https");

const PORT = 5000;
const userEmail = process.env.USER;
const appId = process.env.APP_ID;
const appSecret = process.env.APP_SECRET;
const appDomain = process.env.APP_DOMAIN;
const globalId = process.env.GLOBAL_ID;
const globalSecret = process.env.GLOBAL_SECRET;
const impersonatorId = process.env.IMPERSONATOR;

if (
  [
    userEmail,
    appId,
    appSecret,
    appDomain,
    globalId,
    globalSecret,
    impersonatorId
  ].some(variable => variable === undefined)
) {
  throw new Error("Environment variables are not set properly!");
}

const manager = new ManagementClient({
  clientId: appId,
  clientSecret: appSecret,
  domain: appDomain
});


async function getAccessToken() {
  const users = await manager.getUsersByEmail(userEmail);

  if (!users.length) {
    throw new Error(`User with email ${userEmail} has not been found`);
  }

  const { user_id } = users[0];
  console.log(`${userEmail} found: ${user_id}`);

  const response = await fetch(`https://${appDomain}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: globalId,
      client_secret: globalSecret,
      grant_type: "client_credentials"
    })
  });

  if (!response.ok) {
    throw new Error(`Access token request has failed: ${response.statusText}`);
  }

  const { access_token } = await response.json();

  return { access_token, user_id };
}

async function requestImpersonationCode(token, user_id) {
  const response = await fetch(
    `https://${appDomain}/users/${user_id}/impersonate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        protocol: "oauth2",
        impersonator_id: impersonatorId,
        client_id: appId,
        additionalParameters: {
          response_type: "code",
          scope: "openid profile"
        }
      })
    }
  );
  return response.text();
}

function startServer(port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const { code } = parse(req.url, true).query;
      if (code) {
        const { access_token } = await requestImpersonationTokens(code);
        res.write(access_token);
        return res.end();
      }
      const { access_token, user_id } = await getAccessToken();
      const impersonationCodeUrl = await requestImpersonationCode(
        access_token,
        user_id
      );
      res.writeHead(302, {
        Location: impersonationCodeUrl
      });
      res.end();
    });

    server.listen(port, err => {
      if (err) {
        return reject(`Error has occured: ${err}`);
      }
      console.log(`Listening for requests on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function requestImpersonationTokens(code) {
  const response = await fetch(`https://${appDomain}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: appId,
      client_secret: appSecret,
      grant_type: "authorization_code",
      redirect_uri: `http://localhost:${PORT}`,
      code
    })
  });
  if (!response.ok) {
    const result = await response.text();
    console.log(result);
    return;
  }
  return await response.json();
}

startServer(PORT);

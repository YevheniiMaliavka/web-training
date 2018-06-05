/*
======================== Abstract =================================================
Impersonation API is used to obtain an impersonation URL to log in as another user.
Impersonation URL contains id_token and access_token in a fragment component.
id_token is an ID Token of the user being impersonatet, contains impersonator_id.
access_token is an opaque Access Token with only /userinfo audience.
Impersonation API endpoint: /users/{user_id}/impersonate POST.



======================== Steps ====================================================
1. Use global client credentials of a tenant to access the Management API V1.
NOTE: The reason of using global credentials is the deprecation of API v1.

2. Use client credentials grant to get an access token. We trust our client.
That is, we exchange our client credentials for an access token directly.
The access token is the initiator of the authorization code grant flow.

3. Invoke Impersonation API v1 with previously retrieved access token.
Provide the callback url of the app, that is a url that will be set as a
redirect_uri query parameter of the impersonation url returned at the almost end. 
After calling the impersonation url, which goes to auth0, a redirect from auth0 
to the provided callback url is made with appropriate tokens. So, the authorization
code grant flow begins with a call to /users/{user_id}/impersonate POST. 
The successfull response would contain a url that after calling makes a redirect
to the provided in client settings callback url with a code as a fragment component.

4. Make a server response redirect to the retrieved from previous step url.
This would go to auth0 and then redirect back to the server with a authorization code.

5. Exchange authorization code for an access token. Unfortunately I could not find a way
to get an id_token along with access token within authorization code grant flow. 

6. Return access token and its claims in a response.
*/

const http = require('http');
const { ManagementClient } = require('auth0');
const fetch = require('node-fetch');
const { parse } = require('url');
const request = require('request');

const auth0Post = (url, body, token) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

async function getUserIdFromEmail(email) {
  const manager = new ManagementClient({
    clientId: appId,
    clientSecret: appSecret,
    domain: appDomain
  });

  const users = await manager.getUsersByEmail(userEmail);

  if (!users.length) {
    throw new Error(`User with email ${userEmail} has not been found`);
  }

  const { user_id } = users[0];

  return user_id;
}

async function getImpersonationApiAccessToken() {
  // POST  /oauth/token - Management API V1 Endpoint
  const response = await auth0Post(`https://${appDomain}/oauth/token`, {
    client_id: globalId,
    client_secret: globalSecret,
    grant_type: 'client_credentials'
  });

  if (!response.ok) {
    throw new Error(`Access token request has failed: ${response.statusText}`);
  }

  const { access_token } = await response.json();

  console.log(
    'Impersonation API access token has been retrieved: ',
    access_token
  );

  return access_token;
}

async function requestAuthorizationCodeGrant(token, user_id) {
  const response = await auth0Post(
    `https://${appDomain}/users/${user_id}/impersonate`,
    {
      protocol: 'oauth2',
      impersonator_id: impersonatorId,
      client_id: appId,
      additionalParameters: {
        response_type: 'code'
      }
    },
    token
  );

  return response.text();
}

async function impersonationTokenFromCodeGrant(code) {
  // POST  /oauth/token - Management API V1 Endpoint
  const response = await auth0Post(`https://${appDomain}/oauth/token`, {
    client_id: appId,
    client_secret: appSecret,
    grant_type: 'authorization_code',
    redirect_uri: `http://localhost:${PORT}`,
    code
  });

  if (!response.ok) {
    const result = await response.text();
    throw new Error(`Authorization code exchange has failed: ${result}`);
  }
  return await response.json();
}

async function handler(req, res) {
  const { code } = parse(req.url, true).query;
  if (code) {
    const response = await impersonationTokenFromCodeGrant(code);
    res.write(JSON.stringify(response, null, 2));
    return res.end();
  }

  const access_token = await getImpersonationApiAccessToken();
  const user_id = await getUserIdFromEmail(userEmail);
  const impersonationCodeUrl = await requestAuthorizationCodeGrant(
    access_token,
    user_id
  );
  res.writeHead(302, {
    Location: impersonationCodeUrl
  });
  res.end();
}

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
  throw new Error('Environment variables are not set properly!');
}

http.createServer(handler).listen(PORT, err => {
  if (err) {
    throw new Error(`Error has occured: ${err}`);
  }
  console.log(`Listening for requests on http://localhost:${PORT}`);
});

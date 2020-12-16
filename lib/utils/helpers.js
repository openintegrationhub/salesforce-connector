/* eslint no-await-in-loop: "off" */
/* eslint consistent-return: "off" */

const request = require('request-promise').defaults({ simple: false, resolveWithFullResponse: true });

const jsforce = require('jsforce');

const secretServiceApiEndpoint = process.env.SECRET_SERVICE_ENDPOINT || 'https://secret-service.openintegrationhub.com';

// async function lookupContact(msg, cfg) {
//   try {
//     return false;
//   } catch (e) {
//     console.error(e);
//   }
// }

async function upsertContact(msg, cfg) {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: cfg.instanceUrl,
      accessToken: cfg.accessToken,
    });

    console.log(conn);

    let id = false;
    if (msg.metadata && msg.metadata.recordUid) {
      // id = await lookupContact(msg, cfg);
      id = msg.metadata.recordUid;
    }

    console.log(id);

    // const newMsg = {
    //   data: Object.assign({}, msg.data),
    //   metadata: Object.assign({}, msg.metadata),
    // };

    // @todo: Add some logic here

    // Upon success, return the new ID

    // else
    return false;
  } catch (e) {
    console.error(e);
    return {};
  }
}

async function getContacts(cfg) { // , snapshot
  try {
    const conn = new jsforce.Connection({
      instanceUrl: cfg.instanceUrl,
      accessToken: cfg.accessToken,
    });

    console.log(conn);

    // @todo: Add some logic here

    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
}


async function getAccessToken(config) {
  try {
    if (config.accessToken) {
      return config.accessToken;
    }

    const response = await request({
      method: 'GET',
      uri: `${secretServiceApiEndpoint}/secrets/${config.secret}`,
      headers: {
        'x-auth-type': 'basic',
        authorization: `Bearer ${config.iamToken}`,
      },
      json: true,
    });

    const { value } = response.body;
    return value.accessToken;
  } catch (e) {
    console.log(e);
    return e;
  }
}


module.exports = {
  upsertContact, getContacts, getAccessToken, secretServiceApiEndpoint,
};

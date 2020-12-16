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

    // extIdField - External ID field name
    // SObject.prototype.upsert = function(records, extIdField, options, callback)

    // await conn.sobject('Contact').update(records, options, callback)

    // await conn.sobject('Contact').insert(records, options, callback)

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

async function getContacts(cfg, snapshot) { // , snapshot
  try {
    const conn = new jsforce.Connection({
      instanceUrl: cfg.instanceUrl,
      accessToken: cfg.accessToken,
    });

    console.log(conn);

    // const lastUpdated = new Date(snapshot.lastUpdated).toISOString();

    console.log('snapshot', snapshot);
    // const salesforceDate = jsforce.SfDate.toDateTimeLiteral(new Date(snapshot.lastUpdated));

    const result = await conn.sobject('Contact')
      .find(
        {
          // CreatedDate: { $gte: salesforceDate },
        },
        // { Id: 1,
        //   Name: 1,
        //   CreatedDate: 1
        // }
      )
      .sort({ CreatedDate: -1 })
      .limit(10000)
      .execute();
    console.log(result);

    if (result) return result;

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

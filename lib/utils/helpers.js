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

    if (cfg.devMode) console.log(conn);

    let id = false;
    if (msg.metadata && msg.metadata.recordUid) {
      // id = await lookupContact(msg, cfg);
      id = msg.metadata.recordUid;
    }

    if (cfg.devMode) console.log(id);

    // extIdField - External ID field name
    // SObject.prototype.upsert = function(records, extIdField, options, callback)
    let result = false;
    if (id) {
      result = await conn.sobject('Contact').update(msg.data);

      if (result === false) {
        const newData = msg.data;
        delete newData.Id;
        result = await conn.sobject('Contact').insert(newData);
      }
    } else {
      result = await conn.sobject('Contact').insert(msg.data);
    }

    if (cfg.devMode) {
      console.log(typeof result);
      if (Array.isArray(result)) {
        console.log(result.length);
        console.log(result[0]);
      } else {
        console.log(JSON.stringify(result));
      }
    }

    if (result !== false) {
      const newMeta = msg.metadata;
      newMeta.recordUid = String(result.Id);
      return { metadata: newMeta };
    }

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

    if (cfg.devMode) console.log(conn);

    // const lastUpdated = new Date(snapshot.lastUpdated).toISOString();

    console.log('snapshot', snapshot);
    // const salesforceDate = jsforce.SfDate.toDateTimeLiteral(new Date(snapshot.lastUpdated));

    const result = await conn.sobject('Contact')
      .find(
        {
          // CreatedDate: { $gte: salesforceDate },
        },
      )
      .sort({ CreatedDate: -1 })
      .limit(10000)
      .execute();

    if (cfg.devMode) {
      console.log(typeof result);
      if (Array.isArray(result)) {
        console.log(result.length);
        console.log(result[0]);
      } else {
        console.log(JSON.stringify(result));
      }
    }

    if (result) return result;

    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
}


async function upsertOrganization(msg, cfg) {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: cfg.instanceUrl,
      accessToken: cfg.accessToken,
    });

    if (cfg.devMode) console.log(conn);

    let id = false;
    if (msg.metadata && msg.metadata.recordUid) {
      // id = await lookupContact(msg, cfg);
      id = msg.metadata.recordUid;
    }

    if (cfg.devMode) console.log(id);

    // extIdField - External ID field name
    // SObject.prototype.upsert = function(records, extIdField, options, callback)
    let result = false;
    if (id) {
      result = await conn.sobject('Account').update(msg.data);

      if (result === false) {
        const newData = msg.data;
        delete newData.Id;
        result = await conn.sobject('Account').insert(newData);
      }
    } else {
      result = await conn.sobject('Account').insert(msg.data);
    }

    if (cfg.devMode) {
      console.log(typeof result);
      if (Array.isArray(result)) {
        console.log(result.length);
        console.log(result[0]);
      } else {
        console.log(JSON.stringify(result));
      }
    }

    if (result !== false) {
      const newMeta = msg.metadata;
      newMeta.recordUid = String(result.Id);
      return { metadata: newMeta };
    }

    return false;
  } catch (e) {
    console.error(e);
    return {};
  }
}

async function getOrganizations(cfg, snapshot) { // , snapshot
  try {
    const conn = new jsforce.Connection({
      instanceUrl: cfg.instanceUrl,
      accessToken: cfg.accessToken,
    });

    if (cfg.devMode) console.log(conn);

    // const lastUpdated = new Date(snapshot.lastUpdated).toISOString();

    console.log('snapshot', snapshot);
    // const salesforceDate = jsforce.SfDate.toDateTimeLiteral(new Date(snapshot.lastUpdated));

    const result = await conn.sobject('Account')
      .find(
        {
          // CreatedDate: { $gte: salesforceDate },
        },
      )
      .sort({ CreatedDate: -1 })
      .limit(10000)
      .execute();

    if (cfg.devMode) {
      console.log(typeof result);
      if (Array.isArray(result)) {
        console.log(result.length);
        console.log(result[0]);
      } else {
        console.log(JSON.stringify(result));
      }
    }

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
  upsertContact,
  getContacts,
  upsertOrganization,
  getOrganizations,
  getAccessToken,
  secretServiceApiEndpoint,
};

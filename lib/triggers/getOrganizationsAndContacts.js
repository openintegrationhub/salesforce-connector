/* eslint no-param-reassign: "off" */


const { transform } = require('@openintegrationhub/ferryman');
const { getContacts, getOrganizations, getAccessToken } = require('./../utils/helpers');
const { personToOih } = require('../transformations/personToOih');
const { organizationToOih } = require('../transformations/organizationToOih');

/**
 * This method will be called from OIH platform providing following data
 *
 * @param {Object} msg - incoming message object that contains ``body`` with payload
 * @param {Object} cfg - configuration that is account information and configuration field values
 */
async function processAction(msg, cfg, snapshot = {}) {
  try {
    cfg.accessToken = await getAccessToken(cfg);

    if (!cfg || !cfg.accessToken) {
      throw new Error('No access token!');
    }

    if (cfg.devMode) console.log('Fetching snapshot');

    snapshot.lastUpdated = new Date(snapshot.lastUpdated).getTime() || new Date(0).getTime();

    if (cfg.devMode) console.log(snapshot);

    const accounts = await getOrganizations(cfg, snapshot);

    if (cfg.devMode) console.log('accounts', JSON.stringify(accounts));

    let { length } = accounts;
    for (let i = 0; i < length; i += 1) {
      const updatedAt = new Date().getTime();
      if (updatedAt > snapshot.lastUpdated) snapshot.lastUpdated = updatedAt;
      const transformedMessage = transform(accounts[i], cfg, organizationToOih);

      if (cfg.devMode) {
        console.log('transformedMessage');
        console.log(JSON.stringify(transformedMessage));
      }

      this.emit('data', transformedMessage);
    }

    const contacts = await getContacts(cfg, snapshot);

    if (cfg.devMode) console.log('contacts', JSON.stringify(contacts));

    length = contacts.length; // eslint-disable-line prefer-destructuring
    for (let i = 0; i < length; i += 1) {
      const updatedAt = new Date().getTime();
      if (updatedAt > snapshot.lastUpdated) snapshot.lastUpdated = updatedAt;
      const transformedMessage = transform(contacts[i], cfg, personToOih);

      if (cfg.devMode) {
        console.log('transformedMessage');
        console.log(JSON.stringify(transformedMessage));
      }

      this.emit('data', transformedMessage);
    }

    this.emit('snapshot', snapshot);
  } catch (e) {
    console.error('ERROR: ', e);
    this.emit('error', e);
  }
}

module.exports = {
  process: processAction,
};

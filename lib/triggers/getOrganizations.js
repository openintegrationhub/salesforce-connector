/* eslint no-param-reassign: "off" */


const { transform } = require('@openintegrationhub/ferryman');
const { getOrganizations, getAccessToken } = require('./../utils/helpers');
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

    const contacts = await getOrganizations(cfg, snapshot);

    if (cfg.devMode) console.log('contacts', JSON.stringify(contacts));

    for (let i = 0; i < contacts.length; i += 1) {
      const updatedAt = new Date(contacts[i].LastModifiedDate).getTime();
      if (updatedAt > snapshot.lastUpdated) snapshot.lastUpdated = updatedAt;
      const transformedMessage = transform(contacts[i], cfg, organizationToOih);

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

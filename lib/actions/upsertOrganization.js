/* eslint no-param-reassign: "off" */


const { transform } = require('@openintegrationhub/ferryman');
const { upsertOrganization, getAccessToken } = require('./../utils/helpers');
const { organizationFromOih } = require('../transformations/organizationFromOih');

/**
 * This method will be called from OIH platform providing following data
 *
 * @param {Object} msg - incoming message object that contains ``data`` with payload
 * @param {Object} cfg - configuration that is account information and configuration field values
 */
async function processAction(msg, cfg) {
  try {
    cfg.accessToken = await getAccessToken(cfg);

    if (!cfg || !cfg.accessToken) {
      throw new Error('No access token!');
    }

    const transformedMessage = transform(msg, cfg, organizationFromOih);

    if (cfg.devMode) console.log('Dropping currently not supported fields in: MailingAddress, OtherAddress');

    delete transformedMessage.data.MailingAddress;
    delete transformedMessage.data.OtherAddress;

    if (cfg.devMode) console.log('transformedMessage', JSON.stringify(transformedMessage));

    const response = await upsertOrganization(transformedMessage, cfg);

    if (cfg.devMode) console.log('response', response);

    this.emit('data', response);
  } catch (e) {
    console.error('ERROR: ', e);
    this.emit('error', e);
  }
}

module.exports = {
  process: processAction,
};

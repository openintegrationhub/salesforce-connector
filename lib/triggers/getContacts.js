/* eslint no-param-reassign: "off" */


const {
  getContacts, getAccessToken, getMetadata, getElementDataFromResponse, dataAndSnapshot,
} = require('./../utils/helpers');

/**
 * This method will be called from OIH platform providing following data
 *
 * @param {Object} msg - incoming message object that contains ``body`` with payload
 * @param {Object} cfg - configuration that is account information and configuration field values
 */
async function processAction(msg, cfg, snapshot = {}) {
  try {
    const isVerbose = process.env.debug || cfg.verbose;
    const {
      snapshotKey, arraySplittingKey, skipSnapshot,
    } = cfg.nodeSettings;

    cfg.accessToken = await getAccessToken(cfg);

    if (!cfg || !cfg.accessToken) {
      throw new Error('No access token!');
    }

    if (isVerbose) {
      console.log(`---MSG: ${JSON.stringify(msg)}`);
      console.log(`---CFG: ${JSON.stringify(cfg)}`);
      console.log(`---ENV: ${JSON.stringify(process.env)}`);
    }

    snapshot.lastUpdated = new Date(snapshot.lastUpdated).getTime() || new Date(0).getTime();

    const contacts = await getContacts(cfg, snapshot);

    const newElement = {};

    newElement.metadata = getMetadata(msg.metadata);

    newElement.data = getElementDataFromResponse(arraySplittingKey, contacts);
    if (skipSnapshot) {
      return newElement.data;
    }
    return await dataAndSnapshot(newElement, snapshot, snapshotKey, '', this);
  } catch (e) {
    console.error('ERROR: ', e);
    return this.emit('error', e);
  }
}

module.exports = {
  process: processAction,
};

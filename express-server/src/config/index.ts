const _ = require('lodash');
const logger = require('log4js').getLogger('app');

const defaultEnv = 'development';
const env = process.env.NODE_ENV || defaultEnv;

let config = require('./config.json');

const configEnvironment = require(`./config.${env}.json`);

config = _.merge(config, configEnvironment);

if (env === defaultEnv) {
  try {
    const configLocal = require('./config.local.json');
    config = _.merge(config, configLocal);
    logger.info('Local user config loaded successfully');
  } catch (err) {
    logger.warn('Local user config not found');
  }
}

export default config;

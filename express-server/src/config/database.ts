import config from './index';

const database = `mongodb://${config.dbService}:${config.dbPort}/${config.dbName}`;

export default database;
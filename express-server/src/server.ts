import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as log4js from 'log4js';
import * as mongoose from 'mongoose';
import config from './config';
import dbConfig from './config/database';
import apiRoutes from './routes/routes';
import * as loader from './scripts/loader';
import * as http from 'http';
import * as socket from 'socket.io';
import IoServer from './socket';
import ExpressServer from './express';

const API_ROOT = '/api';
const DEVEL_ENV = 'development';

const logger = log4js.getLogger('app');
if ((process.env.NODE_ENV || DEVEL_ENV) === DEVEL_ENV) {
  logger.level = 'debug';
}

// API routes
logger.info('Instantiating Express server....');
const expressServer = ExpressServer.getInstance();
const server = expressServer.getServer();
const app = expressServer.getApp();

// socket.io Server
logger.info('Instantiating Socket.io server....');
const socketServer = IoServer.getInstance(server);
const router = express.Router();

//Connect mongoose to our database
mongoose.connect(dbConfig);

var db = mongoose.connection;

//Bind connection to error event
db.on('error', logger.error.bind(logger, 'MongoDB connection error:'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Access control
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
  next();
});

// Set our api routes
app.use(API_ROOT, apiRoutes);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Serve static files if needed
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(process.env.PORT || config.port, () => {
  logger.info('==== News Server ====');
  logger.info(`Server started in port -> ${(process.env.PORT || config.port)}`);
  logger.info(`Server started in env -> ${(process.env.NODE_ENV || DEVEL_ENV)}`);
  logger.info(`Node version -> ${process.version}`);
  logger.info(`Server started with exec-arguments -> ${process.execArgv}`);
  logger.info(`Server started with args -> ${process.argv.toString()}`);
  logger.info(`Server dependencies -> ${JSON.stringify(process.versions)}`);
  logger.info(`Current date -> ${new Date()}`);
});

// Initial load
loader.loadNewsInitialData()
  .then((status) => {
    logger.info('Succesfully load initial data');
  })
  .catch((err) => logger.error);

module.exports = router;

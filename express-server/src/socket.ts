import * as socket from 'socket.io';
import { Server } from 'http';
import * as log4js from 'log4js';
const logger = log4js.getLogger('app');

export default class IoServer {
  private io: SocketIO.Server;
  private static instance: IoServer;

  private constructor(server: Server) {
    /** 
     * Socket.io server
     */
    this.io = socket(server);
    this.onConnection();
    
  }

  static getInstance(server?: Server) {
    if (!IoServer.instance) {
      if (server) {
        IoServer.instance = new IoServer(server);
      } else {
        throw new Error('Io Server is not instantiated. Call with server argument');
      }
    }

    return IoServer.instance;
  }

  onConnection() {
    this.io.on('connection', (socket) => {
      logger.info('user connected');
      socket.send(socket.id);

      socket.on('disconnect', function () {
        logger.info('user disconnected');
      });
    });
  }

  getIo() {
    return this.io;
  }
}
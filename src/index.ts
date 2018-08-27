import { normalizePort, onError, onListening } from './utils/utils';
import * as http from 'http';
import db from './models';
import app from './app';

const server = http.createServer(app);
const port = normalizePort(process.env.port || 3000);

db.sequelize.sync().then(() => {
  server.listen(port);
  server.on('listening', onListening(server));
  server.on('error', onError(server));
});

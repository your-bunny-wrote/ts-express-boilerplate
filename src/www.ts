import * as config from 'config';
import * as http from 'http';
import app from './app';

// create server and listen on provided port (on all network interfaces).
const server = http.createServer(app);
const port = config.get<number>('port');
const address = config.get<number>('address');
server.listen(port, address);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // tslint:disable-next-line
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // tslint:disable-next-line
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();

  // tslint:disable-next-line
  console.log(`Listening on http://${addr.address}${addr.port !== 80 ? ':' + addr.port : ''}`);
}

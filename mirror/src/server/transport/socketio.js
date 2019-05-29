import { Master } from '../../master/master';
import IO from 'koa-socket-2';

const PING_TIMEOUT = 20 * 1e3;
const PING_INTERVAL = 10 * 1e3;

/**
 * API that's exposed by SocketIO for the Master to send
 * information to the clients.
 */
function TransportAPI(gameID, socket, clientInfo, roomInfo) {
  /**
   * Send a message to a specific client
   */
  function send({ type, playerID, args }) {

    // The values() method of 'Set' returns a new Iterator object that
    // that contains the values for each element is the 'Set' object in
    // the insertion order.
    // Here, they are 'socket.id' of the clients
    const clients = roomInfo.get(gameID).values();

    for (const client of clients) {
      // info = {gameID, playerID, socket}
      const info = clientInfo.get(client);
      if (info.playerID === playerID) {
        if (socket.id === client) {
          socket.emit.apply(socket, [type, ...args]);
        }
        else {
          socket.to(info.socket.id).emit.apply(socket, [type, ...args]);
        }
      }
    }
  }

  /**
   * Send a message to all clients
   */
  function sendAll(arg) {
    roomInfo.get(gameID).forEach(c => {
      const {playerID} = clientInfo.get(c);

      if (typeof arg === 'function') {
        const t = arg(playerID);
        t.playerID = playerID;
        send(t);
      }
      else {
        arg.playerID = playerID;
        send(arg);
      }
    });
  }

  return { send, sendAll };
}

/**
 * Transport interface that uses socket.io
 */
function SocketIO(_clientInfo, _roomInfo) {
  const clientInfo = _clientInfo || new Map();
  const roomInfo = _roomInfo || new Map();

  return {
    init: (app, games) => {
      const io = new IO({
        ioOptions: {
          pingTimeout: PING_TIMEOUT,
          pingInterval: PING_INTERVAL,
        },
      });

      // eslint-disable-next-line no-param-reassign
      app.context.io = io;
      io.attach(app);

      // For each kind of game make a namespace
      for (const game of games) {
        const nsp = app._io.of(game.name);

        nsp.on('connection', socket => {

          socket.on('update', async (action, stateID, gameID, playerID) => {
            const master = new Master(
              game,
              app.context.db,
              TransportAPI(gameID, socket, clientInfo, roomInfo),
              true
            );

            await master.onUpdate(action, stateID, gameID, playerID);
          });

          socket.on('sync', async (gameID, playerID, numPlayers) => {
            socket.join(gameID);

            // Remove client from any previous game that it was a part of
            if (clientInfo.has(socket.id)) {
              const {gameID: oldGameID} = clientInfo.get(socket.id);
              roomInfo.get(oldGameID).delete(socket.id);
            }

            let roomClients = roomInfo.get(gameID);
            if (roomClients === undefined) {
              roomClients = new Set();
              roomInfo.set(gameID, roomClients);
            }
            roomClients.add(socket.id);

            clientInfo.set(socket.id, {gameID, playerID, socket});

            const master = new Master(
              game,
              app.context.db,
              TransportAPI(gameID, socket, clientInfo, roomInfo),
              true,
            );

            await master.onSync(gameID, playerID, numPlayers);
          });

          socket.on('disconnect', async () => {
            if (clientInfo.has(socket.id)) {
              const {gameID} = clientInfo.get(socket.id);
              roomInfo.get(gameID).delete(socket.id);
              clientInfo.delete(socket.id);
            }
          });
        });
      }
    },
  };
}

export { TransportAPI, SocketIO };

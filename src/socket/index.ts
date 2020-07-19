import socketioJwt from 'socketio-jwt';
import socketio from 'socket.io';

const { JWT_SECRET } = process.env;

const ioEvents = (io: socketio.Server) => {
  io.sockets
    .on(
      'connection',
      socketioJwt.authorize({
        secret: JWT_SECRET!,
        timeout: 15000,
      })
    )
    .on('authenticated', async (socket: any) => {
      const decodedUser = socket.decoded_token as IUser;

      const socketId = socket.id;

      io.sockets.connected[socketId].emit('server-connected');

      socket.on('disconnect', async () => {
        console.log(' Socket disconnected');
      });
    });
};

export default ioEvents;

import { Server } from 'socket.io';

export default function SocketHandler(req, res) {
  // It means that socket server was already initialized
  if (res.socket.server.io) {
    console.log('Already set up');
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;
  let userId = 0;
  let roomId = null;

  const onConnection = (socket) => {
    console.log('is connected!!!');
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId);
      socket.to(roomId).broadcast.emit('user-connected', userId);
      roomId = roomId;
    });

    const createdMessage = (msg) => {
      console.log('backend msg :>> ', msg);
      io.to(roomId).emit('message', msg);
    };

    socket.on('message', createdMessage);
    socket.on('videoCurrent', (data) => {
      console.log('data :>> ', data);
      socket.to(roomId).broadcast.emit('videoCurrent2', data);
    });
  };

  // Define actions inside
  io.on('connection', onConnection);

  console.log('Setting up socket');
  res.end();
}

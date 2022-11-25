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
  let rooms = {};
  let roomId = 'this-is-room-id'; // for testing

  const onConnection = (socket) => {
    console.log('is connected!!!');
    socket.on('join-room', (roomId, userId) => {
      // if (rooms[roomId]) {
      //   // if the room is full, disconnect
      //   if (rooms[roomId].member_num >= rooms[roomId].max_member) {
      //     socket.disconnect();
      //     return;
      //   }
      //   rooms[roomId].member_num += 1;
      // } else {
      //   rooms[roomId] = { roomId: roomId, member_num: 1, max_member: 5 };
      // }
      console.log('join-room');

      socket.join(roomId);
      socket.to(roomId).broadcast.emit('user-connected', userId);
    });

    console.log('222');

    const createdMessage = (roomId, msg) => {
      console.log('backend msg :>> ', msg);
      console.log('roomId :>> ', roomId);
      io.to(roomId).emit('message', msg);
    };

    socket.on('message', createdMessage);
    socket.on('videoCurrent', (roomId, data) => {
      console.log('data :>> ', data);
      socket.to(roomId).broadcast.emit('videoCurrent2', data);
    });
  };

  // Define actions inside
  io.on('connection', onConnection);

  console.log('Setting up socket');
  res.end();
}

import { Server } from "socket.io";

export default function SocketHandler(req, res) {
    // It means that socket server was already initialized
    if (res.socket.server.io) {
        console.log("Already set up");
        res.end();
        return;
    }

    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    let rooms = {};

    const onConnection = (socket) => {
        console.log("is connected!!!");
        socket.on("join-room", (roomId, userId) => {
            if (rooms[roomId]) {
                console.log("this room exist");

                // if the room exist
                if (rooms[roomId].member_num >= rooms[roomId].max_member) {
                    // if the room is full, disconnect
                    socket.emit('closeReason','The room is full.');
                    socket.disconnect();
                    return;
                }
                rooms[roomId].member_num += 1;
            } else {
                console.log("this room does not exist before");
                // if the room not exist, create it
                rooms[roomId] = { roomId: roomId, member_num: 1, max_member: 2 };
            }
            console.log("rooms number", rooms[roomId].member_num)

            console.log("join-room", roomId);

            socket.join(roomId);
            socket.to(roomId).emit("user-connected", userId);
        });

        const createdMessage = (roomId, msg) => {
            console.log("backend msg :>> ", msg);
            console.log("roomId :>> ", roomId);
            io.to(roomId).emit("message", msg);
        };

        socket.on("message", createdMessage);
        socket.on("videoCurrent", (roomId, data) => {
            console.log("data :>> ", data);
            console.log("roomId :>> ", roomId);
            socket.to(roomId).emit("videoCurrent2", data);
        });
    };

    // Define actions inside
    io.on("connection", onConnection);

    console.log("Setting up socket");
    res.end();
}

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
            console.log("roomId", roomId);
            let room = io.sockets.adapter.rooms.get(roomId);

            if (room) {
                // if the room exist
                if (room.size >= rooms[roomId].max_member) {
                    // if the room is full, disconnect
                    socket.emit("closeReason", "The room is full.");
                    socket.disconnect();
                    return;
                }
            } else {
                console.log("this room does not exist before");
                rooms[roomId] = { roomId: roomId, max_member: 3 };
            }

            socket.join(roomId);
            socket.to(roomId).emit("user-joining-room", userId);
        });

        const createdMessage = (roomId, msg) => {
            console.log("backend msg :>> ", msg);
            io.to(roomId).emit("message", msg);
        };

        socket.on("message", createdMessage);
        socket.on("videoCurrent", (roomId, data) => {
            console.log("data :>> ", data);
            socket.to(roomId).emit("videoCurrent2", data);
        });
        socket.on("disconnecting", () => {
            // socket.rooms is a Set contains at least the socket ID, the first item is socket id, the rest are room ids
            // if the room id exist, tell everyone in that room I am leaving.
            if (![...socket.rooms][1]) return;
            socket.to([...socket.rooms][1]).emit("leaving", socket.id);
        });
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    };

    // Define actions inside
    io.on("connection", onConnection);

    console.log("Setting up socket");
    res.end();
}
